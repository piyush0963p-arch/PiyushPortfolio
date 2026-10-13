(function () {
  const FH = window.FashionHub;
  const selected = {
    address: 'home',
    payment: 'UPI'
  };

  function itemKey(item) {
    return `${item.id}|${item.size}|${item.color}|${item.saved ? 'saved' : 'bag'}`;
  }

  function parseKey(key) {
    const [id, size, color, saved] = key.split('|');
    return { id, size, color, saved: saved === 'saved' };
  }

  function renderCartRow(item) {
    const product = FH.getProduct(item.id);
    return `
      <article class="cart-item">
        <img src="${product.images[0]}" alt="${product.brand} ${product.title}" onerror="window.FashionHub.handleImageError(this)">
        <div>
          <h3>${product.brand}</h3>
          <p>${product.title}</p>
          <p>${item.size} - ${item.color}</p>
          <div class="price-row">
            <strong>${FH.money(product.price * item.qty)}</strong>
            <del>${FH.money(product.mrp * item.qty)}</del>
            <span>${FH.discountPercent(product)}% off</span>
          </div>
          ${item.saved ? '' : `
            <div class="quantity-control" aria-label="Quantity">
              <button type="button" data-qty-minus="${itemKey(item)}">-</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-plus="${itemKey(item)}">+</button>
            </div>
          `}
          <div class="cart-row-actions">
            ${item.saved
              ? `<button class="cart-action-link" type="button" data-move-bag="${itemKey(item)}">Move to bag</button>`
              : `<button class="cart-action-link" type="button" data-save-later="${itemKey(item)}">Save for later</button>`}
            <button class="cart-action-link" type="button" data-remove-item="${itemKey(item)}">Remove</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCart() {
    if (document.body.dataset.page !== 'cart') return;
    const active = FH.getCart(false);
    const saved = FH.getCart(true).filter((item) => item.saved);
    const cartTarget = document.querySelector('#cartItems');
    const savedTarget = document.querySelector('#savedItems');
    cartTarget.innerHTML = active.length
      ? active.map(renderCartRow).join('')
      : '<div class="empty-state"><div><h2>Your bag is empty</h2><p>Explore the premium edit and add pieces to checkout.</p><a class="btn primary" href="products.html">Shop now</a></div></div>';
    savedTarget.innerHTML = saved.length
      ? saved.map(renderCartRow).join('')
      : '<div class="empty-state"><div><p>No saved pieces yet.</p></div></div>';
    FH.renderPricePanel('#pricePanel');
  }

  function activeAddresses() {
    return FH.read(FH.STORAGE.addresses, FH.defaultAddresses);
  }

  function renderAddresses() {
    const target = document.querySelector('#addressGrid');
    if (!target) return;
    target.innerHTML = activeAddresses().map((address) => `
      <article class="address-card ${selected.address === address.id ? 'active' : ''}" data-address="${address.id}">
        <strong>${address.name}</strong>
        <p>${address.line}</p>
        <p>${address.eta}</p>
      </article>
    `).join('');
  }

  function renderGateway() {
    const screen = document.querySelector('#gatewayScreen');
    if (!screen) return;
    const copy = {
      UPI: ['UPI', 'fashionhub@upi'],
      Card: ['Card', 'Visa ending 2026'],
      Wallet: ['Wallet', 'FashionHub Pay balance ready'],
      COD: ['Cash on Delivery', 'Pay at doorstep after OTP check']
    };
    const [label, detail] = copy[selected.payment];
    screen.innerHTML = `
      <span>${label}</span>
      <strong>${detail}</strong>
      <button class="btn primary" id="placeOrder">Place order</button>
    `;
  }

  function renderTimeline(complete = false) {
    const target = document.querySelector('#orderTimeline');
    if (!target) return;
    const steps = complete
      ? [['Order placed', true], ['Quality check', true], ['Out for delivery', true], ['Delivered', false]]
      : [['Order placed', true], ['Quality check', true], ['Out for delivery', false], ['Delivered', false]];
    target.innerHTML = `
      <h2>Fulfillment</h2>
      ${steps.map(([label, done]) => `<span class="${done ? 'done' : ''}">${label}</span>`).join('')}
    `;
  }

  function renderCheckout() {
    if (document.body.dataset.page !== 'checkout') return;
    if (!FH.requireAuth()) return;

    const lastOrder = FH.read(FH.STORAGE.lastOrder, null);
    const active = FH.getCart(false);

    if (lastOrder && active.length === 0) {
      const layout = document.querySelector('.checkout-layout');
      if (layout) {
        // Change steps to active track
        const steps = document.querySelector('.checkout-steps');
        if (steps) {
          steps.innerHTML = `
            <span class="done">Bag</span>
            <span class="done">Address</span>
            <span class="done">Payment</span>
            <span class="active">Track</span>
          `;
        }
        
        layout.innerHTML = `
          <div class="checkout-success-panel">
            <div class="success-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for shopping with FashionHub. Your payment was approved and your order is being processed.</p>
            
            <div class="success-order-details">
              <div class="detail-row"><span>Order ID</span><strong>${lastOrder.id}</strong></div>
              <div class="detail-row"><span>Date</span><strong>${new Date(lastOrder.createdAt).toLocaleDateString(undefined, {dateStyle: 'medium'})}</strong></div>
              <div class="detail-row"><span>Payment Method</span><strong>${lastOrder.payment}</strong></div>
              <div class="detail-row"><span>Total Paid</span><strong class="total-amount">${FH.money(lastOrder.total)}</strong></div>
            </div>
            
            <a href="products.html" class="btn primary">Continue Shopping</a>
          </div>
          <aside style="width:100%; max-width:320px;">
            <div class="timeline" id="orderTimeline">
              <h2>Fulfillment Status</h2>
              <span class="done">Order placed</span>
              <span class="done">Quality check</span>
              <span class="pulse">Out for delivery</span>
              <span>Delivered</span>
            </div>
          </aside>
        `;

        if (new URLSearchParams(window.location.search).get('success') === 'true') {
          // Clear query param so toast doesn't re-trigger on page refreshes
          window.history.replaceState({}, document.title, window.location.pathname);
          FH.toast(`Order ${lastOrder.id} placed successfully!`);
        }
        return;
      }
    }

    renderAddresses();
    renderGateway();
    renderTimeline(Boolean(lastOrder));
    FH.renderPricePanel('#checkoutSummary', true);
  }

  function placeOrder() {
    const active = FH.getCart(false);
    if (!active.length) {
      FH.toast('Your bag is empty');
      return;
    }
    const order = {
      id: `FH${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      address: selected.address,
      payment: selected.payment,
      total: FH.cartTotals().total,
      items: active
    };
    localStorage.setItem('fashionhub_pending_order', JSON.stringify(order));
    window.location.href = 'payment.html';
  }

  function initCartEvents() {
    document.addEventListener('click', (event) => {
      const minus = event.target.closest('[data-qty-minus]');
      const plus = event.target.closest('[data-qty-plus]');
      const save = event.target.closest('[data-save-later]');
      const move = event.target.closest('[data-move-bag]');
      const remove = event.target.closest('[data-remove-item]');
      const address = event.target.closest('[data-address]');
      const pay = event.target.closest('[data-pay]');
      const place = event.target.closest('#placeOrder');

      if (minus || plus) {
        const key = minus?.dataset.qtyMinus || plus?.dataset.qtyPlus;
        const variant = parseKey(key);
        const item = FH.getCart(false).find((entry) => itemKey(entry) === key);
        if (!item) return;
        FH.updateQuantity(variant.id, item.qty + (plus ? 1 : -1), variant);
        renderCart();
      }

      if (save) {
        const variant = parseKey(save.dataset.saveLater);
        FH.moveToSaved(variant.id, variant);
        renderCart();
      }

      if (move) {
        const variant = parseKey(move.dataset.moveBag);
        FH.moveToBag(variant.id, variant);
        renderCart();
      }

      if (remove) {
        const variant = parseKey(remove.dataset.removeItem);
        FH.removeFromCart(variant.id, variant);
        renderCart();
        renderCheckout();
      }

      if (address) {
        selected.address = address.dataset.address;
        renderAddresses();
      }

      if (pay) {
        selected.payment = pay.dataset.pay;
        document.querySelectorAll('[data-pay]').forEach((button) => button.classList.remove('active'));
        pay.classList.add('active');
        renderGateway();
      }

      if (place) {
        placeOrder();
      }
    });

    window.addEventListener('fashionhub:cart', () => {
      renderCart();
      renderCheckout();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    renderCheckout();
    initCartEvents();
  });
})();
