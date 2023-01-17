const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = []

// Show loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
const newQuote = () => {
    // Pick a random quote from apiQuotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.innerHTML = 'Unknown';
    } else {
        authorText.innerHTML = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
// Hide loader and show quote
    quoteText.innerHTML = quote.text;
    hideLoading();
}

// Get Quotes from API
const getQuotes = async () => {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        console.log(error);
        getQuotes();
    }
}


// Tweet a Quote:
const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?${quoteText.innerHTML} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();

