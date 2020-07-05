// Setting global values for increments
INCREMENT_PRODUCT = 1;
INCREMENT_CART = 3;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // make sure page is loaded
    if (changeInfo.status === 'complete') {

        // get the URL
        let url = new URL(tab.url);

        // check if the URL corresponds to the web-shop and respective /shop/ pathname
        if (url.hostname === 'www.urbanoutfitters.com' && url.pathname.includes('/shop/')) {

            // search for GET category parameter
            let category = url.searchParams.get('category');
            
            // capturing if GET category parameter does not exist on the page
            // could be true if the client is coming from new-arrivals
            if (category === undefined || category === null) {
                
                // communicate with content.js to search DOM for category
                chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {query_category: true}, (response) => {
                        let category_url = new URL(response.category_response);
                        save(category_url.pathname, INCREMENT_PRODUCT);
                    });
                });

            } else {
                // save category to the local storage
                save(category, INCREMENT_PRODUCT);
            }
        }
        
    }
});

// Chrome Extension message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    // REQUEST for clearing/resetting storage (from popup.js)
    if (request.clearStorage) {
        // clear chrome local storage as per request
        chrome.storage.local.clear();
        sendResponse({clearedStorage: true});

    // REQUEST for updating local storage data (from popup.js)
    } else if (request.updateStorage) {
        (async () => {
            const storage = await getStorage();
            sendResponse({updatedStorage : storage});
        })();
        return true;

    // REQUEST for adding affinity category from "Add to Cart" (from content.js)
    } else if (request.addedToCart) {
        save(request.addedToCart, INCREMENT_CART);
    }
});

// Function for getting everything from chrome.storage.local
function getStorage() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (data) => {
            resolve(data);
        });
    })
};

// Function for saving category inside chrome.storage.local
function save(category, increment) {

    // retain only alphanumerical characters, _, - and else
    let category_name = category.replace(/[^a-zA-Z0-9 _-]+/gi, '');

    chrome.storage.local.get(category_name, (data) => {

        if (Object.keys(data).length === 0) {
            // if category does not exist in storage - create it
            chrome.storage.local.set({[category_name]: increment});
        } else {
            // if category exists - just increment it
            let value = data[category_name] + increment;
            chrome.storage.local.set({[category_name]: value});
        }

    });
}