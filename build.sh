#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# Игнорируем ВСЕ папки, которые могут вызвать конфликт
python manage.py collectstatic --no-input --ignore cloudinary --ignore main

python manage.py migrate
python manage.py createsuper