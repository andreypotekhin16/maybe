# main/admin.py

from django.contrib import admin
from django.utils.html import mark_safe
from django import forms
from .models import (
    CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, BackgroundObject, Section, CarouselSlide, CustomFont
)

@admin.register(CustomFont)
class CustomFontAdmin(admin.ModelAdmin):
    list_display = ('name', 'font_file_otf', 'font_file_ttf', 'font_file_woff', 'font_file_woff2')


# === НОВАЯ ОТДЕЛЬНАЯ АДМИН-ПАНЕЛЬ ДЛЯ СЕКЦИЙ ===
@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    # Поля, которые будут отображаться в списке
    list_display = ('get_section_type_display', 'title', 'order', 'is_active', 'show_title')
    
    # Поля, которые можно редактировать прямо в списке
    list_editable = ('title', 'order', 'is_active', 'show_title')
    
    # Сортировка по умолчанию
    ordering = ('order',)
    
    # Запрещаем создавать или удалять секции, так как они системные
    def has_add_permission(self, request):
        return False
        
    def has_delete_permission(self, request, obj=None):
        return False
        
    def get_section_type_display(self, obj):
        # Метод для красивого отображения названия
        return obj.get_section_type_display()
    get_section_type_display.short_description = 'Тип секции'


class ImagePreviewAdminMixin:
    def get_preview(self, obj, field_name, max_height=100, is_background=False):
        field = getattr(obj, field_name, None)
        if field and hasattr(field, 'url'):
            if is_background:
                 return mark_safe(f'<div style="width:{max_height}px; height:{max_height}px; background-image:url({field.url}); background-size: cover; border: 1px solid #ddd;"></div>')
            return mark_safe(f'<img src="{field.url}" style="max-height: {max_height}px; max-width: {max_height*2}px;" />')
        return "Нет изображения"


class OrbibolInfoInline(ImagePreviewAdminMixin, admin.StackedInline):
    model = OrbibolInfo
    can_delete = False
    verbose_name_plural = 'Настройки для секции "Орбибол"'
    readonly_fields = ('plot_icon_preview', 'tactical_icon_preview')
    fieldsets = (
        (None, {'fields': ('general_info', 'details_link')}),
        ('Сюжетный орбибол', {'fields': ('plot_title', 'plot_description', 'plot_icon', 'plot_icon_preview')}),
        ('Тактический орбибол', {'fields': ('tactical_title', 'tactical_description', 'tactical_icon', 'tactical_icon_preview')}),
    )
    def plot_icon_preview(self, obj): return self.get_preview(obj, 'plot_icon', max_height=75)
    plot_icon_preview.short_description = 'Предпросмотр иконки (Сюжетный)'
    def tactical_icon_preview(self, obj): return self.get_preview(obj, 'tactical_icon', max_height=75)
    tactical_icon_preview.short_description = 'Предпросмотр иконки (Тактический)'


class CarouselSlideInline(admin.TabularInline):
    model = CarouselSlide
    extra = 1
    ordering = ('order',)
    fields = ('name', 'date_text', 'hover_description', 'image', 'vk_link', 'order')


class FeatureInline(admin.TabularInline):
    model = Feature
    extra = 1
    ordering = ('order',)
    fields = ('title', 'description', 'icon', 'order')


class GameTypeInline(admin.TabularInline):
    model = GameType
    extra = 1
    ordering = ('order',)
    fields = ('name', 'description', 'icon', 'order')


class ProductInline(admin.TabularInline):
    model = Product
    extra = 1
    ordering = ('order',)
    fields = ('name', 'price', 'description', 'image', 'link', 'order')


class GalleryItemInline(admin.TabularInline):
    model = GalleryItem
    fields = ('image', 'video', 'order')
    extra = 10 
    ordering = ('order',)


class CompanyProfileForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        try:
            custom_fonts = [(font.name, f"{font.name} (кастомный)") for font in CustomFont.objects.all()]
            base_choices = list(self.fields['header_font'].choices)
            self.fields['header_font'].choices = base_choices + custom_fonts
            self.fields['body_font'].choices = base_choices + custom_fonts
        except Exception:
            pass

    class Meta:
        model = CompanyProfile
        fields = '__all__'


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    form = CompanyProfileForm
    readonly_fields = ('logo_image_preview','logo_image_light_preview','favicon_preview','vk_icon_preview','youtube_icon_preview','telegram_icon_preview','nav_toggle_icon_preview')
    
    # Добавляем пояснение, где теперь редактировать секции
    fieldsets = (
        ('Основные настройки сайта', {'fields': ('site_name',('logo_image', 'logo_image_preview'),('logo_image_light', 'logo_image_light_preview'),('favicon', 'favicon_preview'),)}),
        ('Настройки шрифтов', {'fields': ('header_font', 'body_font')}),
        ('Секция "О нас"', {'fields': ('motto', 'about_us_text')}),
        ('Настройки других секций', {
            'description': 'Настройки для секций "Маркет" и "Галерея". <b>Порядок и названия секций теперь редактируются в отдельном разделе "Секции на главной странице" в главном меню админки.</b>', 
            'fields': ('market_link', 'gallery_description', 'gallery_button_link', 'gallery_button_text')
        }),
        ('Контакты и Соцсети', {'classes': ('collapse',), 'fields': ('contact_email', 'contact_phone', 'contact_address', 'vk_profile_link', 'telegram_profile_link', 'youtube_profile_link', ('vk_icon', 'vk_icon_preview'), ('youtube_icon', 'youtube_icon_preview'), ('telegram_icon', 'telegram_icon_preview'))}),
        ('Технические иконки', {'classes': ('collapse',),'fields': (('nav_toggle_icon', 'nav_toggle_icon_preview'),)})
    )
    
    # УБИРАЕМ SectionInline ОТСЮДА
    inlines = [
        CarouselSlideInline,
        OrbibolInfoInline,
        FeatureInline,
        GameTypeInline,
        ProductInline,
        GalleryItemInline,
    ]

    def _icon_preview(self, obj, field_name, style="max-height: 50px;"):
        field = getattr(obj, field_name)
        if field and hasattr(field, 'url'):
            return mark_safe(f'<img src="{field.url}" style="{style}" />')
        return "Нет иконки"
        
    def logo_image_preview(self, obj): return self._icon_preview(obj, 'logo_image', "max-height: 80px; background: #ccc; padding: 5px;")
    def logo_image_light_preview(self, obj): return self._icon_preview(obj, 'logo_image_light', "max-height: 80px; background: #333; padding: 5px;")
    def favicon_preview(self, obj): return self._icon_preview(obj, 'favicon')
    def vk_icon_preview(self, obj): return self._icon_preview(obj, 'vk_icon')
    def youtube_icon_preview(self, obj): return self._icon_preview(obj, 'youtube_icon')
    def telegram_icon_preview(self, obj): return self._icon_preview(obj, 'telegram_icon')
    def nav_toggle_icon_preview(self, obj): return self._icon_preview(obj, 'nav_toggle_icon')
    
    def has_add_permission(self, request): return self.model.objects.count() == 0
    def has_delete_permission(self, request, obj=None): return False


class BackgroundObjectInline(ImagePreviewAdminMixin, admin.TabularInline):
    model = BackgroundObject
    extra = 1
    readonly_fields = ('image_preview',)
    fields = ('name', 'image', 'image_preview', 'width', 'initial_top', 'initial_left', 'opacity', 'z_index', 'animation_duration', 'animation_delay', 'parallax_target_id', 'parallax_speed', 'order')
    ordering = ('order',)
    def image_preview(self, obj): return self.get_preview(obj, 'image', max_height=75)
    image_preview.short_description = 'Предпросмотр'


@admin.register(BackgroundSettings)
class BackgroundSettingsAdmin(ImagePreviewAdminMixin, admin.ModelAdmin):
    list_display = ('name', 'pattern_preview')
    readonly_fields = ('pattern_preview',)
    fields = ('name', 'background_pattern', 'pattern_preview', 'pattern_size', 'pattern_opacity', 'background_color')
    inlines = [BackgroundObjectInline]
    def pattern_preview(self, obj): return self.get_preview(obj, 'background_pattern', is_background=True)
    pattern_preview.short_description = 'Предпросмотр паттерна'
    def has_add_permission(self, request): return self.model.objects.count() == 0
    def has_delete_permission(self, request, obj=None): return False