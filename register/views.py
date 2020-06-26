from django.contrib.auth import authenticate, login, get_user_model, logout
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import ContactForm, LoginForm, RegisterForm

def home_page(request):
    context = {
            'title': 'Home Page',
            'content': 'Welcome to the Home Page',
            }
    if request.user.is_authenticated:
        print(request.user)
        context['username'] = request.user

    return render(request,'home.html', context) #Does not work with html

def about_page(request):
    context = {
            'title': 'About Page',
            'content': 'Welcome to the About Page',
            }

    return render(request,'home.html', context) #Does not work with html


def login_page(request):
    context = {}
    form_obj = LoginForm(request.POST or None)
    print("Usuario autenticado: {}".format(request.user.is_authenticated))
    if request.user.is_authenticated:
        return redirect("/register/")
    context['form'] = form_obj
    if form_obj.is_valid():
        print(form_obj.cleaned_data)
        username = form_obj.cleaned_data.get("username")
        password = form_obj.cleaned_data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # context['form'] = LoginForm()
            return redirect("/register/")
        else:
            print("Erro de login")

    return render(request, "auth/login.html", context)

def logout_page(request):
    context = {}
    form_obj = LoginForm(request.POST or None)
    print("Usuario autenticado: {}".format(request.user.is_authenticated))
    if request.user.is_authenticated:
        logout(request)
        return redirect("/register/")
    context['form'] = form_obj

    return render(request, "auth/login.html", context)

User = get_user_model()
def register_page(request):
    form_obj = RegisterForm(request.POST or None)
    context = {
            'form': form_obj,
            }
    if form_obj.is_valid():
        print(form_obj.cleaned_data)
        username = form_obj.cleaned_data.get("username")
        email = form_obj.cleaned_data.get("email")
        password = form_obj.cleaned_data.get("password")
        new_user = User.objects.create_user(username, email, password)
        new_user.fullname = form_obj.cleaned_data.get("fullname") #NOT WORKING: NOT INSERTEDINTO DATABASE
        new_user.save()
        print("Sua conta foi criada, {}".format(new_user) )
    return render(request, "auth/register.html",context)


def contact_page(request):
    form_obj = ContactForm(request.POST or None)
    context = {
            'title': 'Contact Page',
            'content': 'Welcome to the Contact Page',
            'form': form_obj,
            }
    if form_obj.is_valid():
        print(form_obj.cleaned_data)
    if request.method == 'POST':
        print("")
        print(request.POST.get('fullname'))
        print(request.POST.get('email'))
        print(request.POST.get('contentarea'))
        print("")


    return render(request,'contact/contact_page.html', context) #Does not work with html

def home_page_old(request):
    html = """
    <!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="/home/bcaldas/bootstrap/css/bootstrap.css"  crossorigin="anonymous">

        <title>Hello, world!</title>
      </head>
      <body>
        <h1>Hello, world!</h1>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="/home/bcaldas/bootstrap/js/bootstrap.js" crossorigin="anonymous"></script>
      </body>
    </html>

    """
    #return render(request,html, {}) #Does not work with html
    return HttpResponse(html)
