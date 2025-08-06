document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const taskInput = document.getElementById("task");
    const dateInput = document.getElementById("date");
    const todoList = document.getElementById("todo-list");
    const filterInput = document.getElementById("filter");

    let todos = [];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const task = taskInput.value.trim();
        const date = dateInput.value;

        if (task === "" || date === "") return;

        const todo = { task, date, id: Date.now() };
        todos.push(todo);

        renderTodos(todos);
        form.reset();
    });

    filterInput.addEventListener("input", function () {
        const keyword = filterInput.value.toLowerCase();
        const filtered = todos.filter(todo => todo.task.toLowerCase().includes(keyword));
        renderTodos(filtered);
    });

    function renderTodos(data) {
        todoList.innerHTML = "";
        data.forEach(todo => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td><button onclick="deleteTodo(${todo.id})">Delete</button></td>
            `;

            todoList.appendChild(tr);
        });
    }

    window.deleteTodo = function (id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos(todos);
    };
});
