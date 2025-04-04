// وظائف عامة للموقع - السلة والمفضلة والبحث
document.addEventListener('DOMContentLoaded', function() {
    // --------- وظائف السلة ---------
    initializeCart();
    initializeWishlist();
    initializeSearch();
    
    // إضافة إلى السلة
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card') || this.closest('.camera-card');
            if (!productCard) return;
            
            const productId = productCard.dataset.id || Math.floor(Math.random() * 1000);
            const productName = productCard.querySelector('h3') ? productCard.querySelector('h3').textContent : 'منتج';
            const productPrice = productCard.querySelector('.price, .product-price') ? 
                                productCard.querySelector('.price, .product-price').textContent.replace(/[^\d]/g, '') : '100';
            const productImage = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
            
            addToCart(productId, productName, productPrice, productImage);
            
            // إظهار رسالة نجاح
            showToast('تمت إضافة المنتج إلى السلة بنجاح!', 'success', 'cart');
            
            // تنشيط أيقونة السلة
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.classList.add('pulse');
                setTimeout(() => cartIcon.classList.remove('pulse'), 1000);
            }
        });
    });
    
    // --------- وظائف المفضلة ---------
    // إضافة إلى المفضلة
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card') || this.closest('.camera-card');
            if (!productCard) return;
            
            const productId = productCard.dataset.id || Math.floor(Math.random() * 1000);
            const productName = productCard.querySelector('h3') ? productCard.querySelector('h3').textContent : 'منتج';
            const productPrice = productCard.querySelector('.price, .product-price') ? 
                                productCard.querySelector('.price, .product-price').textContent.replace(/[^\d]/g, '') : '100';
            const productImage = productCard.querySelector('img') ? productCard.querySelector('img').src : '';
            
            const isInWishlist = toggleWishlist(productId, productName, productPrice, productImage);
            
            // تغيير أيقونة المفضلة
            const icon = this.querySelector('i');
            if (isInWishlist) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                showToast('تمت إضافة المنتج إلى المفضلة', 'success', 'wishlist');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                showToast('تمت إزالة المنتج من المفضلة', 'info', 'wishlist');
            }
            
            // تنشيط أيقونة المفضلة
            const heartIcon = document.querySelector('.heart-icon');
            if (heartIcon) {
                heartIcon.classList.add('pulse');
                setTimeout(() => heartIcon.classList.remove('pulse'), 1000);
            }
        });
    });
    
    // --------- وظيفة البحث ---------
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm.length > 0) {
                    searchProducts(searchTerm);
                }
            }
        });
        
        // زر البحث
        const searchIcon = document.querySelector('.search-icon');
        if (searchIcon) {
            searchIcon.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm.length > 0) {
                    searchProducts(searchTerm);
                }
            });
        }
    }
});

// وظائف السلة
function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // تحديث عدد المنتجات في السلة
    updateCartCount();
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // التحقق مما إذا كان المنتج موجودًا بالفعل في السلة
    const existingItem = cart.find(item => item.id == id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // تحديث العداد في الواجهة
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        if (cartCount > 0) {
            cartCountElement.style.display = 'flex';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// وظائف المفضلة
function initializeWishlist() {
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }
    
    // تحديث عدد المنتجات في المفضلة
    updateWishlistCount();
    
    // تحديث حالة أزرار المفضلة عند تحميل الصفحة
    updateWishlistButtons();
}

function toggleWishlist(id, name, price, image) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // التحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة
    const existingIndex = wishlist.findIndex(item => item.id == id);
    
    if (existingIndex !== -1) {
        // إزالة المنتج من المفضلة
        wishlist.splice(existingIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        return false;
    } else {
        // إضافة المنتج إلى المفضلة
        wishlist.push({
            id: id,
            name: name,
            price: price,
            image: image
        });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        return true;
    }
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // تحديث العداد في الواجهة
    const wishlistCountElement = document.querySelector('.wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
        if (wishlist.length > 0) {
            wishlistCountElement.style.display = 'flex';
        } else {
            wishlistCountElement.style.display = 'none';
        }
    }
}

function updateWishlistButtons() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // تحديث حالة أزرار المفضلة
    document.querySelectorAll('.product-card, .camera-card').forEach(card => {
        const productId = card.dataset.id;
        if (!productId) return;
        
        const wishlistBtn = card.querySelector('.wishlist-btn');
        if (!wishlistBtn) return;
        
        const isInWishlist = wishlist.some(item => item.id == productId);
        const icon = wishlistBtn.querySelector('i');
        
        if (isInWishlist) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            wishlistBtn.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            wishlistBtn.classList.remove('active');
        }
    });
}

