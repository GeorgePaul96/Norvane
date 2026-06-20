# Norvane — Developer Guide

Practical reference for working on this project. Read PROJECT_MAP.md first if you
haven't oriented yourself to the file structure.

---

## Running the Project

```bash
# Install dependencies (first time only)
npm install

# Start local dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build

# Serve the production build locally
npm run start

# Lint
npm run lint
```

No environment variables are required to run the dev server. The contact form will work
(accepts submissions) but won't send email until Resend is configured.

---

## Environment Variables

| Variable | Required for | Where |
|----------|-------------|-------|
| `RESEND_API_KEY` | Email delivery from contact form | `.env.local` |

Create `.env.local` in the project root (gitignored):
```
RESEND_API_KEY=re_your_key_here
```

---

## Wiring the Contact Form Email

The form at `#contact` POSTs to `/api/contact`. The handler validates and logs but doesn't
send email yet. Three steps to enable:

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=re_xxx
```

In `app/api/contact/route.ts`, uncomment the Resend block (lines 17–36). Update:
- `from:` to a verified Resend domain (e.g. `contact@norvane.com`)
- `to:` to George's email

---

## How to Edit Copy

All website text is hardcoded inside the section components. There is no CMS.

| What you want to change | Where |
|------------------------|-------|
| Main headline ("Operational clarity...") | `components/sections/Hero.tsx` |
| Sub-headline / supporting copy | `components/sections/Hero.tsx` |
| Problem framing paragraph | `components/sections/Problem.tsx` |
| Services tab content | `components/sections/Services.tsx` — find the `services` data array |
| Case study titles + outcomes | `components/sections/CaseStudies.tsx` — find the `cases` data array |
| Process phases | `components/sections/Methodology.tsx` — find the `phases` data array |
| What's included in diagnostic | `components/sections/DiagnosticProgram.tsx` |
| Pain-point questions in tool | `components/sections/DiagnosticTool.tsx` — find the `painPoints` data array |
| Form field labels | `components/sections/FinalCTA.tsx` |
| Footer links + copyright | `components/Footer.tsx` |
| Nav links | `components/Navigation.tsx` — `navLinks` array at top of file |
| Page title + meta description | `app/layout.tsx` — `metadata` export |

---

## How to Add a New Section

1. Create `components/sections/YourSection.tsx`
2. If it needs interactivity (state, hooks): add `"use client";` at top
3. Use `cn()` from `@/lib/utils` for class names
4. Use `.section-padding` for horizontal padding (matches all other sections)
5. Import and add to `app/page.tsx` at the correct position
6. If it needs a nav link: add to `navLinks` in `Navigation.tsx` with a matching `id` on the section element

```tsx
// components/sections/YourSection.tsx
"use client"; // only if needed

import { cn } from "@/lib/utils";

export default function YourSection() {
  return (
    <section id="your-anchor" className="section-padding py-24 md:py-32">
      {/* content */}
    </section>
  );
}
```

---

## How to Use Design Tokens

All colors are Tailwind custom tokens defined in `tailwind.config.ts`.

**Page backgrounds:**
```tsx
className="dark:bg-surface-900 bg-surface-50"  // main page background
className="dark:bg-surface-800 bg-surface-100"  // card / elevated surface
```

**Text:**
```tsx
className="dark:text-ink-100 text-ink-900"      // primary text
className="dark:text-ink-300 text-ink-400"       // muted / secondary text
```

**Brand accent:**
```tsx
className="text-steel-400"                        // accent highlight
className="bg-steel-700/20"                       // subtle accent background
```

**Always use the `dark:` variant first convention:**
```tsx
// ✓ dark: variant first
className="dark:text-ink-100 text-ink-900"
// ✗ light first (works but inconsistent with codebase)
className="text-ink-900 dark:text-ink-100"
```

---

## How to Add an Animation

Framer Motion is already installed. Import and use:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
>
  {/* content */}
</motion.div>
```

The easing `[0.21, 0.47, 0.32, 0.98]` is the custom smooth curve used throughout the project.
Use it for entrance animations to stay consistent.

For scroll-triggered animations, use `whileInView` with `viewport={{ once: true }}`:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
```

---

## How to Add an Icon

`lucide-react` is installed. Browse icons at lucide.dev and import by name:

```tsx
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

<CheckCircle size={16} className="text-steel-400" />
```

---

## TypeScript Path Aliases

`@/` maps to the project root. Use it for all internal imports:

```tsx
import { cn } from "@/lib/utils";          // ✓
import Navigation from "@/components/Navigation";  // ✓
import { cn } from "../../lib/utils";       // ✗ don't use relative paths
```

---

## Common Patterns in This Codebase

### Data arrays for content

Most sections define their content as a typed data array at the top of the file:

```tsx
const phases = [
  { id: 1, title: "Discovery", description: "..." },
  // ...
];

// Then in JSX:
{phases.map((phase) => (
  <div key={phase.id}>{phase.title}</div>
))}
```

When editing content, find and edit the data array — don't search through JSX.

### Section structure

Every section follows this rough shell:

```tsx
<section id="anchor-id" className="section-padding py-24 md:py-32 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    {/* optional: section label */}
    <span className="text-2xs font-semibold tracking-widest-2 uppercase dark:text-ink-400 text-ink-300">
      Label
    </span>
    {/* heading */}
    <h2 className="text-3xl md:text-4xl font-bold dark:text-ink-100 text-ink-900">
      Heading
    </h2>
    {/* content */}
  </div>
</section>
```

### Client component guard for theme

Any component that renders different UI based on theme must use a `mounted` guard:

```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
const { theme } = useTheme();

// Only render theme-dependent UI after mount:
{mounted && <ThemeDependentContent />}
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Wire contact form email (Resend — see above)
- [ ] Add `RESEND_API_KEY` to hosting environment variables
- [ ] Verify meta description in `app/layout.tsx` is accurate
- [ ] Verify CTA buttons scroll to correct section IDs
- [ ] Test contact form submission end-to-end
- [ ] Test dark/light toggle
- [ ] Test mobile navigation
- [ ] Run `npm run build` locally — confirm zero build errors

---

## What Not to Build (Current Phase)

The business has no paying clients yet. These are explicitly out of scope:

- CMS or admin panel
- Blog or content section
- Authentication / login
- Client dashboard or portal
- Database of any kind
- Analytics beyond what the hosting platform provides
- Multi-page routing (additional routes beyond `/`)
- Pricing page (pricing is inline in DiagnosticProgram.tsx)
- Email newsletter signup
- Social login

Focus: contact form working, copy improvements, conversion optimization.
