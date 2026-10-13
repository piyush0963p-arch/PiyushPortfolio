(function () {
  const FH = window.FashionHub;

  function renderWishlist() {
    if (document.body.dataset.page !== 'wishlist') return;
    const target = document.querySelector('#wishlistGrid');
    if (!target) return;
    const ids = FH.getWishlist();
    const products = ids.map(FH.getProduct).filter(Boolean);
    target.innerHTML = products.length
      ? products.map(FH.renderProductCard).join('')
      : '<div class="empty-state"><div><h2>Your wishlist is waiting</h2><p>Save pieces from the marketplace and build your next edit here.</p><a class="btn primary" href="products.html">Explore styles</a></div></div>';
  }

  function moveAllToBag() {
    const ids = FH.getWishlist();
    if (!ids.length) {
      FH.toast('Wishlist is empty');
      return;
    }
    ids.forEach((id) => FH.addToCart(id));
    FH.setWishlist([]);
    renderWishlist();
    FH.toast('Wishlist moved to bag');
  }

  function initWishlist() {
    renderWishlist();
    document.querySelector('#moveAllToBag')?.addEventListener('click', moveAllToBag);
    document.addEventListener('click', (event) => {
      const quick = event.target.closest('[data-quick-view]');
      if (quick && document.body.dataset.page === 'wishlist') {
        window.location.href = `product.html?id=${quick.dataset.quickView}`;
      }
    });
    window.addEventListener('fashionhub:wishlist', renderWishlist);
  }

  document.addEventListener('DOMContentLoaded', initWishlist);
})();
