from django.contrib import admin

# Register your models here.
from .models import Person, Editor

class PersonAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Person._meta.get_fields()]

admin.site.register(Person, PersonAdmin)
admin.site.register(Editor)