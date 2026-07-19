/**
 * fix_refreshcw_imports.js
 * Adds RefreshCw to lucide-react imports in all files that use it but don't import it
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
  let content = fs.readFileSync(file, 'utf-8');
  
  // Check if uses RefreshCw but doesn't import it
  const usesRefreshCw = content.includes('<RefreshCw');
  const importsRefreshCw = /import\s*\{[^}]*RefreshCw[^}]*\}/.test(content);
  
  if (usesRefreshCw && !importsRefreshCw) {
    // Add to first lucide-react import that has History (which all Pattern B files have)
    const lucideImportRegex = /import \{([^}]+)\} from 'lucide-react';/;
    content = content.replace(lucideImportRegex, (match, icons) => {
      return `import {${icons.trim()}, RefreshCw } from 'lucide-react';`;
    });
    
    fs.writeFileSync(file, content, 'utf-8');
    updatedCount++;
    console.log(`✅ Added RefreshCw import to ${path.basename(file)}`);
  }
}

console.log(`\nDone! Fixed imports in ${updatedCount} files.`);
