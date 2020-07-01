// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//         console.log('The color is green.');
//     });
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//         chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {hostEquals: 'developer.chrome.com'},
//         })
//         ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//         }]);
//     });
// });

// use storage.sync if you want the Chrome to synce the data between browser log-on's
// in this I'll use storage.local

// // using chrome.runtime.onInstalled for first setup in the extension
// chrome.runtime.onInstalled.addListener(() => {
//     // set basic user affinity score

//     const affinity_categories = ['womens', 'mens', 'home', 'lifestyle', 'beauty'];
//     affinity_categories.forEach(category => {
//         chrome.storage.local.set({[category]: 0}, () => console.log(category + ' initialized!'));
//     });

//     // chrome.storageArea.local.set({
//     //     affinity_score: {
//     //         womens: 0,
//     //         mens: 0,
//     //         home: 0,
//     //         lifestyle: 0,
//     //         beauty: 0,
//     //     }
//     // }, () => {
//     //     console.log('Storage initialized!');
//     // })

//     chrome.storage.local.get(['womens'], (result) => {
//         console.log('Storage currently is ' + result.key);
//     });

    // chrome.storage.local.set({key: 0}, function() {
    //     console.log('Value is set!');
    // });
    
    // chrome.storage.local.get(['key'], function(result) {
    //     console.log('Value currently is ' + result.key);
    // });

    // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //     console.log(tabId);
    //     console.log(changeInfo);
    //     console.log(tab);
    // })

// });

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // read changeinfo data and do something with it (like read the url)
//     if (changeInfo.url) {
//         // do something here
//     }
// });

// chrome.tabs.onUpdated.addListener(() => {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function(tabs) {
//         var tab = tabs[0];
//         var url = tab.url;
//         console.log(url);
//     });
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        let url = new URL(tab.url);
        let param = url.searchParams.get('category');
        console.log(param);
    }
});