// const todoListContainer = document.querySelector('.todo__list');
// const input = document.querySelector('.input');

// function submit() {
//     const todoList = document.createElement('div');
//     const todocheckbox = document.createElement('input');
//     const todospan = document.createElement('span');
//     todocheckbox.type = "checkbox";

//     todospan.textContent = input.value;
//     todospan.style.textTransform = "capitalize";
//     input.value = "";

//     todoListContainer.appendChild(todoList);
//     todoList.appendChild(todocheckbox);
//     todoList.appendChild(todospan);
    
//     todocheckbox.addEventListener("click", function() {
//         if (todocheckbox.checked) {
//             todospan.style.textDecoration = "line-through";
//         }else {
//             todospan.style.textDecoration = "none";
//         }
//     })
// }

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
        const todoList = document.createElement('div');
        const todocheckbox = document.createElement('input');
        const todospan = document.createElement('span');
    
        todoList.dataset.index = i;
        todocheckbox.type = "checkbox";
        todospan.textContent = tasks[i].value;
        todospan.style.textTransform = "capitalize";
        todocheckbox.checked = tasks[i].checked;
    
        todoListContainer.appendChild(todoList);
        todoList.appendChild(todocheckbox);
        todoList.appendChild(todospan);
        
        if(tasks[i].checked === true) {
            todospan.style.textDecoration = "line-through";
            todocheckbox.checked = true;
        }

        todoList.addEventListener("click", function done() {
            tasks[i].checked = true;
            append();
        })

    }
}
