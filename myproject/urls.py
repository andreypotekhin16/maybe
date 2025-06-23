# myproject/urls.py

import os
from django.contrib import admin
from django.urls import path, include

# Мы убрали лишние импорты (re_path, RedirectView, settings, static)

ADMIN_URL = os.environ.get('ADMIN_URL', 'admin/')

urlpatterns = [
    path(ADMIN_URL, admin.site.urls),
    path('', include('main.urls')),
]

# Обработчики ошибок остаются, они нам нужны
handler404 = 'main.views.custom_handler404'
handler500 = 'main.views.custom_handler500'