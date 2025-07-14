# main/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# --- Основные модели контента ---

class CompanyProfile(models.Model):
    site_name = models.CharField(max_length=200, default="Название вашего клуба", verbose_name="Название сайта (в Title)")
    logo_image = models.FileField(upload_to='site_assets/', verbose_name="Логотип сайта (SVG/PNG)", blank=True, null=True)
    logo_image_light = models.FileField(upload_to='site_assets/', verbose_name="Логотип (светлый)", blank=True, null=True, help_text="Светлая версия логотипа для темных фонов (SVG/PNG)")
    favicon = models.FileField(upload_to='site_assets/', verbose_name="Фавикон", blank=True, null=True, help_text="Иконка для вкладки браузера (файл .ico, .png или .svg)")
    motto = models.CharField(max_length=255, blank=True, verbose_name="Девиз компании")
    about_us_text = models.TextField(blank=True, verbose_name="Текст 'О нас'")
    gallery_description = models.TextField(verbose_name='Описание для секции "Фото и видео галерея"', blank=True, null=True)
    contact_email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Контактный Email")
    contact_phone = models.CharField(max_length=50, blank=True, null=True, verbose_name="Контактный Телефон")
    contact_address = models.TextField(blank=True, null=True, verbose_name="Адрес")
    vk_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль VK")
    telegram_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль Telegram")
    youtube_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль YouTube")
    market_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка \"Еще больше товаров\" в Маркете")
    vk_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка VK (SVG/PNG)", blank=True, null=True)
    youtube_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка YouTube (SVG/PNG)", blank=True, null=True)
    telegram_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка Telegram (SVG/PNG)", blank=True, null=True)
    nav_toggle_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка для раскрытия меню (в свернутом хедере)", blank=True, null=True)
    
    class Meta:
        verbose_name = "1. Главные настройки сайта"
        verbose_name_plural = "1. Главные настройки сайта"
    def __str__(self):
        return self.site_name if self.site_name else "Настройки сайта"
    
class CarouselSlide(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='carousel_slides')
    name = models.CharField(max_length=200, verbose_name='Название/Заголовок слайда')
    short_description = models.CharField(max_length=255, blank=True, verbose_name='Краткое описание (под названием)')
    image = models.FileField(upload_to='carousel_slides/', verbose_name="Изображение для слайда")
    vk_link = models.URLField(blank=True, null=True, verbose_name="Ссылка для кнопки")
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок сортировки')
    
    class Meta:
        verbose_name = 'Слайд для карусели'
        verbose_name_plural = 'Слайды для карусели'
        ordering = ['order']

    def __str__(self):
        return self.name
    
class Section(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='sections')
    SECTION_CHOICES = [
        ('about_us', 'О нас'),
        ('features', 'Что мы предлагаем (Преимущества)'),
        ('carousel', 'Карусель'),
        ('orbibol', 'Орбибол'),
        ('games', 'Игры'),
        ('market', 'Маркет'),
        ('gallery', 'Фото и видео галерея'),
        ('contacts', 'Контакты'),
    ]
    section_type = models.CharField(max_length=50, choices=SECTION_CHOICES, unique=True, verbose_name="Тип секции")
    title = models.CharField(max_length=200, blank=True, verbose_name="Заголовок секции", help_text="Оставьте пустым, чтобы использовать заголовок по умолчанию.")
    show_title = models.BooleanField(default=True, verbose_name="Показывать заголовок")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок отображения")
    is_active = models.BooleanField(default=True, verbose_name="Секция включена")

    class Meta:
        verbose_name = "Секция на главной странице"
        verbose_name_plural = "Секции на главной странице"
        ordering = ['order']

    def __str__(self):
        return self.get_section_type_display()

class Feature(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='features')
    title = models.CharField(max_length=100, verbose_name="Заголовок преимущества")
    description = models.TextField(verbose_name="Описание преимущества")
    icon = models.FileField(upload_to='feature_icons/', verbose_name="Иконка (SVG или PNG)")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок отображения")
    class Meta:
        verbose_name = "Преимущество (Что мы предлагаем)"
        verbose_name_plural = "Преимущества (Что мы предлагаем)"
        ordering = ['order']
    def __str__(self):
        return self.title

class GameType(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='game_types')
    name = models.CharField(max_length=100, verbose_name="Название типа игры")
    description = models.TextField(verbose_name="Краткое описание типа игры")
    icon = models.FileField(upload_to='gametype_icons/', verbose_name="Иконка для типа игры (SVG или PNG)")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок отображения")
    class Meta:
        verbose_name = "Тип игры (секция 'Игры')"
        verbose_name_plural = "Типы игр (секция 'Игры')"
        ordering = ['order']
    def __str__(self):
        return self.name

class Product(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200, verbose_name="Название товара")
    price = models.PositiveIntegerField(verbose_name="Цена")
    description = models.TextField(verbose_name="Краткое описание товара")
    image = models.FileField(upload_to='product_images/', verbose_name="Изображение товара (SVG/PNG)")
    link = models.URLField(max_length=200, blank=True, null=True, verbose_name="Ссылка на страницу товара")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок отображения")
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"
        ordering = ['order']
    def __str__(self):
        return self.name

