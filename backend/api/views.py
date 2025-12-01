from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import generics
from django.contrib.auth import get_user_model
import random

from model_service.models import TopicAnalysis
from .serializers import UserSerializer, RegisterSerializer, TopicAnalysisSerializer

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username
        })

class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        analyses = TopicAnalysis.objects.filter(user=user)
        total_analyses = analyses.count()
        
        # Mock improvements (e.g., total topics mastered)
        mastered_topics = analyses.filter(user_proficiency__gte=80).count()
        
        recent_analyses = analyses.order_by('-created_at')[:5]
        recent_serializer = TopicAnalysisSerializer(recent_analyses, many=True)
        
        return Response({
            "stats": {
                "usage_quota": user.usage_quota,
                "total_analyses": total_analyses,
                "mastered_topics": mastered_topics,
                "subscription_plan": user.subscription_plan,
                "is_subscribed": user.is_subscribed
            },
            "recent_analyses": recent_serializer.data
        })

class AnalyzeTopicAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subject = request.data.get("subject") # e.g. Matematik
        # In a real app, we might take user's past quiz scores or nothing to suggest from scratch
        
        # Check quota
        if request.user.usage_quota <= 0:
            return Response({"error": "Analiz hakkınız doldu. Paketinizi yükseltin."}, status=403)

        # Logic: The model predicts which topics are high-yield for LGS 2026
        # This is dummy logic simulation
        possible_topics = {
            "Matematik": ["Üslü İfadeler", "Kareköklü İfadeler", "Doğrusal Denklemler", "Veri Analizi"],
            "Fen Bilimleri": ["Mevsimler ve İklim", "DNA ve Genetik Kod", "Basınç", "Madde ve Endüstri"],
            "Türkçe": ["Fiilimsiler", "Cümlenin Ögeleri", "Paragrafta Anlam", "Sözel Mantık"],
            "İnkılap Tarihi": ["Bir Kahraman Doğuyor", "Milli Uyanış", "Ya İstiklal Ya Ölüm"],
            "İngilizce": ["Friendship", "Teen Life", "In The Kitchen"],
            "Din Kültürü": ["Kader İnancı", "Zekat ve Sadaka"]
        }

        selected_subject = subject if subject in possible_topics else "Matematik"
        topic = random.choice(possible_topics.get(selected_subject, ["Genel Analiz"]))
        
        # Simulated AI results
        relevance = random.randint(70, 99) # How likely it is to appear
        proficiency = random.randint(20, 90) # User's simulated current level (or from input)
        
        strategies = [
            "MEB örnek sorularına ağırlık ver.",
            "Çıkmış sorulardaki grafik yorumlama sorularını çöz.",
            "Kavram haritası çıkararak çalış.",
            "Haftada en az 2 deneme çözerek pekiştir."
        ]
        rec = random.choice(strategies)

        # Save to database
        analysis = TopicAnalysis.objects.create(
            user=request.user,
            subject=selected_subject,
            topic_name=topic,
            relevance_score=relevance,
            user_proficiency=proficiency,
            recommendation=rec
        )
            
        # Decrement quota
        request.user.usage_quota -= 1
        request.user.save()

        serializer = TopicAnalysisSerializer(analysis)
        return Response({"analysis": serializer.data, "remaining_quota": request.user.usage_quota})
