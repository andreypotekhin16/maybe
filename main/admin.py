# main/admin.py
from django.contrib import admin
from .models import (
    Service, CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, BackgroundObject
)

# Базовые регистрации
admin.site.register(Service)
admin.site.register(OrbibolInfo)
admin.site.register(Feature)
admin.site.register(GameType)
admin.site.register(Product)
admin.site.register(GalleryItem)

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    pass

# Расширенная настройка для управления фоном
class BackgroundObjectInline(admin.TabularInline):
    model = BackgroundObject
    extra = 1 # Количество пустых форм для добавления
    # Добавляем новые поля в админку
    fields = ('name', 'image', 'width', 'initial_top', 'initial_left', 'opacity', 'z_index', 'animation_duration', 'animation_delay', 'parallax_target_id', 'parallax_speed', 'order')
    ordering = ('order',)

@admin.register(BackgroundSettings)
class BackgroundSettingsAdmin(admin.ModelAdmin):
    list_display = ('name',)
    fields = (
        'name', 
        'background_pattern', 'pattern_size', 'pattern_opacity', 'background_color'
    )
    inlines = [BackgroundObjectInline]

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False