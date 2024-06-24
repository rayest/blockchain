const form = document.getElementById('form');
const input = document.getElementById('input');

const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // 如果input有值，就添加todo
    addTodo();
});



// 入参 todo 是一个对象，包含了 text 和 completed 两个属性，如果为空，就使用 input.value
function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            // toggle() 方法在元素上添加或移除类名。如果存在（不存在）则删除（添加）之。
            todoEl.classList.toggle('completed');
            updateLS();
        });

        // 当鼠标右键点击时，删除这个todo，contextmenu 事件是右键点击事件
        // 它会监听右键点击事件，然后阻止默认行为，然后删除这个todo
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        });

        // 如果 todoEl 被删除了，就不会被添加到todosUL中
        todosUL.appendChild(todoEl);

        input.value = '';

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}



