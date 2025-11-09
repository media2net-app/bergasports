import Link from "next/link";
import { seoContentItems } from "./data";

const WORD_TARGET = 1000;

function getWordCount(content: string) {
  return content.split(/\s+/).filter(Boolean).length;
}

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

      <table className="keyword-table wide">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Categorie</th>
            <th>Focus zoekwoorden</th>
            <th>Type content</th>
            <th>Lengte</th>
          </tr>
        </thead>
        <tbody>
          {seoContentItems.map((item) => {
            const wordCount = getWordCount(item.content);
            const meetsTarget = wordCount >= WORD_TARGET;
            return (
              <tr key={item.id}>
                <td>
                  <Link href={`/dashboard/seo-content/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.category}</td>
                <td>{item.keywords}</td>
                <td>{item.format}</td>
                <td className={meetsTarget ? "metric-ok" : "metric-warn"}>
                  {wordCount.toLocaleString("nl-NL")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
