// استدعاء وظائف التصفية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة، جاري تهيئة وظائف التصفية...');
    initializeFilters();
    replaceRiyalWithSymbol();
    styleProductGrid();
    styleProductCards();
    stylePagination();
    addHoverEffects();
    improveResponsiveness();
    initializeFavoriteButtons();
    handleProductPopups();
    addFavoritesPageButton();
});

// إزالة كلمة "ريال" واستبدالها بالشعار
function replaceRiyalWithSymbol() {
    const priceElements = document.querySelectorAll('.price, .product-price');
    
    priceElements.forEach(element => {
        // تخزين النص الأصلي للسعر
        let priceText = element.textContent.trim();
        
        // إزالة كلمة "ريال" وأي نص غير رقمي
        let numericText = priceText.replace(/ريال|[^\d٠١٢٣٤٥٦٧٨٩]/g, '').trim();
        
        // إعادة هيكلة عنصر السعر ليحتوي على الرقم والشعار فقط
        element.innerHTML = '';
        
        // إضافة الرقم
        const priceSpan = document.createElement('span');
        priceSpan.textContent = numericText;
        element.appendChild(priceSpan);
        
        // إضافة شعار الريال
        const symbolSpan = document.createElement('span');
        symbolSpan.className = 'sar-symbol';
        symbolSpan.style.content = '""';
        symbolSpan.style.width = '22px';
        symbolSpan.style.height = '22px';
        symbolSpan.style.backgroundImage = 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr8dtoYHY6kKKBe60P4wKoBG-gLreYxhttk6Cx2EIpjSPbPnq07ht4vBf7kMY8m7Npogg&usqp=CAU")';
        symbolSpan.style.backgroundSize = 'contain';
        symbolSpan.style.backgroundRepeat = 'no-repeat';
        symbolSpan.style.backgroundPosition = 'center';
        symbolSpan.style.display = 'inline-block';
        symbolSpan.style.marginLeft = '5px';
        symbolSpan.style.verticalAlign = 'middle';
        element.appendChild(symbolSpan);
        
        // تنسيق عنصر السعر
        element.style.color = '#165b8a';
        element.style.fontWeight = '600';
        element.style.fontSize = '18px';
        element.style.display = 'flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.direction = 'ltr';
    });
}

// تطبيق نفس تصميم الفلاتر كما في صفحة الكاميرات
function styleFiltersContainer() {
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    // تطبيق الأنماط الرئيسية للفلاتر
    filtersContainer.style.backgroundColor = '#f8f9fa';
    filtersContainer.style.borderRadius = '10px';
    filtersContainer.style.padding = '15px 20px';
    filtersContainer.style.marginBottom = '25px';
    filtersContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    filtersContainer.style.transition = 'all 0.3s ease';
    
    // تنسيق العناوين في الفلاتر
    const filterHeadings = filtersContainer.querySelectorAll('h3, h4');
    filterHeadings.forEach(heading => {
        heading.style.color = '#165b8a';
        heading.style.fontSize = '16px';
        heading.style.fontWeight = '600';
        heading.style.marginBottom = '10px';
        heading.style.borderBottom = '1px solid #e6e6e6';
        heading.style.paddingBottom = '8px';
    });
    
    // تنسيق خيارات الفلاتر
    const filterOptions = filtersContainer.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.style.marginBottom = '8px';
        option.style.display = 'flex';
        option.style.alignItems = 'center';
    });
    
    // تحويل الفلاتر إلى تصميم أفقي
    const filterGroups = filtersContainer.querySelectorAll('.filter-group');
    filtersContainer.style.display = 'flex';
    filtersContainer.style.flexWrap = 'wrap';
    filtersContainer.style.gap = '15px';
    
    filterGroups.forEach(group => {
        group.style.flex = '1 1 200px';
        group.style.minWidth = '200px';
        group.style.maxWidth = '300px';
    });
    
    // تنسيق القوائم المنسدلة
    const selects = filtersContainer.querySelectorAll('select');
    selects.forEach(select => {
        select.style.width = '100%';
        select.style.padding = '8px 12px';
        select.style.borderRadius = '5px';
        select.style.border = '1px solid #ddd';
        select.style.backgroundColor = 'white';
        select.style.color = '#333';
        select.style.outline = 'none';
        select.style.cursor = 'pointer';
    });
    
    // تنسيق مدخلات النص
    const inputs = filtersContainer.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.style.width = '100%';
        input.style.padding = '8px 12px';
        input.style.borderRadius = '5px';
        input.style.border = '1px solid #ddd';
        input.style.outline = 'none';
    });
    
    // تنسيق الأزرار
    const buttons = filtersContainer.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = '#165b8a';
        button.style.color = 'white';
        button.style.padding = '8px 15px';
        button.style.borderRadius = '5px';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.transition = 'background-color 0.2s';
        
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#0d4b76';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#165b8a';
        });
    });
}

