import Link from "next/link";
import "./styles.css";

const menu = [
  { label: "Marketing AI", href: "#" },
  { label: "SEO Inzichten", href: "#seo" },
  { label: "Keyword Tracking", href: "#keywords" },
  { label: "AI Generator", href: "#generator" }
];

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

const categories = [
  "Wielrenschoenen",
  "Racefietsen",
  "Wielen",
  "Brillen",
  "Skeelers",
  "Accesoires",
  "Lafuga kleding"
];

const statCards = [
  { title: "Organische sessies", value: "18.420", delta: "+14%", description: "vs. vorige 30 dagen" },
  { title: "Conversies via content", value: "326", delta: "+9%", description: "Leadformulieren & aanvragen" },
  { title: "Gem. ranking top keywords", value: "11,2", delta: "-0,8", description: "Gem. positie top 25 keywords" },
  { title: "Nieuw gegenereerde AI-teksten", value: "48", delta: "+18", description: "Afgelopen 7 dagen" }
];

const channels = [
  { label: "Zoekmachine", value: "68%" },
  { label: "Direct verkeer", value: "19%" },
  { label: "Social media", value: "8%" },
  { label: "E-mail campagnes", value: "5%" }
];

const spotlight = [
  {
    title: "Content spotlight",
    items: [
      {
        label: "Blog: Custom Orbea Terra gravelbike",
        performance: "+42% organische clicks"
      },
      {
        label: "Landingspagina: Lafuga kleding",
        performance: "+6 posities voor 'lafuga wielerkleding'"
      },
      {
        label: "SEO update: Wielrenschoenen / nimbl ultimate",
        performance: "+3% conversieratio"
      }
    ]
  },
  {
    title: "Actiepunten",
    items: [
      { label: "Herwerk meta descriptions racefietsen V2", performance: "Deadline morgen" },
      { label: "Clusterpagina skeelers toevoegen aan sitemap", performance: "In afwachting van review" },
      { label: "Nieuwe blog: Clean Nutrition voor wielrenners", performance: "Concept door AI klaar" }
    ]
  }
];

export default function DashboardOverview() {
  return (
    <div className="overview">
      <section className="hero">
        <div>
          <h1>AI Marketing dashboard</h1>
          <p>
            Volg de SEO-prestaties van bergasports.com, monitor zoekwoorden en
            genereer nieuwe marketingcontent met AI.
          </p>
        </div>

        <div className="score-card">
          <span className="score-label">SEO-score</span>
          <strong>76</strong>
          <span className="score-trend">+6 sinds vorige week</span>
        </div>
      </section>

      <section className="stats-grid">
        {statCards.map((card) => (
          <article key={card.title} className="stat-card">
            <header>
              <h2>{card.title}</h2>
              <span className={card.delta.startsWith("+") ? "trend-up" : "trend-down"}>{card.delta}</span>
            </header>
            <p className="stat-value">{card.value}</p>
            <p className="stat-description">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="activity-grid">
        <article className="insight-card traffic">
          <header>
            <h2>Verkeersbronnen</h2>
            <p>Verdeling van sessies afgelopen 30 dagen.</p>
          </header>
          <ul className="traffic-split">
            {channels.map((channel) => (
              <li key={channel.label}>
                <span>{channel.label}</span>
                <strong>{channel.value}</strong>
              </li>
            ))}
          </ul>
        </article>

        {spotlight.map((panel) => (
          <article key={panel.title} className="insight-card spotlight">
            <header>
              <h2>{panel.title}</h2>
            </header>
            <ul>
              {panel.items.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <small>{item.performance}</small>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
