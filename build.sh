# START OF FILE: build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# ВРЕМЕННО ОТКЛЮЧАЕМ COLLECTSTATIC, ЧТОБЫ СЕРВЕР ЗАПУСТИЛСЯ
# python manage.py collectstatic --no-input

python manage.py migrate
python manage.py createsuper

# END OF FILE: build.sh