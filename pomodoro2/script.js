// text elements
const timerText = document.getElementById("timer");
const tomatoes = document.querySelectorAll(".tomato");
const modal = document.querySelector(".modal");
const breakText = document.getElementById("break-timer");
const supportMsg = document.querySelector(".msg");

// buttons
const start = document.getElementById("start-btn");
const pause = document.getElementById("pause-btn");
const reset = document.getElementById("reset-btn");
const close = document.getElementById("break-btn");

// howler
const sound = new Howl({
  src: ["bell.mp3"], // add mp3 sound file here
  volume: 1.0, // adjust volume here
});

const breakSound = new Howl({
  src: ["ding.mp3"],
  volume: 1.0,
});

// timer variables
let session = 0;
let intervalId = null;

let timerValue = 60 * 60; // 60 minutes
let paused = false; // initial value

let breakValue = 25 * 60; // 25 minutes
let breakIntervalId = null;

function changeColor() {
  document.body.style.background = `linear-gradient(217deg, ${randomColor()} 0%, ${randomColor()} 100%)`;
}

changeColor();

function updateTimer() {
  if (timerValue > 0) {
    requestAnimationFrame(() => {
      const minutes = Math.floor(timerValue / 60);
      const seconds = timerValue % 60;

      timerText.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      timerValue--;
    });
  } else {
    // timer has reached 0:00
    sound.play();
    clearInterval(intervalId);
    timerValue = 60 * 60; // reset timer

    // start break
    supportMsg.textContent = "Enjoy your break 😊";
    displayModal();
  }
}

function startBreak() {
  if (breakValue > 0) {
    requestAnimationFrame(() => {
      const minutes = Math.floor(breakValue / 60);
      const seconds = breakValue % 60;

      breakText.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
      breakValue--;
    });
  } else {
    // break timer has reached 0:00
    breakSound.play();
    clearInterval(intervalId);
    breakValue = 25 * 60;
    breakText.textContent = "25:00";

    supportMsg.textContent = "Well done! 🍅";
  }
}

function displayModal() {
  modal.classList.add("display");
  startBreak();
  intervalId = setInterval(startBreak, 1000); // updates every second

  // reset timer in the background
  timerValue = 60 * 60;
  timerText.textContent = "60:00";
}

function randomColor() {
  const r = Math.floor(Math.random() * (245 - 175) + 175);
  const g = Math.floor(Math.random() * (245 - 175) + 175);
  const b = Math.floor(Math.random() * (245 - 175) + 175);
  return `rgb(${r}, ${g}, ${b})`;
}

function updateSession() {
  session++;

  for (let i = 1; i <= 4; i++) {
    const emoji = document.getElementById(`tomato${i}`);

    if (i <= session) {
      emoji.classList.remove("opacity");
      emoji.classList.add("removeOpacity");
    } else {
      emoji.classList.add("opacity");
      emoji.classList.remove("removeOpacity");
    }
  }

  if (session > 4) {
    for (let i = 4; i > 0; i--) {
      const emoji = document.getElementById(`tomato${i}`);
      if (i === 1) {
        emoji.classList.remove("removeOpacity");
        emoji.classList.remove("opacity");
        emoji.innerHTML = `<strong>${session}</strong> hours! AMAZING 💪`;
      } else {
        emoji.textContent = "";
      }
    }
  }
}

start.addEventListener("click", function () {
  // start timer
  intervalId = setInterval(updateTimer, 1000); // updates every second
});

pause.addEventListener("click", function () {
  if (!paused) {
    clearInterval(intervalId);
    paused = true;
    pause.style.backgroundColor = "#6161b5";
  } else {
    // clicked again? do this
    intervalId = setInterval(updateTimer, 1000);
    paused = false;
    pause.style.backgroundColor = "#353937c8";
  }
});

reset.addEventListener("click", function () {
  // clear interval
  clearInterval(intervalId);

  // reset timer and session counter
  timerValue = 60 * 60;
  session = 0;
  timerText.textContent = "60:00";
});

close.addEventListener("click", () => {
  // update background
  changeColor();

  modal.classList.remove("display");

  clearInterval(breakIntervalId);

  breakValue = 0;
  breakText.textContent = "25:00";
  supportMsg.textContent = "Enjoy your break 😊";

  // add new session
  updateSession();
});
