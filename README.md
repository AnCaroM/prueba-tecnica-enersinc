# Prueba Técnica Full Stack - Gestión de Personas

Este repositorio contiene la solución a la prueba técnica para el proceso de selección de **Enersinc**. El proyecto consiste en una aplicación web Full Stack que permite gestionar un directorio de personas (CRUD completo) utilizando buenas prácticas de desarrollo y una arquitectura moderna.

## 🚀 Demo Desplegado
¡Puedes probar la aplicación en vivo aquí!
* **Frontend (Vercel):** [https://prueba-tecnica-enersinc.vercel.app/personas](https://prueba-tecnica-enersinc.vercel.app/personas)
* **Backend API (Render):** [https://api-enersinc-andres-caro.onrender.com/api/personas/](https://api-enersinc-andres-caro.onrender.com/api/personas/)

---

## 🛠 Tecnologías Utilizadas

El proyecto fue desarrollado siguiendo estrictamente los requisitos técnicos solicitados:

### Backend
* **Python & Django:** Framework principal.
* **Django Rest Framework (DRF):** Para la construcción de la API RESTful.
* **PostgreSQL:** Base de datos en producción (Render).
* **Cors-headers:** Manejo de seguridad para peticiones cruzadas.

### Frontend
* **React:** Inicializado con `create-react-app`.
* **Redux Toolkit:** Gestión del estado global de la aplicación.
* **Ant Design:** Librería de componentes UI para una interfaz limpia y responsive.
* **Axios:** Cliente HTTP configurado de forma modular.

---

## 📋 Funcionalidades
La aplicación cumple con el 100% de los requerimientos:

1.  **Listado de Personas:** Tabla interactiva con paginación y ordenamiento usando Ant Design.
2.  **CRUD Completo:** Funcionalidades de Crear, Leer, Actualizar y Eliminar registros.
3.  **Modelo de Datos:** Incluye los campos: Tipo Documento, Documento, Nombres, Apellidos y Hobbie.
4.  **Feedback al Usuario:** Notificaciones visuales (Toasts) para confirmar acciones exitosas o reportar errores de la API.
5.  **Validaciones Dobles:**
    * **Frontend:** Validación en tiempo real (ej: Solo números si no es pasaporte).
    * **Backend:** Validación de integridad de datos en el serializador.

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### Prerrequisitos
* Python 3.8+
* Node.js y npm
* Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/ancarom/prueba-tecnica-enersinc.git
cd prueba-tecnica-enersinc
```

---
## Configurar el Backend (Django)

```bash
# Entrar a la carpeta del servidor
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones (Crear base de datos SQLite local)
python manage.py migrate

# Iniciar servidor (correrá en [http://127.0.0.1:8000](http://127.0.0.1:8000))
python manage.py runserver
```
---

## Configurar el Frontend (React)

```bash
# Entrar a la carpeta del cliente
cd frontend

# Instalar dependencias
npm install

# Iniciar aplicación (correrá en http://localhost:3000)
npm start
```
---

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```bash
prueba-enersinc/
├── backend/            # API Django Rest Framework
│   ├── core/           # Configuración (settings, urls)
│   └── personas/       # App principal (Modelos, Vistas, Serializers)
│
└── frontend/           # Cliente React
    ├── src/
    │   ├── api/        # Configuración de Axios
    │   ├── components/ # Componentes UI (Formularios, Modales)
    │   ├── pages/      # Vistas principales (Tabla)
    │   └── redux/      # Estado global (Slices, Store)
```

### Backend (Django)
```bash
backend/
├── core/          # Configuración principal de Django
├── personas/      # Aplicación de personas
├── requirements.txt  # Dependencias del proyecto
└── manage.py       # Script de gestión de Django
```

### Frontend (React)

```bash
frontend/
├── src/           # Código fuente de la aplicación
├── public/        # Archivos estáticos
├── package.json   # Dependencias del proyecto
└── README.md      # Documentación del proyecto
```

### 👤 Autor
Desarrollado por Andrés Caro como parte del proceso de selección para Desarrollador Full Stack en Enersinc.