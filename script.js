// Get the "Add" button element
var addButton = document.getElementById("add-btn");
addButton.addEventListener("click", addToDoItem);

// Get input and to-do list elements
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

// Get the to-do template element
const toDoTemplate = document.getElementById("to-do-template");

// Function to create a new to-do item
function newToDoItem(itemText, completed) {
  var toDoItem = toDoTemplate.cloneNode(true);
  var toDoText = toDoItem.getElementsByClassName("text")[0];

  toDoItem.removeAttribute("id");
  toDoItem.removeAttribute("class");

  toDoText.textContent = itemText;
  toDoItem.getElementsByClassName("completed")[0].checked = completed;

  toDoList.appendChild(toDoItem);
  saveList();
}

// Function to add a new to-do item
function addToDoItem() {
  if (toDoEntryBox.value.trim() !== "") {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    toDoEntryBox.value = "";
  }
}

// Function to toggle the state of a to-do item
function toggleToDoItemState() {
  if (this.classList.contains("completed")) {
    this.classList.remove("completed");
  } else {
    this.classList.add("completed");
  }
}

// Function to clear selected completed to-do items
function clearSelectedToDoItems() {
  var completedItems = toDoList.getElementsByClassName("completed");

  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
  saveList();
}

// Function to empty the entire to-do list
function emptyList() {
  var toDoItems = toDoList.children;
  while (toDoItems.length > 0) {
    toDoItems.item(0).remove();
  }
  saveList();
}

// Example usage of array and object
var myArray = [];
myArray.push("something to store");
myArray.push("something else to store");

var toDoInfo = {
  task: "Thing I need to do",
  completed: false,
};

// Function to save the to-do list to local storage
function saveList() {
  var toDos = [];

  for (var i = 0; i < toDoList.children.length; i++) {
    var toDo = toDoList.children.item(i);

    var toDoInfo = {
      task: toDo.innerText,
      completed: toDo.getElementsByClassName("completed")[0].checked,
    };

    toDos.push(toDoInfo);
  }

  localStorage.setItem("toDos", JSON.stringify(toDos));
  console.log("Entered here!");
}

// Function to load the to-do list from local storage
function loadList() {
  if (localStorage.getItem("toDos") != null) {
    var toDos = JSON.parse(localStorage.getItem("toDos"));

    for (var i = 0; i < toDos.length; i++) {
      var toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed);
    }
  }
}

// Function to delete a specific to-do item
function deleteToDoItem(target) {
  target.parentElement.remove();
  saveList();
}

// Load the to-do list when the page is loaded
loadList();
