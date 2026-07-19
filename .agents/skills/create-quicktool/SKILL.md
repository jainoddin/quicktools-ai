---
name: Create QuickTool
description: Generates a new QuickTool page, client component, API endpoint, and adds it to the configuration. Must follow exact design guidelines including History, PDF, Copy buttons, and SEO setup.
---

# QuickTool Creation Guide

When the user asks to "create a new free tool", "create a quick tool", or "add a tool", you MUST follow these exact steps and architectural guidelines. Do not skip any requirements.

## 1. Required Components
For every new tool, you must create/update:
1. **Frontend Page**: `frontend/app/tools/[slug]/page.tsx`
2. **Frontend Client**: `frontend/components/[slug]/[ToolName]Client.tsx`
3. **API Endpoint**: Add a new prompt configuration to `backend/api/index.js` under the `prompts` object.
4. **Tool Registry**: Add the tool's metadata to `tools_data.json` at the project root.
5. **Icon Registry**: Map the tool's icon in `frontend/components/tools/ToolsClient.tsx` if it's not a standard Lucide React icon.

## 2. Frontend Page Guidelines (`page.tsx`)
- Must use Next.js Metadata API for SEO (`export const metadata: Metadata = {...}`).
- Must include `SoftwareApplication` JSON-LD Schema markup in a `<script>` tag.
- Must include **Breadcrumbs** in the UI: `Home > All Tools > Tool Name` (using `lucide-react` icons `Home` and `ChevronRight`).
- The main wrapper must have exactly: `<div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">`

## 3. Frontend Client Guidelines (`[ToolName]Client.tsx`)
- The main element MUST have a strict height constraint to prevent infinite expanding:
  `<main className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">`
- The inner markdown result container MUST have:
  `<div className="flex-grow overflow-y-auto custom-scrollbar pr-2">` to enable scrolling when content overflows.

### Header & Buttons UI
You MUST use this EXACT button structure and colors for the Result Header:
```tsx
<div className="flex gap-2">
  {result && (
    <>
      {/* Copy Button (Blue) */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 px-4 py-2 bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] font-bold rounded-xl transition-colors"
      >
        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
      </button>

      {/* PDF Button (Green) */}
      <button
        onClick={() => downloadAsPDF(result, 'Your Tool Name')}
        className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] font-bold rounded-xl transition-colors"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">PDF</span>
      </button>
    </>
  )}
  
  {/* History Button (White/Gray) */}
  <button
    onClick={() => {
      if (!isAuthenticated && toolHistory.length >= 3) {
        setShowLoginPopup(true);
      } else {
        setShowHistory(true);
      }
    }}
    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F3F4F6] text-[#4B5563] font-bold rounded-xl transition-colors border border-[#E5E7EB]"
  >
    <History className="w-4 h-4" />
    <span className="hidden sm:inline">History</span>
  </button>
</div>
```

### Initial View Header
When `!result && !isProcessing`, you must show the tool's colorful icon header at the top of the client component matching this layout:
```tsx
<div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 ...">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-[ICON_COLOR] rounded-xl flex items-center justify-center shadow-sm shrink-0">
      <YourIcon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
        Tool Name <Sparkles className="w-5 h-5 text-[ICON_COLOR]" />
      </h1>
      <p className="text-sm text-[#6B7280]">Tool description.</p>
    </div>
  </div>
  {/* Add History button here as well for empty state */}
</div>
```

## 4. Final Checklist
- Backend endpoint added?
- SEO/Schema added?
- Breadcrumbs added?
- Height constraint (`h-[600px]`) added?
- Blue Copy and Green PDF buttons added?
- Proper Icon imports from `lucide-react`?
