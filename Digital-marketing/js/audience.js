/**
 * audience.js
 * Logic for the Audience Manager Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('audienceTableBody');

  const users = [
    { name: 'Sarah Jenkins', email: 'sarah.j@example.com', avatar: 'SJ', segment: 'High Value Customers', score: 92, stage: 'Retention' },
    { name: 'Michael Chen', email: 'mchen@techcorp.io', avatar: 'MC', segment: 'Active Newsletter', score: 65, stage: 'Consideration' },
    { name: 'Emily Rodriguez', email: 'emily.r@designco.com', avatar: 'ER', segment: 'Recent Abandoners', score: 45, stage: 'Intent' },
    { name: 'David Smith', email: 'dsmith@globalinc.com', avatar: 'DS', segment: 'High Value Customers', score: 88, stage: 'Purchase' },
    { name: 'Jessica Taylor', email: 'jtaylor@startup.co', avatar: 'JT', segment: 'At Risk (Churn)', score: 15, stage: 'Retention' },
    { name: 'James Wilson', email: 'jwilson@retailer.net', avatar: 'JW', segment: 'Active Newsletter', score: 72, stage: 'Awareness' },
    { name: 'Amanda Brown', email: 'abrown@services.org', avatar: 'AB', segment: 'High Value Customers', score: 95, stage: 'Retention' },
    { name: 'Robert Davis', email: 'rdavis@finance.com', avatar: 'RD', segment: 'At Risk (Churn)', score: 25, stage: 'Awareness' },
  ];

  const renderTable = () => {
    if (!tableBody) return;

    tableBody.innerHTML = '';

    users.forEach((user, index) => {
      
      // Determine segment badge color
      let badgeClass = 'badge-secondary';
      if (user.segment.includes('High Value')) badgeClass = 'badge-primary';
      if (user.segment.includes('Newsletter')) badgeClass = 'badge-success';
      if (user.segment.includes('Abandoners')) badgeClass = 'badge-warning';
      if (user.segment.includes('Risk')) badgeClass = 'badge-danger';

      // Determine score color
      let scoreClass = 'high';
      if (user.score < 70) scoreClass = 'medium';
      if (user.score < 40) scoreClass = 'low';

      // Determine journey stage badge color
      let stageClass = 'badge-secondary';
      if (user.stage === 'Purchase' || user.stage === 'Retention') stageClass = 'badge-success';
      if (user.stage === 'Intent') stageClass = 'badge-primary';
      if (user.stage === 'Consideration') stageClass = 'badge-info';

      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.05}s`;
      row.className = 'animate-fade-in-up';
      
      row.innerHTML = `
        <td><input type="checkbox" class="accent-primary"></td>
        <td>
          <div class="user-profile-cell">
            <div class="avatar avatar-sm bg-secondary text-primary">${user.avatar}</div>
            <div class="user-details">
              <span class="user-name">${user.name}</span>
              <span class="user-email">${user.email}</span>
            </div>
          </div>
        </td>
        <td><span class="badge ${badgeClass}">${user.segment}</span></td>
        <td>
          <div class="engagement-score-wrap">
            <div class="engagement-bar-bg">
              <div class="engagement-bar-fill ${scoreClass}" style="width: ${user.score}%"></div>
            </div>
            <span class="engagement-number text-${scoreClass}">${user.score}</span>
          </div>
        </td>
        <td><span class="badge ${stageClass}">${user.stage}</span></td>
        <td>
          <button class="btn btn-sm btn-ghost btn-icon text-tertiary hover:text-primary">
            <i data-lucide="more-horizontal"></i>
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    if (window.lucide) lucide.createIcons();
  };

  renderTable();
});
