from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_subscribed = models.BooleanField(default=False)
    subscription_plan = models.CharField(max_length=20, default="free")
    usage_quota = models.IntegerField(default=10)

    def __str__(self):
        return self.username
