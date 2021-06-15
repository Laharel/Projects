from django.urls import path
from . import views
urlpatterns = [
    path('',views.index),
    path('reg',views.reg),
    path('login',views.login),
    path('wishes',views.wishes),
    path('logout',views.logout),
    path('wishes/new',views.new),
    path('wishes/create',views.create),
    path('wishes/remove/<int:id>',views.remove),
    path('wishes/edit/<int:id>',views.edit),
    path('wishes/update/<int:id>',views.update),
    path('wishes/grant/<int:id>',views.grant),
    path('wishes/stats',views.stats),
    path('wishes/like/<int:id>',views.like)
]