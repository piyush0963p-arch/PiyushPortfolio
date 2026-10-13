/**
 * seo-center.js
 * Logic for the SEO Center Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('keywordTableBody');

  // Trigger Score Gauge Animation
  setTimeout(() => {
    const scorePath = document.querySelector('.score-path');
    if (scorePath) {
      scorePath.style.strokeDasharray = '88, 100'; // 88%
    }
  }, 500);

  // Dummy Keyword Data
  const keywords = [
    { keyword: 'AI marketing platform', position: 1, change: 0, volume: '12.5K', kd: 65, traffic: 32 },
    { keyword: 'b2b marketing analytics', position: 3, change: 2, volume: '8.2K', kd: 58, traffic: 18 },
    { keyword: 'predictive lead scoring', position: 4, change: -1, volume: '5.4K', kd: 72, traffic: 12 },
    { keyword: 'automated ad generation', position: 2, change: 4, volume: '6.8K', kd: 45, traffic: 15 },
    { keyword: 'social media AI planner', position: 8, change: 3, volume: '14.1K', kd: 82, traffic: 8 },
    { keyword: 'marketing roi calculator', position: 12, change: -2, volume: '9.5K', kd: 55, traffic: 4 },
  ];

  const renderTable = () => {
    if (!tableBody) return;

    tableBody.innerHTML = '';

    keywords.forEach((kw, index) => {
      
      let changeHTML = '';
      if (kw.change > 0) {
        changeHTML = `<span class="keyword-rank-change up"><i data-lucide="arrow-up" style="width:12px;height:12px"></i> ${kw.change}</span>`;
      } else if (kw.change < 0) {
        changeHTML = `<span class="keyword-rank-change down"><i data-lucide="arrow-down" style="width:12px;height:12px"></i> ${Math.abs(kw.change)}</span>`;
      } else {
        changeHTML = `<span class="keyword-rank-change neutral">-</span>`;
      }

      // Keyword difficulty bar
      let kdClass = 'bg-success';
      if (kw.kd > 60) kdClass = 'bg-warning';
      if (kw.kd > 80) kdClass = 'bg-danger';

      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.05}s`;
      row.className = 'animate-fade-in-up';
      
      row.innerHTML = `
        <td class="font-medium text-primary">${kw.keyword}</td>
        <td>
          <div class="keyword-rank">
            <span>${kw.position}</span>
            ${changeHTML}
          </div>
        </td>
        <td>${kw.volume}</td>
        <td>
          <div class="flex items-center gap-2 w-full max-w-[100px]">
            <span class="text-xs w-6">${kw.kd}</span>
            <div class="h-1.5 flex-1 bg-tertiary rounded-full overflow-hidden">
              <div class="h-full ${kdClass} rounded-full" style="width: ${kw.kd}%"></div>
            </div>
          </div>
        </td>
        <td>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold">${kw.traffic}%</span>
          </div>
        </td>
      `;

      tableBody.appendChild(row);
    });

    if (window.lucide) lucide.createIcons();
  };

  renderTable();
});
