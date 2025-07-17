# myproject/storages.py
from cloudinary_storage.storage import CloudinaryStorage

class RawMediaCloudinaryStorage(CloudinaryStorage):
    """
    Кастомное хранилище для "сырых" файлов (raw files),
    таких как шрифты, в Cloudinary.
    """
    def __init__(self, *args, **kwargs):
        # Устанавливаем тип ресурса как 'raw'
        kwargs['resource_type'] = 'raw'
        super().__init__(*args, **kwargs)