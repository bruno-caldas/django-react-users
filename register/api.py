from .models import Person, Editor
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import PersonSerializer, UserSerializer, RegisterSerializer, LoginSerializer

from django.core.exceptions import ValidationError

# Person Viewset
class PersonViewSet(viewsets.ModelViewSet):
    #     queryset = Person.objects.all()
    permission_classes = [
            # permissions.AllowAny
            permissions.IsAuthenticated
            ]
    serializer_class = PersonSerializer

    def get_queryset(self):
        return Person.objects.all()
        # return self.request.user.person.all()
        # return Person.objects.all()
    
    def perform_create(self, serializer):
        if self.request.user.groups.filter(name='Editor').exists():
            serializer.save(owner=self.request.user)
        else:
            raise ValidationError('You cannot create Person')

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
            permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    