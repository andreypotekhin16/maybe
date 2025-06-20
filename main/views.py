# main/views.py
from django.shortcuts import render
from .models import Service, CompanyProfile, OrbibolInfo, Feature, GameType # Добавили GameType

def home_page_view(request):
    services = Service.objects.all()
    company_profile = CompanyProfile.objects.first() 
    orbibol_info = OrbibolInfo.objects.first()
    features = Feature.objects.all() 
    game_types = GameType.objects.all() # Получаем все типы игр
                                                    
    context = {
        'services': services,
        'company_profile': company_profile,
        'orbibol_info': orbibol_info,
        'features': features,
        'game_types': game_types, # Добавляем в контекст
    }
    return render(request, 'main/home_page.html', context)