const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir, {withFileTypes: true}).forEach(i => {
    const p = path.join(dir, i.name);
    if(i.isDirectory()) res.push(...getFiles(p));
    else if(p.endsWith('Client.tsx')) res.push(p);
  });
  return res;
}

let fixedCount = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  // Find all lucide-react imports
  const matches = [...c.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g)];
  
  if (matches.length > 0) {
    let allImports = new Set();
    
    // Collect all imports
    matches.forEach(m => {
      m[1].split(',').forEach(item => {
        const trimmed = item.trim();
        if (trimmed) allImports.add(trimmed);
      });
    });
    
    const uniqueImports = Array.from(allImports).join(', ');
    
    // Replace the first match with the unified import
    let first = true;
    const newContent = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g, (match) => {
      if (first) {
        first = false;
        return `import { ${uniqueImports} } from 'lucide-react';`;
      }
      return ''; // Remove subsequent imports
    });
    
    if (newContent !== c) {
      fs.writeFileSync(f, newContent);
      fixedCount++;
      console.log('Deduplicated in ' + path.basename(f));
    }
  }
});
console.log('Fixed ' + fixedCount + ' files.');
