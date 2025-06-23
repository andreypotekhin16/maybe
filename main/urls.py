# main/urls.py
from django.urls import path, re_path
from django.views.generic.base import RedirectView
from . import views

app_name = 'main' # Хорошая практика для именования URL'ов

urlpatterns = [
    path('', views.home_page_view, name='home_page'),
    # Добавляем редирект для иконки сайта, чтобы убрать ошибку 404 из логов
    re_path(r'^favicon\.ico$', RedirectView.as_view(url='/static/main/images/favicon.ico', permanent=True)),
]