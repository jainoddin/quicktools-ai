const fs = require('fs');
const path = require('path');

const toolsData = JSON.parse(fs.readFileSync('tools_data.json', 'utf8'));

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
  if (!tool) return;
  
  let c = fs.readFileSync(f, 'utf8');
  const toolName = tool.name;
  const toolDesc = tool.description;
  const toolColor = extractHexColor(tool.color);
  
  // Fix 1: h1 heading - replace any Sparkles color value (including wrong full class string)
  c = c.replace(
    /<h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-\[#111827\] flex items-center gap-2">(.*?)<Sparkles className="w-6 h-6" style=\{\{ color: '([^']+)' \}\} \/><\/h1>/s,
    (match, textPart, existingColor) => {
      const text = textPart.trim();
      const newText = (!text || text.length < 3) ? toolName : text;
      return `<h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">${newText} <Sparkles className="w-6 h-6" style={{ color: '${toolColor}' }} /></h1>`;
    }
  );

  // Fix 2: Description text - only fix if it's the wrong default "Write beautiful poems instantly"
  c = c.replace(
    /(<p className="text-\[#6B7280\] text-sm lg:text-base mt-2">\s*)Write beautiful poems instantly(\s*<\/p>)/,
    `$1${toolDesc}$2`
  );
  c = c.replace(
    /(<p className="text-\[#6B7280\] text-sm lg:text-base mt-2">\s*)Write blogs & articles(\s*<\/p>)/,
    `$1${toolDesc}$2`
  );
  c = c.replace(
    /(<p className="text-\[#6B7280\] text-sm lg:text-base mt-2">\s*)Our team has been automatically notified about this issue.*?(\s*<\/p>)/s,
    `$1${toolDesc}$2`
  );

  // Fix 3: Download button color - replace backgroundColor: '#111827' inside downloadAsPDF area
  c = c.replace(
    /(onClick=\{[^}]*downloadAsPDF[^}]*\}[\s\S]{0,200}?style=\{\{ backgroundColor: ')#111827(' \}\})/,
    `$1${toolColor}$2`
  );

  // Fix 4: "Generated Result" h2 Sparkles color
  c = c.replace(
    /(<h2 className="text-xl font-extrabold text-\[#111827\] flex items-center gap-2">[\s\S]{0,20}<Sparkles className="w-6 h-6" style=\{\{ color: ')#111827(' \}\})/,
    `$1${toolColor}$2`
  );

  fs.writeFileSync(f, c);
  fixedCount++;
  console.log(`✅ ${toolName} (${toolColor})`);
});

console.log(`\nDone! Fixed ${fixedCount} files.`);
