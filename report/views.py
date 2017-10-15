from register.models import User
from django.shortcuts import render

def index(request):
    """
    Display all instances of :model:'register.User' in order of ascending
    date.

    **Context**

    ''users''
        A list of instances of :model:'register.User' ordered by ascending date.

    **Template:**

    :template:'report.report.html'

    """
    users = User.objects.all().order_by('date').reverse() or []
    for user in users:
        user.date = user.date.strftime("%Y-%m-%d %H:%M:%S")
    context = {'users' : users}
    return render(request, 'report/report.html', context)