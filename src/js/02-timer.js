import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  inputElement: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  valueElements: document.querySelectorAll(".value"),
};

let timerId = null;

refs.startBtn.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this._initialDate > selectedDates[0]) {
      window.alert("Please choose a date in the future");
      return;
    }
    refs.startBtn.removeAttribute("disabled");
    refs.startBtn.addEventListener("click", () => {
      let time = selectedDates[0].getTime() - this.now.getTime();
      setTimeValues(convertMs(time));
      clearInterval(timerId);
      setCountdown(time);
    });
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