// وظيفة البحث
function initializeSearch() {
    // إضافة عنصر لعرض نتائج البحث إذا لم يكن موجودًا
    if (!document.querySelector('.search-results')) {
        const searchResultsDiv = document.createElement('div');
        searchResultsDiv.className = 'search-results';
        document.querySelector('.search-container')?.appendChild(searchResultsDiv);
    }
}

function searchProducts(searchTerm) {
    // في الموقع الفعلي، يجب استبدال هذا بطلب للخادم أو البحث في قاعدة البيانات
    // هنا نقوم ببساطة بتجميع جميع المنتجات الموجودة في الصفحة
    
    const products = [];
    document.querySelectorAll('.product-card, .camera-card').forEach(card => {
        const name = card.querySelector('h3')?.textContent || '';
        if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
            products.push({
                id: card.dataset.id || Math.floor(Math.random() * 1000),
                name: name,
                price: card.querySelector('.price, .product-price')?.textContent || '',
                image: card.querySelector('img')?.src || ''
            });
        }
    });
    
    // عرض النتائج أو توجيه المستخدم إلى صفحة البحث
    if (products.length > 0) {
        // يمكن توجيه المستخدم إلى صفحة نتائج البحث مع نتائج البحث
        localStorage.setItem('searchResults', JSON.stringify(products));
        localStorage.setItem('searchTerm', searchTerm);
        
        // في حالة وجود صفحة نتائج بحث منفصلة
        // window.location.href = 'search-results.html';
        
        // أو عرض النتائج في نافذة منبثقة
        showSearchResults(products);
    } else {
        showToast('لم يتم العثور على نتائج مطابقة للبحث', 'info', 'search');
    }
}

function showSearchResults(products) {
    const searchResultsDiv = document.querySelector('.search-results');
    if (!searchResultsDiv) return;
    
    searchResultsDiv.innerHTML = '';
    searchResultsDiv.style.display = 'block';
    
    if (products.length === 0) {
        searchResultsDiv.innerHTML = '<p class="no-results">لا توجد نتائج مطابقة</p>';
        return;
    }
    
    // إنشاء قائمة النتائج
    const resultsList = document.createElement('ul');
    products.forEach(product => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="result-info">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
            </div>
        `;
        listItem.addEventListener('click', () => {
            // التوجيه إلى صفحة المنتج
            // window.location.href = `product.html?id=${product.id}`;
            
            // أو إغلاق نتائج البحث
            searchResultsDiv.style.display = 'none';
        });
        resultsList.appendChild(listItem);
    });
    
    searchResultsDiv.appendChild(resultsList);
    
    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function closeSearchResults(e) {
        if (!searchResultsDiv.contains(e.target) && !document.querySelector('.search-container').contains(e.target)) {
            searchResultsDiv.style.display = 'none';
            document.removeEventListener('click', closeSearchResults);
        }
    });
}

// وظائف الرسائل التنبيهية
function showToast(message, type = 'info', icon = 'info') {
    let iconClass = 'fas fa-info-circle';
    
    switch (icon) {
        case 'cart':
            iconClass = 'fas fa-shopping-cart';
            break;
        case 'wishlist':
            iconClass = 'fas fa-heart';
            break;
        case 'success':
            iconClass = 'fas fa-check-circle';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-circle';
            break;
        case 'search':
            iconClass = 'fas fa-search';
            break;
    }
    
    // التحقق من وجود حاوية الرسائل
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // إنشاء رسالة جديدة
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `
        <i class="${iconClass}"></i>
        <span>${message}</span>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    toastContainer.appendChild(toast);
    
    // عرض الرسالة
    setTimeout(() => toast.classList.add('show'), 10);
    
    // إضافة زر الإغلاق
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
    
    // إخفاء الرسالة تلقائيًا بعد 3 ثوانٍ
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
} 