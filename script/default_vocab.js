const defaultVocab = [
  // Human Appearance
  {
    polish: "gruby",
    english: "fat",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "ładny",
    english: "pretty",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "piękny",
    english: "beautiful",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "chudy",
    english: "thin",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "brzydki",
    english: "ugly",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "wysoki",
    english: "tall",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "niski",
    english: "short",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "otyły",
    english: "overweight",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "muskularny",
    english: "muscular",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "wąs",
    english: "moustache",
    category: "Human Appearance",
    details: "noun (m)",
  },
  {
    polish: "pieg",
    english: "freckle",
    category: "Human Appearance",
    details: "noun (m)",
  },
  {
    polish: "smukły",
    english: "slender",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "blondyn",
    english: "blond",
    category: "Human Appearance",
    details: "noun (m)",
  },
  {
    polish: "blizna",
    english: "scar",
    category: "Human Appearance",
    details: "noun (f)",
  },
  {
    polish: "brunetka",
    english: "brunette",
    category: "Human Appearance",
    details: "noun (f)",
  },
  {
    polish: "szczupły",
    english: "slim",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "piegowaty",
    english: "freckled",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "pulchny",
    english: "plump",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "przystojny",
    english: "handsome",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "kręcone włosy",
    english: "curly hair",
    category: "Human Appearance",
    details: "noun phrase",
  },
  {
    polish: "tatuaż",
    english: "tattoo",
    category: "Human Appearance",
    details: "noun (m)",
  },
  {
    polish: "łysy",
    english: "bald",
    category: "Human Appearance",
    details: "adjective",
  },
  {
    polish: "atrakcyjny",
    english: "attractive",
    category: "Human Appearance",
    details: "adjective",
  },

  // Family
  {
    polish: "babcia",
    english: "grandmother",
    category: "Family",
    details: "noun (f)",
  },
  {
    polish: "dziadek",
    english: "grandfather",
    category: "Family",
    details: "noun (m)",
  },
  { polish: "mama", english: "mom", category: "Family", details: "noun (f)" },
  { polish: "tata", english: "dad", category: "Family", details: "noun (m)" },
  {
    polish: "brat",
    english: "brother",
    category: "Family",
    details: "noun (m)",
  },
  {
    polish: "siostra",
    english: "sister",
    category: "Family",
    details: "noun (f)",
  },
  { polish: "syn", english: "son", category: "Family", details: "noun (m)" },
  {
    polish: "córka",
    english: "daughter",
    category: "Family",
    details: "noun (f)",
  },
  {
    polish: "mąż",
    english: "husband",
    category: "Family",
    details: "noun (m)",
  },
  { polish: "żona", english: "wife", category: "Family", details: "noun (f)" },
  {
    polish: "rodzice",
    english: "parents",
    category: "Family",
    details: "noun (pl)",
  },
  {
    polish: "kuzyn",
    english: "cousin",
    category: "Family",
    details: "noun (m)",
  },
  {
    polish: "wujek",
    english: "uncle",
    category: "Family",
    details: "noun (m)",
  },
  {
    polish: "ciocia",
    english: "aunt",
    category: "Family",
    details: "noun (f)",
  },

  // Personality
  {
    polish: "miły",
    english: "kind",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "leniwy",
    english: "lazy",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "odważny",
    english: "brave",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "nieśmiały",
    english: "shy",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "zabawny",
    english: "funny",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "pracowity",
    english: "hard-working",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "hojny",
    english: "generous",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "samolubny",
    english: "selfish",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "cierpliwy",
    english: "patient",
    category: "Personality",
    details: "adjective",
  },
  {
    polish: "kreatywny",
    english: "creative",
    category: "Personality",
    details: "adjective",
  },

  // Body
  { polish: "głowa", english: "head", category: "Body", details: "noun (f)" },
  { polish: "oko", english: "eye", category: "Body", details: "noun (n)" },
  { polish: "nos", english: "nose", category: "Body", details: "noun (m)" },
  { polish: "ucho", english: "ear", category: "Body", details: "noun (n)" },
  { polish: "usta", english: "mouth", category: "Body", details: "noun (pl)" },
  { polish: "ręka", english: "arm", category: "Body", details: "noun (f)" },
  { polish: "noga", english: "leg", category: "Body", details: "noun (f)" },
  { polish: "serce", english: "heart", category: "Body", details: "noun (n)" },
  { polish: "mózg", english: "brain", category: "Body", details: "noun (m)" },
  { polish: "krew", english: "blood", category: "Body", details: "noun (f)" },

  // Professions
  {
    polish: "lekarz",
    english: "doctor",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "nauczyciel",
    english: "teacher",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "pielęgniarz",
    english: "nurse",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "policjant",
    english: "policeman",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "strażak",
    english: "firefighter",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "kucharz",
    english: "cook",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "kelner",
    english: "waiter",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "prawnik",
    english: "lawyer",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "inżynier",
    english: "engineer",
    category: "Professions",
    details: "noun (m)",
  },
  {
    polish: "dziennikarz",
    english: "journalist",
    category: "Professions",
    details: "noun (m)",
  },

  // Food & Drinks
  { polish: "chleb", english: "bread", category: "Food", details: "noun (m)" },
  { polish: "woda", english: "water", category: "Drinks", details: "noun (f)" },
  { polish: "mleko", english: "milk", category: "Drinks", details: "noun (n)" },
  {
    polish: "kawa",
    english: "coffee",
    category: "Drinks",
    details: "noun (f)",
  },
  {
    polish: "herbata",
    english: "tea",
    category: "Drinks",
    details: "noun (f)",
  },
  {
    polish: "jabłko",
    english: "apple",
    category: "Fruits",
    details: "noun (n)",
  },
  {
    polish: "banan",
    english: "banana",
    category: "Fruits",
    details: "noun (m)",
  },
  {
    polish: "pomidor",
    english: "tomato",
    category: "Vegetables",
    details: "noun (m)",
  },
  {
    polish: "ziemniak",
    english: "potato",
    category: "Vegetables",
    details: "noun (m)",
  },
  { polish: "ser", english: "cheese", category: "Dairy", details: "noun (m)" },

  // Animals
  { polish: "pies", english: "dog", category: "Animals", details: "noun (m)" },
  { polish: "kot", english: "cat", category: "Animals", details: "noun (m)" },
  { polish: "koń", english: "horse", category: "Animals", details: "noun (m)" },
  { polish: "ptak", english: "bird", category: "Animals", details: "noun (m)" },
  { polish: "ryba", english: "fish", category: "Animals", details: "noun (f)" },

  // Weather
  {
    polish: "słońce",
    english: "sun",
    category: "Weather",
    details: "noun (n)",
  },
  {
    polish: "deszcz",
    english: "rain",
    category: "Weather",
    details: "noun (m)",
  },
  {
    polish: "śnieg",
    english: "snow",
    category: "Weather",
    details: "noun (m)",
  },
  {
    polish: "wiatr",
    english: "wind",
    category: "Weather",
    details: "noun (m)",
  },
  {
    polish: "burza",
    english: "storm",
    category: "Weather",
    details: "noun (f)",
  },

  // House
  { polish: "dom", english: "house", category: "House", details: "noun (m)" },
  { polish: "pokój", english: "room", category: "House", details: "noun (m)" },
  {
    polish: "kuchnia",
    english: "kitchen",
    category: "House",
    details: "noun (f)",
  },
  {
    polish: "łazienka",
    english: "bathroom",
    category: "House",
    details: "noun (f)",
  },
  {
    polish: "sypialnia",
    english: "bedroom",
    category: "House",
    details: "noun (f)",
  },
  { polish: "okno", english: "window", category: "House", details: "noun (n)" },
  { polish: "drzwi", english: "door", category: "House", details: "noun (pl)" },

  // Colors
  {
    polish: "czerwony",
    english: "red",
    category: "Colors",
    details: "adjective",
  },
  {
    polish: "niebieski",
    english: "blue",
    category: "Colors",
    details: "adjective",
  },
  {
    polish: "zielony",
    english: "green",
    category: "Colors",
    details: "adjective",
  },
  {
    polish: "żółty",
    english: "yellow",
    category: "Colors",
    details: "adjective",
  },
  {
    polish: "czarny",
    english: "black",
    category: "Colors",
    details: "adjective",
  },
  {
    polish: "biały",
    english: "white",
    category: "Colors",
    details: "adjective",
  },

  // Sports
  {
    polish: "piłka nożna",
    english: "football",
    category: "Sports",
    details: "noun phrase",
  },
  {
    polish: "koszykówka",
    english: "basketball",
    category: "Sports",
    details: "noun (f)",
  },
  {
    polish: "pływanie",
    english: "swimming",
    category: "Sports",
    details: "noun (n)",
  },
  {
    polish: "tenis",
    english: "tennis",
    category: "Sports",
    details: "noun (m)",
  },
  {
    polish: "bieg",
    english: "running",
    category: "Sports",
    details: "noun (m)",
  },
];

