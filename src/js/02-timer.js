import flatpickr from 'flatpickr';
import { padStart } from 'lodash';
import Notiflix from 'notiflix';


const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
});

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentTime = new Date().getTime();
  const targetTime = selectedDate.getTime();
  const timeDifference = targetTime - currentTime;

  clearInterval(countdownInterval);
  updateTimerUI(timeDifference);

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0);
      Notiflix.Notify.success('Timer completed!');
    } else {
      updateTimerUI(timeDifference);
    }
  }, 1000);
});

function updateTimerUI(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  daysValue.textContent = padStart(days.toString(), 2, '0');
  hoursValue.textContent = padStart(hours.toString(), 2, '0');
  minutesValue.textContent = padStart(minutes.toString(), 2)}
