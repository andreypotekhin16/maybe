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

def custom_handler404(request, exception):
    company_profile = CompanyProfile.objects.first()
    background_settings = BackgroundSettings.objects.prefetch_related('background_objects').first()
    context = {
        'company_profile': company_profile,
        'background_settings': background_settings,
    }
    response = render(request, '404.html', context)
    response.status_code = 404
    return response

def custom_handler500(request):
    company_profile = CompanyProfile.objects.first()
    background_settings = BackgroundSettings.objects.prefetch_related('background_objects').first()
    context = {
        'company_profile': company_profile,
        'background_settings': background_settings,
    }
    response = render(request, '500.html', context)
    response.status_code = 500
    return response