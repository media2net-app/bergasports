const categories = [
  "Wielrenschoenen",
  "Racefietsen",
  "Wielen",
  "Brillen",
  "Skeelers",
  "Accesoires",
  "Lafuga kleding"
];

export default function DashboardGenerator() {
  return (
    <section className="generator">
      <div className="generator-copy">
        <h1>SEO AI generator</h1>
        <p>
          Maak in enkele seconden blogartikelen of landingspagina-teksten. Kies een
          categorie, voeg focuszoekwoorden toe en de AI doet de rest.
        </p>
        <ul>
          <li>Structuur volgens SEO best practices</li>
          <li>Automatisch voorbeeldtitels en meta descriptions</li>
          <li>Export als Markdown of direct CMS-klaar</li>
        </ul>
      </div>

      <form className="generator-form">
        <label>
          <span>Categorie</span>
          <select defaultValue={categories[0]}>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Focus zoekwoorden</span>
          <input
            type="text"
            placeholder="bijv. bergasports wielrenschoenen review"
          />
        </label>

        <label>
          <span>Doel van de pagina</span>
          <textarea
            rows={4}
            placeholder="Beschrijf kort wat de content moet bereiken."
          />
        </label>

        <button type="button">Genereer concept</button>
      </form>
    </section>
  );
}
