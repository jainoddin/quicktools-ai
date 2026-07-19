/**
 * update_results_ui.js
 * 
 * Modifies all text-based tools to:
 * 1. Change "Result" -> "Generated Result" in the result header.
 * 2. Remove the History button from the result header.
 * 3. Add the "creations are saved in history" badge to the result header.
 * 4. Replace the old isProcessing loader with <TextGenerationProgress /> and add its import.
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

function getAllClientFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getAllClientFiles(fullPath));
    } else if (item.name.endsWith('Client.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllClientFiles(componentsDir);

let updatedCount = 0;

for (const file of files) {
  // Skip Image Generator as it's already using the proper UI
  if (file.includes('ImageGenerator') || file.includes('BackgroundRemover')) continue;

  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // 1 & 2 & 3: Result header changes
  // Replace:
  // <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
  //   <Sparkles className="w-6 h-6 text-[#F97316]" />
  //   Result
  // </h2>
  content = content.replace(
    /(<h2 className="text-xl font-extrabold text-\[#111827\] flex items-center gap-2">\s*<Sparkles className="w-6 h-6 text-\[#[A-F0-9]+\]"\s*\/>\s*)Result(\s*<\/h2>)/gi,
    '$1Generated Result$2'
  );

  // Replace history button in result header with badge.
  // The history button pattern looks like:
  // <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#F3F4F6] text-[#4B5563] font-bold rounded-xl transition-colors border border-[#E5E7EB]"><History className="w-4 h-4" /><span className="hidden sm:inline">History</span></button>
  // We need to replace exactly this button that comes AFTER the Copy/PDF buttons in the result header.
  const historyButtonRegex = /<button[^>]*onClick=\{\(\) => setShowHistory\(true\)\}[^>]*>\s*<History[^>]*\/>\s*<span[^>]*>History<\/span>\s*<\/button>/g;
  
  // It appears TWICE in the file: once in the top header, once in the result header.
  // BUT the top header might have it differently:
  // <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"><History className="w-4 h-4 text-[#6B7280]" /> History</button>
  
  // Let's replace ONLY the one in the result header. We can search for the `<div className="flex gap-2">` that contains the Copy/PDF buttons, and replace the history button inside it.
  
  // Actually, we can just replace the specific History button string that we know is in the result header (the one with 'hidden sm:inline').
  const resultHistoryButton = /<button\s+onClick=\{\(\)\s*=>\s*setShowHistory\(true\)\}\s+className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-\[#F3F4F6\] text-\[#4B5563\] font-bold rounded-xl transition-colors border border-\[#E5E7EB\]"\s*>\s*<History className="w-4 h-4"\s*\/>\s*<span className="hidden sm:inline">History<\/span>\s*<\/button>/;
  
  const badgeHtml = `<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium"><History className="w-4 h-4" /> Your creations are saved in history</div>`;
  
  if (resultHistoryButton.test(content)) {
    content = content.replace(resultHistoryButton, badgeHtml);
  }

  // 4: Replace isProcessing loader with TextGenerationProgress
  // There are two formats for the processing state.
  // Format 1 (from old 24 tools):
  // {isProcessing ? (
  //   <div className="flex-grow bg-white rounded-3xl border border-[#E5E7EB] p-8 flex flex-col items-center justify-center shadow-sm animate-in fade-in duration-500 h-[600px]">
  //     <Loader2 className="w-12 h-12 text-[#F97316] animate-spin mb-4" />
  //     <h2 className="text-xl font-bold text-[#111827]">TITLE</h2>
  //     <p className="text-[#6B7280] mt-2">DESC</p>
  //   </div>
  // )
  // Format 2 (from new premium tools and Pattern B):
  // {isProcessing ? (
  //   <div className="h-full flex flex-col items-center justify-center text-center px-4">
  //     <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mb-4 border border-[#E5E7EB]">
  //       <Loader2 className="w-8 h-8 text-[#9CA3AF] animate-spin" />
  //     </div>
  //     <p className="text-lg font-bold text-[#111827] mb-2">Processing...</p>
  //     <p className="text-sm text-[#6B7280]">Generating your premium content.</p>
  //   </div>
  // )

  const isProcessingRegex1 = /\{isProcessing \? \(\s*<div className="flex-grow bg-white rounded-3xl border border-\[#E5E7EB\] p-8 flex flex-col items-center justify-center shadow-sm animate-in fade-in duration-500 h-\[600px\]">\s*<Loader2[^>]+>\s*<h2 className="text-xl font-bold text-\[#111827\]">([^<]+)<\/h2>\s*<p className="text-\[#6B7280\] mt-2">([^<]+)<\/p>\s*<\/div>\s*\) : /;
  const isProcessingRegex2 = /<div className="h-full flex flex-col items-center justify-center text-center px-4">\s*<div className="w-16 h-16 bg-\[#F9FAFB\] rounded-2xl flex items-center justify-center mb-4 border border-\[#E5E7EB\]">\s*<Loader2[^>]+>\s*<\/div>\s*<p className="text-lg font-bold text-\[#111827\] mb-2">([^<]+)<\/p>\s*<p className="text-sm text-\[#6B7280\]">([^<]+)<\/p>\s*<\/div>/;

  if (isProcessingRegex1.test(content)) {
    content = content.replace(isProcessingRegex1, (match, title, desc) => {
      return `{isProcessing ? (\n            <TextGenerationProgress title="${title}" description="${desc}" />\n          ) : `;
    });
  } else if (isProcessingRegex2.test(content)) {
    content = content.replace(isProcessingRegex2, (match, title, desc) => {
      return `<TextGenerationProgress title="${title}" description="${desc}" />`;
    });
  }

  if (content !== originalContent) {
    // Add import if not present
    if (!content.includes('TextGenerationProgress')) {
      // Find the last import statement
      const lastImportMatch = [...content.matchAll(/^import .*;$/gm)].pop();
      if (lastImportMatch) {
        const insertPos = lastImportMatch.index + lastImportMatch[0].length;
        content = content.slice(0, insertPos) + '\nimport TextGenerationProgress from \'../shared/TextGenerationProgress\';' + content.slice(insertPos);
      }
    }
    
    fs.writeFileSync(file, content, 'utf-8');
    updatedCount++;
    console.log(`Updated ${path.basename(file)}`);
  }
}

console.log(`Finished updating ${updatedCount} files.`);
