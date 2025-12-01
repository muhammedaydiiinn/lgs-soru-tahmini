from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework import generics
from django.contrib.auth import get_user_model

from model_service.models import Prediction
from .serializers import UserSerializer, RegisterSerializer, PredictionSerializer

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
        predictions = Prediction.objects.filter(user=user)
        total_predictions = predictions.count()
        
        # Mock success rate calculation (in a real app, you'd compare prediction vs actual if available)
        success_rate = "82%" 
        
        recent_predictions = predictions.order_by('-created_at')[:5]
        recent_serializer = PredictionSerializer(recent_predictions, many=True)
        
        return Response({
            "stats": {
                "usage_quota": user.usage_quota,
                "total_predictions": total_predictions,
                "success_rate": success_rate,
                "subscription_plan": user.subscription_plan,
                "is_subscribed": user.is_subscribed
            },
            "recent_predictions": recent_serializer.data
        })

class PredictAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get("text")
        
        # Check quota
        if request.user.usage_quota <= 0:
            return Response({"error": "Quota exceeded"}, status=403)

        # Dummy prediction logic for now
        # In a real scenario, you'd call your ML model service here
        prediction_result = "Paragraf" 
        
        # Save to database
        if question:
            Prediction.objects.create(
                user=request.user,
                question_text=question,
                predicted_category=prediction_result
            )
            
            # Decrement quota
            request.user.usage_quota -= 1
            request.user.save()

        return Response({"prediction": prediction_result, "remaining_quota": request.user.usage_quota})
