# 💼 Estructura de Datos - Experiencia Laboral

## Esquema Completo del Modelo Experience

### Campos del Schema

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | String | Sí | Identificador único. MongoDB genera `_id`, se mapea automáticamente a `id` en respuestas. |
| `role` | String | Sí | Puesto o cargo (ej. "Arquitecto Junior", "Jefe de Obra") |
| `company` | String | Sí | Nombre de la empresa o estudio (ej. "Quinta Negra", "Constructora XYZ") |
| `period` | String | Sí | Fecha de inicio y fin (ej. "2023 - Presente", "2020 - 2022"). **String para permitir texto libre.** |
| `description` | String | No | Breve resumen de responsabilidades o logros en ese puesto |
| `order` | Number | No | Orden de visualización (default: 0). Menor número = aparece primero |
| `createdAt` | Date | Auto | Fecha de creación (Mongoose timestamp) |
| `updatedAt` | Date | Auto | Fecha de última actualización (Mongoose timestamp) |

---

## 📝 Características del Campo `period`

El campo `period` es **String** (no Date) para permitir flexibilidad:

### Formatos válidos:
- `"2023 - Presente"` (empleo actual)
- `"2020 - 2022"` (empleo pasado)
- `"Enero 2021 - Diciembre 2023"` (con nombres de meses)
- `"2023"` (solo año)

**Ventaja:** El usuario puede escribir lo que necesite sin restricciones de formato Date.

---

## 🔄 Endpoints CRUD

### 1. GET /api/v1/experience (Público)
Obtiene todas las experiencias laborales ordenadas.

**Request:**
```bash
GET /api/v1/experience
```

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
      "period": "2020 - Presente",
      "description": "Lideré proyectos residenciales de alta gama",
      "order": 1,
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "role": "Jefe de Obra",
      "company": "Constructora XYZ",
      "period": "2018 - 2020",
      "description": "Supervisión de acabados y gestión de personal",
      "order": 2,
      "createdAt": "2026-01-10T08:00:00.000Z",
      "updatedAt": "2026-01-10T08:00:00.000Z"
    }
  ]
}
```

**Ordenamiento:**
- Primero por campo `order` (ascendente)
- Luego por `createdAt` (descendente - más recientes primero)

---

### 2. POST /api/v1/experience (Privado)
Crea una nueva experiencia laboral.

**Request:**
```bash
POST /api/v1/experience
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "role": "Jefe de Obra",
  "company": "Constructora XYZ",
  "period": "2022 - 2024",
  "description": "Supervisión de acabados y gestión de personal.",
  "order": 5
}
```

**Campos requeridos:** `role`, `company`, `period`  
**Campos opcionales:** `description`, `order`

**Response (201):**
```json
{
  "ok": true,
  "message": "Experiencia creado correctamente.",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "role": "Jefe de Obra",
    "company": "Constructora XYZ",
    "period": "2022 - 2024",
    "description": "Supervisión de acabados y gestión de personal.",
    "order": 5,
    "createdAt": "2026-02-19T19:30:00.000Z",
    "updatedAt": "2026-02-19T19:30:00.000Z"
  }
}
```

---

### 3. PUT /api/v1/experience/:id (Privado)
Actualiza una experiencia existente.

**Request:**
```bash
PUT /api/v1/experience/507f1f77bcf86cd799439013
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (parcial o completo):**
```json
{
  "period": "2022 - Presente",
  "description": "Supervisión de acabados, gestión de personal y calidad."
}
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Experiencia actualizado correctamente.",
  "data": {
    "id": "507f1f77bcf86cd799439013",
    "role": "Jefe de Obra",
    "company": "Constructora XYZ",
    "period": "2022 - Presente",
    "description": "Supervisión de acabados, gestión de personal y calidad.",
    "order": 5,
    "createdAt": "2026-02-19T19:30:00.000Z",
    "updatedAt": "2026-02-19T19:35:00.000Z"
  }
}
```

---

### 4. DELETE /api/v1/experience/:id (Privado)
Elimina una experiencia.

**Request:**
```bash
DELETE /api/v1/experience/507f1f77bcf86cd799439013
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Experiencia eliminado correctamente."
}
```

---

## ✅ Validaciones del Backend

1. **Campos requeridos:** `role`, `company`, `period`
   - Si falta alguno, retorna error 400
2. **Campo `period`:** Acepta cualquier string (sin validación de formato)
3. **Campo `description`:** Opcional, string vacío por defecto
4. **Campo `order`:** Opcional, 0 por defecto
5. **Mapeo `_id` → `id`:** Automático en todas las respuestas

---

## 🔑 Mapeo de ID

**MongoDB:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "role": "Arquitecto Senior",
  ...
}
```

**API Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "role": "Arquitecto Senior",
  ...
}
```

El campo `_id` **no se envía** al frontend.

---

## 🎯 Ejemplo Completo de Flujo

### 1. Login
```bash
POST /api/v1/auth/login
Body: { "password": "admin123" }
```

### 2. Crear experiencia
```bash
POST /api/v1/experience
Authorization: Bearer <token>
Body: {
  "role": "Arquitecto Junior",
  "company": "Quinta Negra",
  "period": "2023 - Presente",
  "description": "Diseño de proyectos residenciales"
}
```

### 3. Obtener todas (público)
```bash
GET /api/v1/experience
```

### 4. Actualizar
```bash
PUT /api/v1/experience/:id
Authorization: Bearer <token>
Body: { "period": "2023 - 2025" }
```

### 5. Eliminar
```bash
DELETE /api/v1/experience/:id
Authorization: Bearer <token>
```

---

## 📌 Diferencias con Projects

| Característica | Experience | Projects |
|----------------|------------|----------|
| Complejidad | Texto puro | Array de imágenes + tags |
| Campos requeridos | 3 (role, company, period) | 5 (title, description, category, location, year) |
| Arrays | No | Sí (images, tags) |
| Validación especial | No | Sí (type de imagen enum) |
| Sub-schemas | No | Sí (imageSchema) |

---

## 🧪 Pruebas Realizadas

✅ Modelo actualizado con campos correctos  
✅ `role`, `company`, `period` como requeridos  
✅ `period` como String (permite "Presente")  
✅ Mapeo `_id` → `id` implementado  
✅ Ordenamiento por `order` y `createdAt`  
✅ CRUD completo funcional  

---

## 📝 Archivos Actualizados

- ✅ `src/models/Experience.js` - Schema simplificado
- ✅ `API_DOCS.md` - Ejemplos actualizados
- ✅ `thunder-collection.json` - Request bodies corregidos

---

## 💡 Consideraciones Frontend

1. **Campo `period`:** Input de texto libre, sin calendario
2. **Texto "Presente":** El usuario puede escribirlo manualmente
3. **Validación:** Solo asegúrate de que role, company, period no estén vacíos
4. **Orden:** Puedes usar drag & drop para cambiar `order`, luego hacer PUT
5. **Sin imágenes:** No necesitas endpoint /upload para esta colección
