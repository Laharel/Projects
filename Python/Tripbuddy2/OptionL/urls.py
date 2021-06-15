from django.urls import path
from . import views
urlpatterns = [
    path('',views.index),
    path('reg',views.reg),
    path('login',views.login),
    path('dashboard',views.db),
    path('logout',views.logout),
    path('trips/new',views.new),
    path('trips/create',views.create),
    path('trips/<int:id>',views.trip),
    path('trips/remove/<int:id>',views.remove),
    path('trips/cancel/<int:id>',views.cancel),
    path('trips/edit/<int:id>',views.edit),
    path('trips/update/<int:id>',views.update),
    path('join/<int:id>',views.join),
]