// تطبيق نفس تصميم شبكة المنتجات كما في صفحة الكاميرات
function styleProductGrid() {
    // البحث عن شبكة المنتجات (قد تكون بفئة مختلفة عن صفحة الكاميرات)
    const productGrid = document.querySelector('.product-grid') || 
                       document.querySelector('.all-products-grid') || 
                       document.querySelector('.products-container') ||
                       document.querySelector('.cameras-grid');
    
    if (!productGrid) return;
    
    // تطبيق نفس أنماط شبكة الكاميرات
    productGrid.style.display = 'grid';
    productGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    productGrid.style.gap = '20px';
    productGrid.style.padding = '10px';
}

// تطبيق نفس تصميم بطاقات المنتجات كما في صفحة الكاميرات
function styleProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // تنسيق بطاقة المنتج
        card.style.backgroundColor = 'white';
        card.style.borderRadius = '10px';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.height = '100%';
        
        // تنسيق صورة المنتج
        const productImage = card.querySelector('.product-image') || card.querySelector('img').parentNode;
        if (productImage) {
            productImage.style.overflow = 'hidden';
            productImage.style.position = 'relative';
            productImage.style.paddingBottom = '75%'; // نسبة عرض إلى ارتفاع 4:3
            
            const img = productImage.querySelector('img');
            if (img) {
                img.style.position = 'absolute';
                img.style.top = '0';
                img.style.left = '0';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.transition = 'transform 0.5s ease';
            }
        }
        
        // تنسيق معلومات المنتج
        const productInfo = card.querySelector('.product-info');
        if (productInfo) {
            productInfo.style.padding = '15px';
            productInfo.style.display = 'flex';
            productInfo.style.flexDirection = 'column';
            productInfo.style.flexGrow = '1';
            
            // تنسيق عنوان المنتج
            const title = productInfo.querySelector('h3');
            if (title) {
                title.style.fontSize = '16px';
                title.style.fontWeight = '600';
                title.style.marginBottom = '10px';
                title.style.color = '#333';
                title.style.minHeight = '40px';
            }
            
            // تنسيق مواصفات المنتج
            const specs = productInfo.querySelector('.product-specs');
            if (specs) {
                specs.style.fontSize = '13px';
                specs.style.color = '#666';
                specs.style.marginBottom = '10px';
            }
        }
        
        // تنسيق أزرار المنتج
        const buttons = card.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.classList.contains('add-to-cart')) {
                button.style.backgroundColor = '#165b8a';
                button.style.color = 'white';
                button.style.padding = '8px 15px';
                button.style.borderRadius = '5px';
                button.style.border = 'none';
                button.style.cursor = 'pointer';
                button.style.transition = 'background-color 0.2s';
                button.style.marginTop = 'auto';
                button.style.width = '100%';
            } else if (button.classList.contains('wishlist-btn')) {
                button.style.position = 'absolute';
                button.style.top = '10px';
                button.style.right = '10px';
                button.style.width = '35px';
                button.style.height = '35px';
                button.style.backgroundColor = 'white';
                button.style.borderRadius = '50%';
                button.style.border = 'none';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
                button.style.cursor = 'pointer';
                button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                button.style.zIndex = '10';
            }
        });
    });
}

// تصميم أزرار الصفحات (pagination) مثل صفحة الكاميرات
function stylePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    pagination.style.display = 'flex';
    pagination.style.justifyContent = 'center';
    pagination.style.marginTop = '30px';
    pagination.style.gap = '5px';
    
    const pageLinks = pagination.querySelectorAll('a, button');
    pageLinks.forEach(link => {
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
        link.style.width = '35px';
        link.style.height = '35px';
        link.style.borderRadius = '5px';
        link.style.border = '1px solid #ddd';
        link.style.backgroundColor = 'white';
        link.style.color = '#333';
        link.style.textDecoration = 'none';
        link.style.transition = 'all 0.2s';
        
        if (link.classList.contains('active')) {
            link.style.backgroundColor = '#165b8a';
            link.style.color = 'white';
            link.style.borderColor = '#165b8a';
        }
        
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '#f0f0f0';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'white';
            }
        });
    });
}

