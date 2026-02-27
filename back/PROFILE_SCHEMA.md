# Profile Data Structure

## Schema Overview

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Full name. |
| `title` | String | Yes | Professional title (e.g. "Arquitecto & Disenador"). |
| `logoName` | String | Yes | Navbar logo text (e.g. "ARQUINORI"). |
| `heroSubtitle` | String | No | Small text above the hero title (e.g. "Portafolio 2025"). |
| `heroTitlePrimary` | String | Yes | First line of the hero title (e.g. "ERNESTO"). |
| `heroTitleSecondary` | String | Yes | Second line of the hero title (e.g. "AKINORI"). |
| `about` | String | Yes | About/bio text. |
| `phone` | String | No | Contact phone. |
| `email` | String | Yes | Contact email. |
| `address` | String | No | Location (e.g. "Culiacan, Sinaloa"). |
| `portraitUrl` | String | No | Hero portrait URL. |
| `formalUrl` | String | No | Small circular portrait URL. |
| `socials` | Object | No | Social links: `{ linkedin, instagram, behance }`. |

---

## Singleton Behavior

- There is only one profile document.
- `GET /api/v1/profile` returns the existing profile; if none exists, it is created with defaults.
- `PUT /api/v1/profile` updates or creates the single profile (upsert).

---

## Endpoints

### 1. GET /api/v1/profile (Public)
Returns the singleton profile.

**Response (200):**
```json
{
  "ok": true,
  "data": {
    "id": "507f1f77bcf86cd799439001",
    "name": "Ernesto Akinori",
    "title": "Arquitecto & Disenador",
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

---

### 2. PUT /api/v1/profile (Private)
Updates or creates the singleton profile.

**Request Body:**
```json
{
  "name": "Ernesto Akinori",
  "title": "Arquitecto & Disenador",
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
