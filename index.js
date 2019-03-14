const stopElem = document.querySelector('.settings_stop');
const startElem = document.querySelector('.settings_start');
const resetElem = document.querySelector('.settings_reset');
const timerHour = document.querySelector('.timer_hour');
const timerMinute = document.querySelector('.timer_minute');
const timerSecond = document.querySelector('.timer_second');
const userHours = document.querySelector('.custom-date__hours');
const userMinutes = document.querySelector('.custom-date__minutes');
const userSeconds = document.querySelector('.custom-date__seconds');
const setDateElem = document.querySelector('.custom-date__btn');
const selectElems = document.getElementsByTagName('select');

const defaultDate = {
    hours: 0,
    minutes: 5,
    seconds: 0
};

let interval = null;
let isActive = false;
let time = getSeconds(defaultDate);

function getSeconds(date) {
    return Math.floor(date.hours * 60 * 60) + Math.floor(date.minutes * 60) + date.seconds;
}

function getDate(totalseconds) {
    let hours = Math.floor((totalseconds / 60 / 60));
    let minutes = Math.floor((totalseconds - hours * 60 * 60) / 60);
    let seconds = Math.floor((totalseconds - hours * 60 * 60 - minutes * 60));
    return { hours, minutes, seconds };
}

function startTimer() {
    if(!interval) {
        interval = setInterval(function() {
            if(time === 0) {
                return
            }
            time = time - 1;
            pasteData();
        }, 1000)
    }
}

function setTimerFormat(date) {
    const timeSelects = ['hours', 'minutes', 'seconds'];
    const formatedDate = {};
    
    timeSelects.forEach((value) => {
        if(date[value] < 10) {
            formatedDate[value] = "0" + date[value];
        } else {
            formatedDate[value] = date[value];
        }
    })
    
    return formatedDate;
}

function resetSelects() {
    Array.from(selectElems).map((elem) => {
        elem.selectedIndex = 0
    })
    pasteData()
}

function pasteData() {
    let date = getDate(time);
    let formDate = setTimerFormat(date);
    timerHour.innerHTML = formDate.hours + ':';
    timerMinute.innerHTML = formDate.minutes + ':';
    timerSecond.innerHTML = formDate.seconds;
}

startElem.onclick = startTimer

stopElem.onclick = () => {
    changeInterval()
}

resetElem.onclick = () => {
    changeInterval()
    time = 0;
    pasteData()
}

setDateElem.onclick = () => {
    const userDate = {
        hours: +userHours.options[userHours.selectedIndex].value,
        minutes: +userMinutes.options[userMinutes.selectedIndex].value,
        seconds: +userSeconds.options[userSeconds.selectedIndex].value
    }
    time = getSeconds(userDate);
    changeInterval()
    resetSelects()
}

function changeInterval() {
    clearInterval(interval)
    interval = null
}