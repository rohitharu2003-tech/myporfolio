from django.shortcuts import render, redirect
from .models import Contact

# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')

        Contact.objects.create(
            name=name,
            email=email,
            message=message
        )
        return redirect('home')  # Redirect to home page after submission
    return render(request, 'contact.html')

def projects(request):
    return render(request, 'projects.html')