// إضافة تأثيرات التحويم والانتقالات
function addHoverEffects() {
    // تأثير التحويم لبطاقات المنتجات
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0,0,0,0.15)';
            
            // تكبير الصورة عند التحويم
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            
            // إعادة الصورة إلى حجمها الطبيعي
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // تأثير التحويم لأزرار السلة
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#0d4b76';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#165b8a';
        });
    });
}

// تحسين استجابة الصفحة للشاشات المختلفة
function improveResponsiveness() {
    // إضافة قواعد CSS للشاشات المختلفة
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .filters-container {
                flex-direction: column;
            }
            
            .filter-group {
                width: 100% !important;
                max-width: 100% !important;
            }
            
            .product-grid, .all-products-grid, .products-container {
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
            }
            
            .product-card h3 {
                font-size: 14px !important;
            }
            
            .price, .product-price {
                font-size: 16px !important;
            }
            
            .add-to-cart {
                font-size: 12px !important;
                padding: 6px 10px !important;
            }
        }
        
        @media (max-width: 480px) {
            .product-grid, .all-products-grid, .products-container {
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
                gap: 10px !important;
            }
            
            .product-card {
                padding-bottom: 10px !important;
            }
            
            .product-card h3 {
                font-size: 12px !important;
                min-height: 30px !important;
            }
            
            .price, .product-price {
                font-size: 14px !important;
            }
            
            .sar-symbol {
                width: 18px !important;
                height: 18px !important;
            }
            
            .wishlist-btn {
                width: 30px !important;
                height: 30px !important;
            }
            
            .add-to-cart {
                font-size: 11px !important;
                padding: 5px 8px !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// تهيئة وظائف التصفية
function initializeFilters() {
    // تحديد عناصر التصفية
    const categorySelect = document.querySelector('select[name="category"]');
    const brandSelect = document.querySelector('select[name="brand"]');
    const priceSelect = document.querySelector('select[name="price"]');
    const sortSelect = document.querySelector('select[name="sort"]');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
    
    // إضافة خيار "الكل" إذا لم يكن موجوداً
    if (categorySelect && !Array.from(categorySelect.options).some(opt => opt.value === 'all')) {
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'الكل';
        categorySelect.insertBefore(allOption, categorySelect.firstChild);
        categorySelect.value = 'all';
    }
    
    if (brandSelect && !Array.from(brandSelect.options).some(opt => opt.value === 'all')) {
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'الكل';
        brandSelect.insertBefore(allOption, brandSelect.firstChild);
        brandSelect.value = 'all';
    }
    
    // إعادة تهيئة مستمعي الأحداث بطريقة أفضل
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            console.log('تم تغيير الفئة إلى:', this.value);
            
            // إعادة تعيين الفلاتر الأخرى
            if (brandSelect) brandSelect.value = 'all';
            if (priceSelect) priceSelect.value = 'all';
            
            filterProducts();
        });
    }
    
    if (brandSelect) {
        brandSelect.addEventListener('change', function() {
            console.log('تم تغيير العلامة التجارية إلى:', this.value);
            filterProducts();
        });
    }
    
    if (priceSelect) {
        priceSelect.addEventListener('change', function() {
            console.log('تم تغيير نطاق السعر إلى:', this.value);
            filterProducts();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }
    
    availabilityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // إضافة زر إعادة تعيين الفلاتر
    addResetFiltersButton();
    
    // تطبيق التصفية الأولية
    filterProducts();
}

// إضافة زر إعادة تعيين الفلاتر
function addResetFiltersButton() {
    const filtersContainer = document.querySelector('.filters-container');
    if (!filtersContainer) return;
    
    const resetButton = document.querySelector('.reset-filters-btn');
    if (resetButton) return; // تجنب إضافة الزر مرتين
    
    const newButton = document.createElement('button');
    newButton.className = 'reset-filters-btn';
    newButton.textContent = 'إعادة تعيين الفلاتر';
    newButton.style.backgroundColor = '#dc3545';
    newButton.style.color = 'white';
    newButton.style.border = 'none';
    newButton.style.borderRadius = '5px';
    newButton.style.padding = '8px 15px';
    newButton.style.margin = '10px 0';
    newButton.style.cursor = 'pointer';
    
    newButton.addEventListener('click', resetFilters);
    
    filtersContainer.appendChild(newButton);
}

// إعادة تعيين جميع الفلاتر
function resetFilters() {
    const categorySelect = document.querySelector('select[name="category"]');
    const brandSelect = document.querySelector('select[name="brand"]');
    const priceSelect = document.querySelector('select[name="price"]');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
    
    if (categorySelect) categorySelect.value = 'all';
    if (brandSelect) brandSelect.value = 'all';
    if (priceSelect) priceSelect.value = 'all';
    
    availabilityCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    
    filterProducts();
}

// معالجة النوافذ المنبثقة وتوحيد أزرار المفضلة
function handleProductPopups() {
    // إزالة جميع النوافذ المنبثقة
    const popups = document.querySelectorAll('.product-popup, .quick-view-popup, .product-modal');
    popups.forEach(popup => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    });
    
    const productCards = document.querySelectorAll('.product-card, .camera-card, .product');
    
    productCards.forEach(card => {
        // إضافة زر عرض التفاصيل
        addViewDetailsButton(card);
        
        // تنسيق زر السلة
        formatCartButton(card);
        
        // توحيد وتنسيق زر المفضلة
        standardizeFavoriteButton(card);
    });
}

