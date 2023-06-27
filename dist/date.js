class DatePanel {
    constructor() {
        this.timeSpans = [...document.querySelector('[data-h1-time]').children];
        this.dayOfTheWeek = document.querySelector('[data-date]');
        this.getDate();
    }
    displayDate(time) {
        const { hours, minutes, seconds } = time;
        this.timeSpans.forEach(span => {
            if (span.classList.contains('hours')) {
                span.textContent = +hours < 10 ? `0${hours}` : hours;
            }
            else if (span.classList.contains('minutes')) {
                span.textContent = +minutes < 10 ? `0${minutes}` : minutes;
            }
            else {
                span.textContent = +seconds < 10 ? `0${seconds}` : seconds;
            }
        });
    }
    getDate() {
        setInterval(() => {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            const time = {
                hours: hours.toString(),
                minutes: minutes.toString(),
                seconds: seconds.toString(),
            };
            this.displayDate(time);
        }, 1000);
        const dayOfTheWeek = new Date().toLocaleString('en-UK', {
            weekday: "long",
            day: "numeric",
        });
        this.dayOfTheWeek.textContent = dayOfTheWeek;
    }
}
export const datePanel = new DatePanel();
