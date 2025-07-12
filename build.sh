#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# УБРАЛИ --ignore main, ЧТОБЫ ФАЙЛЫ СТАТИКИ СОБИРАЛИСЬ
python manage.py collectstatic --no-input --ignore cloudinary

python manage.py migrate
python manage.py createsuper