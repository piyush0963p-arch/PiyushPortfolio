document.addEventListener('DOMContentLoaded', () => {
    // Initialize Charts
    const revenueCtx = document.getElementById('revenueChart');
    const ordersCtx = document.getElementById('ordersChart');
    
    if (typeof renderRevenueChart === 'function') {
        renderRevenueChart(revenueCtx);
    }
    
    if (typeof renderOrdersChart === 'function') {
        renderOrdersChart(ordersCtx);
    }
    
    // Handle theme change for charts
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Give a slight delay for DOM to update theme attributes
            setTimeout(() => {
                // Destroy existing charts
                const revenueChart = Chart.getChart(revenueCtx);
                if (revenueChart) revenueChart.destroy();
                
                const ordersChart = Chart.getChart(ordersCtx);
                if (ordersChart) ordersChart.destroy();
                
                // Re-render
                renderRevenueChart(revenueCtx);
                renderOrdersChart(ordersCtx);
            }, 10);
        });
    });
});
