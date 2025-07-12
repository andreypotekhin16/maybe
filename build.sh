#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Игнорируем ВСЕ папки, которые могут вызвать конфликт, чтобы сборка прошла
python manage.py collectstatic --no-input --ignore cloudinary --ignore main

python manage.py migrate
python manage.py createsuper