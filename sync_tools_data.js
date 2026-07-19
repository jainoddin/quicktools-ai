const fs = require('fs');

const content = fs.readFileSync('frontend/components/tools/ToolsClient.tsx', 'utf8');

const startMarker = 'export const allTools = [';
const startIdx = content.indexOf(startMarker) + startMarker.length;

let depth = 1;
let idx = startIdx;
while (idx < content.length && depth > 0) {
    if (content[idx] === '[') depth++;
    else if (content[idx] === ']') depth--;
    idx++;
}
const arrayContent = content.substring(startIdx, idx - 1);

const tools = [];
const toolRegex = /\{[^{}]*name:\s*['"]([^'"]+)['"][^{}]*description:\s*['"]([^'"]+)['"][^{}]*iconName:\s*['"]([^'"]+)['"][^{}]*color:\s*['"]([^'"]+)['"][^{}]*slug:\s*['"]([^'"]+)['"][^{}]*category:\s*['"]([^'"]+)['"][^{}]*(?:isPremium:\s*(true|false),)?[^{}]*createdAt:\s*(?:['"]([^'"]+)['"]|new Date\(\)\.toISOString\(\))[^{}]*/gs;

let match;
while ((match = toolRegex.exec(arrayContent)) !== null) {
    const slug = match[5].replace('/tools/', '');
    tools.push({
        name: match[1],
        description: match[2],
        iconName: match[3],
        color: match[4],
        slug: slug,
        category: match[6],
        isPremium: match[7] === 'true' || match[7] === true,
        createdAt: match[8] || new Date().toISOString()
    });
}

console.log('Total tools extracted:', tools.length);
fs.writeFileSync('frontend/tools_data.json', JSON.stringify(tools, null, 2));
fs.writeFileSync('backend/tools_data.json', JSON.stringify(tools, null, 2));
console.log('tools_data.json updated in frontend and backend!');
