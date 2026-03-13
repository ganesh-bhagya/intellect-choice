# Deploying the frontend

The **backend** lives in `../backend` and is deployed separately (see `../backend/README.md`). This doc covers deploying the **frontend** and, optionally, running both on the same Node host.

---

## Option A: Frontend and backend on different hosts (recommended when backend is separate)

### 1. Build the frontend

From the **frontend** folder:

```bash
cd frontend
npm install
VITE_API_BASE=https://your-api-domain.com/api npm run build
```

Replace `https://your-api-domain.com/api` with your real backend API base URL.

### 2. Upload the built site

Upload the contents of `frontend/dist/` to your static hosting or shared hosting document root (e.g. `public_html`).

### 3. Backend

Deploy and run the backend from the `backend/` folder. See `backend/README.md` and set `CORS_ORIGIN` to your frontend URL (e.g. `https://yourdomain.com`).

---

## Option B: Frontend + backend on Node.js shared hosting (single app)

If your host runs one Node app and you want to serve both API and the React app from it:

1. Deploy the **backend** project to the server (see `backend/README.md`).
2. From the **frontend** folder, build with API on same origin:

   ```bash
   npm run build:deploy
   ```

   This sets `VITE_API_BASE=/api`.

3. Copy the contents of `frontend/dist/` into the backend’s static serving folder (you’d need to add static serving of `dist` in the backend, or use the host’s reverse proxy to serve `dist` and proxy `/api` to Node).

For a host that only runs one app, you can instead add static serving of the built frontend inside the backend (e.g. serve `frontend/dist` from the backend app) and deploy the backend as the single project; see `backend/README.md` if you add that.

---

## Summary

| Setup          | Action                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Separate hosts | Build frontend with `VITE_API_BASE=https://your-api-url/api`, upload `frontend/dist/`, deploy backend separately with correct `CORS_ORIGIN`. |
| Same host      | Build with `npm run build:deploy`, then either serve `dist` via backend or via reverse proxy; deploy backend from `backend/`.                |
