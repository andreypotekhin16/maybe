# main/admin.py
from django.contrib import admin
from .models import Service, CompanyProfile # Добавили CompanyProfile

admin.site.register(Service)
admin.site.register(CompanyProfile)


# admin.site.register(Product)
# ...