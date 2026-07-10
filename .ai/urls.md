# QuickTools.ai - URL & Routing Rules

## URL Rules
* Use clean, human-readable URLs.
* Never use IDs or query parameters for primary pages when a descriptive slug works.
* Keep URLs lowercase.
* Use hyphens (-) instead of underscores (_).
* Every URL must be SEO-friendly.
* Add metadata to every page.
* Add canonical URLs.
* Generate sitemap.xml automatically.
* Generate robots.txt automatically.

---

## Public Pages
/
/tools
/categories
/pricing
/blog
/about
/contact
/faq
/privacy
/terms
/cookies
/changelog
/search

---

## SEO & Indexing Pages (Added for Best SEO)
/sitemap.xml
/server-sitemap.xml (For dynamic blogs/tools)
/robots.txt
/use-cases/for-marketers (Use-case pages are gold for SEO)
/use-cases/for-developers
/use-cases/for-students

---

## AI Tool Pages
/tools/ai-image-generator
/tools/background-remover
/tools/image-upscaler
/tools/ai-writer
/tools/ai-logo-generator
/tools/youtube-title-generator
/tools/ai-email-writer
/tools/ai-code-generator
/tools/ai-translator
/tools/ai-video-generator
/tools/ai-thumbnail-generator
/tools/ai-resume-builder

---

## Authentication
/login
/signup
/forgot-password
/reset-password
/verify-email

---

## Dashboard
/dashboard
/dashboard/history
/dashboard/favorites
/dashboard/downloads
/dashboard/profile
/dashboard/settings
/dashboard/billing
/dashboard/notifications
/dashboard/api-keys

---

## Payments
/checkout
/payment/success
/payment/cancel

---

## Blog Categories, Tags & Authors (SEO Boost)
/blog/[slug]
/blog/category/image-ai
/blog/category/writing-ai
/blog/category/video-ai
/blog/category/code-ai
/blog/tag/[tag-slug] (e.g., /blog/tag/chatgpt-alternatives)
/blog/author/[author-slug] (Highly recommended for Google E-E-A-T score)

---

## Tool Categories
/category/image-ai
/category/writing-ai
/category/video-ai
/category/code-ai

---

## Help
/help
/help/contact
/help/report-bug
/help/feature-request
/help/status

---

## Error Pages
/404
/500

---

## Future Pages
/affiliate
/referral
/api
/docs
/templates
/compare
/security
/accessibility
/careers
/partners

---

## Navigation Rules
Home → Categories → Tool → Generate → Result → Download → Dashboard

Every page should have:
* Breadcrumb navigation
* Internal links to related tools
* Related blog articles
* Related AI tools
* FAQ section
* Call-to-action section

---

## Next.js Routing Rules
Use App Router only.
Every route must contain:
* `page.tsx`
* `loading.tsx`
* `error.tsx` (where appropriate)
* metadata
* Open Graph
* Twitter Card
* JSON-LD (for important pages)

Keep routes modular and scalable.