let timer = document.querySelector(".timer");

let seconds = 0;
let minutes = 0;
let interval = 1000;
let expectedTime = Date.now() + interval;
function updateTimer() {
    var drift = Date.now() - expectedTime; // how off the timer is.
    if (drift > interval) {
        // Took too long. You can do whatever you need to make up for it here.
    } else { // Normal on-time behaviour.
        
        timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2,"0")}`;
    }

    expectedTime += interval; // The next time it should trigger.
    setTimeout(updateTimer, Math.max(0, interval - drift)); // Either trigger immediately or adjust the interval based on drift.
}

setTimeout(updateTimer, interval);