# QuickTools.ai - Backend Rules

## Architecture
- **Framework:** Next.js App Router (Server Actions & Route Handlers).
- **No External Backend:** Keep it simple for a solo developer. Everything runs within Next.js server infrastructure.
- **Database ORM:** Prisma or Drizzle ORM for fast, type-safe database queries.
- **Auth:** NextAuth.js (Auth.js) or Supabase Auth for simple and secure Google/Email login.

## API Rules
- **Server Actions:** Use Next.js Server Actions for UI data mutations (e.g., saving settings).
- **Route Handlers:** Use API routes (`app/api/...`) for webhooks (Stripe, Cron Jobs) and external AI integrations.
- **Validation:** Always validate incoming API data using **Zod**.
- **Rate Limiting:** Implement strict rate limiting (e.g., Upstash Redis) on all AI routes to prevent abuse and save API costs.

## Automation & Cron Jobs (Auto-Blogging)
- **Endpoint:** Create a secure `/api/cron/auto-blog` route.
- **Security:** Protect cron routes using a secret token (`CRON_SECRET`) so only your automated scheduler (like Vercel Cron) can trigger it, not random users.
- **Error Logging:** Log any AI API failures or database errors during the auto-blogging process so you can easily debug.

## Monetization (Future Proofing)
- Store user usage (credits/tokens) to limit the free tier.
- Ready to integrate Stripe or LemonSqueezy when transitioning to paid plans.