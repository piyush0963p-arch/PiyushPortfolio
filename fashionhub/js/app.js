(function () {
  const STORAGE = {
    cart: 'fashionhub_cart',
    wishlist: 'fashionhub_wishlist',
    user: 'fashionhub_user',
    users: 'fashionhub_users',
    reviews: 'fashionhub_reviews',
    feed: 'fashionhub_feed',
    inventory: 'fashionhub_inventory',
    addresses: 'fashionhub_addresses',
    lastOrder: 'fashionhub_last_order'
  };

  const image = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

  const fallbackImage = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80';

  function handleImageError(img) {
    img.onerror = null;
    img.src = fallbackImage;
  }

  const products = [
    // === Shirts ===
    { id: 'fh-101', brand: 'Monk & Loom', title: 'Black formal slim shirt', category: 'Shirts', gender: 'Men', fabric: 'Cotton', price: 1899, mrp: 2999, rating: 4.5, reviews: 1250, popularity: 92, inventory: 15, colors: ['Black', 'Navy', 'White'], sizes: ['S', 'M', 'L', 'XL'], tags: ['formal', 'workwear', 'basics'], images: [image('photo-1603252109303-2751441dd157', 1000), image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-103', brand: 'Monk & Loom', title: 'Classic oxford cotton shirt', category: 'Shirts', gender: 'Men', fabric: 'Cotton', price: 2199, mrp: 3499, rating: 4.6, reviews: 840, popularity: 85, inventory: 20, colors: ['Light Blue', 'White', 'Pink'], sizes: ['S', 'M', 'L', 'XL'], tags: ['formal', 'workwear'], images: [image('photo-1603252109303-2751441dd157', 1000), image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-104', brand: 'Monk & Loom', title: 'Linen relaxed beach shirt', category: 'Shirts', gender: 'Men', fabric: 'Linen', price: 2499, mrp: 3999, rating: 4.4, reviews: 620, popularity: 83, inventory: 18, colors: ['White', 'Sage', 'Oatmeal'], sizes: ['S', 'M', 'L', 'XL'], tags: ['beach', 'resort', 'goa'], images: [image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-108', brand: 'Kairaa', title: 'Printed resort beach shirt', category: 'Shirts', gender: 'Men', fabric: 'Linen', price: 2299, mrp: 3499, rating: 4.3, reviews: 450, popularity: 81, inventory: 12, colors: ['Floral Blue', 'Palm Green'], sizes: ['S', 'M', 'L', 'XL'], tags: ['resort', 'vacation', 'goa'], images: [image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-109', brand: 'Monk & Loom', title: 'Minimal cotton overshirt', category: 'Shirts', gender: 'Men', fabric: 'Cotton', price: 2799, mrp: 4499, rating: 4.5, reviews: 310, popularity: 84, inventory: 22, colors: ['Navy', 'Olive', 'Khaki'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'layering'], images: [image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-114', brand: 'Street Muse', title: 'Vintage graphic tee', category: 'Shirts', gender: 'Unisex', fabric: 'Cotton', price: 999, mrp: 1599, rating: 4.2, reviews: 1450, popularity: 88, inventory: 50, colors: ['White', 'Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'travel'], images: [image('photo-1521572267360-ee0c2909d518', 1000), image('photo-1598033129183-c4f50c736f10', 1000), image('photo-1583743814966-8936f5b7be1a', 1000)] },
    { id: 'fh-118', brand: 'Luxe Label', title: 'Silk wrap blouse', category: 'Shirts', gender: 'Women', fabric: 'Silk', price: 3499, mrp: 5499, rating: 4.7, reviews: 180, popularity: 86, inventory: 15, colors: ['Champagne', 'Emerald', 'Black'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'premium'], images: [image('photo-1620799140408-edc6dcb6d633', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-121', brand: 'Monk & Loom', title: 'Linen casual shirt', category: 'Shirts', gender: 'Men', fabric: 'Linen', price: 1999, mrp: 3299, rating: 4.4, reviews: 290, popularity: 80, inventory: 25, colors: ['Oatmeal', 'White'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'travel'], images: [image('photo-1596755094514-f87e34085b2c', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-125', brand: 'Monk & Loom', title: 'Cashmere turtleneck sweater', category: 'Shirts', gender: 'Unisex', fabric: 'Cashmere', price: 5999, mrp: 8999, rating: 4.8, reviews: 120, popularity: 89, inventory: 10, colors: ['Cream', 'Grey', 'Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['winter', 'premium'], images: [image('photo-1620799140408-edc6dcb6d633', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },
    { id: 'fh-127', brand: 'Monk & Loom', title: 'Corduroy relaxed overshirt', category: 'Shirts', gender: 'Men', fabric: 'Cotton', price: 2999, mrp: 4999, rating: 4.3, reviews: 210, popularity: 82, inventory: 15, colors: ['Tan', 'Olive', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], tags: ['winter', 'layering'], images: [image('photo-1598033129183-c4f50c736f10', 1000), image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1521572267360-ee0c2909d518', 1000)] },

    // === Dresses ===
    { id: 'fh-102', brand: 'Aurelia', title: 'Ivory satin wrap dress', category: 'Dresses', gender: 'Women', fabric: 'Satin', price: 3299, mrp: 5299, rating: 4.7, reviews: 842, popularity: 92, inventory: 14, colors: ['Ivory', 'Rose', 'Wine'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'luxury', 'feed'], images: [image('photo-1612336307429-8a898d10e223', 1000), image('photo-1496747611176-843222e1e57c', 1000), image('photo-1595777457583-95e059d581b8', 1000)] },
    { id: 'fh-107', brand: 'Noir Lane', title: 'Sculpted black midi dress', category: 'Dresses', gender: 'Women', fabric: 'Satin', price: 2799, mrp: 4599, rating: 4.5, reviews: 768, popularity: 86, inventory: 8, colors: ['Black', 'Emerald'], sizes: ['XS', 'S', 'M', 'L'], tags: ['black', 'party', 'luxury'], images: [image('photo-1612336307429-8a898d10e223', 1000), image('photo-1496747611176-843222e1e57c', 1000), image('photo-1595777457583-95e059d581b8', 1000)] },
    { id: 'fh-112', brand: 'Aurelia', title: 'Handwoven resort maxi dress', category: 'Dresses', gender: 'Women', fabric: 'Cotton', price: 3999, mrp: 5999, rating: 4.6, reviews: 310, popularity: 89, inventory: 12, colors: ['Ivory', 'Sage'], sizes: ['XS', 'S', 'M', 'L'], tags: ['resort', 'vacation', 'goa'], images: [image('photo-1496747611176-843222e1e57c', 1000), image('photo-1618932260643-eee4a2f6c980', 1000), image('photo-1572804013309-59a88b7e92f1', 1000)] },
    { id: 'fh-115', brand: 'Aurelia', title: 'Flowy floral summer dress', category: 'Dresses', gender: 'Women', fabric: 'Cotton', price: 2499, mrp: 3999, rating: 4.4, reviews: 620, popularity: 83, inventory: 20, colors: ['Floral Pink', 'Floral Yellow'], sizes: ['XS', 'S', 'M', 'L'], tags: ['summer', 'resort'], images: [image('photo-1618932260643-eee4a2f6c980', 1000), image('photo-1515886657613-9f3515b0c78f', 1000), image('photo-1539109136881-3be0616acf4b', 1000)] },
    { id: 'fh-133', brand: 'Luxe Label', title: 'Satin slip skirt dress', category: 'Dresses', gender: 'Women', fabric: 'Satin', price: 2999, mrp: 4599, rating: 4.5, reviews: 410, popularity: 86, inventory: 14, colors: ['Silver', 'Black', 'Olive'], sizes: ['S', 'M', 'L'], tags: ['party', 'premium'], images: [image('photo-1595777457583-95e059d581b8', 1000), image('photo-1612336307429-8a898d10e223', 1000), image('photo-1572804013309-59a88b7e92f1', 1000)] },
    { id: 'fh-142', brand: 'Luxe Label', title: 'Sequin mini slip dress', category: 'Dresses', gender: 'Women', fabric: 'Synthetic', price: 4299, mrp: 6999, rating: 4.7, reviews: 150, popularity: 88, inventory: 10, colors: ['Rose Gold', 'Silver'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'luxury'], images: [image('photo-1572804013309-59a88b7e92f1', 1000), image('photo-1595777457583-95e059d581b8', 1000), image('photo-1612336307429-8a898d10e223', 1000)] },
    { id: 'fh-151', brand: 'Luxe Label', title: 'Emerald pleated maxi dress', category: 'Dresses', gender: 'Women', fabric: 'Satin', price: 4999, mrp: 7999, rating: 4.8, reviews: 90, popularity: 87, inventory: 6, colors: ['Emerald Green'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'premium'], images: [image('photo-1618932260643-eee4a2f6c980', 1000), image('photo-1496747611176-843222e1e57c', 1000), image('photo-1572804013309-59a88b7e92f1', 1000)] },
    { id: 'fh-152', brand: 'Luxe Label', title: 'Ruby red wrap gown dress', category: 'Dresses', gender: 'Women', fabric: 'Satin', price: 5499, mrp: 8999, rating: 4.9, reviews: 75, popularity: 85, inventory: 5, colors: ['Ruby Red'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'luxury'], images: [image('photo-1595777457583-95e059d581b8', 1000), image('photo-1612336307429-8a898d10e223', 1000), image('photo-1572804013309-59a88b7e92f1', 1000)] },

    // === Blazers ===
    { id: 'fh-201', brand: 'Monk & Loom', title: 'Cream linen blazer', category: 'Blazers', gender: 'Men', fabric: 'Linen', price: 3999, mrp: 6499, rating: 4.5, reviews: 290, popularity: 87, inventory: 15, colors: ['Cream', 'Oatmeal'], sizes: ['M', 'L', 'XL'], tags: ['formal', 'workwear', 'resort'], images: [image('photo-1593030103066-0093718efeb9', 1000), image('photo-1507679799987-c73779587ccf', 1000), image('photo-1591047139829-d91aecb6caea', 1000)] },
    { id: 'fh-202', brand: 'Street Muse', title: 'Olive utility blazer', category: 'Blazers', gender: 'Unisex', fabric: 'Cotton', price: 3499, mrp: 5499, rating: 4.4, reviews: 420, popularity: 82, inventory: 18, colors: ['Olive', 'Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'layering'], images: [image('photo-1617137968427-85924c800a22', 1000), image('photo-1551488831-00ddcb6c6bd3', 1000), image('photo-1507679799987-c73779587ccf', 1000)] },
    { id: 'fh-203', brand: 'Monk & Loom', title: 'Oversized check blazer', category: 'Blazers', gender: 'Women', fabric: 'Wool', price: 4599, mrp: 7499, rating: 4.6, reviews: 180, popularity: 89, inventory: 12, colors: ['Grey Check', 'Brown Check'], sizes: ['S', 'M', 'L'], tags: ['workwear', 'premium'], images: [image('photo-1600096194534-95cf5ece04cf', 1000), image('photo-1551488831-00ddcb6c6bd3', 1000), image('photo-1485968579580-b6d095142e6e', 1000)] },
    { id: 'fh-204', brand: 'Monk & Loom', title: 'White structured blazer', category: 'Blazers', gender: 'Women', fabric: 'Polyester', price: 3799, mrp: 5999, rating: 4.5, reviews: 240, popularity: 84, inventory: 16, colors: ['White', 'Pink'], sizes: ['XS', 'S', 'M', 'L'], tags: ['workwear', 'formal'], images: [image('photo-1551488831-00ddcb6c6bd3', 1000), image('photo-1485968579580-b6d095142e6e', 1000), image('photo-1507679799987-c73779587ccf', 1000)] },
    { id: 'fh-205', brand: 'Monk & Loom', title: 'Tan corduroy blazer', category: 'Blazers', gender: 'Men', fabric: 'Cotton', price: 4799, mrp: 7499, rating: 4.3, reviews: 180, popularity: 79, inventory: 11, colors: ['Tan', 'Brown'], sizes: ['M', 'L', 'XL'], tags: ['workwear', 'basics'], images: [image('photo-1591047139829-d91aecb6caea', 1000), image('photo-1593030103066-0093718efeb9', 1000), image('photo-1507679799987-c73779587ccf', 1000)] },
    { id: 'fh-231', brand: 'Monk & Loom', title: 'Navy slim-fit blazer', category: 'Blazers', gender: 'Men', fabric: 'Wool', price: 5499, mrp: 8999, rating: 4.7, reviews: 110, popularity: 90, inventory: 10, colors: ['Navy Blue'], sizes: ['M', 'L', 'XL'], tags: ['formal', 'premium'], images: [image('photo-1617137968427-85924c800a22', 1000), image('photo-1507679799987-c73779587ccf', 1000), image('photo-1591047139829-d91aecb6caea', 1000)] },
    { id: 'fh-232', brand: 'Luxe Label', title: 'Pink pastel tweed blazer', category: 'Blazers', gender: 'Women', fabric: 'Tweed', price: 4999, mrp: 7999, rating: 4.8, reviews: 75, popularity: 86, inventory: 8, colors: ['Pastel Pink'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'premium'], images: [image('photo-1485968579580-b6d095142e6e', 1000), image('photo-1551488831-00ddcb6c6bd3', 1000), image('photo-1507679799987-c73779587ccf', 1000)] },
    { id: 'fh-233', brand: 'Noir Lane', title: 'Double-breasted black blazer', category: 'Blazers', gender: 'Unisex', fabric: 'Wool', price: 5999, mrp: 9999, rating: 4.9, reviews: 130, popularity: 93, inventory: 7, colors: ['Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['formal', 'luxury'], images: [image('photo-1507679799987-c73779587ccf', 1000), image('photo-1593030103066-0093718efeb9', 1000), image('photo-1617137968427-85924c800a22', 1000)] },

    // === Trousers ===
    { id: 'fh-212', brand: 'Aurelia', title: 'High-waist culottes', category: 'Trousers', gender: 'Women', fabric: 'Cotton', price: 1999, mrp: 3299, rating: 4.5, reviews: 490, popularity: 85, inventory: 22, colors: ['Black', 'Ivory', 'Sage'], sizes: ['XS', 'S', 'M', 'L'], tags: ['workwear', 'basics'], images: [image('photo-1624378439575-d8705ad7ae80', 1000), image('photo-1594633312681-425c7b97ccd1', 1000), image('photo-1506629905607-d9f297d54d6d', 1000)] },
    { id: 'fh-213', brand: 'Street Muse', title: 'Cargo jogger pants', category: 'Trousers', gender: 'Unisex', fabric: 'Cotton', price: 1699, mrp: 2799, rating: 4.3, reviews: 870, popularity: 88, inventory: 35, colors: ['Olive', 'Black', 'Stone'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'travel', 'goa'], images: [image('photo-1509551388413-e18d0ac5d495', 1000), image('photo-1594633312681-425c7b97ccd1', 1000), image('photo-1479064555552-3ef4979f8908', 1000)] },
    { id: 'fh-214', brand: 'Noir Lane', title: 'Pleated formal trousers', category: 'Trousers', gender: 'Men', fabric: 'Cotton', price: 2299, mrp: 3699, rating: 4.6, reviews: 560, popularity: 86, inventory: 18, colors: ['Black', 'Navy', 'Charcoal'], sizes: ['30', '32', '34', '36'], tags: ['formal', 'workwear'], images: [image('photo-1618220048045-1080bc503142', 1000), image('photo-1506629905607-d9f297d54d6d', 1000), image('photo-1479064555552-3ef4979f8908', 1000)] },
    { id: 'fh-215', brand: 'Luxe Label', title: 'Satin palazzo pants', category: 'Trousers', gender: 'Women', fabric: 'Satin', price: 2799, mrp: 4499, rating: 4.7, reviews: 310, popularity: 89, inventory: 12, colors: ['Rose', 'Ivory', 'Black'], sizes: ['XS', 'S', 'M', 'L'], tags: ['party', 'premium'], images: [image('photo-1551854838-212c50b4c184', 1000), image('photo-1594633312681-425c7b97ccd1', 1000), image('photo-1624378439575-d8705ad7ae80', 1000)] },
    { id: 'fh-251', brand: 'Kairaa', title: 'Wide-leg linen trousers', category: 'Trousers', gender: 'Women', fabric: 'Linen', price: 1899, mrp: 2999, rating: 4.4, reviews: 240, popularity: 81, inventory: 16, colors: ['White', 'Oatmeal', 'Sage'], sizes: ['S', 'M', 'L'], tags: ['resort', 'vacation'], images: [image('photo-1624378439575-d8705ad7ae80', 1000), image('photo-1594633312681-425c7b97ccd1', 1000), image('photo-1506629905607-d9f297d54d6d', 1000)] },
    { id: 'fh-252', brand: 'Monk & Loom', title: 'Slim-fit chino trousers', category: 'Trousers', gender: 'Men', fabric: 'Cotton', price: 2199, mrp: 3499, rating: 4.5, reviews: 380, popularity: 84, inventory: 20, colors: ['Beige', 'Khaki', 'Navy'], sizes: ['30', '32', '34', '36'], tags: ['basics', 'workwear'], images: [image('photo-1506629905607-d9f297d54d6d', 1000), image('photo-1618220048045-1080bc503142', 1000), image('photo-1479064555552-3ef4979f8908', 1000)] },
    { id: 'fh-253', brand: 'Luxe Label', title: 'Tailored wool trousers', category: 'Trousers', gender: 'Men', fabric: 'Wool', price: 3499, mrp: 5499, rating: 4.8, reviews: 120, popularity: 86, inventory: 9, colors: ['Charcoal', 'Black'], sizes: ['30', '32', '34', '36'], tags: ['formal', 'premium'], images: [image('photo-1618220048045-1080bc503142', 1000), image('photo-1506629905607-d9f297d54d6d', 1000), image('photo-1479064555552-3ef4979f8908', 1000)] },
    { id: 'fh-254', brand: 'Street Muse', title: 'Utility cargo pants', category: 'Trousers', gender: 'Unisex', fabric: 'Cotton', price: 2499, mrp: 3999, rating: 4.4, reviews: 290, popularity: 87, inventory: 15, colors: ['Black', 'Sage', 'Khaki'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'streetwear'], images: [image('photo-1509551388413-e18d0ac5d495', 1000), image('photo-1594633312681-425c7b97ccd1', 1000), image('photo-1506629905607-d9f297d54d6d', 1000)] },

    // === Jackets ===
    { id: 'fh-206', brand: 'Street Muse', title: 'Bomber varsity jacket', category: 'Jackets', gender: 'Unisex', fabric: 'Cotton', price: 2999, mrp: 4999, rating: 4.6, reviews: 430, popularity: 89, inventory: 25, colors: ['Navy/White', 'Green/White'], sizes: ['S', 'M', 'L', 'XL'], tags: ['varsity', 'streetwear'], images: [image('photo-1544923246-77307dd654cb', 1000), image('photo-1542291026-7eec264c27ff', 1000), image('photo-1620138546344-7b2c0b05124d', 1000)] },
    { id: 'fh-207', brand: 'Street Muse', title: 'Quilted puffer jacket', category: 'Jackets', gender: 'Unisex', fabric: 'Nylon', price: 3499, mrp: 5499, rating: 4.5, reviews: 620, popularity: 91, inventory: 20, colors: ['Yellow', 'Black', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], tags: ['winter', 'travel'], images: [image('photo-1548883354-7622d03aca27', 1000), image('photo-1551028719-00167b16eac5', 1000), image('photo-1608063615781-e5ef8b139d1b', 1000)] },
    { id: 'fh-208', brand: 'Noir Lane', title: 'Leather biker jacket', category: 'Jackets', gender: 'Unisex', fabric: 'Leather', price: 5999, mrp: 9999, rating: 4.8, reviews: 290, popularity: 93, inventory: 10, colors: ['Black', 'Dark Brown'], sizes: ['S', 'M', 'L', 'XL'], tags: ['leather', 'premium'], images: [image('photo-1551028719-00167b16eac5', 1000), image('photo-1544923246-77307dd654cb', 1000), image('photo-1620138546344-7b2c0b05124d', 1000)] },
    { id: 'fh-209', brand: 'Monk & Loom', title: 'Classic denim jacket', category: 'Jackets', gender: 'Unisex', fabric: 'Denim', price: 2499, mrp: 3999, rating: 4.4, reviews: 520, popularity: 84, inventory: 30, colors: ['Classic Blue', 'Washed Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'layering'], images: [image('photo-1542291026-7eec264c27ff', 1000), image('photo-1551028719-00167b16eac5', 1000), image('photo-1620138546344-7b2c0b05124d', 1000)] },
    { id: 'fh-210', brand: 'Street Muse', title: 'Cropped windbreaker', category: 'Jackets', gender: 'Women', fabric: 'Nylon', price: 1799, mrp: 2999, rating: 4.4, reviews: 310, popularity: 82, inventory: 22, colors: ['Pastel Pink', 'Sage Green'], sizes: ['XS', 'S', 'M', 'L'], tags: ['active', 'streetwear'], images: [image('photo-1608063615781-e5ef8b139d1b', 1000), image('photo-1542291026-7eec264c27ff', 1000), image('photo-1548883354-7622d03aca27', 1000)] },
    { id: 'fh-211', brand: 'Street Muse', title: 'Sherpa fleece jacket', category: 'Jackets', gender: 'Unisex', fabric: 'Polyester', price: 2799, mrp: 4499, rating: 4.6, reviews: 190, popularity: 86, inventory: 15, colors: ['Ivory', 'Beige', 'Charcoal'], sizes: ['S', 'M', 'L', 'XL'], tags: ['winter', 'basics'], images: [image('photo-1620138546344-7b2c0b05124d', 1000), image('photo-1548883354-7622d03aca27', 1000), image('photo-1551028719-00167b16eac5', 1000)] },
    { id: 'fh-241', brand: 'Noir Lane', title: 'Classic trench coat', category: 'Jackets', gender: 'Unisex', fabric: 'Cotton', price: 6999, mrp: 10999, rating: 4.8, reviews: 110, popularity: 88, inventory: 8, colors: ['Beige', 'Black'], sizes: ['S', 'M', 'L', 'XL'], tags: ['formal', 'premium'], images: [image('photo-1591047139829-d91aecb6caea', 1000), image('photo-1539571696357-5a69c17a67c6', 1000), image('photo-1551028719-00167b16eac5', 1000)] },
    { id: 'fh-242', brand: 'Street Muse', title: 'Technical active shell', category: 'Jackets', gender: 'Unisex', fabric: 'Nylon', price: 3999, mrp: 5999, rating: 4.5, reviews: 85, popularity: 80, inventory: 12, colors: ['Red', 'Cobalt'], sizes: ['S', 'M', 'L', 'XL'], tags: ['active', 'sports'], images: [image('photo-1542291026-7eec264c27ff', 1000), image('photo-1608063615781-e5ef8b139d1b', 1000), image('photo-1548883354-7622d03aca27', 1000)] },

    // === Footwear ===
    { id: 'fh-216', brand: 'Aurelia', title: 'Block heel mules', category: 'Footwear', gender: 'Women', fabric: 'Leather', price: 3999, mrp: 5999, rating: 4.6, reviews: 380, popularity: 86, inventory: 14, colors: ['Nude', 'Black', 'White'], sizes: ['5', '6', '7', '8'], tags: ['party', 'premium'], images: [image('photo-1543163521-1bf539c55dd2', 1000), image('photo-1514989940723-e8e5163ccbe8', 1000), image('photo-1595950653106-6c9ebd614d3a', 1000)] },
    { id: 'fh-217', brand: 'Kairaa', title: 'Braided flat sandals', category: 'Footwear', gender: 'Women', fabric: 'Leather', price: 1799, mrp: 2999, rating: 4.4, reviews: 720, popularity: 84, inventory: 28, colors: ['Tan', 'Brown', 'Black'], sizes: ['5', '6', '7', '8', '9'], tags: ['resort', 'goa', 'vacation'], images: [image('photo-1514989940723-e8e5163ccbe8', 1000), image('photo-1543163521-1bf539c55dd2', 1000), image('photo-1595950653106-6c9ebd614d3a', 1000)] },
    { id: 'fh-261', brand: 'Noir Lane', title: 'Premium leather loafers', category: 'Footwear', gender: 'Men', fabric: 'Leather', price: 5999, mrp: 8999, rating: 4.8, reviews: 150, popularity: 90, inventory: 10, colors: ['Black', 'Oxblood'], sizes: ['7', '8', '9', '10'], tags: ['formal', 'premium'], images: [image('photo-1560343090-f0409e92791a', 1000), image('photo-1549298916-b41d501d3772', 1000), image('photo-1539185441755-769473a23570', 1000)] },
    { id: 'fh-262', brand: 'Street Muse', title: 'Retro runner sneakers', category: 'Footwear', gender: 'Unisex', fabric: 'Nylon', price: 4599, mrp: 6999, rating: 4.7, reviews: 410, popularity: 89, inventory: 18, colors: ['White/Grey', 'Beige/Brown'], sizes: ['6', '7', '8', '9', '10'], tags: ['streetwear', 'basics'], images: [image('photo-1549298916-b41d501d3772', 1000), image('photo-1595950653106-6c9ebd614d3a', 1000), image('photo-1606107557195-0e29a4b5b4aa', 1000)] },
    { id: 'fh-263', brand: 'Monk & Loom', title: 'Classic white tennis shoes', category: 'Footwear', gender: 'Unisex', fabric: 'Canvas', price: 2999, mrp: 4499, rating: 4.5, reviews: 620, popularity: 85, inventory: 24, colors: ['White'], sizes: ['6', '7', '8', '9', '10'], tags: ['basics', 'travel'], images: [image('photo-1608231387042-66d1773070a5', 1000), image('photo-1549298916-b41d501d3772', 1000), image('photo-1606107557195-0e29a4b5b4aa', 1000)] },
    { id: 'fh-264', brand: 'Luxe Label', title: 'Suede Chelsea boots', category: 'Footwear', gender: 'Men', fabric: 'Suede', price: 7999, mrp: 11999, rating: 4.8, reviews: 80, popularity: 88, inventory: 8, colors: ['Tan', 'Charcoal'], sizes: ['8', '9', '10'], tags: ['luxury', 'premium'], images: [image('photo-1539185441755-769473a23570', 1000), image('photo-1560343090-f0409e92791a', 1000), image('photo-1549298916-b41d501d3772', 1000)] },
    { id: 'fh-265', brand: 'Vogue Essence', title: 'Strappy stiletto sandals', category: 'Footwear', gender: 'Women', fabric: 'Leather', price: 4999, mrp: 7499, rating: 4.6, reviews: 190, popularity: 83, inventory: 12, colors: ['Gold', 'Silver', 'Black'], sizes: ['5', '6', '7', '8'], tags: ['party', 'premium'], images: [image('photo-1543163521-1bf539c55dd2', 1000), image('photo-1514989940723-e8e5163ccbe8', 1000), image('photo-1595950653106-6c9ebd614d3a', 1000)] },
    { id: 'fh-266', brand: 'Street Muse', title: 'Knit running shoes', category: 'Footwear', gender: 'Unisex', fabric: 'Mesh', price: 3499, mrp: 5499, rating: 4.4, reviews: 310, popularity: 81, inventory: 20, colors: ['Triple Black', 'Grey'], sizes: ['6', '7', '8', '9', '10'], tags: ['active', 'basics'], images: [image('photo-1606107557195-0e29a4b5b4aa', 1000), image('photo-1549298916-b41d501d3772', 1000), image('photo-1595950653106-6c9ebd614d3a', 1000)] },

    // === Bags ===
    { id: 'fh-218', brand: 'Monk & Loom', title: 'Canvas weekender bag', category: 'Bags', gender: 'Unisex', fabric: 'Canvas', price: 2799, mrp: 4499, rating: 4.5, reviews: 430, popularity: 84, inventory: 16, colors: ['Olive', 'Navy', 'Stone'], sizes: ['One Size'], tags: ['travel', 'basics'], images: [image('photo-1590874103328-eac38a683ce7', 1000), image('photo-1548036328-c9fa89d128fa', 1000), image('photo-1622560480605-d83c853bc5c3', 1000)] },
    { id: 'fh-219', brand: 'Kairaa', title: 'Rattan wicker basket bag', category: 'Bags', gender: 'Women', fabric: 'Rattan', price: 1499, mrp: 2499, rating: 4.3, reviews: 280, popularity: 80, inventory: 20, colors: ['Natural', 'White'], sizes: ['One Size'], tags: ['resort', 'vacation', 'goa'], images: [image('photo-1566150905458-1bf1fc15a7a5', 1000), image('photo-1548036328-c9fa89d128fa', 1000), image('photo-1524498250077-390f9e378db0', 1000)] },
    { id: 'fh-220', brand: 'Street Muse', title: 'Mini urban backpack', category: 'Bags', gender: 'Unisex', fabric: 'Nylon', price: 1999, mrp: 3299, rating: 4.5, reviews: 960, popularity: 90, inventory: 32, colors: ['Black', 'Navy', 'Olive'], sizes: ['One Size'], tags: ['basics', 'travel', 'workwear'], images: [image('photo-1622560480605-d83c853bc5c3', 1000), image('photo-1590874103328-eac38a683ce7', 1000), image('photo-1548036328-c9fa89d128fa', 1000)] },
    { id: 'fh-271', brand: 'Noir Lane', title: 'Structured leather tote', category: 'Bags', gender: 'Women', fabric: 'Leather', price: 6999, mrp: 9999, rating: 4.7, reviews: 180, popularity: 88, inventory: 10, colors: ['Black', 'Tan'], sizes: ['One Size'], tags: ['workwear', 'premium'], images: [image('photo-1584917865442-de89df76afd3', 1000), image('photo-1548036328-c9fa89d128fa', 1000), image('photo-1524498250077-390f9e378db0', 1000)] },
    { id: 'fh-272', brand: 'Street Muse', title: 'Nylon cross-body bag', category: 'Bags', gender: 'Unisex', fabric: 'Nylon', price: 1599, mrp: 2499, rating: 4.4, reviews: 310, popularity: 83, inventory: 22, colors: ['Orange', 'Black', 'Olive'], sizes: ['One Size'], tags: ['streetwear', 'basics'], images: [image('photo-1590874103328-eac38a683ce7', 1000), image('photo-1622560480605-d83c853bc5c3', 1000), image('photo-1548036328-c9fa89d128fa', 1000)] },
    { id: 'fh-273', brand: 'Luxe Label', title: 'Metallic evening clutch bag', category: 'Bags', gender: 'Women', fabric: 'Metal', price: 3299, mrp: 4999, rating: 4.6, reviews: 85, popularity: 82, inventory: 12, colors: ['Silver', 'Gold'], sizes: ['One Size'], tags: ['party', 'luxury'], images: [image('photo-1594223274512-ad4803739b7c', 1000), image('photo-1524498250077-390f9e378db0', 1000), image('photo-1584917865442-de89df76afd3', 1000)] },
    { id: 'fh-274', brand: 'Noir Lane', title: 'Leather laptop messenger bag', category: 'Bags', gender: 'Men', fabric: 'Leather', price: 8999, mrp: 13999, rating: 4.8, reviews: 140, popularity: 91, inventory: 6, colors: ['Dark Brown', 'Black'], sizes: ['One Size'], tags: ['workwear', 'premium'], images: [image('photo-1600857062241-98e5dba7f214', 1000), image('photo-1548036328-c9fa89d128fa', 1000), image('photo-1584917865442-de89df76afd3', 1000)] },
    { id: 'fh-275', brand: 'Monk & Loom', title: 'Casual canvas tote bag', category: 'Bags', gender: 'Unisex', fabric: 'Canvas', price: 999, mrp: 1599, rating: 4.3, reviews: 520, popularity: 80, inventory: 40, colors: ['Natural', 'Olive'], sizes: ['One Size'], tags: ['basics', 'travel'], images: [image('photo-1548036328-c9fa89d128fa', 1000), image('photo-1622560480605-d83c853bc5c3', 1000), image('photo-1590874103328-eac38a683ce7', 1000)] },

    // === Accessories ===
    { id: 'fh-221', brand: 'Vogue Essence', title: 'Pearl layered necklace', category: 'Accessories', gender: 'Women', fabric: 'Metal', price: 1499, mrp: 2499, rating: 4.5, reviews: 290, popularity: 84, inventory: 20, colors: ['Pearl White'], sizes: ['One Size'], tags: ['party', 'basics'], images: [image('photo-1599643478518-a784e5dc4c8f', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-222', brand: 'Noir Lane', title: 'Silk pocket square accessory', category: 'Accessories', gender: 'Men', fabric: 'Silk', price: 899, mrp: 1499, rating: 4.6, reviews: 150, popularity: 81, inventory: 15, colors: ['Grey', 'Navy', 'Maroon'], sizes: ['One Size'], tags: ['formal', 'basics'], images: [image('photo-1589363460779-cd717fcbaee4', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-223', brand: 'Vogue Essence', title: 'Leather belt tan', category: 'Accessories', gender: 'Unisex', fabric: 'Leather', price: 1299, mrp: 2199, rating: 4.6, reviews: 520, popularity: 85, inventory: 25, colors: ['Tan', 'Black', 'Brown'], sizes: ['S', 'M', 'L'], tags: ['formal', 'basics', 'workwear'], images: [image('photo-1624222247344-550fb8ecf782', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-225', brand: 'Noir Lane', title: 'Aviator sunglasses', category: 'Accessories', gender: 'Unisex', fabric: 'Metal', price: 2999, mrp: 4999, rating: 4.8, reviews: 760, popularity: 93, inventory: 15, colors: ['Gold', 'Silver', 'Black'], sizes: ['One Size'], tags: ['travel', 'premium', 'luxury'], images: [image('photo-1511499767150-a48a237f0083', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1599643478518-a784e5dc4c8f', 1000)] },
    { id: 'fh-226', brand: 'Street Muse', title: 'Beanie wool cap', category: 'Accessories', gender: 'Unisex', fabric: 'Wool', price: 799, mrp: 1299, rating: 4.3, reviews: 890, popularity: 86, inventory: 40, colors: ['Black', 'Grey', 'Olive', 'Cream'], sizes: ['One Size'], tags: ['basics', 'travel'], images: [image('photo-1576871337622-98d48d4aa53e', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-281', brand: 'Street Muse', title: 'Silver chain necklace', category: 'Accessories', gender: 'Unisex', fabric: 'Metal', price: 1499, mrp: 2499, rating: 4.5, reviews: 290, popularity: 84, inventory: 20, colors: ['Silver'], sizes: ['One Size'], tags: ['basics', 'streetwear'], images: [image('photo-1599643478518-a784e5dc4c8f', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-282', brand: 'Monk & Loom', title: 'Wool oversized scarf', category: 'Accessories', gender: 'Unisex', fabric: 'Wool', price: 1899, mrp: 2999, rating: 4.6, reviews: 150, popularity: 81, inventory: 15, colors: ['Grey', 'Camel', 'Navy'], sizes: ['One Size'], tags: ['basics', 'travel'], images: [image('photo-1602810318383-e386cc2a3ccf', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },
    { id: 'fh-283', brand: 'Kairaa', title: 'Straw sun hat accessory', category: 'Accessories', gender: 'Women', fabric: 'Straw', price: 999, mrp: 1699, rating: 4.4, reviews: 410, popularity: 82, inventory: 22, colors: ['Natural', 'Black'], sizes: ['One Size'], tags: ['resort', 'goa', 'vacation'], images: [image('photo-1572426149021-995c73c886eb', 1000), image('photo-1618354691373-d851c5c3a990', 1000), image('photo-1511499767150-a48a237f0083', 1000)] },

    // === Kids ===
    { id: 'fh-301', brand: 'Kairaa Kids', title: 'Cotton overalls set', category: 'Kids', gender: 'Unisex', fabric: 'Cotton', price: 1299, mrp: 1999, rating: 4.5, reviews: 80, popularity: 84, inventory: 25, colors: ['Denim', 'Mustard'], sizes: ['2-3Y', '4-5Y', '6-7Y'], tags: ['playwear', 'cotton'], images: [image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1503919545889-aef636e10ad4', 1000), image('photo-1519689680058-324335c77eba', 1000)] },
    { id: 'fh-302', brand: 'Aurelia Mini', title: 'Floral cotton sundress', category: 'Kids', gender: 'Women', fabric: 'Cotton', price: 1499, mrp: 2299, rating: 4.7, reviews: 120, popularity: 89, inventory: 18, colors: ['Floral Pink', 'Floral Yellow'], sizes: ['3-4Y', '5-6Y', '7-8Y'], tags: ['summer', 'party'], images: [image('photo-1503919545889-aef636e10ad4', 1000), image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1519689680058-324335c77eba', 1000)] },
    { id: 'fh-303', brand: 'Street Muse Jr', title: 'Printed hoodie sweatshirt', category: 'Kids', gender: 'Men', fabric: 'Cotton', price: 1199, mrp: 1799, rating: 4.4, reviews: 95, popularity: 81, inventory: 30, colors: ['Black', 'Grey'], sizes: ['4-5Y', '6-7Y', '8-9Y'], tags: ['basics', 'winter'], images: [image('photo-1621452773781-0f992fd1f5cb', 1000), image('photo-1519689680058-324335c77eba', 1000), image('photo-1519238263530-99bdd11df2ea', 1000)] },
    { id: 'fh-304', brand: 'Monk & Loom Kids', title: 'Soft denim dungarees', category: 'Kids', gender: 'Unisex', fabric: 'Denim', price: 1799, mrp: 2799, rating: 4.6, reviews: 60, popularity: 85, inventory: 15, colors: ['Classic Blue', 'Light Blue'], sizes: ['2-3Y', '4-5Y', '6-7Y'], tags: ['playwear', 'denim'], images: [image('photo-1519689680058-324335c77eba', 1000), image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1503919545889-aef636e10ad4', 1000)] },
    { id: 'fh-305', brand: 'Kairaa Kids', title: 'Cozy fleece pajama set', category: 'Kids', gender: 'Unisex', fabric: 'Fleece', price: 999, mrp: 1499, rating: 4.8, reviews: 140, popularity: 90, inventory: 40, colors: ['Starry Blue', 'Cloud Pink'], sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], tags: ['sleepwear', 'winter'], images: [image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1519689680058-324335c77eba', 1000), image('photo-1503919545889-aef636e10ad4', 1000)] },
    { id: 'fh-306', brand: 'Street Muse Jr', title: 'Graphic crewneck tee', category: 'Kids', gender: 'Unisex', fabric: 'Cotton', price: 599, mrp: 999, rating: 4.3, reviews: 220, popularity: 86, inventory: 50, colors: ['White', 'Yellow', 'Black'], sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'], tags: ['basics', 'summer'], images: [image('photo-1503919545889-aef636e10ad4', 1000), image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1519689680058-324335c77eba', 1000)] },
    { id: 'fh-307', brand: 'Street Muse Jr', title: 'Canvas active sneakers', category: 'Kids', gender: 'Unisex', fabric: 'Canvas', price: 1899, mrp: 2999, rating: 4.5, reviews: 75, popularity: 83, inventory: 20, colors: ['Red', 'White', 'Blue'], sizes: ['10C', '11C', '12C', '1Y', '2Y'], tags: ['footwear', 'playwear'], images: [image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1503919545889-aef636e10ad4', 1000), image('photo-1519689680058-324335c77eba', 1000)] },
    { id: 'fh-308', brand: 'Monk & Loom Kids', title: 'Knit pom-pom beanie', category: 'Kids', gender: 'Unisex', fabric: 'Wool', price: 499, mrp: 799, rating: 4.6, reviews: 110, popularity: 82, inventory: 35, colors: ['Grey', 'Mustard', 'Cream'], sizes: ['One Size'], tags: ['accessories', 'winter'], images: [image('photo-1576871337622-98d48d4aa53e', 1000), image('photo-1519238263530-99bdd11df2ea', 1000), image('photo-1503919545889-aef636e10ad4', 1000)] }
,

    // === Home ===
    { id: 'fh-401', brand: 'Loom & Nest', title: 'Scented soy candle set', category: 'Home', gender: 'Unisex', fabric: 'Wax', price: 1199, mrp: 1899, rating: 4.8, reviews: 310, popularity: 89, inventory: 15, colors: ['Lavender & Sage', 'Amber & Oak'], sizes: ['Set of 2'], tags: ['decor', 'fragrance'], images: [image('photo-1603006905003-be475563bc59', 1000), image('photo-1612196808214-b8e1d6145a8c', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },
    { id: 'fh-402', brand: 'Loom & Nest', title: 'Linen throw pillow cover', category: 'Home', gender: 'Unisex', fabric: 'Linen', price: 899, mrp: 1499, rating: 4.6, reviews: 180, popularity: 83, inventory: 25, colors: ['Oatmeal', 'Sage', 'Charcoal'], sizes: ['16x16 inch'], tags: ['decor', 'living'], images: [image('photo-1584100936595-c0654b55a2e2', 1000), image('photo-1600121848594-d8644e57abab', 1000), image('photo-1612196808214-b8e1d6145a8c', 1000)] },
    { id: 'fh-403', brand: 'Artisan Loom', title: 'Woven cotton rug', category: 'Home', gender: 'Unisex', fabric: 'Cotton', price: 3499, mrp: 5499, rating: 4.5, reviews: 90, popularity: 87, inventory: 8, colors: ['Natural/Black', 'Natural/Grey'], sizes: ['4x6 ft'], tags: ['decor', 'rug'], images: [image('photo-1600121848594-d8644e57abab', 1000), image('photo-1584100936595-c0654b55a2e2', 1000), image('photo-1612196808214-b8e1d6145a8c', 1000)] },
    { id: 'fh-404', brand: 'Artisan Loom', title: 'Ceramic vase minimal', category: 'Home', gender: 'Unisex', fabric: 'Ceramic', price: 1499, mrp: 2299, rating: 4.7, reviews: 140, popularity: 85, inventory: 12, colors: ['Matte White', 'Matte Grey'], sizes: ['Medium'], tags: ['decor', 'ceramic'], images: [image('photo-1612196808214-b8e1d6145a8c', 1000), image('photo-1603006905003-be475563bc59', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },
    { id: 'fh-405', brand: 'Loom & Nest', title: 'Waffle knit bath towel', category: 'Home', gender: 'Unisex', fabric: 'Cotton', price: 1299, mrp: 1999, rating: 4.6, reviews: 210, popularity: 84, inventory: 30, colors: ['Stone', 'Olive', 'White'], sizes: ['Standard'], tags: ['bath', 'basics'], images: [image('photo-1616627547277-25b85a69f697', 1000), image('photo-1603006905003-be475563bc59', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },
    { id: 'fh-406', brand: 'Vogue Home', title: 'Silk sleep mask & pillowcase', category: 'Home', gender: 'Unisex', fabric: 'Silk', price: 2499, mrp: 3999, rating: 4.9, reviews: 130, popularity: 91, inventory: 14, colors: ['Champagne', 'Silver', 'Black'], sizes: ['Queen'], tags: ['bedroom', 'premium'], images: [image('photo-1631679706909-1844bbd07221', 1000), image('photo-1600121848594-d8644e57abab', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },
    { id: 'fh-407', brand: 'Artisan Loom', title: 'Rattan storage basket', category: 'Home', gender: 'Unisex', fabric: 'Rattan', price: 1799, mrp: 2799, rating: 4.4, reviews: 98, popularity: 80, inventory: 16, colors: ['Natural'], sizes: ['Large'], tags: ['decor', 'storage'], images: [image('photo-1532372320572-cda25653a26d', 1000), image('photo-1603006905003-be475563bc59', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },
    { id: 'fh-408', brand: 'Luxe Nest', title: 'Abstract canvas wall art', category: 'Home', gender: 'Unisex', fabric: 'Canvas', price: 4999, mrp: 7999, rating: 4.7, reviews: 75, popularity: 86, inventory: 6, colors: ['Monochrome', 'Warm Earth'], sizes: ['24x36 inch'], tags: ['decor', 'art'], images: [image('photo-1600585154340-be6161a56a0c', 1000), image('photo-1603006905003-be475563bc59', 1000), image('photo-1584100936595-c0654b55a2e2', 1000)] },

    // === Beauty ===
    { id: 'fh-501', brand: 'Aura Skin', title: 'Hydrating facial serum', category: 'Beauty', gender: 'Unisex', fabric: 'Glass', price: 1899, mrp: 2799, rating: 4.8, reviews: 450, popularity: 93, inventory: 20, colors: ['Standard'], sizes: ['50ml'], tags: ['skincare', 'hydration', 'feed'], images: [image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1598440947619-2c35fc9aa908', 1000), image('photo-1617897903246-719242758050', 1000)] },
    { id: 'fh-502', brand: 'Vogue Beauty', title: 'Matte velvet lipstick', category: 'Beauty', gender: 'Women', fabric: 'Wax', price: 1299, mrp: 1899, rating: 4.6, reviews: 320, popularity: 88, inventory: 25, colors: ['Siren Red', 'Dusty Rose', 'Berry Blush'], sizes: ['Standard'], tags: ['makeup', 'lips'], images: [image('photo-1586495777744-4413f21062fa', 1000), image('photo-1596462502278-27bfdc403348', 1000), image('photo-1608248597279-f99d160bfcbc', 1000)] },
    { id: 'fh-503', brand: 'Aura Skin', title: 'Mineral sunscreen SPF 50', category: 'Beauty', gender: 'Unisex', fabric: 'Plastic', price: 999, mrp: 1499, rating: 4.5, reviews: 580, popularity: 90, inventory: 35, colors: ['Standard'], sizes: ['80ml'], tags: ['skincare', 'sun protection'], images: [image('photo-1598440947619-2c35fc9aa908', 1000), image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1617897903246-719242758050', 1000)] },
    { id: 'fh-504', brand: 'Aura Skin', title: 'Rose water facial mist', category: 'Beauty', gender: 'Unisex', fabric: 'Glass', price: 799, mrp: 1199, rating: 4.4, reviews: 290, popularity: 82, inventory: 40, colors: ['Standard'], sizes: ['100ml'], tags: ['skincare', 'toner'], images: [image('photo-1617897903246-719242758050', 1000), image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1598440947619-2c35fc9aa908', 1000)] },
    { id: 'fh-505', brand: 'Kairaa Beauty', title: 'Nourishing hair elixir', category: 'Beauty', gender: 'Unisex', fabric: 'Glass', price: 2499, mrp: 3699, rating: 4.7, reviews: 160, popularity: 86, inventory: 15, colors: ['Standard'], sizes: ['100ml'], tags: ['haircare', 'premium'], images: [image('photo-1526947425960-945c6e72858f', 1000), image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1617897903246-719242758050', 1000)] },
    { id: 'fh-506', brand: 'Aura Skin', title: 'Clay detox face mask', category: 'Beauty', gender: 'Unisex', fabric: 'Plastic', price: 1499, mrp: 2199, rating: 4.6, reviews: 240, popularity: 84, inventory: 22, colors: ['Standard'], sizes: ['100g'], tags: ['skincare', 'detox', 'feed'], images: [image('photo-1556228720-195a672e8a03', 1000), image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1617897903246-719242758050', 1000)] },
    { id: 'fh-507', brand: 'Vogue Beauty', title: 'Vegan makeup brush set', category: 'Beauty', gender: 'Women', fabric: 'Synthetic', price: 2999, mrp: 4499, rating: 4.8, reviews: 110, popularity: 87, inventory: 12, colors: ['Rose Gold'], sizes: ['Set of 10'], tags: ['makeup', 'brushes'], images: [image('photo-1596462502278-27bfdc403348', 1000), image('photo-1586495777744-4413f21062fa', 1000), image('photo-1608248597279-f99d160bfcbc', 1000)] },
    { id: 'fh-508', brand: 'Kairaa Beauty', title: 'Lavender body scrub', category: 'Beauty', gender: 'Unisex', fabric: 'Plastic', price: 1199, mrp: 1799, rating: 4.5, reviews: 190, popularity: 81, inventory: 28, colors: ['Standard'], sizes: ['250g'], tags: ['bodycare', 'relaxation'], images: [image('photo-1601049541289-9b1b7bbbfe19', 1000), image('photo-1608248597279-f99d160bfcbc', 1000), image('photo-1617897903246-719242758050', 1000)] },

    // === Genz ===
    { id: 'fh-601', brand: 'Street Muse', title: 'Retro graphic oversized tee', category: 'Genz', gender: 'Unisex', fabric: 'Cotton', price: 1299, mrp: 1999, rating: 4.6, reviews: 890, popularity: 94, inventory: 30, colors: ['Charcoal', 'Off-White'], sizes: ['S', 'M', 'L', 'XL'], tags: ['oversized', 'streetwear', 'basics', 'feed'], images: [image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000), image('photo-1608231387042-66d1773070a5', 1000)] },
    { id: 'fh-602', brand: 'Street Muse', title: 'Baggy cargo utility jeans', category: 'Genz', gender: 'Unisex', fabric: 'Denim', price: 2499, mrp: 3999, rating: 4.7, reviews: 650, popularity: 92, inventory: 18, colors: ['Vintage Blue', 'Washed Black'], sizes: ['28', '30', '32', '34'], tags: ['baggy', 'denim', 'streetwear', 'feed'], images: [image('photo-1541099649105-f69ad21f3246', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1608231387042-66d1773070a5', 1000)] },
    { id: 'fh-603', brand: 'Vogue Essence', title: 'Cropped checkerboard cardigan', category: 'Genz', gender: 'Women', fabric: 'Acrylic', price: 1999, mrp: 2999, rating: 4.5, reviews: 310, popularity: 87, inventory: 15, colors: ['Black/White', 'Green/White'], sizes: ['XS', 'S', 'M'], tags: ['knitwear', 'cropped'], images: [image('photo-1618335829737-2228915674e0', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] },
    { id: 'fh-604', brand: 'Street Muse', title: 'Y2K wire-frame sunglasses', category: 'Genz', gender: 'Unisex', fabric: 'Metal', price: 899, mrp: 1499, rating: 4.4, reviews: 420, popularity: 89, inventory: 25, colors: ['Silver/Blue', 'Silver/Silver'], sizes: ['One Size'], tags: ['accessories', 'eyewear'], images: [image('photo-1602810316498-ab67cf68c8e1', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] },
    { id: 'fh-605', brand: 'Street Muse', title: 'Tie-dye fleece joggers', category: 'Genz', gender: 'Unisex', fabric: 'Fleece', price: 1799, mrp: 2799, rating: 4.3, reviews: 280, popularity: 82, inventory: 22, colors: ['Sunset', 'Cloudy Blue'], sizes: ['S', 'M', 'L', 'XL'], tags: ['basics', 'loungewear'], images: [image('photo-1556905055-8f358a7a47b2', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] },
    { id: 'fh-606', brand: 'Street Muse', title: 'Nylon utility chest bag', category: 'Genz', gender: 'Unisex', fabric: 'Nylon', price: 1499, mrp: 2299, rating: 4.5, reviews: 190, popularity: 84, inventory: 20, colors: ['Black', 'Tactical Olive'], sizes: ['One Size'], tags: ['bags', 'tactical'], images: [image('photo-1622560480605-d83c853bc5c3', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] },
    { id: 'fh-607', brand: 'Street Muse', title: 'Platform high-top sneakers', category: 'Genz', gender: 'Unisex', fabric: 'Canvas', price: 3999, mrp: 5999, rating: 4.8, reviews: 520, popularity: 93, inventory: 12, colors: ['Triple White', 'Black/White'], sizes: ['6', '7', '8', '9', '10'], tags: ['footwear', 'platform', 'feed'], images: [image('photo-1608231387042-66d1773070a5', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] },
    { id: 'fh-608', brand: 'Street Muse', title: 'Chunky resin ring set', category: 'Genz', gender: 'Women', fabric: 'Resin', price: 499, mrp: 799, rating: 4.6, reviews: 150, popularity: 85, inventory: 45, colors: ['Multi-color'], sizes: ['One Size'], tags: ['accessories', 'rings'], images: [image('photo-1535043934128-cf0b28d52f95', 1000), image('photo-1554568218-0f1715e72254', 1000), image('photo-1541099649105-f69ad21f3246', 1000)] }
  ];

  const trends = [
    { title: 'Goa Resort Looks', copy: 'Breezy linens and travel sneakers', product: 'fh-108' },
    { title: 'Boardroom Black', copy: 'Sharp shirts, totes, and blazers', product: 'fh-101' },
    { title: 'Evening Satin', copy: 'Dresses, heels, and luminous bags', product: 'fh-102' },
    { title: 'Airport Luxe', copy: 'Soft overshirts and runner sneakers', product: 'fh-262' },
    { title: 'Quiet Tailoring', copy: 'Minimal shapes for repeat wear', product: 'fh-205' }
  ];

  const feedPosts = [
    {
      id: 'feed-1',
      image: image('photo-1483985988355-763728e1935b', 900),
      caption: 'A satin evening palette with polished accessories.',
      tags: [{ productId: 'fh-102', x: 58, y: 42 }, { productId: 'fh-221', x: 33, y: 66 }]
    },
    {
      id: 'feed-2',
      image: image('photo-1529139574466-a303027c1d8b', 900),
      caption: 'Resort textures for warm city weekends.',
      tags: [{ productId: 'fh-108', x: 48, y: 50 }, { productId: 'fh-112', x: 72, y: 70 }]
    },
    {
      id: 'feed-3',
      image: image('photo-1492447166138-50c3889fccb1', 900),
      caption: 'Black formal pieces that stay easy.',
      tags: [{ productId: 'fh-101', x: 45, y: 38 }, { productId: 'fh-214', x: 58, y: 72 }]
    },
    {
      id: 'feed-4',
      image: image('photo-1601924994987-69e26d50dc26', 900),
      caption: 'Sunday self-care rituals: clean, hydrate, and refresh.',
      tags: [{ productId: 'fh-501', x: 35, y: 50 }, { productId: 'fh-506', x: 65, y: 60 }]
    },
    {
      id: 'feed-5',
      image: image('photo-1542291026-7eec264c27ff', 900),
      caption: 'Varsity drops and baggy utility layers for Gen Z style.',
      tags: [{ productId: 'fh-601', x: 40, y: 30 }, { productId: 'fh-602', x: 50, y: 65 }, { productId: 'fh-607', x: 55, y: 80 }]
    },
    {
      id: 'feed-6',
      image: image('photo-1503919545889-aef636e10ad4', 900),
      caption: 'Playwear sets designed for active, sunny kids weekends.',
      tags: [{ productId: 'fh-301', x: 45, y: 40 }, { productId: 'fh-307', x: 50, y: 75 }]
    },
    {
      id: 'feed-7',
      image: image('photo-1591348278863-a8fb3887e2aa', 900),
      caption: 'Tan corduroy blazer styled with linen trousers for a modern workday look.',
      tags: [{ productId: 'fh-205', x: 45, y: 35 }, { productId: 'fh-251', x: 55, y: 70 }]
    },
    {
      id: 'feed-8',
      image: image('photo-1590874103328-eac38a683ce7', 900),
      caption: 'Minimalist travel essentials: woven leather slides and a premium weekend tote.',
      tags: [{ productId: 'fh-218', x: 40, y: 60 }, { productId: 'fh-263', x: 60, y: 80 }]
    }
  ];

  const defaultAddresses = [
    {
      id: 'home',
      name: 'Home',
      line: '120 Park View, Indore, Madhya Pradesh',
      eta: 'Standard - arrives in 4 days'
    },
    {
      id: 'office',
      name: 'Office',
      line: 'FashionHub Studio, MG Road, Bengaluru',
      eta: 'Express - arrives tomorrow'
    },
    {
      id: 'gift',
      name: 'Gift',
      line: 'Sea Pearl Villa, Candolim, Goa',
      eta: 'Resort delivery - arrives Friday'
    }
  ];

  function read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function requireAuth() {
    const user = read(STORAGE.user, null);
    if (!user) {
      sessionStorage.setItem('fh_redirect', window.location.href);
      window.location.href = 'auth.html';
      return false;
    }
    return true;
  }

  function registerUser(name, email, password) {
    const users = read(STORAGE.users, []);
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { name, email, password };
    users.push(newUser);
    write(STORAGE.users, users);
    write(STORAGE.user, { name: newUser.name, identity: newUser.email });
  }

  function loginUser(email, password) {
    const users = read(STORAGE.users, []);
    const match = users.find(u => u.email === email && u.password === password);
    if (!match) {
      throw new Error('Invalid email or password');
    }
    write(STORAGE.user, { name: match.name, identity: match.email });
  }

  function logoutUser() {
    localStorage.removeItem(STORAGE.user);
    window.location.reload();
  }

  const demoReviews = [
    { author: 'Sarah K.', rating: 5, date: '2026-06-10', text: 'Absolutely love the quality and fit. Will definitely buy again in another color!' },
    { author: 'Michael R.', rating: 4, date: '2026-06-08', text: 'Great fabric and very comfortable. Sizing is slightly large but manageable.' },
    { author: 'Priya M.', rating: 5, date: '2026-06-02', text: 'Looks exactly like the pictures. The material feels very premium and luxurious.' }
  ];

  function getReviews(productId) {
    const allReviews = read(STORAGE.reviews, {});
    const productReviews = allReviews[productId] || [];
    return [...productReviews, ...demoReviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  function addReview(productId, rating, text) {
    if (!requireAuth()) return;
    const user = read(STORAGE.user, null);
    const allReviews = read(STORAGE.reviews, {});
    if (!allReviews[productId]) allReviews[productId] = [];
    allReviews[productId].push({
      author: user.name,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      text
    });
    write(STORAGE.reviews, allReviews);
  }

  function money(amount) {
    return `Rs ${Math.max(0, Math.round(amount)).toLocaleString('en-IN')}`;
  }

  function getProduct(id) {
    return products.find((product) => product.id === id) || products[0];
  }

  function discountPercent(product) {
    return Math.round(((product.mrp - product.price) / product.mrp) * 100);
  }

  function getCart(includeSaved = true) {
    const cart = read(STORAGE.cart, []);
    return includeSaved ? cart : cart.filter((item) => !item.saved);
  }

  function setCart(cart) {
    write(STORAGE.cart, cart);
    updateCounts();
    window.dispatchEvent(new CustomEvent('fashionhub:cart'));
  }

  function getWishlist() {
    return read(STORAGE.wishlist, []);
  }

  function setWishlist(ids) {
    write(STORAGE.wishlist, Array.from(new Set(ids)));
    updateCounts();
    window.dispatchEvent(new CustomEvent('fashionhub:wishlist'));
  }

  function addToCart(productId, options = {}) {
    if (!requireAuth()) return;
    const product = getProduct(productId);
    const size = options.size || product.sizes[0];
    const color = options.color || product.colors[0];
    const cart = getCart(true);
    const match = cart.find((item) => item.id === productId && item.size === size && item.color === color && !item.saved);
    if (match) {
      match.qty += options.qty || 1;
    } else {
      cart.push({ id: productId, qty: options.qty || 1, size, color, saved: false });
    }
    setCart(cart);
    openCartDrawer();
  }

  function moveToSaved(productId, variant = {}) {
    const cart = getCart(true).map((item) => {
      if (item.id === productId && (!variant.size || item.size === variant.size) && (!variant.color || item.color === variant.color)) {
        return { ...item, saved: true };
      }
      return item;
    });
    setCart(cart);
  }

  function moveToBag(productId, variant = {}) {
    const cart = getCart(true).map((item) => {
      if (item.id === productId && (!variant.size || item.size === variant.size) && (!variant.color || item.color === variant.color)) {
        return { ...item, saved: false };
      }
      return item;
    });
    setCart(cart);
  }

  function removeFromCart(productId, variant = {}) {
    const cart = getCart(true).filter((item) => {
      const sameProduct = item.id === productId;
      const sameSize = !variant.size || item.size === variant.size;
      const sameColor = !variant.color || item.color === variant.color;
      const sameSaved = typeof variant.saved === 'boolean' ? item.saved === variant.saved : true;
      return !(sameProduct && sameSize && sameColor && sameSaved);
    });
    setCart(cart);
  }

  function updateQuantity(productId, qty, variant = {}) {
    const nextQty = Math.max(1, Number(qty) || 1);
    const cart = getCart(true).map((item) => {
      if (item.id === productId && item.size === variant.size && item.color === variant.color && !item.saved) {
        return { ...item, qty: nextQty };
      }
      return item;
    });
    setCart(cart);
  }

  function toggleWishlist(productId) {
    const wishlist = getWishlist();
    const exists = wishlist.includes(productId);
    const next = exists ? wishlist.filter((id) => id !== productId) : [...wishlist, productId];
    setWishlist(next);
    toast(exists ? 'Removed from wishlist' : 'Saved to wishlist');
    document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach((button) => {
      button.classList.toggle('active', !exists);
      button.setAttribute('aria-pressed', String(!exists));
    });
  }

  function cartTotals() {
    const active = getCart(false);
    const subtotal = active.reduce((sum, item) => sum + getProduct(item.id).mrp * item.qty, 0);
    const selling = active.reduce((sum, item) => sum + getProduct(item.id).price * item.qty, 0);
    const discount = subtotal - selling;
    const coupon = selling > 3999 ? 700 : selling > 1499 ? 250 : 0;
    const platform = active.length ? 29 : 0;
    const shipping = !active.length || selling > 999 ? 0 : 99;
    return {
      count: active.reduce((sum, item) => sum + item.qty, 0),
      subtotal,
      selling,
      discount,
      coupon,
      platform,
      shipping,
      total: selling - coupon + platform + shipping,
      couponCode: coupon === 700 ? 'FH700' : coupon === 250 ? 'STYLE250' : 'NONE'
    };
  }

  function renderPricePanel(target, checkout = false) {
    const panel = typeof target === 'string' ? document.querySelector(target) : target;
    if (!panel) return;
    const totals = cartTotals();
    panel.innerHTML = `
      <h2>${checkout ? 'Order summary' : 'Price details'}</h2>
      <div class="price-line"><span>Bag total</span><strong>${money(totals.subtotal)}</strong></div>
      <div class="price-line"><span>Product discount</span><strong>- ${money(totals.discount)}</strong></div>
      <div class="coupon-chip"><span>${totals.couponCode === 'NONE' ? 'No coupon unlocked' : `${totals.couponCode} auto-applied`}</span><strong>- ${money(totals.coupon)}</strong></div>
      <div class="price-line"><span>Platform fee</span><strong>${money(totals.platform)}</strong></div>
      <div class="price-line"><span>Shipping</span><strong>${totals.shipping ? money(totals.shipping) : 'Free'}</strong></div>
      <div class="price-line total"><span>Total</span><strong>${money(totals.total)}</strong></div>
      ${checkout ? '' : '<a class="btn primary full" href="checkout.html">Checkout</a>'}
    `;
  }

  function renderProductCard(product) {
    const reviewText = product.reviews >= 1000 ? (product.reviews / 1000).toFixed(1) + 'k' : product.reviews;
    return `
      <article class="product-card myntra-card">
        <a class="product-media" href="product.html?id=${product.id}" aria-label="${product.brand} ${product.title}">
          <img src="${product.images[0]}" alt="${product.brand} ${product.title}" loading="lazy" onerror="window.FashionHub.handleImageError(this)">
          <div class="rating-badge">
            ${product.rating} <span style="color:#14958f; font-size: 10px;">&#9733;</span> | ${reviewText}
          </div>
        </a>
        <div class="product-body">
          <h3 class="product-brand">${product.brand}</h3>
          <p class="product-title">${product.title}</p>
          <div class="price-row">
            <strong>Rs. ${product.price}</strong>
            <del>Rs. ${product.mrp}</del>
            <span class="discount">(${discountPercent(product)}% OFF)</span>
          </div>
        </div>
      </article>
    `;
  }

  function toast(message) {
    let node = document.querySelector('.toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'toast';
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('show'), 2200);
  }

  function openCartDrawer() {
    const drawer = document.querySelector('#cartDrawer');
    if (!drawer) {
      const el = document.createElement('div');
      el.id = 'cartDrawer';
      el.className = 'cart-drawer';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
      renderCartDrawer();
      setTimeout(() => openCartDrawer(), 10);
      return;
    }
    renderCartDrawer();
    drawer.classList.add('show');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }

  function closeCartDrawer() {
    const drawer = document.querySelector('#cartDrawer');
    if (!drawer) return;
    drawer.classList.remove('show');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }

  function renderCartDrawer() {
    const drawer = document.querySelector('#cartDrawer');
    if (!drawer) return;
    const cart = getCart(false);
    const totals = cartTotals();
    
    drawer.innerHTML = `
      <div class="cart-drawer-overlay" data-close-drawer></div>
      <div class="cart-drawer-content">
        <div class="cart-drawer-head">
          <h2>Your Bag (${totals.count})</h2>
          <button class="modal-close" data-close-drawer aria-label="Close">x</button>
        </div>
        <div class="cart-drawer-body">
          ${cart.length === 0 ? '<div class="empty-state"><p>Your bag is empty.</p></div>' : 
            `<div class="drawer-items">
              ${cart.map(item => {
                const product = getProduct(item.id);
                return `
                  <article class="drawer-item">
                    <img src="${product.images[0]}" alt="${product.title}" onerror="window.FashionHub.handleImageError(this)">
                    <div class="drawer-item-info">
                      <h3>${product.brand}</h3>
                      <p>${product.title}</p>
                      <span class="drawer-item-spec">${item.size} - ${item.color}</span>
                      <div class="drawer-item-actions">
                        <div class="quantity-control small" aria-label="Quantity">
                          <button type="button" data-drawer-qty-minus="${item.id}" data-size="${item.size}" data-color="${item.color}">-</button>
                          <span>${item.qty}</span>
                          <button type="button" data-drawer-qty-plus="${item.id}" data-size="${item.size}" data-color="${item.color}">+</button>
                        </div>
                        <button class="drawer-remove-btn" type="button" data-drawer-remove="${item.id}" data-size="${item.size}" data-color="${item.color}" aria-label="Remove item">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                        <strong class="drawer-item-price">${money(product.price * item.qty)}</strong>
                      </div>
                    </div>
                  </article>
                `;
              }).join('')}
            </div>`
          }
        </div>
        <div class="cart-drawer-foot">
          <div class="price-line total"><span>Total</span><strong>${money(totals.total)}</strong></div>
          <a href="cart.html" class="btn full">View Bag</a>
          <a href="checkout.html" class="btn primary full">Checkout</a>
        </div>
      </div>
    `;
  }

  function buildMegaMenus() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    const links = Array.from(nav.querySelectorAll('a'));
    
    // Clear and build wrapped items
    nav.innerHTML = '';
    
    links.forEach(link => {
      const text = link.textContent.trim().toUpperCase();
      const categories = ['MEN', 'WOMEN', 'KIDS', 'HOME', 'BEAUTY', 'GENZ'];
      
      const wrapper = document.createElement('div');
      wrapper.className = 'mega-menu';
      wrapper.appendChild(link);
      
      if (categories.some(cat => text.includes(cat))) {
        const categoryKey = text.includes('WOMEN') ? 'Women' : 
                            text.includes('MEN') ? 'Men' : 
                            text.includes('KIDS') ? 'Kids' : 
                            text.includes('HOME') ? 'Home' : 
                            text.includes('BEAUTY') ? 'Beauty' : 'Genz';
        
        let filteredProducts = [];
        if (categoryKey === 'Men' || categoryKey === 'Women') {
          filteredProducts = products.filter(p => p.gender === categoryKey);
        } else {
          filteredProducts = products.filter(p => p.category === categoryKey);
        }
        
        const featured = filteredProducts.slice(0, 3);
        
        let subcategories = [];
        if (categoryKey === 'Men') {
          subcategories = [
            { label: 'Shirts', href: 'products.html?gender=Men&category=Shirts' },
            { label: 'Blazers', href: 'products.html?gender=Men&category=Blazers' },
            { label: 'Trousers', href: 'products.html?gender=Men&category=Trousers' },
            { label: 'Jackets', href: 'products.html?gender=Men&category=Jackets' },
            { label: 'Footwear', href: 'products.html?gender=Men&category=Footwear' }
          ];
        } else if (categoryKey === 'Women') {
          subcategories = [
            { label: 'Dresses', href: 'products.html?gender=Women&category=Dresses' },
            { label: 'Blazers', href: 'products.html?gender=Women&category=Blazers' },
            { label: 'Trousers', href: 'products.html?gender=Women&category=Trousers' },
            { label: 'Footwear', href: 'products.html?gender=Women&category=Footwear' },
            { label: 'Bags', href: 'products.html?gender=Women&category=Bags' }
          ];
        } else {
          subcategories = [
            { label: 'New Arrivals', href: `products.html?category=${categoryKey}` },
            { label: 'Best Sellers', href: `products.html?category=${categoryKey}` },
            { label: 'Featured', href: `products.html?category=${categoryKey}` }
          ];
        }
        
        const panel = document.createElement('div');
        panel.className = 'mega-panel';
        
        const linksCol = document.createElement('div');
        linksCol.className = 'mega-col-links';
        linksCol.innerHTML = `
          <h4>Categories</h4>
          ${subcategories.map(sub => `<a href="${sub.href}">${sub.label}</a>`).join('')}
          <a class="mega-view-all" href="${link.getAttribute('href')}">View All →</a>
        `;
        panel.appendChild(linksCol);
        
        featured.forEach(product => {
          const prodCol = document.createElement('a');
          prodCol.className = 'mega-product-card';
          prodCol.setAttribute('href', `product.html?id=${product.id}`);
          prodCol.innerHTML = `
            <div class="mega-product-img">
              <img src="${product.images[0]}" alt="${product.title}" onerror="window.FashionHub.handleImageError(this)">
            </div>
            <div class="mega-product-info">
              <span class="mega-product-brand">${product.brand}</span>
              <span class="mega-product-title">${product.title}</span>
              <span class="mega-product-price">${money(product.price)}</span>
            </div>
          `;
          panel.appendChild(prodCol);
        });
        
        wrapper.appendChild(panel);
      }
      
      nav.appendChild(wrapper);
    });
  }

  function updateCounts() {
    const count = getCart(false).reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('#cartCount').forEach((node) => {
      node.textContent = count;
    });
    document.querySelectorAll('#wishlistCount').forEach((node) => {
      node.textContent = getWishlist().length;
    });
  }

  function buildMobileNav() {
    const target = document.querySelector('.mobile-bottom-nav');
    if (!target) return;
    const page = document.body.dataset.page;
    const links = [
      ['home', 'Home', 'index.html'],
      ['products', 'Shop', 'products.html'],
      ['wishlist', 'Wish', 'wishlist.html'],
      ['cart', 'Bag', 'cart.html'],
      ['checkout', 'Pay', 'checkout.html']
    ];
    target.innerHTML = links.map(([key, label, href]) => `<a class="${page === key ? 'active' : ''}" href="${href}">${label}</a>`).join('');
  }

  function initPromoSlider() {
    const slides = Array.from(document.querySelectorAll('.promo-slide'));
    if (!slides.length) return;
    let index = 0;
    setInterval(() => {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 3600);
  }

  function renderTrends() {
    const target = document.querySelector('#trendCarousel');
    if (!target) return;
    target.innerHTML = trends.map((trend) => {
      const product = getProduct(trend.product);
      return `
        <a class="trend-card" href="product.html?id=${product.id}">
          <img src="${product.images[0]}" alt="${trend.title}" loading="lazy" onerror="window.FashionHub.handleImageError(this)">
          <div>
            <h3>${trend.title}</h3>
            <p>${trend.copy}</p>
          </div>
        </a>
      `;
    }).join('');
  }

  function renderFeed() {
    const target = document.querySelector('#fashionFeed');
    if (!target) return;
    const state = read(STORAGE.feed, { liked: [], saved: [] });
    target.innerHTML = feedPosts.map((post) => {
      const isLiked = state.liked.includes(post.id);
      const isSaved = state.saved.includes(post.id);
      return `
        <article class="feed-post">
          <div class="feed-post-media">
            <img src="${post.image}" alt="FashionHub shoppable style post" loading="lazy" onerror="window.FashionHub.handleImageError(this)">
            ${post.tags.map((tag) => `<a class="tag-pin" href="product.html?id=${tag.productId}" style="left:${tag.x}%;top:${tag.y}%">+</a>`).join('')}
          </div>
          <div class="feed-post-body">
            <div class="feed-actions">
              <button class="${isLiked ? 'active' : ''}" type="button" data-feed-like="${post.id}" aria-label="Like post">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button class="${isSaved ? 'active' : ''}" type="button" data-feed-save="${post.id}" aria-label="Save post">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
            <p>${post.caption}</p>
          </div>
        </article>
      `;
    }).join('');
  }

  function toggleFeed(postId, type) {
    const state = read(STORAGE.feed, { liked: [], saved: [] });
    const list = state[type];
    state[type] = list.includes(postId) ? list.filter((id) => id !== postId) : [...list, postId];
    write(STORAGE.feed, state);
    renderFeed();
  }

  function hydrateUser() {
    const user = read(STORAGE.user, null);
    const name = document.querySelector('#profileName');
    const meta = document.querySelector('#profileMeta');
    const authBtn = document.querySelector('[data-auth-action]');
    if (user) {
      if (name) name.textContent = user.name;
      if (meta) meta.textContent = `${user.identity} - Gold Muse - 3 orders tracked`;
      if (authBtn) {
        authBtn.textContent = 'Sign out';
        authBtn.removeAttribute('data-auth-open');
        authBtn.setAttribute('data-auth-logout', 'true');
      }
    } else {
      if (name) name.textContent = 'Guest Shopper';
      if (meta) meta.textContent = 'Sign in or sign up to sync your order history locally.';
      if (authBtn) {
        authBtn.textContent = 'Sign in';
        authBtn.removeAttribute('data-auth-logout');
        authBtn.setAttribute('data-auth-open', 'true');
      }
    }
  }

  function renderInventoryConsole() {
    const list = document.querySelector('#inventoryList');
    if (!list) return;
    const inventory = read(STORAGE.inventory, products.slice(0, 5).map((product) => ({
      id: product.id,
      name: `${product.brand} ${product.title}`,
      stock: product.inventory,
      coupon: product.price > 3000 ? 'FH700' : 'STYLE250'
    })));
    list.innerHTML = inventory.map((item) => `
      <li>
        <span>${item.name}</span>
        <strong>${item.stock} units - ${item.coupon}</strong>
      </li>
    `).join('');
    const addBtn = document.querySelector('#mockAddInventory');
    if (addBtn && !addBtn._bound) {
      addBtn._bound = true;
      addBtn.addEventListener('click', () => {
        const inv = read(STORAGE.inventory, inventory);
        const next = [
          {
            id: `mock-${Date.now()}`,
            name: `Capsule Drop ${inv.length + 1}`,
            stock: Math.floor(8 + Math.random() * 34),
            coupon: Math.random() > 0.5 ? 'FH700' : 'STYLE250'
          },
          ...inv
        ];
        write(STORAGE.inventory, next);
        renderInventoryConsole();
        toast('Inventory item added');
      });
    }
  }

  function drawChart(canvas, values, color, kind = 'bar') {
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, rect.width, rect.height);
    const pad = 28;
    const width = rect.width - pad * 2;
    const height = rect.height - pad * 2;
    const max = Math.max(...values) * 1.12;

    ctx.strokeStyle = '#e6e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i += 1) {
      const y = pad + (height / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(rect.width - pad, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#282c3f';
    ctx.font = '700 13px Inter, Arial';
    ctx.fillText(kind === 'bar' ? 'Revenue' : 'User Growth', pad, 18);

    if (kind === 'bar') {
      const barWidth = width / values.length - 12;
      values.forEach((value, index) => {
        const x = pad + index * (barWidth + 12) + 6;
        const barHeight = (value / max) * height;
        ctx.fillStyle = color;
        ctx.fillRect(x, rect.height - pad - barHeight, barWidth, barHeight);
      });
      return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    values.forEach((value, index) => {
      const x = pad + (width / (values.length - 1)) * index;
      const y = rect.height - pad - (value / max) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    values.forEach((value, index) => {
      const x = pad + (width / (values.length - 1)) * index;
      const y = rect.height - pad - (value / max) * height;
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }

  function initCharts() {
    const revenue = document.querySelector('#revenueChart');
    const growth = document.querySelector('#growthChart');
    if (!revenue && !growth) return;
    const paint = () => {
      drawChart(revenue, [32, 48, 42, 68, 74, 92], '#ff3f6c', 'bar');
      drawChart(growth, [18, 30, 44, 52, 73, 86], '#14cda8', 'line');
    };
    paint();
    window.addEventListener('resize', paint);
  }

  function initGlobalClicks() {
    document.addEventListener('click', (event) => {
      const wishlistButton = event.target.closest('[data-wishlist]');
      const addButton = event.target.closest('[data-add-cart]');
      const feedLike = event.target.closest('[data-feed-like]');
      const feedSave = event.target.closest('[data-feed-save]');
      const prompt = event.target.closest('[data-stylist-prompt]');
      if (wishlistButton) {
        toggleWishlist(wishlistButton.dataset.wishlist);
      }
      if (addButton) {
        addToCart(addButton.dataset.addCart, {
          size: addButton.dataset.size,
          color: addButton.dataset.color
        });
      }
      if (feedLike) toggleFeed(feedLike.dataset.feedLike, 'liked');
      if (feedSave) toggleFeed(feedSave.dataset.feedSave, 'saved');
      if (prompt && window.FashionHubStylist) {
        window.FashionHubStylist.open(prompt.dataset.stylistPrompt);
      }
      // "Ask stylist" ghost button
      if (event.target.closest('[data-open-stylist]')) {
        if (window.FashionHubStylist) {
          window.FashionHubStylist.open('');
        } else {
          window.location.href = 'products.html';
        }
      }

      const drawerMinus = event.target.closest('[data-drawer-qty-minus]');
      const drawerPlus = event.target.closest('[data-drawer-qty-plus]');
      const drawerRemove = event.target.closest('[data-drawer-remove]');

      if (drawerMinus || drawerPlus) {
        const button = drawerMinus || drawerPlus;
        const productId = button.dataset.drawerQtyMinus || button.dataset.drawerQtyPlus;
        const size = button.dataset.size;
        const color = button.dataset.color;
        const cart = getCart(false);
        const item = cart.find(entry => entry.id === productId && entry.size === size && entry.color === color);
        if (item) {
          const newQty = item.qty + (drawerPlus ? 1 : -1);
          if (newQty < 1) {
            removeFromCart(productId, { size, color, saved: false });
          } else {
            updateQuantity(productId, newQty, { size, color });
          }
        }
      }

      if (drawerRemove) {
        const productId = drawerRemove.dataset.drawerRemove;
        const size = drawerRemove.dataset.size;
        const color = drawerRemove.dataset.color;
        removeFromCart(productId, { size, color, saved: false });
      }

      if (event.target.closest('[data-auth-open]')) {
        sessionStorage.setItem('fh_redirect', window.location.href);
        window.location.href = 'auth.html';
      }
      if (event.target.closest('[data-auth-logout]')) {
        logoutUser();
      }
      if (event.target.closest('[data-close-drawer]')) {
        closeCartDrawer();
      }
    });
  }

  function init() {
    buildMobileNav();
    buildMegaMenus();
    updateCounts();
    initPromoSlider();
    renderTrends();
    renderFeed();
    hydrateUser();
    renderInventoryConsole();
    initCharts();
    initGlobalClicks();
    
    window.addEventListener('fashionhub:cart', renderCartDrawer);
  }

  window.FashionHub = {
    STORAGE,
    products,
    feedPosts,
    defaultAddresses,
    read,
    write,
    money,
    getProduct,
    getCart,
    setCart,
    getWishlist,
    setWishlist,
    addToCart,
    moveToSaved,
    moveToBag,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    cartTotals,
    renderPricePanel,
    renderProductCard,
    toast,
    discountPercent,
    requireAuth,
    registerUser,
    loginUser,
    logoutUser,
    getReviews,
    addReview,
    openCartDrawer,
    handleImageError,
    fallbackImage
  };

  document.addEventListener('DOMContentLoaded', init);
})();
