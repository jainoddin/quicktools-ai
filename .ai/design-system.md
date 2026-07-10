# QuickTools.ai - Design System

## Overview
This document defines the visual language for QuickTools.ai. All UI components must adhere to these tokens to ensure a premium, consistent experience.

## 1. Color Palette

### Light Mode (Default)
- **Primary:** `#4F46E5` (Indigo)
- **Primary Hover:** `#4338CA`
- **Secondary:** `#7C3AED` (Purple)
- **Accent:** `#0EA5E9` (Sky Blue)
- **Background:** `#F8FAFC` (Slate 50)
- **Surface:** `#FFFFFF` (White)
- **Text Primary:** `#111827` (Gray 900)
- **Text Secondary:** `#6B7280` (Gray 500)
- **Border:** `#E5E7EB` (Gray 200)

### Dark Mode (Premium AI Feel)
- **Primary:** `#6366F1` (Lighter Indigo for contrast)
- **Primary Hover:** `#818CF8`
- **Secondary:** `#8B5CF6`
- **Accent:** `#38BDF8`
- **Background:** `#09090B` (Zinc 950 - Deep Dark)
- **Surface:** `#18181B` (Zinc 900)
- **Text Primary:** `#F9FAFB` (Gray 50)
- **Text Secondary:** `#9CA3AF` (Gray 400)
- **Border:** `#27272A` (Zinc 800)

### Semantic Colors
- **Success:** `#22C55E` (Green)
- **Warning:** `#F59E0B` (Amber)
- **Error:** `#EF4444` (Red)
- **Info:** `#3B82F6` (Blue)

---

## 2. Typography

**Global Font:** `Inter` (Google Fonts)

| Element | Weight | Size (Desktop) | Size (Mobile) |
|---------|--------|----------------|---------------|
| **H1** | 700 (Bold) | 48px (3rem) | 36px (2.25rem)|
| **H2** | 700 (Bold) | 36px (2.25rem)| 28px (1.75rem)|
| **H3** | 600 (Semibold)| 24px (1.5rem) | 20px (1.25rem)|
| **Body**| 400 (Regular)| 16px (1rem) | 16px (1rem) |
| **Small**| 400 (Regular)| 14px (0.875rem)| 14px (0.875rem)|
| **Button**| 600 (Semibold)| 16px / 14px | 16px / 14px |

*Note: Line height should be `1.5` for body text and `1.2` for headings.*

---

## 3. Spacing System (8px Grid)
Use Tailwind's default spacing which is based on an 8px grid:
- `1` = 4px (micro adjustments)
- `2` = 8px (minimum padding)
- `4` = 16px (standard padding)
- `6` = 24px (component spacing)
- `8` = 32px (section spacing)
- `12` = 48px (major section gap)

---

## 4. UI Elements

### Cards
- **Radius:** `16px` (`rounded-2xl` in Tailwind)
- **Shadow (Light):** Soft subtle shadow (`shadow-sm` or `shadow-md`)
- **Shadow (Dark):** No shadow, use border (`border border-zinc-800`)
- **Interaction:** Hover animation (`hover:-translate-y-1 hover:shadow-lg transition-all duration-200`)

### Buttons
- **Primary:** Indigo Background, White Text
- **Secondary:** Surface Background, Indigo Border
- **Ghost:** Transparent, gray hover background
- **Radius:** `8px` (`rounded-lg`)
- **States:** All buttons MUST have hover, active (click), and disabled states.

### Forms & Inputs
- **Radius:** `12px` (`rounded-xl`)
- **Focus Ring:** 2px solid Indigo outline with offset (`focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`)
- **Labels:** Must be placed above the input. Never use placeholder as the only label.

---

## 5. Z-Index Scale (To prevent overlaps)
To avoid overlap issues (like dropdowns hiding behind cards), stick to this strict scale:
- `z-0`: Base content
- `z-10`: Sticky elements
- `z-20`: Dropdowns / Tooltips
- `z-30`: Navbar / Header
- `z-40`: Modal Overlays (Backdrop)
- `z-50`: Modals / Dialogs / Toasts