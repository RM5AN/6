"""
URL configuration for shotspot project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from store import views as store_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # واجهات API للسلة
    path('api/cart/add/', store_views.add_to_cart, name='add_to_cart'),
    path('api/cart/count/', store_views.get_cart_count, name='get_cart_count'),
    
    # واجهات API للمفضلة
    path('api/wishlist/toggle/', store_views.toggle_wishlist, name='toggle_wishlist'),
    path('api/wishlist/count/', store_views.get_wishlist_count, name='get_wishlist_count'),
    path('api/wishlist/products/', store_views.get_wishlist_products, name='get_wishlist_products'),
    
    # واجهة API للبحث
    path('api/products/search/', store_views.search_products, name='search_products'),
]
