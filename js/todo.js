const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = document.querySelector(".js-todo-input"),
  pendingList = document.querySelector(".js-pending"),
  finishedList = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let PENDING = [];
let FINISHED = [];

function switchToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  const text = li.querySelector("span").innerText;
  const id = parseInt(li.id);

  if (ul === pendingList) {
    pendingList.removeChild(li);
    const cleanPending = PENDING.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanPending;
    finishedList.appendChild(li);
    const finishedObj = {
      text: text,
      id: id
    };
    FINISHED.push(finishedObj);
  } else {
    finishedList.removeChild(li);
    const cleanFinished = FINISHED.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanFinished;
    pendingList.appendChild(li);
    const pendingObj = {
      text: text,
      id: id
    };
    PENDING.push(pendingObj);
  }
  savePendingStorage();
  saveFinishedStorage();
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;

  if (ul === pendingList) {
    pendingList.removeChild(li);
    const cleanPending = PENDING.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    PENDING = cleanPending;
  } else {
    finishedList.removeChild(li);
    const cleanFinished = FINISHED.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    FINISHED = cleanFinished;
  }
  savePendingStorage();
  saveFinishedStorage();
}

function savePendingStorage() {
  localStorage.setItem(PENDING_LS, JSON.stringify(PENDING));
}

function saveFinishedStorage() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED));
}

function paintPending(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  const newId = PENDING.length + 1;
  li.id = newId;

  span.innerText = text;
  console.log(span.innerText);

  delBtn.value = "delete";
  delBtn.classList.add("btn-delete");
  delBtn.innerText = "";
  delBtn.addEventListener("click", deleteToDo);
  penBtn.value = "pending";
  penBtn.classList.add("btn-pending");
  penBtn.innerText = "";
  penBtn.addEventListener("click", switchToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  pendingList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  PENDING.push(toDoObj);
  savePendingStorage();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  const newId = PENDING.length + 1;
  li.id = newId;
  span.innerText = text;

  delBtn.value = "delete";
  delBtn.classList.add("btn-delete");
  delBtn.innerText = "";
  delBtn.addEventListener("click", deleteToDo);
  penBtn.value = "pending";
  penBtn.classList.add("btn-pending");
  penBtn.innerText = "";
  penBtn.addEventListener("click", switchToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  finishedList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };
  FINISHED.push(toDoObj);
  saveFinishedStorage();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPending = localStorage.getItem(PENDING_LS);
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      paintPending(pending.text);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      paintFinished(finished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
