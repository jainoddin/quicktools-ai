/**
 * fix_pattern_a_ui.js
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

const badgeHtml = `<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium"><History className="w-4 h-4" /> Your creations are saved in history</div>`;

let updatedCount = 0;

for (const file of files) {
  if (file.includes('ImageGenerator') || file.includes('BackgroundRemover')) continue;

  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Pattern A files have: 
  // <h2 className="text-lg font-bold text-[#111827]">TITLE</h2>
  // We want to replace it with Generated Result (but only if it's the result header).
  // The result header in Pattern A files is right above the Copy/PDF buttons:
  // <h2 className="text-lg font-bold text-[#111827]">([^<]+)</h2>\s*<div className="flex items-center gap-2">\s*<button[^>]+onClick=\{copyToClipboard\}
  
  content = content.replace(
    /(<h2 className="text-lg font-bold text-\[#111827\]">)[^<]+(<\/h2>\s*<div className="flex items-center gap-2">\s*<button[^>]+onClick=\{copyToClipboard\})/g,
    '$1Generated Result$2'
  );

  // Now replace the History button inside that result header block.
  // The button in Pattern A looks like:
  // <button \n                    onClick={() => setShowHistory(true)}\n                    className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"\n                  >\n                    <History className="w-4 h-4 text-[#6B7280]" /> History\n                  </button>
  
  const historyButtonRegexA = /<button[^>]+onClick=\{\(\)\s*=>\s*setShowHistory\(true\)\}[^>]+className="[^"]*border border-\[#E5E7EB\][^"]*"[^>]*>\s*<History[^>]*\/>\s*History\s*<\/button>/g;
  
  if (historyButtonRegexA.test(content)) {
    // Wait, is there another History button that matches this regex?
    // The main header button has `bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827]`
    // The result header button has `border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold`
    // We can replace the one with text-[#4B5563].
    const specificRegex = /<button[^>]+onClick=\{\(\)\s*=>\s*setShowHistory\(true\)\}[^>]+text-\[#4B5563\][^>]*>\s*<History[^>]*\/>\s*History\s*<\/button>/g;
    
    content = content.replace(specificRegex, badgeHtml);
  }

  // Also replace Pattern C / Premium tools history buttons if they are still there (they shouldn't be because I modified the template, but let's check).
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    updatedCount++;
    console.log(`Fixed ${path.basename(file)}`);
  }
}

console.log(`Done fixing ${updatedCount} files.`);
