from django.db import models

# Create your models here
class Appeals(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    pet_name = models.CharField(max_length=30)

    class Meta:
        ordering = ['created']