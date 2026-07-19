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
  
  // If downloadAsPDF is used in the code but not imported
  if (c.includes('downloadAsPDF(') && !c.includes('import { downloadAsPDF }')) {
    // Inject import at the top (after the first block of imports or just as the second line)
    // Find a good place to put it: right after the lucide-react import is usually safe
    c = c.replace(/import \{[^}]+\} from ['"]lucide-react['"];?/, match => {
      return match + "\nimport { downloadAsPDF } from '@/lib/pdfUtils';";
    });
    
    // Fallback if the above replace didn't do anything (no lucide-react import found, which is unlikely)
    if (!c.includes('import { downloadAsPDF }')) {
      c = "import { downloadAsPDF } from '@/lib/pdfUtils';\n" + c;
    }
    
    fs.writeFileSync(f, c);
    fixedCount++;
    console.log('Added downloadAsPDF import to ' + path.basename(f));
  }
});

console.log('Fixed ' + fixedCount + ' files missing downloadAsPDF.');