// إضافة زر عرض التفاصيل
function addViewDetailsButton(card) {
    const productInfo = card.querySelector('.product-info, .camera-info, .product-details');
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    
    if (productInfo && !viewDetailsBtn) {
        const newBtn = document.createElement('a');
        newBtn.className = 'view-details-btn btn';
        newBtn.innerHTML = '<i class="fas fa-search-plus"></i> عرض التفاصيل';
        
        // تحديد الرابط المناسب
        const productId = card.dataset.productId || card.dataset.id || Math.floor(Math.random() * 10000);
        const productName = card.querySelector('h3, .product-title, .camera-title')?.textContent || '';
        newBtn.href = `product.html?id=${productId}&name=${encodeURIComponent(productName)}`;
        
        // تنسيق الزر
        newBtn.style.backgroundColor = '#165b8a';
        newBtn.style.color = 'white';
        newBtn.style.textAlign = 'center';
        newBtn.style.padding = '8px 15px';
        newBtn.style.borderRadius = '5px';
        newBtn.style.margin = '10px 0';
        newBtn.style.textDecoration = 'none';
        newBtn.style.display = 'block';
        newBtn.style.width = '100%';
        newBtn.style.fontSize = '14px';
        
        productInfo.appendChild(newBtn);
    }
}

// تنسيق زر السلة
function formatCartButton(card) {
    const cartButton = card.querySelector('.add-to-cart, .add-to-cart-btn');
    if (!cartButton) return;
    
    // التأكد من وجود أيقونة السلة
    let cartIcon = cartButton.querySelector('i');
    if (!cartIcon) {
        cartIcon = document.createElement('i');
        cartIcon.className = 'fas fa-cart-plus';
        cartButton.prepend(cartIcon);
    } else if (!cartIcon.classList.contains('fa-shopping-cart') && !cartIcon.classList.contains('fa-cart-plus')) {
        cartIcon.className = 'fas fa-cart-plus';
    }
    
    // تفريغ المحتوى وإعادة بناؤه
    const iconClone = cartIcon.cloneNode(true);
    cartButton.innerHTML = '';
    cartButton.appendChild(iconClone);
    
    // إضافة نص
    const cartText = document.createElement('span');
    cartText.textContent = ' إضافة للسلة';
    cartText.style.marginRight = '5px';
    cartButton.appendChild(cartText);
    
    // تنسيق الزر
    cartButton.style.width = 'auto';
    cartButton.style.minWidth = '120px';
    cartButton.style.height = '35px';
    cartButton.style.borderRadius = '5px';
    cartButton.style.display = 'flex';
    cartButton.style.justifyContent = 'center';
    cartButton.style.alignItems = 'center';
    cartButton.style.backgroundColor = '#165b8a';
    cartButton.style.color = 'white';
    cartButton.style.border = 'none';
    cartButton.style.padding = '0 15px';
    cartButton.style.cursor = 'pointer';
    cartButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    cartButton.style.margin = '5px 0';
    cartButton.style.fontSize = '13px';
    
    // إضافة تأثير عند النقر
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        iconClone.classList.add('fa-spin');
        setTimeout(() => {
            iconClone.classList.remove('fa-spin');
            alert('تمت إضافة المنتج إلى السلة');
        }, 500);
    });
}

