"""ecommerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.urls import path, include
from django.conf.urls import url

from .views import home_page, about_page, contact_page, login_page, register_page, logout_page

from .api import PersonViewSet, RegisterAPI, LoginAPI, UserAPI
from rest_framework import routers
from knox import views as knox_views

routers = routers.DefaultRouter()
routers.register('person', PersonViewSet, 'person')

urlpatterns = [
    path('api/', include(routers.urls)),
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    # url(r'^$', home_page),
    # url(r'^about/$', about_page),
    # url(r'^contact$', contact_page),
    # url(r'^login/', login_page),
    # url(r'^logout/', logout_page),
    # url(r'^register/', register_page),
]
