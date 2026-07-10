import React, { useState } from 'react';
import { 
  Download, Crown, Share2, MoreHorizontal, Edit2, Play, Volume2, 
  Maximize, Star, Sparkles, FileText, LayoutGrid, Clock, Type,
  Monitor, Languages, Calendar, Hash, ChevronRight, CheckCircle2
} from 'lucide-react';
import AiVideoDownloadModal from './AiVideoDownloadModal';
import AiVideoShareModal from './AiVideoShareModal';

export default function AiVideoResult() {
  const [activeTab, setActiveTab] = useState<'script' | 'details'>('script');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex flex-col animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
            Your Video is Ready! <span className="text-xl">🎉</span>
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">Your AI video has been generated successfully.</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
            <svg className="w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#6D5EF8] hover:bg-blue-50 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        {/* Left Column (Video & Actions) */}
        <div className="w-full flex-grow space-y-6">
          
          {/* Video Player Mockup */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative group shadow-sm border border-gray-800">
            {/* Thumbnail Image */}
            <img 
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop" 
              alt="AI Generated Video Thumbnail" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Subtitles Overlay */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center px-4">
              <div className="bg-black/60 backdrop-blur-sm text-white text-center px-4 py-2 rounded-lg text-sm sm:text-base font-medium max-w-2xl leading-snug">
                Artificial Intelligence is transforming the world <br/> by enabling machines to think, learn, and solve problems.
              </div>
            </div>

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4 text-white">
                <button className="hover:text-[#6D5EF8] transition-colors">
                  <Play className="w-5 h-5 fill-current" />
                </button>
                
                {/* Progress Bar */}
                <div className="flex-grow h-1.5 bg-gray-600 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="absolute top-0 left-0 h-full bg-[#6D5EF8] w-[25%] rounded-full"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full left-[25%] shadow-md"></div>
                </div>

                <div className="text-xs font-medium font-mono text-gray-300 shrink-0">
                  0:07 / 0:30
                </div>

                <button className="hover:text-white text-gray-300 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="hover:text-white text-gray-300 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" /> Download Video
            </button>
            <button 
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              <Monitor className="w-4 h-4 text-gray-500" /> Download HD <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors">
              <Edit2 className="w-4 h-4 text-gray-500" /> Edit Video
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-500" /> Share
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-3 rounded-xl text-sm font-semibold shadow-sm transition-colors ml-auto">
              <MoreHorizontal className="w-5 h-5 text-gray-500" /> More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rate this video */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111827] mb-1">Rate this video</h3>
                <p className="text-xs text-[#6B7280]">How would you rate the output?</p>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-gray-300 hover:text-[#F59E0B] transition-colors p-1">
                    <Star className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>

            {/* Upgrade to Pro */}
            <div className="bg-[#F8F7FF] rounded-2xl border border-[#E0DDF7] p-5 shadow-sm flex items-center gap-4 group cursor-pointer hover:bg-[#F3F1FF] transition-colors">
              <div className="w-12 h-12 bg-[#6D5EF8] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-bold text-[#111827] mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-[#6B7280]">Unlock HD downloads, remove watermark, longer videos and more.</p>
              </div>
              <button className="bg-white border border-[#6D5EF8] text-[#6D5EF8] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6D5EF8] hover:text-white transition-colors whitespace-nowrap">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full xl:w-[340px] shrink-0 space-y-6">
          
          {/* Tabs Container */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col h-[400px]">
            {/* Tabs Header */}
            <div className="flex border-b border-[#E5E7EB]">
              <button 
                onClick={() => setActiveTab('script')}
                className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeTab === 'script' ? 'text-[#6D5EF8]' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Script
                {activeTab === 'script' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D5EF8]"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-3 text-sm font-bold transition-colors relative ${activeTab === 'details' ? 'text-[#6D5EF8]' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                Details
                {activeTab === 'details' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6D5EF8]"></div>}
              </button>
            </div>
            
            {/* Tabs Content */}
            <div className="flex-grow overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-gray-200">
              {activeTab === 'script' ? (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-[#6D5EF8]">0:00 - 0:05</span>
                    <p className="text-sm text-[#4B5563] leading-relaxed">Artificial Intelligence is transforming the world.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-[#6D5EF8]">0:05 - 0:15</span>
                    <p className="text-sm text-[#4B5563] leading-relaxed">It enables machines to think, learn, and solve complex problems.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-[#6D5EF8]">0:15 - 0:22</span>
                    <p className="text-sm text-[#4B5563] leading-relaxed">From healthcare to transportation, AI is making our lives easier and more efficient.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-semibold text-[#6D5EF8]">0:22 - 0:30</span>
                    <p className="text-sm text-[#4B5563] leading-relaxed">The future is intelligent. The future is AI.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Video Type</span>
                    <span className="text-sm font-semibold text-gray-900">Explainer Video</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Duration</span>
                    <span className="text-sm font-semibold text-gray-900">30 Seconds</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Aspect Ratio</span>
                    <span className="text-sm font-semibold text-gray-900">16:9 (Landscape)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Style</span>
                    <span className="text-sm font-semibold text-gray-900">Realistic</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Language</span>
                    <span className="text-sm font-semibold text-gray-900">English (US)</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">Generated On</span>
                    <span className="text-sm font-semibold text-gray-900">May 17, 2024, 2:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">ID</span>
                    <span className="text-sm font-mono font-semibold text-gray-900">VID-1715943020</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* View Full Script Button */}
            {activeTab === 'script' && (
              <div className="p-4 bg-white border-t border-[#E5E7EB]">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 text-sm font-semibold text-[#6D5EF8] transition-colors">
                  <FileText className="w-4 h-4" /> View Full Script
                </button>
              </div>
            )}
          </div>

          {/* Fallback Details Block if outside Tabs */}
          {activeTab === 'script' && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
              <h3 className="text-sm font-bold text-[#111827] mb-4">Video Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Video Type</span>
                  <span className="text-xs font-semibold text-gray-900">Explainer Video</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Duration</span>
                  <span className="text-xs font-semibold text-gray-900">30 Seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Aspect Ratio</span>
                  <span className="text-xs font-semibold text-gray-900">16:9 (Landscape)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Style</span>
                  <span className="text-xs font-semibold text-gray-900">Realistic</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Language</span>
                  <span className="text-xs font-semibold text-gray-900">English (US)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Generated On</span>
                  <span className="text-xs font-semibold text-gray-900">May 17, 2024, 2:30 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">ID</span>
                  <span className="text-xs font-mono font-semibold text-gray-900">VID-1715943020</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <AiVideoDownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <AiVideoShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
