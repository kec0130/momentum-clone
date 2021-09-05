const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function doneStyle(checkIcon) {
  const span = checkIcon.parentElement.nextSibling;
  checkIcon.style.color = "limegreen";
  checkIcon.style.opacity = "1";
  span.style.textDecoration = "line-through";
}

function checkToDo(event) {
  const checkIcon = event.target;
  const span = checkIcon.parentElement.nextSibling;
  const li = checkIcon.parentElement.parentElement;
  const checked = toDos.find(({ id }) => id === parseInt(li.id));
  if (checked.status === "to-do") {
    doneStyle(checkIcon);
    checked.status = "done";
  } else {
    checkIcon.style.color = "white";
    checkIcon.style.opacity = "0.6";
    span.style.textDecoration = null;
    checked.status = "to-do";
  }
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const iconDiv = document.createElement("div");
  const trashIcon = document.createElement("i");
  const checkIcon = document.createElement("i");
  const span = document.createElement("span");

  li.id = newTodo.id;
  span.innerText = newTodo.text;

  trashIcon.className = "fas fa-trash";
  trashIcon.addEventListener("click", deleteToDo);

  checkIcon.className = "fas fa-check-square";
  checkIcon.addEventListener("click", checkToDo);

  iconDiv.appendChild(trashIcon);
  iconDiv.appendChild(checkIcon);
  li.appendChild(iconDiv);
  li.appendChild(span);
  toDoList.appendChild(li);

  if (newTodo.status === "done") {
    doneStyle(checkIcon);
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    status: "to-do",
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  toDos = JSON.parse(savedToDos);
  toDos.forEach(paintToDo);
}
