# QuickTools.ai - Environment Variables

## Naming Convention
- **Client-Side:** Prefix with `NEXT_PUBLIC_` (Only expose non-sensitive keys).
- **Server-Side:** No prefix (Keep secret, NEVER expose to client).

## Required Variables

### App & URLs
`NEXT_PUBLIC_APP_URL`=http://localhost:3000 (Production: https://quicktools.ai)
`NODE_ENV`=development

### Authentication (NextAuth / Supabase)
`NEXT_PUBLIC_SUPABASE_URL`=your_supabase_url
`NEXT_PUBLIC_SUPABASE_ANON_KEY`=your_anon_key
`SUPABASE_SERVICE_ROLE_KEY`=your_service_role_key

### AI APIs
`GROQ_API_KEY`=your_groq_key
`OPENAI_API_KEY`=your_openai_key

### Database
`DATABASE_URL`=postgresql://user:password@host:port/db_name

### Payments (Stripe)
`STRIPE_SECRET_KEY`=sk_test_...
`STRIPE_WEBHOOK_SECRET`=whsec_...
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`=pk_test_...

### Cron Jobs (Auto-Blogging)
`CRON_SECRET`=super_secret_string_for_vercel_cron
