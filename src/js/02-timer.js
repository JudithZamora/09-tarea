import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import notiflix from "notiflix";



const countdownTimer = (targetDate) => {
  const timer = document.querySelector(".timer");
  const daysElement = timer.querySelector("[data-days]");
  const hoursElement = timer.querySelector("[data-hours]");
  const minutesElement = timer.querySelector("[data-minutes]");
  const secondsElement = timer.querySelector("[data-seconds]");

  const updateTimer = () => {
    const timeLeft = targetDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      notiflix.Notify.success("Countdown completed!");
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  };

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
};

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = (value) => {
  return value.toString().padStart(2, "0");
};

const datetimePicker = document.querySelector("#datetime-picker")
