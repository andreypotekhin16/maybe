# main/urls.py
from django.urls import path
from . import views

app_name = 'main' # Хорошая практика для именования URL'ов

urlpatterns = [
    path('', views.home_page_view, name='home_page'),
]