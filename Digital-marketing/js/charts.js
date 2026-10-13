/**
 * charts.js
 * Chart.js configuration and helper functions for NexusAI Platform
 */

// Global Chart configuration
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
Chart.defaults.scale.grid.color = getComputedStyle(document.documentElement).getPropertyValue('--border-light').trim();
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.9)';
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.titleFont = { size: 13, weight: 'bold', family: "'Inter', sans-serif" };
Chart.defaults.plugins.tooltip.bodyFont = { size: 12, family: "'Inter', sans-serif" };

// Theme aware updating
window.addEventListener('themeChanged', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  
  Chart.defaults.color = isDark ? '#94A3B8' : '#475569';
  Chart.defaults.scale.grid.color = isDark ? '#1E293B' : '#E2E8F0';
  Chart.defaults.plugins.tooltip.backgroundColor = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(15, 23, 42, 0.9)';

  // Update all instances
  for (let id in Chart.instances) {
    Chart.instances[id].update();
  }
});

/**
 * Creates a Line Chart
 * @param {string} ctxId - Canvas element ID
 * @param {Object} data - Chart.js data object
 * @param {Object} options - Custom Chart.js options
 * @returns {Chart} Chart instance
 */
window.createLineChart = (ctxId, data, options = {}) => {
  const ctx = document.getElementById(ctxId);
  if (!ctx) return null;

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 20
        }
      }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        border: { display: false }
      }
    }
  };

  return new Chart(ctx, {
    type: 'line',
    data: data,
    options: Object.assign({}, defaultOptions, options)
  });
};

/**
 * Creates a Bar Chart
 */
window.createBarChart = (ctxId, data, options = {}) => {
  const ctx = document.getElementById(ctxId);
  if (!ctx) return null;

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { 
        beginAtZero: true,
        border: { display: false }
      }
    }
  };

  return new Chart(ctx, {
    type: 'bar',
    data: data,
    options: Object.assign({}, defaultOptions, options)
  });
};

/**
 * Creates a Doughnut Chart
 */
window.createDoughnutChart = (ctxId, data, options = {}) => {
  const ctx = document.getElementById(ctxId);
  if (!ctx) return null;

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  return new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: Object.assign({}, defaultOptions, options)
  });
};
