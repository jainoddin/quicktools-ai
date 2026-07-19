/**
 * fix_box_structure.js
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
let fixedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Only target files that have the `<main className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">`
  const mainPattern = /<main className="flex-grow bg-white border border-\[#E5E7EB\] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-\[600px\] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">/;
  
  if (!mainPattern.test(content)) continue;

  // 1. Replace main pattern
  content = content.replace(mainPattern, '<main className="flex-grow flex flex-col min-w-0">');

  // 2. Wrap content below header in the white box.
  // The header ends before `{/* Result Header */}` or before `<div className="flex-grow overflow-y-auto custom-scrollbar pr-2">`
  // All 20 files have `{/* Result Header */}`
  
  const resultHeaderPattern = /\{\/\* Result Header \*\/\}/;
  if (!resultHeaderPattern.test(content)) {
    console.log(`Skipping ${path.relative(componentsDir, file)} (No result header)`);
    continue;
  }

  content = content.replace(resultHeaderPattern, `<div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">\n          {/* Result Header */}`);

  // 3. Add closing </div> before </main>
  content = content.replace(/<\/main>/, '</div>\n        </main>');

  fs.writeFileSync(file, content, 'utf-8');
  console.log(`Fixed structure: ${path.relative(componentsDir, file)}`);
  fixedCount++;
}

console.log(`\nDone. Fixed ${fixedCount} files.`);
