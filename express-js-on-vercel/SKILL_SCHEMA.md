# Skill Data Structure

## Schema Overview

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Yes | Unique identifier. MongoDB generates `_id`, mapped to `id` in responses. |
| `name` | String | Yes | Skill name (e.g. "AutoCAD", "Leadership"). |
| `level` | Number | Yes | Integer from 0 to 100. |
| `createdAt` | Date | Auto | Creation timestamp (Mongoose). |
| `updatedAt` | Date | Auto | Update timestamp (Mongoose). |

---

## Validation

- `level` must be an integer between 0 and 100.
- `name` and `level` are required on create.

---

## Ordering

GET endpoints return skills ordered by `level` descending (highest first).

---

## CRUD Endpoints

### 1. GET /api/v1/skills (Public)
Returns all skills.

**Response (200):**
```json
{
  "ok": true,
  "count": 2,
  "data": [
    {
      "id": "507f1f77bcf86cd799439041",
      "name": "Revit Architecture",
      "level": 95,
      "createdAt": "2026-02-19T20:00:00.000Z",
      "updatedAt": "2026-02-19T20:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439042",
      "name": "AutoCAD",
      "level": 85,
      "createdAt": "2026-02-19T19:50:00.000Z",
      "updatedAt": "2026-02-19T19:50:00.000Z"
    }
  ]
}
```

---

### 2. POST /api/v1/skills (Private)
Creates a skill.

**Request Body:**
```json
{
  "name": "Revit Architecture",
  "level": 95
}
```

**Required fields:** `name`, `level`

---

### 3. PUT /api/v1/skills/:id (Private)
Updates a skill.

**Request Body (partial or full):**
```json
{
  "level": 90
}
```

---

### 4. DELETE /api/v1/skills/:id (Private)
Deletes a skill.

---

## ID Mapping

**MongoDB:**
```json
{
  "_id": "507f1f77bcf86cd799439041",
  "name": "Revit Architecture",
  "level": 95
}
```

**API Response:**
```json
{
  "id": "507f1f77bcf86cd799439041",
  "name": "Revit Architecture",
  "level": 95
}
```

`_id` is not sent to the frontend.
