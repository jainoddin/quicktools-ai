const fs = require('fs');
const path = require('path');

// Find all Client.tsx files that use ToolHistorySidebar but don't import it
function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir, {withFileTypes: true}).forEach(i => {
    const p = path.join(dir, i.name);
    if (i.isDirectory()) res.push(...getFiles(p));
    else if (p.endsWith('Client.tsx')) res.push(p);
  });
  return res;
}

let count = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');

  // If uses ToolHistorySidebar but doesn't import it
  if (c.includes('ToolHistorySidebar') && !c.includes("import ToolHistorySidebar")) {
    // Add import after the last import statement that has 'from'
    // Find a good place to insert - after the last import
    const importSection = `import ToolHistorySidebar from '@/components/tools/ToolHistorySidebar';\n`;
    
    // Insert after the first 'use client'; or at the beginning of imports
    if (c.startsWith("'use client';")) {
      c = c.replace("'use client';\n", `'use client';\n\n${importSection}`);
    } else {
      // find last import line and add after it
      const lines = c.split('\n');
      let lastImportIdx = 0;
      lines.forEach((line, idx) => {
        if (line.trim().startsWith('import ')) lastImportIdx = idx;
      });
      lines.splice(lastImportIdx + 1, 0, importSection);
      c = lines.join('\n');
    }
    
    fs.writeFileSync(f, c);
    count++;
    console.log(`✅ Added ToolHistorySidebar import to ${path.basename(f)}`);
  }
});

console.log(`Fixed imports in ${count} files.`);
