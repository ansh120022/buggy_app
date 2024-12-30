
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    saveCartToLocalStorage();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('buggyCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('buggyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function updateCartTotal(cart) {
    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const subtotalDiv = document.querySelector('.subtotal');
    subtotalDiv.innerHTML = `
        <span>Subtotal (${itemCount} items):</span>
        <span class="total-price">$${total.toFixed(2)}</span>
    `;
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('buggyCart') || '[]');
    if (cart.length === 0) {
        return;
    }

    window.location.href = '/delivery-address';
}





function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCartCount();
        saveCartToLocalStorage();
        displayCart(cart); 
    }
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCartToLocalStorage();
    displayCart(cart);
}

function displayCart(cart) {
    const container = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty (or maybe it is just a hangover)</p>';
        document.querySelector('.subtotal').innerHTML = `
            <span>Subtotal (0 items):</span>
            <span class="total-price">$0.00</span>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="/images/${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="remove-button">
                        Remove (If you can)
                    </button>
                </div>
            </div>
        `).join('');

        const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        document.querySelector('.subtotal').innerHTML = `
            <span>Subtotal (${itemCount} items):</span>
            <span class="total-price">$${total.toFixed(2)}</span>
        `;
    }
}




// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);
