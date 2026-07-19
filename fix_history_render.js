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

  // Skip if it doesn't have showHistory state
  if (!c.includes('showHistory')) return;

  // Skip if it already conditionally renders ToolHistorySidebar correctly wrapping main
  if (c.includes('{showHistory ? (')) return;

  // We need to replace the direct <main ...> tag with a conditional render
  // and close it properly at the end of the file.

  // 1. Find <main className="flex-grow flex flex-col min-w-0">
  // We'll replace it with:
  // {showHistory ? (
  //   <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
  //     <ToolHistorySidebar ... />
  //   </div>
  // ) : (
  //   <main ...>

  const toolNameMatch = c.match(/filename="([^"]+)"/);
  const toolName = toolNameMatch ? toolNameMatch[1] : 'Tool';

  const replacementStart = `{showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="${toolName}"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onDelete={() => {}}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">`;

  // We replace `<main className="flex-grow flex flex-col min-w-0">`
  if (c.includes('<main className="flex-grow flex flex-col min-w-0">')) {
    c = c.replace('<main className="flex-grow flex flex-col min-w-0">', replacementStart);

    // We also need to close the ternary at the end, replacing `</main>` with `</main>\n      )}`
    c = c.replace('</main>', '</main>\n      )}');
    
    fs.writeFileSync(f, c);
    count++;
    console.log(`✅ Fixed history render in ${path.basename(f)}`);
  }
});

console.log(`Fixed ${count} files.`);
