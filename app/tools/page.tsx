import React from 'react';
import { Metadata } from 'next';
import { 
  Search, Zap, Image as ImageIcon, PenTool, Code, Video,
  ArrowRight, LayoutGrid, Moon, MessageCircle, Palette, 
  Briefcase, TrendingUp, Crown, Flame, Sparkles, Star, 
  Clock, Filter, ChevronDown, Globe, Share2, Mail,
  Home, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All AI Tools | QuickTools.ai',
  description: 'Explore our curated collection of 5 premium AI tools including Image Generator, Writer, Code Generator, Background Remover, and Video Generator.',
  alternates: {
    canonical: 'https://quicktools.ai/tools',
  },
};

const categories = [
  { name: 'All Tools', icon: LayoutGrid, count: 56, active: true },
  { name: 'AI Image', icon: ImageIcon, count: 12 },
  { name: 'AI Writer', icon: PenTool, count: 8 },
  { name: 'AI Video', icon: Video, count: 6 },
  { name: 'AI Code', icon: Code, count: 6 },
  { name: 'AI Chat', icon: MessageCircle, count: 5 },
  { name: 'Design', icon: Palette, count: 7 },
  { name: 'Productivity', icon: Briefcase, count: 6 },
  { name: 'SEO', icon: Search, count: 4 },
  { name: 'Business', icon: TrendingUp, count: 2 },
];

const filters = [
  { name: 'Popular', icon: Flame, active: true },
  { name: 'New', icon: LayoutGrid },
  { name: 'Trending', icon: TrendingUp },
  { name: 'Most Used', icon: Star },
  { name: 'Recent', icon: Clock },
];

const tools = [
  {
    name: 'AI Image Generator',
    description: 'Generate stunning images from text using advanced AI models.',
    icon: ImageIcon,
    color: 'bg-[#6D5EF8] text-white',
    slug: '/tools/ai-image-generator',
    tag: { label: 'Popular', type: 'popular', icon: Flame }
  },
  {
    name: 'Background Remover',
    description: 'Remove background from any image instantly with AI precision.',
    icon: LayoutGrid, // Using layout grid as placeholder for background remover
    color: 'bg-[#10B981] text-white',
    slug: '/tools/background-remover',
    tag: { label: 'Popular', type: 'popular', icon: Flame }
  },
  {
    name: 'AI Writer',
    description: 'Write blogs, emails, articles, and more in seconds.',
    icon: PenTool,
    color: 'bg-[#F43F5E] text-white',
    slug: '/tools/ai-writer',
    tag: { label: 'Popular', type: 'popular', icon: Flame }
  },
  {
    name: 'AI Video Generator',
    description: 'Generate videos from text with realistic AI visuals.',
    icon: Video,
    color: 'bg-[#8B5CF6] text-white',
    slug: '/tools/ai-video-generator',
    tag: { label: 'New', type: 'new', icon: Sparkles }
  },
  {
    name: 'AI Code Generator',
    description: 'Generate clean code in any programming language.',
    icon: Code,
    color: 'bg-[#0EA5E9] text-white',
    slug: '/tools/ai-code-generator',
    tag: { label: 'New', type: 'new', icon: Sparkles }
  }
];

export default function AllToolsPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#6D5EF8] selection:text-white flex flex-col">
      


      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-[15px] relative flex-grow w-full">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] -z-10 pointer-events-none -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -z-10 pointer-events-none translate-x-1/4 translate-y-1/3"></div>

        {/* Top Navigation Row */}
        <div className="flex items-center mb-[25px]">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm font-medium text-[#6B7280]">
            <Link href="/" className="hover:text-[#111827] transition-colors flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#6D5EF8] font-bold">All Tools</span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-6 lg:sticky lg:top-24 lg:self-start">
            
            {/* Categories List */}
            <div>
              <h3 className="font-bold text-[#111827] mb-4 px-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <button 
                      key={index}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                        category.active 
                          ? 'bg-[#EEF2FF] text-[#6D5EF8] font-semibold' 
                          : 'text-[#4B5563] hover:bg-white hover:text-[#111827] font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${category.active ? 'text-[#6D5EF8]' : 'text-[#6B7280]'}`} />
                        <span className="text-[15px]">{category.name}</span>
                      </div>
                      <span className={`text-xs ${
                        category.active 
                          ? 'text-[#6D5EF8] bg-white px-1.5 py-0.5 rounded-md shadow-sm' 
                          : 'text-[#9CA3AF]'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-br from-white to-[#EEF2FF] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6D5EF8]/5 rounded-full blur-xl"></div>
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-4 text-[#6D5EF8]">
                <Crown className="w-5 h-5 fill-[#6D5EF8]" />
              </div>
              <h4 className="font-bold text-[#111827] mb-1">Unlock Premium</h4>
              <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                Get unlimited access to all tools and premium features.
              </p>
              <button className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                Upgrade Now
              </button>
            </div>
            
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-black text-[#111827] mb-2 tracking-tight">All AI Tools</h1>
              <p className="text-[#6B7280] text-lg">Explore 50+ AI-powered tools to boost your productivity ✨</p>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 relative z-10">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] group-focus-within:text-[#6D5EF8] transition-colors" />
                <input 
                  type="text"
                  placeholder="Search tools..."
                  className="w-full h-12 pl-11 pr-4 bg-white border border-[#E5E7EB] rounded-xl outline-none focus:border-[#6D5EF8] focus:ring-4 focus:ring-[#6D5EF8]/10 transition-all text-[15px] shadow-sm"
                />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button className="h-12 px-4 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors text-[15px] font-medium text-[#4B5563] shadow-sm">
                  All Categories <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="h-12 px-4 bg-white border border-[#E5E7EB] rounded-xl flex items-center gap-2 hover:bg-[#F9FAFB] transition-colors text-[15px] font-medium text-[#4B5563] shadow-sm">
                  <Filter className="w-4 h-4 text-[#6B7280]" /> Filters
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {filters.map((filter, idx) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={idx}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-semibold transition-all shadow-sm ${
                      filter.active 
                        ? 'bg-[#6D5EF8] text-white shadow-md shadow-[#6D5EF8]/20' 
                        : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${filter.active ? 'text-white' : 'text-[#9CA3AF]'}`} />
                    {filter.name}
                  </button>
                )
              })}
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {tools.map((tool, index) => (
                <Link href={tool.slug} key={index} className="group">
                  <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] hover:border-[#6D5EF8] hover:shadow-xl hover:shadow-[#6D5EF8]/10 transition-all duration-300 relative h-full flex flex-col">
                    
                    {/* Top Row: Icon and Tag */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${tool.color}`}>
                        <tool.icon className="w-7 h-7" />
                      </div>
                      
                      <div className="flex gap-2">
                        {tool.tag && (
                          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            tool.tag.type === 'popular' 
                              ? 'bg-red-50 text-red-500' 
                              : 'bg-green-50 text-green-600'
                          }`}>
                            <tool.tag.icon className="w-3 h-3" />
                            {tool.tag.label}
                          </div>
                        )}
                        <button className="text-[#9CA3AF] hover:text-[#6D5EF8] transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#6D5EF8] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-6 flex-grow">
                      {tool.description}
                    </p>
                    
                    {/* Try Now Button */}
                    <div className="w-full py-2.5 bg-[#F8FAFC] group-hover:bg-[#EEF2FF] text-[#6D5EF8] rounded-xl font-semibold text-[14px] flex items-center justify-center transition-colors">
                      Try Now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                  </div>
                </Link>
              ))}
            </div>

          </main>
        </div>
      </div>
      

    </div>
  );
}
