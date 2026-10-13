/**
 * email-marketing.js
 * Logic for the Email Marketing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('emailTableBody');

  const emails = [
    { name: 'October Newsletter v1', status: 'Draft', sent: '-', open: '-', click: '-' },
    { name: 'SaaS Welcome Series - Day 1', status: 'Active', sent: '12,450', open: '68.4%', click: '12.5%' },
    { name: 'SaaS Welcome Series - Day 3', status: 'Active', sent: '11,200', open: '45.2%', click: '8.1%' },
    { name: 'Q3 Product Update Release', status: 'Sent', sent: '45,210', open: '38.5%', click: '5.2%' },
    { name: 'Abandoned Cart Recovery', status: 'Active', sent: '890', open: '52.1%', click: '18.4%' },
    { name: 'Black Friday Early Access', status: 'Draft', sent: '-', open: '-', click: '-' },
  ];

  const renderTable = () => {
    if (!tableBody) return;

    tableBody.innerHTML = '';

    emails.forEach((email, index) => {
      
      let badgeClass = 'badge-secondary';
      if (email.status === 'Active') badgeClass = 'badge-success';
      if (email.status === 'Sent') badgeClass = 'badge-primary';

      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.05}s`;
      row.className = 'animate-fade-in-up';
      
      row.innerHTML = `
        <td class="font-medium text-primary">${email.name}</td>
        <td><span class="badge ${badgeClass}">${email.status}</span></td>
        <td>${email.sent}</td>
        <td class="font-semibold">${email.open}</td>
        <td class="font-semibold text-primary">${email.click}</td>
      `;

      tableBody.appendChild(row);
    });

    if (window.lucide) lucide.createIcons();
  };

  renderTable();
});
