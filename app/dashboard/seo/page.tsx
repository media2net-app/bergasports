"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type KeywordPerformance = {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
};

type SearchConsoleData = {
  keywords: KeywordPerformance[];
  summary: {
    totalClicks: number;
    totalImpressions: number;
    averageCtr: number;
    averagePosition: number;
    topKeywords: KeywordPerformance[];
  };
  dateRange: {
    startDate: string;
    endDate: string;
  };
};

// Fallback data when API is not available
const fallbackKeywordPerformance = [
  {
    keyword: "bergasports wielrenschoenen",
    position: 8,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "racefietsen bergasports",
    position: 12,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "bergasports skeelers",
    position: 5,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "lafuga kleding",
    position: 19,
    clicks: 0,
    impressions: 0,
    ctr: 0
  }
];

const fallbackSummaryMetrics = [
  {
    label: "Visibility index",
    value: "27,8",
    delta: "+1,9",
    description: "Organic visibility week-over-week"
  },
  {
    label: "Gem. CTR",
    value: "5,6%",
    delta: "+0,4%",
    description: "Klikratio top 50 zoekwoorden"
  },
  {
    label: "Nieuwe posities",
    value: "34",
    delta: "+12",
    description: "Keywords die voor het eerst top 20 bereiken"
  }
];

const serpInsights = [
  {
    title: "Featured snippet kansen",
    detail:
      '"bergasports wielrenschoenen" vertoont nu een lijst-snippet. Voeg structured data toe aan de koopgids.'
  },
  {
    title: "People Also Ask",
    detail:
      'Vragen rond "racefietsen afstellen" winnen aan volume. Plan een Q&A sectie in de volgende blog.'
  },
  {
    title: "Video resultaten",
    detail: "Concurrenten plaatsen productdemo's op YouTube. Overweeg korte productvideo's voor Scope wielen."
  }
];

const contentIdeas = [
  {
    title: "Blog: SEO trainingsplan",
    description:
      "Omvat stappen voor het monitoren van AI-content prestaties, inclusief KPI's en dashboards."
  },
  {
    title: "Landingspagina: Bergasports SEA + SEO bundel",
    description: "Positioneer Bergasports als full-funnel partner met meetbare resultaten."
  },
  {
    title: "Case study: Nimbl schoenen",
    description:
      "Toon hoe organische zichtbaarheid + SEA retargeting samen 28% omzetgroei opleverden."
  }
];

function formatNumber(num: number): string {
  return new Intl.NumberFormat("nl-NL").format(num);
}

function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(2)}%`;
}

export default function DashboardSeo() {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/search-console/data?days=30&limit=50");
        const result = await response.json();

        if (!response.ok) {
          // If no auth, show fallback data
          if (response.status === 401) {
            setError("Search Console niet gekoppeld. Configureer tokens in de instellingen.");
            setData(null);
          } else {
            throw new Error(result.error ?? "Fout bij ophalen data");
          }
        } else {
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching Search Console data:", err);
        setError(err instanceof Error ? err.message : "Onbekende fout");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const keywords = data?.keywords || fallbackKeywordPerformance;
  const summary = data?.summary;

  // Calculate summary metrics from real data or use fallback
  const summaryMetrics = summary
    ? [
        {
          label: "Totale clicks",
          value: formatNumber(summary.totalClicks),
          delta: "",
          description: "Laatste 30 dagen"
        },
        {
          label: "Gem. CTR",
          value: formatPercentage(summary.averageCtr),
          delta: "",
          description: "Klikratio gemiddeld"
        },
        {
          label: "Gem. positie",
          value: summary.averagePosition.toFixed(1),
          delta: "",
          description: "Gemiddelde positie top keywords"
        }
      ]
    : fallbackSummaryMetrics;

  return (
    <div className="seo-analytics">
      <section className="seo-hero">
        <div>
          <h1>SEO Inzichten</h1>
          <p>
            Houd zicht op keyword-posities, serp-features en optimalisatiekansen. Gebruik deze
            data om SEO en SEA beter op elkaar af te stemmen.
          </p>
          {error && (
            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                background: "rgba(255, 120, 120, 0.1)",
                border: "1px solid rgba(255, 120, 120, 0.3)"
              }}
            >
              <p style={{ color: "rgba(255, 120, 120, 0.9)", margin: 0 }}>
                {error}{" "}
                <Link
                  href="/dashboard/search-console-auth"
                  style={{ color: "#d4af38", textDecoration: "underline" }}
                >
                  Koppel Search Console
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="seo-metrics">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className="seo-metric-card">
            <span className="label">{metric.label}</span>
            <strong>{metric.value}</strong>
            {metric.delta && <span className="delta">{metric.delta}</span>}
            <p>{metric.description}</p>
          </article>
        ))}
      </section>

      <section className="seo-grid">
        <article className="insight-card keyword-performance">
          <header>
            <h2>Zoekwoord prestaties</h2>
            <p>
              {loading
                ? "Data wordt geladen..."
                : data
                ? "Realtime zicht op belangrijke keyword-posities voor Bergasports."
                : "Voorbeeld data - koppel Search Console voor echte data"}
            </p>
          </header>
          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "rgba(255, 255, 255, 0.6)" }}>
              Laden...
            </div>
          ) : (
            <div className="keyword-table-wrapper">
              <table className="keyword-table">
                <thead>
                  <tr>
                    <th>Zoekwoord</th>
                    <th>Positie</th>
                    <th>Clicks</th>
                    <th>Impressions</th>
                    <th>CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.slice(0, 20).map((row) => (
                    <tr key={row.keyword}>
                      <td>{row.keyword}</td>
                      <td>{row.position.toFixed(1)}</td>
                      <td>{formatNumber(row.clicks)}</td>
                      <td>{formatNumber(row.impressions)}</td>
                      <td>{formatPercentage(row.ctr)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="insight-card">
          <header>
            <h2>Verbeterpunten</h2>
            <p>AI-advies op basis van crawl en concurrentvergelijking.</p>
          </header>
          <ul className="todo-list">
            <li>
              Optimaliseer meta titles voor <strong>racefietsen</strong> + schrijf CTA.
            </li>
            <li>
              Voeg longform blog toe over <strong>wielrenschoenen vergelijken</strong>.
            </li>
            <li>
              Werk category copy bij voor <strong>accesoires</strong> met rijke snippets.
            </li>
          </ul>
        </article>
      </section>

      <section className="seo-grid serp-section">
        <article className="insight-card">
          <header>
            <h2>SERP-features</h2>
            <p>Focus op zoekresultaten waar extra zichtbaarheid te behalen is.</p>
          </header>
          <ul className="serp-list">
            {serpInsights.map((insight) => (
              <li key={insight.title}>
                <h3>{insight.title}</h3>
                <p>{insight.detail}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="insight-card">
          <header>
            <h2>Content kansen</h2>
            <p>Onderwerpen die de komende sprint ingepland kunnen worden.</p>
          </header>
          <ul className="serp-list">
            {contentIdeas.map((idea) => (
              <li key={idea.title}>
                <h3>{idea.title}</h3>
                <p>{idea.description}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
