const fs = require('fs');
const path = require('path');

const newHeader = `  <header class="site-header">
    <a class="brand" href="index.html" aria-label="FashionHub home">
      <svg viewBox="0 0 50 50" width="40" height="40" fill="none" stroke="currentColor" stroke-width="4"><path d="M10,40 L20,10 L30,30 L40,10 L50,40" stroke="#f43397" stroke-linejoin="round" stroke-linecap="round"/></svg>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="products.html?gender=Men">MEN</a>
      <a href="products.html?gender=Women">WOMEN</a>
      <a href="products.html?category=Kids">KIDS</a>
      <a href="products.html?category=Home">HOME</a>
      <a href="products.html?category=Beauty">BEAUTY</a>
      <a href="products.html?category=Genz">GENZ</a>
      <a href="products.html">STUDIO <sup style="color:#f43397;font-weight:bold;font-size:0.6rem;">NEW</sup></a>
    </nav>
    <div class="search-shell">
      <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input id="globalSearch" type="search" placeholder="Search for products, brands and more" autocomplete="off">
      <div id="searchPredictions" class="search-predictions" role="listbox"></div>
    </div>
    <div class="header-actions">
      <button class="icon-action-vertical" data-auth-open="true" aria-label="Profile">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>Profile</span>
      </button>
      <a class="icon-action-vertical" href="wishlist.html" aria-label="Wishlist">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <span>Wishlist</span>
      </a>
      <a class="icon-action-vertical" href="cart.html" aria-label="Cart">
        <div class="bag-icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span class="badge" id="cartCount">0</span>
        </div>
        <span>Bag</span>
      </a>
    </div>
  </header>`;

const dir = 'd:/fashionhub';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the header block
  const regex = /<header class="site-header">[\s\S]*?<\/header>/;
  if (regex.test(content)) {
    content = content.replace(regex, newHeader);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
