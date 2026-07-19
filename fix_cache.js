const fs = require('fs');
const path = require('path');

const files = [
  'frontend/app/blog/page.tsx',
  'frontend/app/news/page.tsx',
  'frontend/app/articles/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('export const revalidate = 0;')) {
      // Add it after the imports
      content = content.replace(/(import .*;\n)+/, match => match + '\nexport const revalidate = 0;\n');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Added revalidate = 0 to', file);
    }
  }
});
