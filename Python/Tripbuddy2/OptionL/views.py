from django.shortcuts import render,redirect
from django.contrib import messages
from .models import *
import bcrypt
# Create your views here.
def index(request):
    return render(request,'index.html')

def reg(request):
    errors = User.objects.register_validator(request.POST)
    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('/')
    else:
        password = request.POST['pwd']
        pw_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        this=User.objects.create(
            first_name=request.POST['fn'],
            last_name=request.POST['ln'],
            email=request.POST['email'],
            password=pw_hash,
            )
        request.session['uid']=this.id
        return redirect('/dashboard')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if errors:
        for key, val in errors.items():
            messages.error(request, val)
        return redirect("/")
    else:
        this = User.objects.get(email = request.POST['email'])
        request.session['uid'] = this.id
        return redirect("/dashboard")

def db(request):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        mytrips = this.trips.all()
        joined = this.joined.all()
        trips = Trip.objects.all()
        context={
            'user' : this,
            'mytrips' : mytrips,
            'joined' : joined,
            'trips' : trips,
        }
        return render(request,'dashboard.html',context)
    else:
        return redirect('/')

def logout(request):
    request.session.flush()
    return redirect('/')

def new(request):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        context={
            'user' : this,
        }
        return render(request, 'new.html', context)
    else:
        return redirect('/')

def create(request):
    if 'uid' in request.session:
        errors = Trip.objects.trip_valiadtor(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.warning(request, value)
            return redirect('/trips/new')
        else:    
            new=Trip.objects.create(
            destination = request.POST['dest'],
            start = request.POST['start'],
            end = request.POST['end'],
            plan = request.POST['plan'],
            user = User.objects.get(id=request.session['uid'])
            )
            return redirect('/trips/'+ str(new.id))
    else:
        return redirect('/')

def trip(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        trip = Trip.objects.get(id=id)
        joined = trip.users.all()
        context={
            'user':this,
            'trip':trip,
            'joined':joined
        }
        return render(request, 'trip.html', context)
    else:
        return redirect('/')

def remove(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        this.trips.get(id=id).delete()
        return redirect("/dashboard")
    else:
        return redirect('/')

def edit(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        trip = this.trips.get(id=id)
        context={
            'this':this,
            'trip':trip,
        }
        return render(request, 'edit.html', context)
    else:
        return redirect('/')

def update(request, id):
    if 'uid' in request.session:
        errors = Trip.objects.trip_valiadtor(request.POST)
        trip = Trip.objects.get(id=id)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/trips/edit/'+str(id))
        else:
            trip.destination = request.POST['dest']
            trip.start = request.POST['start']
            trip.end = request.POST['end']
            trip.plan = request.POST['plan']
            trip.save()
            return redirect('/trips/'+str(id))
    else:
        return redirect('/')

def join(request, id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        this.joined.add(Trip.objects.get(id=id))
        return redirect('/dashboard')
    else:
        return redirect('/')

def cancel(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        this.joined.remove(Trip.objects.get(id=id))
        return redirect("/dashboard")
    else:
        return redirect('/')