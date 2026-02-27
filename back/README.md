# Back (Express + MongoDB + Cloudinary)

Backend completo con autenticación JWT, gestión de perfil singleton, upload de imágenes y CRUDs para portafolio de arquitectura.

## Stack

- **Express 5**: Framework web
- **MongoDB + Mongoose**: Base de datos NoSQL
- **Cloudinary**: Almacenamiento de imágenes
- **JWT + bcryptjs**: Autenticación y seguridad
- **Multer**: Upload de archivos
- **Seguridad**: Helmet, CORS, Compression, Rate Limit
- **Logging**: Morgan
- **Calidad**: ESLint + Prettier

## Configuración Inicial

1. **Copia y configura el archivo .env:**
```bash
cp .env.example .env
```

2. **Edita las variables en `.env`:**
   - `MONGODB_URI`: Tu cadena de conexión MongoDB Atlas
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `JWT_SECRET`: Secreto para firmar tokens (cámbialo en producción)
  - `ADMIN_PASSWORD`: Contraseña del administrador (solo desarrollo)
  - `ADMIN_PASSWORD_HASH`: Hash bcrypt para producción
   - `PORT`: Puerto del servidor (default: 4000)
   - `CLIENT_URL`: URL del frontend para CORS

3. **Instala dependencias:**
```bash
npm install
```

4. **Prueba las conexiones:**
```bash
npm run test:connections
```

5. **Arranca el servidor:**
```bash
npm run dev
```

## Scripts

- `npm run dev`: Desarrollo con recarga automática (nodemon)
- `npm start`: Producción
- `npm run test:connections`: Prueba MongoDB y Cloudinary
- `npm run lint`: Revisar código
- `npm run lint:fix`: Corregir lint automáticamente
- `npm run format`: Formatear código

## Estructura del Proyecto

```
src/
├── app.js                    # Configuración Express
├── server.js                 # Punto de entrada
├── config/
│   ├── env.js               # Variables de entorno
│   ├── db.js                # Conexión MongoDB
│   ├── cloudinary.js        # Configuración Cloudinary
│   └── multer.js            # Configuración Multer
├── models/
│   ├── Profile.js           # Modelo singleton perfil
│   ├── Project.js          # year: String, tags: Array, images: Array[Object]
│   ├── Experience.js       # role, company, period (String)
│   ├── Education.js
│   ├── Course.js
│   ├── Skill.js
│   └── Interest.js
├── controllers/
│   ├── auth.controller.js
│   ├── profile.controller.js
│   ├── upload.controller.js
│   ├── projects.controller.js
│   ├── experience.controller.js
│   ├── education.controller.js
│   ├── courses.controller.js
│   ├── skills.controller.js
│   ├── interests.controller.js
│   └── health.controller.js
├── routes/
│   ├── index.js             # Router principal
│   ├── auth.routes.js
│   ├── profile.routes.js
│   ├── upload.routes.js
│   ├── projects.routes.js
│   ├── experience.routes.js
│   ├── education.routes.js
│   ├── courses.routes.js
│   ├── skills.routes.js
│   ├── interests.routes.js
│   └── health.routes.js
├── middlewares/
│   ├── authMiddleware.js    # Protección JWT
│   └── errorHandler.js      # Manejo de errores
├── utils/
│   ├── asyncHandler.js      # Wrapper async
│   ├── jwt.js               # Utilidades JWT
│   ├── bcrypt.js            # Utilidades bcrypt
│   └── crudFactory.js       # Generador CRUD
└── scripts/
    └── testConnections.js   # Script de prueba
```

## API Endpoints

Ver documentación completa en [API_DOCS.md](./API_DOCS.md)

**Documentación de Schemas:**
- [PROJECTS_SCHEMA.md](./PROJECTS_SCHEMA.md) - Estructura detallada de Proyectos
- [EXPERIENCE_SCHEMA.md](./EXPERIENCE_SCHEMA.md) - Estructura detallada de Experiencia

### Resumen de Rutas

**Base URL:** `http://localhost:4000/api/v1`

#### Públicas
- `GET /health` - Healthcheck
- `POST /auth/login` - Login admin
- `GET /profile` - Obtener perfil
- `GET /projects` - Listar proyectos
- `GET /experience` - Listar experiencia
- `GET /education` - Listar educación
- `GET /courses` - Listar cursos
- `GET /skills` - Listar habilidades
- `GET /interests` - Listar intereses

#### Privadas (requieren token)
- `PUT /profile` - Actualizar perfil
- `POST /upload` - Subir imagen
- `POST|PUT|DELETE /projects/:id?` - CRUD proyectos
- `POST|PUT|DELETE /experience/:id?` - CRUD experiencia
- `POST|PUT|DELETE /education/:id?` - CRUD educación
- `POST|PUT|DELETE /courses/:id?` - CRUD cursos
- `POST|PUT|DELETE /skills/:id?` - CRUD habilidades
- `POST|PUT|DELETE /interests/:id?` - CRUD intereses

## Autenticación

1. **Login:**
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "password": "<tu_password_admin>"
}
```

2. **Usar el token en rutas privadas:**
```bash
Authorization: Bearer <tu_token_jwt>
```

## Ejemplo de Uso con cURL

```bash
# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"<tu_password_admin>"}' | jq -r '.token')

# Crear proyecto
curl -X POST http://localhost:4000/api/v1/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa Moderna",
    "category": "Residencial",
    "year": 2024
  }'

# Subir imagen
curl -X POST http://localhost:4000/api/v1/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@/ruta/imagen.jpg"
```

## Características

✅ Autenticación JWT con expiración de 7 días  
✅ Perfil singleton (solo existe uno, se crea automáticamente)  
✅ Upload a Cloudinary con validación de formato y tamaño  
✅ 6 recursos CRUD completos (Projects, Experience, Education, Courses, Skills, Interests)  
✅ Middleware de autenticación reutilizable  
✅ Factory de controladores CRUD para evitar código duplicado  
✅ Manejo de errores centralizado  
✅ Rate limiting (300 req/15min)  
✅ Seguridad: Helmet, CORS configurado  
✅ Compresión de respuestas  
✅ Logging con Morgan  
✅ Validación con Mongoose schemas  
✅ Ordenamiento automático por campo `order`  

## Próximos Pasos Recomendados

1. **Validación de datos:** Instalar `express-validator` o `joi` para validar request bodies
2. **Paginación:** Agregar paginación a los endpoints GET de colecciones
3. **Búsqueda:** Implementar filtros y búsqueda por texto
4. **Tests:** Agregar tests con Jest o Mocha
5. **Documentación Swagger:** Generar docs automáticas con `swagger-jsdoc`
6. **Deploy:** Configurar para Heroku, Railway, Render o AWS
7. **CI/CD:** GitHub Actions para lint, tests y deploy automático

## Variables de Entorno Requeridas

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=http://localhost:3000
JWT_SECRET=tu_secreto_super_seguro
```

## Soporte

Para más información sobre los modelos de datos y ejemplos de uso, ver [API_DOCS.md](./API_DOCS.md)
