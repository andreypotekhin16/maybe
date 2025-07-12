#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# ВРЕМЕННО ОТКЛЮЧАЕМ COLLECTSTATIC, ЧТОБЫ ГАРАНТИРОВАННО ЗАПУСТИТЬ СЕРВЕР
# python manage.py collectstatic --no-input

python manage.py migrate
python manage.py createsuper