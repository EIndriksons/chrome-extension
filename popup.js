const clearStorage = document.querySelector('#clearStorage'); // button for storage cleanup
const results = document.querySelector('#results'); // div for data output

// Button handler
clearStorage.onclick = (element) => {
    chrome.runtime.sendMessage({clearStorage: true});
    clearResults();
};

// Get local storage values and display them in div
chrome.runtime.sendMessage({updateStorage: true}, (response) => {
    clearResults();
    for (let item in response.updatedStorage) {
        results.innerHTML += `<tr><td>${item}</td><td>${response.updatedStorage[item]}</td></tr>`
    }
});

// Function to clear Result div of data
function clearResults() {
    results.innerHTML = '';
}