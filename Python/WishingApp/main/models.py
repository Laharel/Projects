from datetime import date
from django.db import models
from django.db.models.deletion import CASCADE
import re
from django.db.models.fields.related import ForeignKey
import bcrypt
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

    def wish_valiadtor(self,postData):
        errors = {}
        if len(postData['wish']) < 3:
            errors['wish'] = "A wish must be consist of at least 3 characters"
        if len(postData['desc']) < 3 :
            errors['desc'] = "A description must be provided"
        return errors

class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TableManager()

class Wish(models.Model):
    wish = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    wish_date = models.DateField()
    user = models.ForeignKey(User, related_name='wishes',on_delete = models.CASCADE)
    granted = models.ManyToManyField(User, related_name='grant')
    liked_by= models.ForeignKey(User, related_name='likes',on_delete = models.CASCADE)
    like = models.IntegerField()
    grant_date = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = TableManager()

class Stat(models.Model):
    tgw = models.IntegerField()#total granted wishes
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Like(models.Model):
    wish = models.ForeignKey(Wish, related_name='liked',on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)