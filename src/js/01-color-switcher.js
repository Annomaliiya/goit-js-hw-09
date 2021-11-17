function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const body = document.querySelector('body');
const btnStart = document.querySelector('.js-start');
const btnStop = document.querySelector('.js-stop');

function onStartClick() {
    timerId = setInterval(() => {
        const newColor = body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStart.setAttribute("disabled", "disabled");
    btnStop.removeAttribute("disabled");
}
function onStopClick() {
    clearInterval(timerId);
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", "disabled");
}
btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);