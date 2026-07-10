# QuickTools.ai - AI Integration Rules

## Core Strategy
Leverage AI for both user-facing tools and internal automation (auto-blogging) while keeping API costs low (free tiers where possible).

## 1. User-Facing AI Tools (First 5 Tools)
- **API Choice:** Use cost-effective and fast APIs (e.g., Groq for lightning-fast text generation, or Gemini API free tier).
- **Streaming:** Implement UI streaming (Server Sent Events) so users see AI responses typing out in real-time, reducing perceived latency.
- **Prompt Engineering:** Store system prompts securely on the server-side. Never expose prompts to the client.

## 2. Automated Daily AI Blog System
- **Cron Jobs:** Use Vercel Cron Jobs (or GitHub Actions) to trigger a daily script automatically.
- **Data Gathering:** The script should fetch current trending topics or updated data related to the platform's niche.
- **AI Generation:** Use an AI API to write a comprehensive, SEO-optimized blog post with proper HTML/Markdown formatting based on the fetched data.
- **Publishing:** Automatically save the generated blog post to the database (e.g., Supabase/PostgreSQL) or as a Markdown file, and trigger a Next.js revalidation (ISR) to publish the post live without any manual deployment.