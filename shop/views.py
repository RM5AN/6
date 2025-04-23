
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from .models import CartItem, WishlistItem
from products.models import Product

import json

@csrf_exempt
@require_POST
def add_to_cart(request):
    data = json.loads(request.body)
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)

    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    product = Product.objects.get(id=product_id)
    item, created = CartItem.objects.get_or_create(user=request.user, product=product)
    if not created:
        item.quantity += quantity
    item.save()

    count = CartItem.objects.filter(user=request.user).count()
    return JsonResponse({'cart_count': count})


@login_required
def cart_count(request):
    count = CartItem.objects.filter(user=request.user).count()
    return JsonResponse({'cart_count': count})


@csrf_exempt
@require_POST
def toggle_wishlist(request):
    data = json.loads(request.body)
    product_id = data.get('product_id')

    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Authentication required'}, status=401)

    product = Product.objects.get(id=product_id)
    item, created = WishlistItem.objects.get_or_create(user=request.user, product=product)

    if not created:
        item.delete()
        in_wishlist = False
    else:
        in_wishlist = True

    count = WishlistItem.objects.filter(user=request.user).count()
    return JsonResponse({'wishlist_count': count, 'in_wishlist': in_wishlist})


@login_required
def wishlist_count(request):
    count = WishlistItem.objects.filter(user=request.user).count()
    return JsonResponse({'wishlist_count': count})


@login_required
def get_wishlist_products(request):
    wishlist = WishlistItem.objects.filter(user=request.user)
    data = [{'id': item.product.id} for item in wishlist]
    return JsonResponse({'products': data})


@login_required
def search_products(request):
    q = request.GET.get('q', '')
    products = Product.objects.filter(name__icontains=q)
    data = [{
        'id': product.id,
        'name': product.name,
        'price': str(product.price),
        'image': product.image.url if product.image else ''
    } for product in products]
    return JsonResponse({'products': data})
