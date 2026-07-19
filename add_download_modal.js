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
  'ai-seo-meta-generator': 'ai-seo-meta-generator',
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

function getFiles(dir) {
  let res = [];
  fs.readdirSync(dir, {withFileTypes: true}).forEach(i => {
    const p = path.join(dir, i.name);
    if (i.isDirectory()) res.push(...getFiles(p));
    else if (p.endsWith('Client.tsx')) res.push(p);
  });
  return res;
}

let count = 0;
getFiles(path.join(__dirname, 'frontend/components')).forEach(f => {
  const dirName = path.basename(path.dirname(f));
  const slug = dirToSlug[dirName];
  if (!slug) return;
  const tool = toolsData.find(t => t.slug === slug);
  if (!tool) return;
  
  let c = fs.readFileSync(f, 'utf8');

  // Skip if already added
  if (c.includes('TextDownloadModal')) return;
  // Make sure it's a tool that has downloadAsPDF
  if (!c.includes('downloadAsPDF')) return;

  // 1. Import
  c = c.replace(
    /(import .* from 'lucide-react';)/,
    `$1\nimport TextDownloadModal from '@/components/shared/TextDownloadModal';`
  );

  // 2. Add state
  c = c.replace(
    /(const \[copied, setCopied\] = useState\(false\);)/,
    `$1\n  const [showDownloadModal, setShowDownloadModal] = useState(false);`
  );
  // Alternative fallback if copied state is slightly different
  if (!c.includes('const [showDownloadModal')) {
    c = c.replace(
      /(const \[isProcessing, setIsProcessing\] = useState\(false\);)/,
      `$1\n  const [showDownloadModal, setShowDownloadModal] = useState(false);`
    );
  }

  // 3. Add id="result-content" to the prose div
  c = c.replace(
    /<div className="prose /g,
    `<div id="result-content" className="prose `
  );

  // 4. Update the Download button onClick
  let filenameMatch = c.match(/onClick=\{\(\) => downloadAsPDF\(result, '([^']+)'\)\}/);
  let filename = filenameMatch ? filenameMatch[1] : tool.name;
  
  c = c.replace(
    /onClick=\{\(\) => downloadAsPDF\(result, '[^']+'\)\}/,
    `onClick={() => setShowDownloadModal(true)}`
  );

  // 5. Add the Modal at the very end of the component before the last </div>
  // Find the last </div> in the file (assuming it's the root component container)
  const modalJsx = `
      <TextDownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        content={result} 
        filename="${filename}" 
        toolSlug="${slug}" 
        elementId="result-content" 
      />
    </div>
  );
}`;
  
  c = c.replace(/<\/div>\s*\);\s*\}\s*$/, modalJsx);

  fs.writeFileSync(f, c);
  count++;
  console.log(`✅ Added Download Modal to ${tool.name}`);
});

console.log(`Updated ${count} files.`);
