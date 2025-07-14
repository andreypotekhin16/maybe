# main/views.py
from django.shortcuts import render
from .models import (
    CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, Section, CarouselSlide  # 1. ИМПОРТИРУЕМ CarouselSlide
)

def home_page_view(request):
    company_profile = CompanyProfile.objects.first() 
    orbibol_info = OrbibolInfo.objects.first()
    features = Feature.objects.all() 
    game_types = GameType.objects.all()
    products = Product.objects.all()
    gallery_items = GalleryItem.objects.all()
    background_settings = BackgroundSettings.objects.prefetch_related('background_objects').first()
    sections = Section.objects.filter(is_active=True).all()
    
    # 2. ПОЛУЧАЕМ ВСЕ СЛАЙДЫ ИЗ БАЗЫ ДАННЫХ
    carousel_slides = CarouselSlide.objects.all()
                                                    
    context = {
        'company_profile': company_profile,
        'orbibol_info': orbibol_info,
        'features': features,
        'game_types': game_types,
        'products': products,
        'gallery_items': gallery_items,
        'background_settings': background_settings,
        'sections': sections,  
        'carousel_slides': carousel_slides, # 3. ПЕРЕДАЕМ СЛАЙДЫ В ШАБЛОН
    }
    return render(request, 'main/home_page.html', context)

# Обработчики ошибок остаются без изменений
def custom_handler404(request, exception):
    context = {
        'company_profile': CompanyProfile.objects.first(),
        'background_settings': BackgroundSettings.objects.prefetch_related('background_objects').first(),
    }
    return render(request, "404.html", context, status=404)

def custom_handler500(request):
    context = {
        'company_profile': CompanyProfile.objects.first(),
        'background_settings': BackgroundSettings.objects.prefetch_related('background_objects').first(),
    }
    return render(request, "500.html", context, status=500)