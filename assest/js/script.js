const products = [
    { id: 1, name: 'AirPods Pro Max', price: 250, stock: 8, img: 'assets/img/Airpod pro.png' },
    { id: 2, name: 'Samsung Replacement Battery', price: 15, stock: 25, img: 'assets/img/batteries.jpg' },
    { id: 3, name: 'JBL Waterproof Bluetooth Speaker', price: 85, stock: 6, img: 'assets/img/bluethooth.jpg' },
    { id: 4, name: 'Premium Multi-Color Cables', price: 10, stock: 50, img: 'assets/img/cables.jpg' },
    { id: 5, name: 'High-Speed USB Card Reader', price: 12, stock: 15, img: 'assets/img/card reader.jpg' },
    { id: 6, name: 'Samsung Galaxy Buds', price: 110, stock: 4, img: 'assets/img/Earpod.jpg' },
    { id: 7, name: 'JBL Wireless Headphones (Blue)', price: 75, stock: 10, img: 'assets/img/headphones.jpg' },
    { id: 8, name: 'Marshall Wired Headsets', price: 45, stock: 12, img: 'assets/img/headsets.jpg' }
];

let cart = [];
let currentCurrency = 'USD';
const rate = 27.2; 

function updateGreeting() {
    const hour = new Date().getHours();
    const bar = document.getElementById('greeting-bar');
    if (hour < 12) bar.innerText = "Good Morning! Welcome to SmartGear Luwingu.";
    else if (hour < 18) bar.innerText = "Good Afternoon! Shop the best gear in Burma Luwingu.";
    else bar.innerText = "Good Evening! Night deals are live at SmartGear.";
}

function formatPrice(amt) {
    return currentCurrency === 'ZMW' ? 'K' + (amt * rate).toLocaleString() : '$' + amt.toFixed(2);
}

function toggleCurrency() {
    currentCurrency = currentCurrency === 'USD' ? 'ZMW' : 'USD';
    document.getElementById('alt-curr').innerText = currentCurrency === 'USD' ? 'ZMW' : 'USD';
    render();
    updateUI();
}

function render() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.name}">
            <span class="stock-tag">${p.stock > 0 ? p.stock + ' Items Left' : 'Out of Stock'}</span>
            <h3 style="margin:5px 0; font-size:1.1rem;">${p.name}</h3>
            <div class="price-tag">${formatPrice(p.price)}</div>
            <button class="btn ${p.stock > 0 ? 'btn-primary' : 'btn-disabled'}" 
                    onclick="${p.stock > 0 ? `addToCart(${p.id})` : ''}">
                ${p.stock > 0 ? 'Add to Bag' : 'Sold Out'}
            </button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product.stock > 0) {
        product.stock--;
        cart.push({...product});
        updateUI();
        render();
        document.getElementById('sidebar').classList.add('open');
    }
}

function updateUI() {
    document.getElementById('count').innerText = cart.length;
    const total = cart.reduce((sum, i) => sum + i.price, 0);
    document.getElementById('cart-total').innerText = formatPrice(total);
    
    document.getElementById('cartItems').innerHTML = cart.map((i, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem">
            <span>${i.name}</span>
            <span>${formatPrice(i.price)}</span>
        </div>
    `).join('');
}

function toggleCart() { document.getElementById('sidebar').classList.toggle('open'); }

function processPayment() {
    const phone = document.getElementById('momo-phone').value;
    if(phone.length < 10) return alert("Please enter a valid MoMo number.");
    alert("Success! A payment prompt has been sent to your phone. Thank you for shopping with SmartGear Burma Luwingu!");
}

// Initialize
updateGreeting();
render();