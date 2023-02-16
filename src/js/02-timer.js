import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from "notiflix/build/notiflix-notify-aio";
import "notiflix/dist/notiflix-3.2.6.min.css";

const refs = {
  inputElement: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
};

let timerId = null;
let currentDate = null;
let selectedDate = null;

refs.startBtn.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this._initialDate > selectedDates[0]) {
      Notify.warning("Please choose a date in the future");
      return;
    }
    currentDate = this.now;
    selectedDate = selectedDates[0];
    activateBtn();
  },
};


flatpickr(refs.inputElement, options);

function setTimeValues(timeUnits) {
  for (const timeUnit in timeUnits) {
    const timeValueElement = document.querySelector(`[data-${timeUnit}]`);
    timeValueElement.textContent = addLeadingZero(timeUnits[timeUnit]);
  }
}

function setCountdown(time) {
  timerId = setInterval(() => {
    time = time - 1000;
    setTimeValues(convertMs(time));
    if (convertMs(time).seconds === 0) {
      endCountdown(timerId);
    }
  }, 1000);
}

function endCountdown(timerId) {
  clearInterval(timerId);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function activateBtn() {
  refs.startBtn.removeAttribute("disabled");
  refs.startBtn.addEventListener("click", onStartBtnClick);
}

function onStartBtnClick() {
  let time = selectedDate.getTime() - currentDate.getTime();
  setTimeValues(convertMs(time));
  clearInterval(timerId);
  setCountdown(time);
}
