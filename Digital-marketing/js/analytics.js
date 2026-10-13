/**
 * analytics.js
 * Logic and Chart initialization for the Analytics Page
 */

document.addEventListener('DOMContentLoaded', () => {
  // CSS Variables for Colors
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--primary').trim();
  const secondaryColor = style.getPropertyValue('--secondary').trim();
  const accentColor = style.getPropertyValue('--accent').trim();
  const successColor = style.getPropertyValue('--success').trim();
  const warningColor = style.getPropertyValue('--warning').trim();

  // 1. Traffic Growth Chart (Line)
  const trafficChartCtx = document.getElementById('trafficChart');
  if (trafficChartCtx && window.createLineChart) {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Actual Data (Jan-Oct)
    const actualData = [45, 52, 48, 61, 59, 75, 82, 85, 95, 124, null, null];
    // Forecast Data (Oct-Dec)
    const forecastData = [null, null, null, null, null, null, null, null, null, 124, 145, 160];

    const trafficData = {
      labels: labels,
      datasets: [
        {
          label: 'Actual Traffic',
          data: actualData,
          borderColor: primaryColor,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: primaryColor,
          pointBorderColor: '#fff',
          pointRadius: 4,
        },
        {
          label: 'Forecast (AI)',
          data: forecastData,
          borderColor: secondaryColor,
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4,
          fill: false,
          pointBackgroundColor: secondaryColor,
          pointBorderColor: '#fff',
          pointRadius: 4,
        }
      ]
    };

    const trafficOptions = {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y + 'K';
            }
          }
        }
      },
      scales: {
        y: {
          ticks: {
            callback: function(value) { return value + 'K'; }
          }
        }
      }
    };

    window.trafficChartInstance = createLineChart('trafficChart', trafficData, trafficOptions);
  }

  // 2. Traffic Sources (Doughnut)
  const sourcesChartCtx = document.getElementById('sourcesChart');
  if (sourcesChartCtx && window.createDoughnutChart) {
    const sourcesData = {
      labels: ['Organic Search', 'Paid Search', 'Social Media', 'Email', 'Direct'],
      datasets: [
        {
          data: [40, 25, 15, 12, 8],
          backgroundColor: [
            primaryColor,
            accentColor,
            secondaryColor,
            warningColor,
            successColor
          ],
          borderWidth: 0,
          hoverOffset: 4
        }
      ]
    };

    const sourcesOptions = {
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, usePointStyle: true }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    };

    window.sourcesChartInstance = createDoughnutChart('sourcesChart', sourcesData, sourcesOptions);
  }

  // 3. Lead Generation Growth (Area Chart)
  const leadsChartCtx = document.getElementById('leadsChart');
  if (leadsChartCtx && window.createLineChart) {
    const ctx = leadsChartCtx.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.5)'); // accent color
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    const leadsData = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
      datasets: [
        {
          label: 'Leads',
          data: [120, 150, 140, 190, 220, 210, 280, 310],
          borderColor: accentColor,
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6
        }
      ]
    };

    const leadsOptions = {
      plugins: { legend: { display: false } }
    };

    window.leadsChartInstance = createLineChart('leadsChart', leadsData, leadsOptions);
  }

  // Theme change listener
  window.addEventListener('themeChanged', () => {
    if (window.trafficChartInstance) window.trafficChartInstance.update();
    if (window.sourcesChartInstance) window.sourcesChartInstance.update();
    if (window.leadsChartInstance) window.leadsChartInstance.update();
  });

});
