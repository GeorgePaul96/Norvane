/** @type {import('next').NextConfig} */

// Content-Security-Policy
// - script-src 'unsafe-inline': required by Next.js 14 — it injects inline hydration
//   scripts. Removing it breaks the app. Nonce-based CSP requires additional
//   middleware setup; add it when wiring more complex server interactions.
// - style-src 'unsafe-inline': required by Framer Motion (inline style props).
// - font-src 'self': next/font/google downloads fonts at build time and serves
//   them locally, so no external font CDN is needed at runtime.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  // Prevent browsers from guessing MIME types (MIME sniffing attacks)
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Block rendering inside iframes (clickjacking protection)
  // Redundant with frame-ancestors in CSP but adds fallback for older browsers
  { key: "X-Frame-Options", value: "SAMEORIGIN" },

  // Don't leak the full URL as a Referer to external sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Restrict access to sensitive browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },

  // Force HTTPS for 1 year (enable once the site is on a domain with valid TLS)
  // { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },

  // Full CSP — see notes above
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
];

const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
