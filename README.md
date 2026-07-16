# Built Not Branded

This repository is split into two independent applications:

- `frontend/` — Next.js user interface (default: http://localhost:3000)
- `backend/` — Node.js/Express API (default: http://localhost:4000)

## Setup

```bash
npm install
```

Run each application in a separate terminal:

```bash
npm run dev:frontend
npm run dev:backend
```

The frontend reads `NEXT_PUBLIC_API_URL`; if it is not set, it calls `http://localhost:4000`.
