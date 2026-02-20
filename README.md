# CinemaApp - Tu Cartelera Full-Stack

## Descripción
**CinemaApp** es una aplicación web completa diseñada para que los amantes del cine puedan gestionar su propia base de datos de películas y compartir críticas con otros usuarios. El proyecto ha sido desarrollado como una solución Full-Stack, separando claramente el Frontend (React) del Backend (Node.js + MySQL).

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca principal para la interfaz de usuario.
- **React Router**: Gestión de rutas y navegación.
- **Axios**: Comunicación con la API REST.
- **Context API**: Gestión del estado de autenticación.
- **Tailwind CSS**: Estilizado moderno y responsivo.
- **Lucide React**: Iconografía.

### Backend
- **Node.js & Express**: Entorno de ejecución y framework para el servidor.
- **Sequelize (ORM)**: Gestión de la base de datos MySQL y modelos de datos.
- **JWT (JSON Web Tokens)**: Autenticación segura de usuarios.
- **Bcryptjs**: Cifrado de contraseñas.
- **Morgan**: Registro de peticiones HTTP.

### Base de Datos
- **MySQL**: Almacenamiento persistente de datos (usuarios, películas, comentarios).

## Arquitectura del Proyecto
El proyecto sigue el patrón **MVC (Model-View-Controller)** con una capa adicional de **Servicios** para una mejor separación de responsabilidades:

- **Frontend**: Separado en componentes reutilizables y páginas dedicadas.
- **Backend (src/)**:
  - `routes/`: Definición de los endpoints de la API.
  - `controllers/`: Manejo de las peticiones HTTP y respuestas.
  - `services/`: Lógica de negocio y comunicación con los modelos.
  - `models/`: Definición de esquemas y relaciones de la base de datos (Sequelize).
  - `middleware/`: Protección de rutas y gestión de autenticación.

## Funcionalidades Principales
1. **Autenticación Completa**: Registro, login y gestión de sesiones mediante JWT.
2. **CRUD de Películas**: Los usuarios pueden añadir sus películas, ver detalles, editarlas y eliminarlas.
3. **Sistema de Comentarios**: Relación con la entidad Película. Permite añadir valoraciones (1-5 estrellas) y críticas.
4. **Moderación**: Los dueños de las películas pueden eliminar cualquier comentario en sus publicaciones.
5. **Panel Personal**: Espacio privado para que cada usuario gestione sus propias películas.
6. **Buscador**: Filtro dinámico en tiempo real por título o director.

## Instrucciones de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   ```

2. **Configurar el Backend**:
   - Entra en la carpeta `backend/`.
   - Instala las dependencias: `npm install`.
   - Crea un archivo `.env` basado en el entorno de tu base de datos MySQL (PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, JWT_SECRET).
   - Inicia el servidor: `npm run dev`.

3. **Configurar el Frontend**:
   - Entra en la carpeta `frontend/`.
   - Instala las dependencias: `npm install`.
   - Inicia la aplicación: `npm run dev`.

## Usuarios de Prueba
- **Usuario**: `admin@gmail.com`
- **Contraseña**: `password123`

---
**Desarrollado para el módulo DWEC por [Tu Nombre]**
