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
  
  if (c.includes('<ReactMarkdown>') && !c.includes('react-markdown')) {
    // Inject import at the top
    c = "import ReactMarkdown from 'react-markdown';\n" + c;
    fs.writeFileSync(f, c);
    fixedCount++;
    console.log('Added ReactMarkdown import to ' + path.basename(f));
  }
});

console.log('Fixed ' + fixedCount + ' files missing ReactMarkdown.');
