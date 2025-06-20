# main/admin.py
from django.contrib import admin
from .models import Service, CompanyProfile, OrbibolInfo, Feature, GameType # Добавили GameType

admin.site.register(Service)
admin.site.register(CompanyProfile)
admin.site.register(OrbibolInfo)
admin.site.register(Feature)
admin.site.register(GameType) # Зарегистрировали GameType