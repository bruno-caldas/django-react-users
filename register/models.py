from django.db import models
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=False)
    message = models.CharField(max_length=100, blank=True)
    owner = models.ForeignKey(User, related_name="person",
        on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Editor(Group):
    notes = models.TextField(blank=True)

    # Two managers for this model - the first is default 
    # (so all families appear in the admin).
    # The second is only invoked when we call 
    # Family.has_students.all()  
    objects = models.Manager()
    #has_students = FamilyManager()

    class Meta:
        verbose_name_plural = "Editors"
        ordering = ['name']
        permissions = ( 
            ( "read_book", "Can read book" ),
        )

    def __unicode__(self):
        return self.name

# group = Group(name = "Editor")
# group.save()                    # save this new group for this example
# user = User.objects.get(pk = 1) # assuming, there is one initial user 
# user.groups.add(group)          # user is now in the "Editor" group
