var date = new Date();
var inputTitle = document.getElementById('tasktitle');
var inputDis = document.getElementById('taskdescription');
var listContainer = document.getElementById('todobox');
let listFilterdCountPercentage = document.getElementById('percentage');
let listFilterdCount = document.getElementById('complate');
var tasks = [];

// If vilue is null the add some text.
if (localStorage.getItem("storage") == null) {
    localStorage.setItem("storage", '[]');
}

// Set Noone
let nooneHoure = date.toLocaleString('en-US', { hour12: false, hour: '2-digit' });
let noone = document.getElementById('noone');
if (nooneHoure >= parseInt("06", 8) && nooneHoure <= 11) {
    noone.innerHTML = 'morning';
} else if (nooneHoure >= 12 && nooneHoure <= 17) {
    noone.innerHTML = 'afternoon';
} else if (nooneHoure >= 18 && nooneHoure <= 24) {
    noone.innerHTML = 'evening';
} else {
    noone.innerHTML = 'night';
}

// Change the Date
document.getElementById('progress-date').innerText = date.toLocaleString('en-India', { month: 'short', day: '2-digit', });


// function's
function cutline(id) {
    document.getElementById(id).style.textDecoration = 'line-through';
}

function addTask() {
    let addTask = document.getElementsByClassName('addtask-hide');
    addTask[0].className = 'addtask';
}

function hideTask() {
    let addTask = document.getElementsByClassName('addtask');
    addTask[0].className = 'addtask-hide';
}

function addNewTask() {
    if (inputTitle.value == '' && inputDis.value == '') {
        alert('You can\'t crate emptey todo!');
    } else {
        tasks.unshift({
            title: inputTitle.value,
            description: inputDis.value,
            checked: false
        })
        render();
        prograssStatus();
    }
    hideTask();
    inputTitle.value = '';
    inputDis.value = '';
}

// Render Function
function render() {
    let innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].checked === true) {
            innerHTML += `<li>
            <button onclick="unchecked(${i})"><i class="material-symbols-outlined">done</i></button>
            <div class="taskDetail" title="Click to view details" onclick="details(${i})">
            <h1 style="color: #9b9b9b;text-decoration: line-through;">${tasks[i].title}</h1>
            <p style="color: #9b9b9b;text-decoration: line-through";>${tasks[i].description}</p>
            </div>
            </li>`
        } else {
            innerHTML += `<li>
        <button onclick="checked(${i})" style="padding: 13px;"></button>
        <div class="taskDetail" title="Click to view details" onclick="details(${i})">
            <h1>${tasks[i].title}</h1>
            <p>${tasks[i].description}</p>
        </div>
        </li>`
        }
    }
    listContainer.innerHTML = innerHTML;
    document.getElementById("ongoing-count").innerText = tasks.length;
    prograssStatus();
}


// chacked and unchacken
function checked(id) {
    tasks[id].checked = true;
    render();
    prograssStatus();
}
function unchecked(id) {
    tasks[id].checked = false;
    render();
    prograssStatus();
}

// Show details
function details(i) {
    document.getElementById('changetitle').value = tasks[i].title;
    document.getElementById('changedescription').value = tasks[i].description;
    let addTask = document.getElementsByClassName('changetask-hide');
    addTask[0].className = 'changetask';
}
function changeTask() {
    let addTask = document.getElementsByClassName('changetask');
    addTask[0].className = 'changetask-hide';
}


// Task compated function
function prograssStatus() {
    let completedTask = [];
    for (let i = 0; i < tasks.length; ++i) {
        if (tasks[i].checked === true) {
            completedTask.push(tasks[i]);
        }
    }
    listFilterdCount.innerHTML = completedTask.length + '/' + tasks.length;
    let progressPercentage = Math.floor((completedTask.length / tasks.length) * 100);
    if (isNaN(progressPercentage)) {
        listFilterdCountPercentage.innerHTML = 0;
    } else {
        listFilterdCountPercentage.innerHTML = progressPercentage;
    }
    document.getElementById('progress-line').style.width = progressPercentage + '%';
    setLocalItem();
}

// Local Storage
function setLocalItem() {
    localStorage.setItem("storage", JSON.stringify(tasks));
}
window.onload = function () {
    tasks = JSON.parse(localStorage.getItem("storage"));
    render();
}