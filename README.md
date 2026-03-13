# Intellect Choice

Monorepo: React frontend + Node.js backend for the Intellect Choice site (contact form, job applications with CV upload, admin panel, email notifications).

## Structure

```
intellect-choice/
├── frontend/   # React (Vite) app – contact, careers, job application, admin UI
├── backend/    # Express API – MySQL, contact/applications, CV upload, email, admin auth
└── README.md   # this file
```

## Quick start

### Backend

```bash
cd backend
cp .env.example .env   # edit with your MySQL, SMTP, admin credentials
npm install
npm run dev
```

Runs on `http://localhost:5000` by default. Tables are created on first run.

### Frontend

```bash
cd frontend
echo 'VITE_API_BASE=http://localhost:5000/api' >> .env   # or set in .env
npm install
npm run dev
```

Runs on `http://localhost:5173` and uses the backend at `VITE_API_BASE`.

## Deploy

- **Backend:** Deploy the `backend/` app (Node.js, MySQL, env vars). See `backend/README.md`.
- **Frontend:** Build with `VITE_API_BASE=https://your-api-url/api npm run build` (or `npm run build:deploy` if API is on same origin at `/api`), then serve the `frontend/dist/` output.

See `frontend/DEPLOY.md` for shared-hosting notes.
# intellect-choice
