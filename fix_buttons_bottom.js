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

let fixedCount = 0;

getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  let c = fs.readFileSync(f, 'utf8');

  // Find the block of Action Buttons outside the box
  const outsideButtonsRegex = /\{\/\* Action Buttons - Outside box at bottom \*\/\}\s*\{result && !isProcessing && \(\s*<div className="flex flex-wrap items-center gap-3 mt-4">([\s\S]*?)<\/div>\s*\)\}/;
  
  const match = c.match(outsideButtonsRegex);
  if (!match) {
    return;
  }
  const buttonsContent = match[1];

  // Remove the outside buttons block completely
  c = c.replace(outsideButtonsRegex, '');

  // Now find the result part inside the white box:
  // result ? (
  //   <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">
  //      <div className="prose ...">...</div>
  //   </div>
  // ) : (
  
  const resultRegex = /(result \? \(\s*)(<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">)([\s\S]*?)(<\/div>\s*\)\s*:\s*\()/;
  
  c = c.replace(resultRegex, (m, prefix, openingDiv, innerContent, suffix) => {
    // Add mb-6 to the scrollable div so it doesn't hug the border, and border-t for the buttons container
    return `${prefix}<>\n                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0 mb-6">${innerContent}</div>\n                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E7EB] shrink-0">\n                  ${buttonsContent.trim()}\n                </div>\n              </>\n            ) : (`;
  });

  fs.writeFileSync(f, c);
  fixedCount++;
  console.log(`✅ Moved buttons inside to bottom for ${path.basename(f)}`);
});

console.log(`\nDone! Fixed ${fixedCount} files.`);
