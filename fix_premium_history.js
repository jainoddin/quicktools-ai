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

  // 1. Add handleToggleFavorite and handleDeleteHistory functions after copyToClipboard
  if (!c.includes('handleToggleFavorite')) {
    // Extract the toolSlug from the file
    const slugMatch = c.match(/toolSlug: '([^']+)'/);
    if (!slugMatch) return;
    const toolSlug = slugMatch[1];
    const localStorageKey = `${toolSlug}_history`;

    const newFunctions = `
  const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => prev.map(item => 
      (item.id === id || item._id === id) ? { ...item, isStarred: !item.isStarred } : item
    ));
    if (!isAuthenticated) {
      const updated = toolHistory.map(item => 
        (item.id === id || item._id === id) ? { ...item, isStarred: !item.isStarred } : item
      );
      localStorage.setItem('${localStorageKey}', JSON.stringify(updated));
    } else {
      try {
        await fetch(getEndpoint(\`/api/user/usage/\${id}/favorite\`), { method: 'PATCH', credentials: 'include' });
      } catch (err) { console.error('Failed to toggle favorite', err); }
    }
  };

  const handleDeleteHistory = async (ids: string[]) => {
    setToolHistory(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));
    if (!isAuthenticated) {
      const updated = toolHistory.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem('${localStorageKey}', JSON.stringify(updated));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids })
        });
      } catch (err) { console.error('Failed to delete history', err); }
    }
  };

`;
    // Insert before "const copyToClipboard"
    c = c.replace('  const copyToClipboard', `${newFunctions}  const copyToClipboard`);
    modified = true;
  }

  // 2. Add isStarred to history items when loading from backend
  // The current code maps items without isStarred - fix it
  if (c.includes('result: item.result,\n              date: new Date(item.createdAt').includes && !c.includes('isStarred: item.isStarred')) {
    c = c.replace(
      /\.map\(\(item: any\) => \({\s+id: item\._id,\s+prompt: item\.prompt,\s+result: item\.result,\s+date: new Date\(item\.createdAt\)\.toLocaleDateString\(\),\s+\}\)\)/g,
      `.map((item: any) => ({
              id: item._id,
              prompt: item.prompt,
              result: item.result,
              date: new Date(item.createdAt).toLocaleDateString(),
              createdAt: item.createdAt,
              isStarred: item.isStarred || false,
            }))`
    );
    modified = true;
  }

  // 3. Also add isStarred to history items when adding after generation
  if (!c.includes('isStarred: false') && c.includes('id: Date.now(), prompt: input, result: data.text')) {
    c = c.replace(
      /const newItem = { id: Date\.now\(\), prompt: input, result: data\.text, date: new Date\(\)\.toLocaleDateString\(\) };/g,
      `const newItem = { id: Date.now().toString(), prompt: input, result: data.text, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false };`
    );
    // Also fix the authenticated add
    c = c.replace(
      /setToolHistory\(\[{ id: Date\.now\(\), prompt: input, result: data\.text, date: new Date\(\)\.toLocaleDateString\(\) }, \.\.\.toolHistory\]\)/g,
      `setToolHistory([{ id: data.usageId || Date.now().toString(), prompt: input, result: data.text, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false }, ...toolHistory])`
    );
    modified = true;
  }

  // 4. Fix ToolHistorySidebar to pass onToggleFavorite and onDelete
  if (!c.includes('onToggleFavorite={handleToggleFavorite}')) {
    c = c.replace(
      /onBack=\{.*?setShowHistory\(false\).*?\}\s+onDelete=\{.*?\}\s+\/>/g,
      `onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
          />`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(f, c);
    count++;
    console.log(`✅ Fixed ${path.basename(f)}`);
  }
});

console.log(`\nFixed ${count} files total.`);
