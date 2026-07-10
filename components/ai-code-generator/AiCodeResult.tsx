"use client";

import React, { useState } from 'react';
import { 
  Code2, History, LayoutGrid, Maximize, Copy, Download, Play, 
  Box, ExternalLink, Lightbulb, Edit3, Headphones, Sparkles
} from 'lucide-react';
import AiCodeDownloadModal from './AiCodeDownloadModal';

interface AiCodeResultProps {
  onHistoryClick: () => void;
}

export default function AiCodeResult({ onHistoryClick }: AiCodeResultProps) {
  const [activeTab, setActiveTab] = useState('html');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SaaS Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="font-sans text-gray-800">

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <div class="text-2xl font-bold text-purple-600">SaaSify</div>
        <div class="hidden md:flex space-x-6">
            <a href="#" class="text-gray-600 hover:text-purple-600">Features</a>
            <a href="#" class="text-gray-600 hover:text-purple-600">Pricing</a>
            <a href="#" class="text-gray-600 hover:text-purple-600">About</a>
        </div>
        <a href="#" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Get Started</a>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-purple-50 to-white py-20">
        <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
            <div>`;

  return (
    <div className="flex flex-col animate-in fade-in duration-500 min-w-0">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#6D5EF8] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
              Your Code is Ready! <span className="text-xl">🚀</span>
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">Your AI-generated code is ready to use. You can copy, download or edit it.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={onHistoryClick} className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
            <History className="w-4 h-4 text-[#6B7280]" /> History
          </button>
          <button onClick={onHistoryClick} className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-semibold text-[#111827] hover:bg-gray-50 transition-all shadow-sm">
            <LayoutGrid className="w-4 h-4 text-[#6B7280]" /> My Creations
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start min-w-0">
        
        {/* Left Column (Code Editor & Actions) */}
        <div className="w-full flex-grow flex flex-col gap-6 min-w-0">
          
          {/* Code Editor Block */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col min-w-0">
            
            {/* Tabs Header */}
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-2 py-2 bg-white overflow-x-auto custom-scrollbar">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setActiveTab('html')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'html' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                >
                  <div className="w-4 h-4 bg-[#E44D26] rounded-sm flex items-center justify-center text-[8px] font-bold text-white shrink-0">5</div>
                  index.html
                </button>
                <button 
                  onClick={() => setActiveTab('css')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'css' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                >
                  <div className="w-4 h-4 bg-[#264DE4] rounded-sm flex items-center justify-center text-[8px] font-bold text-white shrink-0">3</div>
                  style.css
                </button>
                <button 
                  onClick={() => setActiveTab('js')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${activeTab === 'js' ? 'bg-[#EEF2FF] text-[#6D5EF8]' : 'text-[#6B7280] hover:bg-gray-50'}`}
                >
                  <div className="w-4 h-4 bg-[#F7DF1E] rounded-sm flex items-center justify-center text-[8px] font-bold text-black shrink-0">JS</div>
                  script.js
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-gray-50 hover:text-[#111827] transition-colors shrink-0">
                <Maximize className="w-4 h-4" /> Fullscreen
              </button>
            </div>

            {/* Code Content */}
            <div className="bg-[#1e1e2e] relative overflow-hidden flex flex-col group min-h-[400px]">
              {/* Overlay Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur-md transition-colors">
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </button>
                <button 
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold backdrop-blur-md transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>

              {/* Code Pre/Code block with line numbers */}
              <div className="flex flex-grow text-sm font-mono overflow-auto custom-scrollbar relative p-4">
                {/* Line Numbers */}
                <div className="flex flex-col text-right pr-4 text-[#6e6e8e] select-none sticky left-0 bg-[#1e1e2e] border-r border-[#313244] shrink-0 min-h-full">
                  {Array.from({length: 25}).map((_, i) => (
                    <span key={i} className="leading-6">{i + 1}</span>
                  ))}
                </div>
                {/* Code Body */}
                <div className="pl-4 text-[#cdd6f4] whitespace-pre min-w-max leading-6">
                  {htmlCode}
                </div>
              </div>
            </div>
          </div>

          {/* Run Code Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-sm font-bold text-[#111827] w-20">Run Code</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#6D5EF8] text-[#6D5EF8] rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm">
                <Play className="w-4 h-4" /> Live Preview
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <Box className="w-4 h-4" /> Open in CodePen
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#4B5563] rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
                <ExternalLink className="w-4 h-4" /> Open in JSFiddle
              </button>
            </div>
          </div>

          {/* Tip Banner */}
          <div className="bg-[#F5F3FF] rounded-xl border border-[#EDE9FE] p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563] shadow-sm mt-4">
            <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
            <span className="font-bold text-[#111827]">Tip:</span> Be more specific in your description to get better results.
          </div>

        </div>

        {/* Right Column (Sidebar Details) */}
        <div className="w-full xl:w-[320px] shrink-0 space-y-6">
          
          {/* Code Explanation */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6D5EF8]" /> Code Explanation
            </h3>
            <ul className="space-y-3">
              <li className="text-xs text-[#4B5563] flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] mt-1.5 shrink-0"></div>
                <span>Creates a responsive SaaS landing page using HTML, Tailwind CSS and JavaScript.</span>
              </li>
              <li className="text-xs text-[#4B5563] flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] mt-1.5 shrink-0"></div>
                <span>Includes a navigation bar, hero section, features, pricing and footer.</span>
              </li>
              <li className="text-xs text-[#4B5563] flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] mt-1.5 shrink-0"></div>
                <span>Fully responsive and modern UI design.</span>
              </li>
              <li className="text-xs text-[#4B5563] flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] mt-1.5 shrink-0"></div>
                <span>You can customize the content and styles easily.</span>
              </li>
            </ul>
          </div>

          {/* Files Generated */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4">Files Generated</h3>
            <div className="space-y-2 mb-4">
              
              <div 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#E44D26] rounded-sm flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-sm">5</div>
                  <span className="text-sm font-semibold text-[#111827]">index.html</span>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
              </div>
              
              <div 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#264DE4] rounded-sm flex items-center justify-center text-[9px] font-bold text-white shrink-0 shadow-sm">3</div>
                  <span className="text-sm font-semibold text-[#111827]">style.css</span>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
              </div>
              
              <div 
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] hover:border-gray-300 transition-colors bg-[#FAFAFA] group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 bg-[#F7DF1E] rounded-sm flex items-center justify-center text-[9px] font-bold text-black shrink-0 shadow-sm">JS</div>
                  <span className="text-sm font-semibold text-[#111827]">script.js</span>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-[#6D5EF8] transition-colors" />
              </div>

            </div>
            
            <button 
              onClick={() => setIsDownloadModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#6D5EF8] text-sm font-bold text-[#6D5EF8] hover:bg-[#F5F3FF] transition-colors"
            >
              <Download className="w-4 h-4" /> Download All Files
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Edit3 className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Edit the code to fit your needs.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Download className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Download and deploy on your server.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5"><Headphones className="w-4 h-4 text-[#6B7280]" /></div>
                <p className="text-xs text-[#4B5563] leading-relaxed">Need help? Contact our support.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <AiCodeDownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </div>
  );
}
