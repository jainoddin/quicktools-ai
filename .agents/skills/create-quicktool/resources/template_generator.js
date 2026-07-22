const fs = require('fs');
const path = require('path');

const tools = [
  {
    slug: 'ai-legal-loophole-finder',
    componentName: 'LegalLoopholeFinderClient',
    title: 'Legal Loophole Finder',
    desc: 'Find hidden clauses, red flags, and loopholes in legal contracts and rental agreements.',
    icon: 'Scale',
    hexColor: '#EF4444',
    inputLabel: 'Paste your legal document/contract here',
    placeholder: 'e.g. This Lease Agreement is made and entered into...',
    apiPath: '/api/tools/ai-legal-loophole-finder'
  },
  {
    slug: 'ai-conflict-resolver',
    componentName: 'ConflictResolverClient',
    title: 'AI Conflict Resolver',
    desc: 'Craft calm, mature, and de-escalating text messages to resolve conflicts with partners or bosses.',
    icon: 'Handshake',
    hexColor: '#F59E0B',
    inputLabel: 'Describe the conflict or paste the angry message',
    placeholder: 'e.g. My boss just texted me that I missed the deadline again...',
    apiPath: '/api/tools/ai-conflict-resolver'
  },
  {
    slug: 'ai-dream-interpreter',
    componentName: 'DreamInterpreterClient',
    title: 'AI Dream Interpreter',
    desc: 'Analyze your dreams for psychological meaning and hidden messages.',
    icon: 'CloudSun',
    hexColor: '#8B5CF6',
    inputLabel: 'Describe your dream in detail',
    placeholder: 'e.g. I was falling from a tall building but I could breathe underwater...',
    apiPath: '/api/tools/ai-dream-interpreter'
  },
  {
    slug: 'ai-analogy-generator',
    componentName: 'AnalogyGeneratorClient',
    title: 'AI Analogy Generator',
    desc: 'Explain complex tech or legal jargon using simple analogies from sports, movies, or hobbies.',
    icon: 'Lightbulb',
    hexColor: '#06B6D4',
    inputLabel: 'Enter the complex topic or jargon',
    placeholder: 'e.g. Explain Kubernetes and Docker orchestration...',
    apiPath: '/api/tools/ai-analogy-generator'
  },
  {
    slug: 'ai-subscription-optimizer',
    componentName: 'SubscriptionOptimizerClient',
    title: 'Subscription Optimizer',
    desc: 'Analyze your active subscriptions to find feature overlaps and save money instantly.',
    icon: 'DollarSign',
    hexColor: '#10B981',
    inputLabel: 'List your active subscriptions and costs',
    placeholder: 'e.g. Spotify ($10), YouTube Premium ($14), Netflix ($15)...',
    apiPath: '/api/tools/ai-subscription-optimizer'
  }
];

