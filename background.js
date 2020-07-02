chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // make sure page is loaded
    if (changeInfo.status === 'complete') {

        // get the URL
        let url = new URL(tab.url);

        // check if the URL corresponds to the web-shop and respective /shop/ pathname
        if (url.hostname === 'www.urbanoutfitters.com' && url.pathname.includes('/shop/')) {

            // search for GET category parameter
            let param = url.searchParams.get('category');
            
            // capturing if GET category parameter does not exist on the page
            // could be true if the client is coming from new-arrivals
            if (param === undefined || param === null) {
                
                // communicate with content.js to search DOM for category
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {query_category: true}, (response) => {
                        let category_url = new URL(response.category);
                        save(category_url.pathname, 1);
                    });
                });

            } else {
                save(param, 1);
            }
        }
        
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.clearStorage) {
        // clear chrome local storage as per request
        chrome.storage.local.clear();
    }
});

chrome.storage.onChanged.addListener((changes, areaName) => {

    // when storage contents change - send update to popup.js
    let storage;
    chrome.storage.local.get(null, (data) => {
        chrome.runtime.sendMessage({updateStorage: data});
    });
    
});


// function for saving category names inside chrome.storage.local
function save(category, increment) {
    chrome.storage.local.get(category, (data) => {

        if (Object.keys(data).length === 0) {
            // if category does not exist in storage - create it
            chrome.storage.local.set({[category]: increment});
        } else {
            // if category exists - just increment it
            let value = data[category] + increment;
            chrome.storage.local.set({[category]: value});
        }

    });
}