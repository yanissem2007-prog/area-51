# AREA 51 Classified Archive

A cinematic React documentary-style website with route transitions, parallax effects, and mock auth roles.

## Run

```bash
npm install
npm run dev
```

## Deploy To Vercel

```bash
npm install
npm run build
```

Vercel should use the default Vite output directory: `dist`.
Client-side routes are handled by `vercel.json`.

## Demo Auth

- `USER` button in the header logs in as user.
- `ADMIN` button logs in as admin.
- Hidden routes:
  - `/saved` (user or admin)
  - `/admin-dashboard` (admin only)
