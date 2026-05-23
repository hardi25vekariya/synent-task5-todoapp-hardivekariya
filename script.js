// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task button click
addBtn.addEventListener("click", addTask);

// Function to add task
function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent empty task
    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create task object
    const task = {
        text: taskText,
        completed: false
    };

    // Add task to UI
    createTaskElement(task);

    // Save task
    saveTask(task);

    // Clear input
    taskInput.value = "";
}

// Function to create task element
function createTaskElement(task) {

    // Create list item
    const li = document.createElement("li");

    // Create task text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    // If task already completed
    if (task.completed) {
        taskText.classList.add("completed");
    }

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";

    // Mark task as completed
    completeBtn.addEventListener("click", function () {

        taskText.classList.toggle("completed");

        // Update localStorage
        updateLocalStorage();
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete task
    deleteBtn.addEventListener("click", function () {

        li.remove();

        // Update localStorage
        updateLocalStorage();
    });

    // Add elements into list item
    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Add list item into task list
    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Update localStorage
function updateLocalStorage() {

    const allTasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        allTasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(allTasks));
}