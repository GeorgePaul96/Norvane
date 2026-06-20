# Norvane — Architecture Reference

## Overview

Single-page marketing website for an operations consulting business. One public route (`/`),
one API route (`/api/contact`). No database, no auth, no state management beyond React local state.

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · next-themes

---

## Application Shell

```
HTML root (app/layout.tsx)
  └── ThemeProvider (next-themes, default: dark, class-based)
        └── page.tsx (single route)
              ├── Navigation          — fixed header
              ├── Hero
              ├── Problem
              ├── Dashboard
              ├── Philosophy
              ├── Services
              ├── CaseStudies
              ├── Methodology
              ├── DiagnosticTool
              ├── DiagnosticProgram
              ├── FinalCTA            — contact form
              └── Footer
```

All section components are **server components** by default (no `"use client"` directive)
except Navigation (scroll + theme state) and any component using Framer Motion hooks.

---

## Routing

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Server component |
| `POST /api/contact` | `app/api/contact/route.ts` | Route Handler |

No dynamic routes. No middleware. No redirects configured.

---

## Theme System

- **Provider:** `next-themes` wrapping the entire app in `app/layout.tsx`
- **Strategy:** CSS class on `<html>` — `class="dark"` or `class=""`
- **Default:** dark
- **Toggle:** `Navigation.tsx` calls `setTheme()` from `useTheme()`
- **SSR safety:** Components using `useTheme()` must check `mounted` state before rendering
  theme-dependent UI (see `Navigation.tsx` `mounted` guard)

Pattern in components:
```tsx
// ✓ Correct dark-mode pattern
className="dark:text-ink-100 text-ink-900"

// ✗ Wrong — never use JS conditionals for static theme classes
className={isDark ? "text-ink-100" : "text-ink-900"}
```

---

## Design Token System

All tokens are defined in `tailwind.config.ts`. Three semantic palettes:

### Surface — backgrounds

| Token | Hex | Use |
|-------|-----|-----|
| `surface-50` | `#f4f5f8` | Light mode page background |
| `surface-100` | `#e8eaed` | Light mode card/section background |
| `surface-800` | `#1c2030` | Dark mode card background |
| `surface-850` | `#151820` | Dark mode elevated surface |
| `surface-900` | `#0f1115` | Dark mode page background |
| `surface-950` | `#0b0d10` | Deepest dark (rarely used) |

### Ink — text and borders

| Token | Hex | Use |
|-------|-----|-----|
| `ink-100` | `#e2e4ea` | Primary text on dark |
| `ink-200` | `#b8bcc8` | Secondary text on dark |
| `ink-300` | `#8890a4` | Muted text on dark / nav links |
| `ink-400` | `#5a6175` | Placeholder / disabled on dark |
| `ink-700` | `#2a2e3c` | Borders on dark |
| `ink-800` | `#1a1e28` | Dark borders |
| `ink-900` | `#111318` | Primary text on light |

### Steel — brand accent (blue)

| Token | Hex | Use |
|-------|-----|-----|
| `steel-300` | `#8dbae0` | Highlights, active states |
| `steel-400` | `#6a9ab8` | Mid accent |
| `steel-500` | `#4878a0` | Brand blue |
| `steel-600` | `#2d5c80` | Darker accent |
| `steel-700` | `#1a3d5c` | Deep accent / shadows |

### Global Utilities (app/globals.css)

| Class | Expands to |
|-------|-----------|
| `.section-padding` | `px-6 md:px-12 lg:px-20 xl:px-32` |
| `.gradient-mask-b` | `mask-image: linear-gradient(to bottom, black 70%, transparent)` |
| `.gradient-mask-r` | `mask-image: linear-gradient(to right, black 70%, transparent)` |
| `.text-balance` | `text-wrap: balance` |

### Custom Animations (tailwind.config.ts)

| Name | Duration | Use |
|------|----------|-----|
| `fade-in` | 0.9s | Section entrance |
| `slide-up` | 0.9s | Hero text entrance |
| `draw` | 2s infinite | SVG stroke animation |

