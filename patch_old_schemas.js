const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'frontend/app/tools');
const dirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let updatedCount = 0;

dirs.forEach(toolSlug => {
  const pagePath = path.join(toolsDir, toolSlug, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, 'utf8');
  let changed = false;

  // 1. Fix Canonical URL
  if (content.includes(`canonical: '/tools/${toolSlug}'`)) {
    content = content.replace(`canonical: '/tools/${toolSlug}'`, `canonical: 'https://quicktool.space/tools/${toolSlug}'`);
    changed = true;
  } else if (content.includes(`canonical: "/tools/${toolSlug}"`)) {
    content = content.replace(`canonical: "/tools/${toolSlug}"`, `canonical: "https://quicktool.space/tools/${toolSlug}"`);
    changed = true;
  }

  // 2. Add JSON-LD Schema if missing
  if (!content.includes('application/ld+json')) {
    // Extract title & description for the schema
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    
    const title = titleMatch ? titleMatch[1] : `${toolSlug.replace(/-/g, ' ')} Tool`;
    const description = descMatch ? descMatch[1] : 'Premium AI tool by QuickTools.ai';

    const schemaStr = `{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "${title}",
      "operatingSystem": "Web",
      "applicationCategory": "WebApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "${description}",
      "url": "https://quicktool.space/tools/${toolSlug}"
    }`;

    // Find the return ( block to inject the script
    const returnRegex = /return\s*\(\s*(<div[^>]*>)/;
    const match = content.match(returnRegex);
    if (match) {
      const injectStr = `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(${schemaStr}) }} />`;
      content = content.replace(match[0], match[0] + injectStr);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(pagePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated ${toolSlug}`);
  }
});

console.log(`Successfully updated ${updatedCount} old tool pages with full canonical URLs and JSON-LD schemas.`);
