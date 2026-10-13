(function () {
  const queryPresets = [
    'black formal shirt under 1000',
    'Goa trip looks',
    'satin party dress',
    'premium sneakers for travel',
    'workwear blazer and tote',
    'linen resort dress'
  ];

  function normalize(value) {
    return String(value || '').toLowerCase().trim();
  }

  function filtersFromQuery(query) {
    const q = normalize(query).replace(/rs\.?/g, '');
    const filters = {
      text: q,
      gender: [],
      category: [],
      brand: [],
      fabric: [],
      tags: [],
      max: null
    };

    const under = q.match(/under\s+(\d+)/);
    if (under) filters.max = Number(under[1]);

    if (q.includes('women') || q.includes('woman')) filters.gender.push('Women');
    if (q.includes('men') || q.includes('man')) filters.gender.push('Men');
    if (q.includes('unisex')) filters.gender.push('Unisex');

    const categoryMap = [
      ['shirt', 'Shirts'],
      ['dress', 'Dresses'],
      ['blazer', 'Blazers'],
      ['sneaker', 'Sneakers'],
      ['shoe', 'Sneakers'],
      ['bag', 'Bags'],
      ['tote', 'Bags']
    ];
    categoryMap.forEach(([token, category]) => {
      if (q.includes(token)) filters.category.push(category);
    });

    ['Linen', 'Cotton', 'Satin', 'Leather', 'Mesh'].forEach((fabric) => {
      if (q.includes(fabric.toLowerCase())) filters.fabric.push(fabric);
    });

    ['Aurelia', 'Noir Lane', 'Kairaa', 'Monk & Loom', 'Street Muse'].forEach((brand) => {
      if (q.includes(brand.toLowerCase())) filters.brand.push(brand);
    });

    const tags = ['black', 'formal', 'goa', 'vacation', 'party', 'travel', 'workwear', 'premium', 'resort'];
    tags.forEach((tag) => {
      if (q.includes(tag)) filters.tags.push(tag);
    });
    if (q.includes('trip')) filters.tags.push('travel');
    if (q.includes('luxury')) filters.tags.push('premium');

    return filters;
  }

  function productScore(product, query) {
    const q = normalize(query);
    if (!q) return product.popularity;
    const haystack = normalize([
      product.brand,
      product.title,
      product.category,
      product.gender,
      product.fabric,
      product.colors.join(' '),
      product.tags.join(' ')
    ].join(' '));
    const words = q.split(/\s+/).filter((word) => word.length > 2 && !['under', 'for', 'and', 'the'].includes(word));
    const matches = words.reduce((sum, word) => sum + (haystack.includes(word) ? 12 : 0), 0);
    const semantic = filtersFromQuery(q);
    const priceBoost = semantic.max && product.price <= semantic.max ? 18 : 0;
    const tagBoost = semantic.tags.reduce((sum, tag) => sum + (product.tags.includes(tag) ? 8 : 0), 0);
    return matches + tagBoost + priceBoost + product.popularity / 10 + product.rating;
  }

  function searchProducts(query, sourceProducts) {
    const products = sourceProducts || window.FashionHub.products;
    const filters = filtersFromQuery(query);
    return products
      .map((product) => ({ product, score: productScore(product, query) }))
      .filter(({ product, score }) => {
        if (!query) return true;
        if (filters.max && product.price > filters.max) return false;
        const strongFilter =
          filters.gender.length ||
          filters.category.length ||
          filters.brand.length ||
          filters.fabric.length ||
          filters.tags.length;
        if (!strongFilter) return score > product.popularity / 10;
        const genderOk = !filters.gender.length || filters.gender.includes(product.gender);
        const categoryOk = !filters.category.length || filters.category.includes(product.category);
        const brandOk = !filters.brand.length || filters.brand.includes(product.brand);
        const fabricOk = !filters.fabric.length || filters.fabric.includes(product.fabric);
        const tagOk = !filters.tags.length || filters.tags.some((tag) => product.tags.includes(tag));
        return genderOk && categoryOk && brandOk && fabricOk && tagOk;
      })
      .sort((a, b) => b.score - a.score)
      .map(({ product }) => product);
  }

  function navigateToQuery(query) {
    const trimmed = query.trim();
    if (!trimmed) return;
    const url = `products.html?q=${encodeURIComponent(trimmed)}`;
    window.location.href = url;
  }

  function renderPredictions(input, box) {
    const q = normalize(input.value);
    if (!q) {
      box.classList.remove('show');
      box.innerHTML = '';
      return;
    }
    const semantic = filtersFromQuery(q);
    const productMatches = searchProducts(q).slice(0, 4);
    const presetMatches = queryPresets.filter((preset) => normalize(preset).includes(q)).slice(0, 3);
    const rows = [
      ...presetMatches.map((preset) => ({ label: preset, detail: 'Suggested search', query: preset })),
      ...productMatches.map((product) => ({
        label: `${product.brand} ${product.title}`,
        detail: `${product.category} - ${window.FashionHub.money(product.price)}`,
        query: `${product.brand} ${product.title}`
      }))
    ].slice(0, 6);

    if (!rows.length) {
      rows.push({
        label: input.value,
        detail: semantic.max ? `Semantic max ${window.FashionHub.money(semantic.max)}` : 'Search marketplace',
        query: input.value
      });
    }

    box.innerHTML = rows.map((row) => `
      <button class="prediction-row" type="button" data-search-query="${row.query}">
        <span>${row.label}</span>
        <small>${row.detail}</small>
      </button>
    `).join('');
    box.classList.add('show');
  }

  function initSearch() {
    const input = document.querySelector('#globalSearch');
    const box = document.querySelector('#searchPredictions');
    if (!input || !box) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('q')) input.value = params.get('q');

    input.addEventListener('input', () => renderPredictions(input, box));
    input.addEventListener('focus', () => renderPredictions(input, box));
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        navigateToQuery(input.value);
      }
      if (event.key === 'Escape') {
        box.classList.remove('show');
      }
    });

    box.addEventListener('click', (event) => {
      const row = event.target.closest('[data-search-query]');
      if (!row) return;
      navigateToQuery(row.dataset.searchQuery);
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.search-shell')) box.classList.remove('show');
    });
  }

  window.FashionHubSearch = {
    filtersFromQuery,
    productScore,
    searchProducts
  };

  document.addEventListener('DOMContentLoaded', initSearch);
})();
