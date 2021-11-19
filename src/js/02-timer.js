import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > new Date()) {
            btnStartTimer.removeAttribute('disabled');
        } else {
            if (!btnStartTimer.getAttribute('disabled')) {
                btnStartTimer.setAttribute('disabled', 'disabled');
                alert('Please choose a date in the future');
            }
        }
    },
};
const inputWithDateSelected = document.querySelector('#datetime-picker')
const btnStartTimer = document.querySelector('.datetime-picker-button')
const daysValueEl = document.querySelector('[data-days]')
const hoursValueEl = document.querySelector('[data-hours]')
const minutesValueEl = document.querySelector('[data-minutes]')
const secondsValueEl = document.querySelector('[data-seconds]')

flatpickr(inputWithDateSelected, options);

const timer = {
    intervalId: null,

    start(deadline) {
        this.intervalId = setInterval(() => {
            const diff = deadline - new Date();
            if (diff <= 0) {
                this.stop();
                diff = 0;;
            }

            const { days, hours, minutes, seconds } = convertMs(diff);
            daysValueEl.textContent = this.addLeadingZero(days);
            hoursValueEl.textContent = this.addLeadingZero(hours);
            minutesValueEl.textContent = this.addLeadingZero(minutes);
            secondsValueEl.textContent = this.addLeadingZero(seconds);
        }, 1000);
    },
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    },
    stop() {
        clearInterval(this.intervalId);
    },
};

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
function onStart() {
    timer.start(new Date(inputWithDateSelected.value));
}

btnStartTimer.addEventListener('click', onStart);