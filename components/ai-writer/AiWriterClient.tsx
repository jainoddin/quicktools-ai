'use client';

import React, { useState } from 'react';
import { 
  Lightbulb, Clipboard, FileText, Smile, Globe, Sparkles, Info,
  ShoppingBag, MessageSquare, Mail, ChevronDown, Type,
  PenTool, History, LayoutGrid, Loader2
} from 'lucide-react';
import AiWriterResult from './AiWriterResult';
import AiWriterHistory from './AiWriterHistory';
import AiWriterProgress from './AiWriterProgress';

export default function AiWriterClient() {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('Blog Post');
  const [tone, setTone] = useState('Friendly');
  const [language, setLanguage] = useState('English');
  const [creativity, setCreativity] = useState(6);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsProcessing(true);
    setHasResult(false);
    setProgress(0);
    
    // Simulate generation progress over ~3 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setHasResult(true);
          return 100;
        }
        // Random increment between 5 and 15
        return Math.min(100, prev + Math.floor(Math.random() * 10) + 5);
      });
    }, 300);
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      
      {/* Left Sidebar Controls */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
        
        {/* 1. Prompt */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">1. What do you want to write?</label>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm relative z-10">
            <div className="relative mb-4">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the topic or paste your content..."
                className="w-full h-36 resize-none outline-none text-sm text-[#111827] placeholder:text-[#9CA3AF] bg-transparent"
                maxLength={3000}
              />
              <div className="absolute bottom-0 right-0 text-[10px] font-semibold text-[#9CA3AF]">
                {prompt.length} / 3000
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm">
                <Lightbulb className="w-3.5 h-3.5 text-[#6B7280]" /> Example Ideas
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm">
                <Clipboard className="w-3.5 h-3.5 text-[#6B7280]" /> Paste Text
              </button>
            </div>
          </div>
        </div>

        {/* 2. Content Type */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-2">2. Choose Content Type</h3>
          <div className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <FileText className="w-4 h-4 text-[#6D5EF8]" />
            </div>
            <select 
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-semibold text-[#111827] rounded-xl pl-11 pr-10 py-3.5 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer"
            >
              <option>Blog Post</option>
              <option>Email</option>
              <option>Social Media Post</option>
              <option>Product Description</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
          </div>
        </div>

        {/* 3. Tone of Voice */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-2">3. Tone of Voice</h3>
          <div className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Smile className="w-4 h-4 text-[#6B7280]" />
            </div>
            <select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-semibold text-[#111827] rounded-xl pl-11 pr-10 py-3.5 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer"
            >
              <option>Friendly</option>
              <option>Professional</option>
              <option>Persuasive</option>
              <option>Casual</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
          </div>
        </div>

        {/* 4. Language */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-2">4. Language</h3>
          <div className="relative">
            <div className="flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Globe className="w-4 h-4 text-[#6B7280]" />
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-semibold text-[#111827] rounded-xl pl-11 pr-10 py-3.5 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
          </div>
        </div>

        {/* 5. Creativity Level */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-2">5. Creativity Level</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-full flex items-center">
              {/* Fake a styled range input for better aesthetics */}
              <div className="absolute inset-0 h-2 bg-gray-100 rounded-full top-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div 
                className="absolute h-2 bg-[#6D5EF8] rounded-l-full top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: `${(creativity / 10) * 100}%` }}
              ></div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full h-6 opacity-0 cursor-pointer z-10"
              />
              <div 
                className="absolute w-4 h-4 bg-white border-2 border-[#6D5EF8] rounded-full top-1/2 -translate-y-1/2 pointer-events-none shadow-sm"
                style={{ left: `calc(${(creativity / 10) * 100}% - 8px)` }}
              ></div>
            </div>
            <div className="bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-xs font-bold text-[#111827] shadow-sm shrink-0 min-w-[50px] text-center">
              {creativity}/10
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2">
          <button 
            disabled={isProcessing}
            onClick={hasResult ? () => setHasResult(false) : handleGenerate}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg ${isProcessing ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}
          >
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" /> {hasResult ? 'Write Another' : 'Generate Content'}</>
            )}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 1 credit <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {showHistory ? (
          <AiWriterHistory onBack={() => setShowHistory(false)} />
        ) : (
          <>
            {/* Right Header (Icon, Title, Actions) */}
            <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#111827]">AI Writer</h1>
                  <p className="text-sm text-[#6B7280]">Write blogs, emails, articles, and more in seconds.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={() => setShowHistory(true)}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <History className="w-4 h-4 text-[#6B7280]" /> History
                </button>
                <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
                  <LayoutGrid className="w-4 h-4 text-[#6B7280]" /> My Creations
                </button>
              </div>
            </div>

            {isProcessing ? (
              <AiWriterProgress progress={progress} onCancel={handleCancel} />
            ) : hasResult ? (
              <AiWriterResult />
            ) : (
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden h-full min-h-[600px]">
          
          {/* Animated Graphic */}
          <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
            {/* Soft background blob */}
            <div className="absolute inset-0 bg-[#F5F3FF] rounded-full blur-3xl opacity-60"></div>
            
            {/* The Document Graphic */}
            <div className="relative z-10 w-44 h-56 bg-white rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] border border-[#EDE9FE] p-5 flex flex-col gap-4 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="w-16 h-9 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-white font-serif text-xl font-bold">T</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full"></div>
              <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
              <div className="w-full h-2 bg-gray-100 rounded-full mt-3"></div>
              <div className="w-5/6 h-2 bg-gray-100 rounded-full"></div>
              <div className="w-2/3 h-2 bg-gray-100 rounded-full mt-3"></div>
            </div>

            {/* AI Badge - Moved slightly higher */}
            <div className="absolute -right-6 bottom-14 z-20">
              {/* Green dot peeking from behind the AI badge */}
              <div className="absolute top-1 -right-1 w-5 h-5 bg-[#6EE7B7] rounded-full -z-10"></div>
              
              <div className="relative w-20 h-20 bg-[#6D5EF8] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(109,94,248,0.5)] transform rotate-12 hover:rotate-0 transition-transform">
                <span className="text-white font-black text-3xl tracking-tighter">AI</span>
                
                {/* Shine lines */}
                <div className="absolute -top-5 right-2 w-1 h-4 bg-[#A78BFA] rounded-full transform rotate-[25deg]"></div>
                <div className="absolute -top-6 left-1/2 w-1 h-5 bg-[#A78BFA] rounded-full transform -translate-x-1/2 -rotate-[15deg]"></div>
                <div className="absolute top-4 -right-5 w-4 h-1 bg-[#A78BFA] rounded-full transform -rotate-[15deg]"></div>
              </div>
            </div>

            {/* Decorative sparkles */}
            <div className="absolute -top-2 left-[40%] text-[#6D5EF8] animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>

            {/* Connecting dashed looping line (SVGs) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 256 256">
              {/* Loop Path starting from bottom-middle of AI badge */}
              <path 
                d="M 200 190 C 180 270, 110 270, 130 210 C 145 160, 120 220, 75 220" 
                fill="none" 
                stroke="#A78BFA" 
                strokeWidth="3" 
                strokeDasharray="8 8" 
                strokeLinecap="round"
                style={{ animation: 'dashMarch 2s linear infinite' }}
              />
              {/* Arrowhead */}
              <path 
                d="M 75 220 L 87 212 M 75 220 L 85 228" 
                fill="none" 
                stroke="#A78BFA" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
            <style>{`
              @keyframes dashMarch {
                from { stroke-dashoffset: 0; }
                to { stroke-dashoffset: -64; }
              }
            `}</style>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4">
            Ready to Create Amazing Content <span className="text-[#6D5EF8]">✨</span>
          </h2>
          
          <p className="text-[#6B7280] max-w-md mx-auto mb-12">
            Enter a prompt on the left and click Generate Content to create blogs, emails, social posts, and more.
          </p>

          {/* Popular Prompts */}
          <div className="w-full max-w-3xl mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-grow max-w-[60px]"></div>
              <span className="text-sm font-bold text-[#111827]">Try these popular prompts</span>
              <div className="h-px bg-gray-200 flex-grow max-w-[60px]"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => { setPrompt("Write a comprehensive blog post about the future of AI."); setContentType("Blog Post"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <FileText className="w-4 h-4 text-[#6D5EF8]" /> Write a blog about AI
              </button>
              <button onClick={() => { setPrompt("Write a catchy product description for a smart water bottle."); setContentType("Product Description"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <ShoppingBag className="w-4 h-4 text-[#10B981]" /> Product Description
              </button>
              <button onClick={() => { setPrompt("Write a LinkedIn post announcing a new feature launch."); setContentType("Social Media Post"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <MessageSquare className="w-4 h-4 text-[#0A66C2]" /> LinkedIn Post
              </button>
              <button onClick={() => { setPrompt("Write a polite email reply declining an invitation."); setContentType("Email"); }} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                <Mail className="w-4 h-4 text-[#EF4444]" /> Email Reply
              </button>
            </div>
          </div>

          {/* Tip Banner */}
          <div className="w-full bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-auto">
            <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
            <span className="font-bold text-[#111827]">Tip:</span> The more specific your prompt, the better the result!
          </div>

        </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}
