class DynamicTimer {
    constructor(interval, element) {
        this.interval = interval;
        this.element = element;
        this.timerId = null;
        this.minutes = 0;
        this.seconds = 20;
        this.expectedTime = 0;

        this.timerTick = this.timerTick.bind(this);
    }

    updateUI() {
        this.element.innerHTML = `${this.minutes.toString().padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
    }

    timerTick() {
        var drift = Date.now() - this.expectedTime;
        if (drift > this.interval) {
            // Took too long. Do anything needed to make up for being late.
            console.log("Drift detected");
        } else { // Normal on-time behaviour
            this.seconds -= 1;
            // Carry over a minute if we're out of seconds.
            if (this.seconds < 0) {
                if (this.minutes > 0) {
                    this.minutes -= 1;
                    this.seconds = 59;
                } else {
                    // Timer done
                    this.seconds = 0;
                    this.stopTimer();
                }
            }

            this.updateUI();
        }

        this.expectedTime += this.interval; // The next time it should trigger.
        // setTimout again but adjust the interval to make up for drift.
        // If the drift was too big, set the next interval to 0.
        this.timerId = setTimeout(this.timerTick, Math.max(0, this.interval - drift));
    }

    startTimer() {
        this.expectedTime = Date.now() + this.interval;
        this.timerId = setTimeout(this.timerTick, this.interval);
    }

    stopTimer() {
        clearTimeout(this.timerId);
    }

    setTime(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.updateUI();
    }
}

class PomoTimer {
    constructor(playButton, skipButton, setButton, workInput, breakInput, timer) {
        this.playButton = playButton;
        this.skipButton = skipButton;
        this.setButton = setButton;
        this.workInput = workInput;
        this.breakInput = breakInput;
        this.timer = timer; //DynamicTimer object.
        this.running = false;

        this.startControl = this.startControl.bind(this);
        this.resetControl = this.resetControl.bind(this);
        this.setTime = this.setTime.bind(this);
    }

    startControl() {
        if (!this.running) {
            this.timer.startTimer();
            this.running = true;
            this.playButton.innerHTML = "Pause";
        } else {
            this.timer.stopTimer();
            this.running = false;
            this.playButton.innerHTML = "Start";
        }
    }

    resetControl() {
        this.timer.stopTimer();
        this.timer.setTime(1, 20);
    }

    setTime(){
        this.timer.setTime(this.workInput.value, 0);
    }

    startPomo() {
        this.playButton.addEventListener("click", this.startControl);
        this.skipButton.addEventListener("click", this.resetControl);
        this.setButton.addEventListener("click", this.setTime);
    }
}

let timeText = document.getElementById("timeText");
let timer = new DynamicTimer(1000, timeText);

let playButton = document.getElementById("leftButton");
let resetButton = document.getElementById("rightButton");
let setButton = document.getElementById("setButton");
let pomodoro = new PomoTimer(playButton, resetButton, setButton, workInput, breakInput, timer);
pomodoro.startPomo();

let header = document.querySelector(".dropdown-header");
let timerContainer = document.querySelector(".timer-container");
header.addEventListener("mouseenter", () => {
    timerContainer.style.height = "80%";
    console.log("headon");
});

header.addEventListener("mouseleave", () => {
    timerContainer.style.height = "70%";
    console.log("head off");
});