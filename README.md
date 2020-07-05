# DY User Affinity Tracker

This Chrome extension tracks the product categories which the user has viewed or "added to the cart" at www.urbanoutfitters.com.

## How it works:
The Affinity score for Product categories is tracked in two main ways:
1. Acquiring product category ID from the Product page URL parameter.
2. In case the Product page URL parameter does not exist (few such cases), by using the Navigation HTML object on the product page.

For product views, **the Affinity score is 1**. In the case of "Add to Cart", the product page is injected with `script.js` which adds an event handler to the "Add to Cart" button that communicates with `content.js` and `background.js` to set the product category **Affinity score of 3**.

P.S. Affinity score items use the website's underlying product category names which I have not changed. Additional logic can be easily implemented to parse this data though.

## Contents:

- `background.js` contains the main code for the extension. Here product views are logged through URL product category parameters or if they do not exist through the communication with `content.js` script to retrieve product category from HTML DOM elements. Other functions, that deal with `chrome.storage.local` or other features are also present here.
- `content.js` communicates with `background.js` to send product category parameters. Also injects into the page `script.js` which adds event handlers on "Add to Cart" buttons to track when a product is added to the cart, thus also enabling this functionality with `background.js` through Chrome messaging API's.
  - `script.js` is injected in the page by `content.js` and sets the event handlers for "Add to Cart" buttons. It then communicates with `content.js` by using `window.dispatchEvent`.
- `popup.js`, `popup.html`, `popup.css` is the visual representation of the extension (when you press the extension icon in Chrome browser). Additionally `popup.js` ensures that on view the `chrome.storage.local` contents are retrieved and displayed. It is also possible to clear storage for debugging purposes.

## Installation:
1. Enable developer mode in "chrome://extensions".
2. Press "Load unpacked" and load this repository.