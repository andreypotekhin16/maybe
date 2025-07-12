#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Собираем статику, ИГНОРИРУЯ все папки, которые могут вызвать конфликт
python manage.py collectstatic --no-input --ignore cloudinary --ignore "main/site_assets" --ignore "main/images"

python manage.py migrate
python manage.py createsuper