// sidebar.js - Quick Jump Sidebar Toggle (refactored with enhancements)
(function () {
  let attempts = 0;
  function init() {
    const app = window.PolishApp;
    if (!app || !app.dom) {
      if (attempts++ < 100) return setTimeout(init, 40);
      console.warn("QuickJumpSidebar: PolishApp not found.");
      return;
    }

    const { dom } = app;
    dom.onReady(() => {
      const sidebar = dom.qs("#quickJumpSidebar");
      const toggleBtn = dom.qs("#sidebarToggle");
      if (!sidebar || !toggleBtn) return;

      // Restore saved state from localStorage
      const savedState = localStorage.getItem("quickJumpSidebarState");
      if (savedState === "expanded") {
        sidebar.classList.add("expanded");
        sidebar.classList.remove("collapsed");
        toggleBtn.classList.add("rotated");
        toggleBtn.setAttribute("aria-expanded", "true");
      } else {
        sidebar.classList.add("collapsed");
        sidebar.classList.remove("expanded");
        toggleBtn.classList.remove("rotated");
        toggleBtn.setAttribute("aria-expanded", "false");
      }

      // Click toggle handler
      dom.addEvent(toggleBtn, "click", () => {
        const isCollapsed = sidebar.classList.contains("collapsed");

        // Toggle sidebar classes
        sidebar.classList.toggle("collapsed", !isCollapsed);
        sidebar.classList.toggle("expanded", isCollapsed);

        // Rotate icon for smooth feedback
        toggleBtn.classList.toggle("rotated", isCollapsed);

        // Accessibility attribute
        toggleBtn.setAttribute("aria-expanded", isCollapsed);

        // Persist state
        localStorage.setItem(
          "quickJumpSidebarState",
          isCollapsed ? "expanded" : "collapsed"
        );
      });
    });
  }
  init();
})();
