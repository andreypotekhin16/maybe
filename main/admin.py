# main/admin.py
from django.contrib import admin
from .models import Service, CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem

admin.site.register(Service)
admin.site.register(CompanyProfile)
admin.site.register(OrbibolInfo)
admin.site.register(Feature)
admin.site.register(GameType)
admin.site.register(Product)
admin.site.register(GalleryItem)