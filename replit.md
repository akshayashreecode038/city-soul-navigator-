# Wayfinder — Human Navigation System

A city navigation demo with live maps, place search, driving directions, saved places, memories, and community content.

## Run & Operate

- Install the imported dependencies with `pnpm install --frozen-lockfile`.
- Express is updated to 5.3.x so installation uses an available `proxy-addr` dependency instead of the firewall-blocked imported version.
- Start the managed workflow `artifacts/wayfinder: web` for the app at `/`.
- Start `artifacts/api-server: API Server` for the API at `/api`; `/api/healthz` returns `{"status":"ok"}`.
- Start `artifacts/mockup-sandbox: Component Preview Server` only when using the existing design canvas.
- Managed workflows provide `PORT` and `BASE_PATH`; run the app through those workflows rather than a root-level dev command.
- `pnpm run typecheck` — full typecheck across all packages
- Web builds require the workflow's `PORT` and `BASE_PATH` environment configuration.
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- No additional secrets or database are required for the current demo. `DATABASE_URL` is required only if the existing database library is used; the current API exposes only health checks.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- Maps: Leaflet, OpenStreetMap tiles, Nominatim place search, OSRM driving routes
- Demo persistence: browser localStorage; PostgreSQL + Drizzle ORM library is present but unused by current app routes
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: Vite for the frontend; esbuild (ESM bundle) for the API

## Where things live

- `artifacts/wayfinder/` — React web app; `src/App.tsx` owns demo state and screens.
- `artifacts/wayfinder/src/lib/live-navigation.ts` — location, place search, and routing.
- `artifacts/api-server/` — Express API and health endpoint.
- `artifacts/mockup-sandbox/` — existing component preview canvas.
- `lib/` — shared API contracts, generated clients, and database library.

## Architecture decisions

- Imported structure and stack are preserved; setup does not introduce a database or change demo behavior.

## Product

- London and Chennai demo city layers, saved places, memories, community, and a demo profile.
- Live maps and driving directions depend on public external services and internet access.
- Browser location is optional; users can choose a starting point instead.

## User preferences

- Keep imported-project setup changes minimal.

## Gotchas

- Demo account data stays in the current browser, not in a shared user account.
- Public map/search/routing services may rate-limit requests or become unavailable.
- Do not provision PostgreSQL merely because the unused database library is present.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
