// Menu Management Javascript

const DEFAULT_MENU = [
    { id: 1, name: "Truffle Mushroom Pizza", category: "mains", description: "Wild mushrooms, white truffle oil, fresh mozzarella, rosemary.", price: 24.00, status: "active", icon: "pizza", image: "assets/img/truffle_mushroom_pizza.png" },
    { id: 2, name: "Wagyu Ribeye Steak", category: "mains", description: "A5 Grade Japanese Wagyu, garlic herb butter, roasted asparagus.", price: 85.00, status: "active", icon: "beef", image: "assets/img/wagyu_ribeye_steak.png" },
    { id: 3, name: "Caramel Macchiato", category: "beverages", description: "Espresso, steamed milk, vanilla syrup, caramel drizzle.", price: 6.50, status: "active", icon: "coffee", image: "assets/img/caramel_macchiato.png" },
    { id: 4, name: "Spicy Tuna Tartare", category: "starters", description: "Ahi tuna, avocado, spicy sriracha soy, wonton crisps.", price: 18.00, status: "active", icon: "fish", image: "assets/img/spicy_tuna_tartare.png" },
    { id: 5, name: "Chocolate Lava Cake", category: "desserts", description: "Warm chocolate cake, molten center, vanilla bean gelato.", price: 12.00, status: "active", icon: "cake", image: "assets/img/chocolate_lava_cake.png" },
    { id: 6, name: "Crispy Calamari", category: "starters", description: "Lightly breaded calamari, sweet chili dipping sauce, lemon.", price: 15.00, status: "inactive", icon: "soup", image: "assets/img/crispy_calamari.png" }
];

let menuItems = JSON.parse(localStorage.getItem('dineflow_menu')) || DEFAULT_MENU;

// Merge image property from DEFAULT_MENU if missing
menuItems = menuItems.map(item => {
    const defaultItem = DEFAULT_MENU.find(d => d.id === item.id);
    if (defaultItem && !item.image) {
        item.image = defaultItem.image;
    }
    return item;
});
localStorage.setItem('dineflow_menu', JSON.stringify(menuItems));

document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    setupFilters();
    setupModal();
    setupForm();
});

const renderMenu = (filterCategory = 'all') => {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const itemsToRender = filterCategory === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === filterCategory);

    if (itemsToRender.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: span 12; text-align: center; padding: 4rem; color: var(--text-muted);">
                <i data-lucide="package-open" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                <p>No dishes found in this category.</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }

    itemsToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card glass menu-item-card';
        card.innerHTML = `
            <div class="menu-item-image-container">
                ${item.image 
                    ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">` 
                    : `<span class="menu-item-image-placeholder"><i data-lucide="${item.icon || 'chef-hat'}"></i></span>`
                }
                <span class="badge ${item.status === 'active' ? 'badge-success' : 'badge-danger'} menu-item-status-badge">
                    ${item.status === 'active' ? 'Active' : 'Inactive'}
                </span>
            </div>
            <div class="menu-item-content">
                <span class="menu-item-category">${item.category}</span>
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    <div class="menu-item-actions">
                        <button class="icon-btn btn-toggle-status" data-id="${item.id}" title="Toggle Active/Inactive">
                            <i data-lucide="${item.status === 'active' ? 'eye-off' : 'eye'}"></i>
                        </button>
                        <button class="icon-btn text-danger btn-delete-item" data-id="${item.id}" title="Delete Item">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Attach actions
    document.querySelectorAll('.btn-toggle-status').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            toggleStatus(id);
        });
    });

    document.querySelectorAll('.btn-delete-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            deleteItem(id);
        });
    });
};

const setupFilters = () => {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filters.forEach(f => f.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const category = e.currentTarget.getAttribute('data-category');
            renderMenu(category);
        });
    });
};

const setupModal = () => {
    const openBtn = document.getElementById('addDishBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('addDishModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
};

const setupForm = () => {
    const form = document.getElementById('addDishForm');
    const modal = document.getElementById('addDishModal');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('dishName').value;
        const price = parseFloat(document.getElementById('dishPrice').value);
        const category = document.getElementById('dishCategory').value;
        const description = document.getElementById('dishDescription').value;
        const icon = document.getElementById('dishIcon').value || 'chef-hat';

        const newItem = {
            id: Date.now(),
            name,
            price,
            category,
            description,
            status: "active",
            icon
        };

        menuItems.push(newItem);
        localStorage.setItem('dineflow_menu', JSON.stringify(menuItems));
        
        form.reset();
        modal.classList.remove('active');
        
        // Find active filter and render
        const activeFilter = document.querySelector('.filter-btn.active');
        const currentCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
        renderMenu(currentCategory);
    });
};

const toggleStatus = (id) => {
    menuItems = menuItems.map(item => {
        if (item.id === id) {
            item.status = item.status === 'active' ? 'inactive' : 'active';
        }
        return item;
    });
    localStorage.setItem('dineflow_menu', JSON.stringify(menuItems));
    const activeFilter = document.querySelector('.filter-btn.active');
    renderMenu(activeFilter ? activeFilter.getAttribute('data-category') : 'all');
};

const deleteItem = (id) => {
    if (confirm('Are you sure you want to delete this dish from the menu?')) {
        menuItems = menuItems.filter(item => item.id !== id);
        localStorage.setItem('dineflow_menu', JSON.stringify(menuItems));
        const activeFilter = document.querySelector('.filter-btn.active');
        renderMenu(activeFilter ? activeFilter.getAttribute('data-category') : 'all');
    }
};
