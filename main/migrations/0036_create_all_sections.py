# main/migrations/0036_create_all_sections.py
from django.db import migrations

def create_initial_sections(apps, schema_editor):
    """
    Создает все недостающие секции для существующего профиля компании.
    Это гарантирует, что все типы секций, включая 'Карусель', существуют в БД.
    """
    CompanyProfile = apps.get_model('main', 'CompanyProfile')
    Section = apps.get_model('main', 'Section')

    # ВАЖНО: Мы определяем список секций прямо здесь, внутри миграции,
    # а не берем его из модели, чтобы избежать ошибки AttributeError.
    ALL_SECTIONS = [
        ('about_us', 'О нас'),
        ('features', 'Что мы предлагаем (Преимущества)'),
        ('carousel', 'Карусель'),
        ('orbibol', 'Орбибол'),
        ('games', 'Игры'),
        ('market', 'Маркет'),
        ('gallery', 'Фото и видео галерея'),
        ('contacts', 'Контакты'),
    ]

    profile = CompanyProfile.objects.first()
    if not profile:
        return

    for index, (section_type, display_name) in enumerate(ALL_SECTIONS):
        # Используем get_or_create, чтобы создать секцию, только если ее нет
        obj, created = Section.objects.get_or_create(
            company_profile=profile,
            section_type=section_type,
            defaults={
                'title': display_name,
                'order': index
            }
        )
        if created:
            print(f"Создана недостающая секция: {display_name}")

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0035_alter_orbibolinfo_options_alter_section_section_type_and_more'),
    ]

    operations = [
        migrations.RunPython(create_initial_sections, reverse_code=migrations.RunPython.noop),
    ]