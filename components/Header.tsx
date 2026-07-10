'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronDown, Moon, Image as ImageIcon, PenTool, Video, Code, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  // Use purple for tools page, indigo for home page
  const themeColor = pathname.startsWith('/tools') ? '#6D5EF8' : '#4F46E5';
  const hoverColor = pathname.startsWith('/tools') ? '#5B4DF5' : '#4338CA';
  const isActive = (path: string) => pathname === path;
  const isActiveStartsWith = (path: string) => pathname.startsWith(path);

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
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#111827] transition-colors px-3 py-1.5 rounded-full hover:bg-[#F3F4F6]">
              Categories <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 w-[240px]">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest px-3 pt-2 pb-1">AI Tools</p>
                {[
                  { name: 'AI Image Generator', href: '/tools/ai-image-generator', icon: ImageIcon, color: 'bg-[#6D5EF8] text-white' },
                  { name: 'AI Writer', href: '/tools/ai-writer', icon: PenTool, color: 'bg-[#F43F5E] text-white' },
                  { name: 'AI Video Generator', href: '/tools/ai-video-generator', icon: Video, color: 'bg-[#8B5CF6] text-white' },
                  { name: 'AI Code Generator', href: '/tools/ai-code-generator', icon: Code, color: 'bg-[#0EA5E9] text-white' },
                  { name: 'Background Remover', href: '/tools/background-remover', icon: LayoutGrid, color: 'bg-[#10B981] text-white' },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link key={tool.name} href={tool.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F9FAFB] transition-colors group/item">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${tool.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-[#374151] group-hover/item:text-[#111827]">{tool.name}</span>
                    </Link>
                  );
                })}
                <div className="border-t border-[#F3F4F6] mt-1 pt-1">
                  <Link href="/tools" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EEF2FF] transition-colors group/item">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[#EEF2FF]">
                      <LayoutGrid className="w-4 h-4 text-[#6D5EF8]" />
                    </div>
                    <span className="text-sm font-semibold text-[#6D5EF8]">View All Tools →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/blog" className={`px-3 py-1.5 rounded-full transition-colors ${isActiveStartsWith('/blog') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActiveStartsWith('/blog') ? {color: themeColor} : {}}>Blog</Link>
          <Link href="/pricing" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/pricing') ? 'bg-[#EEF2FF]' : 'hover:text-[#111827]'}`} style={isActive('/pricing') ? {color: themeColor} : {}}>Pricing</Link>
          <Link href="/about" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/about') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/about') ? {color: themeColor} : {}}>About</Link>
          <Link href="/contact" className={`px-3 py-1.5 rounded-full transition-colors ${isActive('/contact') ? 'bg-[#F3F4F6]' : 'hover:text-[#111827]'}`} style={isActive('/contact') ? {color: themeColor} : {}}>Contact</Link>
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
