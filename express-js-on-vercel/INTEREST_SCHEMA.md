# Interest Data Structure

## Schema Overview

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String | Yes | Unique identifier. MongoDB generates `_id`, mapped to `id` in responses. |
| `name` | String | Yes | Interest name (e.g. "Fotografia", "Viajes"). |
| `icon` | String | Yes | Emoji stored as plain text (UTF-8), e.g. "📷", "✈️". |
| `createdAt` | Date | Auto | Creation timestamp (Mongoose). |
| `updatedAt` | Date | Auto | Update timestamp (Mongoose). |

---

## Notes

- `icon` accepts any string, but the frontend expects an emoji.

---

## CRUD Endpoints

### 1. GET /api/v1/interests (Public)
Returns all interests.

**Response (200):**
```json
{
  "ok": true,
  "count": 2,
  "data": [
    {
      "id": "507f1f77bcf86cd799439051",
      "name": "Fotografia",
      "icon": "📷",
      "createdAt": "2026-02-19T20:00:00.000Z",
      "updatedAt": "2026-02-19T20:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439052",
      "name": "Viajes",
      "icon": "✈️",
      "createdAt": "2026-02-19T19:50:00.000Z",
      "updatedAt": "2026-02-19T19:50:00.000Z"
    }
  ]
}
```

---

### 2. POST /api/v1/interests (Private)
Creates an interest.

**Request Body:**
```json
{
  "name": "Paisajismo",
  "icon": "🌿"
}
```

**Required fields:** `name`, `icon`

---

### 3. PUT /api/v1/interests/:id (Private)
Updates an interest.

**Request Body (partial or full):**
```json
{
  "icon": "🌱"
}
```

---

### 4. DELETE /api/v1/interests/:id (Private)
Deletes an interest.

---

## ID Mapping

**MongoDB:**
```json
{
  "_id": "507f1f77bcf86cd799439051",
  "name": "Fotografia",
  "icon": "📷"
}
```

**API Response:**
```json
{
  "id": "507f1f77bcf86cd799439051",
  "name": "Fotografia",
  "icon": "📷"
}
```

`_id` is not sent to the frontend.
