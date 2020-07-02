let clearStorage = document.querySelector('#clearStorage');

clearStorage.onclick = (element) => {
    chrome.runtime.sendMessage({clearStorage: true});
};