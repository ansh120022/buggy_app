function createProductCard(product) {
    return `
        <div class="amazon-product-card">
            <img src="/images/${product.imageName}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="product-rating">★★★☆☆ (${Math.floor(Math.random() * 100)} reviews)</div>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-prime">🚚 Free Delivery</p>
                <button 
                    onclick="addToCart({
                        id: ${product.id}, 
                        name: '${product.name}', 
                        price: ${product.price}, 
                        image: '${product.imageName}'
                    })"
                    class="add-to-cart">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}
