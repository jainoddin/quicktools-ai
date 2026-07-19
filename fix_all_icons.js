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

const requiredIcons = ['Download', 'Share2', 'RefreshCw', 'Copy', 'CheckCircle2', 'History', 'Loader2', 'Sparkles'];

let fixedCount = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
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
    
    // Check required icons used in the file
    requiredIcons.forEach(icon => {
      if (c.includes('<' + icon) && !allImports.has(icon)) {
        allImports.add(icon);
        changed = true;
      }
    });
    
    if (changed) {
      const uniqueImports = Array.from(allImports).join(', ');
      
      let first = true;
      const newContent = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g, (match) => {
        if (first) {
          first = false;
          return `import { ${uniqueImports} } from 'lucide-react';`;
        }
        return '';
      });
      
      fs.writeFileSync(f, newContent);
      fixedCount++;
      console.log('Added missing icons to ' + path.basename(f));
    }
  }
});

console.log('Fixed ' + fixedCount + ' files missing common icons.');
