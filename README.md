# AWCHEM

A chemistry tutoring platform for A/L (Advanced Level) students, featuring Sinhala-language content, built with a Laravel API backend and a React frontend.

## Tech Stack

- **Backend:** Laravel 13 (REST API)
- **Frontend:** React + Vite + Tailwind CSS v4
- **HTTP Client:** Axios
- **Icons:** lucide-react / react-icons

## Project Structure

```
AWCHEM/
├── app/                    # Laravel backend (controllers, models, etc.)
├── routes/
│   └── api.php
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/          # AuthContext / AuthProvider
│   │   ├── pages/
│   │   │   └── admin/         # Admin dashboard pages
│   │   └── axiosClient.js
│   └── .env
└── README.md
```

> The Laravel root and the React app are kept separate — the frontend lives in its own `frontend/` subfolder.

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js & npm
- MySQL

### Backend Setup (Laravel)

```powershell
cd D:\Projects\AWCHEM
composer install
copy .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --port=8002
```

The API will be available at `http://localhost:8002/api`.

### Frontend Setup (React)

```powershell
cd D:\Projects\AWCHEM\frontend
npm install
npm run dev
```

The Vite dev server runs at `http://localhost:3000`. Note: this is **not** the app's entry point on its own — API calls are proxied/pointed to the Laravel server on port 8002.

### Environment Variables

In `frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:8002/api
```

> Vite handles `.env` files natively via `import.meta.env` — no `dotenv` package is needed.

## Features

- **Authentication** — Email verification and password reset via Laravel's built-in `Password` facade
- **Role-based access** — Separate `AdminLayout` and `StudentLayout`, driven by `user.is_admin`
- **Admin dashboards** — Full CRUD for:
  - Students
  - Classes
  - Quizzes
  - Results
- **Class enrollment system** — Confirmation modals requiring typed keywords ("enroll me" / "leave class")
- **Quiz management** — `class_quizzes` pivot table with type-conditional fields (physical vs. online quizzes)
- **Results tracking** — Unique constraint on `user_id` + `class_quiz_id`
- **Notices** — Create/edit/delete modals for announcements
- **Global notifications** — 5-second auto-dismiss notification pattern via `AuthContext`
- **Fully responsive UI** — Homepage, Navbar, Header, and Sidebar

## Key Architectural Notes

- `student_classes` is used as a table name (instead of a more "obvious" name) to avoid a MySQL reserved word conflict.
- The enrollment foreign key on `student_enrollments` is `student_class_id` (not `class_id`).
- The `users()` relationship name on the `StudentClasses` model must stay consistent across `with('users')` and `whenLoaded('users', ...)` calls.
- `GET /quizzes/all` must be declared **before** `Route::apiResource('quizzes', ...)` in `routes/api.php` — otherwise Laravel treats `"all"` as a `{quiz}` ID parameter.
- All controllers live directly under `App\Http\Controllers\` (no `Api` subfolder).
- The `User` model uses Laravel 13 attribute-based syntax (`#[Fillable]`, `#[Hidden]`).

## Frontend Conventions

- Modal dialogs are used for short forms (≲7 fields); separate pages are used for longer forms.
- `Promise.all` is used for simultaneous API calls on dashboard/detail pages.
- `localStorage` stores a `doneQuizzes` JSON array, shared between the dashboard and quizzes pages.
- Tailwind v4 is configured via `@import "tailwindcss"` and `@theme` for custom color variables — no `tailwind.config.js` is required.

### Brand Colors

| Name   | Hex       |
|--------|-----------|
| Navy   | `#292940` |
| Yellow | `#F5A446` |
| Gray   | `#E2E6EE` |

### Fonts

- Custom Sinhala font: **Tharu Digital Sansala** (`.ttf`), placed in `public/` and referenced via an absolute URL in `@font-face`.

## Known Issues / Roadmap

- The hero section on the homepage currently uses a single flattened PNG (`HeroSections.png`) rather than layered HTML/CSS. This limits responsiveness and requires re-exporting the whole image from the original design file (Canva/Figma/Photoshop) for any text or layout tweak.
  - **Planned improvement:** replace the flattened PNG with layered HTML/CSS components for better responsiveness and easier editing.

## License

_Add license information here._
