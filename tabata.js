const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");

let isRunning = false;
let workTime = 20; // Work time in seconds
let restTime = 10; // Rest time in seconds
let rounds = 8; // Number of rounds

let timeRemaining = workTime;
let currentRound = 1;

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

let interval;

const startTimer = () => {
    isRunning = true;
    startButton.textContent = "Pause";

    interval = setInterval(() => {
        if (timeRemaining <= 0) {
            if (currentRound % 2 === 1) {
                timeRemaining = restTime;
                document.getElementById("restSound").play();
            } else {
                timeRemaining = workTime;
                document.getElementById("workSound").play();
            }
            currentRound++;

            if (currentRound > rounds) {
                clearInterval(interval);
                timerDisplay.textContent = "Finished!";
                isRunning = false;
                startButton.disabled = true;
            }
        } else {
            timeRemaining--;
            timerDisplay.textContent = formatTime(timeRemaining);
        }
    }, 1000);

    startButton.removeEventListener("click", startTimer);
    startButton.addEventListener("click", pauseTimer);
};

const pauseTimer = () => {
    isRunning = false;
    startButton.textContent = "Resume";
    clearInterval(interval);
    startButton.removeEventListener("click", pauseTimer);
    startButton.addEventListener("click", resumeTimer);
};

const resumeTimer = () => {
    isRunning = true;
    startButton.textContent = "Pause";
    interval = setInterval(() => {
        if (timeRemaining <= 0) {
            if (currentRound % 2 === 1) {
                timeRemaining = restTime;
            } else {
                timeRemaining = workTime;
            }
            currentRound++;

            if (currentRound > rounds) {
                clearInterval(interval);
                timerDisplay.textContent = "Finished!";
                isRunning = false;
                startButton.disabled = true;
            }
        } else {
            timeRemaining--;
            timerDisplay.textContent = formatTime(timeRemaining);
        }
    }, 1000);
    startButton.removeEventListener("click", resumeTimer);
    startButton.addEventListener("click", pauseTimer);
};

const resetTimer = () => {
    isRunning = false;
    clearInterval(interval);
    timeRemaining = workTime;
    currentRound = 1;
    timerDisplay.textContent = formatTime(timeRemaining);
    startButton.textContent = "Start";
    startButton.disabled = false;
    startButton.removeEventListener("click", pauseTimer);
    startButton.removeEventListener("click", resumeTimer);
    startButton.addEventListener("click", startTimer);
};

startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);

timerDisplay.textContent = formatTime(workTime);
