const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const span = document.createElement("span");
    span.classList.add("bgImage");
    span.style = `background-image: url(./images/${imgNumber + 1}.jpg)`;
    body.append(span);
}

function genRandom () {
 const number = Math.floor(Math.random() * 5);
    return number
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init()
