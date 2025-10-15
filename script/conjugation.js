document.addEventListener("DOMContentLoaded", () => {
  /* ─────────────────────────────────────────────
     COLLAPSIBLE SECTIONS
  ───────────────────────────────────────────── */
  document.querySelectorAll(".collapse").forEach((section) => {
    const header = section.querySelector(".collapse-header");
    header.addEventListener("click", () => {
      section.classList.toggle("active");
    });
  });

  /* ─────────────────────────────────────────────
     PERSON LIST
  ───────────────────────────────────────────── */
  const persons = ["ja", "ty", "on", "ona", "ono", "my", "wy", "oni", "one"];

  /* ─────────────────────────────────────────────
     RULE DISPLAY TABLE (for reference)
  ───────────────────────────────────────────── */
  const rules = CONJUGATION_PATTERNS.present.map((rule) => ({
    pattern: rule.pattern,
    replace: rule.stemTransform("example").replace("example", "stem"),
    example: rule.example,
  }));

  const rulesTableBody = document.getElementById("rulesTableBody");
  if (rulesTableBody) {
    rules.forEach((r) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${r.pattern}</td><td>${r.replace}</td><td>${r.example}</td>`;
      rulesTableBody.appendChild(row);
    });
  }

  /* ─────────────────────────────────────────────
     RULE SORTING LOGIC
  ───────────────────────────────────────────── */
  function getOrderedRules(conjugationSet) {
    return [...conjugationSet].sort((a, b) => {
      // Irregulars first
      if (a.type === "irregular" && b.type !== "irregular") return -1;
      if (b.type === "irregular" && a.type !== "irregular") return 1;
      // More specific regex first (longer = more specific)
      return b.pattern.source.length - a.pattern.source.length;
    });
  }

  /* ─────────────────────────────────────────────
     FALLBACK RULES (basic heuristic conjugation)
  ───────────────────────────────────────────── */
  const FALLBACK_RULES = [
    {
      pattern: /ać$/,
      stemTransform: (v) => v.replace(/ać$/, ""),
      endings: ["am", "asz", "a", "amy", "acie", "ają"],
    },
    {
      pattern: /ić$/,
      stemTransform: (v) => v.replace(/ić$/, ""),
      endings: ["ę", "isz", "i", "imy", "icie", "ą"],
    },
    {
      pattern: /yć$/,
      stemTransform: (v) => v.replace(/yć$/, ""),
      endings: ["ę", "ysz", "y", "ymy", "ycie", "ą"],
    },
  ];

  /* ─────────────────────────────────────────────
     MAIN GENERATION LOGIC
  ───────────────────────────────────────────── */
  const generateBtn = document.getElementById("generateDynamicBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const verb = document.getElementById("dynamicVerbInput").value.trim();
      const tense = document.getElementById("dynamicTenseSelect").value;
      const results = document.getElementById("dynamicResults");

      if (!results) return console.error("Results element not found");

      try {
        const overridesInput = document.getElementById("overridesInput");
        const overrides = JSON.parse(
          (overridesInput ? overridesInput.value : "") || "{}"
        );
        results.innerHTML = generateConjugations(verb, tense, overrides);
      } catch (e) {
        results.innerHTML = `<div style="color: red;">Error: Invalid JSON in overrides</div>`;
      }
    });
  }

  function generateConjugations(verb, tense, overrides = {}, userRules = []) {
    if (!verb) return "<div>Please enter a verb</div>";

    // 1️⃣ Overrides (user-defined verb forms)
    if (overrides[verb] && overrides[verb][tense]) {
      return createTable(persons, overrides[verb][tense], tense);
    }

    // 2️⃣ Exception verbs (fully irregular)
    if (EXCEPTION_VERBS[verb] && EXCEPTION_VERBS[verb][tense]) {
      return createTable(persons, EXCEPTION_VERBS[verb][tense], tense);
    }

    // 3️⃣ Regular rules (user + built-in)
    const allRules = [...userRules, ...(CONJUGATION_PATTERNS[tense] || [])];
    const orderedRules = getOrderedRules(allRules);

    const conjugated = conjugateWithRules(verb, tense, orderedRules);
    if (conjugated) return conjugated;

    // 4️⃣ Fallback heuristic (based on endings)
    for (let rule of FALLBACK_RULES) {
      if (rule.pattern.test(verb)) {
        const stem = rule.stemTransform(verb);
        const expanded = expandForms(stem, rule.endings);
        return createTable(persons, expanded, `${tense} (fallback)`);
      }
    }

    // 5️⃣ Final diagnostic if no match at all
    return `
      <div class='error'>
        ⚠️ No conjugation rule found for "<strong>${verb}</strong>" in tense "${tense}".
        <br>Consider adding a custom rule or override.
      </div>`;
  }

  /* ─────────────────────────────────────────────
     PATTERN-BASED CONJUGATION
  ───────────────────────────────────────────── */
  function conjugateWithRules(verb, tense, rules) {
    switch (tense) {
      case "present":
        return conjugatePresent(verb, rules);
      case "past":
        return conjugatePast(verb, rules);
      case "future":
        return conjugateFuture(verb, rules);
      default:
        return null;
    }
  }

  function conjugatePresent(verb, rules) {
    for (let rule of rules) {
      if (rule.pattern.test(verb)) {
        const stem = rule.stemTransform(verb);
        return createTable(persons, expandForms(stem, rule.endings), "present");
      }
    }
    return null; // triggers fallback
  }

  function conjugatePast(verb, rules) {
    for (let rule of rules) {
      if (rule.pattern.test(verb)) {
        const stem = rule.stemTransform(verb);
        const masculine = rule.endingsMasculine;
        const feminine = rule.endingsFeminine;

        const expandedForms = [
          `${stem}${masculine[0]}/${stem}${feminine[0]}`,
          `${stem}${masculine[1]}/${stem}${feminine[1]}`,
          `${stem}${masculine[2]}`,
          `${stem}${feminine[2]}`,
          `${stem}${masculine[2].replace(/ł$/, "ło")}`,
          `${stem}${masculine[3]}/${stem}${feminine[3]}`,
          `${stem}${masculine[4]}/${stem}${feminine[4]}`,
          `${stem}${masculine[5]}`,
          `${stem}${feminine[5]}`,
        ];
        return createTable(persons, expandedForms, "past");
      }
    }
    return null; // fallback will handle it
  }

  function conjugateFuture(verb, rules) {
    // Try perfective simple future
    for (let rule of rules) {
      if (rule.pattern.test(verb) && rule.type === "perfective") {
        const stem = rule.stemTransform(verb);
        return createTable(
          persons,
          expandForms(stem, rule.endings),
          "future (simple)"
        );
      }
    }

    // Check heuristic perfectivity
    if (isPerfectiveVerb(verb)) {
      const result = conjugatePresent(verb, rules);
      return result ? result.replace("present", "future (simple)") : null;
    }

    // Default: compound future
    const aux = CONJUGATION_PATTERNS.futureAux;
    const expanded = persons.map((_, i) => `${aux[i % 6]} ${verb}`);
    return createTable(persons, expanded, "future (compound)");
  }

  /* ─────────────────────────────────────────────
     UTILITIES
  ───────────────────────────────────────────── */
  function expandForms(stem, endings) {
    // Expand 6 endings to 9 persons: ja, ty, on, ona, ono, my, wy, oni, one
    return [
      stem + endings[0], // ja
      stem + endings[1], // ty
      stem + endings[2], // on
      stem + endings[2], // ona
      stem + endings[2], // ono
      stem + endings[3], // my
      stem + endings[4], // wy
      stem + endings[5], // oni
      stem + endings[5], // one
    ];
  }

  function isPerfectiveVerb(verb) {
    const perfectivePrefixes = [
      /^po/,
      /^z[ae]?/,
      /^na/,
      /^od/,
      /^do/,
      /^przy/,
      /^wy/,
      /^u/,
      /^roz/,
      /^s/,
    ];
    return (
      perfectivePrefixes.some((prefix) => prefix.test(verb)) ||
      verb.endsWith("nąć") ||
      ["kupić", "sprzedać", "dać", "wziąć", "przyjść", "wyjść"].includes(verb)
    );
  }

  function createTable(persons, forms, tense) {
    let html = `<table class='exercise-table'>
      <thead><tr><th>Person</th><th>${tense}</th></tr></thead><tbody>`;
    persons.forEach((p, i) => {
      html += `<tr><td>${p}</td><td>${forms[i]}</td></tr>`;
    });
    html += "</tbody></table>";
    return html;
  }
});
