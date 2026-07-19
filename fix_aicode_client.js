const fs = require('fs');
const filePath = 'frontend/components/ai-code-generator/AiCodeClient.tsx';
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

// The good section starts at line 425 (0-indexed: 424) "  return ("
// But we need the component declaration too - lines 1-229 (0-indexed 0-228) are the state and functions

// The file structure now is:
// 0-228: Good (imports, state, functions)
// 229-411: Start of JSX return (duplicated entry, corrupted at 411)
// 412-424: Corrupted code (handleCancel duplicate + return start)
// 424-692: Correct JSX body (second copy, which is good)

// Strategy: Keep lines 0-228 (functions), then take lines 424 onwards (correct JSX)

const goodFunctions = lines.slice(0, 229); // 0-indexed 0 to 228 = first 229 lines
const goodJsx = lines.slice(424); // 0-indexed 424 onwards

const newContent = [...goodFunctions, ...goodJsx].join('\n');
fs.writeFileSync(filePath, newContent);
console.log('Fixed AiCodeClient.tsx successfully!');
console.log('Total lines:', newContent.split('\n').length);
