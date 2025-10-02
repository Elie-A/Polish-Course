document.addEventListener("DOMContentLoaded", function () {
  const collapseHeaders = document.querySelectorAll(".collapse-header");

  collapseHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const toggleBtn = this.querySelector(".toggle-btn");

      if (content.classList.contains("active")) {
        content.classList.remove("active");
        toggleBtn.textContent = "+";
        toggleBtn.classList.remove("rotated");
      } else {
        content.classList.add("active");
        toggleBtn.textContent = "−";
        toggleBtn.classList.add("rotated");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Open modal when clicking a case card
  document.querySelectorAll(".case-card").forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("show"); // Add show class to trigger CSS
      }
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

document.addEventListener("DOMContentLoaded", () => {
  // Open modal when clicking a number card
  document.querySelectorAll(".number-card").forEach((card) => {
    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add("show"); // Add show class to trigger CSS
      }
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
