// add onclick event handlers to all "Add to Cart" buttons on page
document.querySelectorAll('.o-pwa-button-cart').forEach((button) => {
    button.onclick = () => {

        // check for category from URL or navigation
        let url = new URL(window.location.href);

        if (url.hostname === 'www.urbanoutfitters.com' && url.pathname.includes('/shop/')) {

            let category = url.searchParams.get('category');

            if (category === undefined || category === null) {

                let category_url = new URL(document.querySelector('nav').querySelectorAll('a')[0].href);

                // dispatch affinity category name to content.js script
                window.dispatchEvent(new CustomEvent('addedToCart', {detail: category_url.pathname}));

            } else {
                // dispatch affinity category name to content.js script
                window.dispatchEvent(new CustomEvent('addedToCart', {detail: category}));
            }
        }

    };
});