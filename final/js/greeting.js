const greetingForm = document.querySelector(".js-form"),
	  greetingInput = greetingForm.querySelector(".js-greeting-input"),
	  greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser",
	  SHOWING_CN = "showing";

function saveName(text){
	localStorage.setItem(USER_LS, text)
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = greetingInput.value;
	paintGreeting(currentValue);
	saveName(currentValue);
}

function askForName(){
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", handleSubmit)
}

function paintGreeting(text){
  greetingForm.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML = `Hello ${text}!`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
  	askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init(){
  loadName()
}

init();
