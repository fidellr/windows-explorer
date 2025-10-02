# Win Explorer

A Windows Explorer–like web application built with **Vue 3 (Composition API)** and **Elysia (Bun + TypeScript)** using **PostgreSQL** as the database.

---

## 🚀 Prerequisites

- [Bun](https://bun.sh) installed → `bun -v`
- [PostgreSQL](https://www.postgresql.org/) installed → `psql --version`
- Optional: Node.js + npm (if you want to run UI via npm)

---

## ⚙️ Step 1 — Database Setup

Update DB connection variables in `run.sh` if needed (default user: `postgres`, db: `win_explorer`).

```bash
# make script executable
chmod +x run.sh

# run schema.sql + seed.sql
./run.sh
```

This will:

- Create the database `win_explorer_db` (if not exists).
- Apply schema from `explorer-backend/sql/schema.sql`.
- Insert sample data from `explorer-backend/sql/seed.sql`.

---

## 🖥 Step 2 — Run Backend

Set your DB configuration inside `run.sh` file:

```bash
DB_NAME="win_explorer_db"
DB_USER="postgres"   # change if needed
DB_PASS="postgres"   # change if needed
DB_HOST="localhost"
DB_PORT="5432"
SQL_DIR="explorer-backend/sql"
```

Install dependencies and run:

```bash
cd explorer-backend
bun install
bun src/presentation/server.ts   # or `bun run dev` if defined in package.json
```

- Backend will listen on `http://localhost:3000`.
- Backend API Documentation will listen on `http://localhost:3000/api/openapi`

---

## 🌐 Step 3 — Run Frontend

```bash
cd explorer-ui
bun install
bun run dev
```

Frontend will be available at `http://localhost:5173`.

---

## 🔍 Step 4 — Test API

**List folders**

```bash
curl http://localhost:3000/api/folders
```

**Create a new file**

```bash
curl -X POST http://localhost:3000/api/files \
  -H "Content-Type: application/json" \
  -d '{"folderId":3,"name":"notes.txt","sizeBytes":2048}'
```

**List files in folder**

```bash
curl http://localhost:3000/api/files/1
```

---

## 🛠 Troubleshooting

- `psql: command not found` → Install PostgreSQL client.
- `connection refused` → Ensure PostgreSQL is running.
- `NOT FOUND` on file creation → Check that the folderId exists in `folders` table.
- CORS error → Ensure backend enables CORS (`@elysiajs/cors`).
- Frontend can’t reach backend → Confirm backend is running at `http://localhost:3000`.

---

## ✅ Summary

1. Run `./run.sh` to create DB + seed data.
2. Start backend (`explorer-backend`).
3. Start frontend (`explorer-ui`).
4. Open `http://localhost:5173` in browser.
