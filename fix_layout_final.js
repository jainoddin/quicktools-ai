const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

function extractToolName(content) {
  const match = content.match(/downloadAsPDF\([^,]+,\s*['"]([^'"]+)['"]\)/);
  return match ? match[1] : 'Result';
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
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // We are going to replace the ENTIRE result box area.
  // First, let's find the start of the white box.
  const whiteBoxStartMatch = content.match(/<div className="flex-grow bg-white border border-\[#E5E7EB\] rounded-3xl.*?delay-150">/);
  
  if (!whiteBoxStartMatch) {
    console.log(`Skipping ${basename}: could not find white box start.`);
    continue;
  }

  const whiteBoxStartIdx = whiteBoxStartMatch.index;
  const whiteBoxStartText = whiteBoxStartMatch[0];
  
  // Find </main> to know where to stop
  const mainCloseIdx = content.indexOf('</main>', whiteBoxStartIdx);
  if (mainCloseIdx === -1) {
    console.log(`Skipping ${basename}: could not find </main>.`);
    continue;
  }
  
  // Check if we already have the new format (e.g. Generated Result outside the box)
  if (content.substring(0, whiteBoxStartIdx).includes('Generated Result')) {
    // We already moved it outside. Let's just fix the action bar inside if needed.
    // Actually, it's easier to just rebuild it if we can identify the pieces.
  }

  const toolName = extractToolName(content);
  
  // If the file has TextGenerationProgress, use it. Otherwise use Loader2.
  const hasTextGenerationProgress = content.includes('TextGenerationProgress');
  
  let loaderComponent = `
            <div className="h-full flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#6D5EF8] mb-4" />
              <h3 className="text-xl font-bold text-[#111827] mb-2">Generating...</h3>
              <p className="text-[#6B7280]">Please wait while we create your result.</p>
            </div>
  `;
  
  if (hasTextGenerationProgress) {
    const match = content.match(/<TextGenerationProgress[^>]+>/);
    if (match) {
      loaderComponent = match[0];
    }
  }

  const newResultSection = `
          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#F97316]" />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          ${whiteBoxStartText}
          {isProcessing ? (
            ${loaderComponent}
          ) : result ? (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-[#E5E7EB]">
                <button
                  onClick={() => downloadAsPDF(result, '${toolName}')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#6D5EF8] text-white font-semibold rounded-xl hover:bg-[#5B4DF5] transition-all shadow-sm text-sm"
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

  // Find the header div that contains the tool title to insert before the white box (if we want)
  // But wait, the user wants "Generated Result" right below the header.
  // The above code inserts it right above the whitebox, which is exactly correct.
  
  content = content.substring(0, whiteBoxStartIdx) + newResultSection + content.substring(mainCloseIdx);
  
  // Make sure Share2 and RefreshCw are imported
  if (!content.includes('Share2')) {
    content = content.replace(/import\s*\{([^}]+)\}\s*from\s*'lucide-react';/, (match, p1) => {
      let imports = p1.trim();
      if (!imports.includes('Share2')) imports += ', Share2';
      if (!imports.includes('RefreshCw')) imports += ', RefreshCw';
      return `import { ${imports} } from 'lucide-react';`;
    });
  }

  // Find and remove any OLD bottom action bar that might be left below the white box
  // Since we replaced up to </main>, we already wiped it out! Awesome.
  // Wait, no. mainCloseIdx is </main>.
  // The old content might have had <div className="flex items-center gap-3 mt-4... between </div> and </main>.
  // Since we replace everything from whiteBoxStartIdx to mainCloseIdx with newResultSection (which includes the closing </div> for the white box),
  // we effectively removed everything in between. This perfectly cleans up the old bottom action bar!

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    updated++;
    console.log(`✅ Updated layout for ${basename}`);
  }
}

console.log(`Done! Updated ${updated} files.`);
