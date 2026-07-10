"use client";

import React, { useState } from 'react';
import { 
  Lightbulb, Clipboard, Sparkles, Info, History, LayoutGrid,
  Code2, Trash2, Edit2, Play, ChevronRight, CheckCircle2,
  Terminal, FileCode2, Database, Layout, Smartphone, Cloud
} from 'lucide-react';
import AiCodeResult from './AiCodeResult';
import AiCodeEmpty from './AiCodeEmpty';
import AiCodeHistory from './AiCodeHistory';

export default function AiCodeClient() {
  const [prompt, setPrompt] = useState('');
  const [additionalReq, setAdditionalReq] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [framework, setFramework] = useState('React');
  const [codeType, setCodeType] = useState('Frontend (Web)');

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsProcessing(true);
    setProgress(0);
    setHasResult(false);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      setHasResult(true);
    }, 4000);
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      
      {/* Left Sidebar (Hidden in History View) */}
      {!showHistory && (
        <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
          
          {/* 1. Prompt */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                1. Describe what you want to code <Info className="w-3.5 h-3.5 text-gray-400" />
              </label>
              {hasResult && (
                <button 
                  onClick={() => setHasResult(false)}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#6D5EF8] hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                >
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
              {hasResult ? (
                <div className="h-32 flex flex-col justify-between">
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {prompt}
                  </p>
                  <div className="text-[10px] text-gray-400 font-medium text-right mt-2">
                    {prompt.length} / 2000
                  </div>
                </div>
              ) : (
                <div className="relative border border-[#E5E7EB] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all bg-[#FAFAFA]">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build..."
                    className="w-full h-32 p-3 bg-transparent resize-none text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none"
                  />
                  <div className="flex items-center justify-between px-3 py-2 bg-white border-t border-[#E5E7EB]">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 text-[11px] font-semibold text-[#4B5563] transition-colors">
                        <Lightbulb className="w-3 h-3 text-[#F59E0B]" /> Example Ideas
                      </button>
                      <button 
                        onClick={() => setPrompt('')}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 text-[11px] font-semibold text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Clear
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{prompt.length} / 2000</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Language */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
              2. Choose Language
            </label>
            <div className="relative">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111827] font-semibold focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] cursor-pointer shadow-sm pl-11"
              >
                <option>HTML</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>React</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <div className="w-5 h-5 bg-[#E44D26] rounded-sm flex items-center justify-center text-[10px] font-bold text-white leading-none">5</div>
              </div>
            </div>
          </div>

          {/* 3. Framework */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
              3. Framework / Library (Optional)
            </label>
            <div className="relative">
              <select 
                value={framework}
                onChange={(e) => setFramework(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111827] font-semibold focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] cursor-pointer shadow-sm pl-11"
              >
                <option>Tailwind CSS</option>
                <option>Bootstrap</option>
                <option>Next.js</option>
                <option>None</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                {/* Simulated Tailwind icon */}
                <svg className="w-5 h-5 text-[#38B2AC]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Code Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
              4. Code Type
            </label>
            <div className="relative">
              <select 
                value={codeType}
                onChange={(e) => setCodeType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#111827] font-semibold focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] cursor-pointer shadow-sm"
              >
                <option>Frontend (Web)</option>
                <option>Backend API</option>
                <option>Database Schema</option>
                <option>Script / Utility</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* 5. Additional Requirements */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827] mb-3">
              5. Add Additional Requirements (Optional)
            </label>
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-1 shadow-sm focus-within:ring-1 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all">
              <textarea
                value={additionalReq}
                onChange={(e) => setAdditionalReq(e.target.value)}
                placeholder="e.g. Add dark mode, animations, etc."
                className="w-full h-24 p-3 bg-transparent resize-none text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none"
              />
              <div className="flex justify-end px-3 pb-2">
                <span className="text-[10px] text-gray-400 font-medium">{additionalReq.length} / 500</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button 
              disabled={isProcessing}
              onClick={hasResult ? () => setHasResult(false) : handleGenerate}
              className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5]'}`}
            >
              <Sparkles className="w-5 h-5" /> {hasResult ? 'Regenerate Code' : 'Generate Code'}
            </button>
            <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
              This will cost 2 credits <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
            </div>
          </div>
        </aside>
      )}

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Header Logic: Show Empty State Header OR nothing if Result handles it. */}
        {!hasResult && !isProcessing && !showHistory && (
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                  AI Code Generator <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
                </h1>
                <p className="text-sm text-[#6B7280]">Turn your ideas into production-ready code.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
              >
                <History className="w-4 h-4 text-[#6B7280]" /> History
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
              >
                <LayoutGrid className="w-4 h-4 text-[#6B7280]" /> My Creations
              </button>
            </div>
          </div>
        )}

        {isProcessing ? (
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[600px] animate-in fade-in duration-300">
            <div className="relative w-24 h-24 mb-6 animate-pulse bg-[#EEF2FF] rounded-2xl flex items-center justify-center border-2 border-[#6D5EF8]">
              <Code2 className="w-10 h-10 text-[#6D5EF8]" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Writing Code...</h2>
            <p className="text-[#6B7280]">Our AI is currently generating your files and formatting the code.</p>
          </div>
        ) : hasResult && !showHistory ? (
          <AiCodeResult onHistoryClick={() => setShowHistory(true)} />
        ) : showHistory ? (
          <AiCodeHistory onClose={() => setShowHistory(false)} />
        ) : (
          <AiCodeEmpty 
            onSelectPrompt={(p, lang, frame) => {
              setPrompt(p);
              setLanguage(lang);
              setFramework(frame);
            }} 
          />
        )}
      </main>
    </div>
  );
}