// توحيد وتنسيق زر المفضلة
function standardizeFavoriteButton(card) {
    // البحث عن الزر أو إنشاؤه
    let favoriteButton = card.querySelector('.wishlist-btn, .favorite-btn, .add-to-favorites');
    
    if (!favoriteButton) {
        favoriteButton = document.createElement('button');
        favoriteButton.className = 'wishlist-btn';
        favoriteButton.dataset.productId = card.dataset.productId || card.dataset.id;
        card.appendChild(favoriteButton);
        
        // وضعه في موقع مناسب
        const productImage = card.querySelector('.product-image') || card.querySelector('img').parentNode;
        if (productImage) {
            productImage.style.position = 'relative';
            productImage.appendChild(favoriteButton);
        }
    }
    
    // إضافة أيقونة القلب إذا لم تكن موجودة
    let favIcon = favoriteButton.querySelector('i');
    if (!favIcon) {
        favIcon = document.createElement('i');
        favIcon.className = 'far fa-heart';
        favoriteButton.appendChild(favIcon);
    } else if (!favIcon.classList.contains('fa-heart')) {
        favIcon.className = 'far fa-heart';
    }
    
    // تنسيق الزر بشكل موحد
    favoriteButton.style.width = '35px';
    favoriteButton.style.height = '35px';
    favoriteButton.style.borderRadius = '50%';
    favoriteButton.style.display = 'flex';
    favoriteButton.style.justifyContent = 'center';
    favoriteButton.style.alignItems = 'center';
    favoriteButton.style.backgroundColor = 'white';
    favoriteButton.style.color = '#777';
    favoriteButton.style.border = 'none';
    favoriteButton.style.padding = '0';
    favoriteButton.style.cursor = 'pointer';
    favoriteButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    favoriteButton.style.position = 'absolute';
    favoriteButton.style.top = '10px';
    favoriteButton.style.left = '10px';
    favoriteButton.style.right = 'auto';
    favoriteButton.style.zIndex = '5';
    favoriteButton.style.margin = '0';
    
    // تحديث حالة زر المفضلة
    updateFavoriteButtonState(favoriteButton);
    
    // إضافة مستمع للنقر
    favoriteButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavoriteState(this);
    });
}

