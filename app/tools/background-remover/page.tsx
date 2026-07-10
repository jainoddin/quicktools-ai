import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import BackgroundRemoverClient from '@/components/background-remover/BackgroundRemoverClient';

export const metadata: Metadata = {
  title: 'AI Background Remover | QuickTools.ai',
  description: 'Remove image backgrounds instantly with AI. Fast, accurate, and easy to use.',
  keywords: 'background remover, ai background removal, transparent background, image editing',
};

export default function BackgroundRemoverPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#6D5EF8] selection:text-white">
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
          <span className="font-semibold text-[#6D5EF8]">Background Remover</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full flex-grow relative z-0">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -z-10 pointer-events-none -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -z-10 pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

        <BackgroundRemoverClient />
      </div>
    </div>
  );
}
