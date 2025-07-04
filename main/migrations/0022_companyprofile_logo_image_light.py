# Generated by Django 5.2.1 on 2025-06-23 15:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_service_hover_text'),
    ]

    operations = [
        migrations.AddField(
            model_name='companyprofile',
            name='logo_image_light',
            field=models.FileField(blank=True, help_text='Светлая версия логотипа для темных фонов (SVG/PNG)', null=True, upload_to='site_assets/', verbose_name='Логотип (светлый)'),
        ),
    ]
