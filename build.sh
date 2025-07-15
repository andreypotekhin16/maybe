#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# УБИРАЕМ --ignore main, ЧТОБЫ СЕРВЕР УВИДЕЛ ВАШИ ФАЙЛЫ CSS И JS
python manage.py collectstatic --no-input

python manage.py migrate
# Команду createsuper можно оставить, она не мешает
python manage.py createsuper