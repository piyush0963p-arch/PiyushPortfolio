/**
 * team.js
 * Logic for the Team Management Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('teamTableBody');

  const team = [
    { name: 'John Doe', email: 'john@nexusai.com', avatar: 'JD', role: 'Admin', dept: 'Management', lastActive: '2 mins ago', status: 'Active' },
    { name: 'Sarah Jenkins', email: 'sarah@nexusai.com', avatar: 'SJ', role: 'Editor', dept: 'Marketing', lastActive: '1 hr ago', status: 'Active' },
    { name: 'Michael Chen', email: 'mchen@nexusai.com', avatar: 'MC', role: 'Editor', dept: 'Marketing', lastActive: '3 hrs ago', status: 'Active' },
    { name: 'Emily Rodriguez', email: 'emily@nexusai.com', avatar: 'ER', role: 'Viewer', dept: 'Sales', lastActive: 'Yesterday', status: 'Active' },
    { name: 'David Smith', email: 'dsmith@nexusai.com', avatar: 'DS', role: 'Admin', dept: 'Design', lastActive: '5 mins ago', status: 'Active' },
    { name: 'Jessica Taylor', email: 'jtaylor@nexusai.com', avatar: 'JT', role: 'Editor', dept: 'Marketing', lastActive: '-', status: 'Pending' }
  ];

  const renderTable = () => {
    if (!tableBody) return;

    tableBody.innerHTML = '';

    team.forEach((user, index) => {
      
      let statusClass = 'badge-success';
      if (user.status === 'Pending') statusClass = 'badge-warning';

      let roleClass = 'viewer';
      if (user.role === 'Admin') roleClass = 'admin';
      if (user.role === 'Editor') roleClass = 'editor';

      const row = document.createElement('tr');
      row.style.animationDelay = `${index * 0.05}s`;
      row.className = 'animate-fade-in-up';
      
      row.innerHTML = `
        <td>
          <div class="team-user-cell">
            <div class="avatar avatar-sm bg-primary text-white">${user.avatar}</div>
            <div class="team-user-details">
              <span class="team-user-name">${user.name}</span>
              <span class="team-user-email">${user.email}</span>
            </div>
          </div>
        </td>
        <td><span class="role-badge ${roleClass}">${user.role}</span></td>
        <td>${user.dept}</td>
        <td class="text-secondary text-sm">${user.lastActive}</td>
        <td><span class="badge ${statusClass}">${user.status}</span></td>
        <td>
          <button class="btn btn-sm btn-ghost btn-icon text-tertiary hover:text-primary">
            <i data-lucide="more-vertical"></i>
          </button>
        </td>
      `;

      tableBody.appendChild(row);
    });

    if (window.lucide) lucide.createIcons();
  };

  renderTable();
});
