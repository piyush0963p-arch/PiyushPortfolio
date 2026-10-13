// Customer Management JavaScript

const DEFAULT_CUSTOMERS = [
    { id: 1, name: "Alexander the Great", email: "alex@macedon.com", phone: "+1 555-0199", visits: 48, points: 2450, favDish: "Wagyu Ribeye Steak", segment: "VIP" },
    { id: 2, name: "Cleopatra Philopator", email: "cleo@alexandria.com", phone: "+1 555-0145", visits: 32, points: 1560, favDish: "Spicy Tuna Tartare", segment: "Regular" },
    { id: 3, name: "Julius Caesar", email: "caesar@rome.org", phone: "+1 555-0100", visits: 5, points: 250, favDish: "Truffle Mushroom Pizza", segment: "New" },
    { id: 4, name: "Napoleon Bonaparte", email: "napoleon@elba.fr", phone: "+1 555-0182", visits: 18, points: 890, favDish: "Chocolate Lava Cake", segment: "Regular" },
    { id: 5, name: "Hannibal Barca", email: "hannibal@carthage.net", phone: "+1 555-0112", visits: 1, points: 50, favDish: "None Yet", segment: "At Risk" }
];

let customers = JSON.parse(localStorage.getItem('dineflow_customers')) || DEFAULT_CUSTOMERS;

document.addEventListener('DOMContentLoaded', () => {
    renderCustomersTable();
    setupCustomerSearch();
    setupCustomerModal();
    setupCustomerForm();
});

const renderCustomersTable = (search = '') => {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let items = customers;
    if (search.trim() !== '') {
        items = items.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));
    }

    if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:2rem;">No customers found.</td></tr>`;
        return;
    }

    items.forEach(c => {
        let segClass = 'segment-new';
        if (c.segment === 'VIP') segClass = 'segment-vip';
        else if (c.segment === 'Regular') segClass = 'segment-regular';
        else if (c.segment === 'At Risk') segClass = 'segment-at-risk';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${c.name}</strong></td>
            <td>${c.email}<br><span style="font-size:0.75rem; color:var(--text-muted);">${c.phone}</span></td>
            <td>${c.visits} Visits</td>
            <td><strong>${c.points} Pts</strong></td>
            <td>${c.favDish}</td>
            <td><span class="badge ${segClass}">${c.segment}</span></td>
            <td>
                <button class="btn btn-secondary btn-xs" onclick="issuePromo('${c.name}', '${c.segment}')" style="padding:0.2rem 0.5rem; font-size:0.75rem;">
                    Issue Promo
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

const setupCustomerSearch = () => {
    const input = document.getElementById('customerSearch');
    if (input) {
        input.addEventListener('input', (e) => {
            renderCustomersTable(e.target.value);
        });
    }
};

const setupCustomerModal = () => {
    const openBtn = document.getElementById('addCustBtn');
    const closeBtn = document.getElementById('closeCustModalBtn');
    const modal = document.getElementById('addCustModal');

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

const setupCustomerForm = () => {
    const form = document.getElementById('addCustForm');
    const modal = document.getElementById('addCustModal');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('custName').value;
        const email = document.getElementById('custEmail').value;
        const phone = document.getElementById('custPhone').value;
        const favDish = document.getElementById('custFav').value || "None";

        const newCustomer = {
            id: Date.now(),
            name,
            email,
            phone,
            visits: 1,
            points: 100,
            favDish,
            segment: "New"
        };

        customers.push(newCustomer);
        localStorage.setItem('dineflow_customers', JSON.stringify(customers));
        
        form.reset();
        modal.classList.remove('active');
        renderCustomersTable();
    });
};

window.issuePromo = (name, segment) => {
    let promo = "10% off your next meal!";
    if (segment === 'VIP') promo = "Complimentary bottle of Chef's Reserve Wine!";
    else if (segment === 'At Risk') promo = "We miss you! Get 25% off this weekend!";
    
    alert(`Personalized offer sent to ${name}:\n"${promo}"`);
};
