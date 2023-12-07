document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const addButton = document.getElementById("add");
    const clearAllButton = document.getElementById("clearAll");

    // Load tasks from localStorage on page load
    loadTasks();

    // Event listener for adding a new task
    // taskInput.addEventListener("keypress", function (event) {
    addButton.addEventListener("click", function (event) {
        // console.log(event);
        // if (event.key === "click" && taskInput.value.trim() !== "") {
        if (taskInput.value.trim() !== "") {
            addTask(taskInput.value.trim());
            taskInput.value = "";
        }
    });

    // Function to add a new task
    function addTask(taskText) {
        const tasks = getTasks();
        // tasks.push(taskText);
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);
        renderTasks();
    }

    // Function to mark a task as completed
    window.completeTask = function (index) {
        const tasks = getTasks();
        // console.log(tasks[index], tasks[index].completed, !tasks[index].completed);
        // tasks[index] = `✓ ${tasks[index]}`;
        // $(tasks[index]).css("color", "green");
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    };

    // Function to remove a task
    window.removeTask = function (index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    // Function to clear all tasks
    window.clearAllTasks = function () {
        localStorage.removeItem("tasks");
        renderTasks();
    };

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = getTasks();
        renderTasks();
    }

    // Function to get tasks from localStorage
    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to render tasks
    function renderTasks() {
        const tasks = getTasks();
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            // li.innerHTML = `
            //     <span>${task}</span>
            //     <button onclick="completeTask(${index})">Mark As Complete</button>  
            //     <button onclick="removeTask(${index})">Remove From List</button>
            // `;

                 li.innerHTML = `
                    <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};font-size:${task.completed ? '35px' : '15px'};">${task.text}</span>
                    <button onclick="completeTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="removeTask(${index})">Remove</button>
                `;

            taskList.appendChild(li);
        });
    }

    // Initial render
    renderTasks();
});