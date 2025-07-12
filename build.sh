#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Возвращаем collectstatic с флагом, который игнорирует проблемные файлы
python manage.py collectstatic --no-input --ignore cloudinary

python manage.py migrate
python manage.py createsuper