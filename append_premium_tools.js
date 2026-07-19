const fs = require('fs');

const premiumTools = [
  { slug: 'ai-business-plan', name: 'AI Business Plan Generator', desc: 'Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.', icon: 'Briefcase', color: 'bg-[#F59E0B]', category: 'Business' },
  { slug: 'ai-sales-funnel', name: 'AI Sales Funnel Copywriter', desc: 'Write landing page copy, email sequences, and ad copy all at once.', icon: 'Megaphone', color: 'bg-[#EF4444]', category: 'Marketing' },
  { slug: 'ai-ebook-writer', name: 'AI E-Book Writer', desc: 'Generate chapter-by-chapter outlines and content for an entire e-book.', icon: 'BookOpen', color: 'bg-[#8B5CF6]', category: 'Writing' },
  { slug: 'ai-course-creator', name: 'AI Course Curriculum Creator', desc: 'Generate a full 4-week course syllabus, lesson plans, and quizzes.', icon: 'GraduationCap', color: 'bg-[#10B981]', category: 'Education' },
  { slug: 'ai-seo-topical-map', name: 'AI SEO Topical Map Builder', desc: 'Generate a full SEO content cluster map for an entire month for a niche.', icon: 'Map', color: 'bg-[#06B6D4]', category: 'SEO' },
  { slug: 'ai-pitch-deck', name: 'AI Pitch Deck Generator', desc: 'Generate slide-by-slide text, data points, and script for a startup pitch deck.', icon: 'Presentation', color: 'bg-[#6366F1]', category: 'Business' },
  { slug: 'ai-app-architecture', name: 'AI App Architecture Planner', desc: 'Generate the full tech stack, database schema, and API endpoints documentation for a new app.', icon: 'Database', color: 'bg-[#3B82F6]', category: 'Development' },
  { slug: 'ai-grant-proposal', name: 'AI Grant Proposal Writer', desc: 'Write professional grant proposals for non-profits and startups.', icon: 'FileText', color: 'bg-[#14B8A6]', category: 'Writing' },
  { slug: 'ai-legal-template', name: 'AI Legal Template Drafter', desc: 'Generate standard boilerplate templates for NDAs, Freelance agreements, etc.', icon: 'Scale', color: 'bg-[#64748B]', category: 'Business' },
  { slug: 'ai-social-calendar', name: 'AI Social Media Calendar', desc: 'Generate a 30-day multi-channel marketing calendar with specific daily posts.', icon: 'CalendarDays', color: 'bg-[#EC4899]', category: 'Marketing' },
];

const filePath = 'frontend/components/tools/ToolsClient.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Update imports
const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/;
const importMatch = content.match(importRegex);
if (importMatch) {
  let imports = importMatch[1].split(',').map(i => i.trim());
  
  // Icons needed for premium tools
  const neededIcons = ['Briefcase', 'Megaphone', 'BookOpen', 'GraduationCap', 'Map', 'Presentation', 'Database', 'FileText', 'Scale', 'CalendarDays', 'Crown'];
  neededIcons.forEach(icon => {
    if (!imports.includes(icon)) imports.push(icon);
  });
  
  const newImports = `import { ${imports.join(', ')} } from 'lucide-react';`;
  content = content.replace(importRegex, newImports);
}

// Update IconMap
const iconMapRegex = /const IconMap:\s*Record<string,\s*any>\s*=\s*{([^}]+)}/;
const iconMapMatch = content.match(iconMapRegex);
if (iconMapMatch) {
  let iconMapContent = iconMapMatch[1];
  
  const neededIcons = ['Briefcase', 'Megaphone', 'BookOpen', 'GraduationCap', 'Map', 'Presentation', 'Database', 'FileText', 'Scale', 'CalendarDays', 'Crown'];
  neededIcons.forEach(icon => {
    if (!iconMapContent.includes(`${icon}: ${icon}`)) {
      iconMapContent += `,\n  ${icon}: ${icon}`;
    }
  });
  
  content = content.replace(iconMapRegex, `const IconMap: Record<string, any> = {${iconMapContent}}`);
}

// Ensure the Premium icon (Crown) is visible on premium tools in the UI
// In ToolsClient.tsx, in the mapped tool card, we can check if the tool is premium by a property, e.g., isPremium: true.
// Wait, the user already said "paid tools". Let's add isPremium: true to these tools.

let newTools = premiumTools.map(t => `
  {
    name: "${t.name}",
    description: "${t.desc}",
    iconName: "${t.icon}",
    color: "${t.color}",
    slug: "/tools/${t.slug}",
    category: "${t.category}",
    isPremium: true,
    createdAt: new Date().toISOString()
  }`).join(',');

// Insert into allTools array
// Find the closing bracket of allTools array
const allToolsRegex = /export const allTools = \[([\s\S]*?)\];/;
const allToolsMatch = content.match(allToolsRegex);

if (allToolsMatch) {
  const existingTools = allToolsMatch[1];
  const updatedTools = existingTools + (existingTools.trim().endsWith(',') ? '' : ',') + newTools;
  content = content.replace(allToolsRegex, `export const allTools = [${updatedTools}];`);
}

// Modify the Tool Card to show a Crown icon if isPremium is true
// Let's find the card rendering part: <div className="absolute top-4 right-4 flex gap-2">
if (!content.includes('tool.isPremium &&')) {
  const isPremiumIndicator = `
            {tool.isPremium && (
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-yellow-200 shadow-sm">
                <Crown className="w-3 h-3 text-yellow-600" /> Premium
              </span>
            )}`;
  
  // Assuming there's a span for isFree, we can insert the premium indicator right before it or near it.
  content = content.replace(
    /\{tool\.isFree && \(/,
    `${isPremiumIndicator}\n            {tool.isFree && (`
  );
}

fs.writeFileSync(filePath, content);
console.log('ToolsClient.tsx updated with 10 Premium Tools.');
