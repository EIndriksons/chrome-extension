// add onclick event handlers to all "Add to Cart" buttons on page
document.querySelectorAll('.o-pwa-button-cart').forEach((button) => {
    button.onclick = () => {
        let url = new URL(window.location.href);

        if (url.hostname === 'www.urbanoutfitters.com' && url.pathname.includes('/shop/')) {

            let category = url.searchParams.get('category');

            if (category === undefined || category === null) {

                let category_url = new URL(document.querySelector('nav').querySelectorAll('a')[0].href);
                chrome.runtime.sendMessage({addedToCart: category_url.pathname});

            } else {
                chrome.runtime.sendMessage({addedToCart: category});
            }
        }

    };
});