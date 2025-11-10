const trackedKeywords = [
  {
    category: "Wielrenschoenen",
    keyword: "beste wielrenschoenen 2025",
    position: 11,
    change: "+3",
    difficulty: 42
  },
  {
    category: "Racefietsen",
    keyword: "carbon racefiets bergasports",
    position: 9,
    change: "+1",
    difficulty: 38
  },
  {
    category: "Wielen",
    keyword: "aero wielset kopen",
    position: 17,
    change: "-2",
    difficulty: 55
  },
  {
    category: "Brillen",
    keyword: "sportbril op sterkte",
    position: 6,
    change: "+4",
    difficulty: 33
  },
  {
    category: "Lafuga kleding",
    keyword: "lafuga wielerjersey",
    position: 14,
    change: "+5",
    difficulty: 29
  }
];

export default function DashboardKeywords() {
  return (
    <section className="keyword-tracking">
      <header className="section-header">
        <h1>Keyword tracking</h1>
        <p>
          Bekijk de belangrijkste zoekwoorden per categorie en volg verschuivingen in
          posities en concurrentie.
        </p>
      </header>

      <div className="keyword-table-wrapper">
        <table className="keyword-table wide">
          <thead>
            <tr>
              <th>Categorie</th>
              <th>Zoekwoord</th>
              <th>Positie</th>
              <th>Trend</th>
              <th>Keyword difficulty</th>
            </tr>
          </thead>
          <tbody>
            {trackedKeywords.map((row) => (
              <tr key={row.keyword}>
                <td>{row.category}</td>
                <td>{row.keyword}</td>
                <td>{row.position}</td>
                <td className={row.change.startsWith("+") ? "positive" : "negative"}>
                  {row.change}
                </td>
                <td>{row.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

