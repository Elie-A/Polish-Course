let vocabulary = [];
let filteredVocabulary = [];
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  // Load saved vocabulary from localStorage
  const saved = localStorage.getItem("vocabulary");
  if (saved) {
    vocabulary = JSON.parse(saved);
    filteredVocabulary = [...vocabulary];
    renderVocabulary(filteredVocabulary);
    populateCategoryFilter(vocabulary);
  }

  // Event listeners
  document
    .getElementById("add-form")
    .addEventListener("submit", handleAddEntry);
  document.getElementById("search").addEventListener("input", handleSearch);
  document
    .getElementById("category-filter")
    .addEventListener("change", handleFilter);
  document.getElementById("export-btn").addEventListener("click", handleExport);

  // Load JSON button
  document.getElementById("load-btn").addEventListener("click", () => {
    document.getElementById("file-input").click();
  });
  document
    .getElementById("file-input")
    .addEventListener("change", handleFileLoad);

  // Pagination
  document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderVocabulary(filteredVocabulary);
    }
  });
  document.getElementById("next-page").addEventListener("click", () => {
    const totalPages = Math.ceil(filteredVocabulary.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderVocabulary(filteredVocabulary);
    }
  });
});

// ---------- Functions ----------

function handleFileLoad(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.name.endsWith(".json")) {
    alert("Please select a JSON file.");
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
      alert("Vocabulary loaded successfully!");
    } catch (err) {
      alert("Error loading JSON: " + err.message);
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
      <td>${entry.category || "—"}</td>
    `;
    tableBody.appendChild(row);
    setTimeout(() => {
      row.style.opacity = 1;
    }, 50); // fade-in effect
  });

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  updatePageInfo(currentPage, totalPages);
}

function updatePageInfo(page, total) {
  const info = document.getElementById("page-info");
  info.textContent = total > 0 ? `Page ${page} of ${total}` : "No results";

  // Enable/disable pagination buttons
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");

  prevBtn.disabled = page <= 1;
  nextBtn.disabled = page >= total || total === 0;

  // Optional: visually indicate disabled buttons
  prevBtn.style.opacity = prevBtn.disabled ? 0.5 : 1;
  nextBtn.style.opacity = nextBtn.disabled ? 0.5 : 1;
  prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";
  nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
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
    alert("Please fill in both Polish and English fields.");
    return;
  }

  const newEntry = { polish, english, category };
  vocabulary.push(newEntry);
  localStorage.setItem("vocabulary", JSON.stringify(vocabulary));

  filteredVocabulary = [...vocabulary];
  resetPage();
  renderVocabulary(filteredVocabulary);
  populateCategoryFilter(vocabulary);

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
  alert("Vocabulary exported as vocabulary.json");
}

function resetPage() {
  currentPage = 1;
}
