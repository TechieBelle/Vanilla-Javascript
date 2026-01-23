const modal = document.getElementById("nameModal");
const greeting = document.querySelector(".username");
const saveBtn = document.getElementById("saveNameBtn");

function saveName() {
  const name = document.getElementById("userNameInput").value.trim();

  if (name === "") return; // prevent empty names

  localStorage.setItem("username", name);
  displayName();
}

function displayName() {
  const savedName = localStorage.getItem("username");

  if (savedName) {
    greeting.textContent = ` ${savedName} 👋`;
    modal.style.display = "none";
  } else {
    modal.style.display = "flex"; // show modal if no name saved
  }
}

saveBtn.addEventListener("click", saveName);

// Run on page load
displayName();

// Time
function updateTime() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Convert to AM/PM
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // convert 0 → 12

  // Add leading zeros
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

  document.getElementById("currentTime").textContent = timeString;
}

setInterval(updateTime, 1000);
// updateTime();



// TODO LIST

// SELECT ELEMENTS
const todoInput = document.getElementById("task-input");
const addButton = document.getElementById("addBtn");
const taskList = document.querySelector(".task-list");

addButton.addEventListener("click", addTask);
todoInput.addEventListener("keydown", function (event) {
  // Check if the pressed key is the "Enter" key
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

// LOAD TASKS ON PAGE LOAD
loadTasks();

function addTask() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("Please Enter a Task");
    return;
  }
   createTask(text);
   saveTasks();
   todoInput.value = "";
}


function createTask(text, completed = false) {

  const newItem = document.createElement("li");
  newItem.classList.add("task-item");

  if (completed) newItem.classList.add("completed-task");

  const circleIcon = document.createElement("i");
  circleIcon.classList.add(
    completed ? "fa-solid" : "fa-regular",
    completed ? "fa-circle-check" : "fa-circle"
  );

  const taskText = document.createElement("p");
  taskText.textContent = text;

  const trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash");

  // COMPLETE TASK
circleIcon.addEventListener("click", () => {
  newItem.classList.toggle("completed-task");

  // Toggle circle/check icon
  circleIcon.classList.toggle("fa-circle");
  circleIcon.classList.toggle("fa-circle-check");
  circleIcon.classList.toggle("fa-regular");
  circleIcon.classList.toggle("fa-solid");

  saveTasks();
});

  // DELETE TASK
  trashIcon.addEventListener("click", () => {
    newItem.remove();
    saveTasks();
  });

  newItem.append(circleIcon, taskText, trashIcon);
  taskList.appendChild(newItem);
}

// -----------------------------
// SAVE TASKS TO LOCAL STORAGE
// -----------------------------
function saveTasks() {
  const tasks = [];

  document.querySelectorAll(".task-item").forEach((item) => {
    tasks.push({
      text: item.querySelector("p").innerText,
      completed: item.classList.contains("completed-task"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// -----------------------------
// LOAD TASKS FROM LOCAL STORAGE
// -----------------------------
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  savedTasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
}

