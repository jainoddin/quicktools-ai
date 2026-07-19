/**
 * fix_header_visibility.js
 * 
 * Makes heading + History button ALWAYS visible (even when result is shown)
 * by removing the `!result && !isProcessing &&` guard around the header block.
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

  // Pattern 1: The exact conditional wrapper used in many tools
  // Matches: {!result && !isProcessing && (\n  <div ... header ...>\n  </div>\n)}\n
  // We want to unwrap the content but keep the header div always rendered.
  // Strategy: find the pattern and replace the outer guard.

  const patterns = [
    // Exact pattern from generated tools
    {
      find: /\{!result && !isProcessing && \(\s*(<div className="flex flex-col md:flex-row[^}]*?<\/div>\s*<\/div>\s*<\/div>)\s*\)\}/gs,
      // This is too complex for a simple regex. Use string-based approach.
    }
  ];

  // String-based approach: look for the specific comment + conditional block
  // Pattern: `{/* Header */}\n          {!result && !isProcessing && (\n` ... `          )}\n`
  
  // Match the exact pattern across multiple lines
  const headerGuardPattern = /(\{\/\* Header \*\/\})\s*\n(\s*)\{!result && !isProcessing && \(\s*\n([\s\S]*?)\n\s*\)\}/g;
  
  const newContent = content.replace(headerGuardPattern, (match, comment, indent, innerContent) => {
    // Remove the conditional wrapper, always render the header
    return `${comment}\n${innerContent}`;
  });

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`Fixed: ${path.relative(componentsDir, file)}`);
    fixedCount++;
  }
}

console.log(`\nDone. Fixed ${fixedCount} files.`);
