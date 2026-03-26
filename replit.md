# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── klassic-fitness/    # Klassic Fitness Studio landing page (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Artifacts

### `artifacts/klassic-fitness` — Klassic Fitness Studio

High-converting gym landing page with:
- Hero section with CTA buttons
- Social proof / transformations section
- Programs section (Weight Loss, Muscle Gain, Yoga, Personal Training)
- 3-day free trial offer with countdown timer
- Trainers section
- Gallery section (masonry layout)
- Lead capture form (POST to /api/leads)
- Final CTA section
- WhatsApp floating button

Frontend stack: React + Vite, Tailwind CSS, Framer Motion, React Hook Form, shadcn/ui

### `artifacts/api-server` — Express API Server

- `GET /api/healthz` — health check
- `POST /api/leads` — submit a free trial lead (name, phone, goal)

## Database Schema

### `leads` table
- `id` (serial, PK)
- `name` (text, not null)
- `phone` (text, not null)  
- `goal` (text, not null) — enum: weight_loss, muscle_gain, general_fitness, personal_coaching
- `created_at` (timestamp, default now)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references
