const fs = require('fs');
const path = require('path');

const tools = [
  { slug: 'ai-marketing-plan', title: 'AI Marketing Plan Generator', desc: 'Generate a comprehensive marketing plan and strategy.', category: 'Marketing', icon: 'Target', color: '#EC4899' },
  { slug: 'ai-startup-ideas', title: 'AI Startup Idea Generator', desc: 'Generate validated startup ideas based on market trends.', category: 'Business', icon: 'Lightbulb', color: '#F59E0B' },
  { slug: 'ai-swot-analysis', title: 'AI SWOT Analysis Generator', desc: 'Generate a detailed SWOT analysis for your business.', category: 'Business', icon: 'BarChart2', color: '#3B82F6' },
  { slug: 'ai-investor-update', title: 'AI Investor Update Generator', desc: 'Write professional updates for your startup investors.', category: 'Business', icon: 'Briefcase', color: '#8B5CF6' },
  { slug: 'ai-press-release', title: 'AI Press Release Writer', desc: 'Write compelling press releases for your announcements.', category: 'Marketing', icon: 'Megaphone', color: '#EF4444' },
  { slug: 'ai-okr-generator', title: 'AI OKR Generator', desc: 'Generate Objectives and Key Results for your teams.', category: 'Business', icon: 'Target', color: '#10B981' },
  { slug: 'ai-employee-review', title: 'AI Employee Performance Review', desc: 'Write constructive employee performance reviews.', category: 'Business', icon: 'Users', color: '#6366F1' },
  { slug: 'ai-brand-guidelines', title: 'AI Brand Guidelines Generator', desc: 'Create comprehensive brand identity guidelines.', category: 'Design', icon: 'Palette', color: '#EC4899' },
  { slug: 'ai-user-persona', title: 'AI User Persona Creator', desc: 'Generate detailed buyer and user personas.', category: 'Marketing', icon: 'UserCircle', color: '#F59E0B' },
  { slug: 'ai-customer-journey', title: 'AI Customer Journey Mapper', desc: 'Map out the end-to-end customer journey.', category: 'Marketing', icon: 'Map', color: '#3B82F6' },
  { slug: 'ai-cold-email', title: 'AI B2B Cold Email Sequence', desc: 'Generate high-converting B2B cold email sequences.', category: 'Sales', icon: 'Mail', color: '#8B5CF6' },
  { slug: 'ai-sales-script', title: 'AI Sales Cold Call Script', desc: 'Generate effective scripts for sales calls.', category: 'Sales', icon: 'PhoneCall', color: '#10B981' },
  { slug: 'ai-objection-handling', title: 'AI Sales Objection Handler', desc: 'Generate responses to common sales objections.', category: 'Sales', icon: 'Shield', color: '#EF4444' },
  { slug: 'ai-lead-magnet', title: 'AI Lead Magnet Idea Generator', desc: 'Generate compelling lead magnet ideas to grow your list.', category: 'Marketing', icon: 'Magnet', color: '#F59E0B' },
  { slug: 'ai-webinar-script', title: 'AI Webinar Script Generator', desc: 'Generate engaging scripts for your webinars.', category: 'Marketing', icon: 'Video', color: '#3B82F6' },
  { slug: 'ai-course-outline', title: 'AI Masterclass Course Outline', desc: 'Generate detailed course outlines and curriculum.', category: 'Education', icon: 'GraduationCap', color: '#8B5CF6' },
  { slug: 'ai-podcast-script', title: 'AI Podcast Episode Script', desc: 'Generate structured scripts for podcast episodes.', category: 'Media', icon: 'Mic', color: '#EC4899' },
  { slug: 'ai-video-storyboard', title: 'AI Video Storyboard Generator', desc: 'Generate detailed scene-by-scene video storyboards.', category: 'Media', icon: 'Film', color: '#10B981' },
  { slug: 'ai-newsletter-content', title: 'AI Newsletter Content Generator', desc: 'Generate engaging content for email newsletters.', category: 'Marketing', icon: 'MailOpen', color: '#F59E0B' },
  { slug: 'ai-case-study', title: 'AI Case Study Writer', desc: 'Write professional business case studies.', category: 'Business', icon: 'FileText', color: '#3B82F6' },
  { slug: 'ai-whitepaper-outline', title: 'AI Whitepaper Outline', desc: 'Generate structured outlines for B2B whitepapers.', category: 'Business', icon: 'BookOpen', color: '#8B5CF6' },
  { slug: 'ai-landing-page-copy', title: 'AI Landing Page Copywriter', desc: 'Generate high-converting copy for landing pages.', category: 'Marketing', icon: 'Layout', color: '#EC4899' },
  { slug: 'ai-abandoned-cart', title: 'AI Abandoned Cart Email Series', desc: 'Generate email sequences to recover lost sales.', category: 'Marketing', icon: 'ShoppingCart', color: '#EF4444' },
  { slug: 'ai-product-launch', title: 'AI Product Launch Strategy', desc: 'Generate a comprehensive product launch plan.', category: 'Marketing', icon: 'Rocket', color: '#3B82F6' },
  { slug: 'ai-value-proposition', title: 'AI Value Proposition Generator', desc: 'Generate unique value propositions for your products.', category: 'Business', icon: 'Star', color: '#F59E0B' },
  { slug: 'ai-competitor-analysis', title: 'AI Competitor Analysis', desc: 'Generate detailed competitor analysis reports.', category: 'Business', icon: 'TrendingUp', color: '#10B981' },
  { slug: 'ai-pricing-strategy', title: 'AI Pricing Strategy Generator', desc: 'Generate optimized pricing strategies and tiers.', category: 'Business', icon: 'DollarSign', color: '#8B5CF6' },
  { slug: 'ai-business-model', title: 'AI Business Model Canvas', desc: 'Generate a complete Business Model Canvas.', category: 'Business', icon: 'Grid', color: '#3B82F6' },
  { slug: 'ai-risk-assessment', title: 'AI Risk Assessment Report', desc: 'Generate detailed business risk assessments.', category: 'Business', icon: 'AlertTriangle', color: '#EF4444' },
  { slug: 'ai-sustainability-plan', title: 'AI ESG / Sustainability Plan', desc: 'Generate corporate sustainability and ESG plans.', category: 'Business', icon: 'Leaf', color: '#10B981' },
  { slug: 'ai-onboarding-plan', title: 'AI Employee Onboarding Plan', desc: 'Generate structured 30-60-90 day onboarding plans.', category: 'HR', icon: 'UserPlus', color: '#3B82F6' },
  { slug: 'ai-training-module', title: 'AI Training Module Generator', desc: 'Generate corporate training modules and quizzes.', category: 'HR', icon: 'Book', color: '#8B5CF6' },
  { slug: 'ai-company-culture', title: 'AI Company Culture Guide', desc: 'Generate company culture and values handbooks.', category: 'HR', icon: 'Heart', color: '#EC4899' },
  { slug: 'ai-job-interview-rubric', title: 'AI Interview Scoring Rubric', desc: 'Generate standardized interview scoring rubrics.', category: 'HR', icon: 'CheckSquare', color: '#F59E0B' },
  { slug: 'ai-crisis-management', title: 'AI Crisis Management Plan', desc: 'Generate step-by-step crisis communication plans.', category: 'Business', icon: 'LifeBuoy', color: '#EF4444' },
  { slug: 'ai-pr-pitch', title: 'AI PR Media Pitch Generator', desc: 'Generate compelling media pitches for journalists.', category: 'Marketing', icon: 'Send', color: '#3B82F6' },
  { slug: 'ai-event-sponsorship', title: 'AI Event Sponsorship Deck', desc: 'Generate sponsorship proposal decks for events.', category: 'Business', icon: 'Award', color: '#8B5CF6' },
  { slug: 'ai-grant-report', title: 'AI Grant Progress Report', desc: 'Write professional progress reports for grants.', category: 'Business', icon: 'FileCheck', color: '#10B981' },
  { slug: 'ai-partnership-proposal', title: 'AI Partnership Proposal', desc: 'Generate B2B strategic partnership proposals.', category: 'Business', icon: 'Handshake', color: '#F59E0B' },
  { slug: 'ai-franchise-manual', title: 'AI Franchise Operations Manual', desc: 'Generate standard operating procedures for franchises.', category: 'Business', icon: 'Settings', color: '#6366F1' },
];

