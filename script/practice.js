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

    showModal("Exercises have been reset!");
  });
});
