const display = document.getElementById('remaining-time-display');

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const addTimeButton = document.getElementById('addTimeButton');
const subtractTimeButton = document.getElementById('subtractTimeButton');

let isRunning = false;
let timer = 0;
let intervalId;
let totalTimeInSeconds = 0;

startButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;

    if (hours === 0 && minutes === 0) {
        alert("Oi! Don't forget to set the time!");
        return;
    }

    if (!isRunning) {
        startTimer();
        isRunning = true;
        startButton.textContent = 'Pause';
        updateBackgroundColor(taskTypeSelect.value);
    } else {
        pauseTimer();
        isRunning = false;
        startButton.textContent = 'Resume';
    }
});

resetButton.addEventListener('click', () => {
    resetTimer();
    updateBackgroundColor('');
    clearInputFields();
    bannerText.style.display = 'none';
});

addTimeButton.addEventListener('click', () => {
    addTime(5);
});

subtractTimeButton.addEventListener('click', () => {
    subtractTime(5);
})

function clearInputFields() {
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
}

function startTimer() {
    if (timer === 0) {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;

    totalTimeInSeconds = hours * 3600 + minutes * 60;
    timer = totalTimeInSeconds;
    }

    intervalId = setInterval(() => {
            if (timer <= 0) {
                clearInterval(intervalId);
                display.innerHTML = "<span class='times-up'>Time Is Up!</span>";
                shakeScreen();
                isRunning = false;
                startButton.textContent = 'Start';

                const bannerText = document.getElementById('banner-text');
                if (totalTimeInSeconds <= 1800) {
                    playAudioCue('winning');
                } else {
                    playAudioCue('major_triumph');
                }

                return;
            }

            timer--;
            updateDisplay();
    }, 1000);
}

function playAudioCue(cueName) {
    const audioPath = `/media/${cueName}.m4a`;
    const audioElement = new Audio(audioPath);
    audioElement.play();
}

function pauseTimer() {
    clearInterval(intervalId);
}

function updateDisplay() {
        display.innerHTML = formatTime(timer);
}

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
    return number.toString().padStart(2, '0');
}

function shakeScreen() {
        display.classList.add('shake');
        setTimeout(() => {
                display.classList.remove('shake');
        }, 500);
}

function addTime(minutesToAdd) {
    const hoursInput = document.getElementById('hoursInput');
    const minutesInput = document.getElementById('minutesInput');
    
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;

    if (!isRunning) {
        minutes += minutesToAdd;
    } else {
        timer += minutesToAdd * 60;
        hours = Math.floor(timer / 3600);
        minutes = Math.floor((timer % 3600) / 60);
    }

    hours += Math.floor(minutes / 60);
    minutes %= 60;

    hoursInput.value = hours;
    minutesInput.value = minutes;

    if(isRunning) {
        updateDisplay();
    }
}

function subtractTime(minutesToSubtract) {
    timer -= minutesToSubtract * 60;
    if (timer < 0) {
        timer = 0;
    }
    updateDisplay();
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    startButton.textContent = 'Start';
    timer = 0;
    totalTimeInSeconds = 0;
    updateDisplay();
}
