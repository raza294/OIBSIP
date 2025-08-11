// Global Variables
let currentBanner = 0;
let bannerInterval;
let cart = [];
let products = [];
let filteredProducts = [];
let currentFilter = 'all';

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        title: "iPhone 15 Pro Max",
        description: "Latest A17 Pro chip with Titanium design and advanced camera system",
        price: 134900,
        originalPrice: 149900,
        discount: 10,
        rating: 4.8,
        reviews: 1205,
        emoji: "📱",
        badge: "trending",
        category: "mobiles"
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra",
        description: "Galaxy AI powered smartphone with 200MP camera and S Pen",
        price: 129999,
        originalPrice: 139999,
        discount: 7,
        rating: 4.7,
        reviews: 892,
        emoji: "📱",
        badge: "new",
        category: "mobiles"
    },
    {
        id: 3,
        title: "MacBook Pro M3",
        description: "14-inch laptop with M3 chip, 16GB RAM, 512GB SSD",
        price: 199900,
        originalPrice: 219900,
        discount: 9,
        rating: 4.9,
        reviews: 567,
        emoji: "💻",
        badge: "sale",
        category: "laptops"
    },
    {
        id: 4,
        title: "Sony WH-1000XM5",
        description: "Premium noise cancelling wireless headphones",
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        rating: 4.6,
        reviews: 1340,
        emoji: "🎧",
        badge: "trending",
        category: "electronics"
    },
    {
        id: 5,
        title: "PlayStation 5",
        description: "Next-gen gaming console with ultra-high speed SSD",
        price: 54990,
        originalPrice: 59990,
        discount: 8,
        rating: 4.8,
        reviews: 2105,
        emoji: "🎮",
        badge: "sale",
        category: "electronics"
    },
    {
        id: 6,
        title: "Nike Air Jordan",
        description: "Classic basketball shoes with premium leather finish",
        price: 12995,
        originalPrice: 15995,
        discount: 19,
        rating: 4.5,
        reviews: 890,
        emoji: "👟",
        badge: "new",
        category: "fashion"
    },
    {
        id: 7,
        title: "LG 55\" OLED TV",
        description: "4K UHD Smart TV with AI ThinQ and Dolby Vision",
        price: 89990,
        originalPrice: 119990,
        discount: 25,
        rating: 4.7,
        reviews: 456,
        emoji: "📺",
        badge: "sale",
        category: "electronics"
    },
    {
        id: 8,
        title: "Instant Pot Duo",
        description: "7-in-1 multi-use pressure cooker for modern kitchens",
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        rating: 4.4,
        reviews: 1567,
        emoji: "🍲",
        badge: "trending",
        category: "home"
    },
    {
        id: 9,
        title: "Kindle Paperwhite",
        description: "Waterproof e-reader with 6.8\" display and adjustable warm light",
        price: 13999,
        originalPrice: 16999,
        discount: 18,
        rating: 4.6,
        reviews: 2340,
        emoji: "📖",
        badge: "new",
        category: "books"
    },
    {
        id: 10,
        title: "Dyson V15 Detect",
        description: "Cordless vacuum cleaner with laser dust detection",
        price: 65900,
        originalPrice: 75900,
        discount: 13,
        rating: 4.7,
        reviews: 234,
        emoji: "🧹",
        badge: "trending",
        category: "home"
    },
    {
        id: 11,
        title: "Apple Watch Series 9",
        description: "Advanced health monitoring with S9 chip and Always-On display",
        price: 41900,
        originalPrice: 45900,
        discount: 9,
        rating: 4.8,
        reviews: 1890,
        emoji: "⌚",
        badge: "new",
        category: "electronics"
    },
    {
        id: 12,
        title: "Levi's 511 Jeans",
        description: "Slim fit comfortable denim jeans in classic blue",
        price: 2999,
        originalPrice: 4499,
        discount: 33,
        rating: 4.3,
        reviews: 567,
        emoji: "👖",
        badge: "sale",
        category: "fashion"
    }
];

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);
});

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    initializeBanner();
    initializeSearch();
    initializeFilters();
    initializeCart();
    addScrollAnimations();
});

// Product Management
function initializeProducts() {
    products = [...sampleProducts];
    filteredProducts = [...products];
    renderProducts();
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="product-image">
            <div class="product-emoji">${product.emoji}</div>
            <div class="product-badge ${product.badge}">${product.badge.toUpperCase()}</div>
            <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                <i class="far fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">
                <span class="rating-stars">${generateStars(product.rating)}</span>
                <span class="rating-text">${product.rating} (${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">₹${product.price.toLocaleString()}</span>
                <span class="original-price">₹${product.originalPrice.toLocaleString()}</span>
                <span class="discount">${product.discount}% off</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    return stars;
}

// Banner Carousel
function initializeBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    if (slides.length === 0) return;
    
    startBannerInterval();
    
    // Add touch/swipe support
    let startX = 0;
    let endX = 0;
    
    const bannerContainer = document.querySelector('.banner-container');
    
    bannerContainer.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    
    bannerContainer.addEventListener('touchend', e => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const threshold = 50;
        if (startX - endX > threshold) {
            changeBanner(1);
        } else if (endX - startX > threshold) {
            changeBanner(-1);
        }
    }
}

function changeBanner(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentBanner].classList.remove('active');
    dots[currentBanner].classList.remove('active');
    
    currentBanner += direction;
    
    if (currentBanner >= slides.length) {
        currentBanner = 0;
    } else if (currentBanner < 0) {
        currentBanner = slides.length - 1;
    }
    
    slides[currentBanner].classList.add('active');
    dots[currentBanner].classList.add('active');
    
    restartBannerInterval();
}

