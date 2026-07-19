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

const allFiles = getFiles(path.join(__dirname, 'frontend/components'));
let count = 0;

allFiles.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let modified = false;

  // Only target the 50 premium tools (they either have /api/tools/generate-premium OR are one of the 10 old ones)
  const isPremium = c.includes('handleToggleFavorite') || c.includes('generate-premium');
  if (!isPremium) return;
  
  const basename = path.basename(f, 'Client.tsx');
  const toolSlug = basename.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  const localStorageKey = `${toolSlug}_history`;

  // Fix 1: Robust handleToggleFavorite
  if (c.includes('handleToggleFavorite')) {
    const robustToggle = `  const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => {
      const updated = prev.map(item => 
        (String(item.id) === String(id) || String(item._id) === String(id)) ? { ...item, isStarred: !item.isStarred } : item
      );
      if (!isAuthenticated) {
        localStorage.setItem('${localStorageKey}', JSON.stringify(updated));
      }
      return updated;
    });
    if (isAuthenticated) {
      try {
        await fetch(getEndpoint(\`/api/user/usage/\${id}/favorite\`), { method: 'PATCH', credentials: 'include' });
      } catch (err) { console.error('Failed to toggle favorite', err); }
    }
  };`;
    
    // Replace the old handleToggleFavorite with the robust one
    const oldToggleRegex = /const handleToggleFavorite = async \(id: string\) => \{[\s\S]*?catch \(err\) \{ console\.error\('Failed to toggle favorite', err\); \}\s*\}\s*\};\s*/;
    if (oldToggleRegex.test(c)) {
      c = c.replace(oldToggleRegex, robustToggle + '\n\n');
      modified = true;
    }
  }

  // Fix 2: Add missing TextDownloadModal to the 10 old tools (and any that are missing it)
  if (c.includes('showDownloadModal') && !c.includes('<TextDownloadModal')) {
    // We need to inject the modal right before the final closing div
    const modalJSX = `      <TextDownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        content={result} 
        filename="${basename.replace(/([A-Z])/g, ' $1').trim()}" 
        toolSlug="${toolSlug}" 
        elementId="result-content" 
      />\n    </div>\n  );\n}`;
      
    c = c.replace(/<\/div>\s*<\/main>\s*<\/div>\s*\);\s*\}\s*$/, `        </main>\n      </div>\n${modalJSX}`);
    // Actually, the structure might be different, let's just replace the very last `</div>\n  );\n}`
    c = c.replace(/<\/div>\s*\);\s*\}\s*$/, `${modalJSX}`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(f, c);
    count++;
    console.log(`✅ Robust fix applied to: ${path.basename(f)}`);
  }
});

console.log(`\nFixed ${count} files total.`);
