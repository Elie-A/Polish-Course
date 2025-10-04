const sidebar = document.getElementById("quickJumpSidebar");
const toggleBtn = document.getElementById("sidebarToggle");

toggleBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    sidebar.classList.add("expanded");
    toggleBtn.textContent = "▼";
  } else {
    sidebar.classList.remove("expanded");
    sidebar.classList.add("collapsed");
    toggleBtn.textContent = "☰";
  }
});
