const fs = require('fs');
const path = require('path');

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

  // Only target the 40 new premium tool clients (they use generate-premium endpoint)
  if (!c.includes('/api/tools/generate-premium')) return;

  let modified = false;

  // Add onSelect prop if missing
  if (!c.includes('onSelect={')) {
    c = c.replace(
      /onToggleFavorite=\{handleToggleFavorite\}/,
      `onSelect={(item) => { setResult(item.result); setInput(item.prompt); setShowHistory(false); }}
            onToggleFavorite={handleToggleFavorite}`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(f, c);
    count++;
    console.log(`✅ Fixed onSelect in ${path.basename(f)}`);
  }
});

console.log(`\nFixed ${count} files total.`);
