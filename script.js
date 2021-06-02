let tasks = [];
const todoListContainer = document.querySelector('.todo__list');

function submit() {
    const input = document.querySelector('.input')
    if (input.value === "") return
    tasks.push({value:input.value, checked:false})
    input.value = "";
    append();
}

function append() {
    todoListContainer.innerHTML = "";
    for(let i=0; i<tasks.length; i++) {
        const todoItem = document.createElement('div');
        const taskDiv = document.createElement('div');
        const todocheckbox = document.createElement('input');
        const todospan = document.createElement('span');
        const iconDiv = document.createElement('div');
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
    
        todoItem.className = "todo__item";
        taskDiv.className = "todo__content";
        iconDiv.className = "todo__icons";
        todospan.className = "todo__span";
        todoItem.dataset.index = i;
        todocheckbox.type = "checkbox";
        todospan.textContent = tasks[i].value;
        todospan.style.textTransform = "capitalize";
        todocheckbox.checked = tasks[i].checked;
        editIcon.className = "far fa-edit edit";
        deleteIcon.className = "far fa-trash-alt delete";
    
        todoListContainer.appendChild(todoItem);
        todoItem.appendChild(taskDiv);
        taskDiv.appendChild(todocheckbox);
        taskDiv.appendChild(todospan);
        todoItem.appendChild(iconDiv);
        iconDiv.appendChild(editIcon);
        iconDiv.appendChild(deleteIcon);
        
        if(tasks[i].checked === true) todospan.style.textDecoration = "line-through";
    }
}


todoListContainer.addEventListener("click", function(e) {
    if (e.target.className.includes('edit')) {
        edit(e.target);
    }else if(e.target.className.includes('delete')) {
        deleteElement(e.target);
    }else {
        return
    }
})


function edit(target) {
    const grandParent = target.parentElement.parentElement;
    const parent = grandParent.querySelector('.todo__content')
    const span = parent.querySelector('.todo__span');
    const input = document.createElement('input');

    input.type = "text";
    input.value = span.textContent;
    input.autofocus = true;

    parent.replaceChild(input, span);

    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const span = document.createElement('span');
            span.className = "todo__span";
            span.textContent = input.value;
            tasks[grandParent.dataset.index].value = input.value;
            parent.replaceChild(span, input);
        }
    })
}

function deleteElement(target) {
    const grandParent = target.parentElement.parentElement;
    tasks.splice(grandParent.dataset.index, 1);
    todoListContainer.removeChild(grandParent);
    append();
    console.table(tasks);
}