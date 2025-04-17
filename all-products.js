document.addEventListener('DOMContentLoaded', function() {
    // تشخيص العناصر
    console.log('شبكة المنتجات:', document.querySelector('.product-grid, .all-products-grid, .products-container, .products'));
    console.log('بطاقات المنتجات:', document.querySelectorAll('.product-card, .camera-card, .product').length);
    console.log('عناصر السعر:', document.querySelectorAll('.price, .product-price').length);
    
    // ثم تنفيذ التنسيق
    replaceRiyalWithSymbol();
    styleProductGrid();
    styleProductCards();
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
    const productGrid = document.querySelector('.product-grid') || document.querySelector('.all-products-grid') || document.querySelector('.products-container');
    
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

// إضافة فلتر البيع/التأجير إلى وظيفة الفلترة
function filterProducts() {
    // الكود الحالي للفلترة...
    
    // إضافة فلترة البيع/التأجير
    const saleFilter = document.querySelector('input[value="sale"]').checked;
    const rentFilter = document.querySelector('input[value="rent"]').checked;
    
    // تطبيق الفلتر على المنتجات
    productCards.forEach(card => {
        // استمر في كود الفلترة الموجود...
        
        // تحقق من توفر المنتج للبيع/التأجير
        const isForSale = card.querySelector('.for-sale-badge') !== null;
        const isForRent = card.querySelector('.for-rent-badge') !== null;
        
        const matchesAvailability = 
            (saleFilter && isForSale) || 
            (rentFilter && isForRent);
            
        // أضف شرط التوفر إلى شروط الفلترة
        const shouldShow = matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
        
        // الكود المستمر للفلترة...
    });
}

// استدعاء وظيفة الفلترة عند تغيير فلاتر البيع/التأجير
document.querySelectorAll('input[name="availability"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
}); 