from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonaViewSet

# El router crea automáticamente rutas como:
# GET /personas/ -> Listar
# POST /personas/ -> Crear
# GET /personas/{id}/ -> Ver detalle
# PUT /personas/{id}/ -> Actualizar
# DELETE /personas/{id}/ -> Borrar
router = DefaultRouter()
router.register(r'personas', PersonaViewSet, basename='persona')

urlpatterns = [
    path('', include(router.urls)),
]