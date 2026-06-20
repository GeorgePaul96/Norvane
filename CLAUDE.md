# Norvane — Project Context for Claude Code

## What This Project Is

Norvane is a **single-page marketing website** for an operations consulting business targeting
agriculture, logistics, and field operations companies. It is a Next.js 14 app with no backend
beyond a contact form API route.

**Business context:** Diagnostics-led operations consultancy. Pre-revenue. Phase 1 goal is landing
first paying clients via the website and direct outreach. Revenue-first, no overbuilding.

---

## Project Structure (Read This First)

```
app/
  layout.tsx          — HTML shell, metadata, ThemeProvider wrapper
  page.tsx            — Root page: assembles 11 section components in order
  globals.css         — Global styles: section-padding utility, scrollbar, base tokens
  api/contact/
    route.ts          — POST /api/contact — validates + logs form submissions
                        (needs Resend wired to actually send email)

components/
  Navigation.tsx      — Fixed header: scroll detection, theme toggle, mobile menu
  Logo.tsx            — SVG N lettermark (LogoMark) + full logo (LogoFull)
  ThemeProvider.tsx   — Thin wrapper around next-themes
  Footer.tsx          — Site footer
  sections/
    Hero.tsx          — Above-the-fold headline + CTA (24.6 KB — largest component)
    Problem.tsx       — Problem framing section
    Dashboard.tsx     — Animated "Operations Command" mock dashboard
    Philosophy.tsx    — Positioning / philosophy section
    Services.tsx      — Tab-switcher showing three service capabilities (16.3 KB)
    CaseStudies.tsx   — Three fictional-but-realistic client scenarios
    Methodology.tsx   — 6-phase interactive timeline
    DiagnosticTool.tsx — Interactive pain-point checker (24.6 KB — largest component)
    DiagnosticProgram.tsx — The actual service offer with deliverables
    FinalCTA.tsx      — Two-column contact form (15.5 KB)

lib/
  utils.ts            — cn() utility (clsx + tailwind-merge)

tools/
  generate_playbook.py — Standalone Python script, generates business Word docs.
                         NOT part of the web project. Ignore when working on the site.

docs/
  Norvane_Operator_Playbook.docx — Business GTM document. Not application code.
```

**Section render order in page.tsx:**
Navigation → Hero → Problem → Dashboard → Philosophy → Services → CaseStudies →
Methodology → DiagnosticTool → DiagnosticProgram → FinalCTA → Footer

**Section anchor IDs:**
`#problem` `#diagnostic-tool` `#services` `#cases` `#methodology` `#diagnostic` `#contact`

---

## Design System

All colors and spacing live in `tailwind.config.ts`. Three semantic palettes:

| Palette | Purpose | Key tokens |
|---------|---------|------------|
| `surface` | Page/card backgrounds | `surface-50` (light bg), `surface-900` (dark bg) |
| `ink` | Text and borders | `ink-100` (light text on dark), `ink-900` (dark text on light) |
| `steel` | Accent / brand blue | `steel-300` through `steel-700` |

Dark mode is class-based (`darkMode: ["class"]`). The HTML element gets `class="dark"`.
Use `dark:text-ink-100 text-ink-900` pattern — dark variant first.

Global CSS utility: `.section-padding` → `px-6 md:px-12 lg:px-20 xl:px-32`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Theme | next-themes (dark/light, default: dark) |
| Icons | lucide-react |
| Utilities | clsx, tailwind-merge, class-variance-authority |
| Email (pending) | Resend — needs `RESEND_API_KEY` in `.env.local` |
| Deployment | Static Next.js export or Vercel |

No database. No auth. No state management library. No CMS.

---

## Contact Form — Wiring Email

The form at `#contact` posts to `POST /api/contact`. The handler validates and logs but does
not yet send email. To enable:

1. `npm install resend`
2. Create `.env.local` with `RESEND_API_KEY=re_xxx`
3. Uncomment the Resend block in `app/api/contact/route.ts`

---

## Common Tasks Quick Reference

