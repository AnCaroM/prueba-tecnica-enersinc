from django.db import models

class Persona(models.Model):
    # Definimos las opciones para tipo de documento [cite: 10]
    TIPOS_DOCUMENTO = [
        ('CC', 'Cédula de Ciudadanía'),
        ('TI', 'Tarjeta de Identidad'),
        ('CE', 'Cédula de Extranjería'),
        ('PAS', 'Pasaporte'),
    ]

    tipo_documento = models.CharField(max_length=3, choices=TIPOS_DOCUMENTO)
    documento = models.CharField(max_length=20, unique=True) # [cite: 11]
    nombres = models.CharField(max_length=100) # [cite: 12]
    apellidos = models.CharField(max_length=100) # [cite: 13]
    hobbie = models.CharField(max_length=255) # [cite: 14]

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"