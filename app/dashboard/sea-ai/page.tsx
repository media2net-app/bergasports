const insights = [
  {
    title: "Budget Efficiency",
    detail:
      "AI detecteerde een 18% lagere CPA op branded shopping campagnes. Verhoog budget met €1.200 voor maximale ROAS."
  },
  {
    title: "New Keyword Opportunity",
    detail:
      "Zoekvolume voor 'scope wielen korting' steeg 42%. Maak een aparte SEA landingspagina en activeer exact match."
  },
  {
    title: "Creative Fatigue",
    detail:
      "Performance Max ads verliezen 15% CTR. Upload nieuwe video creatives gericht op skeeler promoties."
  }
];

const anomalyAlerts = [
  {
    type: "Spend spike",
    description: "Search campagne 'Wielrenschoenen NL' gaf 32% meer uit dan gepland afgelopen nacht.",
    recommendation: "Stel daglimiet bij naar €1.200 en controleer queryrapport."
  },
  {
    type: "Conversie drop",
    description: "Microsoft Ads 'Racefietsen' zag 25% minder conversies week-over-week.",
    recommendation: "Activeer A/B test met nieuw responsive search ad variant."
  }
];

export default function DashboardSeaAi() {
  return (
    <section className="seo-analytics">
      <header className="seo-hero">
        <div>
          <h1>SEA AI Analyse</h1>
          <p>
            Geautomatiseerde inzichten en alerts vanuit Accelerate en Google Ads scripts. Combineer
            deze analyses met het SEO dashboard voor een volledige funnel-analyse.
          </p>
        </div>
      </header>

      <section className="seo-grid">
        <article className="insight-card">
          <header>
            <h2>Strategische aanbevelingen</h2>
            <p>AI-gegenereerde optimalisaties op basis van trenddata en accountprestaties.</p>
          </header>
          <ul className="serp-list">
            {insights.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </li>
            ))}
          </ul>
        </article>

        <article className="insight-card">
          <header>
            <h2>Anomaly alerts</h2>
            <p>Belangrijkste afwijkingen zodat budget en conversies onder controle blijven.</p>
          </header>
          <ul className="serp-list">
            {anomalyAlerts.map((alert) => (
              <li key={alert.type}>
                <h3>{alert.type}</h3>
                <p>{alert.description}</p>
                <small>{alert.recommendation}</small>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
