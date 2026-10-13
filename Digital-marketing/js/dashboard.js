/**
 * dashboard.js
 * Logic specific to the Dashboard page
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Chart Setup ---
  
  // CSS Variables for Colors
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--primary').trim();
  const secondaryColor = style.getPropertyValue('--secondary').trim();
  const accentColor = style.getPropertyValue('--accent').trim();
  const successColor = style.getPropertyValue('--success').trim();

  // 1. Revenue vs Spend Chart (Line)
  const revenueChartCtx = document.getElementById('revenueChart');
  if (revenueChartCtx && window.createLineChart) {
    
    // Gradient for Revenue Area
    const ctx = revenueChartCtx.getContext('2d');
    const revenueGradient = ctx.createLinearGradient(0, 0, 0, 320);
    revenueGradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)'); // Success light
    revenueGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    const revenueData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12500, 15000, 14200, 18000, 22000, 28000, 26500],
          borderColor: successColor,
          backgroundColor: revenueGradient,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderColor: successColor,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Marketing Spend',
          data: [4200, 4800, 4500, 5100, 6000, 7500, 7000],
          borderColor: primaryColor,
          borderWidth: 2,
          tension: 0.4,
          borderDash: [5, 5],
          pointBackgroundColor: '#fff',
          pointBorderColor: primaryColor,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };

    const revenueChartOptions = {
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        }
      }
    };

    window.revenueChartInstance = createLineChart('revenueChart', revenueData, revenueChartOptions);
  }

  // 2. Campaign Performance Chart (Bar)
  const campaignBarCtx = document.getElementById('campaignBarChart');
  if (campaignBarCtx && window.createBarChart) {
    const campaignData = {
      labels: ['Google Ads', 'Facebook', 'LinkedIn', 'Email', 'Twitter', 'SEO'],
      datasets: [
        {
          label: 'Conversions',
          data: [450, 320, 150, 580, 90, 210],
          backgroundColor: primaryColor,
          borderRadius: 4,
          barPercentage: 0.6
        }
      ]
    };

    window.campaignBarInstance = createBarChart('campaignBarChart', campaignData);
  }

  // --- Theme Toggle Listener for Charts ---
  // Ensure chart gradients/colors update if needed when theme changes
  window.addEventListener('themeChanged', () => {
    if (window.revenueChartInstance) {
      // Re-fetch variables in case they changed structurally (they don't in this implementation, but good practice)
      window.revenueChartInstance.update();
    }
    if (window.campaignBarInstance) {
      window.campaignBarInstance.update();
    }
  });

  // --- Tab Interactivity ---
  const tabs = document.querySelectorAll('.card-header .tab-item');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from siblings
      const parent = tab.parentElement;
      parent.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
      // Add active to clicked
      tab.classList.add('active');
      
      // Simulate data reload
      if (window.revenueChartInstance) {
        const newData = [
          Math.floor(Math.random() * 10000) + 10000,
          Math.floor(Math.random() * 10000) + 15000,
          Math.floor(Math.random() * 10000) + 12000,
          Math.floor(Math.random() * 10000) + 18000,
          Math.floor(Math.random() * 10000) + 20000,
          Math.floor(Math.random() * 10000) + 25000,
          Math.floor(Math.random() * 10000) + 22000
        ];
        window.revenueChartInstance.data.datasets[0].data = newData;
        window.revenueChartInstance.update();
      }
    });
  });

});
