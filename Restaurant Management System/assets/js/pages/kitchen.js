// Kitchen Dashboard JavaScript

const DEFAULT_ORDERS = [
    { id: 1024, table: "Table 04", items: ["1x Truffle Mushroom Pizza", "1x Caramel Macchiato"], status: "preparing", priority: "high", time: 300, chef: "Chef Gordon" },
    { id: 1025, table: "Takeaway", items: ["2x Spicy Tuna Tartare"], status: "ready", priority: "medium", time: 480, chef: "Chef Julia" },
    { id: 1026, table: "Delivery", items: ["1x Wagyu Ribeye Steak", "1x Chocolate Lava Cake"], status: "new", priority: "high", time: 30, chef: "Chef Jamie" },
    { id: 1027, table: "Table 12", items: ["1x Caramel Macchiato"], status: "new", priority: "low", time: 10, chef: "Chef Marco" }
];

let orders = JSON.parse(localStorage.getItem('dineflow_kitchen_orders')) || DEFAULT_ORDERS;

document.addEventListener('DOMContentLoaded', () => {
    renderKanban();
    
    // Start timers
    setInterval(() => {
        orders = orders.map(order => {
            if (order.status !== 'served') {
                order.time += 1;
            }
            return order;
        });
        updateTimers();
    }, 1000);
});

const renderKanban = () => {
    const statuses = ['new', 'preparing', 'ready', 'served'];
    
    statuses.forEach(status => {
        const container = document.getElementById(`${status}List`);
        if (!container) return;
        container.innerHTML = '';

        const filtered = orders.filter(o => o.status === status);
        
        // Update counts
        const countBadge = document.getElementById(`${status}Count`);
        if (countBadge) countBadge.textContent = filtered.length;

        filtered.forEach(order => {
            const card = document.createElement('div');
            card.className = 'kitchen-order-card';
            card.id = `order-${order.id}`;
            
            let itemsMarkup = '';
            order.items.forEach(item => {
                itemsMarkup += `<li>${item}</li>`;
            });

            let nextBtn = '';
            if (status === 'new') {
                nextBtn = `<button class="btn btn-primary btn-xs" onclick="updateOrderStatus(${order.id}, 'preparing')">Prepare</button>`;
            } else if (status === 'preparing') {
                nextBtn = `<button class="btn btn-primary btn-xs" onclick="updateOrderStatus(${order.id}, 'ready')">Mark Ready</button>`;
            } else if (status === 'ready') {
                nextBtn = `<button class="btn btn-primary btn-xs" onclick="updateOrderStatus(${order.id}, 'served')">Serve</button>`;
            } else {
                nextBtn = `<button class="btn btn-secondary btn-xs" onclick="archiveOrder(${order.id})">Archive</button>`;
            }

            card.innerHTML = `
                <div class="kitchen-order-header">
                    <strong>#ORD-${order.id}</strong>
                    <span class="priority-tag priority-${order.priority}">${order.priority.toUpperCase()}</span>
                </div>
                <div style="font-size: 0.85rem; margin-bottom: 0.5rem;">${order.table}</div>
                <ul class="kitchen-item-list">
                    ${itemsMarkup}
                </ul>
                <div class="kitchen-card-footer">
                    <span class="cooking-timer" id="timer-${order.id}">
                        <i data-lucide="clock" style="width:14px; height:14px;"></i> ${formatTime(order.time)}
                    </span>
                    ${nextBtn}
                </div>
            `;
            container.appendChild(card);
        });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const updateTimers = () => {
    orders.forEach(order => {
        const timerEl = document.getElementById(`timer-${order.id}`);
        if (timerEl) {
            timerEl.innerHTML = `<i data-lucide="clock" style="width:14px; height:14px;"></i> ${formatTime(order.time)}`;
        }
    });
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

window.updateOrderStatus = (id, newStatus) => {
    orders = orders.map(order => {
        if (order.id === id) {
            order.status = newStatus;
        }
        return order;
    });
    localStorage.setItem('dineflow_kitchen_orders', JSON.stringify(orders));
    renderKanban();
};

window.archiveOrder = (id) => {
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('dineflow_kitchen_orders', JSON.stringify(orders));
    renderKanban();
};
