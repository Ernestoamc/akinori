# 🎓 Estructura de Datos - Educación

## Esquema Completo del Modelo Education

### Campos del Schema

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | String | Sí | Identificador único. MongoDB genera `_id`, se mapea automáticamente a `id` en respuestas. |
| `degree` | String | Sí | Título obtenido (ej. "Licenciatura en Arquitectura", "Diplomado en Interiores") |
| `institution` | String | Sí | Universidad o escuela (ej. "Universidad Autónoma de Sinaloa") |
| `year` | String | Sí | Año de graduación o periodo (ej. "2020", "2015 - 2020"). **String para texto flexible.** |
| `order` | Number | No | Orden de visualización (default: 0). Menor número = aparece primero |
| `createdAt` | Date | Auto | Fecha de creación (Mongoose timestamp) |
| `updatedAt` | Date | Auto | Fecha de última actualización (Mongoose timestamp) |

---

## 📝 Características del Campo `year`

El campo `year` es **String** (no Date) para permitir flexibilidad:

### Formatos válidos:
- `"2020"` (solo año de graduación)
- `"2015 - 2020"` (periodo completo)
- `"2025"` (año futuro para estudios en curso)
- `"Enero 2020"` (con mes)

**Ventaja:** El usuario puede escribir el formato que necesite sin restricciones.

---

## 🔄 Endpoints CRUD

### 1. GET /api/v1/education (Público)
Obtiene todos los estudios ordenados.

**Request:**
```bash
GET /api/v1/education
```

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
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439022",
      "degree": "Diplomado en Interiores",
      "institution": "Universidad Casa Blanca",
      "year": "2025",
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

### 2. POST /api/v1/education (Privado)
Crea un nuevo estudio.

**Request:**
```bash
POST /api/v1/education
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "degree": "Diplomado en Interiores",
  "institution": "Universidad Casa Blanca",
  "year": "2025",
  "order": 2
}
```

**Campos requeridos:** `degree`, `institution`, `year`  
**Campos opcionales:** `order`

**Response (201):**
```json
{
  "ok": true,
  "message": "Educación creado correctamente.",
  "data": {
    "id": "507f1f77bcf86cd799439022",
    "degree": "Diplomado en Interiores",
    "institution": "Universidad Casa Blanca",
    "year": "2025",
    "order": 2,
    "createdAt": "2026-02-19T20:00:00.000Z",
    "updatedAt": "2026-02-19T20:00:00.000Z"
  }
}
```

---

### 3. PUT /api/v1/education/:id (Privado)
Actualiza un estudio existente.

**Request:**
```bash
PUT /api/v1/education/507f1f77bcf86cd799439022
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (parcial o completo):**
```json
{
  "year": "2024 - 2025"
}
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Educación actualizado correctamente.",
  "data": {
    "id": "507f1f77bcf86cd799439022",
    "degree": "Diplomado en Interiores",
    "institution": "Universidad Casa Blanca",
    "year": "2024 - 2025",
    "order": 2,
    "createdAt": "2026-02-19T20:00:00.000Z",
    "updatedAt": "2026-02-19T20:05:00.000Z"
  }
}
```

---

### 4. DELETE /api/v1/education/:id (Privado)
Elimina un estudio.

**Request:**
```bash
DELETE /api/v1/education/507f1f77bcf86cd799439022
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "ok": true,
  "message": "Educación eliminado correctamente."
}
```

---

## ✅ Validaciones del Backend

1. **Campos requeridos:** `degree`, `institution`, `year`
   - Si falta alguno, retorna error 400
2. **Campo `year`:** Acepta cualquier string (sin validación de formato)
3. **Campo `order`:** Opcional, 0 por defecto
4. **Mapeo `_id` → `id`:** Automático en todas las respuestas

---

## 🔑 Mapeo de ID

**MongoDB:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439021"),
  "degree": "Licenciatura en Arquitectura",
  ...
}
```

**API Response:**
```json
{
  "id": "507f1f77bcf86cd799439021",
  "degree": "Licenciatura en Arquitectura",
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

### 2. Crear estudio
```bash
POST /api/v1/education
Authorization: Bearer <token>
Body: {
  "degree": "Licenciatura en Arquitectura",
  "institution": "Universidad Autónoma de Sinaloa",
  "year": "2015 - 2020"
}
```

### 3. Obtener todos (público)
```bash
GET /api/v1/education
```

### 4. Actualizar
```bash
PUT /api/v1/education/:id
Authorization: Bearer <token>
Body: { "year": "2016 - 2020" }
```

### 5. Eliminar
```bash
DELETE /api/v1/education/:id
Authorization: Bearer <token>
```

---

## 📊 Comparación: Experience vs Education

| Característica | Experience | Education |
|----------------|------------|-----------|
| Campo 1 | `role` | `degree` |
| Campo 2 | `company` | `institution` |
| Campo 3 | `period` | `year` |
| Campo 4 | `description` (opcional) | - |
| Complejidad | Texto puro | Texto puro |
| Campos requeridos | 3 | 3 |

**Ambos modelos:**
- ✅ Son estructuralmente similares (3 campos requeridos String)
- ✅ Sin arrays complejos
- ✅ Sin validaciones especiales
- ✅ Con campo `order` para ordenamiento
- ✅ Mapeo automático `_id` → `id`

---

## 🧪 Validación Recomendada

```bash
# Crear con todos los campos
POST /api/v1/education
{
  "degree": "Maestría en Urbanismo",
  "institution": "UNAM",
  "year": "2021 - 2023",
  "order": 1
}

# Verificar respuesta con id
GET /api/v1/education

# Debe retornar:
{
  "ok": true,
  "data": [
    {
      "id": "...",  // ✅ sin _id
      "degree": "Maestría en Urbanismo",
      "institution": "UNAM",
      "year": "2021 - 2023",
      "order": 1
    }
  ]
}
```

---

## 💡 Consideraciones Frontend

1. **Campo `year`:** Input de texto libre (no datepicker)
2. **Validación:** Solo asegúrate de que degree, institution, year no estén vacíos
3. **Sin descripción:** A diferencia de Experience, no tiene campo description
4. **Orden:** Puedes usar drag & drop para cambiar `order`
5. **Simplificado:** Solo 3 campos requeridos

---

## 📝 Archivos Actualizados

- ✅ `src/models/Education.js` - Schema simplificado a 3 campos
- ✅ `API_DOCS.md` - Ejemplos actualizados
- ✅ `thunder-collection.json` - Request bodies corregidos
- ✅ `EDUCATION_SCHEMA.md` - Este archivo (nuevo)
