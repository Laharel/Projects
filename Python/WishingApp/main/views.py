from django.shortcuts import render,redirect
from django.contrib import messages
from .models import *
import bcrypt
import datetime
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
        return redirect('/wishes')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if errors:
        for key, val in errors.items():
            messages.error(request, val)
        return redirect("/")
    else:
        this = User.objects.get(email = request.POST['email'])
        request.session['uid'] = this.id
        return redirect("/books")

def wishes(request):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        mywishes = this.wishes.all()
        wishes = Wish.objects.all()
        grant = this.grant.all()
        liked = this.likes.all()
        context={
            'this' : this,
            'mywishes' : mywishes,
            'wishes' : wishes,
            'grant' : grant,
            'liked' : liked,
        }
        return render(request,'wishes.html',context)
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
        errors = Wish.objects.wish_valiadtor(request.POST)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.warning(request, value)
            return redirect('/wishes/new')
        else:
            this = User.objects.get(id=request.session['uid'])    
            Wish.objects.create(
            wish = request.POST['wish'],
            description = request.POST['desc'],
            wish_date =datetime.date.today(),
            user = this,
            like = 0,
            liked_by = this
            )
            return redirect('/wishes')
    else:
        return redirect('/')

def remove(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        this.wishes.get(id=id).delete()
        return redirect("/wishes")
    else:
        return redirect('/')

def edit(request,id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        wish = this.wishes.get(id=id)
        context={
            'this':this,
            'wish':wish,
        }
        return render(request, 'edit.html', context)
    else:
        return redirect('/')

def update(request, id):
    if 'uid' in request.session:
        errors = Wish.objects.wish_valiadtor(request.POST)
        wish = Wish.objects.get(id=id)
        if len(errors) > 0:
            for key, value in errors.items():
                messages.error(request, value)
            return redirect('/wishes/edit/'+str(id))
        else:
            wish.wish = request.POST['wish']
            wish.description = request.POST['desc']
            wish.save()
            return redirect('/wishes')
    else:
        return redirect('/')

def grant(request, id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        wish = Wish.objects.get(id=id)
        this.grant.add(wish)
        wish.grant_date=datetime.date.today()
        wish.save()
        Stat.objects.create(
            tgw = 1,
        )
        return redirect('/wishes')
    else:
        return redirect('/')

def stats(request):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        granted_wishes = gw(this)
        pending_wishes = pw(this)
        counter = {
            'tgw': Stat.objects.last().id,
            'gw': granted_wishes,
            'pw': pending_wishes
        }
        context = {
            'this' : this,
            'counter' : counter
        }
        return render(request,'stats.html',context)
    else:
        return redirect('/')

def like(request, id):
    if 'uid' in request.session:
        this = User.objects.get(id=request.session['uid'])
        wish = Wish.objects.get(id=id)
        wish.like += 1
        wish.save()
        Like.objects.create(
            wish = wish,
        )
        this.likes.add(wish)
        return redirect('/wishes')
    else:
        return redirect('/')

def pw(this):
    a=0
    for wish in this.wishes.all():
        if wish not in this.grant.all():
            a += 1
    return a

def gw(this):
    a=0
    for wish in this.wishes.all():
        if wish in this.grant.all():
            a += 1
    return a