// injecting script.js in page
let script = document.createElement('script');
script.src = chrome.runtime.getURL('script.js');
script.onload = function() {
    this.remove();
};

(document.head || document.documentElement).appendChild(script);

// to get navigation category name
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query_category) {
        let category_response = document.querySelector('nav').querySelectorAll('a')[0].href;
        sendResponse({'category_response': category_response});
    }
});