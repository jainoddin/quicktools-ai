'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ChevronDown, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Use purple for tools page, indigo for home page
  const themeColor = pathname.startsWith('/tools') ? '#6D5EF8' : '#4F46E5';
  const hoverColor = pathname.startsWith('/tools') ? '#5B4DF5' : '#4338CA';
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes textSlideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes lightSweep {
          0% { left: -100%; opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { left: 150%; opacity: 0; }
        }
        .animate-reveal-text {
          opacity: 0;
          animation: textSlideIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.3s;
        }
        .sweep-mask {
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        .sweep-mask::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 25px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
          transform: skewX(-20deg);
          animation: lightSweep 4s cubic-bezier(0.16, 1, 0.3, 1) infinite 2s;
          pointer-events: none;
        }
      `}} />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" style={{backgroundColor: themeColor}}></div>
            <Zap className="w-7 h-7 relative z-10 group-hover:scale-125 group-hover:rotate-[20deg] group-hover:text-fuchsia-500 group-hover:fill-fuchsia-500 transition-all duration-300" style={{color: themeColor, fill: themeColor}} />
          </div>
          
          <span className="text-2xl font-black tracking-tighter animate-reveal-text sweep-mask px-1">
            <span className="text-[#111827] transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:to-fuchsia-500" style={{'--tw-gradient-from': themeColor} as any}>QuickTools</span>
            <span className="transition-colors duration-300 group-hover:text-fuchsia-500" style={{color: themeColor}}>.ai</span>
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#6B7280]">
          <Link href="/" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/') ? {color: themeColor} : {}}>Home</Link>
          <Link href="/tools" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/tools') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/tools') ? {color: themeColor} : {}}>All Tools</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#111827] transition-colors">
            Categories <ChevronDown className="w-4 h-4" />
          </div>
          <Link href="/blog" className="hover:text-[#111827] transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-[#111827] transition-colors">Pricing</Link>
          <Link href="/about" className="hover:text-[#111827] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#111827] transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-[#6B7280] hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
            <Moon className="w-5 h-5" />
          </button>
          <button className="text-sm font-semibold text-[#111827] transition-colors px-4 py-2 hidden sm:block" style={{':hover': {color: themeColor}} as any}>
            Login
          </button>
          <button className="text-white text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md" style={{backgroundColor: themeColor}}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
