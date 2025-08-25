let rutas = [];
let currentRouteIndex = -1;
let currentTasks = [];
let selectedLevel = null;

function goHome() {
    // Lógica para ir a la página principal
}

function loadPovertyLevels() {
    const povertyLevelsContainer = document.getElementById('povertyLevels');
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement('button');
        button.classList.add('poverty-level-button');
        button.innerText = `Nivel de Pobreza ${i}`;
        button.onclick = () => selectPovertyLevel(i);
        povertyLevelsContainer.appendChild(button);
    }
}

function selectPovertyLevel(level) {
    selectedLevel = level;
    loadRoutes();
}

function loadRoutes() {
    const rutasContainer = document.getElementById('rutas');
    rutasContainer.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const routeItem = document.createElement('div');
        routeItem.classList.add('route-item');
        routeItem.innerText = `Ruta ${i}`;
        routeItem.onclick = () => loadTasks(i);
        rutasContainer.appendChild(routeItem);
    }
}

function loadTasks(routeIndex) {
    currentRouteIndex = routeIndex;
    currentTasks = Array(10).fill().map((_, i) => ({ description: `Tarea ${i + 1}`, completed: false }));

    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';
    currentTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <div class="task-desc" onclick="editTask(${index})">${task.description}</div>
            <div class="task-actions">
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;
        tasksContainer.appendChild(taskItem);
    });

    // Mostrar el botón de confirmar
    document.getElementById('confirmButton').classList.add('show');
}

function editTask(index) {
    const taskItem = document.getElementsByClassName('task-item')[index];
    const taskDesc = taskItem.querySelector('.task-desc');

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentTasks[index].description;
    input.onblur = () => saveTask(index, input.value);

    taskDesc.innerHTML = '';
    taskDesc.appendChild(input);
    input.focus();
}

function saveTask(index, value) {
    currentTasks[index].description = value;
    loadTasks(currentRouteIndex);
}

function deleteTask(index) {
    currentTasks.splice(index, 1);
    loadTasks(currentRouteIndex); // Recargar la lista de tareas
}

function confirmTasks() {
    alert('Tareas confirmadas');
    // Lógica para confirmar las tareas
}

// Inicializar botones de nivel de pobreza
loadPovertyLevels();