// وظيفة تحسين التصفية - تعديل ليدعم الفلترة الديناميكية والتعرف على الفئات
function filterProducts() {
    console.log('جاري تطبيق التصفية المحسنة...');
    
    // التحقق من وضع العرض - إذا كنا في وضع المفضلة
    const urlParams = new URLSearchParams(window.location.search);
    const viewMode = urlParams.get('view');
    if (viewMode === 'favorites') {
        showFavoritesOnly();
        return; // لا داعي لتطبيق باقي الفلاتر
    }
    
    // تحديد عناصر التصفية
    const categorySelect = document.querySelector('select[name="category"]');
    const brandSelect = document.querySelector('select[name="brand"]');
    const priceSelect = document.querySelector('select[name="price"]');
    const saleCheckbox = document.querySelector('input[value="sale"]');
    const rentCheckbox = document.querySelector('input[value="rent"]');
    
    // الحصول على قيم التصفية
    const categoryFilter = categorySelect ? categorySelect.value : 'all';
    const brandFilter = brandSelect ? brandSelect.value : 'all';
    const priceFilter = priceSelect ? priceSelect.value : 'all';
    const saleFilter = saleCheckbox ? saleCheckbox.checked : true;
    const rentFilter = rentCheckbox ? rentCheckbox.checked : true;
    
    console.log('مرشحات التصفية:', {
        category: categoryFilter,
        brand: brandFilter,
        price: priceFilter,
        sale: saleFilter,
        rent: rentFilter
    });
    
    // تحليل نطاق السعر
    let minPrice = 0;
    let maxPrice = Infinity;
    
    if (priceFilter && priceFilter !== 'all') {
        const priceRange = priceFilter.split('-');
        if (priceRange.length === 2) {
            minPrice = parseInt(priceRange[0], 10) || 0;
            maxPrice = parseInt(priceRange[1], 10) || Infinity;
        } else if (priceFilter.endsWith('+')) {
            minPrice = parseInt(priceFilter.replace('+', ''), 10) || 0;
        }
    }
    
    console.log('نطاق السعر المحدد:', minPrice, 'إلى', maxPrice);
    
    // تحديد جميع بطاقات المنتجات
    const productCards = document.querySelectorAll('.camera-card, .product-card, .product');
    console.log('عدد بطاقات المنتجات:', productCards.length);
    
    // تصفية المنتجات
    let visibleCount = 0;
    
    productCards.forEach(card => {
        // إذا كان المنتج لا يحتوي على صفة الفئة، نحاول استخراجها من العنوان أو الوصف
        if (!card.dataset.category) {
            const title = card.querySelector('h3, .product-title, .camera-title')?.textContent || '';
            const description = card.querySelector('.product-specs, .camera-specs, .product-description')?.textContent || '';
            
            if (title.includes('كاميرا') || description.includes('كاميرا')) {
                card.dataset.category = 'cameras';
            } else if (title.includes('عدسة') || description.includes('عدسة')) {
                card.dataset.category = 'lenses';
            } else if (title.includes('حامل') || description.includes('حامل') || title.includes('ترايبود') || description.includes('ترايبود')) {
                card.dataset.category = 'tripods';
            } else if (title.includes('إضاءة') || description.includes('إضاءة') || title.includes('فلاش') || description.includes('فلاش')) {
                card.dataset.category = 'lighting';
            }
        }
        
        // إذا كان المنتج لا يحتوي على صفة العلامة التجارية، نحاول استخراجها من العنوان
        if (!card.dataset.brand) {
            const title = card.querySelector('h3, .product-title, .camera-title')?.textContent || '';
            
            const brands = ['كانون', 'Canon', 'نيكون', 'Nikon', 'سوني', 'Sony', 'فوجي', 'Fuji', 'باناسونيك', 'Panasonic'];
            
            for (const brand of brands) {
                if (title.includes(brand)) {
                    card.dataset.brand = brand.toLowerCase();
                    break;
                }
            }
        }
        
        // الحصول على خصائص المنتج
        const cardCategory = card.dataset.category || '';
        const cardBrand = card.dataset.brand || '';
        
        // الحصول على سعر المنتج بطريقة محسنة
        const priceElement = card.querySelector('.camera-price, .price, .product-price');
        let cardPrice = 0;
        
        if (priceElement) {
            const priceText = priceElement.textContent.trim();
            
            // استخراج الرقم من السعر
            let numericText = priceText.replace(/[^\d٠١٢٣٤٥٦٧٨٩]/g, '');
            
            // تحويل الأرقام العربية إلى إنجليزية
            const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            numericText = numericText.replace(/[٠١٢٣٤٥٦٧٨٩]/g, match => arabicDigits.indexOf(match));
            
            cardPrice = parseInt(numericText, 10) || 0;
        }
        
        // التحقق من توفر المنتج للبيع/التأجير
        const forSaleBadge = card.querySelector('.for-sale-badge');
        const forRentBadge = card.querySelector('.for-rent-badge');
        const priceText = priceElement?.textContent || '';
        
        const isForSale = (forSaleBadge !== null) || 
                         (forSaleBadge === null && forRentBadge === null && !priceText.includes('لليوم'));
        const isForRent = (forRentBadge !== null) || priceText.includes('لليوم');
        
        // تطبيق التصفية
        const matchesCategory = categoryFilter === 'all' || cardCategory === categoryFilter || categoryFilter === '';
        const matchesBrand = brandFilter === 'all' || cardBrand === brandFilter || brandFilter === '';
        const matchesPrice = priceFilter === 'all' || (cardPrice >= minPrice && cardPrice <= maxPrice);
        const matchesAvailability = (saleFilter && isForSale) || (rentFilter && isForRent);
        
        // تسجيل معلومات المنتج للتصحيح
        console.log(`منتج: ${card.querySelector('h3, .product-title')?.textContent || 'غير معروف'}`, {
            فئة: cardCategory,
            تطابق_الفئة: matchesCategory,
            ماركة: cardBrand,
            تطابق_الماركة: matchesBrand,
            سعر: cardPrice,
            تطابق_السعر: matchesPrice,
            متاح_للبيع: isForSale,
            متاح_للإيجار: isForRent,
            تطابق_التوفر: matchesAvailability
        });
        
        // تحديد ما إذا كان يجب عرض المنتج
        const shouldShow = matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
        
        // عرض أو إخفاء المنتج
        if (shouldShow) {
            card.style.display = '';
            card.classList.add('filtered-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('filtered-in');
        }
    });
    
    console.log('عدد المنتجات المعروضة بعد التصفية:', visibleCount);
    
    // إظهار رسالة إذا لم تكن هناك نتائج
    const noResultsMessage = document.querySelector('.no-results-message');
    
    if (visibleCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.style.textAlign = 'center';
            message.style.padding = '30px';
            message.style.color = '#666';
            message.style.fontSize = '18px';
            message.innerHTML = 'لا توجد منتجات تطابق معايير البحث. يرجى تعديل الفلاتر المستخدمة.';
            
            const productsGrid = document.querySelector('.product-grid, .all-products-grid, .products-container, .cameras-grid');
            if (productsGrid) {
                productsGrid.parentNode.insertBefore(message, productsGrid.nextSibling);
            }
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
    
    // تحديث الترقيم حسب المنتجات المعروضة
    const visibleProducts = Array.from(document.querySelectorAll('.camera-card.filtered-in, .product-card.filtered-in, .product.filtered-in'));
    updatePagination(visibleProducts);
    showPage(1, visibleProducts);
}

// وظيفة ترتيب المنتجات
function sortProducts() {
    const sortSelect = document.querySelector('select[name="sort"]');
    if (!sortSelect) return;
    
    const sortValue = sortSelect.value;
    console.log('ترتيب المنتجات حسب:', sortValue);
    
    const productsGrid = document.querySelector('.product-grid, .all-products-grid, .products-container, .cameras-grid');
    if (!productsGrid) return;
    
    const productCards = Array.from(productsGrid.querySelectorAll('.camera-card, .product-card, .product'));
    
    // ترتيب المنتجات
    productCards.sort((a, b) => {
        if (sortValue === 'price-asc' || sortValue === 'price-desc') {
            // الحصول على السعر من بطاقة المنتج
            const priceA = getProductPrice(a);
            const priceB = getProductPrice(b);
            
            if (sortValue === 'price-asc') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        } else if (sortValue === 'newest') {
            // ترتيب حسب التاريخ (هنا نستخدم الترتيب العكسي للعناصر)
            return -1; // في هذه الحالة نفترض أن العناصر الأحدث في البداية
        } else {
            // الترتيب الافتراضي (الأكثر مبيعاً)
            const isFeaturedA = a.querySelector('.camera-badge, .product-badge')?.textContent.includes('الأكثر مبيعاً') || false;
            const isFeaturedB = b.querySelector('.camera-badge, .product-badge')?.textContent.includes('الأكثر مبيعاً') || false;
            
            if (isFeaturedA && !isFeaturedB) return -1;
            if (!isFeaturedA && isFeaturedB) return 1;
            return 0;
        }
    });
    
    // إعادة ترتيب العناصر في DOM
    productCards.forEach(card => {
        productsGrid.appendChild(card);
    });
}

// وظيفة تحديث الترقيم حسب المنتجات المعروضة
function updatePagination(visibleProducts) {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    const totalPages = Math.ceil(visibleProducts.length / 10);
    pagination.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = i;
        link.className = 'page-link';
        link.dataset.page = i;
        
        if (i === 1) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = parseInt(this.dataset.page);
            showPage(page, visibleProducts);
        });
        
        pagination.appendChild(link);
    }
}

