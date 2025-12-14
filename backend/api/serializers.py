from rest_framework import serializers
from django.contrib.auth import get_user_model
from model_service.models import TopicAnalysis, Question

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_subscribed', 'subscription_plan', 'usage_quota')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class TopicAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicAnalysis
        fields = ('id', 'subject', 'topic_name', 'relevance_score', 'user_proficiency', 'recommendation', 'created_at')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'subject', 'topic_name', 'question_text', 'option_a', 'option_b', 
                 'option_c', 'option_d', 'correct_answer', 'difficulty', 'current_event_context', 
                 'explanation', 'created_at')
        read_only_fields = ('id', 'created_at')
