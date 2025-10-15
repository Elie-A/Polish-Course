document.addEventListener("DOMContentLoaded", () => {
  // Collapsible behavior
  document.querySelectorAll(".collapse").forEach((section) => {
    const header = section.querySelector(".collapse-header");
    header.addEventListener("click", () => {
      section.classList.toggle("active");
    });
  });

  const persons = ["ja", "ty", "on", "ona", "ono", "my", "wy", "oni", "one"];

  // Create rules display for the UI using imported patterns
  const rules = CONJUGATION_PATTERNS.present.map(rule => ({
    pattern: rule.pattern,
    replace: rule.stemTransform("example").replace("example", "stem"),
    example: rule.example
  }));

  const rulesTableBody = document.getElementById("rulesTableBody");
  if (rulesTableBody) {
    rules.forEach((r) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${r.pattern}</td><td>${r.replace}</td><td>${r.example}</td>`;
      rulesTableBody.appendChild(row);
    });
  }

  // Generate button
  const generateBtn = document.getElementById("generateDynamicBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const verb = document.getElementById("dynamicVerbInput").value.trim();
      const tense = document.getElementById("dynamicTenseSelect").value;
      const results = document.getElementById("dynamicResults");
      
      if (!results) {
        console.error("Results element not found");
        return;
      }
      
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

  // Main conjugation generator function
  function generateConjugations(verb, tense, overrides = {}) {
    if (!verb) return "<div>Please enter a verb</div>";

    // 1. Check overrides first
    if (overrides[verb] && overrides[verb][tense]) {
      return createTable(persons, overrides[verb][tense], tense);
    }

    // 2. Check exception verbs (fully irregular)
    if (EXCEPTION_VERBS[verb] && EXCEPTION_VERBS[verb][tense]) {
      return createTable(persons, EXCEPTION_VERBS[verb][tense], tense);
    }

    // 3. Use pattern-based rules
    return conjugateWithRules(verb, tense);
  }

  // Pattern-based conjugation
  function conjugateWithRules(verb, tense) {
    if (tense === "present") {
      return conjugatePresent(verb);
    } else if (tense === "past") {
      return conjugatePast(verb);
    } else if (tense === "future") {
      return conjugateFuture(verb);
    }
    
    return "<div>Unsupported tense</div>";
  }

  function conjugatePresent(verb) {
    // Find matching rule
    for (let rule of CONJUGATION_PATTERNS.present) {
      if (rule.pattern.test(verb)) {
        const stem = rule.stemTransform(verb);
        const baseEndings = rule.endings;
        // Expand 6 endings to 9 persons: ja, ty, on, ona, ono, my, wy, oni, one
        const expandedForms = [
          stem + baseEndings[0], // ja
          stem + baseEndings[1], // ty
          stem + baseEndings[2], // on
          stem + baseEndings[2], // ona (same as on)
          stem + baseEndings[2], // ono (same as on)
          stem + baseEndings[3], // my
          stem + baseEndings[4], // wy
          stem + baseEndings[5], // oni
          stem + baseEndings[5]  // one (same as oni)
        ];
        return createTable(persons, expandedForms, "present");
      }
    }
    
    // Fallback to basic -ć removal
    const stem = verb.replace(/ć$/, "");
    const baseEndings = ["ę", "esz", "e", "emy", "ecie", "ą"];
    const expandedForms = [
      stem + baseEndings[0], // ja
      stem + baseEndings[1], // ty
      stem + baseEndings[2], // on
      stem + baseEndings[2], // ona
      stem + baseEndings[2], // ono
      stem + baseEndings[3], // my
      stem + baseEndings[4], // wy
      stem + baseEndings[5], // oni
      stem + baseEndings[5]  // one
    ];
    return createTable(persons, expandedForms, "present");
  }

  function conjugatePast(verb) {
    // Find matching rule
    for (let rule of CONJUGATION_PATTERNS.past) {
      if (rule.pattern.test(verb)) {
        const stem = rule.stemTransform(verb);
        const baseMasculine = rule.endingsMasculine;
        const baseFeminine = rule.endingsFeminine;
        
        // Create forms for all 9 persons with proper gender
        const expandedForms = [
          stem + baseMasculine[0] + "/" + stem + baseFeminine[0], // ja (m/f)
          stem + baseMasculine[1] + "/" + stem + baseFeminine[1], // ty (m/f)
          stem + baseMasculine[2], // on
          stem + baseFeminine[2],  // ona
          stem + baseMasculine[2].replace(/ł$/, "ło"), // ono
          stem + baseMasculine[3] + "/" + stem + baseFeminine[3], // my (m/f)
          stem + baseMasculine[4] + "/" + stem + baseFeminine[4], // wy (m/f)
          stem + baseMasculine[5], // oni
          stem + baseFeminine[5]   // one
        ];
        return createTable(persons, expandedForms, "past");
      }
    }
    
    // Fallback
    const stem = verb.replace(/ć$/, "");
    const baseMasculine = ["łem", "łeś", "ł", "liśmy", "liście", "li"];
    const baseFeminine = ["łam", "łaś", "ła", "łyśmy", "łyście", "ły"];
    
    const expandedForms = [
      stem + baseMasculine[0] + "/" + stem + baseFeminine[0], // ja
      stem + baseMasculine[1] + "/" + stem + baseFeminine[1], // ty
      stem + baseMasculine[2], // on
      stem + baseFeminine[2],  // ona
      stem + baseMasculine[2].replace(/ł$/, "ło"), // ono
      stem + baseMasculine[3] + "/" + stem + baseFeminine[3], // my
      stem + baseMasculine[4] + "/" + stem + baseFeminine[4], // wy
      stem + baseMasculine[5], // oni
      stem + baseFeminine[5]   // one
    ];
    return createTable(persons, expandedForms, "past");
  }

  function conjugateFuture(verb) {
    // First check if it's a perfective verb (simple future)
    for (let rule of CONJUGATION_PATTERNS.future) {
      if (rule.pattern.test(verb) && rule.type === "perfective") {
        const stem = rule.stemTransform(verb);
        const baseEndings = rule.endings;
        // Expand 6 endings to 9 persons
        const expandedForms = [
          stem + baseEndings[0], // ja
          stem + baseEndings[1], // ty
          stem + baseEndings[2], // on
          stem + baseEndings[2], // ona
          stem + baseEndings[2], // ono
          stem + baseEndings[3], // my
          stem + baseEndings[4], // wy
          stem + baseEndings[5], // oni
          stem + baseEndings[5]  // one
        ];
        return createTable(persons, expandedForms, "future (simple)");
      }
    }
    
    // Check for some common perfective patterns
    if (isPerfectiveVerb(verb)) {
      // Try to conjugate as perfective using present tense rules
      const presentResult = conjugatePresent(verb);
      return presentResult.replace("present", "future (simple)");
    }
    
    // Default to compound future (imperfective)
    const baseAux = CONJUGATION_PATTERNS.futureAux;
    const expandedForms = [
      baseAux[0] + " " + verb, // ja
      baseAux[1] + " " + verb, // ty
      baseAux[2] + " " + verb, // on
      baseAux[2] + " " + verb, // ona
      baseAux[2] + " " + verb, // ono
      baseAux[3] + " " + verb, // my
      baseAux[4] + " " + verb, // wy
      baseAux[5] + " " + verb, // oni
      baseAux[5] + " " + verb  // one
    ];
    return createTable(persons, expandedForms, "future (compound)");
  }

  // Helper function to detect perfective verbs
  function isPerfectiveVerb(verb) {
    // Common perfective prefixes
    const perfectivePrefixes = [
      /^po/, /^z[ae]?/, /^na/, /^od/, /^do/, /^przy/, /^wy/, /^u/, /^roz/, /^s/
    ];
    
    return perfectivePrefixes.some(prefix => prefix.test(verb)) ||
           verb.endsWith('nąć') || // most -nąć verbs are perfective
           ['kupić', 'sprzedać', 'dać', 'wziąć', 'przyjść', 'wyjść'].includes(verb);
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
