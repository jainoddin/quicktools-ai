/**
 * fix_imports.js
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

  if (content.includes('TextGenerationProgress') && !content.includes('import TextGenerationProgress')) {
    // Add it after the last import statement
    const importRegex = /^import .*;$/gm;
    let match;
    let lastIndex = -1;
    let lastMatchLength = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastIndex = match.index;
      lastMatchLength = match[0].length;
    }
    
    if (lastIndex !== -1) {
      const insertPos = lastIndex + lastMatchLength;
      content = content.slice(0, insertPos) + '\nimport TextGenerationProgress from \'@/components/shared/TextGenerationProgress\';' + content.slice(insertPos);
      fs.writeFileSync(file, content, 'utf-8');
      updatedCount++;
    } else {
      // If no imports (unlikely), add at top
      content = 'import TextGenerationProgress from \'@/components/shared/TextGenerationProgress\';\n' + content;
      fs.writeFileSync(file, content, 'utf-8');
      updatedCount++;
    }
  }
}

console.log(`Added imports to ${updatedCount} files.`);
