# START OF FILE: myproject/wsgi.py
"""
WSGI config for myproject project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_wsgi_application()
# Инициализируем WhiteNoise и добавляем папки из STATICFILES_DIRS
application = WhiteNoise(application)
for d in settings.STATICFILES_DIRS:
    application.add_files(d, prefix=settings.STATIC_URL)

# END OF FILE: myproject/wsgi.py