from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Product
from django.db.models import Q

# Create your views here.

# واجهة API للسلة
@require_http_methods(["POST"])
def add_to_cart(request):
    data = json.loads(request.body)
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # إذا لم يكن المستخدم مسجل الدخول، نستخدم الجلسة لتخزين السلة
    if not request.user.is_authenticated:
        cart = request.session.get('cart', {})
        cart[product_id] = cart.get(product_id, 0) + quantity
        request.session['cart'] = cart
        cart_count = sum(cart.values())
    else:
        # يمكنك هنا إضافة المنتج إلى سلة المستخدم في قاعدة البيانات
        # مثال: Cart.objects.create(user=request.user, product_id=product_id, quantity=quantity)
        cart_count = 1  # يجب تحديث هذا من قاعدة البيانات
    
    return JsonResponse({'success': True, 'cart_count': cart_count})

@require_http_methods(["GET"])
def get_cart_count(request):
    if not request.user.is_authenticated:
        cart = request.session.get('cart', {})
        cart_count = sum(cart.values())
    else:
        # يمكنك هنا جلب عدد المنتجات في سلة المستخدم من قاعدة البيانات
        # مثال: cart_count = Cart.objects.filter(user=request.user).aggregate(Sum('quantity'))['quantity__sum'] or 0
        cart_count = 0  # يجب تحديث هذا من قاعدة البيانات
    
    return JsonResponse({'cart_count': cart_count})

# واجهة API للمفضلة
@require_http_methods(["POST"])
def toggle_wishlist(request):
    data = json.loads(request.body)
    product_id = data.get('product_id')
    
    # إذا لم يكن المستخدم مسجل الدخول، نستخدم الجلسة لتخزين المفضلة
    if not request.user.is_authenticated:
        wishlist = request.session.get('wishlist', [])
        in_wishlist = False
        
        if product_id in wishlist:
            wishlist.remove(product_id)
        else:
            wishlist.append(product_id)
            in_wishlist = True
        
        request.session['wishlist'] = wishlist
        wishlist_count = len(wishlist)
    else:
        # يمكنك هنا تبديل حالة المنتج في المفضلة في قاعدة البيانات
        # مثال:
        # wishlist_item = Wishlist.objects.filter(user=request.user, product_id=product_id).first()
        # if wishlist_item:
        #     wishlist_item.delete()
        #     in_wishlist = False
        # else:
        #     Wishlist.objects.create(user=request.user, product_id=product_id)
        #     in_wishlist = True
        in_wishlist = True  # يجب تحديث هذا من قاعدة البيانات
        wishlist_count = 1  # يجب تحديث هذا من قاعدة البيانات
    
    return JsonResponse({'success': True, 'in_wishlist': in_wishlist, 'wishlist_count': wishlist_count})

@require_http_methods(["GET"])
def get_wishlist_count(request):
    if not request.user.is_authenticated:
        wishlist = request.session.get('wishlist', [])
        wishlist_count = len(wishlist)
    else:
        # يمكنك هنا جلب عدد المنتجات في المفضلة من قاعدة البيانات
        # مثال: wishlist_count = Wishlist.objects.filter(user=request.user).count()
        wishlist_count = 0  # يجب تحديث هذا من قاعدة البيانات
    
    return JsonResponse({'wishlist_count': wishlist_count})

@require_http_methods(["GET"])
def get_wishlist_products(request):
    if not request.user.is_authenticated:
        wishlist = request.session.get('wishlist', [])
        products = []
        for product_id in wishlist:
            try:
                product = Product.objects.get(id=product_id)
                products.append({
                    'id': product.id,
                    'name': product.name,
                    'price': str(product.price),
                    'image': product.image.url if product.image else ''
                })
            except Product.DoesNotExist:
                continue
    else:
        # يمكنك هنا جلب منتجات المفضلة من قاعدة البيانات
        # مثال:
        # wishlist_products = Wishlist.objects.filter(user=request.user).select_related('product')
        # products = [
        #     {
        #         'id': item.product.id,
        #         'name': item.product.name,
        #         'price': str(item.product.price),
        #         'image': item.product.image.url if item.product.image else ''
        #     }
        #     for item in wishlist_products
        # ]
        products = []  # يجب تحديث هذا من قاعدة البيانات
    
    return JsonResponse({'products': products})

# واجهة API للبحث
@require_http_methods(["GET"])
def search_products(request):
    query = request.GET.get('q', '')
    
    if query:
        # البحث عن المنتجات في قاعدة البيانات
        products = Product.objects.filter(
            Q(name__icontains=query) | 
            Q(description__icontains=query) |
            Q(category__icontains=query) |
            Q(brand__icontains=query)
        )[:10]  # تحديد عدد النتائج
        
        results = [
            {
                'id': product.id,
                'name': product.name,
                'price': str(product.price),
                'image': product.image.url if product.image else ''
            }
            for product in products
        ]
    else:
        results = []
    
    return JsonResponse({'products': results})
