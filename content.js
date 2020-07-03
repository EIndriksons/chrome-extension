// to get navigation category name
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query_category) {
        let category = document.querySelector('nav').querySelectorAll('a')[0].href;
        sendResponse({'category': category});
    }
});