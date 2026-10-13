/**
 * content-studio.js
 * Logic for the Content Studio / Asset Management Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const contentGrid = document.getElementById('contentGrid');
  const tabs = document.querySelectorAll('#contentTabs .tab-item');
  const searchInput = document.getElementById('contentSearch');

  // Dummy Content Data
  const contentItems = [
    { id: 1, type: 'blog', title: '10 Ways AI is Revolutionizing Marketing in 2026', status: 'published', score: 92, date: 'Oct 12, 2026', icon: 'file-text' },
    { id: 2, type: 'social', title: 'Product UI Sneak Peek Carousel', status: 'scheduled', score: null, date: 'Oct 14, 2026', icon: 'instagram' },
    { id: 3, type: 'creative', title: 'Summer Sale Hero Banner v2', status: 'approved', score: 85, date: 'Sep 28, 2026', icon: 'image' },
    { id: 4, type: 'email', title: 'Welcome Series: Email 1 (Onboarding)', status: 'published', score: 78, date: 'Aug 15, 2026', icon: 'mail' },
    { id: 5, type: 'blog', title: 'The Ultimate Guide to B2B Lead Generation', status: 'draft', score: null, date: 'Last edited 2h ago', icon: 'file-text' },
    { id: 6, type: 'creative', title: 'LinkedIn Sponsored Ad - Analytics Dashboard', status: 'approved', score: 95, date: 'Oct 05, 2026', icon: 'image' },
    { id: 7, type: 'social', title: 'Customer Success Story: Acme Corp Quote', status: 'published', score: 64, date: 'Oct 01, 2026', icon: 'linkedin' },
    { id: 8, type: 'email', title: 'Q3 Product Update Newsletter', status: 'draft', score: null, date: 'Last edited yesterday', icon: 'mail' }
  ];

  const renderContent = (filter = 'all', searchQuery = '') => {
    if (!contentGrid) return;
    
    contentGrid.innerHTML = '';
    
    const filtered = contentItems.filter(item => {
      const matchFilter = filter === 'all' || item.type === filter;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      contentGrid.innerHTML = `
        <div class="empty-state w-full col-span-full">
          <div class="empty-state-icon"><i data-lucide="image-off"></i></div>
          <h3 class="empty-state-title">No content found</h3>
          <p class="empty-state-text">No assets match your current filters or search query.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach((item, index) => {
      // Status Badge
      let badgeClass = 'badge-secondary';
      if (item.status === 'published') badgeClass = 'badge-success';
      if (item.status === 'scheduled') badgeClass = 'badge-warning';
      if (item.status === 'approved') badgeClass = 'badge-primary';

      // Score Bar
      let scoreHTML = '';
      if (item.score !== null) {
        let scoreClass = 'high';
        if (item.score < 80) scoreClass = 'medium';
        if (item.score < 60) scoreClass = 'low';
        
        scoreHTML = `
          <div class="flex items-center gap-2" title="Performance Score: ${item.score}">
            <i data-lucide="trending-up" style="width:12px;height:12px"></i>
            <div class="content-score-bar">
              <div class="content-score-fill ${scoreClass}" style="width: ${item.score}%"></div>
            </div>
          </div>
        `;
      }

      const cardHTML = `
        <div class="card content-card" style="animation-delay: ${index * 0.05}s">
          <div class="content-thumbnail placeholder">
            <i data-lucide="${item.icon}"></i>
            <div class="content-type-badge">
              <i data-lucide="${item.icon}"></i> ${item.type}
            </div>
            <div class="content-actions-overlay">
              <button class="btn btn-sm btn-primary btn-icon rounded-full"><i data-lucide="eye"></i></button>
              <button class="btn btn-sm btn-secondary btn-icon rounded-full"><i data-lucide="edit-2"></i></button>
            </div>
          </div>
          <div class="card-body">
            <h3 class="content-title" title="${item.title}">${item.title}</h3>
            <div class="mb-3">
              <span class="badge ${badgeClass} capitalize">${item.status}</span>
            </div>
            <div class="content-meta">
              <span>${item.date}</span>
              ${scoreHTML}
            </div>
          </div>
        </div>
      `;
      contentGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    if (window.lucide) lucide.createIcons();
  };

  // Tab Filtering
  if (tabs) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const query = searchInput ? searchInput.value : '';
        renderContent(tab.dataset.filter, query);
      });
    });
  }

  // Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeTab = document.querySelector('#contentTabs .tab-item.active');
      const filter = activeTab ? activeTab.dataset.filter : 'all';
      renderContent(filter, e.target.value);
    });
  }

  renderContent();
});
