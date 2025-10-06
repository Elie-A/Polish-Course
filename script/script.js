document.addEventListener("DOMContentLoaded", function () {
  // Collapse functionality
  const collapseHeaders = document.querySelectorAll(".collapse-header");
  collapseHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const toggleBtn = this.querySelector(".toggle-btn");

      if (content.classList.contains("active")) {
        content.classList.remove("active");
        toggleBtn.textContent = "+";
      } else {
        content.classList.add("active");
        toggleBtn.textContent = "-";
      }
    });
  });

  // Modal functionality for all card types
  const cardSelectors = [
    ".case-card",
    ".number-card",
    ".alphabet-card",
    ".calendar-card",
    ".pronouns-case-card",
  ];

  cardSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener("click", () => {
        const modalId = card.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add("show");
      });
    });
  });

  // Close modal on clicking the X button
  document.querySelectorAll(".close").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) modal.classList.remove("show");
    });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("show");
    }
  });

  // Close modal with ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        modal.classList.remove("show");
      });
    }
  });
});

function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = message;
  modal.style.display = "flex";

  const closeBtn = document.getElementById("modal-close");
  const okBtn = document.getElementById("modal-ok");

  const closeModal = () => {
    modal.style.display = "none";
    closeBtn.removeEventListener("click", closeModal);
    okBtn.removeEventListener("click", closeModal);
  };

  closeBtn.addEventListener("click", closeModal);
  okBtn.addEventListener("click", closeModal);
}
