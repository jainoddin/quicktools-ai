/**
 * fix_header_visibility_v2.js
 * 
 * For tools that have:
 * - `{/* Header when no result */}` + `{!result && !isProcessing && ( ... )}`
 * - `{/* Result Header */}` + `{(result || isProcessing) && ( ... h2 Result ... )}`
 * 
 * Fix: Remove the `!result && !isProcessing` guard so the icon+title+History button is always shown.
 * Then update the result header to not duplicate. (Keep Copy/PDF/History in result header only)
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
  
  if (!content.includes('!result && !isProcessing &&')) continue;

  // These files have the pattern:
  // {/* Header when no result */}
  // {!result && !isProcessing && (
  //   <div className="flex flex-col md:flex-row ...">
  //     ...icon, h1, description, History button...
  //   </div>
  // )}
  // 
  // {/* Result Header */}
  // {(result || isProcessing) && (
  //   <div> ... <h2>Result</h2> ... Copy/PDF/History ... </div>
  // )}
  
  // Strategy:
  // 1. Extract the header content (icon + title + description)
  // 2. Replace the conditional with always-rendered header that shows icon/title always,
  //    and Copy/PDF/History only when result exists
  
  // Find pattern: {/* Header when no result */} OR comment-less versions
  // with {!result && !isProcessing && (\n <div...> ... </div>\n)}
  
  // Approach: use a regex to unwrap the guard
  const guardPattern = /(\{\/\* Header[^*]*?\*\/\}\s*\n\s*)\{!result && !isProcessing && \(\s*\n([\s\S]*?)\n(\s*)\)\}/g;
  
  let modified = content.replace(guardPattern, (match, comment, innerContent, indent) => {
    return `${comment}${innerContent}`;
  });

  if (modified !== content) {
    fs.writeFileSync(file, modified, 'utf-8');
    console.log(`Fixed: ${path.relative(componentsDir, file)}`);
    fixedCount++;
  } else {
    // Try alternative pattern without the comment prefix
    const altPattern = /\s*\{!result && !isProcessing && \(\s*\n(\s*<div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between[^{]*">\s*\n[\s\S]*?\n\s*<\/div>\s*\n\s*)\s*\)\}/g;
    let modified2 = content.replace(altPattern, (match, innerContent) => {
      return `\n${innerContent}`;
    });
    if (modified2 !== content) {
      fs.writeFileSync(file, modified2, 'utf-8');
      console.log(`Fixed (alt): ${path.relative(componentsDir, file)}`);
      fixedCount++;
    } else {
      console.log(`SKIPPED (pattern not matched): ${path.relative(componentsDir, file)}`);
    }
  }
}

console.log(`\nDone. Fixed ${fixedCount} files.`);
