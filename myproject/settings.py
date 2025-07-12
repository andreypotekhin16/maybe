# START OF FILE: myproject/settings.py
# myproject/settings.py

import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# --- БАЗОВЫЕ НАСТРОЙКИ ---
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')
SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '127.0.0.1,localhost').split(',')

# --- ПРИЛОЖЕНИЯ ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',
    'main',
]

# --- MIDDLEWARE, URLS, TEMPLATES, WSGI ---
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
ROOT_URLCONF = 'myproject.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'myproject.wsgi.application'

# --- БАЗА ДАННЫХ ---
DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', 'NAME': BASE_DIR / 'db.sqlite3'}}
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    DATABASES['default'] = dj_database_url.config(
        default=DATABASE_URL, conn_max_age=600, conn_health_checks=True
    )

# --- ВАЛИДАЦИЯ ПАРОЛЕЙ И ИНТЕРНАЦИОНАЛИЗАЦИЯ ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# --- НАСТРОЙКИ СТАТИКИ И МЕДИАФАЙЛОВ ---
STATIC_URL = 'static/'
# STATIC_ROOT больше не нужен, когда collectstatic отключен
# STATIC_ROOT = BASE_DIR / 'staticfiles' 

# Указываем Django, где искать статику напрямую
STATICFILES_DIRS = [
    BASE_DIR / "main/static",
]

# Используем самые простые хранилища, чтобы избежать конфликтов
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': os.environ.get('CLOUDINARY_API_KEY'),
    'API_SECRET': os.environ.get('CLOUDINARY_API_SECRET'),
}

# STATICFILES_STORAGE больше не нужен при использовании словаря STORAGES
# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# --- ЛОГИРОВАНИЕ ---
LOG_DIR = BASE_DIR / 'logs'
LOG_DIR.mkdir(exist_ok=True)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}', 'style': '{',},
        'simple': {'format': '{levelname} {message}', 'style': '{',},
    },
    'handlers': {
        'console': {'level': 'INFO', 'class': 'logging.StreamHandler', 'formatter': 'simple',},
        'file': {
            'level': 'ERROR', 'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOG_DIR / 'django_errors.log', 'maxBytes': 1024 * 1024 * 5,
            'backupCount': 5, 'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {'handlers': ['console', 'file'], 'level': 'INFO', 'propagate': True,},
        'django.request': {'handlers': ['file'], 'level': 'ERROR', 'propagate': False,},
        'main': {'handlers': ['console', 'file'], 'level': 'INFO', 'propagate': True,}
    },
}
# END OF FILE: myproject/settings.py