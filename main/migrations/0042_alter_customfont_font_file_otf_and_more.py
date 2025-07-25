# Generated by Django 5.2.1 on 2025-07-17 16:41

import myproject.storages
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0041_customfont_alter_companyprofile_body_font_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customfont',
            name='font_file_otf',
            field=models.FileField(blank=True, null=True, storage=myproject.storages.RawMediaCloudinaryStorage(), upload_to='custom_fonts/', verbose_name='Файл шрифта .otf'),
        ),
        migrations.AlterField(
            model_name='customfont',
            name='font_file_ttf',
            field=models.FileField(blank=True, null=True, storage=myproject.storages.RawMediaCloudinaryStorage(), upload_to='custom_fonts/', verbose_name='Файл шрифта .ttf'),
        ),
        migrations.AlterField(
            model_name='customfont',
            name='font_file_woff',
            field=models.FileField(blank=True, null=True, storage=myproject.storages.RawMediaCloudinaryStorage(), upload_to='custom_fonts/', verbose_name='Файл шрифта .woff'),
        ),
        migrations.AlterField(
            model_name='customfont',
            name='font_file_woff2',
            field=models.FileField(blank=True, null=True, storage=myproject.storages.RawMediaCloudinaryStorage(), upload_to='custom_fonts/', verbose_name='Файл шрифта .woff2'),
        ),
    ]
