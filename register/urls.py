from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='register'),
    url(r'^confirmation$', views.confirmation, name='confirmation'),
]