---

## Component Patterns

### Client vs Server Components

| Component | Directive | Why |
|-----------|-----------|-----|
| `Navigation.tsx` | `"use client"` | `useState`, `useEffect`, `useTheme` |
| `ThemeProvider.tsx` | `"use client"` | next-themes requires client context |
| `FinalCTA.tsx` | `"use client"` | Form state, fetch, validation |
| `DiagnosticTool.tsx` | `"use client"` | Interactive state |
| `Services.tsx` | `"use client"` | Tab switcher state |
| `Dashboard.tsx` | `"use client"` | Animation state |
| All others | (server) | Static content |

### Shared Utility

`lib/utils.ts` exports one function:
```ts
cn(...inputs: ClassValue[]) → string
// Merges Tailwind classes safely using clsx + tailwind-merge
```

Use `cn()` for any conditional or merged class strings:
```tsx
className={cn("base-class", condition && "conditional-class", "override")}
```

---

## API Layer

### POST /api/contact

**File:** `app/api/contact/route.ts`

**Request body:**
```json
{
  "name": "string (required)",
  "company": "string (required)",
  "role": "string (optional)",
  "challenge": "string (optional)",
  "message": "string (required)"
}
```

**Responses:**
- `200 { success: true }` — valid submission (currently only logs to console)
- `400 { error: "Name, company, and message are required." }` — missing required fields
- `500 { error: "Failed to process request." }` — unhandled exception

**Current state:** Logs to console only. Resend integration is stubbed with instructions
in the file comments. To enable: install `resend`, add `RESEND_API_KEY` to `.env.local`,
uncomment the Resend block.

---

## Dependencies

### Runtime
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 14.2.30 | Framework |
| `react` / `react-dom` | ^18 | UI |
| `framer-motion` | ^11.3.8 | Animations |
| `next-themes` | ^0.3.0 | Dark/light theme |
| `lucide-react` | ^0.427.0 | Icons |
| `clsx` | ^2.1.1 | Class name utility |
| `tailwind-merge` | ^2.5.2 | Tailwind class deduplication |
| `class-variance-authority` | ^0.7.0 | Variant-based class generation |
| `@radix-ui/react-slot` | ^1.1.0 | Polymorphic component primitive |

### Dev
| Package | Purpose |
|---------|---------|
| `typescript` ^5 | Type checking |
| `tailwindcss` ^3.4.10 | CSS framework |
| `autoprefixer` / `postcss` | CSS processing |

---

## Logo System

`components/Logo.tsx` exports two components:

**`LogoMark`** — SVG N lettermark only. Accepts `height` (px) and `className`.
Uses `currentColor` — color is controlled entirely by Tailwind text classes on the parent.
The right post has a depth/shadow polygon at `opacity="0.45"` for the 3D effect.

**`LogoFull`** — LogoMark + wordmark "NORVANE". Accepts `height`, `className`, `markOnly`.

```tsx
// Usage
<LogoMark height={28} className="dark:text-ink-100 text-ink-900" />
<LogoFull height={32} />
<LogoFull height={32} markOnly />
```

---

## Build & Deployment

```bash
npm run dev      # Local dev server (http://localhost:3000)
npm run build    # Production build → .next/
npm run start    # Serve production build locally
npm run lint     # ESLint
```

**Build output:** `.next/` directory (120 MB of webpack cache + compiled output).
This is gitignored and claudeignored. Never read these files.

**Deployment target:** Vercel (recommended) or any Node.js host. No special config needed
beyond adding `RESEND_API_KEY` as an environment variable when email is enabled.

---

## What Does Not Exist (Do Not Assume)

- No database or ORM
- No authentication
- No CMS or content management
- No analytics integration
- No state management library (Redux, Zustand, etc.)
- No test suite
- No CI/CD pipeline configured
- No `/blog`, `/about`, `/services` routes (single-page)
- No `middleware.ts`
- No `i18n` configuration
- No `app/error.tsx` or `app/not-found.tsx` (using Next.js defaults)