function goToBanner(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    slides[currentBanner].classList.remove('active');
    dots[currentBanner].classList.remove('active');
    
    currentBanner = n - 1;
    
    slides[currentBanner].classList.add('active');
    dots[currentBanner].classList.add('active');
    
    restartBannerInterval();
}

function startBannerInterval() {
    bannerInterval = setInterval(() => {
        changeBanner(1);
    }, 5000);
}

function restartBannerInterval() {
    clearInterval(bannerInterval);
    startBannerInterval();
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('focus', () => {
        searchSuggestions.classList.add('show');
    });
    
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchSuggestions.classList.remove('show');
        }, 200);
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            const filtered = products.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            filteredProducts = filtered;
            renderProducts();
        } else {
            applyFilter(currentFilter);
        }
    });
    
    // Search suggestions click handlers
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            searchInput.dispatchEvent(new Event('input'));
            searchSuggestions.classList.remove('show');
        });
    });
}

// Filter Management
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Apply filter
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    currentFilter = filter;
    
    switch (filter) {
        case 'all':
            filteredProducts = [...products];
            break;
        case 'trending':
            filteredProducts = products.filter(p => p.badge === 'trending');
            break;
        case 'new':
            filteredProducts = products.filter(p => p.badge === 'new');
            break;
        case 'sale':
            filteredProducts = products.filter(p => p.badge === 'sale');
            break;
        default:
            filteredProducts = [...products];
    }
    
    renderProducts();
}

// Cart Management
function initializeCart() {
    updateCartCount();
    
    // Cart toggle functionality
    const cartItem = document.getElementById('cartItem');
    cartItem.addEventListener('click', toggleCart);
    
    // Load More Products
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    showAddToCartAnimation();
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        renderCartItems();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="continue-shopping" onclick="toggleCart()">Continue Shopping</button>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>₹${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toLocaleString();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        renderCartItems();
    }
}

function buyNow(productId) {
    addToCart(productId);
    showNotification('Redirecting to checkout...', 'info');
    
    // Simulate checkout redirect
    setTimeout(() => {
        toggleCart();
    }, 1000);
}

function toggleWishlist(productId) {
    const btn = event.target.closest('.wishlist-btn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        btn.style.background = '#ff6161';
        btn.style.color = 'white';
        showNotification('Added to wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        btn.style.background = 'rgba(255,255,255,0.9)';
        btn.style.color = '#333';
        showNotification('Removed from wishlist!', 'info');
    }
}

// Load More Products
function loadMoreProducts() {
    const moreProducts = [
        {
            id: 13,
            title: "Canon EOS R6",
            description: "Full-frame mirrorless camera with 20.1MP sensor",
            price: 189999,
            originalPrice: 219999,
            discount: 14,
            rating: 4.7,
            reviews: 234,
            emoji: "📷",
            badge: "new",
            category: "electronics"
        },
        {
            id: 14,
            title: "Adidas Ultraboost",
            description: "Running shoes with boost midsole technology",
            price: 16999,
            originalPrice: 19999,
            discount: 15,
            rating: 4.5,
            reviews: 567,
            emoji: "👟",
            badge: "trending",
            category: "fashion"
        },
        {
            id: 15,
            title: "JBL Flip 6",
            description: "Portable Bluetooth speaker with powerful sound",
            price: 11999,
            originalPrice: 14999,
            discount: 20,
            rating: 4.4,
            reviews: 890,
            emoji: "🔊",
            badge: "sale",
            category: "electronics"
        }
    ];
    
    products.push(...moreProducts);
    applyFilter(currentFilter);
    
    // Hide load more button after loading
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.style.display = 'none';
    
    showNotification('More products loaded!', 'success');
}

// Utility Functions
function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-item i');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.6s ease';
    }, 10);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00d4aa' : type === 'error' ? '#ff6161' : '#2874f0'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.category-card, .product-card, .offer-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Category Navigation
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        filterByCategory(category);
    });
});

function filterByCategory(category) {
    filteredProducts = products.filter(p => p.category === category);
    renderProducts();
    
    // Scroll to products section
    document.querySelector('.featured-products').scrollIntoView({ 
        behavior: 'smooth' 
    });
    
    showNotification(`Showing ${category} products`, 'info');
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // Banner navigation with arrow keys
    if (e.key === 'ArrowLeft') {
        changeBanner(-1);
    } else if (e.key === 'ArrowRight') {
        changeBanner(1);
    }
    
    // Close cart with Escape key
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .cart-item-image {
        font-size: 2rem;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f9fa;
        border-radius: 8px;
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-details h4 {
        font-size: 1rem;
        margin-bottom: 5px;
        color: #333;
    }
    
    .cart-item-details p {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 8px;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .quantity-controls button {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .quantity-controls button:hover {
        background: #2874f0;
        color: white;
        border-color: #2874f0;
    }
    
    .quantity-controls span {
        min-width: 20px;
        text-align: center;
        font-weight: 600;
    }
    
    .remove-item {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        transition: color 0.3s ease;
    }
    
    .remove-item:hover {
        color: #ff6161;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    const debouncedSearch = debounce((e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 0) {
            const filtered = products.filter(product => 
                product.title.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
            filteredProducts = filtered;
            renderProducts();
        } else {
            applyFilter(currentFilter);
        }
    }, 300);
    
    searchInput.addEventListener('input', debouncedSearch);
}
