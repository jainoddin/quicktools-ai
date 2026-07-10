# QuickTools.ai - Frontend Rules

## Goal
Build a premium, fast, SEO-friendly AI SaaS frontend with a consistent UI/UX across all pages.

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- Framer Motion (minimal)
- React Hook Form
- Zod
- Zustand (only when needed)

## Design System
Always use the global design system.

### Brand Colors
- **Primary:** #4F46E5
- **Primary Hover:** #4338CA
- **Secondary:** #7C3AED
- **Accent:** #0EA5E9
- **Background:** #F8FAFC
- **Surface:** #FFFFFF
- **Text Primary:** #111827
- **Text Secondary:** #6B7280
- **Border:** #E5E7EB
- **Success:** #22C55E
- **Warning:** #F59E0B
- **Error:** #EF4444

*Never introduce random colors.*

### Typography
- **Font:** Inter
- **Heading:** 700
- **Subheading:** 600
- **Body:** 400
- **Button:** 600

*Line height should always be readable.*

## Layout
- **Desktop:** 1440px container
- **Laptop:** 1280px
- **Tablet:** 768px
- **Mobile:** 375px

Always use Mobile First Design. Use an 8px spacing system.

## Components
Every UI element must be reusable. Create reusable:
- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Modal
- Drawer
- Dropdown
- Tooltip
- Toast
- Badge
- Avatar
- Card
- Tabs
- Accordion
- Navbar
- Sidebar
- Footer
- Pagination
- Search Bar
- Breadcrumb
- Empty State
- Error State
- Loading State
- Skeleton Loader

### Cards
- Radius: 16px
- Soft Shadow
- White Background
- Hover animation

*Never use heavy shadows.*

### Buttons
- **Primary:** Indigo Background, White Text
- **Secondary:** White Background, Indigo Border
- **Ghost:** Transparent
- **Icon Button:** Round

*All buttons must have hover, active and disabled states.*

### Forms
- Use React Hook Form.
- Validate with Zod.
- Every form must support: Loading, Success, Error, Disabled, Validation.
- **Inputs:** 12px Radius, Focus Ring, Accessible Labels, Helper Text, Error Message.

*Never use placeholder as label.*

### Icons
- Use Lucide React only.
- Keep icon sizes consistent.

### Images
- Always use `next/image`.
- Responsive images only.
- Use WebP or AVIF where possible.
- Lazy load non-critical images.

### Animations
- Use Framer Motion only when needed.
- Animation Duration: 150–250ms
- Keep animations smooth. Avoid unnecessary motion.

## Responsive Rules
- No horizontal scrolling.
- Use CSS Grid and Flexbox.

## Accessibility
- Keyboard Navigation
- ARIA Labels
- Visible Focus
- Semantic HTML
- Proper Heading Order
- Minimum touch target size

## SEO
Every page must include: Title, Meta Description, Open Graph, Twitter Card, Canonical URL, JSON-LD, Breadcrumb Schema.

## Performance
- Target Lighthouse 95+
- Server Components first. Client Components only when required.
- Use dynamic imports. Use lazy loading.
- Optimize fonts and images.
- Reduce JavaScript. Avoid unnecessary re-renders.

## Folder Structure
`components/`, `features/`, `hooks/`, `lib/`, `utils/`, `types/`, `app/`

## Naming
- **PascalCase** Components
- **camelCase** Functions
- **useSomething** Hooks
- Descriptive filenames

## Error Handling
Every page must have: Loading State, Skeleton, Empty State, Error State, Retry Button.

## Tool Pages
Every AI Tool page must include:
Hero, Tool Description, Input Section, Settings, Generate Button, Loading Screen, Result Screen, Download Button, Copy Button, Share Button, History, Related Tools, FAQ, CTA Section.

## Navigation
Navbar, Footer, Breadcrumb, Search, Related Tools, Internal Links.

## Final Quality Checklist
Before completing any screen:
- [ ] Responsive
- [ ] Reusable Components
- [ ] SEO Ready
- [ ] Accessibility Ready
- [ ] TypeScript Safe
- [ ] No Console Errors
- [ ] No Duplicate Code
- [ ] Lighthouse 95+
- [ ] Production Ready