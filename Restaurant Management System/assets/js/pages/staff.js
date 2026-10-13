// Staff Management JavaScript

const DEFAULT_STAFF = [
    { id: 1, name: "Marcus Aurelius", role: "Chef", email: "marcus@dineflow.com", status: "active", shift: "Morning (08:00 AM - 04:00 PM)", attendance: "Present" },
    { id: 2, name: "Seneca Minor", role: "Manager", email: "seneca@dineflow.com", status: "active", shift: "Full-time (09:00 AM - 06:00 PM)", attendance: "Present" },
    { id: 3, name: "Cicero Tully", role: "Cashier", email: "cicero@dineflow.com", status: "active", shift: "Evening (04:00 PM - 12:00 AM)", attendance: "Late" },
    { id: 4, name: "Augustus Caesar", role: "Waiter", email: "augustus@dineflow.com", status: "active", shift: "Morning (08:00 AM - 04:00 PM)", attendance: "Absent" },
    { id: 5, name: "Gordon Ramsay", role: "Chef", email: "gordon@dineflow.com", status: "active", shift: "Evening (04:00 PM - 12:00 AM)", attendance: "Present" }
];

let staffList = JSON.parse(localStorage.getItem('dineflow_staff')) || DEFAULT_STAFF;

document.addEventListener('DOMContentLoaded', () => {
    renderStaff();
    setupStaffFilters();
    setupStaffModal();
    setupStaffForm();
});

const renderStaff = (filterRole = 'all') => {
    const grid = document.getElementById('staffGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filterRole === 'all' 
        ? staffList 
        : staffList.filter(s => s.role.toLowerCase() === filterRole.toLowerCase());

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: span 12; text-align: center; color: var(--text-muted); padding: 2rem;">No staff found.</div>`;
        return;
    }

    filtered.forEach(s => {
        const initials = s.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        
        let attendanceBadge = '';
        if (s.attendance === 'Present') attendanceBadge = 'badge-success';
        else if (s.attendance === 'Late') attendanceBadge = 'badge-warning';
        else attendanceBadge = 'badge-danger';

        const card = document.createElement('div');
        card.className = 'card glass staff-card';
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:1rem;">
                <div class="staff-avatar">${initials}</div>
                <div>
                    <h3 style="font-size:1.1rem; font-weight:600; margin:0;">${s.name}</h3>
                    <span class="badge badge-info" style="margin-top:0.25rem;">${s.role}</span>
                </div>
            </div>
            <hr style="border:none; border-top:1px solid var(--border); margin:0.5rem 0;">
            <div>
                <div class="staff-meta-row">
                    <span style="color:var(--text-muted);">Email:</span>
                    <strong>${s.email}</strong>
                </div>
                <div class="staff-meta-row">
                    <span style="color:var(--text-muted);">Shift:</span>
                    <strong style="text-align:right; font-size:0.8rem;">${s.shift}</strong>
                </div>
                <div class="staff-meta-row" style="margin-top:0.5rem; align-items:center;">
                    <span style="color:var(--text-muted);">Attendance:</span>
                    <span class="badge ${attendanceBadge}">${s.attendance}</span>
                </div>
            </div>
            <div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                <button class="btn btn-secondary btn-block btn-xs" onclick="toggleAttendance(${s.id})" style="padding:0.4rem;">Toggle Attendance</button>
                <button class="icon-btn text-danger" onclick="deleteStaff(${s.id})" style="border:none; width:34px; height:34px;"><i data-lucide="trash-2"></i></button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const setupStaffFilters = () => {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const role = e.currentTarget.getAttribute('data-role');
            renderStaff(role);
        });
    });
};

const setupStaffModal = () => {
    const openBtn = document.getElementById('addStaffBtn');
    const closeBtn = document.getElementById('closeStaffModalBtn');
    const modal = document.getElementById('addStaffModal');

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

const setupStaffForm = () => {
    const form = document.getElementById('addStaffForm');
    const modal = document.getElementById('addStaffModal');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('staffName').value;
        const email = document.getElementById('staffEmail').value;
        const role = document.getElementById('staffRole').value;
        const shift = document.getElementById('staffShift').value;

        const newStaff = {
            id: Date.now(),
            name,
            email,
            role,
            shift,
            status: "active",
            attendance: "Present"
        };

        staffList.push(newStaff);
        localStorage.setItem('dineflow_staff', JSON.stringify(staffList));
        
        form.reset();
        modal.classList.remove('active');
        renderStaff();
    });
};

window.toggleAttendance = (id) => {
    staffList = staffList.map(s => {
        if (s.id === id) {
            if (s.attendance === 'Present') s.attendance = 'Late';
            else if (s.attendance === 'Late') s.attendance = 'Absent';
            else s.attendance = 'Present';
        }
        return s;
    });
    localStorage.setItem('dineflow_staff', JSON.stringify(staffList));
    const activeFilter = document.querySelector('.filter-btn.active');
    renderStaff(activeFilter ? activeFilter.getAttribute('data-role') : 'all');
};

window.deleteStaff = (id) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
        staffList = staffList.filter(s => s.id !== id);
        localStorage.setItem('dineflow_staff', JSON.stringify(staffList));
        const activeFilter = document.querySelector('.filter-btn.active');
        renderStaff(activeFilter ? activeFilter.getAttribute('data-role') : 'all');
    }
};
