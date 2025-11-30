from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Persona

class PersonaModelTest(TestCase):
    def setUp(self):
        self.persona = Persona.objects.create(
            tipo_documento='CC',
            documento='1234567890',
            nombres='Juan',
            apellidos='Perez',
            hobbie='Programar'
        )

    def test_persona_creation(self):
        self.assertTrue(isinstance(self.persona, Persona))
        self.assertEqual(self.persona.__str__(), 'Juan Perez')

class PersonaAPITest(APITestCase):
    def setUp(self):
        self.persona_data = {
            'tipo_documento': 'CC',
            'documento': '9876543210',
            'nombres': 'Maria',
            'apellidos': 'Gomez',
            'hobbie': 'Leer'
        }
        self.persona = Persona.objects.create(
            tipo_documento='TI',
            documento='111222333',
            nombres='Carlos',
            apellidos='Lopez',
            hobbie='Correr'
        )
        self.url = '/api/personas/' # Asumiendo que esta es la ruta base, verificaremos con reverse si es posible o hardcodeamos por ahora si no conocemos el router name exacto, pero viewsets suelen usar basename

    def test_create_persona(self):
        response = self.client.post(self.url, self.persona_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Persona.objects.count(), 2)
        self.assertEqual(Persona.objects.get(documento='9876543210').nombres, 'Maria')

    def test_get_personas(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_persona(self):
        url = f"{self.url}{self.persona.id}/"
        data = {'nombres': 'Carlos Andres'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.persona.refresh_from_db()
        self.assertEqual(self.persona.nombres, 'Carlos Andres')

    def test_delete_persona(self):
        url = f"{self.url}{self.persona.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Persona.objects.count(), 0)
