## Purpose

This file gives concise, actionable guidance to AI coding agents working on this repo so they can be immediately productive.

**Big Picture**
- **Framework:** Next.js (App Router) TypeScript project. Entry points live under [src/app](src/app#L1). The root layout is [src/app/layout.tsx](src/app/layout.tsx#L1-L120) which wraps the app with `FirebaseClientProvider` and `CartProvider`.
- **Data & Auth:** Firebase (client + admin packages). Initialization is managed centrally in [src/firebase/index.ts](src/firebase/index.ts#L1-L120). Important: `initializeFirebase()` attempts environment-based initialization first — do NOT change its semantics.
- **UI and pattern:** UI primitives live in [src/components/ui](src/components/ui). Feature components are grouped (e.g. `landing`, `products`, `kawaii`) under [src/components](src/components).

**Key Integration Points**
- Firebase client-side code and hooks: [src/firebase](src/firebase). Read `initializeFirebase()` and `getSdks()` for how auth/firestore are exposed.
- GenKit / AI flows: `genkit` is used for local AI workflows. See `src/ai/dev.ts` and the npm scripts `genkit:dev` / `genkit:watch` in `package.json`.
- Remote images allowed via `next.config.ts` remotePatterns (placehold.co, images.unsplash.com, picsum.photos, storage.googleapis.com).

**Developer Workflows & Commands**
- Start dev server: `npm run dev` — note this uses `next dev --turbopack -p 9002` (port 9002). See `package.json`.
- Build for production: `npm run build` then `npm run start`.
- Typecheck and lint: `npm run typecheck` and `npm run lint`.
- Run GenKit AI dev flow: `npm run genkit:dev` or `npm run genkit:watch` (runs `src/ai/dev.ts`).

**Project Conventions & Patterns**
- App Router usage: pages are in `src/app` and components assume server/client boundaries. When a component imports browser-only APIs or Firebase hooks, it is marked `'use client'` — inspect `src/firebase/*` and `src/components` for examples.
- UI primitives: prefer components in `src/components/ui` for consistent styling (e.g., `button.tsx`, `input.tsx`, `toaster.tsx`).
- Feature grouping: components are grouped by feature under `src/components/<feature>` (e.g., `landing`, `products`). Reuse shared UI primitives rather than adding duplicate styles.
- Contexts: shared app state lives in `src/context` (e.g., `cart-context.tsx`). Wrap actions that mutate context inside the providers already present in the root layout.

**Files to Inspect for Decisions or Examples**
- Root layout / providers: [src/app/layout.tsx](src/app/layout.tsx#L1-L120)
- Firebase init & exports: [src/firebase/index.ts](src/firebase/index.ts#L1-L120)
- Firebase config (dev fallback): [src/firebase/config.ts](src/firebase/config.ts#L1-L120)
- Dev AI flow: [src/ai/dev.ts](src/ai/dev.ts)
- Product detail pattern: [src/components/products/product-detail/product-info.tsx](src/components/products/product-detail/product-info.tsx)

**What AI agents should avoid changing**
- Do NOT alter the core Firebase initialization behavior in `initializeFirebase()` — it purposely prefers platform-provided envs and falls back to `firebaseConfig` in dev.
- Avoid changing global layout providers unless adding compatible providers; they control key app behavior (auth, cart, toasts, WhatsApp FAB).

**When you make changes**
- Update `package.json` scripts only if you confirm related CI or hosting expectations.
- If you add remote image sources, update `next.config.ts` remotePatterns.

If anything here is unclear or you'd like examples expanded (e.g., exact lines to modify for a new provider), tell me which area to expand and I will iterate.
