import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

// ── Input constraints ─────────────────────────────────────────────────────────
const MAX_LENGTHS = {
  name: 100,
  company: 100,
  role: 80,
  challenge: 100,
  message: 5000,
};

const ALLOWED_ROLES = new Set([
  "Operations Manager",
  "Founder / Director",
  "COO / General Manager",
  "Logistics Coordinator",
  "Head of Planning",
  "Other",
  "",
]);

const ALLOWED_CHALLENGES = new Set([
  "Coordination & visibility gaps",
  "Reporting and dashboards",
  "Manual processes & data entry",
  "Process documentation",
  "Workflow automation",
  "Other",
  "",
]);

// ── Rate limiter ──────────────────────────────────────────────────────────────
// In-memory store keyed by IP. Resets on server restart.
// For Vercel serverless, each cold start creates a new store — this still
// limits bursts within a single instance. For persistent cross-instance limits,
// swap this for Upstash Redis or Vercel KV.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 submissions per IP per hour

const ipStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

// Periodically prune expired entries to prevent unbounded memory growth.
// Runs at most once every 10 minutes to avoid overhead on hot paths.
let lastPruneAt = 0;
function maybePruneStore() {
  const now = Date.now();
  if (now - lastPruneAt < 10 * 60 * 1000) return;
  lastPruneAt = now;
  Array.from(ipStore.entries()).forEach(([ip, entry]) => {
    if (now > entry.resetAt) ipStore.delete(ip);
  });
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // ── Rate limit ────────────────────────────────────────────────────────────
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const ip =
      forwarded?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "unknown";

    maybePruneStore();

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ── Parse body ────────────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const {
      name,
      company,
      role = "",
      challenge = "",
      message,
      // honeypot field — bots fill this, humans never see it
      website = "",
    } = body as Record<string, unknown>;

    // ── Honeypot check (silently succeed to avoid revealing the trap) ─────────
    if (typeof website === "string" && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    // ── Type checks ───────────────────────────────────────────────────────────
    if (
      typeof name !== "string" ||
      typeof company !== "string" ||
      typeof role !== "string" ||
      typeof challenge !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json({ error: "Invalid field types." }, { status: 400 });
    }

    // ── Required field presence ───────────────────────────────────────────────
    if (!name.trim() || !company.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Name, company, and message are required." },
        { status: 400 }
      );
    }

    // ── Length limits ─────────────────────────────────────────────────────────
    if (name.length > MAX_LENGTHS.name) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (company.length > MAX_LENGTHS.company) {
      return NextResponse.json({ error: "Company name is too long." }, { status: 400 });
    }
    if (message.length > MAX_LENGTHS.message) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    // ── Allowlist validation for enum fields ──────────────────────────────────
    if (!ALLOWED_ROLES.has(role)) {
      return NextResponse.json({ error: "Invalid role selection." }, { status: 400 });
    }
    if (!ALLOWED_CHALLENGES.has(challenge)) {
      return NextResponse.json({ error: "Invalid challenge selection." }, { status: 400 });
    }

    // ── Safe trimmed values ───────────────────────────────────────────────────
    const submission = {
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      challenge: challenge.trim(),
      message: message.trim(),
    };

    // ── Email delivery ────────────────────────────────────────────────────────
    // To enable, follow these steps:
    //
    // 1. npm install resend
    // 2. Add RESEND_API_KEY=re_xxx to .env.local
    // 3. Uncomment the block below:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@norvane.com",
    //   to: "hello@norvane.com",
    //   subject: `New inquiry from ${submission.name} at ${submission.company}`,
    //   text: [
    //     `Name: ${submission.name}`,
    //     `Company: ${submission.company}`,
    //     `Role: ${submission.role || "Not specified"}`,
    //     `Challenge: ${submission.challenge || "Not specified"}`,
    //     ``,
    //     `Message:`,
    //     submission.message,
    //   ].join("\n"),
    // });

    console.log("Contact form submission:", submission);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}
