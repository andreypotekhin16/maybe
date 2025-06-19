
# main/views.py
from django.shortcuts import render
from .models import Service, CompanyProfile # УБЕДИСЬ, ЧТО CompanyProfile ЗДЕСЬ ИМПОРТИРОВАН

def home_page_view(request):
    services = Service.objects.all()
    
    # Пытаемся получить профиль компании.
    company_profile = CompanyProfile.objects.first() # Эта строка должна быть
                                                
    context = {
        'services': services,
        'company_profile': company_profile, # И эта строка, передающая company_profile в контекст
        
        # Если ты уже добавил orbibol_info, то и оно тут должно быть:
        # 'orbibol_info': orbibol_info, 
    }
    return render(request, 'main/home_page.html', context)