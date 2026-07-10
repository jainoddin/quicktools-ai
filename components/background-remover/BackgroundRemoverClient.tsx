'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Upload, Image as ImageIcon, CheckCircle2, 
  Crown, Info, Sparkles, History, LayoutGrid, Trash2, Loader2
} from 'lucide-react';
import BackgroundRemoverResult from './BackgroundRemoverResult';
import HistoryView from './HistoryView';
import BackgroundRemovalProgress from './BackgroundRemovalProgress';

export default function BackgroundRemoverClient() {
  const [activeView, setActiveView] = useState<'generate' | 'history'>('generate');
  const [bgOption, setBgOption] = useState<'transparent' | 'white' | 'custom'>('transparent');
  const [quality, setQuality] = useState<'standard' | 'hd'>('standard');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleMockUpload = () => {
    const mockFile = new File([""], "dog-image.jpg", { type: "image/jpeg" });
    setImageFile(mockFile);
  };

  const handleRemoveBackground = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150); // 150ms * 20 = 3000ms

    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      setHasResult(true);
    }, 3000);
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar Controls */}
      <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
        
        {/* 1. Upload Image */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">1. Upload Image</h3>
          
          {hasResult || imageFile ? (
            <div className="border border-[#E5E7EB] bg-white rounded-2xl p-4 flex flex-col gap-4 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 border border-gray-200">
                    <Image src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=200&q=80" alt="Thumbnail" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827] truncate max-w-[120px]">{imageFile?.name || 'dog-image.jpg'}</h4>
                    <p className="text-xs text-[#6B7280]">720 x 720 px</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setHasResult(false); setImageFile(null); }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => { setHasResult(false); setImageFile(null); }}
                className="w-full flex items-center justify-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-gray-50 text-[#6D5EF8] px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
              >
                <Upload className="w-4 h-4" /> Change Image
              </button>
              <p className="text-[10px] text-[#9CA3AF] text-center uppercase tracking-wider font-semibold">PNG, JPG, JPEG, WEBP up to 10MB</p>
            </div>
          ) : (
            <div 
              onClick={handleMockUpload}
              className="border-2 border-dashed border-[#6D5EF8]/30 bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all hover:border-[#6D5EF8]/60 hover:bg-[#EEF2FF]/50 cursor-pointer shadow-sm relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#6D5EF8]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10 w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-[#6D5EF8]" />
              </div>
              <p className="relative z-10 text-sm font-medium text-[#111827] mb-1">Drag & drop your image here</p>
              <p className="relative z-10 text-xs text-[#6B7280] mb-4">or</p>
              <button className="relative z-10 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2">
                <Upload className="w-4 h-4" /> Upload Image
              </button>
              <p className="relative z-10 text-[10px] text-[#9CA3AF] mt-4 font-semibold uppercase tracking-wider">PNG, JPG, JPEG, WEBP up to 10MB</p>
            </div>
          )}
        </div>

        {/* 2. Choose Background */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">2. Choose Background</h3>
          <div className="space-y-2.5">
            
            {/* Transparent Option */}
            <div 
              onClick={() => setBgOption('transparent')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'transparent' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200 shrink-0" style={{ backgroundImage: 'conic-gradient(#E5E7EB 90deg, #FFFFFF 90deg 180deg, #E5E7EB 180deg 270deg, #FFFFFF 270deg)', backgroundSize: '8px 8px' }}></div>
                <span className={`text-sm font-bold ${bgOption === 'transparent' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>Transparent</span>
              </div>
              {bgOption === 'transparent' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>

            {/* White Option */}
            <div 
              onClick={() => setBgOption('white')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'white' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm shrink-0"></div>
                <span className={`text-sm font-bold ${bgOption === 'white' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>White</span>
              </div>
              {bgOption === 'white' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              )}
            </div>

            {/* Custom Color Option */}
            <div 
              onClick={() => setBgOption('custom')}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${bgOption === 'custom' ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] bg-white hover:border-gray-300 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[conic-gradient(hsl(360,100%,50%),hsl(315,100%,50%),hsl(270,100%,50%),hsl(225,100%,50%),hsl(180,100%,50%),hsl(135,100%,50%),hsl(90,100%,50%),hsl(45,100%,50%),hsl(0,100%,50%))] shrink-0 border border-gray-200"></div>
                <span className={`text-sm font-bold ${bgOption === 'custom' ? 'text-[#6D5EF8]' : 'text-[#111827]'}`}>Custom Color</span>
              </div>
              {bgOption === 'custom' ? (
                <CheckCircle2 className="w-5 h-5 text-[#6D5EF8] fill-white" />
              ) : (
                <div className="w-5 h-5 rounded-md border-2 border-gray-300"></div>
              )}
            </div>

          </div>
        </div>

        {/* 3. More Options (Quality) */}
        <div>
          <h3 className="text-sm font-bold text-[#111827] mb-3">
            3. More Options
          </h3>
          <div className="mb-2 flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#111827]">Image Quality</span>
            <Info className="w-3.5 h-3.5 text-[#9CA3AF] cursor-pointer hover:text-[#6B7280]" />
          </div>
          <div className="flex bg-white rounded-xl border border-[#E5E7EB] p-1 shadow-sm">
            <button 
              onClick={() => setQuality('standard')}
              className={`flex-1 py-2 text-xs transition-all rounded-lg ${quality === 'standard' ? 'font-bold text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/20 shadow-sm' : 'font-semibold text-[#6B7280] hover:text-[#111827]'}`}
            >
              Standard
            </button>
            <button 
              onClick={() => setQuality('hd')}
              className={`flex-1 py-2 text-xs flex items-center justify-center gap-1.5 transition-all rounded-lg ${quality === 'hd' ? 'font-bold text-[#6D5EF8] bg-[#EEF2FF] border border-[#6D5EF8]/20 shadow-sm' : 'font-semibold text-[#6B7280] hover:text-[#111827]'}`}
            >
              HD <Crown className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button 
            disabled={!imageFile || isProcessing || hasResult}
            onClick={hasResult ? () => setHasResult(false) : handleRemoveBackground}
            className={`w-full text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-sm ${(!imageFile || isProcessing || hasResult) ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#6D5EF8] hover:bg-[#5B4DF5] shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 hover:-translate-y-0.5'}`}>
            {isProcessing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              <><Sparkles className={`w-5 h-5 ${imageFile && !hasResult && 'group-hover:scale-110 transition-transform'}`} /> {hasResult ? 'Remove Another' : 'Remove Background'}</>
            )}
          </button>
          <div className="flex items-center justify-center mt-3 text-xs text-[#9CA3AF]">
            This will cost 1 credit <Info className="w-3.5 h-3.5 ml-1 cursor-pointer hover:text-[#6B7280]" />
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
              {isProcessing ? (
                <>Removing Background... <span className="text-xl">⏳</span></>
              ) : hasResult ? (
                <>Background Removed! <CheckCircle2 className="w-8 h-8 text-[#10B981] fill-[#10B981]/20" strokeWidth={3} /></>
              ) : (
                <>Background Remover <span className="text-xl">✨</span></>
              )}
            </h1>
            <p className="text-[#6B7280] text-sm lg:text-base mt-2">
              {isProcessing ? 'Please wait while our AI analyzes and removes the background.' : hasResult ? 'Your image background has been removed successfully.' : 'Remove image background instantly with AI.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('history')}
              className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm"
            >
              <History className="w-4 h-4 text-[#6B7280]" /> History
            </button>
            <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
              <LayoutGrid className="w-4 h-4 text-[#6B7280]" /> My Creations
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {isProcessing ? (
          <BackgroundRemovalProgress progress={progress} onCancel={handleCancel} />
        ) : hasResult ? (
          <BackgroundRemoverResult />
        ) : (
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
            
            <h3 className="text-xl font-bold text-[#111827] mb-2">No image selected</h3>
            <p className="text-sm text-[#6B7280] max-w-xs mx-auto leading-relaxed">
              Upload an image from the left panel<br/>to get started
            </p>
          </div>
        )}

        {/* Upgrade Banner */}
        <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center shrink-0 shadow-md shadow-[#6D5EF8]/20">
              <Crown className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#111827] mb-0.5">Upgrade to Pro</h4>
              <p className="text-xs text-[#6B7280]">Unlock HD quality, batch processing and more premium features.</p>
            </div>
          </div>
          <button className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#6D5EF8] hover:border-[#6D5EF8] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
            <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Upgrade to Pro
          </button>
        </div>

        </main>
      )}
    </div>
  );
}
