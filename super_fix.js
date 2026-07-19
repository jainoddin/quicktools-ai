const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

function extractToolName(content) {
  const match = content.match(/downloadAsPDF\([^,]+,\s*['"]([^'"]+)['"]\)/);
  return match ? match[1] : 'Result';
}

function extractColor(content) {
  // Looks for color in the Sparkles icon or bg-color class
  const match = content.match(/text-\[#([0-9A-F]{6})\]/i) || content.match(/bg-\[#([0-9A-F]{6})\]/i);
  return match ? `#${match[1]}` : '#6D5EF8';
}

function extractHeadingInfo(content) {
  // Extract Title and Description from the header area
  const titleMatch = content.match(/<h1[^>]*>(?:[^<]*<[^>]+>)*\s*(.*?)\s*<Sparkles/);
  const title = titleMatch ? titleMatch[1].trim() : 'AI Tool Generator';
  
  const descMatch = content.match(/<p[^>]*text-\[#6B7280\][^>]*>([^<]+)<\/p>/);
  const desc = descMatch ? descMatch[1].trim() : 'Generate amazing content with AI.';
  
  return { title, desc };
}

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
  const basename = path.basename(file, '.tsx');
  if (basename === 'ToolsClient' || basename === 'ImageGeneratorClient') continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // 1. Rewrite Header Area
  const headerStartMatch = content.match(/<div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4[^>]*>/);
  if (!headerStartMatch) continue;
  
  const { title, desc } = extractHeadingInfo(content);
  const color = extractColor(content);
  const toolName = extractToolName(content);

  // Find the end of the header div (it usually ends before {isProcessing ? or {result ? )
  // We can just replace from headerStartMatch.index to {isProcessing or {result
  const searchStart = headerStartMatch.index;
  let processingIdx = content.indexOf('{isProcessing ?', searchStart);
  let resultIdx = content.indexOf('{result ?', searchStart);
  if (processingIdx === -1) processingIdx = Infinity;
  if (resultIdx === -1) resultIdx = Infinity;
  const targetEndIdx = Math.min(processingIdx, resultIdx);
  
  if (targetEndIdx === Infinity) continue;

  // Wait, the History button is in the header too.
  // We need to keep the history button logic.
  let historyButtonLogic = `
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <History className="w-4 h-4 text-[#6B7280]" /> History
                </button>
              </div>
  `;
  if (content.includes('toolHistory.length >= 3')) {
    historyButtonLogic = `
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => {
                    if (!isAuthenticated && toolHistory.length >= 3) {
                      setShowLoginPopup(true);
                    } else {
                      setShowHistory(true);
                    }
                  }}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <History className="w-4 h-4 text-[#6B7280]" /> History
                </button>
              </div>
    `;
  }

  const newHeader = `
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                ${title} <Sparkles className="w-6 h-6" style={{ color: '${color}' }} />
              </h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                ${desc}
              </p>
            </div>
            ${historyButtonLogic}
          </div>

`;

  // 2. Rewrite Result Box Area
  // We replace from targetEndIdx all the way to </main>
  const mainCloseIdx = content.indexOf('</main>', targetEndIdx);
  if (mainCloseIdx === -1) continue;

  let loaderComponent = `
            <div className="h-full flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-[${color}] mb-4" />
              <h3 className="text-xl font-bold text-[#111827] mb-2">Generating...</h3>
              <p className="text-[#6B7280]">Please wait while we create your result.</p>
            </div>
  `;
  
  if (content.includes('TextGenerationProgress')) {
    const match = content.match(/<TextGenerationProgress[^>]+>/);
    if (match) {
      loaderComponent = match[0];
    }
  }

  const newResultSection = `
          {/* Generated Result Header */}
          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6" style={{ color: '${color}' }} />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {isProcessing ? (
              ${loaderComponent}
            ) : result ? (
              <>
                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-[#E5E7EB]">
                  <button
                    onClick={() => downloadAsPDF(result, '${toolName}')}
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all shadow-sm text-sm hover:opacity-90"
                    style={{ backgroundColor: '${color}' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({ title: '${toolName}', text: result });
                        } catch (err) {
                          console.error('Share failed:', err);
                        }
                      } else {
                        copyToClipboard();
                      }
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => { setResult(''); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">
                  <div className="prose prose-sm md:prose-base max-w-none prose-p:text-[#4B5563] prose-headings:text-[#111827] prose-strong:text-[#111827] prose-li:text-[#4B5563]">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mb-4 border border-[#E5E7EB]">
                  <Sparkles className="w-8 h-8 text-[#9CA3AF]" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2">Ready to generate</h3>
                <p className="text-[#6B7280] max-w-sm">
                  Fill in the details on the left and click generate to see the magic happen.
                </p>
              </div>
            )}
          </div>
        `;

  content = content.substring(0, searchStart) + newHeader + newResultSection + content.substring(mainCloseIdx);

  // Add missing imports
  let importsToAdd = [];
  if (!content.includes('Share2')) importsToAdd.push('Share2');
  if (!content.includes('RefreshCw')) importsToAdd.push('RefreshCw');
  
  if (importsToAdd.length > 0) {
    content = content.replace(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/, (match, p1) => {
      let imports = p1.trim();
      importsToAdd.forEach(imp => {
        if (!imports.includes(imp)) imports += `, ${imp}`;
      });
      return `import { ${imports} } from 'lucide-react';`;
    });
  }
  
  // Make sure TextGenerationProgress is imported if used
  if (content.includes('TextGenerationProgress') && !content.includes("import TextGenerationProgress")) {
    const lastImportMatch = [...content.matchAll(/^import .*;$/gm)].pop();
    if (lastImportMatch) {
      const insertPos = lastImportMatch.index + lastImportMatch[0].length;
      content = content.slice(0, insertPos) + "\nimport TextGenerationProgress from '@/components/shared/TextGenerationProgress';" + content.slice(insertPos);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    updated++;
    console.log(`✅ Completely rebuilt UI for ${basename}`);
  }
}

console.log(`\nDone! Updated ${updated} files.`);
