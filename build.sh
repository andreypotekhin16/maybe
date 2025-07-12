# START OF FILE: build.sh
#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

# Собираем статику, ИГНОРИРУЯ проблемную папку, чтобы сборка не падала
python manage.py collectstatic --no-input --ignore "main/site_assets"

python manage.py migrate
python manage.py createsuper

# END OF FILE: build.sh```