// Table Booking JavaScript

const DEFAULT_TABLES = [
    { id: 1, name: "T-01", status: "available", capacity: 2, shape: "round" },
    { id: 2, name: "T-02", status: "reserved", capacity: 4, shape: "square", guestName: "Sarah Connor", time: "07:30 PM" },
    { id: 3, name: "T-03", status: "occupied", capacity: 4, shape: "square" },
    { id: 4, name: "T-04", status: "cleaning", capacity: 2, shape: "round" },
    { id: 5, name: "T-05", status: "vip", capacity: 6, shape: "rectangle", guestName: "Elon Musk", time: "09:00 PM" },
    { id: 6, name: "T-06", status: "available", capacity: 4, shape: "square" },
    { id: 7, name: "T-07", status: "available", capacity: 2, shape: "round" },
    { id: 8, name: "T-08", status: "reserved", capacity: 8, shape: "rectangle", guestName: "John Doe", time: "08:00 PM" }
];

let tables = JSON.parse(localStorage.getItem('dineflow_tables')) || DEFAULT_TABLES;
let selectedTable = null;

document.addEventListener('DOMContentLoaded', () => {
    renderFloorPlan();
    renderReservationsSidebar();
    setupTableModal();
    setupBookingForm();
});

const renderFloorPlan = () => {
    const map = document.getElementById('floorMap');
    if (!map) return;
    map.innerHTML = '';

    tables.forEach(table => {
        const div = document.createElement('div');
        div.className = `restaurant-table ${table.shape} state-${table.status}`;
        div.innerHTML = `
            <span>${table.name}</span>
            <span class="table-capacity">${table.capacity} Pax</span>
        `;
        div.addEventListener('click', () => openTableModal(table));
        map.appendChild(div);
    });
};

const renderReservationsSidebar = () => {
    const list = document.getElementById('reservationsList');
    if (!list) return;
    list.innerHTML = '';

    const reserved = tables.filter(t => t.status === 'reserved' || t.status === 'vip');

    if (reserved.length === 0) {
        list.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem; text-align:center;">No reservations today.</p>`;
        return;
    }

    reserved.forEach(t => {
        const card = document.createElement('div');
        card.className = 'reservation-card glass';
        card.innerHTML = `
            <div class="reservation-card-header">
                <strong style="color:var(--text-main); font-size:0.95rem;">${t.guestName}</strong>
                <span class="badge ${t.status === 'vip' ? 'badge-warning' : 'badge-info'}">${t.status.toUpperCase()}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.85rem; color:var(--text-muted);">${t.name} (${t.capacity} Pax)</span>
                <span class="reservation-time">${t.time || 'TBD'}</span>
            </div>
        `;
        list.appendChild(card);
    });
};

const openTableModal = (table) => {
    selectedTable = table;
    const modal = document.getElementById('tableModal');
    const title = document.getElementById('modalTableTitle');
    const info = document.getElementById('modalTableInfo');
    const selectStatus = document.getElementById('modalTableStatusSelect');

    if (modal && title && info) {
        title.textContent = `Configure Table ${table.name}`;
        
        let infoText = `Capacity: ${table.capacity} Pax<br>`;
        if (table.guestName) {
            infoText += `Guest: ${table.guestName} (${table.time})`;
        } else {
            infoText += `Guest: None`;
        }
        info.innerHTML = infoText;
        selectStatus.value = table.status;

        modal.classList.add('active');
    }
};

const setupTableModal = () => {
    const modal = document.getElementById('tableModal');
    const closeBtn = document.getElementById('closeTableModalBtn');
    const saveBtn = document.getElementById('saveTableConfigBtn');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (saveBtn && modal) {
        saveBtn.addEventListener('click', () => {
            if (!selectedTable) return;
            const newStatus = document.getElementById('modalTableStatusSelect').value;
            
            tables = tables.map(t => {
                if (t.id === selectedTable.id) {
                    t.status = newStatus;
                    if (newStatus !== 'reserved' && newStatus !== 'vip') {
                        delete t.guestName;
                        delete t.time;
                    }
                }
                return t;
            });

            localStorage.setItem('dineflow_tables', JSON.stringify(tables));
            renderFloorPlan();
            renderReservationsSidebar();
            modal.classList.remove('active');
        });
    }
};

const setupBookingForm = () => {
    const form = document.getElementById('quickBookingForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const guestName = document.getElementById('bookGuestName').value;
        const guestCount = parseInt(document.getElementById('bookGuestCount').value);
        const time = document.getElementById('bookTime').value;
        const tableSelect = document.getElementById('bookTableSelect').value;

        tables = tables.map(t => {
            if (t.name === tableSelect) {
                t.status = 'reserved';
                t.guestName = guestName;
                t.time = time;
                t.capacity = guestCount;
            }
            return t;
        });

        localStorage.setItem('dineflow_tables', JSON.stringify(tables));
        renderFloorPlan();
        renderReservationsSidebar();
        form.reset();
    });
};
