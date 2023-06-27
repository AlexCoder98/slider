import { sliderImages } from "./helpers/data.js";
import { datePanel } from "./date.js";
import { seaQuotes } from "./sea-quotes.js";
class Slider {
    constructor(images) {
        this.slidesContainer = document.querySelector('[data-slides-container]');
        this.buttons = document.querySelectorAll('.btn');
        this.sliderImages = images;
        this.isPlaying = true;
        for (const image of this.sliderImages) {
            const imgIndex = images.indexOf(image);
            const img = document.createElement('img');
            img.setAttribute('class', image.class);
            img.setAttribute('src', image.src);
            img.setAttribute('alt', `${image.alt} ${imgIndex}`);
            if (imgIndex === 0) {
                img.setAttribute('data-slide', 'active');
            }
            this.slidesContainer.appendChild(img);
        }
        ;
        this.intervalID = setInterval(() => this.autoplay(), 5000);
        this.addListeners();
    }
    autoplay() {
        if (this.isPlaying) {
            this.changeSlide(1);
        }
        else {
            setTimeout(() => {
                this.isPlaying = true;
            }, 5000);
        }
    }
    addListeners() {
        let direction;
        if (window) {
            window.addEventListener('keydown', (e) => {
                const key = e.key;
                if (key === 'ArrowRight' || key === 'ArrowLeft') {
                    direction = e.key === 'ArrowRight' ? 1 : -1;
                    this.changeSlide(direction);
                    this.isPlaying = false;
                }
                ;
            });
        }
        if (this.buttons) {
            this.buttons.forEach(button => button.addEventListener('click', () => {
                direction = button.dataset.btn === 'next' ? 1 : -1;
                this.changeSlide(direction);
                this.isPlaying = false;
            }));
        }
    }
    changeSlide(direction) {
        const activeSlide = document.querySelector('[data-slide="active"]');
        const activeQuote = document.querySelector('[data-quote="active"]');
        let newIndex = [...this.slidesContainer.children].indexOf(activeSlide) + direction;
        let newQuoteIndex = [...seaQuotes.seaQuotesContainer.children].indexOf(activeQuote) + direction;
        if (newIndex >= this.slidesContainer.children.length && newQuoteIndex >= [...seaQuotes.seaQuotesContainer.children].length) {
            newIndex = 0;
            newQuoteIndex = 0;
        }
        if (newIndex < 0 && newQuoteIndex < 0) {
            newIndex = this.slidesContainer.children.length - 1;
            newQuoteIndex = [...seaQuotes.seaQuotesContainer.children].length - 1;
        }
        this.slidesContainer.children[newIndex].dataset.slide = 'active';
        [...seaQuotes.seaQuotesContainer.children][newQuoteIndex].dataset.quote = 'active';
        delete activeSlide.dataset.slide;
        delete activeQuote.dataset.quote;
    }
}
new Slider(sliderImages);
console.log(datePanel);
