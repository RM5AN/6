
from django.urls import path
from . import views

urlpatterns = [
    path('api/cart/add/', views.add_to_cart),
    path('api/cart/count/', views.cart_count),
    path('api/wishlist/toggle/', views.toggle_wishlist),
    path('api/wishlist/count/', views.wishlist_count),
    path('api/wishlist/products/', views.get_wishlist_products),
    path('api/products/search/', views.search_products),
]
