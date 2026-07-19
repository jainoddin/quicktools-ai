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

let fixed = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (c.includes('<Share2') && !/import.*\{.*Share2.*\}.*lucide-react/.test(c)) {
    c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/, (match, p1) => {
      return `import { ${p1.trim()}, Share2 } from 'lucide-react';`;
    });
    changed = true;
  }
  
  if (c.includes('<RefreshCw') && !/import.*\{.*RefreshCw.*\}.*lucide-react/.test(c)) {
    c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];/, (match, p1) => {
      return `import { ${p1.trim()}, RefreshCw } from 'lucide-react';`;
    });
    changed = true;
  }
  
  // Wait! Some files have `import { Share2 } from 'lucide-react'` on a new line!
  // If the regex above fails because it doesn't match multiline imports properly,
  // we can just blindly inject `import { Share2, RefreshCw } from "lucide-react";` at the top!
  
  if (changed) {
    fs.writeFileSync(f, c, 'utf8');
    fixed++;
  } else {
    // If still missing but regex failed
    let needsShare2 = c.includes('<Share2') && !/import.*\{.*Share2.*\}.*lucide-react/s.test(c);
    let needsRefreshCw = c.includes('<RefreshCw') && !/import.*\{.*RefreshCw.*\}.*lucide-react/s.test(c);
    
    if (needsShare2 || needsRefreshCw) {
      c = `import { Share2, RefreshCw } from 'lucide-react';\n` + c;
      fs.writeFileSync(f, c, 'utf8');
      fixed++;
    }
  }
});

console.log('Fixed imports in ' + fixed + ' files.');
