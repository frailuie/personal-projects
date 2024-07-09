// buttons
const openMainTaskForm = document.getElementById("addTask");
const modal = document.getElementById("taskModal");
const closeFormButton = document.getElementById("close");
const addMainTaskForm = document.getElementById("saveTask");
const addSubTaskForm = document.getElementById("saveSubTask");
const dropDownButton = document.getElementById("dropDownButton");

// text elements
const dateText = document.getElementById("dateText");
const todayEmoji = document.querySelector(".dateBox h4");
const todayQuote = document.querySelector(".quoteBox h3");
const modalText = document.getElementById("modalText");
const subModalText = document.getElementById("subModalText");
const mainTaskUL = document.getElementById("mainTaskList");

// form elements
const mainTaskInput = document.getElementById("userInputTask");
const subTaskInput = document.getElementById("userInputSubTask");

const dueDateInput = document.getElementById("dueDate");
const emojiInput = document.getElementById("emojis");

// updating the date
let date = new Date();

// task manager
let projectManager = [];

// format the date using strings
function formatDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let monthName = "";
  switch (month) {
    case 1:
      monthName = "January";
      break;
    case 2:
      monthName = "February";
      break;
    case 3:
      monthName = "March";
      break;
    case 4:
      monthName = "April";
      break;
    case 5:
      monthName = "May";
      break;
    case 6:
      monthName = "June";
      break;
    case 7:
      monthName = "July";
      break;
    case 8:
      monthName = "August";
      break;
    case 9:
      monthName = "September";
      break;
    case 10:
      monthName = "October";
      break;
    case 11:
      monthName = "November";
      break;
    case 12:
      monthName = "December";
      break;
    default:
      throw new Error("Invalid month");
  }

  let day = date.getDate();
  let dayNum = "";

  if (day % 10 === 1 && day % 100 !== 11) {
    dayNum = day + "st";
  } else if (day % 10 === 2 && day % 100 !== 12) {
    dayNum = day + "nd";
  } else if (day % 10 === 3 && day % 100 !== 13) {
    dayNum = day + "rd";
  } else {
    dayNum = day + "th";
  }

  return `${monthName} ${dayNum} ${year}`;
}

// randomize emojis
function randomEmoji() {
  const randomEmojis = [
    "😊",
    "😎",
    "🤗",
    "😇",
    "🥳",
    "👽",
    "👾",
    "🤖",
    "👍",
    "👋",
    "✍️",
    "✨",
    "🎉",
    "🎀",
    "🎨",
    "🏆",
    "🧪",
    "📂",
    "🍓",
    "🌻",
    "🌼",
    "🌸",
    "🌹",
    "🌷",
    "🌱",
    "🍂",
    "🍃",
    "☁️",
    "⭐",
    "🌟",
    "🔥",
    "⚡",
    "🌈",
    "❤️",
    "🩷",
    "🩵",
    "💜",
    "🧡",
    "💛",
    "💚",
    "💙",
    "🤍",
    "💖",
    "💗",
  ];

  let randomIndex = Math.floor(Math.random() * randomEmojis.length);
  let emoji = randomEmojis[randomIndex];

  todayEmoji.textContent = `Today ${emoji}`;
}

// random quotes
function randomQuote() {
  const randomQuotes = [
    "You can, you should, and if you’re brave enough to start, you will.",
    "Start where you are. Use what you have. Do what you can.",
    "Your present circumstances don’t determine where you can go; they merely determine where you start.",
    "You don’t have to see the whole staircase. Just take the first step.",
    "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    "The only person you should try to be better than, is the person you were yesterday.",
    "It's time to do everything you ever wanted.",
    "If you want something you’ve never had, you must be willing to do something you’ve never done.",
    "Your progress does not always need to be seen or validated.",
    "Every decision you make is a reflection of how much you love yourself.",
    "The most certain way to succeed is always to try just one more time.",
    "To have gotten this far is a gift.",
    "You can do it like it's a great weight on you, or you can do it like it's part of the dance.",
    "You are stronger than you seem, braver than you believe, and smarter than you think.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Don't let yesterday take up too much of today.",
    "Your only limit is your own mind.",
    "Life consists not in holding good cards but in playing those you hold well.",
    "I am not a product of my circumstances. I am a product of my decisions.",
    "If you can't yet do great things, do small things in a great way.",
    "If you can't yet do great things, do small things in a great way.",
    "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
    "Instead of worrying about what you cannot control, shift your energy to what you can create.",
    "Your self-worth is determined by you. You don't have to depend on someone telling you who you are.",
    "You are never too old to set another goal or to dream a new dream.",
    "It is during our darkest moments that we must focus to see the light.",
    "Believe you can and you're halfway there.",
    "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
    "All dreams are within reach. All you have to do is keep moving towards them.",
    "Hard things will happen to us. We will recover. We will learn from it. We will grow more resilient because of it.",
    "If you prioritize yourself, you are going to save yourself.",
    "No matter how far away from yourself you may have strayed, there is always a path back. You already know who you are and how to fulfill your destiny.",
    "Many of life's failures are people who did not realize how close they were to success when they gave up.",
    "You do not find the happy life. You make it.",
    "Do what you can, with what you have, where you are.",
    "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
    "I have become my own version of an optimist. If I can't make it through one door, I'll go through another door--or I'll make a door.",
    "The most common way people give up their power is by thinking they don't have any.",
    "Creativity is a wild mind and a disciplined eye.",
    "So long as your desire to explore is greater than your desire to not screw up, you’re on the right track.",
    "Procrastination is the thief of time. Collar him.",
    "Optimist: someone who figures that taking a step backward after taking a step forward is not a disaster, it’s more like a cha-cha.",
    "Better to remain silent and be thought a fool than to speak out and remove all doubt.",
    "If you can't fly, run. If you can't run, walk. If you can't walk, crawl, but by all means, keep moving.",
    "Here is the test to find whether your mission on Earth is finished. If you're alive, it isn't.",
    "The only way out is through.",
  ];

  let randomIndex = Math.floor(Math.random() * randomQuotes.length);
  let quote = randomQuotes[randomIndex];

  todayQuote.textContent = `"${quote}"`;
}

