"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./../styles.css";

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

// Helper function to detect category from keyword
function detectCategory(keyword: string): string {
  const lowerKeyword = keyword.toLowerCase();
  
  if (lowerKeyword.includes("wielrenschoen") || lowerKeyword.includes("schoen")) {
    return "Wielrenschoenen";
  }
  if (lowerKeyword.includes("racefiets") || lowerKeyword.includes("fiets")) {
    return "Racefietsen";
  }
  if (lowerKeyword.includes("wiel") || lowerKeyword.includes("wielset")) {
    return "Wielen";
  }
  if (lowerKeyword.includes("bril") || lowerKeyword.includes("sportbril")) {
    return "Brillen";
  }
  if (lowerKeyword.includes("skeeler")) {
    return "Skeelers";
  }
  if (lowerKeyword.includes("lafuga") || lowerKeyword.includes("jersey") || lowerKeyword.includes("kleding")) {
    return "Lafuga kleding";
  }
  if (lowerKeyword.includes("accessoire") || lowerKeyword.includes("acc")) {
    return "Accesoires";
  }
  
  return "Overig";
}

// Helper to calculate trend (we'll need historical data for this, for now show position change indicator)
function formatPosition(position: number): string {
  return position.toFixed(1);
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("nl-NL").format(num);
}

function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(2)}%`;
}

// Fallback data
const fallbackKeywords = [
  {
    keyword: "beste wielrenschoenen 2025",
    position: 11,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "carbon racefiets bergasports",
    position: 9,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "aero wielset kopen",
    position: 17,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "sportbril op sterkte",
    position: 6,
    clicks: 0,
    impressions: 0,
    ctr: 0
  },
  {
    keyword: "lafuga wielerjersey",
    position: 14,
    clicks: 0,
    impressions: 0,
    ctr: 0
  }
];

export default function DashboardKeywords() {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/search-console/data?days=30&limit=100");
        const result = await response.json();

        if (!response.ok) {
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

  const keywords = data?.keywords || fallbackKeywords;

  return (
    <section className="keyword-tracking">
      <header className="section-header">
        <h1>Keyword tracking</h1>
        <p>
          Bekijk de belangrijkste zoekwoorden per categorie en volg verschuivingen in posities en
          prestaties. Data komt direct uit Google Search Console.
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
      </header>

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "rgba(255, 255, 255, 0.6)" }}>
          Keywords worden geladen...
        </div>
      ) : (
        <div className="keyword-table-wrapper">
          <table className="keyword-table wide">
            <thead>
              <tr>
                <th>Categorie</th>
                <th>Zoekwoord</th>
                <th>Positie</th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>CTR</th>
              </tr>
            </thead>
            <tbody>
              {keywords.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "rgba(255, 255, 255, 0.6)" }}>
                    Geen keyword data beschikbaar
                  </td>
                </tr>
              ) : (
                keywords.map((row) => (
                  <tr key={row.keyword}>
                    <td>{detectCategory(row.keyword)}</td>
                    <td>
                      <strong>{row.keyword}</strong>
                    </td>
                    <td>{formatPosition(row.position)}</td>
                    <td>{formatNumber(row.clicks)}</td>
                    <td>{formatNumber(row.impressions)}</td>
                    <td>{formatPercentage(row.ctr)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {data && !loading && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(255, 255, 255, 0.05)", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)", margin: 0 }}>
            Data periode: {new Date(data.dateRange.startDate).toLocaleDateString("nl-NL")} -{" "}
            {new Date(data.dateRange.endDate).toLocaleDateString("nl-NL")} • Totaal{" "}
            {formatNumber(data.summary.totalClicks)} clicks en{" "}
            {formatNumber(data.summary.totalImpressions)} impressions
          </p>
        </div>
      )}
    </section>
  );
}
