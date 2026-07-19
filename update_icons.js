const fs = require('fs');
const path = require('path');

const requiredIcons = [
  'Target', 'Lightbulb', 'BarChart2', 'Briefcase', 'Megaphone', 
  'Users', 'Palette', 'UserCircle', 'Map', 'Mail', 
  'PhoneCall', 'Shield', 'Magnet', 'Video', 'GraduationCap', 
  'Mic', 'Film', 'MailOpen', 'FileText', 'BookOpen', 
  'Layout', 'ShoppingCart', 'Rocket', 'Star', 'TrendingUp', 
  'DollarSign', 'Grid', 'AlertTriangle', 'Leaf', 'UserPlus', 
  'Book', 'Heart', 'CheckSquare', 'LifeBuoy', 'Send', 
  'Award', 'FileCheck', 'Handshake', 'Settings'
];

const filePath = path.join(__dirname, 'frontend/components/tools/ToolsClient.tsx');
let c = fs.readFileSync(filePath, 'utf8');

// 1. Update the import from lucide-react
let importMatch = c.match(/import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/);
if (importMatch) {
  let existingImports = importMatch[1].split(',').map(s => s.trim());
  let newImports = new Set(existingImports);
  requiredIcons.forEach(icon => newImports.add(icon));
  c = c.replace(importMatch[0], `import {\n  ${Array.from(newImports).join(',\n  ')}\n} from 'lucide-react';`);
}

// 2. Update the IconMap
let iconMapMatch = c.match(/export const IconMap[^}]+}/);
if (iconMapMatch) {
  let oldMap = iconMapMatch[0];
  let newMap = oldMap.substring(0, oldMap.length - 1); // remove closing brace
  
  requiredIcons.forEach(icon => {
    if (!newMap.includes(`  ${icon},`) && !newMap.includes(`  ${icon}:`)) {
      newMap += `  ${icon},\n`;
    }
  });
  newMap += '}';
  c = c.replace(oldMap, newMap);
}

fs.writeFileSync(filePath, c);
console.log('Successfully updated ToolsClient.tsx with new icons');
