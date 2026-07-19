const fs = require('fs');

const c = fs.readFileSync('frontend/components/tools/ToolsClient.tsx', 'utf8');
const matches = c.match(/name: "AI/g);
console.log('Tools in ToolsClient:', matches ? matches.length : 0);

// Also find where the tools array ends
const lastTool = c.lastIndexOf('isPremium: true');
console.log('Last isPremium position:', lastTool);
console.log('Context:', c.substring(lastTool, lastTool + 200));
