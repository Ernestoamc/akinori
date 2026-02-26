# 📐 Estructura de Datos - Proyectos

## Esquema Completo del Modelo Project

### Campos Base

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `id` | String | Sí | Identificador único. MongoDB genera `_id`, se mapea automáticamente a `id` en respuestas. |
| `title` | String | Sí | Título del proyecto (ej. "Casa del Bosque") |
| `description` | String | Sí | Descripción larga del proyecto |
| `category` | String | Sí | Categoría (ej. "Residencial", "Comercial", "Industrial") |
| `location` | String | Sí | Ubicación (ej. "Culiacán, Sinaloa") |
| `year` | String | Sí | Año de realización. **String para permitir rangos** (ej. "2024" o "2023-2024") |
| `tags` | Array[String] | No | Etiquetas descriptivas (ej. ["Minimalista", "Concreto", "Sustentable"]) |
| `images` | Array[Object] | Sí | Array de objetos con estructura específica (ver abajo) |
| `featured` | Boolean | No | Marca si el proyecto es destacado (default: false) |
| `order` | Number | No | Orden de visualización (default: 0) |
| `createdAt` | Date | Auto | Fecha de creación (Mongoose timestamp) |
| `updatedAt` | Date | Auto | Fecha de última actualización (Mongoose timestamp) |

---

## 📷 Estructura del Array `images`

Cada elemento dentro del array `images` **debe ser un objeto** con esta estructura:

### Objeto Image

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `url` | String | Sí | **CRÍTICO.** URL completa de la imagen. Obtenida del endpoint POST /api/v1/upload |
| `type` | String (Enum) | Sí | **Solo permite:** `'render'`, `'plan'`, `'detail'`, `'sketch'` |
| `caption` | String | No | Pie de foto o descripción de la imagen |

### Ejemplo de Array images:

```json
"images": [
  {
    "url": "https://res.cloudinary.com/demo/casa-bosque-render1.jpg",
    "type": "render",
    "caption": "Fachada Principal"
  },
  {
    "url": "https://res.cloudinary.com/demo/casa-bosque-plan.jpg",
    "type": "plan",
    "caption": "Planta Baja"
  },
  {
    "url": "https://res.cloudinary.com/demo/casa-bosque-detail.jpg",
    "type": "detail",
    "caption": "Detalle de ventana"
  },
  {
    "url": "https://res.cloudinary.com/demo/casa-bosque-sketch.jpg",
    "type": "sketch",
    "caption": "Boceto inicial"
  }
]
```

---

## 🔄 Flujo de Trabajo Recomendado

### 1. Subir Imagen
```bash
POST /api/v1/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

Form Data:
  - image: [archivo]
```

**Respuesta:**
```json
{
  "ok": true,
  "message": "Imagen subida correctamente.",
  "url": "https://res.cloudinary.com/.../imagen.jpg",
  "publicId": "portfolio/abc123"
}
```

### 2. Guardar URL en el Array images

Toma la `url` de la respuesta y agrégala al array:

```json
{
  "url": "https://res.cloudinary.com/.../imagen.jpg",
  "type": "render",
  "caption": "Fachada"
}
```

### 3. Crear Proyecto

```bash
POST /api/v1/projects
Content-Type: application/json
Authorization: Bearer <token>
```

```json
{
  "title": "Casa del Bosque",
  "description": "Proyecto residencial en armonía con la naturaleza...",
  "category": "Residencial",
  "location": "Culiacán, Sinaloa",
  "year": "2023-2024",
  "tags": ["Minimalista", "Madera", "Sustentable"],
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
  "order": 1
}
```

---

## ✅ Validaciones del Backend

El modelo MongoDB valida automáticamente:

1. **Campos requeridos:** `title`, `description`, `category`, `location`, `year`
2. **Array images:**
   - Cada objeto debe tener `url` (requerido)
   - `type` solo acepta: `'render'`, `'plan'`, `'detail'`, `'sketch'`
   - `caption` es opcional (string vacío por defecto)
3. **year:** Acepta cualquier string (permite "2024" o "2023-2024")
4. **tags:** Array opcional de strings

---

## 🔑 Mapeo de ID

**IMPORTANTE:** MongoDB guarda como `_id`, pero **el backend automáticamente lo convierte a `id`** en todas las respuestas.

**En MongoDB:**
```json
{
  "_id": ObjectId("6997630bd21a957ec2a51ffd"),
  "title": "Casa del Bosque",
  ...
}
```

**En respuesta API:**
```json
{
  "id": "6997630bd21a957ec2a51ffd",
  "title": "Casa del Bosque",
  ...
}
```

El campo `_id` **NO se envía** al frontend para que coincida con tu interfaz TypeScript.

---

## 📝 Ejemplo Completo de Respuesta

```json
{
  "ok": true,
  "message": "Proyecto creado correctamente.",
  "data": {
    "id": "6997630bd21a957ec2a51ffd",
    "title": "Casa del Bosque",
    "description": "Proyecto residencial en armonía con naturaleza",
    "category": "Residencial",
    "location": "Culiacán, Sinaloa",
    "year": "2023-2024",
    "tags": ["Minimalista", "Madera", "Sustentable"],
    "images": [
      {
        "url": "https://res.cloudinary.com/demo/render1.jpg",
        "type": "render",
        "caption": "Fachada Principal"
      },
      {
        "url": "https://res.cloudinary.com/demo/plan1.jpg",
        "type": "plan",
        "caption": "Planta Baja"
      }
    ],
    "featured": true,
    "order": 1,
    "createdAt": "2026-02-19T19:22:51.167Z",
    "updatedAt": "2026-02-19T19:22:51.167Z"
  }
}
```

---

## 🧪 Prueba Realizada

✅ **Proyecto creado con:**
- `year`: "2023-2024" (String con rango)
- `tags`: ["Minimalista", "Madera", "Sustentable"]
- `images`: Array de objetos con url/type/caption
- `id`: Mapeado correctamente desde _id
- Sin campo `_id` en respuesta

✅ **GET /api/v1/projects:**
- Retorna array con `id` (no `_id`)
- Estructura de images preservada
- Tags y year con formato correcto

---

## 🎯 Consideraciones Frontend

1. **Al subir imágenes:** Usa POST /upload primero, guarda la URL retornada
2. **Campo year:** Acepta string, puedes usar input de texto simple
3. **Campo tags:** Array de strings, puedes usar chips/tags input
4. **Campo images:** Array complejo, necesitas componente que maneje url + type + caption
5. **type de imagen:** Usa select/dropdown con valores: render, plan, detail, sketch
6. **ID:** El backend siempre retorna `id` (string), nunca `_id`

---

## 📌 Archivos Actualizados

- ✅ `src/models/Project.js` - Schema con images como array de objetos
- ✅ `src/utils/crudFactory.js` - Mapeo automático _id → id
- ✅ `src/controllers/profile.controller.js` - Mapeo _id → id en Profile
- ✅ `API_DOCS.md` - Documentación actualizada
- ✅ `thunder-collection.json` - Ejemplos actualizados
