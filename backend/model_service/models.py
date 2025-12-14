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

class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Kolay'),
        ('medium', 'Orta'),
        ('hard', 'Zor'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    subject = models.CharField(max_length=50)  # e.g., Matematik, Fen Bilimleri
    topic_name = models.CharField(max_length=100)  # e.g., Üslü İfadeler
    question_text = models.TextField()  # Soru metni
    option_a = models.TextField()
    option_b = models.TextField()
    option_c = models.TextField()
    option_d = models.TextField()
    correct_answer = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')])
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')
    current_event_context = models.TextField(blank=True, null=True)  # Güncel olay bağlamı
    explanation = models.TextField(blank=True, null=True)  # Çözüm açıklaması
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.subject} - {self.topic_name} - {self.question_text[:50]}..."
