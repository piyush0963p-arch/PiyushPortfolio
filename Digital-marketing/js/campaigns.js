/**
 * campaigns.js
 * Logic for Campaign Management Page
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('campaignContainer');
  const viewToggleBtn = document.getElementById('viewToggleBtn');
  const filterChips = document.querySelectorAll('#campaignFilters .chip');

  // Dummy Campaign Data
  const campaigns = [
    { id: 1, name: 'Q3 B2B Lead Gen', platform: 'linkedin', budget: 15000, reach: '125K', clicks: 4200, conversions: 350, roi: '+120%', status: 'active', progress: 65, date: 'Oct 1 - Dec 31' },
    { id: 2, name: 'Summer Retargeting', platform: 'facebook', budget: 8000, reach: '340K', clicks: 12500, conversions: 890, roi: '+210%', status: 'active', progress: 80, date: 'Sep 15 - Oct 31' },
    { id: 3, name: 'Search Brand Exact', platform: 'google', budget: 25000, reach: '80K', clicks: 9500, conversions: 1200, roi: '+340%', status: 'active', progress: 45, date: 'Ongoing' },
    { id: 4, name: 'Welcome Series V2', platform: 'email', budget: 500, reach: '45K', clicks: 8200, conversions: 410, roi: '+850%', status: 'active', progress: 90, date: 'Ongoing' },
    { id: 5, name: 'Product Launch Video', platform: 'youtube', budget: 12000, reach: '550K', clicks: 3100, conversions: 120, roi: '-15%', status: 'paused', progress: 30, date: 'Oct 10 - Nov 10' },
    { id: 6, name: 'IG Story Promo', platform: 'instagram', budget: 3500, reach: '180K', clicks: 5400, conversions: 280, roi: '+145%', status: 'completed', progress: 100, date: 'Sep 1 - Sep 30' },
    { id: 7, name: 'Holiday Special Preview', platform: 'facebook', budget: 20000, reach: '-', clicks: '-', conversions: '-', roi: '-', status: 'draft', progress: 0, date: 'Nov 15 - Dec 25' },
    { id: 8, name: 'Competitor Conquesting', platform: 'google', budget: 18000, reach: '110K', clicks: 4800, conversions: 190, roi: '+40%', status: 'active', progress: 55, date: 'Oct 1 - Nov 30' }
  ];

  // Helper to format currency
  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  // Render Campaigns
  const renderCampaigns = (filterStatus = 'all') => {
    if (!container) return;
    
    container.innerHTML = '';
    
    const filtered = campaigns.filter(c => filterStatus === 'all' || c.status === filterStatus);
    
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state w-full col-span-full">
          <div class="empty-state-icon"><i data-lucide="search-x"></i></div>
          <h3 class="empty-state-title">No campaigns found</h3>
          <p class="empty-state-text">No campaigns match your current filters. Try adjusting your criteria.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    filtered.forEach((campaign, index) => {
      // Determine badge color
      let badgeClass = 'badge-secondary';
      if (campaign.status === 'active') badgeClass = 'badge-success';
      if (campaign.status === 'paused') badgeClass = 'badge-warning';
      if (campaign.status === 'completed') badgeClass = 'badge-info';

      // Determine progress bar color
      let progressClass = 'success';
      if (campaign.progress < 40) progressClass = 'warning';
      if (campaign.progress === 0) progressClass = '';

      const cardHTML = `
        <div class="card campaign-card" style="animation-delay: ${index * 0.05}s">
          <div class="card-header">
            <div class="campaign-title-group">
              <div class="campaign-platform-icon ${campaign.platform}">
                <i data-lucide="${campaign.platform === 'google' ? 'search' : (campaign.platform === 'email' ? 'mail' : campaign.platform)}"></i>
              </div>
              <div>
                <h3 class="campaign-title text-truncate" title="${campaign.name}">${campaign.name}</h3>
                <div class="campaign-date">${campaign.date}</div>
              </div>
            </div>
          </div>
          
          <div class="card-body">
            <div class="campaign-metrics">
              <div class="metric-item">
                <span class="metric-label">Budget</span>
                <span class="metric-value">${formatCurrency(campaign.budget)}</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Reach</span>
                <span class="metric-value">${campaign.reach}</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Conversions</span>
                <span class="metric-value">${campaign.conversions}</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">ROI</span>
                <span class="metric-value ${campaign.roi.startsWith('+') ? 'highlight' : ''}">${campaign.roi}</span>
              </div>
            </div>

            <div class="campaign-progress">
              <div class="campaign-progress-header">
                <span class="campaign-progress-label">Budget Spent</span>
                <span class="campaign-progress-value">${campaign.progress}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill ${progressClass}" style="width: ${campaign.progress}%"></div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <span class="badge ${badgeClass} capitalize">${campaign.status}</span>
            <div class="flex gap-2">
              <button class="btn btn-sm btn-ghost btn-icon" title="Edit"><i data-lucide="edit-2"></i></button>
              <button class="btn btn-sm btn-ghost btn-icon text-danger" title="Pause/Stop"><i data-lucide="${campaign.status === 'active' ? 'pause' : 'square'}"></i></button>
            </div>
          </div>
        </div>
      `;
      
      container.insertAdjacentHTML('beforeend', cardHTML);
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  };

  // View Toggle (Grid / List)
  if (viewToggleBtn && container) {
    // viewToggleBtn click listener is partially inline in HTML, but let's ensure class update
    viewToggleBtn.addEventListener('click', () => {
      const currentView = viewToggleBtn.dataset.view; // grid or list
      container.setAttribute('data-view', currentView);
    });
  }

  // Filter Chips
  if (filterChips) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        // Remove selected from all
        filterChips.forEach(c => c.classList.remove('selected'));
        // Add to clicked
        chip.classList.add('selected');
        // Render
        renderCampaigns(chip.dataset.filter);
      });
    });
  }

  // Initial Render
  renderCampaigns('all');
});
