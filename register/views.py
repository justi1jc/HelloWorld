from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest
from .forms import UserForm

def index(request):
    """
    Display registration page.
    If POST, validates and stores an instance of :modelform:'register.UserForm'
    and saves it, if valid.

    **Template**

    :template:'report/register.html'
    :template:'register/confirmation.html'

    """
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            form.save(commit=True)
            return HttpResponse('')
        else:
            return HttpResponseBadRequest()
    return render(request, 'register/register.html')

def confirmation(request):
    """
    Displays a confirmation message.
    ***Template***

    :template:'register/confirmation.html'

    """
    return render(request, 'register/confirmation.html')
