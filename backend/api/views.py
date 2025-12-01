from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from model_service.models import Prediction

class PredictAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        question = request.data.get("text")
        
        # Dummy prediction logic for now
        prediction_result = "Paragraf" 
        
        # Save to database
        if question:
            Prediction.objects.create(
                user=request.user,
                question_text=question,
                predicted_category=prediction_result
            )

        return Response({"prediction": prediction_result})
