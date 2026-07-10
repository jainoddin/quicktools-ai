# QuickTools.ai - Deployment Strategy

## Hosting Platform: Vercel
- **Why:** Best integration with Next.js App Router, Edge caching, and serverless functions.

## Database: Supabase / PostgreSQL
- **Why:** Free tier is generous, offers built-in Auth, and real-time capabilities if needed.

## Deployment Checklist
1. **Environment Variables:** Ensure all production keys (Stripe, Groq, Supabase) are added in Vercel project settings.
2. **Build Check:** Run `npm run build` locally to catch any TypeScript or ESLint errors before pushing.
3. **Custom Domain:** Connect `quicktools.ai` domain in Vercel.
4. **Cron Setup:** Configure `vercel.json` to trigger the `/api/cron/auto-blog` endpoint daily.

## CDN & Caching
- Utilize `next/image` to automatically serve WebP images via Vercel's Edge Network.