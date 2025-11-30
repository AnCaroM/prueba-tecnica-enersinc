from rest_framework import viewsets
from .models import Persona
from .serializers import PersonaSerializer

# Esto crea automágicamente las rutas GET, POST, PUT, DELETE
class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer