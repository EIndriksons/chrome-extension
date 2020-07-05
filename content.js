// injecting script.js in page for "Add to Cart" button handlers
let script = document.createElement('script');
script.src = chrome.runtime.getURL('script.js');
script.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(script);

// listen for background.js request for navigation affinity category
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query_category) {

        // send back navigation affinity category
        let category_response = document.querySelector('nav').querySelectorAll('a')[0].href;
        sendResponse({'category_response': category_response});
    }
});

// listen for script.js affinity category messages
window.addEventListener("addedToCart", (data) => {
    // if message received - send it to background.js script
    chrome.runtime.sendMessage({addedToCart: data.detail});
}, false);