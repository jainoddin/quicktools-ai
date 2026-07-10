'use client';

import React, { useState } from 'react';
import { 
  Lightbulb, Clipboard, Sparkles, Info, Video, History, LayoutGrid,
  Image as ImageIcon, UserCircle2, Box, Clapperboard, CheckCircle2,
  Rocket, GraduationCap, Megaphone, Heart, Play, Edit2
} from 'lucide-react';
import AiVideoProgress from './AiVideoProgress';
import AiVideoResult from './AiVideoResult';
import AiVideoHistory from './AiVideoHistory';

export default function AiVideoClient() {
  const [prompt, setPrompt] = useState('');
  const [videoType, setVideoType] = useState('Explainer Video');
  const [style, setStyle] = useState('Realistic');
  const [duration, setDuration] = useState('30 Sec');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [language, setLanguage] = useState('English (US)');

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setIsProcessing(true);
    setProgress(0);
    
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
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
        
        {/* 1. Prompt */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-bold text-[#111827]">
              1. What do you want to create? <Info className="w-3.5 h-3.5 text-gray-400" />
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
                  {prompt || "Create a realistic explainer video about artificial intelligence in 30 seconds."}
                </p>
                <div className="text-[10px] text-gray-400 font-medium text-right mt-2">
                  {(prompt || "Create a realistic explainer video about artificial intelligence in 30 seconds.").length} / 2000
                </div>
              </div>
            ) : (
              <div className="relative border border-[#E5E7EB] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all bg-[#FAFAFA]">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your video in detail..."
                  className="w-full h-32 p-3 bg-transparent resize-none text-sm text-[#4B5563] placeholder-gray-400 focus:outline-none"
                />
                <div className="flex items-center justify-between px-3 py-2 bg-white border-t border-[#E5E7EB]">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 text-[11px] font-semibold text-[#4B5563] transition-colors">
                      <Lightbulb className="w-3 h-3 text-[#F59E0B]" /> Example Ideas
                    </button>
                    <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-gray-50 text-[11px] font-semibold text-[#4B5563] transition-colors">
                      <Clipboard className="w-3 h-3 text-gray-500" /> Paste Text
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{prompt.length} / 2000</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. Video Type */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">2. Choose Video Type</label>
          <div className="relative">
            <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6D5EF8]" />
            <select 
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#4B5563] appearance-none focus:outline-none focus:border-[#6D5EF8] focus:ring-1 focus:ring-[#6D5EF8]"
            >
              <option>Explainer Video</option>
              <option>Marketing Promo</option>
              <option>Social Media Ad</option>
              <option>Tutorial</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Style */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">3. Choose Style</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'Realistic', icon: ImageIcon, bg: 'bg-blue-50', color: 'text-blue-500' },
              { id: 'Animation', icon: UserCircle2, bg: 'bg-orange-50', color: 'text-orange-500' },
              { id: '3D Render', icon: Box, bg: 'bg-green-50', color: 'text-green-500' },
              { id: 'Cinematic', icon: Clapperboard, bg: 'bg-gray-100', color: 'text-gray-700' }
            ].map((s) => (
              <button 
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all ${style === s.id ? 'border-[#6D5EF8] bg-white ring-2 ring-[#6D5EF8]/20' : 'border-[#E5E7EB] bg-white hover:border-gray-300'}`}
              >
                {style === s.id && (
                  <div className="absolute -top-2 -right-2 bg-[#6D5EF8] rounded-full border-2 border-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-1.5`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <span className={`text-[10px] font-semibold text-center ${style === s.id ? 'text-[#6D5EF8]' : 'text-[#4B5563]'}`}>{s.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Duration */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">4. Duration</label>
          <div className="flex gap-2">
            {['15 Sec', '30 Sec', '60 Sec', '90 Sec'].map((d) => (
              <button 
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border-2 transition-all ${duration === d ? 'border-[#6D5EF8] text-[#6D5EF8] bg-white' : 'border-[#E5E7EB] text-[#4B5563] bg-white hover:border-gray-300'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Aspect Ratio */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">5. Aspect Ratio</label>
          <div className="flex gap-2">
            {[
              { id: '16:9', label: 'Landscape' },
              { id: '9:16', label: 'Portrait' },
              { id: '1:1', label: 'Square' }
            ].map((ratio) => (
              <button 
                key={ratio.id}
                onClick={() => setAspectRatio(ratio.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl border-2 transition-all ${aspectRatio === ratio.id ? 'border-[#6D5EF8] bg-blue-50/50' : 'border-[#E5E7EB] bg-white hover:border-gray-300'}`}
              >
                <span className={`text-xs font-bold ${aspectRatio === ratio.id ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>{ratio.id}</span>
                <span className={`text-[10px] ${aspectRatio === ratio.id ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`}>{ratio.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6. Language */}
        <div>
          <label className="block text-sm font-bold text-[#111827] mb-2">6. Language</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🌐</span>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#4B5563] appearance-none focus:outline-none focus:border-[#6D5EF8] focus:ring-1 focus:ring-[#6D5EF8]"
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            disabled={isProcessing}
            onClick={hasResult ? () => setHasResult(false) : handleGenerate}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${isProcessing ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5]'}`}
          >
            <Sparkles className="w-5 h-5" /> {hasResult ? 'Regenerate Video' : 'Generate Video'}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 2 credits <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
          </div>
        </div>
      </aside>

      {/* Right Main Area */}
      {showHistory ? (
        <AiVideoHistory onClose={() => setShowHistory(false)} />
      ) : (
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Header Logic: Show Empty State Header OR nothing if Result handles it. 
            In the screenshot, Result has its own header. So we hide this header when Result is shown. */}
        {!hasResult && !isProcessing && (
          <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                  AI Video Generator <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
                </h1>
                <p className="text-sm text-[#6B7280]">Turn your ideas into stunning videos with AI.</p>
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
          <AiVideoProgress progress={progress} onCancel={handleCancel} />
        ) : hasResult ? (
          <AiVideoResult />
        ) : (
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center relative h-full min-h-[600px]">
            {/* Empty State */}
          
          {/* Animated Graphic */}
          <div className="relative w-72 h-64 mb-10 flex items-center justify-center mt-4">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#F5F3FF] rounded-full blur-2xl opacity-80"></div>
            
            {/* Clapperboard and Disk Wrapper */}
            <div className="relative z-10 w-48 h-36 transform hover:scale-105 transition-transform duration-500">
              
              {/* Clapperboard Graphic */}
              <div className="absolute inset-0 bg-[#E0E7FF] rounded-xl shadow-[0_10px_30px_-10px_rgba(109,94,248,0.3)] border-4 border-[#B4C6FC] overflow-hidden flex items-center justify-center">
                {/* Clapper top arm */}
                <div className="absolute top-0 left-0 right-0 h-7 bg-[#6D5EF8] flex border-b-4 border-[#B4C6FC]">
                  <div className="flex-1 bg-white skew-x-12 ml-6"></div>
                  <div className="flex-1 bg-white skew-x-12 ml-6"></div>
                  <div className="flex-1 bg-white skew-x-12 ml-6"></div>
                  <div className="flex-1 bg-white skew-x-12 ml-6"></div>
                </div>
                <Play className="w-14 h-14 text-[#6D5EF8] fill-[#6D5EF8] mt-4" />
              </div>

              {/* Film Reel Circle (Spinning) */}
              <div className="absolute -bottom-6 -right-6 z-20 w-24 h-24 bg-[#E0E7FF] rounded-full border-[6px] border-[#B4C6FC] shadow-xl flex items-center justify-center animate-[spin_8s_linear_infinite]">
                {/* Inner details for the reel */}
                <div className="relative w-full h-full">
                  {/* 4 dots arranged in a circle */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6D5EF8] rounded-full"></div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6D5EF8] rounded-full"></div>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#6D5EF8] rounded-full"></div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#6D5EF8] rounded-full"></div>
                  {/* Center hole */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#B4C6FC] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating Sparkles */}
            <Sparkles className="absolute top-8 left-12 w-6 h-6 text-[#A5B4FC]" />
            <Sparkles className="absolute top-12 right-12 w-4 h-4 text-[#A5B4FC]" />
            <Sparkles className="absolute bottom-16 left-6 w-5 h-5 text-[#C7D2FE]" />
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-3">
            Ready to create <span className="text-[#6D5EF8]">your video?</span>
          </h2>
          
          <p className="text-[#6B7280] max-w-sm mx-auto mb-12">
            Describe your video idea on the left and click <span className="text-[#6D5EF8] font-semibold">"Generate Video"</span> to get started.
          </p>

          {/* Example Prompts */}
          <div className="w-full max-w-4xl mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-grow max-w-[100px]"></div>
              <span className="text-sm font-bold text-[#111827]">Try these example prompts</span>
              <div className="h-px bg-gray-200 flex-grow max-w-[100px]"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-start p-4 rounded-2xl border border-[#E5E7EB] bg-white text-left hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <Rocket className="w-4 h-4 text-blue-500" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Product Explainer</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">Create an explainer video for a productivity app.</p>
              </div>

              <div className="flex flex-col items-start p-4 rounded-2xl border border-[#E5E7EB] bg-white text-left hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center mb-3">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Educational Video</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">Make a video about climate change.</p>
              </div>

              <div className="flex flex-col items-start p-4 rounded-2xl border border-[#E5E7EB] bg-white text-left hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mb-3">
                  <Megaphone className="w-4 h-4 text-orange-500" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Marketing Video</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">Promote a new product with exciting visuals.</p>
              </div>

              <div className="flex flex-col items-start p-4 rounded-2xl border border-[#E5E7EB] bg-white text-left hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center mb-3">
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Social Media Reel</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">Create a short reel about healthy lifestyle tips.</p>
              </div>
            </div>
          </div>

          {/* Tip Banner */}
          <div className="w-full bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-auto">
            <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
            <span className="font-bold text-[#111827]">Tip:</span> The more detailed your description, the better your video will turn out!
          </div>
          </div>
        )}
      </main>
      )}
    </div>
  );
}
