from django.contrib import admin
from django.utils.html import mark_safe
from django import forms
from .models import (
    CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, BackgroundObject, Section, CarouselSlide, CustomFont,
    SEOSettings
)

def get_all_font_choices():
    static_choices = list(CompanyProfile.FONT_CHOICES)
    try:
        custom_font_choices = [(font.name, f"{font.name} (кастомный)") for font in CustomFont.objects.all()]
        return static_choices + custom_font_choices
    except Exception:
        return static_choices

class CompanyProfileForm(forms.ModelForm):
    header_font = forms.ChoiceField(label="Шрифт для заголовков (H1, H2 и т.д.)")
    body_font = forms.ChoiceField(label="Шрифт для основного текста (параграфы)")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        all_choices = get_all_font_choices()
        self.fields['header_font'].choices = all_choices
        self.fields['body_font'].choices = all_choices

    class Meta:
        model = CompanyProfile
        fields = '__all__'

@admin.register(CustomFont)
class CustomFontAdmin(admin.ModelAdmin):
    list_display = ('name', 'font_file_otf', 'font_file_ttf', 'font_file_woff', 'font_file_woff2')

@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ('company_profile', 'meta_title', 'meta_description')
    fieldsets = (
        (None, {
            'fields': ('company_profile',),
            'description': 'Здесь собраны все глобальные настройки для поисковой оптимизации сайта.'
        }),
        ('Основные Meta-теги', {
            'fields': ('meta_title', 'meta_description', 'meta_keywords'),
        }),
        ('Open Graph (для репостов в соцсети)', {
            'classes': ('collapse',),
            'fields': ('og_title', 'og_description', 'og_image'),
        }),
        ('Структурированные данные (JSON-LD)', {
            'classes': ('collapse',),
            'description': 'Этот блок для SEO-специалиста. Позволяет поисковым роботам лучше понимать контент вашего сайта.',
            'fields': ('json_ld_schema',),
        }),
    )

    def has_add_permission(self, request):
        return self.model.objects.count() == 0

    def has_delete_permission(self, request, obj=None):
        return False

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

class SectionInline(admin.TabularInline):
    model = Section
    extra = 0
    readonly_fields = ('section_type',)
    fields = ('section_type', 'title', 'show_title', 'order', 'is_active')
    ordering = ('order',)
    can_delete = False
    
    def has_add_permission(self, request, obj=None):
        return False

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
    fields = ('name', 'price', 'description', 'image', 'link', 'button_text', 'order')

class GalleryItemInline(admin.TabularInline):
    model = GalleryItem
    fields = ('image', 'video', 'order')
    extra = 10 
    ordering = ('order',)

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    form = CompanyProfileForm
    readonly_fields = ('logo_image_preview','logo_image_light_preview','favicon_preview','vk_icon_preview','youtube_icon_preview','telegram_icon_preview','nav_toggle_icon_preview', 'mobile_menu_indicator_icon_preview')
    
    fieldsets = (
        ('Основные настройки сайта', {'fields': ('site_name',('logo_image', 'logo_image_preview'),('logo_image_light', 'logo_image_light_preview'),('favicon', 'favicon_preview'),)}),
        ('Настройки шрифтов и вида', {'fields': ('header_font', 'body_font', 'section_vertical_padding')}),
        ('Секция "О нас"', {'fields': ('motto', 'about_us_text')}),
        ('Настройки других секций', {
            'description': 'Здесь можно изменить ссылки и тексты для кнопок на сайте.', 
            'fields': ('orbibol_details_button_text', 'market_link', 'market_button_text', 'gallery_description', 'gallery_button_link', 'gallery_button_text')
        }),
        ('Контакты и Соцсети', {'classes': ('collapse',), 'fields': ('contact_email', 'contact_phone', 'contact_address', 'vk_profile_link', 'telegram_profile_link', 'youtube_profile_link', ('vk_icon', 'vk_icon_preview'), ('youtube_icon', 'youtube_icon_preview'), ('telegram_icon', 'telegram_icon_preview'))}),
        ('Технические иконки', {'classes': ('collapse',),'fields': (
            ('nav_toggle_icon', 'nav_toggle_icon_preview'),
            ('mobile_menu_indicator_icon', 'mobile_menu_indicator_icon_preview')
        )})
    )
    
    inlines = [
        SectionInline,
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
    def mobile_menu_indicator_icon_preview(self, obj): return self._icon_preview(obj, 'mobile_menu_indicator_icon')
    
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