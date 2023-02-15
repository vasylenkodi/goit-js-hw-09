const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
};

let intervalId = null;

refs.startBtn.addEventListener("click", onStartBtnClick);

refs.stopBtn.addEventListener("click", onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick(event) {
    intervalId = setInterval(() => {
      refs.body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
    
    event.target.setAttribute("disabled", true);
    refs.stopBtn.removeAttribute("disabled");
}

function onStopBtnClick(event) {
    clearInterval(intervalId);
    event.target.setAttribute("disabled", true);
    refs.startBtn.removeAttribute("disabled");
}