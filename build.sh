
set -o errexit

pip install -r requirements.txt

# Собираем статику, ИГНОРИРУЯ только файлы пакета cloudinary
python manage.py collectstatic --no-input --ignore cloudinary

python manage.py migrate
python manage.py createsuper