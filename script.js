// جعل المنتج ينبض عند اللمس
function pulseEffect(element) {
    element.style.animation = "pulse 0.3s ease-in-out";
    setTimeout(() => {
        element.style.animation = "";
    }, 300);
}

// تهيئة الرسائل التفاعلية
function initToasts() {
    // إنشاء حاوية الرسائل التفاعلية إذا لم تكن موجودة
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // إضافة مستمعات الأحداث لأزرار المفضلة
    const wishlistButtons = document.querySelectorAll('.wishlist-btn, .heart-icon');
    wishlistButtons.forEach(button => {
        // إزالة مستمعات الأحداث السابقة لتجنب التكرار
        button.removeEventListener('click', handleWishlistClick);
        // إضافة مستمع جديد
        button.addEventListener('click', handleWishlistClick);
    });
    
    // إضافة مستمعات الأحداث لأزرار سلة التسوق
    const cartButtons = document.querySelectorAll('.add-to-cart, .cart-icon');
    cartButtons.forEach(button => {
        // إزالة مستمعات الأحداث السابقة لتجنب التكرار
        button.removeEventListener('click', handleCartClick);
        // إضافة مستمع جديد
        button.addEventListener('click', handleCartClick);
    });
}

// معالج النقر على زر المفضلة
function handleWishlistClick(e) {
    // منع السلوك الافتراضي فقط إذا كان الزر ليس رابطًا للانتقال لصفحة المفضلة
    if (!this.classList.contains('heart-icon')) {
        e.preventDefault();
    }
    
    // إضافة تأثير النبض للأيقونة
    const heartIcon = this.querySelector('i') || this;
    if (heartIcon.closest('.heart-icon')) {
        heartIcon.closest('.heart-icon').classList.add('pulse');
        
        // إزالة تأثير النبض بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            heartIcon.closest('.heart-icon').classList.remove('pulse');
        }, 500);
    }
    
    // عرض رسالة تفاعلية
    showToast('تمت إضافة المنتج إلى المفضلة', 'wishlist', 'fas fa-heart');
}

// معالج النقر على زر سلة التسوق
function handleCartClick(e) {
    // منع السلوك الافتراضي فقط إذا كان الزر ليس رابطًا للانتقال لصفحة السلة
    if (!this.classList.contains('cart-icon')) {
        e.preventDefault();
    }
    
    // إضافة تأثير النبض للأيقونة
    const cartIcon = this.querySelector('i') || this;
    if (cartIcon.closest('.cart-icon')) {
        cartIcon.closest('.cart-icon').classList.add('pulse');
        
        // إزالة تأثير النبض بعد انتهاء الرسوم المتحركة
        setTimeout(() => {
            cartIcon.closest('.cart-icon').classList.remove('pulse');
        }, 500);
    }
    
    // عرض رسالة تفاعلية
    showToast('تمت إضافة المنتج إلى سلة التسوق', 'cart', 'fas fa-shopping-cart');
}

// دالة لعرض الرسائل التفاعلية
function showToast(message, type, icon) {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;
    
    // إنشاء عنصر الرسالة
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    
    // إضافة محتوى الرسالة
    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
        <button class="toast-close" aria-label="إغلاق">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // إضافة الرسالة إلى الحاوية
    toastContainer.appendChild(toast);
    
    // إظهار الرسالة بتأثير انزلاقي
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // إزالة الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// تهيئة الرسائل التفاعلية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initToasts);