// وظيفة عرض صفحة معينة
function showPage(page, visibleProducts) {
    const start = (page - 1) * 10;
    const end = start + 10;
    const productsToShow = visibleProducts.slice(start, end);
    
    const productsGrid = document.querySelector('.product-grid, .all-products-grid, .products-container, .cameras-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(card => {
        productsGrid.appendChild(card);
    });
}

// تهيئة أزرار المفضلة
function initializeFavoriteButtons() {
    console.log('تهيئة أزرار المفضلة...');
    
    // تحديث أزرار المفضلة في الهيدر
    const headerFavButton = document.querySelector('.favorites-nav-link');
    if (headerFavButton) {
        headerFavButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'all-products.html?view=favorites';
        });
    }

    // تحديث أزرار المفضلة في المنتجات
    const favoriteButtons = document.querySelectorAll('.favorite-btn, .wishlist-btn');
    favoriteButtons.forEach(button => {
        // إضافة أيقونة القلب إذا لم تكن موجودة
        if (!button.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'far fa-heart';
            button.innerHTML = '';
            button.appendChild(icon);
        }

        // تحديث حالة الزر
        updateFavoriteButtonState(button);

        // إضافة مستمع الحدث
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFavoriteState(this);
        });
    });
}

// تحديث وظيفة تبديل حالة المفضلة
function toggleFavoriteState(button) {
    const productCard = button.closest('.product-card, .camera-card, .product');
    const productId = button.dataset.productId || 
                     productCard?.dataset.productId || 
                     productCard?.dataset.id;
    
    if (!productId) {
        console.error('لم يتم العثور على معرف المنتج');
        return;
    }
    
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(productId);
    const icon = button.querySelector('i');
    
    if (index === -1) {
        // إضافة للمفضلة
        favorites.push(productId);
        if (icon) {
            icon.className = 'fas fa-heart';
            icon.style.color = 'red';
            
            // إضافة تأثير النبض
            icon.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                icon.style.animation = '';
            }, 500);
        }
        // إظهار رسالة تأكيد
        showToast('تمت إضافة المنتج إلى المفضلة');
    } else {
        // إزالة من المفضلة
        favorites.splice(index, 1);
        if (icon) {
            icon.className = 'far fa-heart';
            icon.style.color = '#777';
        }
        // إظهار رسالة تأكيد
        showToast('تم إزالة المنتج من المفضلة');
    }
    
    // حفظ التغييرات
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // تحديث عداد المفضلة في الهيدر
    updateFavoritesCount();
}

