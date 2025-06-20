

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_service_options_remove_service_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='service_arts/', verbose_name='Арт для игры (для карусели, SVG/PNG)'),
        ),
    ]