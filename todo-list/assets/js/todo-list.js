// Global variables
const todoInput = document.querySelector('#todo-input');
const todoAdd = document.querySelector('#todo-add');
const todoList = document.querySelector('#todo-list');
const errorMessage = document.querySelector('#error-message');
let todoListArr = JSON.parse(localStorage.getItem('todo-list-gamaacademy')) || [];

// Event click on add todo button
todoAdd.onclick = () => {
    let text = todoInput.value;
    
    // Add todo to list
    todoInput.value = '';
    let data = {
        'id': (todoListArr.at(todoListArr.length - 1)?.id + 1 || 0),
        'date': (new Date()).toLocaleDateString('pt-br'),
        'text': text,
        'completed': false
    };
    addItemToList(data);
    todoListArr.push(data);
    saveToLocalStorage();
}

// Add todo to list
const addItemToList = (data) => {
    // Create row
    let li = document.createElement('li');
    li.dataset.id = data.id;
    li.dataset.completed = data.completed;
    li.title = `Criado em ${new Date().toLocaleDateString()}`;

    // Insert checkbox into row
    let labelCheckBox = document.createElement('label');
    labelCheckBox.className = 'checkbox-container';

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.className = 'checkbox';
    checkbox.checked = data.completed;
    checkbox.onclick = () => updateItemStatus(data.id);

    labelCheckBox.appendChild(checkbox);

    let spanCheckBox = document.createElement('span');
    spanCheckBox.className = 'checkmark';

    labelCheckBox.appendChild(spanCheckBox);
    
    li.appendChild(labelCheckBox);

    // Insert text into row
    let spanText = document.createElement('span');
    spanText.className = 'text editable';
    spanText.innerHTML = data.text;
    spanText.onclick = () => spanSwitch(spanText);
    li.appendChild(spanText);
    
    // Insert delete button into row
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'button';
    deleteBtn.onclick = () => removeItemFromList(data.id);

    let deleteBtnSvg = document.createElement('img');
    deleteBtnSvg.src = './assets/img/trash-can-solid.svg';

    deleteBtn.appendChild(deleteBtnSvg);
    li.appendChild(deleteBtn);

    // Insert row into todo list
    todoList.appendChild(li);
}

// Delete item from todo list
const removeItemFromList = (id) => {
    todoListArr = todoListArr.filter(todo => todo.id !== id);
    saveToLocalStorage();
    todoList.querySelector(`li[data-id="${id}"]`).remove();
}

// Switch span to input
const spanSwitch = (e) => {
    let text = e.innerText;
    let input = document.createElement('input');
    input.className = 'input-text';
    input.onblur = () => spanReset(input);
    input.value = text;
    e.replaceWith(input);
    input.focus();
}

// Switch input to span and save text into todo list
const spanReset = (e) => {
    let text = e.value
    let spanText = document.createElement('span');
    spanText.className = 'text editable';
    spanText.innerHTML = text;
    spanText.onclick = () => spanSwitch(spanText);
    e.replaceWith(spanText);
    
    let id = spanText.parentElement.dataset.id;
    let index = todoListArr.findIndex(todo => todo.id == id);
    if (index !== -1) {
        todoListArr[index].text = text;
    }
    saveToLocalStorage();
}

// Toggle todo status
const updateItemStatus = (id) => {
    let index = todoListArr.findIndex(todo => todo.id == id);
    if (index !== -1) {
        todoListArr[index].completed = !todoListArr[index].completed;
        todoList.querySelector(`li[data-id="${id}"]`).dataset.completed = todoListArr[index].completed;
    }
    saveToLocalStorage();
}

// Save todo list to local storage
const saveToLocalStorage = () => {
    localStorage.setItem('todo-list-gamaacademy', JSON.stringify(todoListArr));
}

const filterTodoList = (option) => {
    todoList.innerHTML = '';
    switch (option) {
        case 'all':
            todoListArr.map(data => addItemToList(data));
            break;
        
        case 'completed':
            todoListArr.filter(data => data.completed === true).map(data => addItemToList(data));
            break;

        case 'active':
            todoListArr.filter(data => data.completed === false).map(data => addItemToList(data));
            break;
    
    }
}

// Run first load todo list
todoListArr.map(data => addItemToList(data));