| Task | Files to touch |
|------|---------------|
| Edit headline / hero copy | `components/sections/Hero.tsx` |
| Edit services content | `components/sections/Services.tsx` |
| Edit case studies | `components/sections/CaseStudies.tsx` |
| Add/remove nav links | `components/Navigation.tsx` (navLinks array) |
| Change site metadata | `app/layout.tsx` |
| Change brand colors | `tailwind.config.ts` |
| Wire contact form email | `app/api/contact/route.ts` |
| Edit methodology phases | `components/sections/Methodology.tsx` |
| Edit service offer/pricing | `components/sections/DiagnosticProgram.tsx` |

---

## What NOT to Build Right Now

The business is pre-revenue. Do not add:
- CMS integration
- Blog or content system
- Authentication
- Dashboard or client portal
- Analytics beyond basic
- Database layer
- Pricing page (the offer is described inline in DiagnosticProgram.tsx)

Focus only on: conversion, clarity, trust, contact form working, copy improvements.

---

# Business & Product Execution Principles

When working on products, websites, positioning, UX, growth, or business strategy,
prioritize business execution and real-world usability over technical sophistication.

**Prioritize:** speed of execution · clarity · conversion · usability · revenue generation ·
customer understanding · operational simplicity · shipping quickly · reducing friction ·
realistic implementation · maintainability · practical workflows · user trust

**Avoid:** overengineering · unnecessary abstractions · premature scalability · enterprise
architecture · startup buzzwords · feature bloat · rebuilding systems unnecessarily ·
creating complexity disguised as sophistication

---

## Product Philosophy

A product that is understandable, usable, credible, focused, and solving a painful problem
is more valuable than technically impressive architecture, large feature sets, or trendy UI.

**Early-stage rules — prioritize:**
1. Validating demand
2. Talking to users
3. Improving conversion
4. Reducing friction
5. Clarifying positioning
6. Generating revenue

**NOT:** perfect architecture · enterprise readiness · advanced abstractions · speculative scaling

---

## UX & Website Guidance

Prioritize clarity over cleverness · trust over visual spectacle · readability over density ·
concrete outcomes over abstract claims · fast comprehension · intuitive navigation

Avoid: generic AI language · corporate buzzwords · fake metrics · meaningless dashboards ·
excessive animations · unclear CTAs · decorative UI without functional value

---

## Decision-Making Bias

When uncertain, bias toward: simpler implementation · faster shipping · clearer messaging ·
fewer features · direct user value · easier maintenance · operational practicality

---

## Revenue-First Constraint

The business has no paying customers yet. Prioritize customer conversations, outreach,
distribution, validation, and conversion improvements over internal systems, architecture
improvements, or non-essential tooling.

---

## Founder Execution Guidance

Solo founder. Optimize for focus, reduce overwhelm, encourage shipping, encourage customer
interaction. Watch for: perfectionism · endless redesign cycles · productive procrastination ·
hiding behind architecture work.

Goal: traction · clarity · revenue · proof · simplicity.

---

# gstack Skill Routing

When tasks match a skill, invoke it via the Skill tool.

| Workflow | Use when |
|----------|---------|
| `/office-hours` `/plan-ceo-review` | Product strategy, positioning, offer refinement |
| `/design-review` `/plan-design-review` | Landing page reviews, UX analysis, visual polish |
| `/qa` `/qa-only` | Browser testing, responsiveness, interaction testing |
| `/review` `/plan-eng-review` | Code review, architecture critique |
| `/ship` `/land-and-deploy` | Deployment, PR creation, release checks |
| `/browse` `/investigate` | Browser-assisted research, competitive analysis |

Do NOT invoke workflows unnecessarily. Prioritize simplicity, execution speed, practical outcomes.

---

# WAT Framework (General)

When working on agent/automation projects (not this website), follow the WAT pattern:

- **Workflows** (`workflows/`) — Markdown SOPs defining objectives, inputs, tools, outputs
- **Agents** — You. Read the workflow, run tools in sequence, handle failures, ask when unclear
- **Tools** (`tools/`) — Python scripts for deterministic execution (API calls, data transforms)

Credentials in `.env`. Deliverables to cloud (Sheets, Slides). `.tmp/` is disposable.

This applies to agent/research projects. The Norvane website does not use this pattern.
