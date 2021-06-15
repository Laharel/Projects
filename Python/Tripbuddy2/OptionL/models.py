from django.db import models
from django.db.models.deletion import CASCADE
import re
import bcrypt
import datetime
# Create your models here.
class TableManager(models.Manager):
    def register_validator(self, postData):
        errors = {}
        EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
        if len(postData['fn']) < 4:
            errors['fn'] = "First Name must at least  be 4 characters"
        if len(postData['ln']) < 4:
            errors['ln'] = "Last Name must at least  be 4 characters"
        if not EMAIL_REGEX.match(postData['email']):          
            errors['email'] = "Invalid email address!"
        elif len(User.objects.filter(email=postData['email'])) > 0:
            errors['email'] = "This email is taken"
        if len(postData['pwd']) < 8:
            errors['pwd'] = "Password must be at least 8 characters"
        elif postData['pwd'] != postData['cpwd']:
            errors['pwd'] = "Passwords don't match"
        return errors

    def login_validator(self, postData):
        errors = {}
        email = User.objects.filter(email = postData['email'])
        if email:
            this = email[0] 
            if not bcrypt.checkpw(postData['pwd'].encode(), this.password.encode()):
                errors['un'] = "Invalid login credentials"
        else:
            errors['un'] = "Invalid login credentials"
        return errors

    def trip_valiadtor(self,postData):
        errors = {}
        if len(postData['dest']) < 3:
            errors['dest'] = "A trip destination must be consist of at least 3 characters"
        if len(postData['start']) < 1 :
            errors['start'] = "Start Date  is requied"
        elif  datetime.datetime.strptime(postData['start'],'%Y-%m-%d').date()<  datetime.date.today():
            errors['start'] = "Time travel is not allowed, invalid Start Date"
        if len(postData['end']) < 1 :
            errors['end'] = "End Date  is requied"
        elif postData['end'] < postData['start'] :
            errors['end'] = "Time travel is not allowed, invalid End Date"
        if len(postData['plan']) < 1 :
            errors['plan'] = "A Plan must be provided"
        return errors

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TableManager()

class Trip(models.Model):
    destination = models.CharField(max_length=50)
    start = models.DateField()
    end = models.DateField()
    plan = models.TextField(blank=True)
    user = models.ForeignKey(User, related_name='trips',on_delete = models.CASCADE)
    users = models.ManyToManyField(User, related_name='joined')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TableManager()