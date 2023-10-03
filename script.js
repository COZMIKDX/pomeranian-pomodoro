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
        this.element.innerHTML = this.element.innerHTML = `${this.minutes.toString().padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
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

let playButton = document.getElementById("play");
let resetButton = document.getElementById("set");
let timer = new DynamicTimer(1000, document.getElementById("timer1"));
let playing = false;
let cleanTimer = true;

playButton.addEventListener("click", () => {
    if (!playing) {
        timer.startTimer();
        playing = true;
        playButton.innerHTML = "PAUSE";
    } else {
        timer.stopTimer();
        playing = false;
        playButton.innerHTML = "START";
    }
});

resetButton.addEventListener("click", () => {
    timer.stopTimer();
    timer.setTime(1, 20);
});