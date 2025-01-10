//  Weather api
let weather_data;
async function getWeather() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=islamabad';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '0aa443960emsh81e18847fc2af04p1c86cdjsnd162e2ab6195',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        weather_data = {
            "weather": result.current.condition.text,
            "temprature": result.current.feelslike_c
        }

    } catch (error) {
        console.error(error);
    }

}
getWeather().then(main);

//
//
// Main To do Logic


function main() {
    document.getElementById("weather").innerText = weather_data.weather;
    document.getElementById("temp").innerText = weather_data.temprature + "° Celsius"
    const newTodoText = document.getElementById("todo-input");
    const todoList = document.getElementById("task-list");

    let myTodos = [];
    loadFromStorage();
    renderTodos();
    function savetoStorage() {
        localStorage.setItem("todos", JSON.stringify(myTodos));
    }
    function loadFromStorage() {
        if (localStorage.getItem("todos")) {
            myTodos = JSON.parse(localStorage.getItem("todos"));
        }
        else {
            myTodos = [];
        }
    }
    function addtask() {
        const newTask = {
            id: "",
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
        savetoStorage();

    }
    function renderTodos() {
        todoList.innerHTML = '';
        if (myTodos.length > 0) {
            myTodos.forEach((task, index) => {
                task.id = index;
                const newItem = document.createElement("div");
                newItem.className = "task-item"
                newItem.innerHTML = `
            <div class="task-title">
            <input type="checkbox" onChange=completeTask(${index}) >
            <button onclick=deleteTask(${index})><i class="fa-solid fa-trash"></i></button>
            </div>
            <p id="task-${index}">${task.text}</p>
        `
                todoList.append(newItem);
            })
        }
        else {
            todoList.innerHTML = '<p id="no-tasks">Add tasks to list</p>';
        }
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
    function deleteTask(taskId) {
        let choice = alert("Do you really want to Delete This Task ?");
        if (choice == "ok") {
            myTodos = myTodos.filter((task) => task.id != taskId);
            savetoStorage();
            renderTodos();
        }
    }
}