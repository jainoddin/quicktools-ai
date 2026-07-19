/**
 * add_interlinks.js
 * Adds "Explore Other Free Tools" sidebar section to all Client.tsx files that are missing it.
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

// Tool-specific related tools
const relatedToolsMap = {
  'AiStoryGeneratorClient': [
    { href: '/tools/ai-poem-generator', label: 'AI Poem Generator', desc: 'Write beautiful poems instantly', icon: 'PenLine', color: '#8B5CF6' },
    { href: '/tools/ai-blog-idea-generator', label: 'AI Blog Idea Generator', desc: 'Get creative blog topic ideas', icon: 'Lightbulb', color: '#F59E0B' },
  ],
  'AiApologyLetterClient': [
    { href: '/tools/ai-email-generator', label: 'AI Email Generator', desc: 'Write professional emails fast', icon: 'Mail', color: '#3B82F6' },
    { href: '/tools/ai-cover-letter', label: 'AI Cover Letter', desc: 'Create job-winning cover letters', icon: 'FileText', color: '#10B981' },
  ],
  'AiDreamInterpreterClient': [
    { href: '/tools/ai-story-generator', label: 'AI Story Generator', desc: 'Create creative short stories', icon: 'BookOpen', color: '#6D5EF8' },
    { href: '/tools/ai-poem-generator', label: 'AI Poem Generator', desc: 'Generate beautiful poems', icon: 'PenLine', color: '#8B5CF6' },
  ],
  'AiElevatorPitchClient': [
    { href: '/tools/ai-linkedin-bio', label: 'AI LinkedIn Bio', desc: 'Write a powerful LinkedIn bio', icon: 'User', color: '#0077B5' },
    { href: '/tools/ai-business-name-generator', label: 'Business Name Generator', desc: 'Find the perfect business name', icon: 'Building2', color: '#F97316' },
  ],
  'AiEmojiTranslatorClient': [
    { href: '/tools/ai-caption-generator', label: 'AI Caption Generator', desc: 'Generate viral social captions', icon: 'MessageSquare', color: '#EC4899' },
    { href: '/tools/ai-hashtag-generator', label: 'AI Hashtag Generator', desc: 'Find trending hashtags', icon: 'Hash', color: '#06B6D4' },
  ],
  'AiEventPlannerClient': [
    { href: '/tools/ai-travel-planner', label: 'AI Travel Planner', desc: 'Plan your perfect trip', icon: 'Plane', color: '#0EA5E9' },
    { href: '/tools/ai-meal-planner', label: 'AI Meal Planner', desc: 'Create healthy meal plans', icon: 'UtensilsCrossed', color: '#22C55E' },
  ],
  'AiGitCommandClient': [
    { href: '/tools/ai-code-explainer', label: 'AI Code Explainer', desc: 'Understand any code instantly', icon: 'FileCode2', color: '#8B5CF6' },
    { href: '/tools/ai-sql-generator', label: 'AI SQL Generator', desc: 'Write SQL queries from text', icon: 'Database', color: '#F59E0B' },
  ],
  'AiHashtagGeneratorClient': [
    { href: '/tools/ai-caption-generator', label: 'AI Caption Generator', desc: 'Generate viral social captions', icon: 'MessageSquare', color: '#EC4899' },
    { href: '/tools/ai-youtube-title', label: 'AI YouTube Title', desc: 'Write click-worthy video titles', icon: 'Youtube', color: '#EF4444' },
  ],
  'AiInterviewQuestionsClient': [
    { href: '/tools/ai-resume-builder', label: 'AI Resume Builder', desc: 'Build a professional resume', icon: 'FileText', color: '#6D5EF8' },
    { href: '/tools/ai-cover-letter', label: 'AI Cover Letter', desc: 'Create job-winning cover letters', icon: 'Mail', color: '#10B981' },
  ],
  'AiJobDescriptionClient': [
    { href: '/tools/ai-interview-questions', label: 'AI Interview Questions', desc: 'Generate role-specific questions', icon: 'Users', color: '#3B82F6' },
    { href: '/tools/ai-resume-builder', label: 'AI Resume Builder', desc: 'Build a professional resume', icon: 'FileText', color: '#6D5EF8' },
  ],
  'AiMealPlannerClient': [
    { href: '/tools/ai-recipe-generator', label: 'AI Recipe Generator', desc: 'Generate delicious recipes', icon: 'ChefHat', color: '#F97316' },
    { href: '/tools/ai-workout-plan', label: 'AI Workout Planner', desc: 'Create custom workout routines', icon: 'Dumbbell', color: '#EF4444' },
  ],
  'AiPoemGeneratorClient': [
    { href: '/tools/ai-story-generator', label: 'AI Story Generator', desc: 'Create creative short stories', icon: 'BookOpen', color: '#6D5EF8' },
    { href: '/tools/ai-quote-generator', label: 'AI Quote Generator', desc: 'Generate inspiring quotes', icon: 'Quote', color: '#F59E0B' },
  ],
  'AiRealEstateListingClient': [
    { href: '/tools/ai-product-description', label: 'AI Product Description', desc: 'Write product descriptions', icon: 'Package', color: '#6D5EF8' },
    { href: '/tools/ai-seo-meta-generator', label: 'AI SEO Meta Generator', desc: 'Optimize your SEO metadata', icon: 'Search', color: '#10B981' },
  ],
  'AiResignationLetterClient': [
    { href: '/tools/ai-apology-letter', label: 'AI Apology Letter', desc: 'Write sincere apology letters', icon: 'Mail', color: '#6D5EF8' },
    { href: '/tools/ai-cover-letter', label: 'AI Cover Letter', desc: 'Create job-winning cover letters', icon: 'FileText', color: '#10B981' },
  ],
  'AiReviewResponderClient': [
    { href: '/tools/ai-ad-copy', label: 'AI Ad Copy Generator', desc: 'Write converting ad copy', icon: 'Megaphone', color: '#F97316' },
    { href: '/tools/ai-email-generator', label: 'AI Email Generator', desc: 'Write professional emails fast', icon: 'Mail', color: '#3B82F6' },
  ],
  'AiSloganGeneratorClient': [
    { href: '/tools/ai-business-name-generator', label: 'Business Name Generator', desc: 'Find the perfect business name', icon: 'Building2', color: '#F97316' },
    { href: '/tools/ai-ad-copy', label: 'AI Ad Copy Generator', desc: 'Write converting ad copy', icon: 'Megaphone', color: '#EF4444' },
  ],
  'AiSqlGeneratorClient': [
    { href: '/tools/ai-code-explainer', label: 'AI Code Explainer', desc: 'Understand any code instantly', icon: 'FileCode2', color: '#8B5CF6' },
    { href: '/tools/ai-git-command', label: 'AI Git Command Helper', desc: 'Get the right Git commands', icon: 'GitBranch', color: '#F97316' },
  ],
  'AiTravelPlannerClient': [
    { href: '/tools/ai-event-planner', label: 'AI Event Planner', desc: 'Plan events effortlessly', icon: 'Calendar', color: '#F59E0B' },
    { href: '/tools/ai-meal-planner', label: 'AI Meal Planner', desc: 'Create healthy meal plans', icon: 'UtensilsCrossed', color: '#22C55E' },
  ],
  'AiVideoScriptClient': [
    { href: '/tools/ai-youtube-title', label: 'AI YouTube Title', desc: 'Write click-worthy video titles', icon: 'Youtube', color: '#EF4444' },
    { href: '/tools/ai-youtube-tags', label: 'AI YouTube Tags', desc: 'Find the best video tags', icon: 'Tag', color: '#F97316' },
  ],
  'AiYoutubeTagsClient': [
    { href: '/tools/ai-youtube-title', label: 'AI YouTube Title', desc: 'Write click-worthy video titles', icon: 'Youtube', color: '#EF4444' },
    { href: '/tools/ai-video-script', label: 'AI Video Script', desc: 'Write engaging video scripts', icon: 'Clapperboard', color: '#8B5CF6' },
  ],
};

function getAllClientFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...getAllClientFiles(fullPath));
    } else if (item.name.endsWith('Client.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllClientFiles(componentsDir);

let updatedCount = 0;

for (const file of files) {
  const basename = path.basename(file, '.tsx');
  
  if (!relatedToolsMap[basename]) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Skip if already has interlinks
  if (content.includes('Explore Other Free Tools')) {
    console.log(`  ✓ Already has interlinks: ${basename}`);
    continue;
  }
  
  // Find </aside> to insert before
  const asideClose = content.lastIndexOf('</aside>');
  if (asideClose === -1) {
    console.log(`  ⚠️ No </aside> found in ${basename}`);
    continue;
  }
  
  const tools = relatedToolsMap[basename];
  
  const toolLinks = tools.map(t => `            <a href="${t.href}" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[${t.color}]/5 rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[${t.color}]/30 group-hover:shadow-sm transition-all">
                <Sparkles className="w-4 h-4" style={{color:'${t.color}'}} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[${t.color}] transition-colors">${t.label}</p>
                <p className="text-[9px] text-[#6B7280]">${t.desc}</p>
              </div>
            </a>`).join('\n');
  
  const interlinkSection = `
        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
${toolLinks}
          </div>
        </div>
      `;
  
  content = content.slice(0, asideClose) + interlinkSection + content.slice(asideClose);
  
  fs.writeFileSync(file, content, 'utf-8');
  updatedCount++;
  console.log(`✅ Added interlinks to ${basename}`);
}

console.log(`\nDone! Added interlinks to ${updatedCount} files.`);
