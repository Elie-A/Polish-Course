document.addEventListener("DOMContentLoaded", () => {
  // Collapsible behavior
  document.querySelectorAll(".collapsible-section").forEach((section) => {
    const header = section.querySelector(".collapsible-header");
    header.addEventListener("click", () => {
      section.classList.toggle("active");
    });
  });

  const persons = ["ja", "ty", "on/ona/ono", "my", "wy", "oni/one"];

  // Regular endings (fallback)
  const endings = {
    present: ["ę", "esz", "e", "emy", "ecie", "ą"], // -ać/-ić verbs
    pastMasculine: ["łem", "łeś", "ł", "liśmy", "liście", "li"],
    pastFeminine: ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"],
    futureAux: ["będę", "będziesz", "będzie", "będziemy", "będziecie", "będą"], // for compound future
  };

  // Irregular or special verbs
  const irregularVerbs = {
    brać: {
      type: "perfective",
      present: [
        "biorę",
        "bierzesz",
        "bierze",
        "bierzemy",
        "bierzecie",
        "biorą",
      ],
      pastMasculine: [
        "brałem",
        "brałeś",
        "brał",
        "braliśmy",
        "braliście",
        "brali",
      ],
      pastFeminine: [
        "brałam",
        "brałaś",
        "brała",
        "brałyśmy",
        "brałyście",
        "brały",
      ],
      future: ["wezmę", "weźmiesz", "weźmie", "weźmiemy", "weźmiecie", "wezmą"], // simple future
    },
    pisać: {
      type: "imperfective",
      present: ["piszę", "piszesz", "pisze", "piszemy", "piszecie", "piszą"],
      pastMasculine: [
        "pisałem",
        "pisałeś",
        "pisał",
        "pisaliśmy",
        "pisaliście",
        "pisali",
      ],
      pastFeminine: [
        "pisałam",
        "pisałaś",
        "pisała",
        "pisałyśmy",
        "pisałyście",
        "pisały",
      ],
      // future uses compound: będę + infinitive
    },
    spać: {
      type: "imperfective",
      present: ["śpię", "śpisz", "śpi", "śpimy", "śpicie", "śpią"],
      pastMasculine: [
        "spałem",
        "spałeś",
        "spał",
        "spaliśmy",
        "spaliście",
        "spali",
      ],
      pastFeminine: [
        "spałam",
        "spałaś",
        "spała",
        "spałyśmy",
        "spałyście",
        "spały",
      ],
      // future uses compound
    },
    // add more irregulars here...
  };

  // Rules table
  const rules = [
    { pattern: /brać$/, replace: "bier", example: "brać → biorę" },
    { pattern: /spać$/, replace: "śpi", example: "spać → śpię" },
    { pattern: /pisać$/, replace: "pis", example: "pisać → piszę" },
    { pattern: /wołać$/, replace: "woł", example: "wołać → wołam" },
    { pattern: /lecieć$/, replace: "lec", example: "lecieć → lecę" },
    { pattern: /stać$/, replace: "stoj", example: "stać → stoję" },
    { pattern: /dać$/, replace: "daj", example: "dać → daję" },
    { pattern: /chcieć$/, replace: "chc", example: "chcieć → chcę" },
    { pattern: /jeść$/, replace: "je", example: "jeść → jem" },
  ];

  const rulesTableBody = document.getElementById("rulesTableBody");
  rules.forEach((r) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${r.pattern}</td><td>${r.replace}</td><td>${r.example}</td>`;
    rulesTableBody.appendChild(row);
  });

  // Generate button
  document
    .getElementById("generateDynamicBtn")
    .addEventListener("click", () => {
      const verb = document.getElementById("dynamicVerbInput").value.trim();
      const tense = document.getElementById("dynamicTenseSelect").value;
      const results = document.getElementById("dynamicResults");
      const overrides = JSON.parse(
        document.getElementById("overridesInput").value || "{}"
      );

      results.innerHTML = generateConjugations(verb, tense, overrides);
    });

  // Conjugation generator
  function generateConjugations(verb, tense, overrides) {
    // 1. Overrides first
    if (overrides[verb] && overrides[verb][tense]) {
      return createTable(persons, overrides[verb][tense], tense);
    }

    // 2. Irregular verbs
    if (irregularVerbs[verb]) {
      const data = irregularVerbs[verb];
      if (tense === "future") {
        if (data.type === "perfective") {
          return createTable(persons, data.future, tense); // simple future
        } else {
          // imperfective: compound future
          const forms = persons.map(
            (_, i) => endings.futureAux[i] + " " + verb
          );
          return createTable(persons, forms, tense);
        }
      }
      if (tense === "past") {
        // show masculine for simplicity; could add gender selection
        return createTable(persons, data.pastMasculine, tense);
      }
      if (tense === "present") {
        return createTable(persons, data.present, tense);
      }
    }

    // 3. Regular verbs fallback
    const stem = verb.replace(/ć$/, "");
    let forms = [];

    if (tense === "present") {
      forms = persons.map((_, i) => stem + endings.present[i]);
    } else if (tense === "past") {
      forms = persons.map((_, i) => stem + endings.pastMasculine[i]); // default masculine
    } else if (tense === "future") {
      forms = persons.map((_, i) => endings.futureAux[i] + " " + verb); // compound future
    }

    return createTable(persons, forms, tense);
  }

  // Helper: build HTML table
  function createTable(persons, forms, tense) {
    let table = `<table class='exercise-table'><thead><tr><th>Person</th><th>${tense}</th></tr></thead><tbody>`;
    persons.forEach((p, i) => {
      table += `<tr><td>${p}</td><td>${forms[i]}</td></tr>`;
    });
    table += "</tbody></table>";
    return table;
  }
});
