let tasks = [];
const todoListContainer = document.querySelector('.todo__list');

function store() {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
}

if (sessionStorage.getItem("tasks")) {
    tasks = JSON.parse(sessionStorage.getItem("tasks"))
    append();
}

const form = document.getElementById('todo__form');

form.addEventListener("submit", function submit() {
    const input = document.querySelector('.input')
    if (input.value === "") return
    tasks.push({value:input.value, checked:false});
    store();
    input.value = "";
    append();

})

function append() {
    todoListContainer.innerHTML = "";
    tasks.sort(function(a, b) {
        return a.checked - b.checked;
    })
    
    let template = "";

    for(let i=0; i<tasks.length; i++) {
        template +=`<div class="todo__item" data-index=${i}>
                        <div class="todo__content">
                            <input type="checkbox" class="todo__checkbox" ${tasks[i].checked ? "checked": ""}>
                            <span class="todo__span" style=${tasks[i].checked === true ? "text-decoration:line-through" : ""} >${tasks[i].value}</span>
                        </div>
                        <div class="todo__icon">
                            <i class="far fa-edit edit"></i>
                            <i class="far fa-trash-alt delete"></i>
                        </div>
                    </div>`;
    }

    todoListContainer.innerHTML = template;

}


todoListContainer.addEventListener("click", function(e) {
    if (e.target.className.includes('edit')) {
        edit(e.target);
    }else if(e.target.className.includes('delete')) {
        deleteElement(e.target);
    }else if (e.target.className === "todo__content"){
        done(e.target);
    }
    store();
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
    append();
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