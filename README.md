# ChessConnect

ChessConnect is a social chess platform built with Next.js, React, Prisma, and PostgreSQL. It combines profile pages, a social feed, user follow relationships, search, and curated chess news in one application.

## Highlights

- Cookie-based authentication
- Public user profiles
- Follow and unfollow relationships
- Blog feed with comments and likes
- Post creation and editing with image uploads
- Search across users and posts
- Curated chess news pages

## Stack

- Next.js 16
- React 19
- TypeScript
- Prisma 7
- PostgreSQL
- Tailwind CSS 4

## Project Structure

```text
src/
  app/                 Routes and route handlers
  components/          Reusable UI
  lib/                 Domain and infrastructure logic
  generated/prisma/    Prisma client output
docs/                  Project documentation
```

## Documentation

- [Project overview](./docs/project-overview.md)
- [Architecture](./docs/architecture.md)
- [Key files](./docs/key-files.md)
- [Features](./docs/features.md)
- [Known issues](./docs/known-issues.md)
- [Next tasks](./docs/next-tasks.md)
- [User flows](./docs/user-flows.md)

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create `.env.local` and provide the required values:

```bash
DATABASE_URL=postgresql://...
AUTH_SECRET=your-secret
GNEWS_API_KEY=your-key
# Optional: override default avatar storage (defaults to /tmp/uploads/avatars for serverless)
AVATAR_STORAGE_DIR=/tmp/uploads/avatars
```

## 3. Prepare the database

For a fresh local reset:

```bash
npm run db:reset
```

For an existing shared or production-like database:

```bash
npm run db:migrate
```

## 4. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` starts the development server
- `npm run build` creates a production build
- `npm run start` starts the production server
- `npm run lint` runs ESLint
- `npm run db:migrate` applies Prisma migrations
- `npm run db:migrate:dev` creates and applies a development migration
- `npm run db:push` pushes schema changes without a migration
- `npm run db:reset` resets the database and regenerates Prisma

## Core Concepts

### Authentication

Auth is cookie-based. Session lookup is centralized in `src/lib/auth/getCurrentUser.ts`.

### Posts

Users can create posts with up to three images, edit existing posts, comment, and react.

### Profiles

Each user has a public profile with avatar, profile fields, posts, and social graph data.

### Search

Search returns both user matches and post matches.

## Media Uploads

- Avatars and post images are stored locally under `public/uploads`
- Upload validation happens in Node.js route handlers
- This approach is simple for development but should be replaced with object storage for larger deployments

## Quality Notes

- The project uses ESLint for static checks
- The codebase is currently more lint-driven than test-driven
- A fuller automated test suite is a recommended next step

## Roadmap Ideas

- Live search suggestions in the header
- Better image management for posts
- Stronger UI consistency pass
- Cloud media storage
- Automated testing
