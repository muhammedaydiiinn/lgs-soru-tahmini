from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from model_service.models import Prediction

@login_required
def dashboard(request):
    predictions = Prediction.objects.filter(user=request.user).order_by('-created_at')
    context = {
        'predictions': predictions,
        'subscription_plan': request.user.subscription_plan,
        'usage_quota': request.user.usage_quota,
        'is_subscribed': request.user.is_subscribed
    }
    return render(request, 'accounts/dashboard.html', context)
