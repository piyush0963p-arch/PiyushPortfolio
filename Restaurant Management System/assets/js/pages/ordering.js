// Customer Ordering Javascript

let cart = [];
const menuItems = JSON.parse(localStorage.getItem('dineflow_menu')) || [
    { id: 1, name: "Truffle Mushroom Pizza", category: "mains", description: "Wild mushrooms, white truffle oil, fresh mozzarella, rosemary.", price: 24.00, status: "active", icon: "pizza", image: "assets/img/truffle_mushroom_pizza.png" },
    { id: 2, name: "Wagyu Ribeye Steak", category: "mains", description: "A5 Grade Japanese Wagyu, garlic herb butter, roasted asparagus.", price: 85.00, status: "active", icon: "beef", image: "assets/img/wagyu_ribeye_steak.png" },
    { id: 3, name: "Caramel Macchiato", category: "beverages", description: "Espresso, steamed milk, vanilla syrup, caramel drizzle.", price: 6.50, status: "active", icon: "coffee", image: "assets/img/caramel_macchiato.png" },
    { id: 4, name: "Spicy Tuna Tartare", category: "starters", description: "Ahi tuna, avocado, spicy sriracha soy, wonton crisps.", price: 18.00, status: "active", icon: "fish", image: "assets/img/spicy_tuna_tartare.png" },
    { id: 5, name: "Chocolate Lava Cake", category: "desserts", description: "Warm chocolate cake, molten center, vanilla bean gelato.", price: 12.00, status: "active", icon: "cake", image: "assets/img/chocolate_lava_cake.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderMenuGrid('all');
    renderRecommendations();
    setupFilters();
    setupSearch();
    setupCheckout();
});

const renderMenuGrid = (category = 'all', searchQuery = '') => {
    const grid = document.getElementById('orderingGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let items = menuItems.filter(item => item.status === 'active');
    
    if (category !== 'all') {
        items = items.filter(item => item.category === category);
    }
    
    if (searchQuery.trim() !== '') {
        items = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 12; text-align: center; padding: 3rem; color: var(--text-muted);">No active dishes found.</div>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card glass menu-item-card';
        card.innerHTML = `
            <div class="menu-item-image-container">
                ${item.image 
                    ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">` 
                    : `<span class="menu-item-image-placeholder"><i data-lucide="${item.icon || 'chef-hat'}"></i></span>`
                }
            </div>
            <div class="menu-item-content">
                <span class="menu-item-category">${item.category}</span>
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    <button class="btn btn-primary btn-add-to-cart" data-id="${item.id}">
                        <i data-lucide="plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            addToCart(id);
        });
    });
};

const renderRecommendations = () => {
    const container = document.getElementById('recommendationsGrid');
    if (!container) return;
    container.innerHTML = '';

    // Mocks AI Recommendations: pick top 3 items
    const recs = menuItems.filter(item => item.status === 'active').slice(0, 3);
    
    recs.forEach(item => {
        const card = document.createElement('div');
        card.className = 'ai-rec-card glass';
        card.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="sparkles" style="color: var(--primary); width: 14px; height: 14px;"></i>
                <span class="ai-rec-title">${item.name}</span>
            </div>
            <span class="ai-rec-price">$${item.price.toFixed(2)}</span>
        `;
        card.addEventListener('click', () => addToCart(item.id));
        container.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const setupFilters = () => {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filters.forEach(f => f.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const cat = e.currentTarget.getAttribute('data-category');
            renderMenuGrid(cat);
        });
    });
};

const setupSearch = () => {
    const searchInput = document.getElementById('orderSearch');
    if (!searchInput) return;
    searchInput.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.filter-btn.active');
        const cat = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        renderMenuGrid(cat, e.target.value);
    });
};

const addToCart = (id) => {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        const item = menuItems.find(i => i.id === id);
        if (item) {
            cart.push({ ...item, quantity: 1 });
        }
    }
    updateCartUI();
};

const updateCartUI = () => {
    const container = document.getElementById('cartItems');
    if (!container) return;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Your cart is empty.</div>`;
        updateSummary(0);
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
            </div>
        `;
        container.appendChild(row);
    });

    updateSummary(subtotal);

    document.querySelectorAll('.dec-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const match = cart.find(item => item.id === id);
            if (match) {
                match.quantity -= 1;
                if (match.quantity <= 0) {
                    cart = cart.filter(item => item.id !== id);
                }
                updateCartUI();
            }
        });
    });

    document.querySelectorAll('.inc-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const match = cart.find(item => item.id === id);
            if (match) {
                match.quantity += 1;
                updateCartUI();
            }
        });
    });
};

const updateSummary = (subtotal) => {
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const subVal = document.getElementById('subtotalValue');
    const taxVal = document.getElementById('taxValue');
    const totVal = document.getElementById('totalValue');

    if (subVal) subVal.textContent = `$${subtotal.toFixed(2)}`;
    if (taxVal) taxVal.textContent = `$${tax.toFixed(2)}`;
    if (totVal) totVal.textContent = `$${total.toFixed(2)}`;
};

const setupCheckout = () => {
    const btn = document.getElementById('checkoutBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Please add items to your cart first.');
            return;
        }
        alert('Order placed successfully! Sending to Kitchen.');
        // Clear cart
        cart = [];
        updateCartUI();
    });
};
