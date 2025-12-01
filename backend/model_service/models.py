from django.db import models
from django.conf import settings

class TopicAnalysis(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50) # e.g., Matematik, Fen
    topic_name = models.CharField(max_length=100) # e.g., Üslü Sayılar
    relevance_score = models.IntegerField() # 0-100 likelihood of appearing in exam
    user_proficiency = models.IntegerField(default=0) # User's current level (0-100)
    recommendation = models.TextField() # Strategic advice
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.subject}: {self.topic_name}"
