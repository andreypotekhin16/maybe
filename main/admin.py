# START OF FILE: main/admin.py
from django.contrib import admin
from django.utils.html import mark_safe
from .models import (
    # Service удалена из импорта
    CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, BackgroundObject
)

# --- Улучшение для предпросмотра изображений в админке ---
class ImagePreviewAdminMixin:
    """
    Миксин для добавления предпросмотра изображений в админ-панели Django.
    """
    def get_preview(self, obj, field_name, max_height=100, is_background=False):
        """Возвращает HTML для предпросмотра."""
        field = getattr(obj, field_name, None)
        if field and hasattr(field, 'url'):
            if is_background:
                 return mark_safe(f'<div style="width:{max_height}px; height:{max_height}px; background-image:url({field.url}); background-size: cover; border: 1px solid #ddd;"></div>')
            return mark_safe(f'<img src="{field.url}" style="max-height: {max_height}px; max-width: {max_height*2}px;" />')
        return "Нет изображения"

# --- Регистрация моделей ---

# КЛАСС И РЕГИСТРАЦИЯ МОДЕЛИ Service ПОЛНОСТЬЮ УДАЛЕНЫ

@admin.register(Feature)
class FeatureAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('title', 'order', 'icon_preview')
    list_editable = ('order',)
    readonly_fields = ('icon_preview',)
    fields = ('title', 'description', 'icon', 'icon_preview', 'order')

    def icon_preview(self, obj):
        return self.get_preview(obj, 'icon')
    icon_preview.short_description = 'Предпросмотр иконки'


@admin.register(GameType)
class GameTypeAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'order', 'icon_preview')
    list_editable = ('order',)
    readonly_fields = ('icon_preview',)
    fields = ('name', 'description', 'icon', 'icon_preview', 'order')

    def icon_preview(self, obj):
        return self.get_preview(obj, 'icon')
    icon_preview.short_description = 'Предпросмотр иконки'


@admin.register(Product)
class ProductAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'price', 'order', 'image_preview')
    list_editable = ('order',)
    readonly_fields = ('image_preview',)
    fields = ('name', 'price', 'description', 'image', 'image_preview', 'link', 'order')

    def image_preview(self, obj):
        return self.get_preview(obj, 'image', max_height=150)
    image_preview.short_description = 'Предпросмотр'


@admin.register(GalleryItem)
class GalleryItemAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('title', 'order', 'media_preview')
    list_editable = ('order',)
    readonly_fields = ('media_preview',)
    fields = ('title', 'image', 'video', 'media_preview', 'order_link', 'order')

    def media_preview(self, obj):
        if obj.image:
            return self.get_preview(obj, 'image', max_height=150)
        if obj.video:
            return mark_safe(f'<video src="{obj.video.url}" controls style="max-height: 150px; max-width: 300px;"></video>')
        return "Нет медиа"
    media_preview.short_description = 'Предпросмотр'


@admin.register(OrbibolInfo)
class OrbibolInfoAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    readonly_fields = ('plot_icon_preview', 'tactical_icon_preview')
    fieldsets = (
        (None, {'fields': ('general_info', 'details_link')}),
        ('Сюжетный орбибол', {'fields': ('plot_title', 'plot_description', 'plot_icon', 'plot_icon_preview')}),
        ('Тактический орбибол', {'fields': ('tactical_title', 'tactical_description', 'tactical_icon', 'tactical_icon_preview')}),
    )

    def plot_icon_preview(self, obj):
        return self.get_preview(obj, 'plot_icon')
    plot_icon_preview.short_description = 'Предпросмотр иконки'

    def tactical_icon_preview(self, obj):
        return self.get_preview(obj, 'tactical_icon')
    tactical_icon_preview.short_description = 'Предпросмотр иконки'


@admin.register(CompanyProfile)
class CompanyProfileAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    readonly_fields = (
        'logo_image_preview', 'logo_image_light_preview', 'favicon_preview', 'vk_icon_preview',
        'youtube_icon_preview', 'telegram_icon_preview', 'nav_toggle_icon_preview'
    )
    fieldsets = (
        ('Основные настройки', {
            'fields': (
                'site_name',
                ('logo_image', 'logo_image_preview'),
                ('logo_image_light', 'logo_image_light_preview'),
                ('favicon', 'favicon_preview'),
                'motto', 'about_us_text'
            )
        }),
        ('Ссылки на страницы', {'fields': ('market_link', 'gallery_description')}),
        ('Контакты и Соцсети', {'fields': ('contact_email', 'contact_phone', 'contact_address', 'vk_profile_link', 'telegram_profile_link', 'youtube_profile_link')}),
        ('Иконки', {
            'classes': ('collapse',),
            'fields': (
                ('vk_icon', 'vk_icon_preview'),
                ('youtube_icon', 'youtube_icon_preview'),
                ('telegram_icon', 'telegram_icon_preview'),
                ('nav_toggle_icon', 'nav_toggle_icon_preview')
            )
        }),
    )

    def _icon_preview(self, obj, field_name, style="max-height: 50px; max-width: 50px;"):
        field = getattr(obj, field_name)
        if field and hasattr(field, 'url'):
            return mark_safe(f'<img src="{field.url}" style="{style}" />')
        return "Нет иконки"

    def logo_image_preview(self, obj):
        return self._icon_preview(obj, 'logo_image', "max-height: 100px; max-width: 100px; background: #ccc; padding: 5px;")
    logo_image_preview.short_description = 'Предпросмотр'

    def logo_image_light_preview(self, obj):
        return self._icon_preview(obj, 'logo_image_light', "max-height: 100px; max-width: 100px; background: #333; padding: 5px;")
    logo_image_light_preview.short_description = 'Предпросмотр (светлый)'
    
    def favicon_preview(self, obj): return self._icon_preview(obj, 'favicon')
    favicon_preview.short_description = 'Предпросмотр Фавикона'

    def vk_icon_preview(self, obj): return self._icon_preview(obj, 'vk_icon')
    vk_icon_preview.short_description = 'Предпросмотр VK'

    def youtube_icon_preview(self, obj): return self._icon_preview(obj, 'youtube_icon')
    youtube_icon_preview.short_description = 'Предпросмотр YouTube'

    def telegram_icon_preview(self, obj): return self._icon_preview(obj, 'telegram_icon')
    telegram_icon_preview.short_description = 'Предпросмотр Telegram'

    def nav_toggle_icon_preview(self, obj): return self._icon_preview(obj, 'nav_toggle_icon')
    nav_toggle_icon_preview.short_description = 'Предпросмотр иконки меню'


class BackgroundObjectInline(ImagePreviewAdminMixin, admin.TabularInline):
    model = BackgroundObject
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('name', 'image', 'image_preview', 'width', 'initial_top', 'initial_left', 'opacity', 'z_index', 'animation_duration', 'animation_delay', 'parallax_target_id', 'parallax_speed', 'order')
    ordering = ('order',)

    def image_preview(self, obj):
        return self.get_preview(obj, 'image', max_height=75)
    image_preview.short_description = 'Предпросмотр'


@admin.register(BackgroundSettings)
class BackgroundSettingsAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'pattern_preview')
    readonly_fields = ('pattern_preview',)
    fields = ('name', 'background_pattern', 'pattern_preview', 'pattern_size', 'pattern_opacity', 'background_color')
    inlines = [BackgroundObjectInline]

    def pattern_preview(self, obj):
        return self.get_preview(obj, 'background_pattern', is_background=True)
    pattern_preview.short_description = 'Предпросмотр паттерна'

    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
# END OF FILE: main/admin.py