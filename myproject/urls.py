# myproject/urls.py
import os
from django.contrib import admin
from django.urls import path, include
# УБРАЛИ импорт static и settings, если они больше не нужны

ADMIN_URL = os.environ.get('ADMIN_URL', 'admin/')

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
    path('', include('main.urls')),
]

# БЛОК 'if settings.DEBUG is False' ПОЛНОСТЬЮ УДАЛЕН.
# В продакшене медиа будет раздавать Nginx.
# Для локальной разработки мы настроим раздачу по-другому (см. ниже).

handler404 = 'main.views.custom_handler404'
handler500 = 'main.views.custom_handler500'