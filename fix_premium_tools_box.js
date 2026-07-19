/**
 * fix_premium_tools_box.js
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

const premiumTools = [
  'ai-app-architecture',
  'ai-business-plan',
  'ai-course-creator',
  'ai-ebook-writer',
  'ai-grant-proposal',
  'ai-legal-template',
  'ai-pitch-deck',
  'ai-sales-funnel',
  'ai-seo-topical-map',
  'ai-social-calendar'
];

for (const dirName of premiumTools) {
  const dirPath = path.join(componentsDir, dirName);
  const files = fs.readdirSync(dirPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (!clientFile) continue;
  
  const filePath = path.join(dirPath, clientFile);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace main tag
  content = content.replace(/<main className="flex-grow bg-white border border-\[#E5E7EB\] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-\[600px\] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">/, '<main className="flex-grow flex flex-col min-w-0">');

  // Find the exact place where we transition from `{showHistory ?` to the empty state.
  // In premium tools, there is NO top-level header outside the main box yet. We need to extract the header from the empty state, put it outside, and replace the empty state with the "Ready to generate" template.

  // Let's just regenerate the premium tools with node generate_premium_tools.js after updating generate_premium_tools.js!
}
