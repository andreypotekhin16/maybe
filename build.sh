#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# Игнорируем ВСЕ папки, которые могут вызвать конфликт, чтобы сборка прошла
python manage.py collectstatic --no-input --ignore cloudinary --ignore "main/site_assets" --ignore "site_assets" --ignore "main/images"

python manage.py migrate
python manage.py createsuper