// document.querySelector('nav').querySelectorAll('a')[0].href

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       if (request.query_category)
//         sendResponse({farewell: "goodbye"});
// });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.query_category) {
        let category = document.querySelector('nav').querySelectorAll('a')[0].href;
        sendResponse({'category': category});
    }
});