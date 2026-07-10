"use client";

import React, { useState } from 'react';
import { 
  Search, Grid, List, Bookmark, ChevronDown, LayoutGrid, 
  Sparkles, CheckCircle2, Play, Code2, PenTool, TrendingUp,
  Briefcase, GraduationCap, Newspaper, ArrowRight, Zap, Send
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('All Blogs');
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    { name: 'All Blogs', icon: <LayoutGrid className="w-4 h-4" />, count: 128 },
    { name: 'AI & Tools', icon: <Sparkles className="w-4 h-4" />, count: 32 },
    { name: 'Productivity', icon: <CheckCircle2 className="w-4 h-4" />, count: 18 },
    { name: 'Development', icon: <Code2 className="w-4 h-4" />, count: 24 },
    { name: 'Design', icon: <PenTool className="w-4 h-4" />, count: 16 },
    { name: 'Marketing', icon: <TrendingUp className="w-4 h-4" />, count: 12 },
    { name: 'Business', icon: <Briefcase className="w-4 h-4" />, count: 10 },
    { name: 'Tutorials', icon: <GraduationCap className="w-4 h-4" />, count: 8 },
    { name: 'News & Updates', icon: <Newspaper className="w-4 h-4" />, count: 8 },
  ];

  const popularTags = [
    'AI', 'ChatGPT', 'Web Development', 'No Code', 
    'Automation', 'Productivity', 'SaaS', 'Design'
  ];

  const posts = [
    {
      category: 'AI & Tools',
      title: 'How to Write Better Prompts for ChatGPT (With Examples)',
      desc: 'Learn the art of prompt engineering and get better results from ChatGPT with these proven techniques and examples.',
      author: 'Ananya Verma',
      date: 'May 15, 2024',
      readTime: '6 min read',
      imgColor: 'bg-[#2A1659]',
    },
    {
      category: 'Development',
      title: 'Top 7 VS Code Extensions Every Developer Should Use',
      desc: 'Supercharge your development workflow with these must-have VS Code extensions.',
      author: 'Vikram Patel',
      date: 'May 12, 2024',
      readTime: '5 min read',
      imgColor: 'bg-[#1E293B]',
    },
    {
      category: 'Productivity',
      title: 'Automate Repetitive Tasks with AI (No Code Required)',
      desc: 'Step-by-step guide to automate your daily tasks using AI tools—no code skills needed.',
      author: 'Neha Singh',
      date: 'May 10, 2024',
      readTime: '7 min read',
      imgColor: 'bg-[#F3F4F6]',
    }
  ];

  const popularPosts = [
    {
      title: 'ChatGPT vs Claude vs Gemini: Which is Best?',
      readTime: '6 min read',
      iconBg: 'bg-[#10A37F]'
    },
    {
      title: 'How to Build a SaaS Product in 2024',
      readTime: '10 min read',
      iconBg: 'bg-[#6D5EF8]'
    },
    {
      title: '5 AI Tools for Content Creators',
      readTime: '5 min read',
      iconBg: 'bg-[#F59E0B]'
    },
    {
      title: 'The Future of AI in Productivity',
      readTime: '7 min read',
      iconBg: 'bg-[#FCA5A5]'
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full">
      
      {/* Left Sidebar */}
      <aside className="w-full lg:w-[250px] shrink-0 space-y-8 lg:sticky lg:top-24 lg:self-start pb-4">
        
        {/* Categories */}
        <div>
          <h3 className="font-bold text-[#111827] mb-4">Explore Blogs</h3>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button 
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    activeCategory === cat.name 
                      ? 'bg-[#F5F3FF] text-[#6D5EF8]' 
                      : 'text-[#4B5563] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`${activeCategory === cat.name ? 'text-[#6D5EF8]' : 'text-gray-400'}`}>
                      {cat.icon}
                    </span>
                    {cat.name}
                  </div>
                  <span className={`text-[11px] ${activeCategory === cat.name ? 'text-[#6D5EF8] font-bold' : 'text-gray-400'}`}>
                    {cat.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="bg-[#F5F3FF] rounded-2xl p-5 border border-[#EDE9FE]">
          <h3 className="font-bold text-[#6D5EF8] mb-2 text-sm">Stay Updated</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
            Subscribe to get the latest updates and amazing tips delivered to your inbox.
          </p>
          <div className="space-y-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs focus:outline-none focus:border-[#6D5EF8]"
            />
            <button className="w-full py-2 bg-[#6D5EF8] text-white rounded-lg text-xs font-bold hover:bg-[#5B4DF5] transition-colors flex items-center justify-center gap-2">
              <Send className="w-3 h-3" /> Subscribe
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div>
          <h3 className="font-bold text-[#111827] mb-4 text-sm">Popular Tags</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {popularTags.map(tag => (
              <button key={tag} className="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-colors">
                {tag}
              </button>
            ))}
          </div>
          <button className="text-[11px] font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors flex items-center gap-1">
            View all tags <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-grow min-w-0">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-2 tracking-tight">
              Latest from <span className="text-[#6D5EF8]">QuickTools.ai</span> Blog
            </h1>
            <p className="text-[#6B7280] text-sm">Insights, tutorials and updates to help you work smarter with AI.</p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search blogs..." 
                className="pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm w-full md:w-56"
              />
            </div>
            <div className="flex bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-0.5 shrink-0">
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-1.5 bg-[#EEF2FF] text-[#6D5EF8] rounded-lg">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="relative bg-white border border-[#E5E7EB] rounded-3xl shadow-sm overflow-hidden mb-8 group cursor-pointer flex flex-col md:flex-row min-h-[320px]">
          {/* Content Side */}
          <div className="p-8 md:w-1/2 flex flex-col justify-center relative z-10 bg-white">
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#F5F3FF] text-[#6D5EF8] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                <StarIcon className="w-3 h-3 fill-current" /> Featured
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#111827] mb-4 leading-tight group-hover:text-[#6D5EF8] transition-colors">
              10 AI Tools That Will 10x Your Productivity in 2024
            </h2>
            <p className="text-[#4B5563] mb-6 text-sm leading-relaxed line-clamp-2">
              Discover the most powerful AI tools that can help you save time, automate tasks, and achieve more in less time.
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-gray-100">
                <div className="w-full h-full bg-[#111827] flex items-center justify-center">
                  <span className="text-white text-[10px]">RS</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="font-bold text-[#111827]">Rahul Sharma</span>
                <span>•</span>
                <span>May 17, 2024</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </div>
          </div>
          
          {/* Image Side - simulated with gradient/pattern */}
          <div className="md:w-1/2 h-64 md:h-auto relative bg-[#0F0A1E] overflow-hidden flex items-center justify-center">
            {/* The gradient blend from white to dark */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden md:block"></div>
            
            <div className="relative z-0 w-full h-full flex items-center justify-center p-8">
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6D5EF8] via-transparent to-transparent blur-xl"></div>
               {/* Center Chip */}
               <div className="w-24 h-24 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(109,94,248,0.5)] z-20">
                 <span className="text-white text-4xl font-bold font-serif">AI</span>
               </div>
               
               {/* Floating Icons */}
               <div className="absolute top-1/4 left-1/4 w-10 h-10 bg-[#6D5EF8]/20 backdrop-blur-sm rounded-xl border border-[#6D5EF8]/30 flex items-center justify-center">
                 <Sparkles className="w-5 h-5 text-[#6D5EF8]" />
               </div>
               <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-pink-500/20 backdrop-blur-sm rounded-xl border border-pink-500/30 flex items-center justify-center">
                 <Code2 className="w-6 h-6 text-pink-400" />
               </div>
               <div className="absolute top-1/3 right-1/5 w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 flex items-center justify-center">
                 <LayoutGrid className="w-4 h-4 text-blue-400" />
               </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 border-b border-[#E5E7EB] w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('All')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'All' ? 'border-[#6D5EF8] text-[#6D5EF8]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('Latest')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'Latest' ? 'border-[#6D5EF8] text-[#6D5EF8]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'}`}
            >
              Latest
            </button>
            <button 
              onClick={() => setActiveTab('Popular')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'Popular' ? 'border-[#6D5EF8] text-[#6D5EF8]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'}`}
            >
              Popular
            </button>
            <button 
              onClick={() => setActiveTab('Trending')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'Trending' ? 'border-[#6D5EF8] text-[#6D5EF8]' : 'border-transparent text-[#6B7280] hover:text-[#111827]'}`}
            >
              Trending
            </button>
          </div>

          <div className="relative shrink-0">
            <select className="appearance-none bg-white border border-[#E5E7EB] rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Most Read</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* List of Posts */}
        <div className="space-y-4">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row gap-5 hover:border-[#6D5EF8] hover:shadow-md transition-all group cursor-pointer">
              
              {/* Thumbnail Placeholder */}
              <div className={`w-full sm:w-48 h-48 sm:h-auto rounded-xl shrink-0 ${post.imgColor} overflow-hidden flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                {idx === 0 && <Sparkles className="w-12 h-12 text-white/50 relative z-10" />}
                {idx === 1 && <Code2 className="w-12 h-12 text-white/50 relative z-10" />}
                {idx === 2 && <LayoutGrid className="w-12 h-12 text-gray-400 relative z-10" />}
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col py-1">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] font-bold text-[#6D5EF8] uppercase tracking-wider">{post.category}</span>
                  <button className="text-gray-400 hover:text-[#6D5EF8] transition-colors p-1">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-[#111827] mb-2 leading-tight group-hover:text-[#6D5EF8] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-[#6B7280] text-sm mb-4 line-clamp-2">
                  {post.desc}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                    <span className="text-[#111827] text-[8px] font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <span className="font-bold text-[#111827]">{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </main>

      {/* Right Sidebar */}
      <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 space-y-8 hidden lg:block lg:sticky lg:top-24 lg:self-start pb-4">
        
        {/* Popular Posts */}
        <div>
          <h3 className="font-bold text-[#111827] mb-4">Popular Posts</h3>
          <div className="space-y-4">
            {popularPosts.map((post, idx) => (
              <div key={idx} className="flex gap-3 group cursor-pointer">
                <div className={`w-12 h-12 rounded-xl shrink-0 ${post.iconBg} flex items-center justify-center text-white shadow-sm`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#111827] leading-tight mb-1 group-hover:text-[#6D5EF8] transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">{post.readTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tags Cloud */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-[#111827] mb-4 text-sm">Tags Cloud</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button key={`cloud-${tag}`} className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
                {tag}
              </button>
            ))}
            <button className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
              Tutorial
            </button>
            <button className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
              OpenAI
            </button>
            <button className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
              Business
            </button>
            <button className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
              Workflow
            </button>
            <button className="px-3 py-1.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-[11px] font-semibold text-[#4B5563] hover:bg-white hover:border-[#6D5EF8] hover:text-[#6D5EF8] transition-all shadow-sm">
              Tools
            </button>
          </div>
        </div>

        {/* Promo Box */}
        <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#6D5EF8]/10 rounded-full blur-2xl"></div>
          <div className="w-10 h-10 bg-[#6D5EF8] rounded-xl flex items-center justify-center mb-4 shadow-sm relative z-10">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <h3 className="font-bold text-[#111827] mb-2 relative z-10">Try Our AI Tools</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-4 relative z-10">
            Explore 100+ AI-powered tools to boost your productivity.
          </p>
          <Link href="/tools" className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#6D5EF8] text-white rounded-xl text-xs font-bold hover:bg-[#5B4DF5] transition-all shadow-md active:scale-95 relative z-10">
            Explore Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </aside>

    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
