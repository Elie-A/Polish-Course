// script.js - page-level initializers leveraging PolishApp utilities
(function () {
  function init() {
    const app = window.PolishApp;
    if (!app || !app.dom) {
      // retry shortly if common.js hasn't executed yet (edge case)
      return setTimeout(init, 50);
    }
    const { dom, modal } = app;
    dom.onReady(() => {
      const headers = dom.qsa(".collapse-header");
      console.debug(
        "[PolishApp] Initializing collapses. Found headers:",
        headers.length
      );
      headers.forEach((header) => {
        dom.addEvent(header, "click", () => {
          const content = header.nextElementSibling;
          if (!content) return;
          const toggleBtn = header.querySelector(".toggle-btn");
          const active = content.classList.toggle("active");
          if (toggleBtn) toggleBtn.textContent = active ? "-" : "+";
        });
      });

      // Modal cards
      const cardSelectors = [
        ".case-card",
        ".number-card",
        ".alphabet-card",
        ".calendar-card",
        ".pronouns-case-card",
        ".verb-card",
        ".perf-imperf-card",
        ".pref-mov-card",
        ".gender-card",
        ".prep-case-card",
        ".colors-card",
        ".conj-type-card",
      ];
      modal && modal.bindCards(cardSelectors);
      modal && modal.bindDismiss();
      console.debug("[PolishApp] Initialization complete.");
    });
  }
  init();
})();
