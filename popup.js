const clearStorage = document.querySelector('#clearStorage'); // button for storage cleanup
const results = document.querySelector('#results'); // div for data output

// button handler
clearStorage.onclick = (element) => {
    chrome.runtime.sendMessage({clearStorage: true});
    results.innerHTML = '';
};

// get local storage values and display them in div
chrome.runtime.sendMessage({updateStorage: true}, (response) => {
    results.innerHTML = '';
    for (let item in response.updatedStorage) {
        results.innerHTML += `<li>${item} - ${response.updatedStorage[item]}</li>`
    }
});