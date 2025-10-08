let exercises = {};
let currentExerciseType = "";
let currentIndex = 0;
let score = 0;
let timerInterval;

// ------------------- Load JSON via FileReader -------------------
document.getElementById("load-btn").addEventListener("click", () => {
  document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.name.endsWith(".json")) {
    showModal("Please select a JSON file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      // Basic validation
      if (!data.grammar && !data.numbers && !data.cases && !data.vocabulary) {
        throw new Error("Invalid exercises file.");
      }

      exercises = data;
      localStorage.setItem("exercises", JSON.stringify(exercises)); // optional persistence
      showModal("Exercises loaded successfully!");
    } catch (err) {
      showModal("Error loading JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});

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
  showQuestion();
}

function showQuestion() {
  clearInterval(timerInterval);

  const container = document.getElementById("exercise-container");
  const data = exercises[currentExerciseType][currentIndex];

  // If no more questions, show final score
  if (!data) {
    container.innerHTML = `
      <p style="text-align:center; color:#c61322; font-weight:bold; font-size:1.3rem;">
        🎉 Quiz finished! Score: ${score}/${exercises[currentExerciseType].length}
      </p>
    `;
    container.style.opacity = 0;
    fadeIn(container);
    return;
  }

  // Build question HTML
  container.innerHTML = `
    <p><strong>Question ${currentIndex + 1} of ${
    exercises[currentExerciseType].length
  }:</strong></p>
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
  fadeIn(container);

  // Check button listener
  document.getElementById("check-btn").addEventListener("click", checkAnswer);

  // Timer
  let timeLeft = 30;
  const timeDisplay = document.getElementById("time");
  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById(
        "result"
      ).textContent = `⏰ Time's up! Correct answer: ${
        data.answer || data.english
      }`;
      nextQuestion();
    }
  }, 1000);
}

// Simple fade-in function
function fadeIn(element, duration = 500) {
  let opacity = 0;
  element.style.opacity = opacity;
  const interval = 20;
  const increment = interval / duration;
  const fade = setInterval(() => {
    opacity += increment;
    if (opacity >= 1) {
      opacity = 1;
      clearInterval(fade);
    }
    element.style.opacity = opacity;
  }, interval);
}

function checkAnswer() {
  clearInterval(timerInterval);
  const data = exercises[currentExerciseType][currentIndex];
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

document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("reset-btn");
  const container = document.getElementById("exercise-container");
  const exerciseTypeSelect = document.getElementById("exercise-type"); // reference to select
  const exampleEl = document.getElementById("exercise-example"); // clear example too

  resetBtn.addEventListener("click", () => {
    // Clear exercises
    exercises = {};
    currentExerciseType = "";
    currentIndex = 0;
    score = 0;

    // Stop any timer
    clearInterval(timerInterval);

    // Reset container content
    container.innerHTML = "Load the exercises file to start";

    // Reset file input
    document.getElementById("file-input").value = "";

    // Reset select back to default
    exerciseTypeSelect.value = "selectType";

    // Clear example text
    exampleEl.textContent = "";

    showModal("Exercises have been reset!");
  });
});

document.getElementById("exercise-type").addEventListener("change", (e) => {
  const type = e.target.value;

  if (type === "selectType") {
    exampleEl.textContent = ""; // clear previous example
    showModal("Please select a valid exercise type.");
    return;
  }

  exampleEl.textContent = exampleFormats[type];
});

document.getElementById("add-exercise-btn").addEventListener("click", () => {
  const type = document.getElementById("exercise-type").value;
  const polish = document.getElementById("exercise-polish").value.trim();
  const answer = document.getElementById("exercise-answer").value.trim();

  if (type === "selectType") {
    showModal("Please select a valid exercise type before adding an exercise.");
    return;
  }

  if (!polish || !answer) {
    showModal(
      "Please fill in both the question/Polish and answer/English fields."
    );
    return;
  }

  if (!exercises[type]) exercises[type] = [];

  if (type === "vocabulary" || type === "flashcards") {
    exercises[type].push({ polish, english: answer });
  } else {
    exercises[type].push({ question: polish, answer });
  }

  localStorage.setItem("exercises", JSON.stringify(exercises));

  document.getElementById("exercise-polish").value = "";
  document.getElementById("exercise-answer").value = "";

  showModal(`New exercise added to "${type}"!`);
});

document.getElementById("download-btn").addEventListener("click", () => {
  if (!exercises || Object.keys(exercises).length === 0) {
    showModal("No exercises to download. Please load or add exercises first.");
    return;
  }

  const dataStr = JSON.stringify(exercises, null, 4); // pretty format
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "polish_exercises.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showModal("Exercises JSON downloaded successfully!");
});

const exampleFormats = {
  grammar: "Example: Ja ___ (to sleep) → śpię",
  numbers: "Example: 5 in Polish → piąty",
  cases: "Example: I see a ___ (cat - accusative) → kota",
  vocabulary: "Example: kot → cat",
  flashcards: "Example: okno → window",
};

const exampleEl = document.getElementById("exercise-example");

document.getElementById("exercise-type").addEventListener("change", (e) => {
  const type = e.target.value;
  exampleEl.textContent = exampleFormats[type];
});

document.addEventListener("DOMContentLoaded", () => {
  const infoBtn = document.getElementById("info-btn");
  const jsonSection = document.getElementById("json-format");

  if (infoBtn && jsonSection) {
    infoBtn.addEventListener("click", () => {
      jsonSection.scrollIntoView({ behavior: "smooth" });
      jsonSection.classList.add("highlight");
      setTimeout(() => jsonSection.classList.remove("highlight"), 1500);
    });
  }
});