class GalleryItem(models.Model):
    company_profile = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, related_name='gallery_items')
    title = models.CharField(max_length=100, verbose_name="Заголовок (напр. Фотосъемка)")
    image = models.FileField(upload_to='gallery/', verbose_name="Изображение", blank=True, null=True, help_text="Загрузите, если это фото.")
    video = models.FileField(upload_to='gallery/', verbose_name="Видео (mp4, webm)", blank=True, null=True, help_text="Загрузите, если это видео.")
    order_link = models.URLField(verbose_name='Ссылка для кнопки "Заказать"')
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок отображения")
    class Meta:
        verbose_name = "Элемент галереи"
        verbose_name_plural = "Элементы галереи"
        ordering = ['order']
    def __str__(self):
        return self.title

# --- Отдельные, не связанные с CompanyProfile модели ---

class OrbibolInfo(models.Model):
    company_profile = models.OneToOneField(
        CompanyProfile, 
        on_delete=models.CASCADE, 
        related_name='orbibol_info'
        
    )

    general_info = models.TextField(verbose_name="Общая информация (первый абзац под заголовком 'Орбибол')")
    plot_title = models.CharField(max_length=100, default="Сюжетный орбибол", verbose_name="Заголовок блока 'Сюжетный'")
    plot_description = models.TextField(verbose_name="Описание для 'Сюжетный орбибол'")
    plot_icon = models.FileField(upload_to='orbibol_icons/', verbose_name="Иконка для \"Сюжетный орбибол\" (SVG/PNG)", blank=True, null=True)
    tactical_title = models.CharField(max_length=100, default="Тактический орбибол", verbose_name="Заголовок блока 'Тактический'")
    tactical_description = models.TextField(verbose_name="Описание для 'Тактический орбибол'")
    tactical_icon = models.FileField(upload_to='orbibol_icons/', verbose_name="Иконка для \"Тактический орбибол\" (SVG/PNG)", blank=True, null=True)
    details_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка 'Узнать подробнее'")
    class Meta:
        verbose_name = "Настройки секции 'Орбибол'"
        verbose_name_plural = "Настройки секции 'Орбибол'"
    def __str__(self):
        return "Информация для секции Орбибол"

class BackgroundSettings(models.Model):
    name = models.CharField(max_length=100, default="Основные настройки фона", verbose_name="Название набора настроек")
    background_pattern = models.FileField(upload_to='backgrounds/', blank=True, null=True, verbose_name="Паттерн фона (повторяющееся изображение)", help_text="Это изображение будет повторяться на фоне.")
    pattern_size = models.CharField(max_length=50, default="200px", verbose_name="Размер паттерна", help_text="CSS значение, например: '200px', '50%', 'cover', 'contain'.")
    pattern_opacity = models.DecimalField(max_digits=3, decimal_places=2, default=0.3, verbose_name="Прозрачность паттерна (от 0.0 до 1.0)", validators=[MinValueValidator(0), MaxValueValidator(1)])
    background_color = models.CharField(max_length=20, default="#010101", verbose_name="Основной цвет фона", help_text="CSS цвет, например: '#010101'. Будет под паттерном.")
    class Meta:
        verbose_name = "3. Настройки фона"
        verbose_name_plural = "3. Настройки фона"
    def __str__(self):
        return self.name

class BackgroundObject(models.Model):
    settings = models.ForeignKey(BackgroundSettings, on_delete=models.CASCADE, related_name='background_objects', verbose_name="Набор настроек")
    name = models.CharField(max_length=100, verbose_name="Название объекта")
    image = models.FileField(upload_to='backgrounds/objects/', verbose_name="Изображение объекта")
    width = models.PositiveIntegerField(default=150, verbose_name="Ширина объекта (px)")
    initial_top = models.CharField(max_length=10, default="50%", verbose_name="Начальная позиция сверху", help_text="CSS значение, например '50%' или '100px'")
    initial_left = models.CharField(max_length=10, default="50%", verbose_name="Начальная позиция слева", help_text="CSS значение, например '50%' или '100px'")
    animation_duration = models.PositiveIntegerField(default=20, verbose_name="Длительность анимации (секунд)", help_text="Длительность 'покачивания'. 0 чтобы отключить.")
    animation_delay = models.PositiveIntegerField(default=0, verbose_name="Задержка перед началом анимации (секунд)")
    opacity = models.DecimalField(max_digits=3, decimal_places=2, default=0.5, verbose_name="Прозрачность (от 0.0 до 1.0)", validators=[MinValueValidator(0), MaxValueValidator(1)])
    z_index = models.IntegerField(default=-9, verbose_name="Слой (z-index)", help_text="Чем меньше, тем 'ниже' объект. Паттерн фона на слое -10.")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок")
    parallax_target_id = models.CharField(max_length=100, blank=True, null=True, verbose_name="ID секции для параллакс-эффекта", help_text="Например: 'about-us-section'. Оставьте пустым, чтобы отключить параллакс.")
    parallax_speed = models.FloatField(default=0.3, verbose_name="Скорость параллакса", help_text="Например: 0.2 (медленнее скролла), 1 (вместе со скроллом), -0.5 (в обратную сторону)")
    class Meta:
        verbose_name = "Анимированный объект фона"
        verbose_name_plural = "Анимированные объекты фона"
        ordering = ['order']
    def __str__(self):
        return self.name