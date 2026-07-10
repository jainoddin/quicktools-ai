# QuickTools.ai - Security Rules

## API Security
- **Rate Limiting:** Implement Upstash Redis rate limiting on all `/api/tools/*` endpoints (e.g., 5 requests per minute for free users) to prevent API bankruptcy.
- **Authentication:** Verify user session on all protected routes (e.g., `app/dashboard/*`).
- **Validation:** Use **Zod** to strictly parse and validate all incoming request bodies. Never trust client data.

## AI Security (Prompt Injection)
- Never expose the system prompt in the client-side code.
- Always sanitize user inputs before sending them to the AI models.
- Set strict `max_tokens` limits to prevent abusive long generations.

## Headers & CSP
- Implement security headers in `next.config.js`:
  - `X-DNS-Prefetch-Control`
  - `Strict-Transport-Security`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - Content Security Policy (CSP) allowing only specific domains (like Supabase, Google Analytics).

## Database
- Use Row Level Security (RLS) if using Supabase directly from client.
- Always use parameterized queries (Prisma/Drizzle does this automatically) to prevent SQL Injection.
