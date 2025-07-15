from .models import Section

def nav_sections(request):
    """
    Добавляет список активных секций для навигации в контекст всех шаблонов.
    """
    # Запрашиваем только активные секции и сразу сортируем их по полю 'order'
    sections_for_nav = Section.objects.filter(is_active=True).order_by('order')
    
    # Возвращаем словарь, который будет добавлен в контекст
    return {'nav_sections': sections_for_nav}