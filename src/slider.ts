import { sliderImages } from "./helpers/data.js";
import { SliderImages } from "./interfaces/slider-images.js";
import { datePanel } from "./date.js";
import { seaQuotes } from "./sea-quotes.js";

class Slider {
    protected slidesContainer: HTMLDivElement;
    protected buttons: NodeList;
    protected sliderImages: SliderImages;
    protected intervalID: NodeJS.Timer;
    protected isPlaying: boolean;

    constructor(images: SliderImages) {
        this.slidesContainer = document.querySelector('[data-slides-container]')! as HTMLDivElement;
        this.buttons = document.querySelectorAll('.btn')!;
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
        };

        this.intervalID = setInterval(() => this.autoplay(), 5000);
        this.addListeners();
    }

    autoplay() {
        if (this.isPlaying) {
            this.changeSlide(1);
        } else {
            setTimeout(() => {
                this.isPlaying = true;
            }, 5000);
        }
    }

    addListeners() {
        let direction: number;

        if (window) {
            window.addEventListener('keydown', (e: KeyboardEvent) => {
                const key = e.key;
                if (key === 'ArrowRight' || key === 'ArrowLeft') {
                    direction = e.key === 'ArrowRight' ? 1 : -1;
                    this.changeSlide(direction);
                    this.isPlaying = false;
                };
            });
        }

        if (this.buttons) {
            this.buttons.forEach(button => button.addEventListener('click', () => {
                direction = (button as HTMLButtonElement).dataset.btn === 'next' ? 1 : -1;
                this.changeSlide(direction);
                this.isPlaying = false;
            }));
        }
    }

    changeSlide(direction: number) {
        const activeSlide = document.querySelector('[data-slide="active"]')! as HTMLImageElement;
        const activeQuote = document.querySelector('[data-quote="active"]')! as HTMLParagraphElement;

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

        (this.slidesContainer.children[newIndex] as HTMLElement).dataset.slide = 'active';
        ([...seaQuotes.seaQuotesContainer.children][newQuoteIndex] as HTMLElement).dataset.quote = 'active';

        delete activeSlide.dataset.slide;
        delete activeQuote.dataset.quote;
    }
}

new Slider(sliderImages);
console.log(datePanel);