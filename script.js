const newTodoText = document.getElementById("todo-input");
const todoList = document.getElementById("task-list");
let myTodos = [];
function addtask() {
    const newTask = {
        text: newTodoText.value.trim(),
        completed: false
    }
    if (newTask.text.length > 0) {

        myTodos.push(newTask);
    }
    else {
        alert("NO text to Add")
    }
    newTodoText.value = '';
    renderTodos();

}
function renderTodos() {
    todoList.innerHTML = '';
    myTodos.forEach((task, index) => {
        const newItem = document.createElement("div");
        newItem.className = "task-item"
        newItem.innerHTML = `
        <input type="checkbox" onChange=completeTask(${index}) >
        <p id="task-${index}">${task.text}</p>`
        todoList.append(newItem);
    })
}
function completeTask(taskId) {
    myTodos[taskId].completed = !myTodos[taskId].completed;
    const taskStatus = myTodos[taskId].completed;
    if (taskStatus == true) {
        document.getElementById(`task-${taskId}`).classList.add("completed")
    }
    else {
        document.getElementById(`task-${taskId}`).classList.remove("completed")
    }


}