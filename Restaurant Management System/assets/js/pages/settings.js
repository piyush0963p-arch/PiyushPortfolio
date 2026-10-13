// Settings Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupSettingsForm();
});

const loadSettings = () => {
    const config = JSON.parse(localStorage.getItem('dineflow_settings')) || {
        name: "The Golden Fork",
        email: "owner@thegoldenfork.com",
        currency: "USD ($)",
        notify: true,
        autoPrint: false,
        autoRestock: true
    };

    const nameInput = document.getElementById('settingRestaurantName');
    const emailInput = document.getElementById('settingEmail');
    const currencySelect = document.getElementById('settingCurrency');
    const notifySwitch = document.getElementById('settingNotify');
    const printSwitch = document.getElementById('settingPrint');
    const restockSwitch = document.getElementById('settingRestock');

    if (nameInput) nameInput.value = config.name;
    if (emailInput) emailInput.value = config.email;
    if (currencySelect) currencySelect.value = config.currency;
    if (notifySwitch) notifySwitch.checked = config.notify;
    if (printSwitch) printSwitch.checked = config.autoPrint;
    if (restockSwitch) restockSwitch.checked = config.autoRestock;
};

const setupSettingsForm = () => {
    const form = document.getElementById('settingsForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const config = {
            name: document.getElementById('settingRestaurantName').value,
            email: document.getElementById('settingEmail').value,
            currency: document.getElementById('settingCurrency').value,
            notify: document.getElementById('settingNotify').checked,
            autoPrint: document.getElementById('settingPrint').checked,
            autoRestock: document.getElementById('settingRestock').checked
        };

        localStorage.setItem('dineflow_settings', JSON.stringify(config));
        alert('Global configuration saved successfully!');
    });
};
