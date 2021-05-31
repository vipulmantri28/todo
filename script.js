const todoListContainer = document.querySelector('.todo__list');
const input = document.querySelector('.input');
const todoList = document.createElement('div');
const todocheckbox = document.createElement('input');
const todospan = document.createElement('span');

function submit() {
    todocheckbox.type = "checkbox";
    todospan.textContent = input.value;
    todospan.style.textTransform = "capitalize";
    input.value = "";

    todoListContainer.appendChild(todoList);
    todoList.appendChild(todocheckbox);
    todoList.appendChild(todospan);
}

todocheckbox.addEventListener("click", function() {
    if (todocheckbox.checked) {
        todospan.style.textDecoration = "line-through";
    }else {
        todospan.style.textDecoration = "none";
    }
})