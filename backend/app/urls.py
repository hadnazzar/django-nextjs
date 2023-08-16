"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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

from django.urls import path
from .views import user_login, user_login_or_register, user_registration, ProductListCreateView, ProductRetrieveUpdateDestroyView, product_search
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login', user_login, name='user-login'),
    path('login-or-register', user_login_or_register, name='user-login-or-register'),
    path('register', user_registration, name='user-registration'),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('products', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>', ProductRetrieveUpdateDestroyView.as_view(), name='product-retrieve-update-destroy'),
    path('products/search', product_search, name='product-search'),
]
