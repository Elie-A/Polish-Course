let exercises = {};
let currentExerciseType = '';
let currentIndex = 0;
let score = 0;
let timerInterval;
let currentSet = []; // working array (shuffled or original)

// Unified init using PolishApp utilities
(function(){
  function init(){
    const app = window.PolishApp; if(!app || !app.dom) return setTimeout(init,40);
    const { dom, storage, loadJSONFile, effects } = app;
    dom.onReady(() => {
      // Restore from storage if present
      exercises = storage.getJSON('exercises', {});

      // Auto-load bundled exercises.json if nothing in storage
      if(!exercises || Object.keys(exercises).length === 0){
        // Restore from storage (manual load only; no auto-fetch to avoid file:// CORS)
        exercises = storage.getJSON('exercises', {});
        updateCounts();
      }

      const loadBtn = dom.qs('#load-btn');
      const fileInput = dom.qs('#file-input');
      dom.addEvent(loadBtn,'click', () => fileInput && fileInput.click());
      dom.addEvent(fileInput,'change', (e) => {
        const file = e.target.files[0];
        loadJSONFile(file,
          data => (data.grammar || data.numbers || data.cases || data.vocabulary),
          data => { 
            exercises = data; storage.setJSON('exercises', exercises); 
            app.showModal && app.showModal('Exercises loaded successfully! Now choose a category to begin.', { autoClose: 2500 });
            // Clear any existing session state (no auto-start)
            currentExerciseType=''; currentIndex=0; score=0; currentSet=[]; clearInterval(timerInterval);
            const container = document.getElementById('exercise-container');
            if(container){
              container.innerHTML = `<p style="text-align:center; margin:0; font-weight:bold; color:#c61322;">Exercises loaded. Select a type above to start.</p>`;
            }
            updateCounts();
          },
          msg => app.showModal && app.showModal('Error loading JSON: ' + msg)
        );
      });

      // Reset
      dom.addEvent(dom.qs('#reset-btn'),'click', () => {
        exercises = {}; currentExerciseType=''; currentIndex=0; score=0; clearInterval(timerInterval);
        const container = dom.qs('#exercise-container');
        if(container) container.textContent = 'Load the exercises file to start';
        if(fileInput) fileInput.value='';
        const select = dom.qs('#exercise-type'); if(select) select.value='selectType';
        const exampleEl = dom.qs('#exercise-example'); if(exampleEl) exampleEl.textContent='';
        storage.setJSON('exercises', {});
          const recent = dom.qs('#recent-added'); if(recent) recent.textContent='';
  app.showModal && app.showModal('Exercises have been reset!', { autoClose: 2000 });
          updateCounts();
      });

      // Exercise type change & example handling (single listener)
      const exerciseTypeSelect = dom.qs('#exercise-type');
      const exampleEl = dom.qs('#exercise-example');
      dom.addEvent(exerciseTypeSelect,'change', e => {
        const type = e.target.value;
        if(type === 'selectType'){ if(exampleEl) exampleEl.textContent=''; app.showModal && app.showModal('Please select a valid exercise type.'); return; }
        if(exampleEl) exampleEl.textContent = exampleFormats[type] || '';
      });

      // Add exercise button
      dom.addEvent(dom.qs('#add-exercise-btn'),'click', () => {
        const type = exerciseTypeSelect.value;
        const polish = dom.qs('#exercise-polish').value.trim();
        const answer = dom.qs('#exercise-answer').value.trim();
        if(type === 'selectType') { app.showModal && app.showModal('Please select a valid exercise type before adding an exercise.'); return; }
        if(!polish || !answer){ app.showModal && app.showModal('Please fill in both the question/Polish and answer/English fields.'); return; }
        if(!exercises[type]) exercises[type]=[];
        // Duplicate detection (case-insensitive combined key)
        const normPolish = polish.toLowerCase();
        const normAnswer = answer.toLowerCase();
        const exists = exercises[type].some(item => {
          if(type==='vocabulary' || type==='flashcards') return item.polish.toLowerCase()===normPolish && item.english.toLowerCase()===normAnswer;
          return item.question.toLowerCase()===normPolish && item.answer.toLowerCase()===normAnswer;
        });
        if(exists){ app.showModal && app.showModal('This exercise already exists in '+type+'.'); return; }
        if(type==='vocabulary' || type==='flashcards') exercises[type].push({ polish, english: answer }); else exercises[type].push({ question: polish, answer });
        storage.setJSON('exercises', exercises);
        dom.qs('#exercise-polish').value=''; dom.qs('#exercise-answer').value='';
  app.showModal && app.showModal(`New exercise added to "${type}"!`, { autoClose: 2000 });
          const recent = dom.qs('#recent-added');
          if(recent){
            const label = (type==='vocabulary' || type==='flashcards') ? `${polish} = ${answer}` : `${polish} → ${answer}`;
            recent.textContent = `Last added (${type}): ${label}`;
          }
          updateCounts();
      });

      // Download
      dom.addEvent(dom.qs('#download-btn'),'click', () => {
        if(!exercises || Object.keys(exercises).length===0){ app.showModal && app.showModal('No exercises to download. Please load or add exercises first.'); return; }
        const dataStr = JSON.stringify(exercises, null, 2);
        const blob = new Blob([dataStr], { type:'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href=url; a.download='polish_exercises.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  app.showModal && app.showModal('Exercises JSON downloaded successfully!', { autoClose: 2000 });
      });

      // Info highlight
      const infoButtons = [dom.qs('#info-btn'), dom.qs('#info-guide-btn')].filter(Boolean);
      const jsonSection = dom.qs('#json-format');
      infoButtons.forEach(btn => dom.addEvent(btn,'click', () => { if(jsonSection) effects.smoothScrollHighlight(jsonSection,'highlight',1500); }));
    });
  }
  init();
})();

// ------------------- Exercise Functions -------------------
function loadExercise(type) {
  const container = document.getElementById("exercise-container");

  // If the type doesn't exist or has no exercises, reset container and show message
  if (!exercises[type] || exercises[type].length === 0) {
    container.innerHTML = `
      <p style="text-align:center; color:#c61322; font-weight:bold; font-size:1.2rem;">
        No exercises available for "${type}".<br>
        Please load the exercises JSON file first.
      </p>
    `;
    container.style.padding = "20px";
    container.style.border = "2px solid #c61322";
    container.style.borderRadius = "10px";
    container.style.backgroundColor = "#fff5f5";
    container.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

    currentExerciseType = "";
    currentIndex = 0;
    score = 0;
    clearInterval(timerInterval); // stop any running timer
    return;
  }

  // Otherwise, start the exercise
  currentExerciseType = type;
  currentIndex = 0;
  score = 0;
  // Build working set (shuffled if toggle checked)
  const raw = exercises[currentExerciseType];
  const shuffle = document.getElementById('shuffle-toggle')?.checked;
  currentSet = shuffle ? [...raw].sort(()=>Math.random()-0.5) : [...raw];
  updateProgressBar();
  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);

  const container = document.getElementById("exercise-container");
  const data = currentSet[currentIndex];

  // If no more questions, show final score
  if (!data) {
    container.innerHTML = `
      <p style="text-align:center; color:#c61322; font-weight:bold; font-size:1.3rem;">
        🎉 Quiz finished! Score: ${score}/${currentSet.length}
      </p>
    `;
    container.style.opacity = 0;
    window.PolishApp && window.PolishApp.effects && window.PolishApp.effects.fadeIn(container);
    updateProgressBar(true);
    return;
  }

  // Build question HTML
  container.innerHTML = `
    <p><strong>Question ${currentIndex + 1} of ${currentSet.length}:</strong></p>
    <p style="font-size:1.1rem; margin:10px 0;">${
      data.question || data.polish
    }</p>
    <input type="text" id="answer-input" placeholder="Type your answer...">
    <button id="check-btn">Check</button>
    <p class="score">Score: ${score}</p>
    <p id="result"></p>
    <p class="timer">Time left: <span id="time">30</span>s</p>
  `;

  // Fade in effect
  container.style.opacity = 0;
  window.PolishApp && PolishApp.effects.fadeIn(container);

  // Check button listener
  document.getElementById("check-btn").addEventListener("click", checkAnswer);

  // Timer
  const timerSelect = document.getElementById('timer-select');
  let timeLeft = timerSelect ? parseInt(timerSelect.value||'30',10) : 30;
  const noTimer = timeLeft === 0;
  const timeDisplay = document.getElementById("time");
  if(noTimer){
    document.querySelector('.timer').style.display='none';
  } else {
    timeDisplay.textContent = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        document.getElementById("result").textContent = `⏰ Time's up! Correct answer: ${ data.answer || data.english }`;
        nextQuestion();
      }
    }, 1000);
  }
  updateProgressBar();
}

