(function () {
  const FH = window.FashionHub;
  const Search = window.FashionHubSearch;
  const state = {
    page: 1,
    pageSize: 8,
    sort: 'popularity',
    selectedSize: null,
    selectedColor: null,
    currentImage: 0,
    currentTab: 'specs'
  };

  function params() {
    return new URLSearchParams(window.location.search);
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
  }

  function setInitialFilters() {
    const url = params();
    const map = ['gender', 'category', 'brand', 'fabric'];
    map.forEach((name) => {
      const value = url.get(name);
      if (!value) return;
      document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
        input.checked = input.value.toLowerCase() === value.toLowerCase();
      });
    });
    const max = url.get('max');
    if (max && document.querySelector('#priceRange')) {
      document.querySelector('#priceRange').value = max;
      document.querySelector('#priceValue').textContent = `Up to ${FH.money(Number(max))}`;
    }
  }

  function selectedFilters() {
    const formFilters = {};
    document.querySelectorAll('#filterPanel input[type="checkbox"]').forEach((input) => {
      if (!formFilters[input.name]) formFilters[input.name] = [];
      if (input.checked) formFilters[input.name].push(input.value);
    });
    const price = Number(document.querySelector('#priceRange')?.value || 9000);
    return { ...formFilters, price };
  }

  function applyFilters(product) {
    const filters = selectedFilters();
    if (product.price > filters.price) return false;
    return ['gender', 'category', 'brand', 'fabric'].every((key) => {
      return !filters[key]?.length || filters[key].includes(product[key]);
    });
  }

  function sorted(products) {
    const next = [...products];
    const catOrder = ['Shirts','Dresses','Blazers','Trousers','Jackets','Footwear','Bags','Accessories','Kids','Home','Beauty','Genz'];
    if (state.sort === 'category') next.sort((a, b) => catOrder.indexOf(a.category) - catOrder.indexOf(b.category));
    if (state.sort === 'price-low') next.sort((a, b) => a.price - b.price);
    if (state.sort === 'price-high') next.sort((a, b) => b.price - a.price);
    if (state.sort === 'rating') next.sort((a, b) => b.rating - a.rating);
    if (state.sort === 'popularity') next.sort((a, b) => b.popularity - a.popularity);
    return next;
  }

  function queryProducts() {
    const url = params();
    const query = url.get('q') || url.get('tag') || '';
    const base = query ? Search.searchProducts(query, FH.products) : FH.products;
    const fromUrl = base.filter((product) => {
      const gender = url.get('gender');
      const category = url.get('category');
      const brand = url.get('brand');
      const max = Number(url.get('max') || 0);
      const tag = url.get('tag');
      if (gender && product.gender.toLowerCase() !== gender.toLowerCase()) return false;
      if (category && product.category.toLowerCase() !== category.toLowerCase()) return false;
      if (brand && product.brand.toLowerCase() !== brand.toLowerCase()) return false;
      if (tag && !product.tags.includes(tag.toLowerCase())) return false;
      if (max && product.price > max) return false;
      return true;
    });
    return sorted(fromUrl.filter(applyFilters));
  }

  function renderPagination(total) {
    const target = document.querySelector('#pagination');
    if (!target) return;
    const pages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = Math.min(state.page, pages);
    target.innerHTML = Array.from({ length: pages }, (_, index) => `
      <button type="button" class="${state.page === index + 1 ? 'active' : ''}" data-page="${index + 1}">${index + 1}</button>
    `).join('');
  }

  function updateSemanticPill(total) {
    const pill = document.querySelector('#semanticPill');
    if (!pill) return;
    const url = params();
    const q = url.get('q');
    const label = q ? `Matched "${q}" across ${total} pieces` : `${total} premium pieces ready`;
    pill.textContent = label;
  }

  function renderProducts(showSkeleton = false) {
    const grid = document.querySelector('#productGrid');
    const skeleton = document.querySelector('#plpSkeleton');
    const titleResultCount = document.querySelector('#titleResultCount');
    if (!grid) return;

    const paint = () => {
      const products = queryProducts();
      const start = (state.page - 1) * state.pageSize;
      const paged = products.slice(start, start + state.pageSize);
      skeleton?.classList.remove('show');
      if (titleResultCount) titleResultCount.textContent = products.length;
      updateSemanticPill(products.length);
      grid.innerHTML = paged.length
        ? paged.map(FH.renderProductCard).join('')
        : '<div class="empty-state"><div><h2>No styles found</h2><p>Try clearing filters or searching a broader style phrase.</p><a class="btn primary" href="products.html">Reset collection</a></div></div>';
      renderPagination(products.length);
    };

    if (showSkeleton) {
      grid.innerHTML = '';
      skeleton?.classList.add('show');
      setTimeout(paint, 420);
      return;
    }
    paint();
  }

  function openQuickView(productId) {
    const product = FH.getProduct(productId);
    const modal = document.querySelector('#quickView');
    if (!modal) return;
    modal.innerHTML = `
      <div class="quick-view-card">
        <button class="modal-close" data-close-quick aria-label="Close">x</button>
        <img src="${product.images[0]}" alt="${product.brand} ${product.title}" onerror="window.FashionHub.handleImageError(this)">
        <div>
          <p class="eyebrow">${product.brand}</p>
          <h2>${product.title}</h2>
          <div class="detail-price">
            <strong>${FH.money(product.price)}</strong>
            <del>${FH.money(product.mrp)}</del>
            <span>${FH.discountPercent(product)}% off</span>
          </div>
          <p>${product.fabric} finish, ${product.rating} rating, ${product.inventory} units left.</p>
          <div class="selector-block">
            <h3>Size</h3>
            <div class="selector-options">
              ${product.sizes.map((size, index) => `<button class="size-option ${index === 0 ? 'active' : ''}" data-qv-size="${size}">${size}</button>`).join('')}
            </div>
          </div>
          <div class="selector-block">
            <h3>Color</h3>
            <div class="selector-options">
              ${product.colors.map((color, index) => `<button class="color-option ${index === 0 ? 'active' : ''}" data-qv-color="${color}">${color}</button>`).join('')}
            </div>
          </div>
          <div class="detail-actions">
            <button class="btn primary" data-qv-add="${product.id}" data-size="${product.sizes[0]}" data-color="${product.colors[0]}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Add to bag
            </button>
            <a class="btn" href="product.html?id=${product.id}">View details</a>
          </div>
        </div>
      </div>
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }

  function closeQuickView() {
    const modal = document.querySelector('#quickView');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }

  function initPLP() {
    if (document.body.dataset.page !== 'products') return;
    setInitialFilters();

    // --- Highlight active top filter pill based on URL param ---
    const urlCat = new URLSearchParams(window.location.search).get('category');
    if (urlCat) {
      document.querySelectorAll('.filter-pill-dropdown').forEach((pill) => {
        if (pill.textContent.trim().toLowerCase() === urlCat.toLowerCase()) {
          pill.classList.add('active');
        }
      });
    }

    // --- Sidebar search boxes: filter checkboxes live ---
    document.querySelectorAll('.filter-search-box input[type="text"]').forEach((searchInput) => {
      searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        const list = searchInput.closest('.filter-group')?.querySelector('.checkbox-list');
        if (!list) return;
        list.querySelectorAll('label').forEach((label) => {
          const text = label.textContent.trim().toLowerCase();
          label.style.display = !query || text.includes(query) ? '' : 'none';
        });
      });
    });

    document.querySelector('#filterPanel')?.addEventListener('change', () => {
      state.page = 1;
      renderProducts(true);
    });
    document.querySelector('#priceRange')?.addEventListener('input', (event) => {
      document.querySelector('#priceValue').textContent = `Up to ${FH.money(Number(event.target.value))}`;
    });
    document.querySelector('#priceRange')?.addEventListener('change', () => {
      state.page = 1;
      renderProducts(true);
    });
    document.querySelector('#sortSelect')?.addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderProducts(true);
    });
    document.querySelector('#pagination')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-page]');
      if (!button) return;
      state.page = Number(button.dataset.page);
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.querySelector('#clearFilters')?.addEventListener('click', () => {
      document.querySelectorAll('#filterPanel input[type="checkbox"]').forEach((input) => {
        input.checked = false;
      });
      const price = document.querySelector('#priceRange');
      if (price) price.value = 9000;
      document.querySelector('#priceValue').textContent = 'Up to Rs 9,000';
      // Clear sidebar search inputs
      document.querySelectorAll('.filter-search-box input[type="text"]').forEach((inp) => {
        inp.value = '';
        inp.dispatchEvent(new Event('input'));
      });
      // Remove active pill
      document.querySelectorAll('.filter-pill-dropdown').forEach((p) => p.classList.remove('active'));
      state.page = 1;
      history.replaceState(null, '', 'products.html');
      renderProducts(true);
    });
    document.querySelector('#filterToggle')?.addEventListener('click', () => {
      document.querySelector('#filterPanel')?.classList.toggle('open');
    });
    document.addEventListener('click', (event) => {
      const quick = event.target.closest('[data-quick-view]');
      if (quick) openQuickView(quick.dataset.quickView);
      if (event.target.closest('[data-close-quick]') || event.target.id === 'quickView') closeQuickView();
      const size = event.target.closest('[data-qv-size]');
      const color = event.target.closest('[data-qv-color]');
      if (size) {
        document.querySelectorAll('[data-qv-size]').forEach((button) => button.classList.remove('active'));
        size.classList.add('active');
        document.querySelector('[data-qv-add]')?.setAttribute('data-size', size.dataset.qvSize);
      }
      if (color) {
        document.querySelectorAll('[data-qv-color]').forEach((button) => button.classList.remove('active'));
        color.classList.add('active');
        document.querySelector('[data-qv-add]')?.setAttribute('data-color', color.dataset.qvColor);
      }
      const add = event.target.closest('[data-qv-add]');
      if (add) {
        closeQuickView();
        setTimeout(() => FH.addToCart(add.dataset.qvAdd, { size: add.dataset.size, color: add.dataset.color }), 50);
      }
    });
    renderProducts(true);
  }

  function renderReviewsTab(product) {
    const reviews = FH.getReviews(product.id);
    const listHtml = reviews.map(r => `
      <div class="review-item">
        <div class="review-head">
          <strong>${r.author}</strong>
          <span class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          <small>${r.date}</small>
        </div>
        <p>${r.text}</p>
      </div>
    `).join('');
    
    return `
      <div class="reviews-container">
        <div class="review-summary">
          <strong>${product.rating} average rating</strong> from ${product.reviews.toLocaleString('en-IN')} verified shoppers.
        </div>
        <div class="review-list">
          ${listHtml}
        </div>
        <div class="review-form">
          <h3>Leave a review</h3>
          <form id="addReviewForm" data-product="${product.id}">
            <div class="input-group">
              <label>Rating</label>
              <select id="reviewRating" required>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>
            <div class="input-group">
              <label>Review</label>
              <textarea id="reviewText" required placeholder="What did you think about this piece?" rows="3"></textarea>
            </div>
            <button type="submit" class="btn primary">Submit Review</button>
          </form>
        </div>
      </div>
    `;
  }

  function renderTabs(product) {
    const panels = {
      specs: `<strong>Specifications</strong><br>${product.fabric} fabric, ${product.category} silhouette, ${product.colors.join(', ')} colorways, ${product.sizes.join(', ')} sizes.`,
      delivery: '<strong>Delivery</strong><br>Express metro delivery, premium packaging, and easy 7-day exchange on eligible pieces.',
      care: `<strong>Care</strong><br>${product.fabric === 'Leather' ? 'Wipe with a soft dry cloth and store in a dust bag.' : 'Cold wash separately, dry in shade, and steam gently.'}`,
      reviews: renderReviewsTab(product)
    };
    return `
      <section class="tabs">
        <div class="tab-buttons">
          ${Object.keys(panels).map((key) => `<button class="${state.currentTab === key ? 'active' : ''}" data-tab="${key}">${key}</button>`).join('')}
        </div>
        <div class="tab-panel">${panels[state.currentTab]}</div>
      </section>
    `;
  }

  function renderPDP() {
    if (document.body.dataset.page !== 'product') return;
    const root = document.querySelector('#productDetailRoot');
    const product = FH.getProduct(params().get('id'));
    state.selectedSize = state.selectedSize || product.sizes[0];
    state.selectedColor = state.selectedColor || product.colors[0];
    const related = FH.products
      .filter((item) => item.id !== product.id && (item.category === product.category || item.tags.some((tag) => product.tags.includes(tag))))
      .slice(0, 4);

    root.innerHTML = `
      <section class="pdp-layout">
        <div class="gallery">
          <div class="thumbs">
            ${product.images.map((src, index) => `
              <button class="${index === state.currentImage ? 'active' : ''}" data-thumb="${index}">
                <img src="${src}" alt="${product.title} view ${index + 1}" onerror="window.FashionHub.handleImageError(this)">
              </button>
            `).join('')}
          </div>
          <div class="main-image" id="mainImage">
            <img src="${product.images[state.currentImage]}" alt="${product.brand} ${product.title}" id="zoomImage" onerror="window.FashionHub.handleImageError(this)">
          </div>
        </div>
        <aside class="detail-info">
          <p class="eyebrow">${product.brand}</p>
          <h1>${product.title}</h1>
          <div class="rating-row"><span>${product.rating} rating</span><span>${product.reviews.toLocaleString('en-IN')} reviews</span></div>
          <div class="detail-price">
            <strong>${FH.money(product.price)}</strong>
            <del>${FH.money(product.mrp)}</del>
            <span>${FH.discountPercent(product)}% off</span>
          </div>
          <div class="selector-block">
            <h3>Select size</h3>
            <div class="selector-options">
              ${product.sizes.map((size) => `<button class="size-option ${state.selectedSize === size ? 'active' : ''}" data-size-select="${size}">${size}</button>`).join('')}
            </div>
          </div>
          <div class="selector-block">
            <h3>Select color</h3>
            <div class="selector-options">
              ${product.colors.map((color) => `<button class="color-option ${state.selectedColor === color ? 'active' : ''}" data-color-select="${color}">${color}</button>`).join('')}
            </div>
          </div>
          <div class="inventory-meter">${product.inventory < 10 ? 'Fast moving' : 'In stock'} - ${product.inventory} units available</div>
          <div class="detail-actions">
            <button class="btn primary" id="pdpAdd">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Add to bag
            </button>
            <button class="btn" data-wishlist="${product.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              Wishlist
            </button>
          </div>
        </aside>
      </section>
      ${renderTabs(product)}
      <section class="cross-sell">
        <div class="section-head">
          <div>
            <p class="eyebrow">Complete the look</p>
            <h2>Styled with this</h2>
          </div>
        </div>
        <div class="product-grid">${related.map(FH.renderProductCard).join('')}</div>
      </section>
    `;
  }

  function initPDP() {
    if (document.body.dataset.page !== 'product') return;
    renderPDP();
    document.addEventListener('click', (event) => {
      const product = FH.getProduct(params().get('id'));
      const thumb = event.target.closest('[data-thumb]');
      const size = event.target.closest('[data-size-select]');
      const color = event.target.closest('[data-color-select]');
      const tab = event.target.closest('[data-tab]');
      const add = event.target.closest('#pdpAdd');
      const quick = event.target.closest('[data-quick-view]');
      if (thumb) {
        state.currentImage = Number(thumb.dataset.thumb);
        renderPDP();
      }
      if (size) {
        state.selectedSize = size.dataset.sizeSelect;
        renderPDP();
      }
      if (color) {
        state.selectedColor = color.dataset.colorSelect;
        renderPDP();
      }
      if (tab) {
        state.currentTab = tab.dataset.tab;
        renderPDP();
      }
      if (add) {
        FH.addToCart(product.id, { size: state.selectedSize, color: state.selectedColor });
      }
        if (quick) {
        window.location.href = `product.html?id=${quick.dataset.quickView}`;
      }
    });

    document.addEventListener('submit', (event) => {
      if (event.target.id === 'addReviewForm') {
        event.preventDefault();
        const productId = event.target.dataset.product;
        const rating = document.getElementById('reviewRating').value;
        const text = document.getElementById('reviewText').value;
        
        try {
          FH.addReview(productId, rating, text);
          FH.toast('Review submitted successfully');
          renderPDP();
        } catch (error) {
          FH.toast('Please sign in to leave a review');
        }
      }
    });

    document.addEventListener('mousemove', (event) => {
      const frame = event.target.closest('#mainImage');
      const image = document.querySelector('#zoomImage');
      if (!frame || !image) return;
      const rect = frame.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      image.style.setProperty('--zoom-x', `${x}%`);
      image.style.setProperty('--zoom-y', `${y}%`);
      image.classList.add('zoomed');
    });
    document.addEventListener('mouseleave', (event) => {
      if (event.target?.id === 'mainImage') {
        document.querySelector('#zoomImage')?.classList.remove('zoomed');
      }
    }, true);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPLP();
    initPDP();
  });
})();
