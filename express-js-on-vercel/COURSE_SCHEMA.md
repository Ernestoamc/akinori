# Course Data Structure

## Schema Overview

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Yes | Unique identifier. MongoDB generates `_id`, mapped to `id` in responses. |
| `name` | String | Yes | Course or certification name (e.g. "Modelado BIM & Revit"). |
| `institution` | String | Yes | Who issued it (e.g. "Coursera", "Autodesk", "Autodidacta"). |
| `year` | String | Yes | Year or range (e.g. "2023", "2022 - 2023"). String for flexible text. |
| `order` | Number | No | Display order (default: 0). Lower means earlier. |
| `createdAt` | Date | Auto | Creation timestamp (Mongoose). |
| `updatedAt` | Date | Auto | Update timestamp (Mongoose). |

---

## Year Field

`year` is a **String** to allow flexible formats:
- "2023"
- "2022 - 2023"
- "2025"

---

## CRUD Endpoints

### 1. GET /api/v1/courses (Public)
Returns all courses.

**Response (200):**
```json
{
  "ok": true,
  "count": 1,
  "data": [
    {
      "id": "507f1f77bcf86cd799439031",
      "name": "Modelado BIM & Revit",
      "institution": "Autodesk",
      "year": "2023",
      "order": 1,
      "createdAt": "2026-02-19T20:00:00.000Z",
      "updatedAt": "2026-02-19T20:00:00.000Z"
    }
  ]
}
```

---

### 2. POST /api/v1/courses (Private)
Creates a new course.

**Request Body:**
```json
{
  "name": "Fotografia Arquitectonica",
  "institution": "Domestika",
  "year": "2024",
  "order": 1
}
```

**Required fields:** `name`, `institution`, `year`

---

### 3. PUT /api/v1/courses/:id (Private)
Updates a course.

**Request Body (partial or full):**
```json
{
  "year": "2024 - 2025"
}
```

---

### 4. DELETE /api/v1/courses/:id (Private)
Deletes a course.

---

## ID Mapping

**MongoDB:**
```json
{
  "_id": "507f1f77bcf86cd799439031",
  "name": "Modelado BIM & Revit",
  "institution": "Autodesk",
  "year": "2023"
}
```

**API Response:**
```json
{
  "id": "507f1f77bcf86cd799439031",
  "name": "Modelado BIM & Revit",
  "institution": "Autodesk",
  "year": "2023"
}
```

`_id` is not sent to the frontend.