let defaultVocabCurrentPage = 1;
let defaultVocabularyItemsPerPage = 25;
let defaultVocabularyFilteredData = [...defaultVocab];
let defaultVocabularySortColumn = "category";
let defaultVocabularySortDirection = 1;

function init() {
  populateCategoryFilter();
  updateStats();
  renderTable();

  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  document
    .getElementById("categoryFilter")
    .addEventListener("change", handleFilter);
  document
    .getElementById("itemsPerPage")
    .addEventListener("change", handleItemsPerPageChange);
}

function populateCategoryFilter() {
  const categories = [...new Set(defaultVocab.map((v) => v.category))].sort();
  const select = document.getElementById("categoryFilter");
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function updateStats() {
  const stats = document.getElementById("stats");
  stats.textContent = `Total Default Vocab: ${defaultVocab.length} words | Showing: ${defaultVocabularyFilteredData.length} words`;
}

function handleSearch(e) {
  const term = e.target.value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  defaultVocabularyFilteredData = defaultVocab.filter((v) => {
    const matchesSearch =
      v.polish.toLowerCase().includes(term) ||
      v.english.toLowerCase().includes(term);
    const matchesCategory = category === "all" || v.category === category;
    return matchesSearch && matchesCategory;
  });

  defaultVocabCurrentPage = 1;
  updateStats();
  renderTable();
}

function handleFilter(e) {
  const category = e.target.value;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  defaultVocabularyFilteredData = defaultVocab.filter((v) => {
    const matchesSearch =
      v.polish.toLowerCase().includes(searchTerm) ||
      v.english.toLowerCase().includes(searchTerm);
    const matchesCategory = category === "all" || v.category === category;
    return matchesSearch && matchesCategory;
  });

  defaultVocabCurrentPage = 1;
  updateStats();
  renderTable();
}

function handleItemsPerPageChange(e) {
  defaultVocabularyItemsPerPage = parseInt(e.target.value);
  defaultVocabCurrentPage = 1;
  renderTable();
}

function sortTable(column) {
  if (defaultVocabularySortColumn === column) {
    defaultVocabularySortDirection *= -1;
  } else {
    defaultVocabularySortColumn = column;
    defaultVocabularySortDirection = 1;
  }

  defaultVocabularyFilteredData.sort((a, b) => {
    if (a[column] < b[column]) return -1 * defaultVocabularySortDirection;
    if (a[column] > b[column]) return 1 * defaultVocabularySortDirection;
    return 0;
  });

  renderTable();
}

function renderTable() {
  const start = (defaultVocabCurrentPage - 1) * defaultVocabularyItemsPerPage;
  const end = start + defaultVocabularyItemsPerPage;
  const pageData = defaultVocabularyFilteredData.slice(start, end);

  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  pageData.forEach((item) => {
    const row = tbody.insertRow();
    row.innerHTML = `
                    <td><strong>${item.polish}</strong></td>
                    <td>${item.english}</td>
                    <td><span class="badge">${item.category}</span></td>
                    <td>${item.details}</td>
                `;
  });

  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(
    defaultVocabularyFilteredData.length / defaultVocabularyItemsPerPage
  );
  document.getElementById(
    "pageInfo"
  ).textContent = `Page ${defaultVocabCurrentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = defaultVocabCurrentPage === 1;
  document.getElementById("nextBtn").disabled =
    defaultVocabCurrentPage === totalPages || totalPages === 0;
}

function changePage(delta) {
  const totalPages = Math.ceil(
    defaultVocabularyFilteredData.length / defaultVocabularyItemsPerPage
  );
  const newPage = defaultVocabCurrentPage + delta;
  if (newPage >= 1 && newPage <= totalPages) {
    defaultVocabCurrentPage = newPage; // ✅ correct variable
    renderTable();
  }
}

init();
