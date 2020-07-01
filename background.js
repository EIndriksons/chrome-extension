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
                console.log('oh no! #TODO');
            } else {
                console.log(param);
            }
        }
        
    }
});