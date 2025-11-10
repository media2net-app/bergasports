import { seoContentItems } from "./data";
import { SeoContentTable } from "./SeoContentTable";

function getCharacterCount(content: string) {
  return content.length;
}

const totalItems = seoContentItems.length;
const averageCharacters = Math.round(
  seoContentItems.reduce((sum, item) => sum + getCharacterCount(item.content), 0) /
    totalItems
);

export default function DashboardSeoContent() {
  return (
    <section className="seo-content">
      <header className="section-header">
        <h1>SEO content AI</h1>
        <p>
          Overzicht van onlangs gegenereerde teksten voor de belangrijkste Bergasports
          categorieën en merken.
        </p>
      </header>

      <div className="seo-summary">
        <article className="seo-summary-card">
          <span className="label">Aantal teksten</span>
          <strong>{totalItems}</strong>
          <p>Totaal aantal gepubliceerde AI-teksten in de tabel.</p>
        </article>
        <article className="seo-summary-card">
          <span className="label">Gemiddelde karakters</span>
          <strong>{averageCharacters.toLocaleString("nl-NL")}</strong>
          <p>Gemiddeld aantal tekens per tekst (inclusief whitespace).</p>
        </article>
      </div>

      <SeoContentTable items={seoContentItems} />
    </section>
  );
}
