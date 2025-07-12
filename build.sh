#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# ВОЗВРАЩАЕМ КАК БЫЛО, ЧТОБЫ СБОРКА НЕ ПАДАЛА
python manage.py collectstatic --no-input --ignore cloudinary --ignore main

python manage.py migrate
python manage.py createsuper