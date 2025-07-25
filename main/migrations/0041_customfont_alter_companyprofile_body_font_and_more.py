# Generated by Django 5.2.1 on 2025-07-17 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0040_companyprofile_body_font_companyprofile_header_font'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomFont',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name="Название шрифта (для CSS, напр. 'MyCoolFont')")),
                ('font_file_otf', models.FileField(blank=True, null=True, upload_to='custom_fonts/', verbose_name='Файл шрифта .otf')),
                ('font_file_ttf', models.FileField(blank=True, null=True, upload_to='custom_fonts/', verbose_name='Файл шрифта .ttf')),
                ('font_file_woff', models.FileField(blank=True, null=True, upload_to='custom_fonts/', verbose_name='Файл шрифта .woff')),
                ('font_file_woff2', models.FileField(blank=True, null=True, upload_to='custom_fonts/', verbose_name='Файл шрифта .woff2')),
            ],
            options={
                'verbose_name': 'Кастомный шрифт',
                'verbose_name_plural': 'Кастомные шрифты',
            },
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='body_font',
            field=models.CharField(choices=[('SUNDAY', 'Sunday (встроенный)'), ('FortuneC', 'FortuneC (встроенный)'), ('Montserrat', 'Montserrat (Google)'), ('Roboto', 'Roboto (Google)'), ('Playfair Display', 'Playfair Display (Google)'), ('Lobster', 'Lobster (Google)')], default='FortuneC', max_length=100, verbose_name='Шрифт для основного текста (параграфы)'),
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='header_font',
            field=models.CharField(choices=[('SUNDAY', 'Sunday (встроенный)'), ('FortuneC', 'FortuneC (встроенный)'), ('Montserrat', 'Montserrat (Google)'), ('Roboto', 'Roboto (Google)'), ('Playfair Display', 'Playfair Display (Google)'), ('Lobster', 'Lobster (Google)')], default='SUNDAY', max_length=100, verbose_name='Шрифт для заголовков (H1, H2 и т.д.)'),
        ),
    ]
