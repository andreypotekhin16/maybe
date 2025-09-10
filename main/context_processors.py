# START OF FILE: main/context_processors.py
from .models import Section, CustomFont

def global_context(request):
   
    sections_for_nav = Section.objects.filter(is_active=True).order_by('order')
    custom_fonts = CustomFont.objects.all()
    
    return {
        'nav_sections': sections_for_nav,
        'custom_fonts': custom_fonts,
    }