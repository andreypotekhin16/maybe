
set -o errexit

pip install -r requirements.txt

# Собираем статику. Теперь команда простая.
python manage.py collectstatic --no-input

# Применяем миграции и создаем суперпользователя.
python manage.py migrate
python manage.py createsuper