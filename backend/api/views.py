from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import generics
from django.contrib.auth import get_user_model
import random
from datetime import datetime

from .serializers import UserSerializer, RegisterSerializer, TopicAnalysisSerializer
from lgs_project.db_utils import get_topic_analyses_collection

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
        collection = get_topic_analyses_collection()
        
        # Fetch from MongoDB
        mongo_query = {"user_id": user.id}
        cursor = collection.find(mongo_query).sort("created_at", -1)
        
        # Convert cursor to list
        analyses_list = list(cursor)
        total_analyses = len(analyses_list)
        
        # Mock improvements calculation
        mastered_topics = sum(1 for a in analyses_list if a.get('user_proficiency', 0) >= 80)
        
        # Prepare recent analyses for frontend (Top 5)
        recent_analyses = []
        for doc in analyses_list[:5]:
            # Convert ObjectId to string if needed, or just map fields
            recent_analyses.append({
                "id": str(doc["_id"]),
                "subject": doc["subject"],
                "topic_name": doc["topic_name"],
                "relevance_score": doc["relevance_score"],
                "user_proficiency": doc["user_proficiency"],
                "recommendation": doc["recommendation"],
                "created_at": doc["created_at"]
            })
        
        return Response({
            "stats": {
                "usage_quota": user.usage_quota,
                "total_analyses": total_analyses,
                "mastered_topics": mastered_topics,
                "subscription_plan": user.subscription_plan,
                "is_subscribed": user.is_subscribed
            },
            "recent_analyses": recent_analyses
        })

class AnalyzeTopicAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        subject = request.data.get("subject") # e.g. Matematik
        
        # Check quota
        if request.user.usage_quota <= 0:
            return Response({"error": "Analiz hakkınız doldu. Paketinizi yükseltin."}, status=403)

        # Logic: The model predicts which topics are high-yield for LGS 2026
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
        relevance = random.randint(70, 99)
        proficiency = random.randint(20, 90)
        
        strategies = [
            "MEB örnek sorularına ağırlık ver.",
            "Çıkmış sorulardaki grafik yorumlama sorularını çöz.",
            "Kavram haritası çıkararak çalış.",
            "Haftada en az 2 deneme çözerek pekiştir."
        ]
        rec = random.choice(strategies)

        # Save to MongoDB instead of SQLite
        analysis_doc = {
            "user_id": request.user.id,
            "subject": selected_subject,
            "topic_name": topic,
            "relevance_score": relevance,
            "user_proficiency": proficiency,
            "recommendation": rec,
            "created_at": datetime.now().isoformat()
        }
        
        collection = get_topic_analyses_collection()
        result = collection.insert_one(analysis_doc)
            
        # Decrement quota (User model is still in SQLite)
        request.user.usage_quota -= 1
        request.user.save()

        # Prepare response
        analysis_doc["id"] = str(result.inserted_id)
        del analysis_doc["_id"] # Remove ObjectId for JSON serialization

        return Response({"analysis": analysis_doc, "remaining_quota": request.user.usage_quota})
