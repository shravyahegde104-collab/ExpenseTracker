# Ledger — Expense Tracker Frontend

React + TypeScript + Vite frontend for the Spring Boot Expense Tracker API.

## Stack

- **Vite** — build tool / dev server
- **React 18 + TypeScript**
- **Tailwind CSS** — styling, with a custom "ledger" design token set (see `tailwind.config.js`)
- **TanStack React Query** — server state, caching, and mutations
- **React Router** — client-side routing
- **Axios** — HTTP client
- **Recharts** — category summary chart

## Getting started

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` and proxies any request to
`/api/*` through to the backend at `http://localhost:8080` (configured in
`vite.config.ts`), so no CORS setup is required on the backend during
development.

Make sure the Spring Boot backend is running on port 8080 first
(`./mvnw spring-boot:run` from the `backend/` folder), with a valid
`src/main/resources/application-local.properties` for the MySQL connection.

## Folder structure

```
src/
├── api/          # Typed HTTP client + one function per backend endpoint
├── components/   # Reusable UI building blocks
├── pages/        # Route-level views (Dashboard, Expense List, Expense Form)
├── hooks/        # React Query hooks wrapping the api/ functions
├── types/        # Shared TypeScript types (Expense, etc.)
├── App.tsx       # Route definitions
├── main.tsx      # App entry point, providers
└── index.css     # Tailwind directives + base styles
```

## Status

- [x] Step 1 — Scaffold project, dependencies, folder structure, design tokens
- [x] Step 2 — Typed API layer + React Query hooks
- [x] Step 3 — Dashboard, Expenses list, Add/Edit forms, delete confirmation, navigation
- [x] Step 4 — Visual redesign: refreshed palette (indigo/amber/danger), icon set, category
      color-coding, chart styling, refined nav/forms/table/modal/toasts
