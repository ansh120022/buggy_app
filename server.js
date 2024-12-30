const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

// Initialize database with sample data
db.serialize(() => {
    db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER, imageName TEXT)");
    db.run("INSERT INTO products VALUES (1, 'Laptop', 999.99, 5, 'laptop.jpg')");
    db.run("INSERT INTO products VALUES (2, 'Smartphone', 499.99, 10, 'phone.png')");
    db.run("INSERT INTO products VALUES (3, 'Headphones', 99.99, 15, 'headphones.jpg')")
    db.run("INSERT INTO products VALUES (4, 'Numpad', 79.99, 6, 'numpad.png')")
    db.run("INSERT INTO products VALUES (5, 'Keyboard', 31.99, 2, 'keyboard.png')")
    db.run("INSERT INTO products VALUES (6, 'Music player', 120.99, 1, 'music_player.png')")
    db.run("INSERT INTO products VALUES (7, 'Printer', 91.90, 2, 'printer.png')")
    db.run("INSERT INTO products VALUES (8, 'Movie projector', 320.99, 1, 'projector.png')")
    db.run("INSERT INTO products VALUES (9, 'Alarm clock', 37.99, 1, 'clock.png')")

    
    db.run("CREATE TABLE home_decor (id INTEGER PRIMARY KEY, name TEXT, price REAL, stock INTEGER, imageName TEXT, category TEXT)");
    db.run("INSERT INTO home_decor VALUES (1, 'Mirror The president', 49.99, 20, 'the_president.png', 'Kitchenware')");
    db.run("INSERT INTO home_decor VALUES (2, 'Mirror Love banana', 39.99, 30, 'love_banana.png', 'Bedding')");
    db.run("INSERT INTO home_decor VALUES (3, 'Mirror space cowboy', 129.99, 15, 'space_cowboy.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (4, 'Armchair Lipstick', 320.99, 2, 'armchair_lip.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (5, 'Armchair Volcano', 320.99, 2, 'armchair_volcano.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (6, 'Table lamp Trumpets', 120.99, 2, 'tablelamp.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (7, 'High stool Roses', 160.99, 3, 'highstool.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (8, 'Wallpaper Spagetti', 50.99, 3, 'spagetti.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (9, 'Wallpaper Chips', 50.99, 3, 'chips.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (10, 'Wallpaper Popcorn', 50.99, 3, 'popcorn.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (11, 'Porcelane plate Globe', 50.99, 3, 'globe.png', 'Appliances')");
    db.run("INSERT INTO home_decor VALUES (12, 'Sofa Ocean', 1050.99, 3, 'sofa_sea.png', 'Appliances')");


});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/electronics.html', (req, res) => {
    res.render('electronics');
});

app.get('/category.html', (req, res) => {
    res.render('category');
});

app.get('/checkout.html', (req, res) => {
    res.render('checkout');
});

app.get('/home-decor.html', (req, res) => {
    res.render('home-decor');
});

app.get('/cart.html', (req, res) => {
    res.render('cart');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/checkout-success', (req, res) => {
    const orderId = req.query.orderId;
    res.render('checkout-success', { orderId });
});

// API Endpoints
app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ data: products });
    });
});

app.get('/delivery-address', (req, res) => {
    res.render('delivery-address');
});

app.post('/delivery-address', (req, res) => {
    // Save address to session or database
    res.redirect('/payment');
});


app.post('/api/cart', (req, res) => {
    const { productId, quantity } = req.body;
    db.get("SELECT stock FROM products WHERE id = ?", [productId], (err, row) => {
        if (row && row.stock >= quantity) {
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Not enough stock' });
        }
    });
});

app.get('/api/home-decor', (req, res) => {
    db.all("SELECT * FROM home_decor", (err, products) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ data: products });
    });
});





app.listen(3000, () => console.log('Server running on port 3000'));
