from django.db import models
from fernet_fields import EncryptedCharField , EncryptedEmailField
from django.contrib.auth import get_user_model

User = get_user_model()


class Lead(models.Model):
    name = EncryptedCharField(max_length=100)
    email = EncryptedEmailField(max_length=100)
    message = EncryptedCharField(max_length=500, blank=True)
    eeg = models.FileField(upload_to='eeg_files/' , blank=True)
    owner = models.ForeignKey(
        User, related_name="leads", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
