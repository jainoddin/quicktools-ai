const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = JSON.parse(fs.readFileSync('tools_data.json', 'utf8'));

// Map from component dir name to tool slug
const dirToSlug = {
  'ai-ad-copy': 'ai-ad-copy',
  'ai-apology-letter': 'ai-apology-letter',
  'ai-app-architecture': 'ai-app-architecture-planner',
  'ai-article-outline-generator': 'ai-article-outline-generator',
  'ai-blog-idea-generator': 'ai-blog-idea-generator',
  'ai-business-name-generator': 'ai-business-name-generator',
  'ai-business-plan': 'ai-business-plan-generator',
  'ai-caption-generator': 'ai-caption-generator',
  'ai-code-explainer': 'ai-code-explainer',
  'ai-course-creator': 'ai-course-creator',
  'ai-cover-letter': 'ai-cover-letter-generator',
  'ai-dream-interpreter': 'ai-dream-interpreter',
  'ai-ebook-writer': 'ai-ebook-writer',
  'ai-elevator-pitch': 'ai-elevator-pitch',
  'ai-email-generator': 'ai-email-generator',
  'ai-emoji-translator': 'ai-emoji-translator',
  'ai-event-planner': 'ai-event-planner',
  'ai-gift-idea-generator': 'ai-gift-idea-generator',
  'ai-git-command': 'ai-git-command-generator',
  'ai-grammar-checker': 'ai-grammar-checker',
  'ai-grant-proposal': 'ai-grant-proposal-writer',
  'ai-hashtag-generator': 'ai-hashtag-generator',
  'ai-hook-generator': 'ai-hook-generator',
  'ai-interview-questions': 'ai-interview-questions-generator',
  'ai-job-description': 'ai-job-description-generator',
  'ai-legal-template': 'ai-legal-template-generator',
  'ai-linkedin-bio': 'ai-linkedin-bio-generator',
  'ai-meal-planner': 'ai-meal-planner',
  'ai-paraphraser': 'ai-paraphraser',
  'ai-pitch-deck': 'ai-pitch-deck-creator',
  'ai-poem-generator': 'ai-poem-generator',
  'ai-product-description': 'ai-product-description',
  'ai-quote-generator': 'ai-quote-generator',
  'ai-real-estate-listing': 'ai-real-estate-listing',
  'ai-recipe-generator': 'ai-recipe-generator',
  'ai-resignation-letter': 'ai-resignation-letter',
  'ai-resume-builder': 'ai-resume-builder',
  'ai-review-responder': 'ai-review-responder',
  'ai-sales-funnel': 'ai-sales-funnel-builder',
  'ai-seo-meta': 'ai-seo-meta-generator',
  'ai-seo-topical-map': 'ai-seo-topical-map',
  'ai-slogan-generator': 'ai-slogan-generator',
  'ai-social-calendar': 'ai-social-media-calendar',
  'ai-sql-generator': 'ai-sql-generator',
  'ai-story-generator': 'ai-story-generator',
  'ai-summarizer': 'ai-summarizer',
  'ai-translator': 'ai-translator',
  'ai-travel-planner': 'ai-travel-planner',
  'ai-tweet-thread': 'ai-tweet-thread-generator',
  'ai-video-script': 'ai-video-script-generator',
  'ai-workout-generator': 'ai-workout-generator',
  'ai-writer': 'ai-writer',
  'ai-youtube-tags': 'ai-youtube-tags-generator',
  'ai-youtube-title': 'ai-youtube-title-generator',
  'regex-generator': 'ai-regex-generator',
};

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir, {withFileTypes: true}).forEach(i => {
    const p = path.join(dir, i.name);
    if(i.isDirectory()) res.push(...getFiles(p));
    else if(p.endsWith('Client.tsx')) res.push(p);
  });
  return res;
}

let fixedCount = 0;

getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  const dirName = path.basename(path.dirname(f));
  const slug = dirToSlug[dirName];
  if (!slug) return;
  
  const tool = toolsData.find(t => t.slug === slug);
  if (!tool) {
    console.log('No tool data for slug: ' + slug);
    return;
  }
  
  let c = fs.readFileSync(f, 'utf8');
  const toolName = tool.name;
  const toolDesc = tool.description;
  const toolColor = tool.color;
  
  // Fix 1: Fix the h1 heading - the super_fix.js left h1 with only Sparkles icon and no text
  // Pattern: <h1 ...> [text] <Sparkles .../>  </h1>  - the text might be empty
  const h1Pattern = /<h1[^>]*>(\s*)(.*?)\s*(<Sparkles[^/]*\/>)\s*<\/h1>/s;
  const h1Match = c.match(h1Pattern);
  
  if (h1Match) {
    const existingText = h1Match[2].trim();
    // If text is missing (just whitespace or nothing between start and sparkles)
    if (!existingText || existingText.length < 3) {
      c = c.replace(h1Pattern, 
        `<h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">${toolName} <Sparkles className="w-6 h-6" style={{ color: '${toolColor}' }} /></h1>`
      );
      console.log(`Fixed h1 for ${toolName}`);
      fixedCount++;
    }
    
    // Also fix the Sparkles color if it's #111827 (wrong, should be tool color)
    c = c.replace(/(<h1[^>]*>(?:[^<]*)<Sparkles[^>]*style=\{\{[^}]*color:\s*['"])#111827(['"][^}]*\}\})/g, 
      (match, before, after) => before + toolColor + after
    );
  }
  
  // Fix 2: Fix the description text - if it's wrong (comparing to tool.description)
  // Pattern: <p className="text-[#6B7280]...">SOME TEXT</p>
  const descPattern = /(<p className="text-\[#6B7280\][^"]*"[^>]*>)\s*([^<]+)\s*(<\/p>)/;
  const descMatch = c.match(descPattern);
  if (descMatch) {
    const existingDesc = descMatch[2].trim();
    if (existingDesc !== toolDesc && existingDesc.length < 5) {
      c = c.replace(descPattern, `$1${toolDesc}$3`);
      console.log(`Fixed description for ${toolName}`);
    }
  }
  
  // Fix 3: Fix Download button color - should be tool color not #111827
  // Pattern: style={{ backgroundColor: '#111827' }} on Download button
  c = c.replace(
    /(onClick=\{\(\) => downloadAsPDF[^}]+\}[^>]*>[\s\S]{0,200}?style=\{\{ backgroundColor: ')#111827(' \}\})/,
    `$1${toolColor}$2`
  );
  
  fs.writeFileSync(f, c);
});

console.log(`\nFixed ${fixedCount} files.`);
