import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('[data-days'),
  hours: document.querySelector('[data-hours'),
  mins: document.querySelector('[data-minutes'),
  secs: document.querySelector('[data-seconds'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.setAttribute('disabled', 'disabled');

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.removeAttribute('disabled');
  },
};

const countdownTimer = flatpickr('#datetime-picker', options);
const startButton = document.querySelector('[data-start]');

let intervalId = null;

startButton.setAttribute('disabled', 'disabled');

startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  const selectedDate = countdownTimer.selectedDates[0].getTime();
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = selectedDate - currentDate;
    if (deltaTime > 0) {
      const timeComponents = convertMs(deltaTime);
      updateClockface(timeComponents);
    } else {
      const timeComponents = convertMs(0);
      updateClockface(timeComponents);
      clearInterval(intervalId);
      setTimeout(() => {
        Notiflix.Notify.warning('Time is over');
      }, 0);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = minutes;
  refs.secs.textContent = seconds;
}
