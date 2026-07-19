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

let icons = [
  'PenLine', 'Lightbulb', 'Mail', 'FileText', 'BookOpen', 'User', 
  'Building2', 'MessageSquare', 'Hash', 'Plane', 'UtensilsCrossed', 
  'FileCode2', 'Database', 'Youtube', 'Users', 'ChefHat', 'Dumbbell', 
  'Quote', 'Package', 'Search', 'Megaphone', 'GitBranch', 'Calendar', 
  'Tag', 'Clapperboard', 'Target'
];

let missingCount = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  icons.forEach(icon => {
    // Basic check if icon component is used e.g. <Youtube 
    if (c.includes('<' + icon) && !c.includes(icon + ',') && !c.includes('{ ' + icon)) {
      const importMatch = c.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/s);
      if (importMatch && !importMatch[1].includes(icon)) {
        console.log('Missing ' + icon + ' in ' + path.basename(f));
        c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/s, (match, p1) => {
          return 'import { ' + p1.trim() + ', ' + icon + ' } from "lucide-react"';
        });
        changed = true;
      }
    }
  });
  
  if (changed) {
    fs.writeFileSync(f, c);
    missingCount++;
  }
});
console.log('Fixed ' + missingCount + ' files.');
