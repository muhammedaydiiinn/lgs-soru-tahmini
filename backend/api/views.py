from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import generics, status
from django.contrib.auth import get_user_model
import random

from model_service.models import TopicAnalysis, Question
from model_service.question_generator import QuestionGenerator
from .serializers import UserSerializer, RegisterSerializer, TopicAnalysisSerializer, QuestionSerializer

User = get_user_model()

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    authentication_classes = ()  # Register için authentication gerekmez
    serializer_class = RegisterSerializer

class CustomAuthToken(ObtainAuthToken):
    permission_classes = (AllowAny,)  # Login için AllowAny
    authentication_classes = ()  # Login için authentication gerekmez
    serializer_class = AuthTokenSerializer
    
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

class GenerateQuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Konu bazlı soru üretir ve güncel olayları entegre eder.
        
        Request body:
        {
            "subject": "Matematik",
            "topic_name": "Üslü İfadeler",
            "difficulty": "medium",  # optional: easy, medium, hard
            "include_current_event": true  # optional: default true
        }
        """
        subject = request.data.get("subject", "Türkçe")  # Varsayılan olarak Türkçe
        topic_name = request.data.get("topic_name")
        difficulty = request.data.get("difficulty", "medium")
        include_current_event = request.data.get("include_current_event", True)
        
        if not topic_name:
            return Response(
                {"error": "topic_name parametresi gereklidir."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Quota kontrolü
        if request.user.usage_quota <= 0:
            return Response(
                {"error": "Soru üretme hakkınız doldu. Paketinizi yükseltin."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Sadece Türkçe dersi için soru üretimi
        if subject != "Türkçe":
            return Response(
                {"error": "Şu anda sadece Türkçe dersi için soru üretimi yapılmaktadır."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Soru üret
            generator = QuestionGenerator()
            question_data = generator.generate_question(
                topic_name=topic_name,
                difficulty=difficulty,
                include_current_event=include_current_event
            )
            
            # Veritabanına kaydet
            question = Question.objects.create(
                user=request.user,
                **question_data
            )
            
            # Quota azalt
            request.user.usage_quota -= 1
            request.user.save()
            
            serializer = QuestionSerializer(question)
            return Response({
                "question": serializer.data,
                "remaining_quota": request.user.usage_quota
            }, status=status.HTTP_201_CREATED)
            
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Soru üretilirken bir hata oluştu: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class QuestionListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        Kullanıcının sorularını listeler.
        Query params:
        - subject: Ders filtresi
        - topic_name: Konu filtresi
        - difficulty: Zorluk filtresi
        """
        questions = Question.objects.filter(user=request.user)
        
        # Filtreleme
        subject = request.query_params.get('subject')
        if subject:
            questions = questions.filter(subject=subject)
        
        topic_name = request.query_params.get('topic_name')
        if topic_name:
            questions = questions.filter(topic_name=topic_name)
        
        difficulty = request.query_params.get('difficulty')
        if difficulty:
            questions = questions.filter(difficulty=difficulty)
        
        serializer = QuestionSerializer(questions, many=True)
        return Response({"questions": serializer.data, "count": questions.count()})

class QuestionDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, question_id):
        """Belirli bir sorunun detayını getirir"""
        try:
            question = Question.objects.get(id=question_id, user=request.user)
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        except Question.DoesNotExist:
            return Response(
                {"error": "Soru bulunamadı."},
                status=status.HTTP_404_NOT_FOUND
            )

class GenerateQuestionsFromTopicAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Bir konu analizinden sorular üretir.
        
        Request body:
        {
            "topic_analysis_id": 1,
            "count": 5,  # Kaç soru üretileceği
            "difficulty": "medium"
        }
        """
        topic_analysis_id = request.data.get("topic_analysis_id")
        count = request.data.get("count", 1)
        difficulty = request.data.get("difficulty", "medium")
        
        if not topic_analysis_id:
            return Response(
                {"error": "topic_analysis_id parametresi gereklidir."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            topic_analysis = TopicAnalysis.objects.get(id=topic_analysis_id, user=request.user)
        except TopicAnalysis.DoesNotExist:
            return Response(
                {"error": "Konu analizi bulunamadı."},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Quota kontrolü
        if request.user.usage_quota < count:
            return Response(
                {"error": f"Yeterli soru üretme hakkınız yok. Gereken: {count}, Mevcut: {request.user.usage_quota}"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        generator = QuestionGenerator()
        created_questions = []
        
        # Sadece Türkçe dersi için soru üretimi
        if topic_analysis.subject != "Türkçe":
            return Response(
                {"error": "Şu anda sadece Türkçe dersi için soru üretimi yapılmaktadır."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            for _ in range(count):
                question_data = generator.generate_question(
                    topic_name=topic_analysis.topic_name,
                    difficulty=difficulty,
                    include_current_event=True
                )
                
                question = Question.objects.create(
                    user=request.user,
                    **question_data
                )
                created_questions.append(question)
            
            # Quota azalt
            request.user.usage_quota -= count
            request.user.save()
            
            serializer = QuestionSerializer(created_questions, many=True)
            return Response({
                "questions": serializer.data,
                "remaining_quota": request.user.usage_quota
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": f"Sorular üretilirken bir hata oluştu: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
