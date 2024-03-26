// Function to add a new task
function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a task!");
    return;
  }

  var li = document.createElement("li");
  li.textContent = taskInput.value;
  li.addEventListener("click", toggleTask);

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", deleteTask);

  li.appendChild(deleteButton);
  taskList.appendChild(li);

  taskInput.value = ""; // Clear input field after adding task

  updateTaskCount();
  saveTasksToLocalStorage();
}

// Function to mark a task as completed
function toggleTask() {
  this.classList.toggle("completed");
  saveTasksToLocalStorage();
}

// Function to delete a task
function deleteTask(event) {
  var listItem = event.target.parentNode;
  listItem.parentNode.removeChild(listItem);

  updateTaskCount();
  saveTasksToLocalStorage();
}

// Function to update the task count
function updateTaskCount() {
  var taskList = document.getElementById("taskList");
  var totalTasks = taskList.children.length;
  var countElement = document.getElementById("taskCount");
  countElement.textContent = "Total tasks: " + totalTasks;
}

// Function to clear all tasks
function clearAllTasks() {
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  updateTaskCount();
  saveTasksToLocalStorage();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  var taskList = document.getElementById("taskList");
  var tasks = [];
  for (var i = 0; i < taskList.children.length; i++) {
    var task = {
      name: taskList.children[i].textContent,
      completed: taskList.children[i].classList.contains("completed"),
    };
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  var taskList = document.getElementById("taskList");
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      li.textContent = tasks[i].name;
      if (tasks[i].completed) {
        li.classList.add("completed");
      }
      li.addEventListener("click", toggleTask);

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", deleteTask);

      li.appendChild(deleteButton);
      taskList.appendChild(li);
    }
    updateTaskCount();
  }
}

// Load tasks from local storage when the page loads
window.onload = function () {
  loadTasksFromLocalStorage();
};
