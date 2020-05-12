from django.shortcuts import render

def index(request):
  return render(request, 'frontend/index.html')

def eegViewer(request):
  return render(request, 'frontend/eeg-viewer.html')  
