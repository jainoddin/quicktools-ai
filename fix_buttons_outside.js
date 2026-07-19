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
    if (i.isDirectory()) res.push(...getFiles(p));
    else if (p.endsWith('Client.tsx')) res.push(p);
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

  // ====== FIX 1: Fix description text - replace wrong description ======
  // We match any description inside the desc paragraph and replace with correct one
  c = c.replace(
    /(<p className="text-\[#6B7280\] text-sm lg:text-base mt-2">\s*)([^<]+?)(\s*<\/p>)/,
    (match, before, existingDesc, after) => {
      const trimmed = existingDesc.trim();
      // Only replace if it's a known-wrong description or empty
      if (trimmed !== toolDesc) {
        return before + toolDesc + after;
      }
      return match;
    }
  );

  // ====== FIX 2: Move buttons OUTSIDE the box to BOTTOM ======
  // Current layout: white box contains buttons (inside) + scrollable content
  // Target layout:  white box contains ONLY scrollable content, buttons are OUTSIDE below box
  
  // Pattern to find the result box with buttons inside:
  const boxWithButtonsPattern = /(\{isProcessing \? \([\s\S]*?\) : result \? \(\s*)<>\s*<div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-\[#E5E7EB\]">([\s\S]*?)<\/div>\s*<div className="flex-grow overflow-y-auto([\s\S]*?)<\/div>\s*<\/>\s*\) : \(/s;
  
  const match = c.match(boxWithButtonsPattern);
  if (match) {
    // Extract the buttons content
    const buttonsContent = match[2];
    
    // Remove buttons from inside the box - replace result section inside box
    c = c.replace(
      /<> *\n?\s*<div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-\[#E5E7EB\]">([\s\S]*?)<\/div>\s*<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">([\s\S]*?)<\/div>\s*<\/>/s,
      (match, btns, content) => {
        return `<div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">${content}</div>`;
      }
    );
    
    // Move buttons outside the box, after the closing </div> of the white box
    // The white box closes with </div> and then ) : (\n ...empty state...
    // We need to add the buttons AFTER the box's closing tag when result is available
    // Find: </div>\n        </main>  and insert before </main>
    c = c.replace(
      /(<\/div>\s*)(        <\/main>)/,
      (match, closingDiv, mainClose) => {
        const buttonsJsx = `
          {/* Action Buttons - Outside box at bottom */}
          {result && !isProcessing && (
            <div className="flex flex-wrap items-center gap-3 mt-4">
              ${buttonsContent}
            </div>
          )}
`;
        return closingDiv + buttonsJsx + mainClose;
      }
    );
    
    console.log(`✅ Moved buttons outside for ${toolName}`);
    fixedCount++;
  } else {
    console.log(`⚠ Pattern not found for ${toolName}`);
  }

  fs.writeFileSync(f, c);
});

console.log(`\nDone! Fixed ${fixedCount} files.`);
