const clearStorage = document.querySelector('#clearStorage');

clearStorage.onclick = (element) => {
    chrome.runtime.sendMessage({clearStorage: true});
};

const results = document.querySelector('#results');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.updateStorage !== null) {

        results.innerHTML = '';
        for (let item in request.updateStorage) {
            results.innerHTML += `<li>${item} - ${request.updateStorage[item]}</li>`
        }
    }
});