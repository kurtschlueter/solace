## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
npm i
```

### 2. Start the PostgreSQL database

The project uses Docker Compose to run PostgreSQL. This will automatically create the `solaceassignment` database.

```bash
docker compose up -d
```

### 3. Push the database schema

```bash
npx drizzle-kit push
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Seed the database

With the dev server running, seed the database with sample data:

```bash
curl -X POST http://localhost:3000/api/seed
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Database Configuration

The database connection URL is configured in `.env`:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/solaceassignment
```

This matches the credentials in `docker-compose.yml`.
