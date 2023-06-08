import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', startCountdown);

function startCountdown() {
  const selectedDate = flatpickr.parseDate(document.querySelector('#datetime-picker').value);
  const currentDate = new Date();
  const countdown = selectedDate - currentDate;

  if (countdown <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future");
    return;
  }

  updateCountdownUI(countdown);
  countdownInterval = setInterval(() => {
    updateCountdownUI(countdown);
    countdown -= 1000;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      startButton.disabled = true;
      Notiflix.Notify.success("Countdown finished!");
    }
  }, 1000);
}

function updateCountdownUI(countdown) {
  const { days, hours, minutes, seconds } = convertMs(countdown);
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero}

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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}