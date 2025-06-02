document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const tagInput = document.getElementById("tagInput");
  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
      const el = document.createElement("li");
      el.className = "flex justify-between items-start border p-3 rounded shadow-sm";

      el.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 mt-1 rounded-full border-4 ${task.completed ? 'border-gray-400' : 'border-red-500'}"></div>
          <div>
            <p class="${task.completed ? 'line-through text-gray-400' : 'font-semibold'}">${task.title}</p>
            <p class="text-sm text-gray-500">Today</p>
            <div class="flex gap-2 mt-1">
              ${task.tags.map(tag => `<span class="text-xs bg-gray-200 px-2 py-0.5 rounded">${tag}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1">
          <button onclick="toggleComplete(${index})" class="text-xs text-white ${task.completed ? 'bg-gray-500' : 'bg-green-500'} px-2 py-1 rounded">${task.completed ? 'Undo' : 'Done'}</button>
          <button onclick="deleteTask(${index})" class="text-xs text-white bg-red-500 px-2 py-1 rounded">Delete</button>
        </div>
      `;

      if (task.completed) {
        completedList.appendChild(el);
      } else {
        taskList.appendChild(el);
      }
    });
  }

  window.toggleComplete = function(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  document.getElementById("addTaskBtn").addEventListener("click", () => {
    const title = taskInput.value.trim();
    const tags = tagInput.value.split(',').map(tag => tag.trim()).filter(Boolean);

    if (title) {
      tasks.push({ title, tags, completed: false });
      taskInput.value = "";
      tagInput.value = "";
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
