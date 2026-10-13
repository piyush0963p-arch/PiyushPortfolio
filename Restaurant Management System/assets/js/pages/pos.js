// POS System JavaScript

let posCart = [];
let currentCategory = 'all';
let paymentMethod = 'cash';
let discountRate = 0; // percentage

const menuItems = JSON.parse(localStorage.getItem('dineflow_menu')) || [
    { id: 1, name: "Truffle Mushroom Pizza", category: "mains", description: "Wild mushrooms, white truffle oil, fresh mozzarella, rosemary.", price: 24.00, status: "active", icon: "pizza", image: "assets/img/truffle_mushroom_pizza.png" },
    { id: 2, name: "Wagyu Ribeye Steak", category: "mains", description: "A5 Grade Japanese Wagyu, garlic herb butter, roasted asparagus.", price: 85.00, status: "active", icon: "beef", image: "assets/img/wagyu_ribeye_steak.png" },
    { id: 3, name: "Caramel Macchiato", category: "beverages", description: "Espresso, steamed milk, vanilla syrup, caramel drizzle.", price: 6.50, status: "active", icon: "coffee", image: "assets/img/caramel_macchiato.png" },
    { id: 4, name: "Spicy Tuna Tartare", category: "starters", description: "Ahi tuna, avocado, spicy sriracha soy, wonton crisps.", price: 18.00, status: "active", icon: "fish", image: "assets/img/spicy_tuna_tartare.png" },
    { id: 5, name: "Chocolate Lava Cake", category: "desserts", description: "Warm chocolate cake, molten center, vanilla bean gelato.", price: 12.00, status: "active", icon: "cake", image: "assets/img/chocolate_lava_cake.png" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderPOSGrid();
    setupCategories();
    setupPOSSearch();
    setupPaymentMethods();
    setupPOSBilling();
});

const renderPOSGrid = (search = '') => {
    const grid = document.getElementById('posGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let items = menuItems.filter(item => item.status === 'active');
    if (currentCategory !== 'all') {
        items = items.filter(item => item.category === currentCategory);
    }
    if (search.trim() !== '') {
        items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 12; text-align: center; color: var(--text-muted); padding: 2rem;">No items found</div>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'pos-item-card glass';
        card.innerHTML = `
            ${item.image 
                ? `<div style="height: 80px; width: 100%; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 0.5rem; background: var(--bg-surface-hover);">
                       <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-fast);">
                   </div>`
                : ''
            }
            <div class="pos-item-title" style="font-size: 0.85rem; margin-bottom: 0.25rem;">${item.name}</div>
            <div class="pos-item-footer">
                <span class="pos-item-price" style="font-size: 0.95rem;">$${item.price.toFixed(2)}</span>
                <i data-lucide="${item.icon || 'chef-hat'}" style="width: 16px; height: 16px; opacity: 0.5;"></i>
            </div>
        `;
        card.addEventListener('click', () => addToPOSCart(item));
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const setupCategories = () => {
    const btns = document.querySelectorAll('.pos-category-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            currentCategory = e.currentTarget.getAttribute('data-category');
            renderPOSGrid();
        });
    });
};

const setupPOSSearch = () => {
    const input = document.getElementById('posSearch');
    if (input) {
        input.addEventListener('input', (e) => {
            renderPOSGrid(e.target.value);
        });
    }
};

const addToPOSCart = (item) => {
    const existing = posCart.find(i => i.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        posCart.push({ ...item, quantity: 1 });
    }
    updatePOSCartUI();
};