// إضافة وظيفة لتحديث عداد المفضلة
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favCount = favorites.length;
    
    // تحديث العداد في الهيدر
    const favCounter = document.querySelector('.favorites-counter');
    if (favCounter) {
        favCounter.textContent = favCount;
        favCounter.style.display = favCount > 0 ? 'inline-block' : 'none';
    }
}

// إضافة وظيفة لإظهار رسائل التأكيد
function showToast(message) {
    // إنشاء عنصر التوست إذا لم يكن موجوداً
    let toast = document.getElementById('toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-message';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = '#165b8a';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.zIndex = '1000';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(toast);
    }
    
    // عرض الرسالة
    toast.textContent = message;
    toast.style.opacity = '1';
    
    // إخفاء الرسالة بعد ثانيتين
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2000);
}

// تحديث وظيفة إضافة زر صفحة المفضلة
function addFavoritesPageButton() {
    const navbar = document.querySelector('.navbar-nav') || document.querySelector('nav ul');
    if (!navbar) return;
    
    // إنشاء زر المفضلة مع العداد
    const favoritesItem = document.createElement('li');
    favoritesItem.className = 'nav-item';
    
    const favoritesLink = document.createElement('a');
    favoritesLink.className = 'nav-link favorites-nav-link';
    favoritesLink.href = 'all-products.html?view=favorites';
    favoritesLink.innerHTML = `
        <i class="fas fa-heart" style="color: red;"></i>
        <span>المفضلة</span>
        <span class="favorites-counter" style="
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 12px;
            margin-right: 5px;
            display: none;
        ">0</span>
    `;
    
    favoritesItem.appendChild(favoritesLink);
    navbar.appendChild(favoritesItem);
    
    // تحديث عداد المفضلة
    updateFavoritesCount();
}

// إضافة CSS للتأثيرات
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .favorite-btn i, .wishlist-btn i {
        transition: all 0.3s ease;
    }
    
    .favorite-btn:hover i, .wishlist-btn:hover i {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// عرض المنتجات المفضلة فقط
function showFavoritesOnly() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const productCards = document.querySelectorAll('.product-card, .camera-card, .product');
    
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const productId = card.dataset.productId || card.dataset.id;
        
        if (favorites.includes(productId)) {
            card.style.display = '';
            card.classList.add('favorite-item');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('favorite-item');
        }
    });
    
    // عرض رسالة إذا لم تكن هناك منتجات مفضلة
    if (visibleCount === 0) {
        const productsGrid = document.querySelector('.product-grid, .all-products-grid, .products-container, .cameras-grid');
        
        // إزالة رسائل سابقة
        const oldMessage = document.querySelector('.no-favorites-message');
        if (oldMessage) oldMessage.remove();
        
        // إنشاء رسالة جديدة
        const message = document.createElement('div');
        message.className = 'no-favorites-message';
        message.style.textAlign = 'center';
        message.style.padding = '50px 20px';
        message.style.color = '#666';
        message.style.fontSize = '18px';
        message.style.fontWeight = 'bold';
        message.innerHTML = 'لا توجد منتجات في المفضلة. <a href="all-products.html" style="color: #165b8a;">استعرض المنتجات</a>';
        
        if (productsGrid) {
            productsGrid.innerHTML = '';
            productsGrid.appendChild(message);
        }
    }
} 