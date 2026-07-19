const fs = require('fs');

let c = fs.readFileSync('frontend/app/sitemap.ts', 'utf8');

c = c.replace(
  "    '/tools/ai-image-generator', '/tools/background-remover',\n    '/tools/ai-chat-assistant', '/tools/pdf-converter', '/tools/ai-writer'\n  ]",
  "  ]"
);

const toolsDataImport = `import toolsData from '../../tools_data.json';\n\n`;

if (!c.includes("toolsData from '../../tools_data.json'")) {
  c = c.replace("import { getEndpoint } from '../lib/api';", "import { getEndpoint } from '../lib/api';\n" + toolsDataImport);
}

const toolRoutesMap = `  const toolRoutes = toolsData.map((tool: any) => ({
    url: \`\${baseUrl}/tools/\${tool.slug}\`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: tool.isPremium ? 0.9 : 0.8,
  }));
`;

c = c.replace("  const routes = [", toolRoutesMap + "\n  const routes = [");
c = c.replace("return [...routes, ...blogUrls, ...articleUrls, ...newsUrls];", "return [...routes, ...toolRoutes, ...blogUrls, ...articleUrls, ...newsUrls];");

fs.writeFileSync('frontend/app/sitemap.ts', c);
console.log('Sitemap updated with 106 tools.');
