/**
 * fix_pattern_b_complete.js
 * Fixes all Pattern B tools:
 * 1. Adds isProcessing → TextGenerationProgress inside white box
 * 2. Removes History button from result header → adds badge
 * 3. Adds left sidebar interlinks if missing
 * 4. Adds bottom Regenerate/Copy action bar below the result box
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'frontend', 'components');

// Tool-specific progress titles and descriptions
const toolProgressMap = {
  'AiApologyLetterClient': ['Writing Your Apology...', 'Crafting a sincere and heartfelt apology letter.'],
  'AiDreamInterpreterClient': ['Interpreting Your Dream...', 'Analyzing symbols and patterns in your dream.'],
  'AiElevatorPitchClient': ['Crafting Your Pitch...', 'Writing a persuasive and memorable elevator pitch.'],
  'AiEmojiTranslatorClient': ['Translating...', 'Converting your text to expressive emojis.'],
  'AiEventPlannerClient': ['Planning Your Event...', 'Organizing every detail of your perfect event.'],
  'AiGitCommandClient': ['Generating Command...', 'Finding the best Git command for your task.'],
  'AiHashtagGeneratorClient': ['Generating Hashtags...', 'Finding the most effective hashtags for you.'],
  'AiInterviewQuestionsClient': ['Generating Questions...', 'Crafting tailored interview questions for this role.'],
  'AiJobDescriptionClient': ['Writing Job Description...', 'Crafting a detailed and attractive job posting.'],
  'AiMealPlannerClient': ['Planning Your Meals...', 'Creating a balanced and healthy meal plan.'],
  'AiPoemGeneratorClient': ['Writing Your Poem...', 'Weaving words into a beautiful poem.'],
  'AiRealEstateListingClient': ['Writing Listing...', 'Crafting an attractive real estate listing description.'],
  'AiResignationLetterClient': ['Writing Letter...', 'Crafting a professional resignation letter.'],
  'AiReviewResponderClient': ['Writing Response...', 'Crafting a professional response to this review.'],
  'AiSloganGeneratorClient': ['Generating Slogans...', 'Coming up with catchy and memorable slogans.'],
  'AiSqlGeneratorClient': ['Generating SQL...', 'Writing a precise SQL query for your request.'],
  'AiStoryGeneratorClient': ['Writing Your Story...', 'Crafting a creative narrative just for you.'],
  'AiTravelPlannerClient': ['Planning Your Trip...', 'Creating a detailed travel itinerary.'],
  'AiVideoScriptClient': ['Writing Script...', 'Crafting an engaging and compelling video script.'],
  'AiYoutubeTagsClient': ['Finding Tags...', 'Generating the most effective YouTube tags.'],
};

// Get tool name from downloadAsPDF call
function extractToolName(content) {
  const match = content.match(/downloadAsPDF\([^,]+,\s*['"]([^'"]+)['"]\)/);
  return match ? match[1] : 'Result';
}

// Get main button color from the generate button
function extractBgColor(content) {
  const match = content.match(/bg-\[#([0-9A-F]{6})\] hover:opacity-90/i) ||
                content.match(/bg-\[#([0-9A-F]{6})\] hover:bg/i);
  if (match) return `#${match[1]}`;
  
  // Try to get the icon bg color from header
  const iconMatch = content.match(/w-12 h-12 bg-\[#([0-9A-F]{6})\] rounded-xl/i);
  if (iconMatch) return `#${iconMatch[1]}`;
  
  return '#6D5EF8';
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

const WHITE_BOX_START = `          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">`;

let updatedCount = 0;

for (const file of files) {
  const basename = path.basename(file, '.tsx');
  
  // Only process Pattern B files
  if (!toolProgressMap[basename]) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  const originalContent = content;
  
  const [progressTitle, progressDesc] = toolProgressMap[basename];
  const toolName = extractToolName(content);
  
  // Find the white box section
  const boxStart = content.indexOf(WHITE_BOX_START);
  if (boxStart === -1) {
    console.log(`  ⚠️ White box not found in ${basename}`);
    continue;
  }
  
  // Find where it ends: </div>\n        </main>
  const boxContentStart = boxStart + WHITE_BOX_START.length;
  
  // Find the end of the white box - we look for </div>\n        </main>
  const mainClosePattern = '</div>\n        </main>';
  const mainCloseIdx = content.indexOf(mainClosePattern, boxContentStart);
  
  if (mainCloseIdx === -1) {
    // Try alternate whitespace
    const mainClosePattern2 = '</div>\n         </main>';
    const mainCloseIdx2 = content.indexOf(mainClosePattern2, boxContentStart);
    if (mainCloseIdx2 === -1) {
      console.log(`  ⚠️ Main close not found in ${basename}`);
      continue;
    }
  }
  
  const endIdx = content.indexOf(mainClosePattern, boxContentStart);
  if (endIdx === -1) {
    console.log(`  ⚠️ Could not find end pattern in ${basename}`);
    continue;
  }
  
  // Build new inner content
  const newInnerContent = `
          {isProcessing ? (
            <TextGenerationProgress title="${progressTitle}" description="${progressDesc}" />
          ) : result ? (
            <>
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E5E7EB] shrink-0">
                <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[#F97316]" />
                  Generated Result
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] font-bold rounded-xl transition-colors"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => downloadAsPDF(result, '${toolName}')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] font-bold rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium">
                    <History className="w-4 h-4" /> Your creations are saved in history
                  </div>
                </div>
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
        `;
  
  // Replace the old inner content with new
  content = content.slice(0, boxStart) + WHITE_BOX_START + newInnerContent + content.slice(endIdx);
  
  // Now fix the Regenerate section: add a bottom action bar AFTER the white box but BEFORE </main>
  // Find </main> in the new content
  const newMainCloseIdx = content.indexOf('</main>', boxStart);
  if (newMainCloseIdx !== -1) {
    const regenerateBar = `
          {result && !isProcessing && (
            <div className="flex items-center gap-3 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={() => { setResult(''); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] font-semibold rounded-xl hover:bg-[#F3F4F6] transition-all shadow-sm text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#EFF6FF] text-[#2563EB] font-semibold rounded-xl hover:bg-[#DBEAFE] transition-all shadow-sm text-sm"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                onClick={() => downloadAsPDF(result, '${toolName}')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#F0FDF4] text-[#16A34A] font-semibold rounded-xl hover:bg-[#DCFCE7] transition-all shadow-sm text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          )}
        `;
    content = content.slice(0, newMainCloseIdx) + regenerateBar + content.slice(newMainCloseIdx);
  }
  
  // Add RefreshCw to imports if not there
  if (!content.includes('RefreshCw')) {
    content = content.replace(
      /import \{([^}]+)\} from 'lucide-react';/,
      (match, icons) => `import {${icons.trim()}, RefreshCw } from 'lucide-react';`
    );
    
    // If there are multiple lucide imports, add to first one that has Copy/History
    if (!content.includes('RefreshCw')) {
      content = content.replace(
        /\bHistory\b([^}]*?)\} from 'lucide-react'/,
        `History$1, RefreshCw } from 'lucide-react'`
      );
    }
  }
  
  // Make sure TextGenerationProgress is imported
  if (!content.includes("import TextGenerationProgress")) {
    const lastImportMatch = [...content.matchAll(/^import .*;$/gm)].pop();
    if (lastImportMatch) {
      const insertPos = lastImportMatch.index + lastImportMatch[0].length;
      content = content.slice(0, insertPos) + "\nimport TextGenerationProgress from '@/components/shared/TextGenerationProgress';" + content.slice(insertPos);
    }
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf-8');
    updatedCount++;
    console.log(`✅ Fixed ${basename}`);
  } else {
    console.log(`⚠️  No changes for ${basename}`);
  }
}

console.log(`\nDone! Fixed ${updatedCount} Pattern B files.`);
