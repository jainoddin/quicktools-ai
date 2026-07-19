const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

const iconMap = {
  'AI Poem Generator': 'PenLine',
  'AI Blog Idea Generator': 'Lightbulb',
  'AI Email Generator': 'Mail',
  'AI Cover Letter': 'FileText',
  'AI Story Generator': 'BookOpen',
  'AI LinkedIn Bio': 'User',
  'Business Name Generator': 'Building2',
  'AI Caption Generator': 'MessageSquare',
  'AI Hashtag Generator': 'Hash',
  'AI Travel Planner': 'Plane',
  'AI Meal Planner': 'UtensilsCrossed',
  'AI Code Explainer': 'FileCode2',
  'AI SQL Generator': 'Database',
  'AI YouTube Title': 'Youtube',
  'AI Resume Builder': 'FileText',
  'AI Interview Questions': 'Users',
  'AI Recipe Generator': 'ChefHat',
  'AI Workout Planner': 'Dumbbell',
  'AI Quote Generator': 'Quote',
  'AI Product Description': 'Package',
  'AI SEO Meta Generator': 'Search',
  'AI Apology Letter': 'Mail',
  'AI Ad Copy Generator': 'Megaphone',
  'AI Git Command Helper': 'GitBranch',
  'AI Event Planner': 'Calendar',
  'AI YouTube Tags': 'Tag',
  'AI Video Script': 'Clapperboard'
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

let updated = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  if (content.includes('Explore Other Free Tools')) {
    let changed = false;
    
    // Replace <Sparkles ... /> with correct icon
    for (const [toolName, iconName] of Object.entries(iconMap)) {
      // Find block for this tool
      const regex = new RegExp(`(<p[^>]*>${toolName}</p>.*?<p[^>]*>.*?</p>)`, 's');
      
      // Need to replace the Sparkles specifically for this tool. 
      // Since it's structured as <a><div><Sparkles/></div><div><p>Title</p></div></a>
      // Let's just use string replacement on the whole section
      
      const aTagRegex = new RegExp(`(<a[^>]*href="[^"]*"[^>]*>.*?)(<Sparkles)([^>]*style={{color:'[^']*'}} />)(.*?<p[^>]*>${toolName}</p>.*?</a>)`, 's');
      
      if (aTagRegex.test(content)) {
        content = content.replace(aTagRegex, `$1<${iconName}$3$4`);
        changed = true;
        
        // Add icon to lucide-react imports
        if (!content.includes(iconName)) {
           content = content.replace(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/, (match, p1) => {
             if (p1.includes(iconName)) return match;
             return `import { ${p1}, ${iconName} } from 'lucide-react';`;
           });
        }
      }
    }
    
    if (changed) {
      fs.writeFileSync(file, content, 'utf-8');
      updated++;
      console.log(`Updated icons in ${path.basename(file)}`);
    }
  }
}

console.log(`Updated ${updated} files.`);
