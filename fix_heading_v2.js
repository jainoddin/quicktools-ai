const fs = require('fs');
const path = require('path');

// Load tools data
const toolsData = JSON.parse(fs.readFileSync('tools_data.json', 'utf8'));

// Map from component dir name to tool slug (exact slugs from tools_data.json)
const dirToSlug = {
  'ai-ad-copy': 'ai-ad-copy',
  'ai-apology-letter': 'ai-apology-letter',
  'ai-app-architecture': 'ai-app-architecture',
  'ai-article-outline-generator': 'ai-article-outline-generator',
  'ai-blog-idea-generator': 'ai-blog-idea-generator',
  'ai-business-name-generator': 'ai-business-name-generator',
  'ai-business-plan': 'ai-business-plan',
  'ai-caption-generator': 'ai-caption-generator',
  'ai-code-explainer': 'ai-code-explainer',
  'ai-course-creator': 'ai-course-creator',
  'ai-cover-letter': 'ai-cover-letter',
  'ai-dream-interpreter': 'ai-dream-interpreter',
  'ai-ebook-writer': 'ai-ebook-writer',
  'ai-elevator-pitch': 'ai-elevator-pitch',
  'ai-email-generator': 'ai-email-generator',
  'ai-emoji-translator': 'ai-emoji-translator',
  'ai-event-planner': 'ai-event-planner',
  'ai-gift-idea-generator': 'ai-gift-idea',
  'ai-git-command': 'ai-git-command',
  'ai-grammar-checker': 'ai-grammar-checker',
  'ai-grant-proposal': 'ai-grant-proposal',
  'ai-hashtag-generator': 'ai-hashtag-generator',
  'ai-hook-generator': 'ai-hook-generator',
  'ai-interview-questions': 'ai-interview-questions',
  'ai-job-description': 'ai-job-description',
  'ai-legal-template': 'ai-legal-template',
  'ai-linkedin-bio': 'ai-linkedin-bio',
  'ai-meal-planner': 'ai-meal-planner',
  'ai-paraphraser': 'ai-paraphraser',
  'ai-pitch-deck': 'ai-pitch-deck',
  'ai-poem-generator': 'ai-poem-generator',
  'ai-product-description': 'ai-product-description',
  'ai-quote-generator': 'ai-quote-generator',
  'ai-real-estate-listing': 'ai-real-estate-listing',
  'ai-recipe-generator': 'ai-recipe-generator',
  'ai-resignation-letter': 'ai-resignation-letter',
  'ai-resume-builder': 'ai-resume-builder',
  'ai-review-responder': 'ai-review-responder',
  'ai-sales-funnel': 'ai-sales-funnel',
  'ai-seo-meta': 'ai-seo-meta-generator',
  'ai-seo-topical-map': 'ai-seo-topical-map',
  'ai-slogan-generator': 'ai-slogan-generator',
  'ai-social-calendar': 'ai-social-calendar',
  'ai-sql-generator': 'ai-sql-generator',
  'ai-story-generator': 'ai-story-generator',
  'ai-summarizer': 'ai-summarizer',
  'ai-translator': 'ai-translator',
  'ai-travel-planner': 'ai-travel-planner',
  'ai-tweet-thread': 'ai-tweet-thread',
  'ai-video-script': 'ai-video-script',
  'ai-workout-generator': 'ai-workout-plan',
  'ai-youtube-tags': 'ai-youtube-tags',
  'ai-youtube-title': 'ai-youtube-title',
  'regex-generator': 'ai-regex-generator',
};

function extractHexColor(colorStr) {
  // e.g. "bg-[#6D5EF8] text-white" => "#6D5EF8"
  const m = colorStr.match(/#([0-9A-Fa-f]{6})/);
  return m ? '#' + m[1] : '#6D5EF8';
}

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
    console.log('No tool data for: ' + dirName + ' -> ' + slug);
    return;
  }
  
  let c = fs.readFileSync(f, 'utf8');
  const toolName = tool.name;
  const toolDesc = tool.description;
  const toolColor = extractHexColor(tool.color);
  
  let changed = false;

  // Fix 1: Fix the h1 heading text and Sparkles color
  // The broken h1 looks like: <h1 ...>  <Sparkles .../></h1>   (text missing before Sparkles)
  // OR: <h1 ...> AI Ad Copy <Sparkles style={{color:'#111827'}} /></h1>  (wrong color)
  c = c.replace(
    /<h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-\[#111827\] flex items-center gap-2">\s*(.*?)\s*<Sparkles className="w-6 h-6"\s*style=\{\{\s*color:\s*'[#A-Za-z0-9]+'\s*\}\}\s*\/>\s*<\/h1>/s,
    (match, textPart) => {
      const text = textPart.trim();
      const needsText = !text || text.length < 3;
      const newText = needsText ? toolName : text;
      return `<h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">${newText} <Sparkles className="w-6 h-6" style={{ color: '${toolColor}' }} /></h1>`;
    }
  );

  // Fix 2: Fix description - if wrong/empty fix it
  c = c.replace(
    /(<p className="text-\[#6B7280\] text-sm lg:text-base mt-2">\s*)([^<]{0,10})(\s*<\/p>)/,
    (match, before, text, after) => {
      if (text.trim().length < 5) {
        changed = true;
        return before + toolDesc + after;
      }
      return match;
    }
  );

  // Fix 3: Fix Download button color - should use toolColor not #111827
  // In the result box: style={{ backgroundColor: '#111827' }} next to downloadAsPDF
  c = c.replace(
    /(downloadAsPDF[^}]+\}[^>]*>[\s\S]{0,100}style=\{\{ backgroundColor: ')#111827(' \}\})/,
    `$1${toolColor}$2`
  );

  fs.writeFileSync(f, c);
  fixedCount++;
  console.log(`✅ Fixed ${toolName} (color: ${toolColor})`);
});

console.log(`\nDone! Fixed ${fixedCount} files.`);
