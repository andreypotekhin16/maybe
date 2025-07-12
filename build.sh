#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Собираем статику, ИГНОРИРУЯ все файлы из папки 'cloudinary', чтобы избежать конфликта
python manage.py collectstatic --no-input --ignore cloudinary

python manage.py migrate
python manage.py createsuper