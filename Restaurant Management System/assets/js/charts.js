// Chart Configurations

// Chart defaults for dark/light mode compatibility
Chart.defaults.color = '#94A3B8';
Chart.defaults.font.family = "'Inter', sans-serif";

const getChartColors = () => {
    return {
        primary: '#FF6B35',
        secondary: '#FFB703',
        accent: '#22C55E',
        grid: document.documentElement.getAttribute('data-theme') === 'dark' ? '#334155' : '#E2E8F0'
    };
};

const renderRevenueChart = (ctx) => {
    if (!ctx) return;
    
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [4200, 3800, 5100, 4800, 6200, 8500, 7100],
                borderColor: colors.primary,
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: colors.primary,
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#334155',
                    borderWidth: 1,
                    padding: 10
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.grid,
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
};

const renderOrdersChart = (ctx) => {
    if (!ctx) return;
    
    const colors = getChartColors();
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Dine-in', 'Takeaway', 'Delivery'],
            datasets: [{
                data: [55, 25, 20],
                backgroundColor: [
                    colors.primary,
                    colors.secondary,
                    colors.accent
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });
};