const createClientTsx = (tool) => `
'use client';

import { useToast } from '@/contexts/ToastContext';
import React, { useState, useEffect } from 'react';
import { Download, History, Loader2, Copy, CheckCircle2, Sparkles, RefreshCw, Share2, Building2, Megaphone, ${tool.icon} } from 'lucide-react';
import TextDownloadModal from '@/components/shared/TextDownloadModal';
import { getEndpoint } from '@/lib/api';
import ToolHistorySidebar from '../tools/ToolHistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import LoginPopup from '@/components/auth/LoginPopup';
import ReactMarkdown from 'react-markdown';
import TextGenerationProgress from '../shared/TextGenerationProgress';

export default function ${tool.componentName}() {
  const { error, success } = useToast();
  const { isAuthenticated } = useAuth();
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  
  const [showHistory, setShowHistory] = useState(false);
  const [toolHistory, setToolHistory] = useState<any[]>([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const localStorageKey = 'guest_${tool.slug}_history';
  const toolSlug = '/tools/${tool.slug}';

  useEffect(() => {
    if (!isAuthenticated) {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) setToolHistory(JSON.parse(saved));
    } else {
      fetch(getEndpoint('/api/user/usage'), { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.history) {
            const items = data.data.history
              .filter((item: any) => item.toolSlug === toolSlug)
              .map((item: any) => ({
                id: item._id || Date.now() + Math.random(),
                prompt: item.prompt,
                contentType: '${tool.title}',
                date: new Date(item.createdAt).toLocaleDateString(),
                createdAt: item.createdAt,
                result: item.result,
                isStarred: item.isStarred
              }));
            setToolHistory(items);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated]);

  const handleGenerate = async () => {
    if (!inputVal.trim()) return;
    setIsProcessing(true);
    setResult('');
    
    try {
      const res = await fetch(getEndpoint('${tool.apiPath}'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ input: inputVal }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.text);
        
        if (!isAuthenticated) {
          const historyItem = {
            id: data.usageId || Date.now().toString(),
            prompt: inputVal.substring(0, 100),
            contentType: '${tool.title}',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          };
          const newHistory = [historyItem, ...toolHistory].slice(0, 20);
          setToolHistory(newHistory);
          localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
        } else {
          setToolHistory(prev => [{
            id: data.usageId || Date.now().toString(),
            prompt: inputVal.substring(0, 100),
            contentType: '${tool.title}',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString(),
            result: data.text,
          }, ...prev].slice(0, 50));
        }
      } else {
        error('Failed: ' + data.message);
      }
    } catch (err) {
      error('Error connecting to server');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => prev.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item));
    if (!isAuthenticated) {
      const newHistory = toolHistory.map(item => item.id === id || item._id === id ? { ...item, isStarred: !item.isStarred } : item);
      localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage/' + id + '/favorite'), { method: 'PATCH', credentials: 'include' });
      } catch (err) {
        console.error('Failed to toggle favorite', err);
      }
    }
  };

  const handleDeleteHistory = async (ids: string[]) => {
    setToolHistory(prev => prev.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string)));
    if (!isAuthenticated) {
      const newHistory = toolHistory.filter(item => !ids.includes(item.id as string) && !ids.includes(item._id as string));
      localStorage.setItem(localStorageKey, JSON.stringify(newHistory));
    } else {
      try {
        await fetch(getEndpoint('/api/user/usage'), {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ids })
        });
      } catch (err) {
        console.error('Failed to delete history', err);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <LoginPopup isOpen={showLoginPopup} onClose={() => setShowLoginPopup(false)} />
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
              ${tool.inputLabel}
            </label>
            <span className="text-xs text-[#6B7280]">{inputVal.length}/3000</span>
          </div>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.substring(0, 3000))}
            placeholder="${tool.placeholder}"
            className="w-full h-40 p-4 bg-white rounded-2xl border border-[#E5E7EB] text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[${tool.hexColor}]/20 focus:border-[${tool.hexColor}] transition-all resize-none shadow-sm"
          />
        </div>

        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={isProcessing || !inputVal.trim()}
            className={"w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 " + (isProcessing || !inputVal.trim() ? 'bg-[#9CA3AF] cursor-not-allowed' : 'hover:opacity-90')}
            style={{ backgroundColor: isProcessing || !inputVal.trim() ? '' : '${tool.hexColor}' }}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><${tool.icon} className="w-5 h-5" /> Generate Results</>
            )}
          </button>
        </div>
      
        {/* Interlinks */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-xs font-bold text-[#111827] mb-3">Explore Other Free Tools</h3>
          <div className="flex flex-col gap-2">
            <a href="/tools/ai-business-name-generator" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#F97316]/5 rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#F97316]/30 group-hover:shadow-sm transition-all">
                <Building2 className="w-4 h-4" style={{color:'#F97316'}} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#F97316] transition-colors">Business Name Generator</p>
                <p className="text-[9px] text-[#6B7280]">Find the perfect business name</p>
              </div>
            </a>
            <a href="/tools/ai-ad-copy" className="flex items-center gap-3 p-2.5 bg-[#F9FAFB] hover:bg-[#EF4444]/5 rounded-xl transition-colors group">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center group-hover:border-[#EF4444]/30 group-hover:shadow-sm transition-all">
                <Megaphone className="w-4 h-4" style={{color:'#EF4444'}} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#111827] group-hover:text-[#EF4444] transition-colors">AI Ad Copy Generator</p>
                <p className="text-[9px] text-[#6B7280]">Write converting ad copy</p>
              </div>
            </a>
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm overflow-y-auto h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <ToolHistorySidebar
            toolName="${tool.title}"
            toolType="text"
            history={toolHistory}
            onBack={() => setShowHistory(false)}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDeleteHistory}
          />
        </div>
      ) : (
        <main className="flex-grow flex flex-col min-w-0">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">${tool.title} <Sparkles className="w-6 h-6" style={{ color: '${tool.hexColor}' }} /></h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                ${tool.desc}
              </p>
            </div>
            
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
          </div>

          {/* Generated Result Header */}
          {result && !isProcessing && (
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="text-xl font-extrabold text-[#111827] flex items-center gap-2">
                <Sparkles className="w-6 h-6" style={{ color: '${tool.hexColor}' }} />
                Generated Result
              </h2>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#EEF2FF] text-[#6366F1] rounded-lg text-sm font-medium border border-[#6366F1]/20">
                <History className="w-4 h-4" /> Your creations are saved in history
              </div>
            </div>
          )}

          <div className="flex-grow bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-150">
            {isProcessing ? (
              <TextGenerationProgress title="Generating..." description="Processing your request with AI." />
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
                    style={{ backgroundColor: '${tool.hexColor}' }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={async () => {
                      if (navigator.share) {
                        try {
                          await navigator.share({ title: '${tool.title}', text: result });
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

tools.forEach(tool => {
  const compDir = path.join(__dirname, 'frontend/components', tool.slug);
  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });
  fs.writeFileSync(path.join(compDir, tool.componentName + '.tsx'), createClientTsx(tool));
  console.log('Generated ' + tool.title);
});
