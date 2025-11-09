const keywordPerformance = [
  {
    keyword: "bergasports wielrenschoenen",
    position: 8,
    change: "+2",
    volume: 880
  },
  {
    keyword: "racefietsen bergasports",
    position: 12,
    change: "+5",
    volume: 540
  },
  {
    keyword: "bergasports skeelers",
    position: 5,
    change: "-1",
    volume: 320
  },
  {
    keyword: "lafuga kleding",
    position: 19,
    change: "+4",
    volume: 260
  }
];

const summaryMetrics = [
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
      '“bergasports wielrenschoenen” vertoont nu een lijst-snippet. Voeg structured data toe aan de koopgids.'
  },
  {
    title: "People Also Ask",
    detail:
      'Vragen rond “racefietsen afstellen” winnen aan volume. Plan een Q&A sectie in de volgende blog.'
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

export default function DashboardSeo() {
  return (
    <div className="seo-analytics">
      <section className="seo-hero">
        <div>
          <h1>SEO Inzichten</h1>
          <p>
            Houd zicht op keyword-posities, serp-features en optimalisatiekansen. Gebruik
            deze data om SEO en SEA beter op elkaar af te stemmen.
          </p>
        </div>
      </section>

      <section className="seo-metrics">
        {summaryMetrics.map((metric) => (
          <article key={metric.label} className="seo-metric-card">
            <span className="label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span className="delta">{metric.delta}</span>
            <p>{metric.description}</p>
          </article>
        ))}
      </section>

      <section className="seo-grid">
        <article className="insight-card keyword-performance">
          <header>
            <h2>Zoekwoord prestaties</h2>
            <p>Realtime zicht op belangrijke keyword-posities voor Bergasports.</p>
          </header>
          <table className="keyword-table">
            <thead>
              <tr>
                <th>Zoekwoord</th>
                <th>Positie</th>
                <th>Trend</th>
                <th>Maandvolume</th>
              </tr>
            </thead>
            <tbody>
              {keywordPerformance.map((row) => (
                <tr key={row.keyword}>
                  <td>{row.keyword}</td>
                  <td>{row.position}</td>
                  <td className={row.change.startsWith("+") ? "positive" : "negative"}>
                    {row.change}
                  </td>
                  <td>{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
