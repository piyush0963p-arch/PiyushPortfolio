// Analytics and Reports Javascript

document.addEventListener('DOMContentLoaded', () => {
    initAnalyticsCharts();
    setupExportHandlers();
});

const initAnalyticsCharts = () => {
    const trendCtx = document.getElementById('salesTrendChart');
    const peakCtx = document.getElementById('peakHoursChart');
    const catCtx = document.getElementById('categoryBreakdownChart');

    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                datasets: [
                    {
                        label: 'Current Month ($)',
                        data: [12000, 15000, 18200, 16100, 21000],
                        borderColor: '#FF6B35',
                        backgroundColor: 'rgba(255,107,53,0.05)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Previous Month ($)',
                        data: [10000, 13200, 14000, 15500, 18000],
                        borderColor: '#94A3B8',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    if (peakCtx) {
        new Chart(peakCtx, {
            type: 'bar',
            data: {
                labels: ['11 AM', '12 PM', '1 PM', '2 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'],
                datasets: [{
                    label: 'Customers Headcount',
                    data: [15, 45, 60, 25, 20, 50, 85, 95, 75, 40],
                    backgroundColor: '#FFB703',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    if (catCtx) {
        new Chart(catCtx, {
            type: 'doughnut',
            data: {
                labels: ['Starters', 'Mains', 'Desserts', 'Beverages'],
                datasets: [{
                    data: [15, 55, 12, 18],
                    backgroundColor: ['#3B82F6', '#FF6B35', '#A855F7', '#22C55E'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%'
            }
        });
    }
};

const setupExportHandlers = () => {
    document.querySelectorAll('.btn-export').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const format = e.currentTarget.getAttribute('data-format');
            alert(`Generating report export in ${format.toUpperCase()} format...\nYour download will begin shortly.`);
        });
    });
};