// saving the tasks to local storage
function saveAllTasks() {
  localStorage.setItem("tasks", JSON.stringify(projectManager));
}

// loading the tasks from local storage
function loadTasks() {
  let storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    projectManager = JSON.parse(storedTasks);
    updateTasks();
  }
}

// saving and pushing main tasks
function saveMainTask() {
  const mainTaskName = mainTaskInput.value;
  const dueDate = dueDateInput.value;
  const emoji = emojiInput.value;

  const originalDate = new Date(dueDate);
  const formattedDate = originalDate.toLocaleDateString("en-US");

  if (mainTaskName !== "") {
    modalText.textContent = "add a task 🖊️";
    // create a new main task object
    const newMainTask = {
      mainTaskName,
      dueDate,
      formattedDate,
      emoji,
      subTasks: [],
    };

    // push new main task to task manager
    projectManager.push(newMainTask);

    // clear the input fields
    mainTaskInput.value = "";
    dueDateInput.value = "";
    emojiInput.value = "";

    // update the main task list
    updateTasks();
    saveAllTasks();
  } else {
    modalText.textContent = "task name cannot be empty!";
    modal.classList.toggle("shake");
  }
}

// update the DOM with tasks
function updateTasks() {
  mainTaskUL.innerHTML = ""; // clear UL list before adding back li elements

  projectManager.forEach((task, index) => {
    const addTask = document.createElement("li");
    const removeButton = document.createElement("button");

    addTask.dataset.index = index; // add the index of the current main task to the li element
    removeButton.id = `removeButton${index}`; // add the index of the current main task to the remove button
    removeButton.innerHTML = "×";

    // if due date is blank, display task without due date
    task.dueDate == ""
      ? (addTask.innerHTML = `‣  <span id="emojiIcon">${task.emoji}</span> ${task.mainTaskName}`)
      : (addTask.innerHTML = `<span id="emojiIcon">${task.emoji}</span> ${task.mainTaskName} ｜ ${task.formattedDate}`);

    // add event listener to change style attribute dynamically of new tasks
    removeButton.addEventListener("click", () => {
      projectManager.splice(index, 1); // remove the task from array
      addTask.remove(); // remove the task from DOM
      saveAllTasks(); // update tasks in local storage
    });

    addTask.appendChild(removeButton); // add remove button

    // subTask title changes when adding main task's subtasks
    subModalText.textContent = `add subtasks for ${task.mainTaskName} ✍️`;

    // use button to add subtasks to this main task
    addSubTaskForm.addEventListener("click", () => {
      // reset subtask text
      subModalText.textContent = `add subtasks for ${task.mainTaskName}`;

      // update currentMainTask to the current main task
      currentMainTask = projectManager[projectManager.length - 1];

      // subtask name
      const subTaskName = subTaskInput.value;

      subModalText.textContent = `add subtasks for ${task.mainTaskName} ✍️`;

      if (subTaskName !== "") {
        // reset subModalText
        subModalText.textContent = `~ ${task.mainTaskName} ✍️`;

        // add a new subtask to to the current main task's subTasks array
        currentMainTask.subTasks.push(subTaskName); // sub task's name

        // clear the subtask's input field
        subTaskInput.value = "";

        updateTasks();
      } else {
        modal.classList.toggle("shake");
      }
    });

    // make a new ul list to display subtasks
    const subTaskUL = document.createElement("ul");
    subTaskUL.innerHTML = ""; // clear ul element before adding new tasks

    subTaskUL.id = `subTaskUL${index}`;

    task.subTasks.forEach((subtask) => {
      const addSubTask = document.createElement("li");
      addSubTask.textContent = `◦ ${subtask}`;
      subTaskUL.appendChild(addSubTask);
    });

    addTask.appendChild(subTaskUL); // add subTask UL to main task
    mainTaskUL.appendChild(addTask); // add main task to DOM
    saveAllTasks(); // update tasks in local storage
  });

  // add event listener to mainTaskUL
  mainTaskUL.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      // add class to the clicked Li element
      event.target.classList.toggle("selected");
    }
  });
}

// event listener for saving main task
addMainTaskForm.addEventListener("click", saveMainTask);

// event listener to open modal
openMainTaskForm.addEventListener("click", () => {
  modal.style.display = "block";
});

// close modal
closeFormButton.addEventListener("click", () => {
  modal.style.display = "none";
});

dateText.innerHTML = formatDay(date);
randomEmoji();
randomQuote();

// when window is reloaded, load in all saved tasks
window.onload = function () {
  loadTasks();
};
