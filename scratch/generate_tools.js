const fs = require('fs');

const tsxContent = fs.readFileSync('c:\\Users\\jain\\.gemini\\antigravity\\scratch\\quicktools-project\\frontend\\components\\tools\\ToolsClient.tsx', 'utf-8');

const allToolsMatch = tsxContent.match(/export const allTools = (\[[\s\S]+?\]);\s*(export|const|function|\n\n)/);
let toolsArrayString = allToolsMatch ? allToolsMatch[1] : '';

if (toolsArrayString) {
  let safeStr = toolsArrayString.replace(/new Date\(\)\.toISOString\(\)\.split\('T'\)\[0\]/g, "'2026-07-28'");
  
  let tools = [];
  try {
    tools = eval("(" + safeStr + ")");
  } catch(e) {
    console.error("Eval failed: " + e);
  }
  
  if (tools.length > 0) {
    const backendDataDir = 'c:\\Users\\jain\\.gemini\\antigravity\\scratch\\quicktools-project\\backend\\src\\data';
    fs.mkdirSync(backendDataDir, { recursive: true });
    
    // Write tools.json for backend
    fs.writeFileSync(
      backendDataDir + '\\tools.json',
      JSON.stringify(tools, null, 2)
    );
    console.log(`Successfully wrote ${tools.length} tools to backend tools.json`);
  }
} else {
  console.log("Could not find allTools array.");
}
