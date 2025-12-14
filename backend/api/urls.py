from django.urls import path
from .views import (
    AnalyzeTopicAPIView, RegisterAPIView, CustomAuthToken, UserDetailAPIView, 
    DashboardStatsAPIView, GenerateQuestionAPIView, QuestionListAPIView, 
    QuestionDetailAPIView, GenerateQuestionsFromTopicAPIView
)

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('user/', UserDetailAPIView.as_view(), name='user-detail'),
    path('dashboard-stats/', DashboardStatsAPIView.as_view(), name='dashboard-stats'),
    path('analyze/', AnalyzeTopicAPIView.as_view(), name='analyze'),
    path('questions/generate/', GenerateQuestionAPIView.as_view(), name='generate-question'),
    path('questions/', QuestionListAPIView.as_view(), name='question-list'),
    path('questions/<int:question_id>/', QuestionDetailAPIView.as_view(), name='question-detail'),
    path('questions/generate-from-topic/', GenerateQuestionsFromTopicAPIView.as_view(), name='generate-from-topic'),
]
