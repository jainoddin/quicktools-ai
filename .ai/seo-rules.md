# QuickTools.ai - SEO & Performance Rules

## Goal
Achieve perfect indexing by Google bots and maintain top-tier page speed (Lighthouse score 95+).

## Technical SEO
- **Server-Side Rendering (SSR) & Static Site Generation (SSG):** Use Next.js App Router to pre-render HTML. This ensures Google can easily crawl the content immediately.
- **Sitemap & Robots.txt:** Automatically generate `sitemap.xml` and `robots.txt` that update dynamically when new tools or auto-blogs are published.
- **Metadata:** Every page (tool pages, blog posts) must have dynamic `Title`, `Meta Description`, `Open Graph (OG)`, and `Twitter Card` tags.
- **Canonical URLs:** Prevent duplicate content penalties by enforcing canonical tags on all pages.
- **Structured Data (JSON-LD):** Include schema markup for `SoftwareApplication`, `Article` (for blogs), and `BreadcrumbList`.

## Page Speed Optimization
- **Images:** Strict use of `next/image` with WebP/AVIF formats. Lazy-load all images below the fold.
- **Fonts:** Use `next/font` to optimize loading and prevent layout shifts (CLS).
- **Scripts:** Defer third-party scripts (like analytics) to load only after the main content becomes interactive.
- **Caching:** Implement robust caching strategies (Vercel Edge caching, ISR for blogs) to serve pages instantly.

## Auto-Blog SEO Strategy
- The daily AI-generated blogs must follow strict SEO best practices: proper H1, H2, H3 hierarchy, keyword-rich titles, and natural internal linking to the 5 core AI tools.