const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir, {withFileTypes: true}).forEach(i => {
    const p = path.join(dir, i.name);
    if(i.isDirectory()) res.push(...getFiles(p));
    else if(p.endsWith('.tsx')) res.push(p);
  });
  return res;
}

let fixedCount = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  
  if (c.includes('"use client"') || c.includes("'use client'")) {
    const useClientRegex = /^[\s]*['"]use client['"];?[\s]*/m;
    
    // Check if 'use client' is not at the very beginning
    if (!c.trim().startsWith('"use client"') && !c.trim().startsWith("'use client'")) {
      // Remove it from wherever it is
      c = c.replace(useClientRegex, '');
      // Add it to the top
      c = '"use client";\n' + c.trimStart();
      
      fs.writeFileSync(f, c);
      fixedCount++;
      console.log('Fixed use-client in ' + path.basename(f));
    }
  }
});

console.log('Fixed ' + fixedCount + ' files.');
