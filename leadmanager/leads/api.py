from leads.models import Lead
from rest_framework import viewsets, permissions ,status
from .serializers import LeadSerializer
import os
from django.db import models
from django.conf import settings
from rest_framework.response import Response
from django.http import Http404
from django.utils.html import escape
# Lead Viewset


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return Lead.objects.all().order_by('created_at').reverse()

    # def get_queryset(self):
    #     return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save()
    

    def destroy(self,request, *args, **kwargs):
        try:
            instance = self.get_object()
            name = instance.eeg.name
            os.remove(os.path.join(settings.MEDIA_ROOT,name))
            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

