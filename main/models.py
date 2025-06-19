
from django.db import models


class Service(models.Model):
    name = models.CharField(max_length=200, verbose_name="Название услуги/игры")
    description = models.TextField(verbose_name="Описание")
    vk_link = models.URLField(max_length=250, blank=True, null=True, verbose_name="Ссылка на VK")
    # Позже мы можем добавить сюда другие поля, например:
    # image = models.ImageField(upload_to='services/', blank=True, null=True, verbose_name="Изображение")
    # price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="Цена")
    order = models.PositiveIntegerField(default=0, db_index=True, verbose_name="Порядок сортировки")

    class Meta:
        verbose_name = "Услуга или Игра"
        verbose_name_plural = "Услуги и Игры"
        ordering = ['order', 'name'] # Сортировка по умолчанию: сначала по полю 'order', потом по 'name'

    def __str__(self):
        return self.name
    
class CompanyProfile(models.Model):
    site_name = models.CharField(max_length=200, default="Название вашего клуба", verbose_name="Название сайта (в Title)")
    motto = models.CharField(max_length=255, blank=True, verbose_name="Девиз компании")
    about_us_text = models.TextField(blank=True, verbose_name="Текст 'О нас'")
    # Можно добавить и другие поля, которые должны быть глобальными для сайта
    # например, основной телефон, email для контактов, если они не будут в отдельной модели "Контакты"

    class Meta:
        verbose_name = "Профиль компании и настройки сайта"
        verbose_name_plural = "Профили компании и настройки сайта" # Хотя у нас будет только одна запись

    def __str__(self):
        return self.site_name if self.site_name else "Настройки сайта"
