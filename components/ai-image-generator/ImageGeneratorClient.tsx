'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Wand2, Shuffle, Image as ImageIcon, 
  History, LayoutGrid, Crown, Info, Sparkles, ChevronDown, Star, ArrowLeft
} from 'lucide-react';
import GenerationProgress from './GenerationProgress';
import GeneratedResult from './GeneratedResult';
import HistoryView from './HistoryView';
import ErrorModal from './ErrorModal';

export default function ImageGeneratorClient() {
  const [activeView, setActiveView] = useState<'generate' | 'history'>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  // Simulate generation progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(0);
      setGeneratedImage(null);
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate generation completion
            setGeneratedImage("https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=1200&q=80");
            setIsGenerating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50); // Fast forward for testing (5 seconds total)
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = () => {
    if (prompt.trim() === '') {
      setPrompt('A futuristic city at sunset with flying cars, neon lights, and tall skyscrapers');
    }
    
    // Simulate error if prompt equals 'error'
    if (prompt.toLowerCase().trim() === 'error') {
      setHasError(true);
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);
    setHasError(false);
  };

  const handleCancel = () => {
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar Controls */}
      <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
        
        {/* 1. Describe Your Image */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">
            {generatedImage ? '1. Your Prompt' : '1. Describe Your Image'}
          </h3>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-3 shadow-sm focus-within:ring-2 focus-within:ring-[#6D5EF8] focus-within:border-[#6D5EF8] transition-all">
            {generatedImage ? (
              <div className="w-full h-32 text-sm text-[#111827] bg-transparent overflow-y-auto pr-2">
                {prompt}
              </div>
            ) : (
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..." 
                className="w-full h-32 resize-none outline-none text-sm text-[#111827] placeholder-[#9CA3AF] bg-transparent"
              ></textarea>
            )}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3F4F6]">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] transition-colors">
                  <Wand2 className="w-3.5 h-3.5" /> Prompt Ideas
                </button>
                <button 
                  onClick={() => setPrompt('A futuristic city at sunset with flying cars, neon lights, and tall skyscrapers')}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] bg-[#F8FAFC] px-2.5 py-1.5 rounded-lg border border-[#E5E7EB] transition-colors"
                >
                  <Shuffle className="w-3.5 h-3.5" /> Random
                </button>
              </div>
              <span className="text-[10px] text-[#9CA3AF] font-medium">{prompt.length} / 1000</span>
            </div>
          </div>
        </div>

        {/* 2. Choose a Model */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">2. Choose a Model</h3>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-medium text-[#111827] rounded-xl px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer">
              <option>DALL-E 3</option>
              <option>Midjourney v6</option>
              <option>Stable Diffusion XL</option>
            </select>
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <div className="w-4 h-4 rounded-full border-4 border-t-red-500 border-r-blue-500 border-b-green-500 border-l-yellow-500 mr-2"></div>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
            <style dangerouslySetInnerHTML={{__html: `select { padding-left: 2.5rem !important; }`}} />
          </div>
        </div>

        {/* 3. Choose a Style */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">3. Choose a Style</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Realistic', img: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=100&q=80', active: true },
              { name: 'Anime', img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&q=80', active: false },
              { name: '3D Render', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80', active: false },
              { name: 'Digital Art', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&q=80', active: false },
              { name: 'Painting', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&q=80', active: false },
              { name: 'Cyberpunk', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=100&q=80', active: false },
            ].map((style, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div className={`relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200 ${style.active ? 'ring-2 ring-[#6D5EF8] ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'}`}>
                  <Image src={style.img} fill alt={style.name} className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  {style.active && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${style.active ? 'text-[#6D5EF8]' : 'text-[#6B7280] group-hover:text-[#111827]'}`}>{style.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Aspect Ratio */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">4. Aspect Ratio</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { ratio: '1:1', label: 'Square', active: false },
              { ratio: '16:9', label: 'Landscape', active: true },
              { ratio: '9:16', label: 'Portrait', active: false },
              { ratio: '4:3', label: 'Standard', active: false },
            ].map((ar, i) => (
              <div key={i} className={`flex flex-col items-center justify-center py-2 rounded-xl cursor-pointer transition-all border ${ar.active ? 'bg-[#EEF2FF] border-[#6D5EF8] text-[#6D5EF8]' : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:border-gray-300 hover:bg-gray-50'}`}>
                <span className="text-xs font-bold mb-0.5">{ar.ratio}</span>
                <span className="text-[9px]">{ar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Image Quality */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">5. Image Quality</h3>
          <div className="flex bg-white rounded-xl border border-[#E5E7EB] p-1 shadow-sm">
            <button className="flex-1 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827] rounded-lg transition-all">
              Standard
            </button>
            <button className="flex-1 py-2 text-xs font-bold text-[#6D5EF8] bg-[#EEF2FF] rounded-lg border border-[#6D5EF8]/20 flex items-center justify-center gap-1.5 transition-all shadow-sm">
              HD <Crown className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            </button>
          </div>
        </div>

        {/* Generate Button Area */}
        <div className="pt-2">
          <button 
            onClick={generatedImage ? () => setGeneratedImage(null) : handleGenerate}
            disabled={isGenerating && !generatedImage}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm ${isGenerating && !generatedImage ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}>
            <Sparkles className={`w-5 h-5 ${!isGenerating && 'group-hover:scale-110 transition-transform'}`} /> 
            {isGenerating ? 'Generating...' : generatedImage ? 'Create New Image' : 'Generate Image'}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 2 credits <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
          </div>
        </div>

      </aside>

      {/* Right Main Area */}
      {activeView === 'history' ? (
        <HistoryView onClose={() => setActiveView('generate')} />
      ) : (
        <main className="flex-grow flex flex-col min-w-0 space-y-6">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
                {generatedImage ? (
                  <>Your Image is Ready! <span className="text-xl">🎉</span></>
                ) : (
                  <>AI Image Generator <span className="text-xl">✨</span></>
                )}
              </h1>
              <p className="text-[#6B7280] text-sm lg:text-base mt-2">
                {generatedImage 
                  ? "Here is your AI-generated image. You can download, share or create more."
                  : "Create stunning images from text descriptions with the power of AI."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {generatedImage ? (
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-bold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4 text-[#6B7280]" /> Back to Editor
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setActiveView('history')}
                    className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
                  >
                    <History className="w-4 h-4 text-[#6B7280]" /> History
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
                    <LayoutGrid className="w-4 h-4 text-[#6B7280]" /> My Creations
                  </button>
                </>
              )}
            </div>
          </div>

        {/* Dynamic State Rendering */}
        {isGenerating ? (
          <GenerationProgress progress={progress} onCancel={handleCancel} />
        ) : generatedImage ? (
          <GeneratedResult imageUrl={generatedImage} prompt={prompt} />
        ) : (
          <>
            {/* Result Box (Empty State) */}
            <div className="flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-[#111827]">Generated Result</h2>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/10 px-3 py-1.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-[#6D5EF8]" /> Your creations are saved in history
                </div>
              </div>
              
              <div className="flex-grow min-h-[400px] lg:min-h-[500px] bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center justify-center p-8 text-center shadow-sm relative overflow-hidden group">
                
                {/* Empty State Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>

                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 border-2 border-dashed border-[#6D5EF8]/30 rounded-2xl animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-2 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-[#6D5EF8]/60" />
                  </div>
                  <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-[#6D5EF8] animate-pulse" />
                </div>
                
                <h3 className="text-xl font-bold text-[#111827] mb-2">Your AI-generated image will appear here</h3>
                <p className="text-sm text-[#6B7280] max-w-md mx-auto">
                  Enter a prompt, choose your preferences, and click "Generate Image" to create stunning visuals.
                </p>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-4 flex gap-3 shadow-inner">
              <div className="shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827] mb-1">Pro Tip</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Be specific and detailed in your prompt for better results. Include details about style, lighting, mood, colors, and composition.
                </p>
              </div>
            </div>
          </>
        )}

        </main>
      )}

      <ErrorModal 
        isOpen={hasError} 
        onClose={() => setHasError(false)} 
        onRetry={() => {
          setHasError(false);
          setPrompt('A futuristic city at sunset with flying cars, neon lights, and tall skyscrapers');
          setTimeout(() => {
            setIsGenerating(true);
            setGeneratedImage(null);
          }, 100);
        }} 
      />
    </div>
  );
}
