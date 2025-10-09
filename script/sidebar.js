// sidebar.js - quick jump sidebar toggle wrapped with PolishApp utilities
(function(){
  function init(){
    const app = window.PolishApp; if(!app || !app.dom) return setTimeout(init,40);
    const { dom } = app;
    dom.onReady(() => {
      const sidebar = dom.qs('#quickJumpSidebar');
      const toggleBtn = dom.qs('#sidebarToggle');
      if(!sidebar || !toggleBtn) return; // nothing to do
      dom.addEvent(toggleBtn,'click', () => {
        const isCollapsed = sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed', !isCollapsed);
        sidebar.classList.toggle('expanded', isCollapsed);
        toggleBtn.textContent = isCollapsed ? '▼' : '☰';
      });
    });
  }
  init();
})();
