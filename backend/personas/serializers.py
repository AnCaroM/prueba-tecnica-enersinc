from rest_framework import serializers
from .models import Persona

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'

    def validate(self, data):
        """
        Validación personalizada:
        Si el tipo de documento NO es Pasaporte, el número debe ser numérico.
        """
        tipo_documento = data.get('tipo_documento')
        documento = data.get('documento')

        # Si estamos creando (no hay instancia previa) o si ambos campos vienen en la data
        if tipo_documento and documento:
            if tipo_documento != 'PAS':
                # .isdigit() devuelve True solo si todos los caracteres son números
                if not documento.isdigit():
                    raise serializers.ValidationError({
                        "documento": "Para este tipo de documento, el número debe contener solo dígitos."
                    })

        return data