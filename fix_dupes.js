const fs = require('fs');

const files = [
  'c:/Users/jain/.gemini/antigravity/scratch/quicktools-project/frontend/components/ai-paraphraser/AiParaphraserClient.tsx',
  'c:/Users/jain/.gemini/antigravity/scratch/quicktools-project/frontend/components/password-generator/PasswordGeneratorClient.tsx'
];

files.forEach(p => {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/s, (match, p1) => {
    const parts = p1.split(',').map(s => s.trim()).filter(s => s);
    const unique = [...new Set(parts)];
    return 'import { ' + unique.join(', ') + ' } from "lucide-react"';
  });
  fs.writeFileSync(p, c);
  console.log('Fixed ' + p);
});
