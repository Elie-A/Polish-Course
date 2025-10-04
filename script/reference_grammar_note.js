const grammarModal = document.getElementById("grammarNoteModal");
const grammarBtn = document.getElementById("grammarNoteBtn");
const grammarClose = document.querySelector(".grammar-note-close");

// Open modal
grammarBtn.addEventListener("click", () => {
  grammarModal.style.display = "flex";
});

// Close modal
grammarClose.addEventListener("click", () => {
  grammarModal.style.display = "none";
});

// Close if clicked outside card
window.addEventListener("click", (e) => {
  if (e.target === grammarModal) {
    grammarModal.style.display = "none";
  }
});
