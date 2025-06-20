# main/views.py
from django.shortcuts import render
from .models import Service, CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem

def home_page_view(request):
    services = Service.objects.all()
    company_profile = CompanyProfile.objects.first() 
    orbibol_info = OrbibolInfo.objects.first()
    features = Feature.objects.all() 
    game_types = GameType.objects.all()
    products = Product.objects.all()
    gallery_items = GalleryItem.objects.all()
                                                    
    context = {
        'services': services,
        'company_profile': company_profile,
        'orbibol_info': orbibol_info,
        'features': features,
        'game_types': game_types,
        'products': products,
        'gallery_items': gallery_items,
    }
    return render(request, 'main/home_page.html', context)