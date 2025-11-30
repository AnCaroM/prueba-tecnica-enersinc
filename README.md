# Prueba Técnica Full Stack - Gestión de Personas

[cite_start]Este repositorio contiene la solución a la prueba técnica para el proceso de selección de **Enersinc**[cite: 2]. El proyecto consiste en una aplicación web Full Stack que permite gestionar un directorio de personas (CRUD completo) utilizando buenas prácticas de desarrollo y una arquitectura moderna.

## 🚀 Demo Desplegado
¡Puedes probar la aplicación en vivo aquí!
* **Frontend:** [INSERTA AQUÍ TU LINK DE VERCEL/NETLIFY]
* **Backend API:** [INSERTA AQUÍ TU LINK DE RENDER/RAILWAY]

---

## 🛠 Tecnologías Utilizadas

[cite_start]El proyecto fue desarrollado siguiendo estrictamente los requisitos técnicos solicitados[cite: 8, 16]:

### Backend
* **Python & Django:** Framework principal.
* **Django Rest Framework (DRF):** Para la construcción de la API RESTful.
* **SQLite / PostgreSQL:** Base de datos (SQLite para local, Postgres para producción).
* **Cors-headers:** Manejo de seguridad para peticiones cruzadas.

### Frontend
* [cite_start]**React:** Inicializado con `create-react-app`[cite: 16].
* [cite_start]**Redux Toolkit:** Gestión del estado global de la aplicación[cite: 16].
* [cite_start]**Ant Design:** Librería de componentes UI para una interfaz limpia y responsive[cite: 16].
* [cite_start]**Axios:** Cliente HTTP configurado de forma modular[cite: 16].

---

## 📋 Funcionalidades
La aplicación cumple con el 100% de los requerimientos:

1.  [cite_start]**Listado de Personas:** Tabla interactiva con paginación usando Ant Design[cite: 18].
2.  [cite_start]**CRUD Completo:** Funcionalidades de Crear, Leer, Actualizar y Eliminar registros[cite: 19, 20].
3.  [cite_start]**Modelo de Datos:** Incluye los campos: Tipo Documento, Documento, Nombres, Apellidos y Hobbie [cite: 10-14].
4.  [cite_start]**Feedback al Usuario:** Notificaciones visuales (Toasts) para confirmar acciones exitosas o reportar errores de la API[cite: 21].
5.  **Validaciones:** Formularios controlados que impiden enviar datos vacíos.

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para correr el proyecto en tu máquina local.

### Prerrequisitos
* Python 3.8+
* Node.js y npm
* Git

### 1. Clonar el repositorio
```bash
git clone [LINK_DE_TU_REPOSITORIO]
cd prueba-enersinc