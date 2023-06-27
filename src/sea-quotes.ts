import { seaQuotes as seaQuotesData } from "./helpers/data.js";
import { SeaQuotes as SeaQuotesType } from "./interfaces/sea-quotes.js";

class SeaQuotes {
    seaQuotesContainer: HTMLDivElement;
    protected seaQuotes: SeaQuotesType;

    constructor(seaQuotesData: SeaQuotesType) {
        this.seaQuotesContainer = document.querySelector('[data-sea-quotes]')! as HTMLDivElement;
        this.seaQuotes = seaQuotesData;

        for (const seaQuote of this.seaQuotes) {
            const seaQuoteIndex = this.seaQuotes.indexOf(seaQuote);
            const p = document.createElement('p');
            p.innerHTML = `<q class="quote">${seaQuote.quote}</q> <br><span class="author"> - ${seaQuote.author}</span>`;
            if (seaQuoteIndex === 0) {
                p.setAttribute('data-quote', 'active');
            }
            this.seaQuotesContainer.appendChild(p);
        }
    }
}

export const seaQuotes = new SeaQuotes(seaQuotesData);