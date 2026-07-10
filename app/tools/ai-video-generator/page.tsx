import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import AiVideoClient from '@/components/ai-video-generator/AiVideoClient';

export const metadata: Metadata = {
  title: 'AI Video Generator - QuickTools.ai',
  description: 'Turn your ideas into stunning videos with AI instantly.',
};

export default function AiVideoGeneratorPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white relative">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 pointer-events-none -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -z-10 pointer-events-none -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] flex-grow flex flex-col">
        
        {/* Top Navigation Row */}
        <div className="flex items-center mb-[25px]">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tools" className="hover:text-[#111827] transition-colors">
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">AI Video Generator</span>
          </nav>
          
        </div>

        {/* Client Component */}
        <AiVideoClient />

      </div>
    </div>
  );
}
