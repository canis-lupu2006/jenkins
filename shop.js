/**
 * FICHIER : shop.js
 * Logique de la Tablée Togolaise compatible Jenkins & Navigateur
 */

const productsData = [
    { id: 1, name: "Fufu Sauce Graine (Poulet)", category: "plat", price: 2500, img: "images/Foutou-sauce-graine.jpg" },
    { id: 2, name: "Ayimolou Complet", category: "plat", price: 1500, img: "images/ayimolou complet.jpg" },
    { id: 3, name: "Alloco & Poisson Frit", category: "entree", price: 2000, img: "images/Alloco-poisson-frit.jpg" },
    { id: 4, name: "Bissap Frais (Maison)", category: "boisson", price: 500, img: "images/jus-bissap.webp" },
    { id: 5, name: "Atchomon (Sachet)", category: "entree", price: 500, img: "images/ATCHOMON.jpeg" },
    { id: 6, name: "Djembe (Bière Locale)", category: "boisson", price: 1000, img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80" },
    { id: 7, name: "Riz Gras au Poulet", category: "plat", price: 2200, img: "images/riz gras au poulet .avif" },
    { id: 8, name: "Koutoukou ", category: "entree", price: 1200, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80" },
    { id: 9, name: "Sodabi ", category: "boisson", price: 600, img: "images/sodabi.avif" }
];

let cart = [];

// Éléments DOM (uniquement si on est dans un navigateur)
const productsGrid = typeof document !== 'undefined' ? document.getElementById('products-grid') : null;
const cartItemsContainer = typeof document !== 'undefined' ? document.getElementById('cart-items') : null;
const cartCount = typeof document !== 'undefined' ? document.getElementById('cart-count') : null;
const cartTotal = typeof document !== 'undefined' ? document.getElementById('total-price') : null;

// --- FONCTIONS ---

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    const inCart = cart.find(item => item.id === id);

    if (inCart) {
        inCart.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateUI();

    // Protection pour Jenkins : n'ouvre le panier que si le document existe
    if (typeof document !== 'undefined' && document.getElementById('cart-sidebar')) {
        document.getElementById('cart-sidebar').classList.add('open');
        document.getElementById('cart-overlay').classList.remove('hidden');
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateUI();
}

function updateUI() {
    // Si on est dans Jenkins (Node.js), on s'arrête ici pour ne pas planter
    if (typeof document === 'undefined' || !cartCount) return;

    cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Votre panier est vide.</p>';
    } else {
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <span>${item.name} (x${item.qty})</span>
                    <span>${(item.price * item.qty).toLocaleString()} F</span>
                    <button onclick="removeFromCart(${item.id})"><i class="fas fa-times"></i></button>
                </div>
            `;
        });
    }

    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    cartTotal.innerText = `${total.toLocaleString()} FCFA`;
}

function displayProducts(filter) {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';
    const filtered = filter === 'all' ? productsData : productsData.filter(p => p.category === filter);

    filtered.forEach(p => {
        productsGrid.innerHTML += `
            <div class="product-card">
                <div class="product-img" style="background-image: url('${p.img}')"></div>
                <div class="product-info">
                    <h4>${p.name}</h4>
                    <p class="price">${p.price.toLocaleString()} FCFA</p>
                    <button class="add-btn" onclick="addToCart(${p.id})">
                        <i class="fas fa-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        `;
    });
}

function setupEventListeners() {
    if (typeof document === 'undefined') return;

    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');

    if (cartBtn) {
        cartBtn.onclick = () => {
            document.getElementById('cart-sidebar').classList.toggle('open');
            document.getElementById('cart-overlay').classList.toggle('hidden');
        };
    }

    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('cart-sidebar').classList.remove('open');
            document.getElementById('cart-overlay').classList.add('hidden');
        };
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = (e) => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            e.target.classList.add('active');
            displayProducts(e.target.dataset.filter);
        };
    });
}

// --- INITIALISATION ---
function init() {
    if (typeof document !== 'undefined') {
        displayProducts('all');
        setupEventListeners();
    }
}

init();

// --- EXPORTS POUR WINDOW (Navigateur) ---
if (typeof window !== 'undefined') {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
}

// --- EXPORTS POUR MODULE (Jenkins/Node.js) ---
if (typeof module !== 'undefined') {
    module.exports = { productsData, cart, addToCart, removeFromCart };
}