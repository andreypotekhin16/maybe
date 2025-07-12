#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py migrate
python manage.py createsuper
```3.  Отправьте изменения в Git:
```bash
git add .
git commit -m "Remove favicon link to fix final build error"
git push