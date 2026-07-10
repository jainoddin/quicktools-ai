'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const themeColor = pathname.startsWith('/tools') ? '#6D5EF8' : '#4F46E5';

  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-8 mt-auto w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 group cursor-pointer">
              <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <Zap className="w-6 h-6" style={{color: themeColor, fill: themeColor}} />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#111827]">QuickTools<span style={{color: themeColor}}>.ai</span></span>
            </div>
            <p className="text-sm text-[#6B7280] mb-6 pr-4">All AI tools you need in one place. Save time, work smarter, and achieve more with AI.</p>
            <div className="flex items-center gap-4 text-gray-400">
              <Globe className="w-5 h-5 cursor-pointer transition-colors" style={{':hover': {color: themeColor}} as any}/>
              <MessageCircle className="w-5 h-5 cursor-pointer transition-colors" style={{':hover': {color: themeColor}} as any}/>
              <Share2 className="w-5 h-5 cursor-pointer transition-colors" style={{':hover': {color: themeColor}} as any}/>
              <Mail className="w-5 h-5 cursor-pointer transition-colors" style={{':hover': {color: themeColor}} as any}/>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-bold text-sm mb-4 text-[#111827]">Quick Links</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><Link href="/" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Home</Link></li>
              <li><Link href="/tools" className="transition-colors" style={{':hover': {color: themeColor}} as any}>All Tools</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Categories</Link></li>
              <li><Link href="/pricing" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Pricing</Link></li>
              <li><Link href="/blog" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Blog</Link></li>
              <li><Link href="/about" className="transition-colors" style={{':hover': {color: themeColor}} as any}>About Us</Link></li>
              <li><Link href="/contact" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-bold text-sm mb-4 text-[#111827]">Categories</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Image Tools</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Writing Tools</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Video Tools</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Code Tools</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>SEO Tools</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm mb-4 text-[#111827]">Support</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Help Center</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>FAQs</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Privacy Policy</Link></li>
              <li><Link href="#" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Terms of Service</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm mb-4 text-[#111827]">Subscribe</h4>
            <p className="text-xs text-[#6B7280] mb-4">Get the latest updates, new tools, tips, and offers.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:ring-1 transition-all bg-[#F8FAFC]" style={{'--tw-ring-color': themeColor, borderColor: themeColor} as any}/>
              <button className="text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm w-full" style={{backgroundColor: themeColor}}>Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
          <div>© 2024 QuickTools.ai. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Privacy Policy</Link>
            <Link href="/terms" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Terms of Service</Link>
            <Link href="/cookies" className="transition-colors" style={{':hover': {color: themeColor}} as any}>Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
