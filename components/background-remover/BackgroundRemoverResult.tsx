import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Share2, PenTool, Crown } from 'lucide-react';
import DownloadModal from '../ai-image-generator/DownloadModal';
import ShareModal from '../ai-image-generator/ShareModal';

export default function BackgroundRemoverResult() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const dogImageUrl = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80"; // Dog on white background

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Original Image */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-[#111827]">Original Image</span>
          <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-inner">
            <Image 
              src={dogImageUrl}
              alt="Original image" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Background Removed Image */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-bold text-[#111827]">Background Removed</span>
          <div className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-inner" 
            style={{ backgroundImage: 'conic-gradient(#E5E7EB 90deg, #FFFFFF 90deg 180deg, #E5E7EB 180deg 270deg, #FFFFFF 270deg)', backgroundSize: '24px 24px' }}>
            
            {/* Using CSS mix-blend-multiply to mock background removal of the white background */}
            <Image 
              src={dogImageUrl}
              alt="Removed background" 
              fill 
              className="object-cover mix-blend-multiply"
            />
            
            <button className="absolute top-3 right-3 bg-white border border-[#E5E7EB] px-3 py-1.5 rounded-lg text-xs font-bold text-[#111827] shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-[#6D5EF8]" /> Edit
            </button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button 
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#6D5EF8]/20 transition-all"
        >
          <Download className="w-4 h-4" /> Download PNG
        </button>
        <button 
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-gray-400" /> Download JPG
        </button>
        <button 
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
        >
          <Download className="w-4 h-4 text-[#6D5EF8]" /> Download HD <Crown className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
        </button>
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
        >
          <Share2 className="w-4 h-4 text-gray-400" /> Share
        </button>
        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
          <PenTool className="w-4 h-4 text-gray-400" /> Edit More
        </button>
      </div>

      {/* Modals */}
      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} imageUrl={dogImageUrl} />
    </div>
  );
}
