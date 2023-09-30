let timer = document.querySelector(".timer");

let seconds = 2;
let minutes = 1;
let interval = 1000;
let expectedTime = Date.now() + interval;
let timerId;
function updateTimer() {
    var drift = Date.now() - expectedTime; // how off the timer is.
    if (drift > interval) {
        // Took too long. You can do whatever you need to make up for it here.
    } else { // Normal on-time behaviour.
        seconds -= 1;
        if (seconds < 0) {
            if (minutes > 0) {
                minutes -= 1;
                seconds = 59;
            } else { // Time is up.
                seconds = 0;
            }
        }
        timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;
    }

    expectedTime += interval; // The next time it should trigger.
    timerId = setTimeout(updateTimer, Math.max(0, interval - drift)); // Either trigger immediately or adjust the interval based on drift.
}

timerId = setTimeout(updateTimer, interval);

let buttons = document.querySelectorAll(".button");
let leftButton = buttons[0];
let rightButton = buttons[1];
let play = false;

leftButton.addEventListener("click", () => {

});

function startTimer(millisec_interval) {
    timerId = setTimeout(updateTimer, millisec_interval);
}

function timerUserControlFSM() {
    if (play == false) {
        startTimer(interval);
        play = true;
    } else if (play == true) {
        clearTimeout(timerId);

    }
}