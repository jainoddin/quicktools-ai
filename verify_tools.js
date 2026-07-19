const fs = require('fs');
const c = fs.readFileSync('frontend/components/tools/ToolsClient.tsx', 'utf8');
// Count all isPremium entries
const premiumMatches = c.match(/isPremium: true/g);
console.log('isPremium entries in ToolsClient:', premiumMatches ? premiumMatches.length : 0);

// Count total tool slugs to understand size 
const slugMatches = c.match(/slug: ["']/g);
console.log('Tool slugs:', slugMatches ? slugMatches.length : 0);
