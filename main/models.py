# myproject/main/models.py

from django.db import models

class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название игры/услуги (для Записи на игру)")
    short_description = models.CharField(max_length=255, blank=True, null=True, verbose_name="Краткое описание/даты (для карусели)")
    detailed_description = models.TextField(verbose_name="Подробное описание (Когда, Жанры, Цена и т.д.)", default="Подробное описание скоро появится.")
    image = models.FileField(upload_to='service_arts/', verbose_name="Арт для игры (для карусели, SVG/PNG)", blank=True, null=True) 
    vk_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на VK для записи")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок сортировки")


    class Meta:
        verbose_name = "Игра/Услуга (для Записи на игру)"
        verbose_name_plural = "Игры/Услуги (для Записи на игру)"
        ordering = ['order', 'name'] 

    def __str__(self):
        return self.name


class CompanyProfile(models.Model):
    site_name = models.CharField(max_length=200, default="Название вашего клуба", verbose_name="Название сайта (в Title)")
    logo_image = models.FileField(upload_to='site_assets/', verbose_name="Логотип сайта (SVG/PNG)", blank=True, null=True)
    motto = models.CharField(max_length=255, blank=True, verbose_name="Девиз компании")
    about_us_text = models.TextField(blank=True, verbose_name="Текст 'О нас'")
    gallery_description = models.TextField(verbose_name='Описание для секции "Фото и видео галерея"', blank=True, null=True)

    
    # Контакты
    contact_email = models.EmailField(max_length=255, blank=True, null=True, verbose_name="Контактный Email")
    contact_phone = models.CharField(max_length=50, blank=True, null=True, verbose_name="Контактный Телефон")
    contact_address = models.TextField(blank=True, null=True, verbose_name="Адрес")
    
    # Ссылки на соцсети
    vk_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль VK")
    telegram_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль Telegram")
    youtube_profile_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на профиль YouTube")
    market_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка \"Еще больше товаров\" в Маркете")


    # Иконки соцсетей и меню
    vk_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка VK (SVG/PNG)", blank=True, null=True)
    youtube_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка YouTube (SVG/PNG)", blank=True, null=True)
    telegram_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка Telegram (SVG/PNG)", blank=True, null=True)
    nav_toggle_icon = models.FileField(upload_to='site_assets/', verbose_name="Иконка для раскрытия меню (в свернутом хедере)", blank=True, null=True)


    class Meta:
        verbose_name = "Профиль компании и настройки сайта"
        verbose_name_plural = "Профили компании и настройки сайта"

    def __str__(self):
        return self.site_name if self.site_name else "Настройки сайта"

class OrbibolInfo(models.Model):
    general_info = models.TextField(verbose_name="Общая информация (первый абзац под заголовком 'Орбибол')")
    
    plot_title = models.CharField(max_length=100, default="Сюжетный орбибол", verbose_name="Заголовок блока 'Сюжетный'")
    plot_description = models.TextField(verbose_name="Описание для 'Сюжетный орбибол'")
    plot_icon = models.FileField(upload_to='orbibol_icons/', verbose_name="Иконка для \"Сюжетный орбибол\" (SVG/PNG)", blank=True, null=True)
    
    tactical_title = models.CharField(max_length=100, default="Тактический орбибол", verbose_name="Заголовок блока 'Тактический'")
    tactical_description = models.TextField(verbose_name="Описание для 'Тактический орбибол'")
    tactical_icon = models.FileField(upload_to='orbibol_icons/', verbose_name="Иконка для \"Тактический орбибол\" (SVG/PNG)", blank=True, null=True)
    
    details_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка 'Узнать подробнее'")

    class Meta:
        verbose_name = "Информация об Орбиболе"
        verbose_name_plural = "Информация об Орбиболе" # Предполагаем одну запись на сайт

    def __str__(self):
        return "Информация для секции Орбибол"
    
class Feature(models.Model):
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