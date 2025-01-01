const newTodoText = document.getElementById("todo-input");
const todoList = document.getElementById("task-list");
let myTodos = [];
function addtask() {
    const newTask = newTodoText.value.trim();
    if (newTask.length > 0) {
        myTodos.push(newTask);
    }
    else {
        alert("NO text to Add")
    }
    newTodoText.value = '';
    renderTodos();

}
function renderTodos() {
    myTodos.forEach((task, index) => {
        todoList.innerText += task + index
    })
}