// (Removed local fadeIn, using PolishApp.effects.fadeIn)

function checkAnswer() {
  clearInterval(timerInterval);
  const data = currentSet[currentIndex];
  const ans = document
    .getElementById("answer-input")
    .value.trim()
    .toLowerCase();
  const correctAnswer = (data.answer || data.english).toLowerCase();

  if (ans === correctAnswer) {
    document.getElementById("result").textContent = "✅ Correct!";
    score++;
  } else {
    document.getElementById(
      "result"
    ).textContent = `❌ Incorrect. Correct answer: ${
      data.answer || data.english
    }`;
  }
  nextQuestion();
}

function nextQuestion() {
  currentIndex++;
  setTimeout(() => showQuestion(), 1500);
}

// (Removed scattered DOMContentLoaded and direct event bindings in favor of centralized init)

const exampleFormats = {
  grammar: "Example: Ja ___ (to sleep) → śpię",
  numbers: "Example: 5 in Polish → piąty",
  cases: "Example: I see a ___ (cat - accusative) → kota",
  vocabulary: "Example: kot → cat",
  flashcards: "Example: okno → window",
};

// Helper: pick first populated exercise type
function pickFirstType(obj){
  const order = ['grammar','numbers','cases','vocabulary','flashcards'];
  return order.find(k => Array.isArray(obj[k]) && obj[k].length>0);
}

