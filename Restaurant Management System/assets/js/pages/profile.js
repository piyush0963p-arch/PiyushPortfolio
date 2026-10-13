// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    setupProfileForm();
});

const loadUserProfile = () => {
    const profile = JSON.parse(localStorage.getItem('dineflow_profile')) || {
        name: "Admin User",
        email: "admin@dineflow.com",
        phone: "+1 555-0199"
    };

    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const avatar = document.getElementById('profileAvatarBig');

    if (nameInput) nameInput.value = profile.name;
    if (emailInput) emailInput.value = profile.email;
    if (phoneInput) phoneInput.value = profile.phone;

    if (avatar && profile.name) {
        const initials = profile.name.split(' ').map(n => n[0]).join('').substring(0, 2);
        avatar.textContent = initials.toUpperCase();
    }
};

const setupProfileForm = () => {
    const form = document.getElementById('profileForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const profile = {
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            phone: document.getElementById('profilePhone').value
        };

        localStorage.setItem('dineflow_profile', JSON.stringify(profile));
        
        // Update avatar display
        const avatar = document.getElementById('profileAvatarBig');
        if (avatar) {
            const initials = profile.name.split(' ').map(n => n[0]).join('').substring(0, 2);
            avatar.textContent = initials.toUpperCase();
        }

        alert('Profile saved successfully!');
    });
};
