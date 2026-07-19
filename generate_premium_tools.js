const fs = require('fs');
const path = require('path');

const premiumTools = [
  { slug: 'ai-business-plan', name: 'AI Business Plan Generator', desc: 'Generate a complete 10-page business plan with executive summary, market analysis, and financial projections.', icon: 'Briefcase', color: 'bg-[#F59E0B]' },
  { slug: 'ai-sales-funnel', name: 'AI Sales Funnel Copywriter', desc: 'Write landing page copy, email sequences, and ad copy all at once.', icon: 'Megaphone', color: 'bg-[#EF4444]' },
  { slug: 'ai-ebook-writer', name: 'AI E-Book Writer', desc: 'Generate chapter-by-chapter outlines and content for an entire e-book.', icon: 'BookOpen', color: 'bg-[#8B5CF6]' },
  { slug: 'ai-course-creator', name: 'AI Course Curriculum Creator', desc: 'Generate a full 4-week course syllabus, lesson plans, and quizzes.', icon: 'GraduationCap', color: 'bg-[#10B981]' },
  { slug: 'ai-seo-topical-map', name: 'AI SEO Topical Map Builder', desc: 'Generate a full SEO content cluster map for an entire month for a niche.', icon: 'Map', color: 'bg-[#06B6D4]' },
  { slug: 'ai-pitch-deck', name: 'AI Pitch Deck Generator', desc: 'Generate slide-by-slide text, data points, and script for a startup pitch deck.', icon: 'Presentation', color: 'bg-[#6366F1]' },
  { slug: 'ai-app-architecture', name: 'AI App Architecture Planner', desc: 'Generate the full tech stack, database schema, and API endpoints documentation for a new app.', icon: 'Database', color: 'bg-[#3B82F6]' },
  { slug: 'ai-grant-proposal', name: 'AI Grant Proposal Writer', desc: 'Write professional grant proposals for non-profits and startups.', icon: 'FileText', color: 'bg-[#14B8A6]' },
  { slug: 'ai-legal-template', name: 'AI Legal Template Drafter', desc: 'Generate standard boilerplate templates for NDAs, Freelance agreements, etc.', icon: 'Scale', color: 'bg-[#64748B]' },
  { slug: 'ai-social-calendar', name: 'AI Social Media Calendar', desc: 'Generate a 30-day multi-channel marketing calendar with specific daily posts.', icon: 'CalendarDays', color: 'bg-[#EC4899]' },
];

function toPascalCase(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

const frontendDir = 'frontend';

premiumTools.forEach(tool => {
  const pascalName = toPascalCase(tool.slug);
  const clientName = `${pascalName}Client`;
  const pageDir = path.join(frontendDir, 'app', 'tools', tool.slug);
  const compDir = path.join(frontendDir, 'components', tool.slug);

  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

  // 1. Create page.tsx
  const pageContent = `import React from 'react';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import ${clientName} from '@/components/${tool.slug}/${clientName}';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium ${tool.name} | QuickTools',
  description: '${tool.desc.replace(/'/g, "\\'")}',
};

export default function ${pascalName}Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '${tool.name}',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '5',
      priceCurrency: 'USD',
    },
    description: '${tool.desc.replace(/'/g, "\\'")}',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 h-[calc(100vh-80px)]">
        <div className="flex items-center mb-[25px]">
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tools" className="hover:text-[#111827] transition-colors">
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">${tool.name}</span>
          </nav>
        </div>
        <${clientName} />
      </div>
    </>
  );
}
`;
  fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);

  // 2. Create Client Component
  const clientContent = `'use client';

import React, { useState, useEffect } from 'react';
import { ${tool.icon}, Sparkles, Copy, CheckCircle2, Download, History, Loader2, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import LoginPopup from '@/components/auth/LoginPopup';
import PremiumPopup from '@/components/auth/PremiumPopup';
import { getEndpoint } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import ToolHistorySidebar from '@/components/tools/ToolHistorySidebar';
import { downloadAsPDF } from '@/lib/pdfUtils';

export default function ${clientName}() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
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
      // Load history from backend
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

    // Guest users get 1 free trial for premium tools
    if (!isAuthenticated && freeGenCount >= 1) {
      setShowLoginPopup(true);
      return;
    }

    setIsProcessing(true);
    setResult('');

    try {
      const res = await fetch(getEndpoint('/api/tools/${tool.slug}'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input }),
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
        
        // Update user credits in context if returned
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
          // Add to local state for immediate feedback
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
                placeholder="E.g., I need a business plan for a vegan coffee shop..."
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

      <main className="flex-grow flex flex-col min-w-0">
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-sm shrink-0 relative">
              <${tool.icon} className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-0.5 rounded-full border-2 border-white shadow-sm">
                <Crown className="w-2.5 h-2.5" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                ${tool.name}
              </h1>
              <p className="text-sm text-[#6B7280]">${tool.desc}</p>
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

        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
          {showHistory ? (
            <ToolHistorySidebar
              history={toolHistory}
              onBack={() => setShowHistory(false)}
              onSelect={(item) => {
                setInput(item.prompt || item.preview);
                setResult(item.result);
                setShowHistory(false);
              }}
            />
          ) : isProcessing ? (
            <TextGenerationProgress title="Generating Content..." description="Crafting your premium response." />
          ) : !result ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 bg-[#F9FAFB] rounded-2xl flex items-center justify-center mb-4 border border-[#E5E7EB]">
                <Sparkles className="w-8 h-8 text-[#9CA3AF]" />
              </div>
              <h3 className="text-lg font-bold text-[#111827] mb-2">Ready to generate</h3>
              <p className="text-[#6B7280] max-w-sm">
                Fill in the details on the left and click generate to see the magic happen.
              </p>
            </div>
          ) : (
            <div className="flex flex-col h-full min-h-0">
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
                    onClick={() => downloadAsPDF('result-content', '${tool.name}')}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] text-[#16A34A] hover:bg-[#DCFCE7] font-bold rounded-xl transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium"><History className="w-4 h-4" /> Your creations are saved in history</div>
                </div>
              </div>

              <div id="result-content" className="flex-grow overflow-y-auto custom-scrollbar pr-2 min-h-0">
                <div className="prose prose-sm md:prose-base max-w-none prose-p:text-[#4B5563] prose-headings:text-[#111827] prose-strong:text-[#111827] prose-li:text-[#4B5563]">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(compDir, `${clientName}.tsx`), clientContent);
  console.log(`Generated frontend for ${tool.name}`);
});
