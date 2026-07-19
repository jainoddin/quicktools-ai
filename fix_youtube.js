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
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  if(c.includes('Youtube')) {
    c = c.replace(/<Youtube /g, '<Video ');
    c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g, (match, p1) => {
       return match.replace(/\bYoutube\b/g, 'Video');
    });
    // Also deduplicate Video in import if it exists twice
    c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/s, (match, p1) => {
      const parts = p1.split(',').map(s => s.trim()).filter(s => s);
      const unique = [...new Set(parts)];
      return 'import { ' + unique.join(', ') + ' } from "lucide-react"';
    });
    fs.writeFileSync(f, c);
    console.log('Fixed Youtube in ' + path.basename(f));
  }
});
