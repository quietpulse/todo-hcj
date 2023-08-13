// get today's date
var date = new Date();
// all the elements
var inputTitle = document.getElementById("tasktitle");
var inputDis = document.getElementById("taskdescription");
var listContainer = document.getElementById("todobox");
let listFilterdCountPercentage = document.getElementById("percentage");
let listFilterdCount = document.getElementById("complate");
var tasks = [];

// if application run for the first time then it will return null so initilizing localStorage to save tasks
if (localStorage.getItem("storage") == null) {
  localStorage.setItem("storage", "[]");
}

// setting greeting with time
// gettting time in 01-24 hours format
let noonHour = date.toLocaleString("en-US", { hour12: false, hour: "2-digit" });
// getting the element from the DOM
let noon = document.getElementById("noone");
// if time is bigger than 06 and smaller then 11
if (noonHour >= parseInt("06", 8) && noonHour <= 11) {
  noon.innerHTML = "morning";
  // if time is bigger than 12 and smaller than 05
} else if (noonHour >= 12 && noonHour <= 17) {
  noon.innerHTML = "afternoon";
  // if time is bigger than 05 and smaller than 12 PM
} else if (noonHour >= 18 && noonHour <= 24) {
  noon.innerHTML = "evening";
  // in the remainning time from 12AM to 06 AM its night
} else {
  noon.innerHTML = "night";
}

// getting todays date
let todaysDate = date.toLocaleString("en-India", {
  // this will give months in short form eg August -> Aug
  month: "short",
  // todays date in two digit format like 03 or 11
  day: "2-digit",
});

// Change the Date
document.getElementById("progress-date").todaysDate;

// function run to cut line effect in the dom just need to give the id
function cutline(id) {
  // add new style as text-decoration: line-thorugh
  document.getElementById(id).style.textDecoration = "line-through";
}

// function to open the modal to add tasks
function addTask() {
  let addTask = document.getElementsByClassName("addtask-hide");
  // adding addTask class in the element
  addTask[0].className = "addtask";
}

// to hide the task
function hideTask() {
  let addTask = document.getElementsByClassName("addtask");
  // adding addtask-hide class in the element
  addTask[0].className = "addtask-hide";
}

// function to add new task on the DOM as well as in the last list (Array)
function addNewTask() {
  // checking if user enter any value of not in the input box
  if (inputTitle.value == "" && inputDis.value == "") {
    // run if user not enter any task in the input box
    alert("You can't crate emptey todo!");
  } else {
    // if user add the task in inputbox
    // The unshift() method adds the specified elements to the beginning of an array and returns the new length of the array.
    tasks.unshift({
      // setting values as the user input
      title: inputTitle.value,
      description: inputDis.value,
      checked: false,
    });
    // this function render new html with the help of array
    render();
    // this function render the progress bar
    prograssStatus();
  }
  // hide the modal when user click on save
  hideTask();
  // replace input values to empty
  inputTitle.value = "";
  inputDis.value = "";
}

// Render Function
function render() {
  let innerHTML = "";
  // run as the length of the tasks array
  for (let i = 0; i < tasks.length; i++) {
    // if task in checked (done) then render as done
    if (tasks[i].checked === true) {
      innerHTML += `<li>
            <button onclick="unchecked(${i})"><i class="material-symbols-outlined">done</i></button>
            <div class="taskDetail" title="Click to view details" onclick="details(${i})">
            <h1 style="color: #9b9b9b;text-decoration: line-through;">${tasks[i].title}</h1>
            <p style="color: #9b9b9b;text-decoration: line-through";>${tasks[i].description}</p>
            </div>
            </li>`;
    } else {
      innerHTML += `<li>
        <button onclick="checked(${i})" style="padding: 13px;"></button>
        <div class="taskDetail" title="Click to view details" onclick="details(${i})">
            <h1>${tasks[i].title}</h1>
            <p>${tasks[i].description}</p>
        </div>
        </li>`;
    }
  }
  // now update that html that render with array and append in listContainer
  listContainer.innerHTML = innerHTML;
  // update the counter
  document.getElementById("ongoing-count").innerText = tasks.length;
  /// change the progress bar
  prograssStatus();
}

// chacked and unchacken
function checked(id) {
  // set that perticular task to true
  tasks[id].checked = true;
  // rerender the UI
  render();
  // rerender the progress Bar
  prograssStatus();
}
function unchecked(id) {
  // set that perticular task to false
  tasks[id].checked = false;
  // rerender the UI
  render();
  // rerender the progress Bar
  prograssStatus();
}

// Show details
function details(i) {
  document.getElementById("changetitle").value = tasks[i].title;
  document.getElementById("changedescription").value = tasks[i].description;
  let addTask = document.getElementsByClassName("changetask-hide");
  addTask[0].className = "changetask";
}
function changeTask() {
  let addTask = document.getElementsByClassName("changetask");
  addTask[0].className = "changetask-hide";
}

// Task compated function
function prograssStatus() {
  let completedTask = [];
  // run as the length of array
  for (let i = 0; i < tasks.length; ++i) {
    // getting all the completed tasks as array
    if (tasks[i].checked === true) {
      completedTask.push(tasks[i]);
    }
  }
  // setting html as completedTask length / task length
  listFilterdCount.innerHTML = completedTask.length + "/" + tasks.length;
  // finding progress percantage with the formula
  let progressPercentage = Math.floor(
    (completedTask.length / tasks.length) * 100,
  );
  // if get 0
  if (isNaN(progressPercentage)) {
    listFilterdCountPercentage.innerHTML = 0;
  } else {
    listFilterdCountPercentage.innerHTML = progressPercentage;
  }
  document.getElementById("progress-line").style.width =
    progressPercentage + "%";
  setLocalItem();
}

// Local Storage
// setting all the task in the localStorage
function setLocalItem() {
  localStorage.setItem("storage", JSON.stringify(tasks));
}

// run first when the page is load
window.onload = function () {
  tasks = JSON.parse(localStorage.getItem("storage"));
  render();
};
