# main/views.py
from django.shortcuts import render
from .models import (
    Service, CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings
)

def home_page_view(request):
    services = Service.objects.all()
    company_profile = CompanyProfile.objects.first() 
    orbibol_info = OrbibolInfo.objects.first()
    features = Feature.objects.all() 
    game_types = GameType.objects.all()
    products = Product.objects.all()
    gallery_items = GalleryItem.objects.all()
    background_settings = BackgroundSettings.objects.prefetch_related('background_objects').first()
                                                    
    context = {
        'services': services,
        'company_profile': company_profile,
        'orbibol_info': orbibol_info,
        'features': features,
        'game_types': game_types,
        'products': products,
        'gallery_items': gallery_items,
        'background_settings': background_settings,
    }
    return render(request, 'main/home_page.html', context)

# --- ИЗМЕНЕНИЕ: Упрощаем обработчики ошибок, убираем запросы к БД ---

def custom_handler404(request, exception):
    # Теперь мы не передаем никакой контекст, так как base.html
    # уже умеет работать с пустыми переменными.
    # Мы предполагаем, что у вас есть шаблон 404.html.
    return render(request, "404.html", status=404)

def custom_handler500(request):
    # То же самое для 500-й ошибки.
    # Мы предполагаем, что у вас есть шаблон 500.html.
    return render(request, "500.html", status=500)