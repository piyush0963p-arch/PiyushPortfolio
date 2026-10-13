(function () {
  const FH = window.FashionHub;
  const Search = window.FashionHubSearch;
  const welcome = {
    role: 'bot',
    text: 'Tell me the moment, budget, color, or destination. I will build a shoppable edit from FashionHub inventory.'
  };
  let messages = [welcome];

  function recommendationCopy(query, products) {
    const lower = query.toLowerCase();
    if (lower.includes('goa') || lower.includes('trip') || lower.includes('vacation')) {
      return 'For a Goa trip, keep the base airy and add one polished travel anchor.';
    }
    if (lower.includes('formal') || lower.includes('office') || lower.includes('work')) {
      return 'For a formal edit, start with structure, then keep the accessories clean.';
    }
    if (lower.includes('party') || lower.includes('evening')) {
      return 'For evening plans, satin texture and compact accessories create the sharpest look.';
    }
    if (products.some((product) => product.price < 1200)) {
      return 'I found value-forward pieces that still fit the premium styling brief.';
    }
    return 'Here is a focused edit ranked by relevance, inventory, and styling versatility.';
  }

  function pickProducts(query) {
    const results = Search.searchProducts(query, FH.products);
    if (results.length >= 3) return results.slice(0, 3);
    return [...results, ...FH.products.filter((product) => !results.includes(product))]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }

  function botMessage(query) {
    const picks = pickProducts(query);
    return {
      role: 'bot',
      text: recommendationCopy(query, picks),
      products: picks
    };
  }

  function render() {
    const root = document.querySelector('#aiStylist');
    if (!root) return;
    root.innerHTML = `
      <button class="stylist-launch" type="button" data-stylist-launch>AI</button>
      <section class="stylist-window" aria-label="AI stylist chatbot">
        <div class="stylist-head">
          <strong>Fashion GPT</strong>
          <button type="button" data-stylist-close aria-label="Close">x</button>
        </div>
        <div class="stylist-messages" id="stylistMessages">
          ${messages.map((message) => `
            <div class="message ${message.role === 'user' ? 'user' : ''}">
              ${message.text}
              ${message.products ? `
                <div class="stylist-results">
                  ${message.products.map((product) => `
                    <a class="stylist-result" href="product.html?id=${product.id}">
                      <img src="${product.images[0]}" alt="${product.brand} ${product.title}" onerror="window.FashionHub.handleImageError(this)">
                      <span><strong>${product.brand}</strong><br>${product.title}<br>${FH.money(product.price)}</span>
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <form class="stylist-form" id="stylistForm">
          <input id="stylistInput" type="text" placeholder="Goa trip looks" autocomplete="off">
          <button type="submit">Go</button>
        </form>
      </section>
    `;
    const scroller = root.querySelector('#stylistMessages');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  function ask(query) {
    const clean = String(query || '').trim();
    if (!clean) return;
    messages.push({ role: 'user', text: clean });
    render();
    setTimeout(() => {
      messages.push(botMessage(clean));
      render();
      document.querySelector('#aiStylist')?.classList.add('open');
    }, 360);
  }

  function open(prompt) {
    const root = document.querySelector('#aiStylist');
    if (!root) return;
    root.classList.add('open');
    render();
    if (prompt) {
      ask(prompt);
    } else {
      setTimeout(() => document.querySelector('#stylistInput')?.focus(), 0);
    }
  }

  function close() {
    document.querySelector('#aiStylist')?.classList.remove('open');
  }

  function initStylist() {
    render();
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-stylist-launch]') || event.target.closest('[data-open-stylist]')) open();
      if (event.target.closest('[data-stylist-close]')) close();
    });
    document.addEventListener('submit', (event) => {
      if (event.target.id !== 'stylistForm') return;
      event.preventDefault();
      const input = document.querySelector('#stylistInput');
      ask(input.value);
      input.value = '';
    });
  }

  window.FashionHubStylist = { open, close, ask };
  document.addEventListener('DOMContentLoaded', initStylist);
})();
