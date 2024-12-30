document.addEventListener("DOMContentLoaded", function () {
    const headerTemplate = `
    <div class="header-container">
        <a href="/" class="nav-logo">
            <img src="/images/ahazone.png" alt="Ahazone">
        </a>
        <div class="search-bar">
            <input type="text" placeholder="Search...">
            <button class="search-button">Search</button>
        </div>
        <nav class="nav-menu">
            <ul>
                <li><a href="/electronics.html">Electronics</a></li>
                <li><a href="/home-decor.html">Home Decor</a></li>
                <li>
                    <a href="/cart.html" class="cart-link">
                        Cart
                        <span class="cart-count">0</span>
                    </a>
                </li>
                <li><a href="#" class="account-link">Account</a></li>
            </ul>
        </nav>
    </div>
    `;

    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.innerHTML = headerTemplate;
        loadCartCount();
    }
});

function loadCartCount() {
    const cartCount = localStorage.getItem('buggyCart') ? 
        JSON.parse(localStorage.getItem('buggyCart')).length : 0;
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
