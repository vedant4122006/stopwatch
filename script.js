// DOM Elements
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const stopwatchTab = document.getElementById('stopwatchTab');
const pomodoroTab = document.getElementById('pomodoroTab');

// Simple timer variables
let timerMode = 'stopwatch';
let timerRunning = false;
let timerInterval;
let startTime = 0;
let elapsedTime = 0;
let pomodoroTime = 25 * 60 * 1000; // 25 minutes in milliseconds
let darkMode = false;

// Toggle dark mode
themeToggle.addEventListener('click', function () {
  darkMode = !darkMode;
  body.classList.toggle('dark');
  themeToggle.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
});

// Format time for display
function formatTime(time) {
  if (timerMode === 'stopwatch') {
    const ms = Math.floor((time % 1000) / 10);
    const secs = Math.floor((time / 1000) % 60);
    const mins = Math.floor((time / (1000 * 60)) % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  } else {
    const timeLeft = Math.max(0, pomodoroTime - time);
    const secs = Math.floor((timeLeft / 1000) % 60);
    const mins = Math.floor((timeLeft / (1000 * 60)) % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}:00`;
  }
}

// Timer functions
function startTimer() {
  if (timerRunning) return;

  timerRunning = true;
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);

    if (timerMode === 'pomodoro' && elapsedTime >= pomodoroTime) {
      stopTimer();
      alert('Pomodoro timer completed!');
      resetTimer();
    }
  }, 10);
}

function stopTimer() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  elapsedTime = 0;

  timerDisplay.textContent =
    timerMode === 'stopwatch' ? '00:00:00' : '25:00:00';
}

// Switch between modes
stopwatchTab.addEventListener('click', function () {
  if (timerMode === 'stopwatch') return;

  stopTimer();
  timerMode = 'stopwatch';
  resetTimer();

  stopwatchTab.classList.add('active');
  pomodoroTab.classList.remove('active');
});

pomodoroTab.addEventListener('click', function () {
  if (timerMode === 'pomodoro') return;

  stopTimer();
  timerMode = 'pomodoro';
  resetTimer();

  pomodoroTab.classList.add('active');
  stopwatchTab.classList.remove('active');
});

// Control buttons
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
