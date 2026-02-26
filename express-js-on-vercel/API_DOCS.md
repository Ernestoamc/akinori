# API Endpoints Documentation

## Base URL
```
http://localhost:4000/api/v1
```

## Headers de Autenticación (Rutas Privadas)
```
Authorization: Bearer <token>
```

---

## 1. Authentication

### POST /auth/login
**Acceso:** Público  
**Descripción:** Autenticación del administrador

**Request Body:**
```json
{
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Autenticación exitosa.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Profile (Singleton)

### GET /profile
**Acceso:** Público  
**Descripción:** Obtiene el perfil del arquitecto

**Response (200):**
```json
{
  "ok": true,
  "data": {
    "id": "...",
    "name": "Ernesto Akinori",
    "title": "Arquitecto & Diseñador",
    "logoName": "ARQUINORI",
    "heroSubtitle": "Portafolio 2025",
    "heroTitlePrimary": "ERNESTO",
    "heroTitleSecondary": "AKINORI",
    "about": "Arquitecto con enfoque en espacios contemporaneos...",
    "phone": "+52 55 1234 5678",
    "email": "ernesto@example.com",
    "address": "Culiacan, Sinaloa",
    "portraitUrl": "https://res.cloudinary.com/.../portrait.jpg",
    "formalUrl": "https://res.cloudinary.com/.../formal.jpg",
    "socials": {
      "linkedin": "https://linkedin.com/in/ernesto",
      "instagram": "https://instagram.com/ernesto",
      "behance": "https://behance.net/ernesto"
    }
  }
}
```

### PUT /profile
**Acceso:** Privado (requiere token)  
**Descripción:** Actualiza el perfil del arquitecto

**Request Body:**
```json
{
  "name": "Ernesto Akinori",
  "title": "Arquitecto & Diseñador",
  "logoName": "ARQUINORI",
  "heroSubtitle": "Portafolio 2025",
  "heroTitlePrimary": "ERNESTO",
  "heroTitleSecondary": "AKINORI",
  "about": "Arquitecto con enfoque en espacios contemporaneos...",
  "phone": "+52 55 1234 5678",
  "email": "ernesto@example.com",
  "address": "Culiacan, Sinaloa",
  "portraitUrl": "https://res.cloudinary.com/.../portrait.jpg",
  "formalUrl": "https://res.cloudinary.com/.../formal.jpg",
  "socials": {
    "linkedin": "https://linkedin.com/in/ernesto",
    "instagram": "https://instagram.com/ernesto",
    "behance": "https://behance.net/ernesto"
  }
}
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Perfil actualizado correctamente.",
  "data": { ... }
}
```

---

## 3. Upload

### POST /upload
**Acceso:** Privado (requiere token)  
**Descripción:** Sube una imagen a Cloudinary

**Content-Type:** `multipart/form-data`

**Form Data:**
- `image`: archivo (JPEG, PNG, GIF, WEBP, max 5MB)

**Response (200):**
```json
{
  "ok": true,
  "message": "Imagen subida correctamente.",
  "url": "https://res.cloudinary.com/.../image.jpg",
  "publicId": "portfolio/abc123"
}
```

---

## 4. Projects

### GET /projects
**Acceso:** Público  
**Descripción:** Obtiene todos los proyectos

**Response (200):**
```json
{
  "ok": true,
  "count": 5,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Casa Moderna",
      "description": "Diseño contemporáneo...",
      "category": "Residencial",
      "location": "Ciudad de México",
      "year": "2024",
      "tags": ["Minimalista", "Concreto"],
      "images": [
        {
          "url": "https://res.cloudinary.com/.../render1.jpg",
          "type": "render",
          "caption": "Fachada Principal"
        },
        {
          "url": "https://res.cloudinary.com/.../plan1.jpg",
          "type": "plan",
          "caption": "Planta Baja"
        }
      ],
      "featured": true,
      "order": 1,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /projects/:id
**Acceso:** Público  
**Descripción:** Obtiene un proyecto por ID

**Estructura del campo `images`:**
Cada elemento en el array `images` debe tener:
- `url` (String, requerido): URL completa de la imagen (retornada por POST /upload)
- `type` (String, enum): Solo valores válidos: `'render'`, `'plan'`, `'detail'`, `'sketch'`
- `caption` (String): Pie de foto o descripción de la imagen

**Campo `year`:**
Es String para permitir rangos como `"2023-2024"` o valores como `"2024"`.

### POST /projects
**Acceso:** Privado  
**Descripción:** Crea un nuevo proyecto

**Request Body:**
```json
{
  "title": "Casa Moderna",
  "description": "Diseño contemporáneo con enfoque sustentable",
  "category": "Residencial",
  "location": "Ciudad de México",
  "year": "2024",
  "tags": ["Minimalista", "Concreto", "Sustentable"],
  "images": [
    {
      "url": "https://res.cloudinary.com/.../render1.jpg",
      "type": "render",
      "caption": "Fachada Principal"
    },
    {
      "url": "https://res.cloudinary.com/.../plan1.jpg",
      "type": "plan",
      "caption": "Planta Baja"
    },
    {
      "url": "https://res.cloudinary.com/.../detail1.jpg",
      "type": "detail",
      "caption": "Detalle ventana"
    }
  ],
  "featured": true,
  "order": 1
}
```

### PUT /projects/:id
**Acceso:** Privado  
**Descripción:** Actualiza un proyecto existente

### DELETE /projects/:id
**Acceso:** Privado  
**Descripción:** Elimina un proyecto

---

## 5. Experience

### GET /experience
**Acceso:** Público  
**Descripción:** Obtiene toda la experiencia laboral

**Campo `period`:**
Es String para permitir texto libre como `"2020 - Presente"`, `"2018 - 2020"`, `"Enero 2021 - Diciembre 2023"`, etc.

**Response (200):**
```json
{
  "ok": true,
  "count": 3,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "role": "Arquitecto Senior",
      "company": "Estudio ABC",
      "period": "2020 - 2023",
      "description": "Lideré proyectos residenciales de alta gama",
      "order": 1,
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "role": "Jefe de Obra",
      "company": "Constructora XYZ",
      "period": "2018 - 2020",
      "description": "Supervisión de acabados y gestión de personal",
      "order": 2,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /experience/:id
### POST /experience
**Acceso:** Privado  
**Descripción:** Crea una nueva experiencia laboral

**Request Body:**
```json
{
  "role": "Arquitecto Senior",
  "company": "Estudio ABC",
  "period": "2020 - Presente",
  "description": "Lideré proyectos residenciales de alta gama",
  "order": 1
}
```

**Campos requeridos:** `role`, `company`, `period`  
**Campos opcionales:** `description`, `order`

### PUT /experience/:id
**Acceso:** Privado  
**Descripción:** Actualiza una experiencia existente

**Request Body (parcial o completo):**
```json
{
  "period": "2020 - 2024",
  "description": "Lideré proyectos residenciales y comerciales"
}
```

### DELETE /experience/:id

---

## 6. Education

### GET /education
**Acceso:** Público  
**Descripción:** Obtiene toda la formación académica

**Response (200):**
```json
{
  "ok": true,
  "count": 2,
  "data": [
    {
      "id": "507f1f77bcf86cd799439021",
      "degree": "Licenciatura en Arquitectura",
      "institution": "Universidad Autónoma de Sinaloa",
      "year": "2015 - 2020",
      "order": 1,
      "createdAt": "...",
      "updatedAt": "..."
    },
    {
      "id": "507f1f77bcf86cd799439022",
      "degree": "Diplomado en Interiores",
      "institution": "Universidad Casa Blanca",
      "year": "2025",
      "order": 2,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### GET /education/:id
### POST /education
**Acceso:** Privado  
**Descripción:** Crea un nuevo estudio

**Request Body:**
```json
{
  "degree": "Licenciatura en Arquitectura",
  "institution": "Universidad Autónoma de Sinaloa",
  "year": "2015 - 2020",
  "order": 1
}
```

**Campos requeridos:** `degree`, `institution`, `year`  
**Campos opcionales:** `order`

**Campo `year`:**  
Es String para permitir texto flexible como `"2020"`, `"2015 - 2020"`, `"2025"`

### PUT /education/:id
**Acceso:** Privado  
**Descripción:** Actualiza un estudio existente

### DELETE /education/:id

---

## 7. Courses

### GET /courses
**Acceso:** Público  
**Descripción:** Obtiene todos los cursos

**Response (200):**
```json
{
  "ok": true,
  "count": 5,
  "data": [
    {
      "id": "...",
      "name": "Modelado BIM & Revit",
      "institution": "Autodesk",
      "year": "2023",
      "order": 1
    }
  ]
}
```

**Campo `year`:**
Es String para permitir texto flexible como `"2023"` o `"2022 - 2023"`

### GET /courses/:id
### POST /courses
### PUT /courses/:id
### DELETE /courses/:id

---

## 8. Skills

### GET /skills
**Acceso:** Público  
**Descripción:** Obtiene todas las habilidades

**Response (200):**
```json
{
  "ok": true,
  "count": 10,
  "data": [
    {
      "id": "...",
      "name": "AutoCAD",
      "level": 95
    }
  ]
}
```

**Validacion:** `level` debe ser un numero entero entre 0 y 100.
**Orden:** se ordenan por `level` descendente (mayor a menor).

### GET /skills/:id
### POST /skills
### PUT /skills/:id
### DELETE /skills/:id

---

## 9. Interests

### GET /interests
**Acceso:** Público  
**Descripción:** Obtiene todos los intereses

**Response (200):**
```json
{
  "ok": true,
  "count": 4,
  "data": [
    {
      "id": "...",
      "name": "Fotografia",
      "icon": "📷"
    }
  ]
}
```

**Nota:** `icon` acepta cualquier string, pero el frontend espera un emoji.

### GET /interests/:id
### POST /interests
### PUT /interests/:id
### DELETE /interests/:id

---

## 10. Health Check

### GET /health
**Acceso:** Público  
**Descripción:** Verifica el estado del servidor

**Response (200):**
```json
{
  "ok": true,
  "message": "API funcionando",
  "timestamp": "2026-02-19T19:15:00.000Z"
}
```

---

## Códigos de Respuesta

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (Token inválido o faltante)
- `404` - Not Found
- `500` - Internal Server Error

---

## Notas

1. Todas las rutas POST, PUT y DELETE (excepto /auth/login) requieren el header `Authorization: Bearer <token>`
2. El token se obtiene mediante POST /auth/login
3. El token tiene una duración de 7 días
4. Las colecciones se ordenan por `order` y fecha de creación; `skills` se ordena por `level` descendente
5. Profile es un singleton: solo existe un registro y se crea automáticamente al hacer GET
6. El upload acepta archivos de hasta 5MB en formatos: JPEG, PNG, GIF, WEBP
