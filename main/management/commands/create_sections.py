from django.core.management.base import BaseCommand
from main.models import Section, CompanyProfile

class Command(BaseCommand):
    help = 'Создает недостающие объекты Section для первого CompanyProfile'

    def handle(self, *args, **options):
        profile = CompanyProfile.objects.first()
        if not profile:
            self.stdout.write(self.style.ERROR('!!! Ошибка: Сначала создайте "Главные настройки сайта" в админ-панели!'))
            return

        self.stdout.write(self.style.SUCCESS(f'Работаем с профилем: {profile.site_name}'))

        ALL_SECTIONS = [
            {'type': 'about_us', 'title': 'О нас', 'order': 0},
            {'type': 'features', 'title': 'Что мы предлагаем', 'order': 1},
            {'type': 'carousel', 'title': 'Запись на игры', 'order': 2},
            {'type': 'orbibol', 'title': 'Орбибол', 'order': 3},
            {'type': 'games', 'title': 'Игры', 'order': 4},
            {'type': 'market', 'title': 'Маркет', 'order': 5},
            {'type': 'gallery', 'title': 'Фото и видео галерея', 'order': 6},
            {'type': 'contacts', 'title': 'Контакты', 'order': 7},
        ]

        created_count = 0
        for section_data in ALL_SECTIONS:
            # Используем get_or_create для безопасного создания
            obj, created = Section.objects.get_or_create(
                section_type=section_data['type'],
                defaults={
                    'company_profile': profile,
                    'title': section_data['title'],
                    'order': section_data['order'],
                    'is_active': True,
                    'show_title': True,
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"-> Создана секция: '{section_data['title']}'"))
                created_count += 1
            else:
                self.stdout.write(self.style.NOTICE(f"-> Секция '{section_data['title']}' уже существует."))
        
        if created_count > 0:
            self.stdout.write(self.style.SUCCESS(f'\nГотово! Создано {created_count} новых секций.'))
        else:
            self.stdout.write(self.style.SUCCESS('\nВсе секции уже были на месте.'))