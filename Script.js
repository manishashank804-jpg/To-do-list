const inputField = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load stored tasks on page initialization
document.addEventListener('DOMContentLoaded', loadTodos);

// Listen for the "Enter" key inside input field
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Appends a new todo item to the list
function addTodo() {
    const taskText = inputField.value.trim();
    
    if (taskText === '') {
        alert('Please enter a valid task description.');
        return;
    }

    createTodoElement(taskText, false);
    saveTodos();
    
    // Clear input field and return focus
    inputField.value = '';
    inputField.focus();
}

// Builds the structural elements for individual tasks
function createTodoElement(text, isCompleted) {
    const li = document.createElement('li');
    li.className = `todo-item ${isCompleted ? 'completed' : ''}`;

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.innerText = text;
    // Toggle completed status when text is clicked
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTodos();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = '✕';
    // Remove individual task when button is clicked
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

// Saves current list items locally
function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push({
            text: item.querySelector('.todo-text').innerText,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('savedTodos', JSON.stringify(todos));
}

// Loads and renders local browser elements upon refresh
function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('savedTodos')) || [];
    storedTodos.forEach(todo => {
        createTodoElement(todo.text, todo.completed);
    });
}
