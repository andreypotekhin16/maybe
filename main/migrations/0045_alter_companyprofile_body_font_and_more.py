# Generated by Django 5.2.1 on 2025-07-18 16:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0044_alter_section_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='body_font',
            field=models.CharField(default='FortuneC', max_length=100, verbose_name='Шрифт для основного текста (параграфы)'),
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='header_font',
            field=models.CharField(default='SUNDAY', max_length=100, verbose_name='Шрифт для заголовков (H1, H2 и т.д.)'),
        ),
    ]
