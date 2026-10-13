/**
 * funnel.js
 * Logic for rendering the animated CSS funnel
 */

document.addEventListener('DOMContentLoaded', () => {
  const funnelVisual = document.getElementById('funnelVisual');
  const stageMetricsList = document.getElementById('stageMetricsList');

  // Dummy Funnel Data
  const funnelStages = [
    { id: 'awareness', name: 'Awareness', users: 125000, color: '#6366F1' },
    { id: 'interest', name: 'Interest', users: 85000, color: '#5A5EE6' },
    { id: 'consideration', name: 'Consideration', users: 52000, color: '#5156DB' },
    { id: 'intent', name: 'Intent', users: 30160, color: '#484ED0' },
    { id: 'evaluation', name: 'Evaluation', users: 18500, color: '#3F46C5' },
    { id: 'purchase', name: 'Purchase', users: 8900, color: '#363EBA' }
  ];

  const formatNumber = (num) => new Intl.NumberFormat('en-US').format(num);

  const renderFunnel = () => {
    if (!funnelVisual || !stageMetricsList) return;

    funnelVisual.innerHTML = '';
    stageMetricsList.innerHTML = '';

    const maxUsers = funnelStages[0].users;

    funnelStages.forEach((stage, index) => {
      // Calculate width percentage relative to max users (Awareness)
      // Minimum width 20% so the bottom stage doesn't disappear
      const widthPct = Math.max((stage.users / maxUsers) * 100, 20);
      
      // Calculate drop-off from previous stage
      let dropoffPct = 0;
      let conversionFromTop = ((stage.users / maxUsers) * 100).toFixed(1);

      if (index > 0) {
        const prevUsers = funnelStages[index - 1].users;
        dropoffPct = (((prevUsers - stage.users) / prevUsers) * 100).toFixed(1);
      }

      // --- Render Visual Stage ---
      const stageEl = document.createElement('div');
      stageEl.className = 'funnel-stage';
      // Start at 0 width for animation
      stageEl.style.width = '0%';
      
      stageEl.innerHTML = `
        <div class="funnel-stage-name">${stage.name}</div>
        <div class="funnel-stage-metrics">
          <span class="funnel-stage-users">${formatNumber(stage.users)}</span>
          <span class="funnel-stage-rate">${conversionFromTop}%</span>
        </div>
      `;

      funnelVisual.appendChild(stageEl);

      // Trigger animation after slight delay
      setTimeout(() => {
        stageEl.style.width = `${widthPct}%`;
      }, 100 + (index * 150));

      // --- Render Sidebar Metric ---
      let dropoffHTML = '';
      if (index > 0) {
        dropoffHTML = `
          <div class="smi-dropoff">
            <div class="smi-dropoff-label">Drop-off</div>
            <div class="smi-dropoff-value">-${dropoffPct}%</div>
          </div>
        `;
      } else {
        dropoffHTML = `
          <div class="smi-dropoff">
            <div class="smi-dropoff-label">Traffic</div>
            <div class="smi-dropoff-value text-success">100%</div>
          </div>
        `;
      }

      const metricEl = document.createElement('div');
      metricEl.className = 'stage-metric-item';
      metricEl.innerHTML = `
        <div>
          <div class="smi-header">
            <div class="smi-dot" style="background-color: ${stage.color}"></div>
            <span class="smi-name">${stage.name}</span>
          </div>
          <div class="smi-value">${formatNumber(stage.users)} Users</div>
        </div>
        ${dropoffHTML}
      `;
      
      stageMetricsList.appendChild(metricEl);
    });

  };

  renderFunnel();
});
