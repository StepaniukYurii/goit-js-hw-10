import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTime = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let userSelectedDate;
let countdownInterval;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#E53935',
        animateInside: false,
        progressBar: false,
        position: 'topRight',
      });
      buttonStart.disabled = true;
      return;
    }
    buttonStart.disabled = false;
  },
};

flatpickr(dateTime, options);

buttonStart.addEventListener('click', () => {
  countdownInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
    buttonStart.disabled = true;
    dateTime.disabled = true;

    if (timeDifference <= 1000) {
      clearInterval(countdownInterval);
      buttonStart.disabled = false;
      dateTime.disabled = false;
      return;
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