const updatePOSCartUI = () => {
    const container = document.getElementById('posCartItems');
    if (!container) return;
    container.innerHTML = '';

    if (posCart.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Cart is Empty</div>`;
        calculateTotals();
        return;
    }

    posCart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'pos-cart-item';
        row.innerHTML = `
            <div class="pos-cart-item-info">
                <div class="pos-cart-item-name">${item.name}</div>
                <div class="pos-cart-item-price">$${item.price.toFixed(2)} &times; ${item.quantity}</div>
            </div>
            <div class="pos-cart-item-actions">
                <button class="qty-btn dec-pos" data-id="${item.id}">-</button>
                <button class="qty-btn inc-pos" data-id="${item.id}">+</button>
            </div>
        `;
        container.appendChild(row);
    });

    document.querySelectorAll('.dec-pos').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const match = posCart.find(i => i.id === id);
            if (match) {
                match.quantity -= 1;
                if (match.quantity <= 0) {
                    posCart = posCart.filter(i => i.id !== id);
                }
                updatePOSCartUI();
            }
        });
    });

    document.querySelectorAll('.inc-pos').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            const match = posCart.find(i => i.id === id);
            if (match) {
                match.quantity += 1;
                updatePOSCartUI();
            }
        });
    });

    calculateTotals();
};

const calculateTotals = () => {
    let subtotal = 0;
    posCart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const discountAmount = subtotal * (discountRate / 100);
    const taxableSubtotal = subtotal - discountAmount;
    const taxAmount = taxableSubtotal * 0.08; // 8% Tax
    const totalAmount = taxableSubtotal + taxAmount;

    document.getElementById('posSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('posTax').textContent = `$${taxAmount.toFixed(2)}`;
    document.getElementById('posTotal').textContent = `$${totalAmount.toFixed(2)}`;
};

const setupPaymentMethods = () => {
    const btns = document.querySelectorAll('.payment-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            paymentMethod = e.currentTarget.getAttribute('data-method');
        });
    });
};

const setupPOSBilling = () => {
    const discountInput = document.getElementById('posDiscountInput');
    if (discountInput) {
        discountInput.addEventListener('input', (e) => {
            discountRate = parseFloat(e.target.value) || 0;
            calculateTotals();
        });
    }

    const payBtn = document.getElementById('payBtn');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            if (posCart.length === 0) {
                alert('Cart is empty.');
                return;
            }

            const table = document.getElementById('posTableSelect').value;
            const subtotal = document.getElementById('posSubtotal').textContent;
            const tax = document.getElementById('posTax').textContent;
            const total = document.getElementById('posTotal').textContent;

            // Generate receipt details
            const modal = document.getElementById('receiptModal');
            const details = document.getElementById('receiptDetails');

            if (modal && details) {
                let itemsList = '';
                posCart.forEach(item => {
                    itemsList += `
                        <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:0.25rem;">
                            <span>${item.name} (x${item.quantity})</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `;
                });

                details.innerHTML = `
                    <div style="text-align:center; margin-bottom:1rem;">
                        <h3 style="margin:0;">DINEFLOW AI RECEIPT</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted); margin:0.25rem 0 0 0;">Table: ${table} | Mode: ${paymentMethod.toUpperCase()}</p>
                    </div>
                    <hr style="border:none; border-top:1px dashed var(--border); margin:1rem 0;">
                    ${itemsList}
                    <hr style="border:none; border-top:1px dashed var(--border); margin:1rem 0;">
                    <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:0.25rem;">
                        <span>Subtotal:</span>
                        <span>${subtotal}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:0.25rem;">
                        <span>Discount (${discountRate}%):</span>
                        <span>-$${(parseFloat(subtotal.substring(1)) * discountRate / 100).toFixed(2)}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:0.25rem;">
                        <span>Tax (8%):</span>
                        <span>${tax}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.1rem; margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid var(--border);">
                        <span>Total Paid:</span>
                        <span>${total}</span>
                    </div>
                `;

                modal.classList.add('active');
            }
        });
    }

    const closeBtn = document.getElementById('closeReceiptBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const modal = document.getElementById('receiptModal');
            if (modal) modal.classList.remove('active');
            // Reset Cart
            posCart = [];
            updatePOSCartUI();
        });
    }
};
