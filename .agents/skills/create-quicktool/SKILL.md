---
name: Create QuickTool
description: Generates a new QuickTool page, client component, API endpoint, and adds it to the configuration. Must follow exact design guidelines including ToolHistorySidebar, TextDownloadModal, and Side-by-Side layout.
---

# QuickTool Creation Guide

When the user asks to "create a new free tool", "create a quick tool", or "add a tool", you MUST follow these exact steps and architectural guidelines. Do not skip any requirements.

## 1. Required Components
For every new tool, you must create/update:
1. **Frontend Page**: `frontend/app/tools/[slug]/page.tsx`
2. **Frontend Client**: `frontend/components/[slug]/[ToolName]Client.tsx`
3. **API Endpoint**: Add a new POST route in the backend (e.g., `backend/src/routes/tools.routes.ts`) and configure the prompt logic.
4. **Tool Registry**: Add the tool's metadata to `allTools` list in `frontend/components/tools/ToolsClient.tsx`.

## 2. Frontend Page Guidelines (`page.tsx`)
- Must use Next.js Metadata API for SEO (`export const metadata: Metadata = {...}`).
- Must include `SoftwareApplication` JSON-LD Schema markup in a `<script>` tag.
- The main wrapper must have exactly: `<div className="flex-1 w-full max-w-[1600px] mx-auto py-2 h-[calc(100vh-80px)]">` (Notice `py-2` and not `py-6`).

## 3. Frontend Client Guidelines (`[ToolName]Client.tsx`)
You MUST use the **Side-by-Side Layout** pattern (similar to `AiSloganGeneratorClient.tsx`). Do NOT use a single full-width column layout.

### Layout Structure
The root element must be:
```tsx
<div className="flex flex-col lg:flex-row gap-8 h-full">
  <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
  {/* Left Sidebar (aside) */}
  {/* Right Main Area (main) */}
  <TextDownloadModal ... />
</div>
```

### Left Sidebar (`aside`)
- Must have: `<aside className="w-full lg:w-[340px] shrink-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">`
- Must contain the Input Textarea and the Generate Button.
- **CRITICAL**: Must include the "Explore Other Free Tools" block at the bottom of the sidebar with interlinks to other tools (e.g. Business Name Generator, AI Ad Copy Generator).

### Right Main Area (`main`)
- Must have: `<main className="flex-grow flex flex-col min-w-0">`
- If `showHistory` is true, render the sidebar component inside a card:
  ```tsx
  <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
    <ToolHistorySidebar toolName="..." toolType="text" history={toolHistory} onBack={() => setShowHistory(false)} onToggleFavorite={...} onDelete={...} />
  </div>
  ```
- If `showHistory` is false, render:
  1. **Floating Header**: Title with Sparkles icon, description, and a floating History button on the right.
  2. **Result Block**: 
     - A container with strict height: `<div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] ...">`
     - When `isProcessing`, show `<TextGenerationProgress />`
     - When `result`, show the Markdown content in an overflow-y-auto div, followed by a footer with `Download`, `Share`, `Regenerate`, and `Copy` buttons styled exactly like AiSloganGenerator.
     - When empty, show a "Ready to generate" empty state.

### Required Imports & Components
- Use `ToolHistorySidebar` for rendering history (`import ToolHistorySidebar from '../tools/ToolHistorySidebar';`).
- Use `TextDownloadModal` for PDF downloading instead of inline `html2pdf` logic (`import TextDownloadModal from '@/components/shared/TextDownloadModal';`).
- Use `TextGenerationProgress` for loading states (`import TextGenerationProgress from '../shared/TextGenerationProgress';`).

## 4. Final Checklist
- Is the layout split into `<aside lg:w-[340px]>` and `<main>`?
- Are the Explore Other Free Tools cards visible at the bottom of the left sidebar?
- Is the Title & History button floating outside the main result card?
- Did you use `ToolHistorySidebar` and `TextDownloadModal`?
