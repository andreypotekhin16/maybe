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

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

application = get_wsgi_application()
# Инициализируем WhiteNoise без указания root, чтобы он искал файлы в STATICFILES_DIRS
application = WhiteNoise(application)
# END OF FILE: myproject/wsgi.py