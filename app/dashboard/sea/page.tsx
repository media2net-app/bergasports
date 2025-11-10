const campaignMetrics = [
  {
    label: "Actieve campagnes",
    value: "12",
    delta: "+3",
    description: "Sinds vorige maand"
  },
  {
    label: "Gem. CPC",
    value: "€1,42",
    delta: "-0,12",
    description: "Trend afgelopen 30 dagen"
  },
  {
    label: "Conversieratio",
    value: "4,9%",
    delta: "+0,6%",
    description: "Gemiddeld across accounts"
  }
];

const budgetSplit = [
  { channel: "Search", spend: "€28.400", share: "54%" },
  { channel: "Shopping", spend: "€14.200", share: "27%" },
  { channel: "Performance Max", spend: "€8.950", share: "17%" },
  { channel: "Remarketing", spend: "€1.850", share: "2%" }
];

const optimisationQueue = [
  {
    title: "Uitbreid match keywords",
    detail: "Voeg branded varianten toe voor Lafuga kleding en scope wielen."
  },
  {
    title: "Nieuwe asset groepen",
    detail: "Maak visuele assets aan voor de skeelers campagne met seizoensaanbieding."
  },
  {
    title: "Budget herschikking",
    detail: "Verplaats €2.000 van RLSA naar shopping ivm hogere ROAS."
  }
];

export default function DashboardSea() {
  return (
    <section className="seo-analytics">
      <header className="seo-hero">
        <div>
          <h1>SEA Campagnes</h1>
          <p>
            Overzicht van alle lopende campagnes binnen Google Ads en Microsoft Ads.
            Monitor budgetten, prestaties en optimalisatieacties naast de SEO-data.
          </p>
        </div>
      </header>

      <div className="seo-metrics">
        {campaignMetrics.map((metric) => (
          <article key={metric.label} className="seo-metric-card">
            <span className="label">{metric.label}</span>
            <strong>{metric.value}</strong>
            <span className="delta">{metric.delta}</span>
            <p>{metric.description}</p>
          </article>
        ))}
      </div>

      <section className="seo-grid">
        <article className="insight-card">
          <header>
            <h2>Budgetverdeling</h2>
            <p>Ontdek waar je mediabudget momenteel het meest rendeert.</p>
          </header>
          <ul className="traffic-split">
            {budgetSplit.map((line) => (
              <li key={line.channel}>
                <div>
                  <strong>{line.channel}</strong>
                  <small>{line.share} van budget</small>
                </div>
                <span>{line.spend}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="insight-card">
          <header>
            <h2>Optimalisatie taken</h2>
            <p>Plan acties op basis van data en AI aanbevelingen.</p>
          </header>
          <ul className="todo-list">
            {optimisationQueue.map((task) => (
              <li key={task.title}>
                <strong>{task.title}</strong>
                <span>{task.detail}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
}
