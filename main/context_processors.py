# main/context_processors.py

from .models import Section

def nav_sections(request):
    sections_for_nav = Section.objects.filter(is_active=True).order_by('order')
    return {'nav_sections': sections_for_nav}