// Example formats retained; dynamic updates handled in unified init

// Info highlight handled in unified init

function updateProgressBar(finished=false){
  const bar = document.getElementById('progress-bar'); if(!bar) return;
  if(finished){ bar.style.width='100%'; return; }
  if(!currentSet || currentSet.length===0){ bar.style.width='0%'; return; }
  const pct = Math.min(100, (currentIndex / currentSet.length) * 100);
  bar.style.width = pct + '%';
}

// Add counts to exercise buttons reflecting current stored lengths
function updateCounts(){
  const selectors = {
    grammar: "button[onclick=\"loadExercise('grammar')\"]",
    numbers: "button[onclick=\"loadExercise('numbers')\"]",
    cases: "button[onclick=\"loadExercise('cases')\"]",
    vocabulary: "button[onclick=\"loadExercise('vocabulary')\"]",
    flashcards: "button[onclick=\"loadExercise('flashcards')\"]"
  };
  Object.entries(selectors).forEach(([key, sel]) => {
    const btn = document.querySelector(sel); if(!btn) return;
    const base = btn.getAttribute('data-base-label') || btn.textContent.replace(/\s*\(\d+\)$/,'');
    if(!btn.getAttribute('data-base-label')) btn.setAttribute('data-base-label', base);
    const arr = exercises && Array.isArray(exercises[key]) ? exercises[key] : [];
    btn.textContent = arr.length ? `${base} (${arr.length})` : base;
  });
}
