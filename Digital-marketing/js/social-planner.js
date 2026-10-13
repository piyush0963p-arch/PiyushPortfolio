/**
 * social-planner.js
 * Logic for the Social Media Planner Calendar
 */

document.addEventListener('DOMContentLoaded', () => {
  const calendarBody = document.getElementById('calendarBody');
  const postDrawer = document.getElementById('postDrawer');
  const postDrawerOverlay = document.getElementById('postDrawerOverlay');

  // Dummy scheduled posts data
  // Using days 1-31 of October 2026 for simulation
  const scheduledPosts = [
    { id: 1, date: 5, platform: 'linkedin', title: 'Q3 Earnings Report Highlight' },
    { id: 2, date: 5, platform: 'twitter', title: 'Thread: 5 ways to optimize...' },
    { id: 3, date: 8, platform: 'facebook', title: 'Team Culture Video' },
    { id: 4, date: 12, platform: 'instagram', title: 'Product UI Sneak Peek' },
    { id: 5, date: 15, platform: 'linkedin', title: '5 Tips for B2B Growth' },
    { id: 6, date: 15, platform: 'twitter', title: 'Poll: Biggest marketing challenge?' },
    { id: 7, date: 18, platform: 'facebook', title: 'Customer Success Story: Acme Corp' },
    { id: 8, date: 22, platform: 'instagram', title: 'Behind the scenes at HQ' },
    { id: 9, date: 22, platform: 'linkedin', title: 'Hiring: Lead Designer' },
    { id: 10, date: 26, platform: 'twitter', title: 'Meme Friday' },
    { id: 11, date: 29, platform: 'linkedin', title: 'Upcoming Webinar Announcement' }
  ];

  // Render Calendar Grid (October 2026 starts on Thursday)
  const renderCalendar = () => {
    if (!calendarBody) return;
    
    calendarBody.innerHTML = '';
    
    const daysInMonth = 31;
    const firstDayIndex = 4; // Thursday (0 = Sunday, 1 = Monday... 4 = Thursday)
    const prevMonthDays = 30; // Sept has 30

    let dateCount = 1;
    let nextMonthDateCount = 1;

    // 5 rows * 7 days = 35 cells total (enough for Oct 2026)
    for (let i = 0; i < 35; i++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-cell';

      let cellDateNum = null;
      let isCurrentMonth = false;

      if (i < firstDayIndex) {
        // Prev Month
        cellDateNum = prevMonthDays - firstDayIndex + i + 1;
        cell.classList.add('other-month');
      } else if (dateCount <= daysInMonth) {
        // Current Month
        cellDateNum = dateCount;
        isCurrentMonth = true;
        // Highlight today (Simulate Oct 15 as today)
        if (dateCount === 15) {
          cell.classList.add('today');
        }
        dateCount++;
      } else {
        // Next Month
        cellDateNum = nextMonthDateCount;
        cell.classList.add('other-month');
        nextMonthDateCount++;
      }

      // Add Date Span
      const dateSpan = document.createElement('span');
      dateSpan.className = 'calendar-date';
      dateSpan.textContent = cellDateNum;
      cell.appendChild(dateSpan);

      // Add Events Container
      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'calendar-events';

      if (isCurrentMonth) {
        // Find posts for this day
        const dayPosts = scheduledPosts.filter(post => post.date === cellDateNum);
        
        // Show max 3 posts, then a "+X more" indicator
        const displayLimit = 3;
        
        dayPosts.slice(0, displayLimit).forEach(post => {
          const postEl = document.createElement('div');
          postEl.className = `cal-post ${post.platform}`;
          postEl.innerHTML = `<i data-lucide="${post.platform}"></i> <span>${post.title}</span>`;
          eventsContainer.appendChild(postEl);
        });

        if (dayPosts.length > displayLimit) {
          const moreEl = document.createElement('div');
          moreEl.className = 'post-more';
          moreEl.textContent = `+${dayPosts.length - displayLimit} more`;
          eventsContainer.appendChild(moreEl);
        }
      }

      cell.appendChild(eventsContainer);

      // Cell click opens drawer
      cell.addEventListener('click', () => {
        if (postDrawer && postDrawerOverlay) {
          postDrawer.classList.add('open');
          postDrawerOverlay.classList.add('open');
        }
      });

      calendarBody.appendChild(cell);
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  };

  // Platform Toggles in Drawer
  const platformToggles = document.querySelectorAll('.platform-toggle');
  platformToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });

  renderCalendar();
});
