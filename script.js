let tasks = [];
const todoListContainer = document.querySelector('.todo__list');

function press(e) {
    if (e.key === "Enter") {
        submit();
    }
}
function submit() {
    const input = document.querySelector('.input')
    if (input.value === "") return
    tasks.push({value:input.value, checked:false})
    input.value = "";
    append();
}

function append() {
    todoListContainer.innerHTML = "";
    tasks.sort(function(a, b) {
        return a.checked - b.checked;
    })
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
        todocheckbox.className = "todo__checkbox";
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
    }else if (e.target.className === "todo__content"){
        done(e.target);
    }
})


function edit(target) {
    const grandParent = target.parentElement.parentElement;
    const parent = grandParent.querySelector('.todo__content')
    if (target.className.includes('fa-edit')) {
        const span = parent.querySelector('.todo__span');
        const input = document.createElement('input');
        
        target.classList.remove('fa-edit');
        target.classList.add('fa-check-circle');
        input.type = "text";
        input.value = span.textContent;
        input.autofocus = true;
        
        parent.replaceChild(input, span);
        
    }else {
        const checkbox = parent.querySelector('.todo__checkbox');
        const input = checkbox.nextSibling;
        const span = document.createElement('span');

        span.className = "todo__span";
        span.textContent = input.value;
        checkbox.checked = false;
        tasks[grandParent.dataset.index].value = input.value;
        tasks[grandParent.dataset.index].checked = false;
        
        parent.replaceChild(span, input);
        target.classList.add('fa-edit');
        target.classList.remove('fa-check-circle');
    }
}

function deleteElement(target) {
    const grandParent = target.parentElement.parentElement;
    tasks.splice(grandParent.dataset.index, 1);
    todoListContainer.removeChild(grandParent);
    const taskList = document.querySelectorAll('.todo__item');
    taskList.forEach(task => task.dataset.index = tasks.keys())
    console.table(tasks);
}

function done(target) {
    const parent = target.parentElement;
    const checkbox = target.querySelector('.todo__checkbox');
    const span = target.querySelector('.todo__span');
    if (tasks[parent.dataset.index].checked === false) {
        tasks[parent.dataset.index].checked = true;
        checkbox.checked = true;
        span.style.textDecoration = "line-through";
        tasks.sort(function(a, b) {
            return a.checked - b.checked;
        })
    }else {
        tasks[parent.dataset.index].checked = false;
        checkbox.checked = false;
        span.style.textDecoration = "unset";
    }
    append();
}