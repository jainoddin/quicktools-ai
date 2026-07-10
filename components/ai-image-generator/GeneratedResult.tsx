'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Download, Crown, Share2, RefreshCw, PenTool, Sparkles, Heart, Maximize2, Copy, Cpu, Palette, Layout, Award, Calendar, Hash } from 'lucide-react';
import DownloadModal from './DownloadModal';
import ShareModal from './ShareModal';

interface GeneratedResultProps {
  imageUrl: string;
  prompt: string;
}

export default function GeneratedResult({ imageUrl, prompt }: GeneratedResultProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Main Image Container */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden group shadow-lg border border-[#E5E7EB]">
        <Image 
          src={imageUrl}
          fill
          alt="Generated AI Image"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
        
        {/* Overlay Badges and Actions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4">
          <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full">
            HD
          </div>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/90 hover:bg-white text-gray-700 hover:text-red-500 backdrop-blur-md p-2 rounded-full shadow-sm transition-all">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-white/90 hover:bg-white text-gray-700 hover:text-black backdrop-blur-md p-2 rounded-full shadow-sm transition-all">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={() => setIsDownloadModalOpen(true)}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Download
        </button>
        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
          <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Download HD
        </button>
        
        {/* Divider on desktop */}
        <div className="hidden lg:block w-px h-6 bg-gray-200 mx-1"></div>

        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#6B7280]" /> Share
        </button>
        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
          <RefreshCw className="w-4 h-4 text-[#6B7280]" /> Regenerate
        </button>
        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
          <PenTool className="w-4 h-4 text-[#6B7280]" /> Edit Prompt
        </button>
        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#111827] px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors">
          <Sparkles className="w-4 h-4 text-[#6D5EF8]" /> Create Similar
        </button>
      </div>

      {/* Image Details */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl flex flex-col overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-[#E5E7EB] bg-gray-50/50">
          <h4 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">Image Details</h4>
        </div>
        <div className="px-4 py-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-4 gap-x-2">
          
          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Cpu className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Model</p>
              <p className="text-xs font-bold text-[#111827]">DALL-E 3</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>
          
          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Palette className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Style</p>
              <p className="text-xs font-bold text-[#111827]">Realistic</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>
          
          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Layout className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Aspect Ratio</p>
              <p className="text-xs font-bold text-[#111827]">16:9 (Landscape)</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>
          
          <div className="flex items-center gap-2.5 w-[45%] lg:w-auto">
            <Award className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Quality</p>
              <p className="text-xs font-bold text-[#111827]">HD</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>
          
          <div className="flex items-center gap-2.5 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">
            <Calendar className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <div>
              <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Created</p>
              <p className="text-xs font-bold text-[#111827]">May 22, 2024, 2:30 PM</p>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-8 bg-[#E5E7EB]"></div>
          
          <div className="flex items-center justify-between gap-4 flex-grow lg:flex-grow-0 w-full lg:w-auto pt-1 lg:pt-0">
            <div className="flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-[#9CA3AF] shrink-0" />
              <div>
                <p className="text-[10px] text-[#6B7280] font-medium leading-tight">Seed</p>
                <p className="text-xs font-bold text-[#111827]">87951234</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-[#6D5EF8] transition-colors p-1.5 hover:bg-gray-50 rounded-md">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          
        </div>
      </div>

      {/* Prompt Used */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col gap-2 shadow-sm relative group">
        <h4 className="text-xs font-semibold text-[#6B7280]">Prompt Used</h4>
        <p className="text-sm text-[#111827] pr-8">{prompt}</p>
        <button className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#6D5EF8] bg-white rounded-lg transition-colors">
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Upgrade Banner */}
      <div className="bg-gradient-to-r from-[#F5F3FF] to-white border border-[#EDE9FE] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111827] mb-0.5">Enjoying the results?</h4>
            <p className="text-xs text-[#6B7280]">Upgrade to Pro for faster generation, unlimited downloads and priority access.</p>
          </div>
        </div>
        <button className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white border-2 border-[#E5E7EB] hover:border-[#6D5EF8] text-[#111827] px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
          <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Upgrade to Pro
        </button>
      </div>

      <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} imageUrl={imageUrl} />
    </div>
  );
}