const backendPromptsConfig = tools.reduce((acc, tool) => {
  acc[tool.slug] = `Act as an expert in ${tool.category}. Generate a highly professional and detailed output for the user's request related to ${tool.title.replace('AI ', '')}. Provide actionable insights, structure it clearly with markdown headings, lists, and tables where appropriate. Make it comprehensive.`;
  return acc;
}, {});

// 1. Write the backend prompt config
fs.writeFileSync(path.join(__dirname, 'backend/src/config/premiumPrompts.ts'), 
  `export const premiumPrompts: Record<string, string> = ${JSON.stringify(backendPromptsConfig, null, 2)};`
);

// 2. Update tools_data.json
let existingTools = JSON.parse(fs.readFileSync('tools_data.json', 'utf8'));
const existingSlugs = new Set(existingTools.map(t => t.slug));

tools.forEach(t => {
  if (!existingSlugs.has(t.slug)) {
    existingTools.push({
      title: t.title,
      slug: t.slug,
      category: t.category,
      isPremium: true
    });
  }
});
fs.writeFileSync('tools_data.json', JSON.stringify(existingTools, null, 2));

// 3. Generate Frontend Pages & Clients
tools.forEach(tool => {
  const compName = tool.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const clientName = `${compName}Client`;
  
  const dirApp = path.join(__dirname, `frontend/app/tools/${tool.slug}`);
  const dirComp = path.join(__dirname, `frontend/components/${tool.slug}`);
  
  if (!fs.existsSync(dirApp)) fs.mkdirSync(dirApp, { recursive: true });
  if (!fs.existsSync(dirComp)) fs.mkdirSync(dirComp, { recursive: true });

  // page.tsx
  const pageCode = `import { Metadata } from 'next';
import ${clientName} from '@/components/${tool.slug}/${clientName}';
import { Sparkles, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '${tool.title} | Premium Tools',
  description: '${tool.desc}',
};

export default function Page() {
  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "${tool.title}",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "description": "${tool.desc}",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5"><Home className="w-4 h-4" /> Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-[#111827] transition-colors">All Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#111827] font-semibold flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#F59E0B]" /> ${tool.title.replace('AI ', '')}</span>
      </nav>

      <${clientName} />
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dirApp, 'page.tsx'), pageCode);

  // client.tsx
  const clientCode = `'use client';

import React, { useState, useEffect } from 'react';
import { ${tool.icon}, Sparkles, Copy, CheckCircle2, Download, History, Loader2, Crown, Share2, RefreshCw } from 'lucide-react';
import TextDownloadModal from '@/components/shared/TextDownloadModal';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoginPopup from '@/components/auth/LoginPopup';
import PremiumPopup from '@/components/auth/PremiumPopup';
import { getEndpoint } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import ToolHistorySidebar from '@/components/tools/ToolHistorySidebar';
import TextGenerationProgress from '@/components/shared/TextGenerationProgress';

export default function ${clientName}() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [freeGenCount, setFreeGenCount] = useState(0);

  const { user, isAuthenticated, updateUser } = useAuth();
  const { error, success } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      const count = parseInt(localStorage.getItem('premium_${tool.slug}_count') || '0', 10);
      setFreeGenCount(count);
      const saved = localStorage.getItem('${tool.slug}_history');
      if (saved) {
        try { setToolHistory(JSON.parse(saved)); } catch {}
      }
    } else {
      fetch(getEndpoint('/api/user/usage'), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.history) {
          const items = data.data.history
            .filter((item: any) => item.toolSlug === '/tools/${tool.slug}')
            .map((item: any) => ({
              id: item._id,
              prompt: item.prompt,
              result: item.result,
              date: new Date(item.createdAt).toLocaleDateString(),
            }));
          setToolHistory(items);
        }
      })
      .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      const res = await fetch(getEndpoint('/api/tools/generate-premium'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input, toolSlug: '${tool.slug}', toolName: '${tool.title}' }),
      });

      const data = await res.json();
      
      if (res.status === 401) {
        setShowLoginPopup(true);
        setIsProcessing(false);
        return;
      }
      
      if (res.status === 403 && data.errorType === 'INSUFFICIENT_CREDITS') {
        setShowPremiumPopup(true);
        setIsProcessing(false);
        return;
      }

      if (data.success) {
        setResult(data.text);
        
        if (data.creditsRemaining !== undefined && updateUser && user) {
           updateUser({ ...user, credits: data.creditsRemaining });
        }

        if (!isAuthenticated) {
          const newCount = freeGenCount + 1;
          setFreeGenCount(newCount);
          localStorage.setItem('premium_${tool.slug}_count', newCount.toString());
          
          const newItem = { id: Date.now(), prompt: input, result: data.text, date: new Date().toLocaleDateString() };
          const newHistory = [newItem, ...toolHistory];
          setToolHistory(newHistory);
          localStorage.setItem('${tool.slug}_history', JSON.stringify(newHistory));
        } else {
          setToolHistory([{ id: Date.now(), prompt: input, result: data.text, date: new Date().toLocaleDateString() }, ...toolHistory]);
        }
      } else {
        error(data.message || 'Failed to generate content');
      }
    } catch (err) {
      error('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      <PremiumPopup isOpen={showPremiumPopup} onClose={() => setShowPremiumPopup(false)} />

      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#111827] mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" /> Premium Tool
            </h2>
            <p className="text-sm text-[#4B5563]">
              ${tool.desc}
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Describe your requirement
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., I need..."
                className="w-full h-32 px-4 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl focus:ring-2 focus:ring-[#6D5EF8]/20 focus:border-[#6D5EF8] transition-all resize-none text-sm text-[#111827] placeholder:text-[#9CA3AF]"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isProcessing || !input.trim()}
              className="w-full h-14 bg-[#111827] hover:bg-[#1F2937] text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isProcessing ? 'Generating...' : 'Generate Now (5 Credits)'}
            </button>
          </div>
        </div>
      </div>

      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="${tool.title}"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onDelete={() => {}}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[${tool.color}] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <${tool.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                  ${tool.title}
                </h1>
                <p className="text-[#6B7280] text-sm mt-1">
                  ${tool.desc}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
              >
                <History className="w-4 h-4 text-[#6B7280]" /> History
              </button>
            </div>
          </div>

          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6" style={{ color: '${tool.color}' }} />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {isProcessing ? (
              <TextGenerationProgress title="Generating Content..." description="Crafting your premium response." />
            ) : result ? (
              <>
                <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0 mb-6">
                  <div id="result-content" className="prose prose-sm md:prose-base max-w-none prose-p:text-[#4B5563] prose-headings:text-[#111827] prose-strong:text-[#111827] prose-li:text-[#4B5563]">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#E5E7EB] shrink-0">
                  <button
                    onClick={() => setShowDownloadModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all shadow-sm text-sm hover:opacity-90"
                    style={{ backgroundColor: '${tool.color}' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try { await navigator.share({ title: '${tool.title}', text: result }); } catch (err) {}
                      } else { copyToClipboard(); }
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
        </main>
      )}
    
      <TextDownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        content={result} 
        filename="${tool.title}" 
        toolSlug="${tool.slug}" 
        elementId="result-content" 
      />
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dirComp, `${clientName}.tsx`), clientCode);
});

console.log('Successfully generated 40 tools!');
