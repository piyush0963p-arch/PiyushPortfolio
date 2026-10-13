// Inventory Management JavaScript

const DEFAULT_INVENTORY = [
    { id: 1, name: "Wagyu Beef Ribeye", stock: 24, minLevel: 10, unit: "kg", supplier: "Royal Meats Inc.", expiry: "2026-06-25" },
    { id: 2, name: "Fresh Mozzarella", stock: 8, minLevel: 15, unit: "kg", supplier: "Dairy Farms Co.", expiry: "2026-06-18" },
    { id: 3, name: "White Truffle Oil", stock: 2.5, minLevel: 2, unit: "Liters", supplier: "Gourmet Imports", expiry: "2027-02-12" },
    { id: 4, name: "Caramel Syrup", stock: 12, minLevel: 5, unit: "Bottles", supplier: "Sweet Treats Inc.", expiry: "2026-12-01" },
    { id: 5, name: "Ahi Tuna Sashimi Grade", stock: 0, minLevel: 8, unit: "kg", supplier: "Pacific Seafood", expiry: "2026-06-15" },
    { id: 6, name: "Fresh Rosemary", stock: 1.5, minLevel: 1, unit: "kg", supplier: "Green Leaves Organic", expiry: "2026-06-20" }
];

let inventory = JSON.parse(localStorage.getItem('dineflow_inventory')) || DEFAULT_INVENTORY;

document.addEventListener('DOMContentLoaded', () => {
    renderInventoryTable();
    setupInventorySearch();
    setupInventoryModal();
    setupInventoryForm();
});

const calculateStatus = (stock, minLevel) => {
    if (stock <= 0) return { label: "Out of Stock", class: "stock-status-out" };
    if (stock <= minLevel / 2) return { label: "Critical", class: "stock-status-critical" };
    if (stock <= minLevel) return { label: "Low Stock", class: "stock-status-low" };
    return { label: "In Stock", class: "stock-status-in" };
};

const renderInventoryTable = (search = '') => {
    const tbody = document.getElementById('inventoryTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let items = inventory;
    if (search.trim() !== '') {
        items = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No inventory items found.</td></tr>`;
        return;
    }

    items.forEach(item => {
        const status = calculateStatus(item.stock, item.minLevel);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>${item.stock} ${item.unit}</td>
            <td>${item.minLevel} ${item.unit}</td>
            <td><span class="badge ${status.class}">${status.label}</span></td>
            <td>${item.supplier}</td>
            <td>${item.expiry}</td>
            <td>
                <button class="btn btn-secondary btn-xs btn-restock" data-id="${item.id}" style="padding:0.2rem 0.5rem; font-size:0.75rem;">
                    Restock (+25)
                </button>
                <button class="icon-btn text-danger btn-delete-inv" data-id="${item.id}" style="display:inline-flex; width:28px; height:28px; border:none; background:transparent;">
                    <i data-lucide="trash-2" style="width:14px; height:14px;"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Restock handlers
    document.querySelectorAll('.btn-restock').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            restockItem(id);
        });
    });

    // Delete handlers
    document.querySelectorAll('.btn-delete-inv').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            deleteInventoryItem(id);
        });
    });
};

const restockItem = (id) => {
    inventory = inventory.map(item => {
        if (item.id === id) {
            item.stock += 25;
        }
        return item;
    });
    localStorage.setItem('dineflow_inventory', JSON.stringify(inventory));
    renderInventoryTable();
};

const deleteInventoryItem = (id) => {
    if (confirm('Delete this ingredient?')) {
        inventory = inventory.filter(item => item.id !== id);
        localStorage.setItem('dineflow_inventory', JSON.stringify(inventory));
        renderInventoryTable();
    }
};

const setupInventorySearch = () => {
    const input = document.getElementById('inventorySearch');
    if (input) {
        input.addEventListener('input', (e) => {
            renderInventoryTable(e.target.value);
        });
    }
};

const setupInventoryModal = () => {
    const openBtn = document.getElementById('addInvBtn');
    const closeBtn = document.getElementById('closeInvModalBtn');
    const modal = document.getElementById('addInvModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
};

const setupInventoryForm = () => {
    const form = document.getElementById('addInvForm');
    const modal = document.getElementById('addInvModal');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('invName').value;
        const stock = parseFloat(document.getElementById('invStock').value);
        const minLevel = parseFloat(document.getElementById('invMin').value);
        const unit = document.getElementById('invUnit').value;
        const supplier = document.getElementById('invSupplier').value;
        const expiry = document.getElementById('invExpiry').value;

        const newItem = {
            id: Date.now(),
            name,
            stock,
            minLevel,
            unit,
            supplier,
            expiry
        };

        inventory.push(newItem);
        localStorage.setItem('dineflow_inventory', JSON.stringify(inventory));
        
        form.reset();
        modal.classList.remove('active');
        renderInventoryTable();
    });
};
