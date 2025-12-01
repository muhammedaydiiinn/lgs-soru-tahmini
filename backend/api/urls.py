from django.urls import path
from .views import AnalyzeTopicAPIView, RegisterAPIView, CustomAuthToken, UserDetailAPIView, DashboardStatsAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('user/', UserDetailAPIView.as_view(), name='user-detail'),
    path('dashboard-stats/', DashboardStatsAPIView.as_view(), name='dashboard-stats'),
    path('analyze/', AnalyzeTopicAPIView.as_view(), name='analyze'),
]
