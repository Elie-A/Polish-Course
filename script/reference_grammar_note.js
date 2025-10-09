// reference_grammar_note.js - integrate with PolishApp modal utilities
(function(){
  const app = window.PolishApp;
  if(!app){ return; }
  const { dom } = app;
  dom.onReady(() => {
    const grammarModal = document.getElementById('grammarNoteModal');
    const grammarBtn = document.getElementById('grammarNoteBtn');
    const grammarClose = document.querySelector('.grammar-note-close');
    if(!grammarModal || !grammarBtn) return;

    dom.addEvent(grammarBtn,'click', () => { grammarModal.style.display = 'flex'; });
    dom.addEvent(grammarClose,'click', () => { grammarModal.style.display = 'none'; });
    dom.addEvent(window,'click', e => { if(e.target === grammarModal) grammarModal.style.display = 'none'; });
  });
})();
