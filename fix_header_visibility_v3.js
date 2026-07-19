/**
 * fix_header_visibility_v3.js
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
