import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Home, ChevronRight, Wand2, Shuffle, Image as ImageIcon, 
  History, LayoutGrid, Crown, Info, Sparkles, ChevronDown, Star 
} from 'lucide-react';

import ImageGeneratorClient from '@/components/ai-image-generator/ImageGeneratorClient';

export const metadata: Metadata = {
  title: 'AI Image Generator | QuickTools.ai',
  description: 'Create stunning images from text descriptions with the power of AI.',
};

export default function AIImageGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm">
          <Link href="/" className="flex items-center text-[#6B7280] hover:text-[#111827] transition-colors">
            <Home className="w-4 h-4 mr-1.5" />
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <Link href="/tools" className="text-[#6B7280] hover:text-[#111827] transition-colors">
            All Tools
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-[#D1D5DB]" />
          <span className="font-semibold text-[#6D5EF8]">AI Image Generator</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex-grow w-full">
        <ImageGeneratorClient />
      </div>
    </div>
  );
}
