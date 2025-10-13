let vocabulary = [];
let filteredVocabulary = [];
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// ---- UI Helper references (assigned in init) ----
let btnPrev,
  btnNext,
  btnLoad,
  btnClear,
  btnExport,
  btnSubmit,
  btnInfo,
  btnDownloadSample,
  fileInputEl;

// Default 10 common Polish words
const DEFAULT_VOCAB = [
  { polish: "dziękuję", english: "thank you", category: "common" },
  { polish: "tak", english: "yes", category: "common" },
  { polish: "nie", english: "no", category: "common" },
  { polish: "proszę", english: "please", category: "common" },
  { polish: "cześć", english: "hello/hi", category: "common" },
  { polish: "do widzenia", english: "goodbye", category: "common" },
  { polish: "przepraszam", english: "sorry/excuse me", category: "common" },
  { polish: "dobry", english: "good", category: "common" },
  { polish: "zły", english: "bad", category: "common" },
  { polish: "dzień", english: "day", category: "time" },
];

// Provide safe wrapper for modal messaging with consistent autoClose
function safeModal(msg, opts) {
  let optionsObj = {};
  if (typeof opts === "number") optionsObj.autoClose = opts;
  else if (opts) optionsObj = opts;
  if (optionsObj.autoClose == null) optionsObj.autoClose = 1800; // default auto close
  if (window.PolishApp && typeof PolishApp.showModal === "function") {
    PolishApp.showModal(msg, optionsObj);
  } else if (typeof showModal === "function") {
    try {
      showModal(msg);
    } catch (_) {}
  } else {
    console.warn("Modal message (no UI):", msg);
  }
  // Watchdog to ensure overlay does not linger >5s
  setTimeout(() => {
    const modal = document.getElementById("modal");
    if (modal && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  }, 1800);
}

function reEnableActionButtons() {
  [btnLoad, btnClear, btnInfo, btnExport, btnSubmit, btnDownloadSample].forEach(
    (b) => {
      if (b) {
        b.disabled = false;
        b.style.opacity = 1;
        b.style.cursor = "pointer";
      }
    }
  );
}

function updatePaginationButtons() {
  if (!btnPrev || !btnNext) return;
  const totalPages = Math.ceil(filteredVocabulary.length / ITEMS_PER_PAGE) || 0;
  btnPrev.disabled = currentPage <= 1 || totalPages === 0;
  btnNext.disabled = currentPage >= totalPages || totalPages === 0;
  [btnPrev, btnNext].forEach((b) => {
    b.style.opacity = b.disabled ? 0.5 : 1;
    b.style.cursor = b.disabled ? "not-allowed" : "pointer";
  });
}

// ---------- Functions ----------

function handleDownloadSample() {
  const blob = new Blob([JSON.stringify(DEFAULT_VOCAB, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sample-vocabulary.json";
  a.click();
  URL.revokeObjectURL(url);
  safeModal("Sample vocabulary downloaded");
}

function handleFileLoad(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.name.endsWith(".json")) {
    safeModal("Please select a JSON file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (
        !Array.isArray(data) ||
        !data.every((item) => item.polish && item.english)
      ) {
        throw new Error(
          "Invalid format: each entry must have 'polish' and 'english' fields."
        );
      }

      vocabulary = data;
      filteredVocabulary = [...vocabulary];
      localStorage.setItem("vocabulary", JSON.stringify(vocabulary));
      resetPage();
      renderVocabulary(filteredVocabulary);
      populateCategoryFilter(vocabulary);
      updatePaginationButtons();
      safeModal("Vocabulary loaded successfully!");
      reEnableActionButtons();
    } catch (err) {
      safeModal("Error loading JSON: " + err.message, 2600);
      reEnableActionButtons();
    }
  };
  reader.readAsText(file);
}

function renderVocabulary(data) {
  const tableBody = document.querySelector("#vocabulary-table tbody");
  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3" class="no-results">No vocabulary found</td></tr>`;
    updatePageInfo(0, 0);
    return;
  }

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageData = data.slice(start, end);

  pageData.forEach((entry) => {
    const row = document.createElement("tr");
    row.style.opacity = 0; // fade-in start
    row.innerHTML = `
      <td>${entry.polish}</td>
      <td>${entry.english}</td>
      <td class="badge">${entry.category || "—"}</td>
    `;
    tableBody.appendChild(row);
    setTimeout(() => {
      row.style.opacity = 1;
    }, 50); // fade-in effect
  });

  updatePageInfo(currentPage, Math.ceil(data.length / ITEMS_PER_PAGE));
  updatePaginationButtons();
}

function updatePageInfo(page, total) {
  const info = document.getElementById("page-info");
  info.textContent = total > 0 ? `Page ${page} of ${total}` : "No results";
}

function populateCategoryFilter(data) {
  const select = document.getElementById("category-filter");
  const categories = [
    ...new Set(data.map((e) => e.category).filter(Boolean)),
  ].sort();

  select.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase();
  const category = document.getElementById("category-filter").value;

  filteredVocabulary = vocabulary.filter((entry) => {
    const matchesText =
      entry.polish.toLowerCase().includes(query) ||
      entry.english.toLowerCase().includes(query);
    const matchesCategory = category ? entry.category === category : true;
    return matchesText && matchesCategory;
  });

  resetPage();
  renderVocabulary(filteredVocabulary);
}

function handleFilter(e) {
  const category = e.target.value;
  const query = document.getElementById("search").value.toLowerCase();

  filteredVocabulary = vocabulary.filter((entry) => {
    const matchesCategory = category ? entry.category === category : true;
    const matchesText =
      entry.polish.toLowerCase().includes(query) ||
      entry.english.toLowerCase().includes(query);
    return matchesCategory && matchesText;
  });

  resetPage();
  renderVocabulary(filteredVocabulary);
}

function handleAddEntry(e) {
  e.preventDefault();
  const polish = document.getElementById("polish").value.trim();
  const english = document.getElementById("english").value.trim();
  const category = document.getElementById("category").value.trim() || "misc";

  if (!polish || !english) {
    safeModal("Please fill in both Polish and English fields.");
    return;
  }

  const newEntry = { polish, english, category };
  vocabulary.push(newEntry);
  window.PolishApp && PolishApp.storage.setJSON("vocabulary", vocabulary);

  filteredVocabulary = [...vocabulary];
  resetPage();
  renderVocabulary(filteredVocabulary);
  populateCategoryFilter(vocabulary);
  updatePaginationButtons();

  document.getElementById("add-form").reset();
}

function handleExport() {
  const blob = new Blob([JSON.stringify(vocabulary, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vocabulary.json";
  a.click();
  URL.revokeObjectURL(url);
  safeModal("Vocabulary exported as vocabulary.json");
  reEnableActionButtons();
}

function resetPage() {
  currentPage = 1;
}

// Removed duplicate DOMContentLoaded listeners (will be wrapped in unified initializer below)

// Unified initialization using PolishApp utilities
(function () {
  function init() {
    const app = window.PolishApp;
    if (!app || !app.dom) return setTimeout(init, 40);
    const { dom, storage, effects } = app;
    dom.onReady(() => {
      vocabulary = storage.getJSON("vocabulary", []);
      filteredVocabulary = [...vocabulary];
      // Always populate category filter (even empty -> shows 'All Categories')
      populateCategoryFilter(vocabulary);
      if (vocabulary.length) {
        renderVocabulary(filteredVocabulary);
      }
      // Cache buttons
      btnPrev = dom.qs("#prev-page");
      btnNext = dom.qs("#next-page");
      btnLoad = dom.qs("#load-btn");
      btnClear = dom.qs("#clear-btn");
      btnExport = dom.qs("#export-btn");
      btnInfo = dom.qs("#info-btn");
      btnDownloadSample = dom.qs("#download-sample-btn");
      btnSubmit = dom.qs("#add-form")?.querySelector('button[type="submit"]');
      fileInputEl = dom.qs("#file-input");
      updatePaginationButtons();
      // Bind events
      dom.addEvent(dom.qs("#add-form"), "submit", handleAddEntry);
      dom.addEvent(dom.qs("#search"), "input", handleSearch);
      dom.addEvent(dom.qs("#category-filter"), "change", handleFilter);
      dom.addEvent(dom.qs("#export-btn"), "click", handleExport);
      dom.addEvent(btnLoad, "click", () => fileInputEl && fileInputEl.click());
      dom.addEvent(fileInputEl, "change", handleFileLoad);
      dom.addEvent(btnDownloadSample, "click", handleDownloadSample);
      dom.addEvent(btnPrev, "click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderVocabulary(filteredVocabulary);
        }
      });
      dom.addEvent(btnNext, "click", () => {
        const totalPages = Math.ceil(
          filteredVocabulary.length / ITEMS_PER_PAGE
        );
        if (currentPage < totalPages) {
          currentPage++;
          renderVocabulary(filteredVocabulary);
        }
      });
      const searchInput = dom.qs("#search");
      const categoryFilter = dom.qs("#category-filter");
      dom.addEvent(btnClear, "click", () => {
        vocabulary = [];
        filteredVocabulary = [];
        renderVocabulary(filteredVocabulary);
        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.selectedIndex = 0;
        if (fileInputEl) fileInputEl.value = "";
        storage.setJSON("vocabulary", []);
        resetPage();
        populateCategoryFilter(vocabulary);
        updatePaginationButtons();
        reEnableActionButtons();
        safeModal("Vocabulary has been cleared!");
      });
      const jsonSection = dom.qs("#json-format");
      dom.addEvent(btnInfo, "click", () => {
        if (jsonSection)
          effects.smoothScrollHighlight(jsonSection, "highlight", 1500);
      });
    });
  }
  init();
})();
