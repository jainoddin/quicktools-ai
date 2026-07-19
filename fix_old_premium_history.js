const fs = require('fs');
const path = require('path');

const targetFiles = [
  'frontend/components/ai-app-architecture/AiAppArchitectureClient.tsx',
  'frontend/components/ai-business-plan/AiBusinessPlanClient.tsx',
  'frontend/components/ai-course-creator/AiCourseCreatorClient.tsx',
  'frontend/components/ai-ebook-writer/AiEbookWriterClient.tsx',
  'frontend/components/ai-grant-proposal/AiGrantProposalClient.tsx',
  'frontend/components/ai-legal-template/AiLegalTemplateClient.tsx',
  'frontend/components/ai-pitch-deck/AiPitchDeckClient.tsx',
  'frontend/components/ai-sales-funnel/AiSalesFunnelClient.tsx',
  'frontend/components/ai-seo-topical-map/AiSeoTopicalMapClient.tsx',
  'frontend/components/ai-social-calendar/AiSocialCalendarClient.tsx'
];

let count = 0;
targetFiles.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (!fs.existsSync(fullPath)) return;
  
  let c = fs.readFileSync(fullPath, 'utf8');
  let modified = false;

  // 1. Add handleToggleFavorite and handleDeleteHistory functions after copyToClipboard
  if (!c.includes('handleToggleFavorite')) {
    // We can infer toolSlug from the filename: "AiGrantProposalClient" -> "ai-grant-proposal"
    const basename = path.basename(f, 'Client.tsx'); // "AiGrantProposal"
    // Convert camelCase to kebab-case
    const toolSlug = basename.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    
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
    if (c.includes('const copyToClipboard')) {
      c = c.replace('  const copyToClipboard', `${newFunctions}  const copyToClipboard`);
    } else {
      // Just put it before the return
      c = c.replace('  return (', `${newFunctions}  return (`);
    }
    modified = true;
  }

  // 2. Add isStarred to history items when loading from backend
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
    
    // For authenticated add, we have multiple variations depending on the tool
    if (c.includes('setToolHistory([{ id: Date.now(), prompt: input, result: data.text, date: new Date().toLocaleDateString() }, ...toolHistory])')) {
      c = c.replace(
        /setToolHistory\(\[{ id: Date\.now\(\), prompt: input, result: data\.text, date: new Date\(\)\.toLocaleDateString\(\) }, \.\.\.toolHistory\]\)/g,
        `setToolHistory([{ id: data.usageId || Date.now().toString(), prompt: input, result: data.text, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false }, ...toolHistory])`
      );
    }
    
    // Some tools might use different variable names (e.g., ai-legal-template might use 'type' or something). 
    // Let's do a generic replace for any setToolHistory that looks like this:
    c = c.replace(
        /setToolHistory\(\[\{\s*id: Date\.now\(\),\s*prompt:\s*input,\s*result:\s*(.*?),\s*date:\s*new Date\(\)\.toLocaleDateString\(\)\s*\}\,\s*\.\.\.toolHistory\]\)/g,
        `setToolHistory([{ id: (typeof data !== 'undefined' && data.usageId) ? data.usageId : Date.now().toString(), prompt: input, result: $1, date: new Date().toLocaleDateString(), createdAt: new Date().toISOString(), isStarred: false }, ...toolHistory])`
    );
    modified = true;
  }

  // 4. Fix ToolHistorySidebar to pass onToggleFavorite, onDelete, and onSelect
  if (!c.includes('onToggleFavorite={handleToggleFavorite}')) {
    // If it has old onBack/onDelete props
    if (c.includes('onDelete={')) {
      c = c.replace(
        /onBack=\{.*?setShowHistory\(false\).*?\}\s+onDelete=\{.*?\}\s+\/>/g,
        `onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
            onSelect={(item) => { setResult(item.result); setInput(item.prompt); setShowHistory(false); }}
          />`
      );
    } else {
      // It might just have onBack
      c = c.replace(
        /onBack=\{.*?setShowHistory\(false\).*?\}\s*\/>/g,
        `onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
            onSelect={(item) => { setResult(item.result); setInput(item.prompt); setShowHistory(false); }}
          />`
      );
    }
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(fullPath, c);
    count++;
    console.log(`✅ Fixed old premium tool: ${path.basename(f)}`);
  }
});

console.log(`\nFixed ${count} files total.`);
