# main/admin.py
from django.contrib import admin
from .models import (
    Service, CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, BackgroundObject
)

# Расширенная настройка для модели Service
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_description', 'order', 'vk_link')
    list_editable = ('order',)
    # Поля для редактирования, включая новое поле hover_text
    fields = ('name', 'short_description', 'hover_text', 'detailed_description', 'image', 'vk_link', 'order')

# Базовые регистрации
admin.site.register(OrbibolInfo)
admin.site.register(Feature)
admin.site.register(GameType)
admin.site.register(Product)
admin.site.register(GalleryItem)

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Основные настройки', {
            'fields': ('site_name', 'logo_image', 'logo_image_light', 'motto', 'about_us_text')
        }),
        ('Ссылки на страницы', {
            'fields': ('market_link', 'gallery_description')
        }),
        ('Контакты и Соцсети', {
            'fields': ('contact_email', 'contact_phone', 'contact_address', 'vk_profile_link', 'telegram_profile_link', 'youtube_profile_link')
        }),
        ('Иконки', {
            'classes': ('collapse',),
            'fields': ('vk_icon', 'youtube_icon', 'telegram_icon', 'nav_toggle_icon')
        }),
    )

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
        # Разрешаем создавать только один объект настроек
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False