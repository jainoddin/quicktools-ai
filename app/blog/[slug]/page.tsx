import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Home, ChevronRight, Link2,
  Clock, Check, Share2, Crown, Mail, ArrowRight, Star
} from 'lucide-react';

// ─── Static blog data (replace with CMS/API later) ───────────────────────────
const blogPost = {
  slug: '10-ai-tools-productivity-2024',
  badge: 'FEATURED',
  title: '10 AI Tools That Will 10x Your Productivity in 2024 🚀',
  description: 'Discover the most powerful AI tools that can help you save time, automate tasks, and achieve more in less time.',
  author: { name: 'Rahul Sharma', avatar: 'https://i.pravatar.cc/150?img=11', date: 'May 17, 2024', readTime: '8 min read' },
  category: 'AI & Tools',
  heroImage: 'https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/1b9be0e4-c385-49a5-b0b5-ef158e8ef402.png',
  toc: [
    { id: 'introduction', label: 'Introduction' },
    { id: 'chatgpt', label: '1. ChatGPT' },
    { id: 'notion-ai', label: '2. Notion AI' },
    { id: 'jasper-ai', label: '3. Jasper AI' },
    { id: 'copy-ai', label: '4. Copy.ai' },
    { id: 'pictory', label: '5. Pictory AI' },
    { id: 'fireflies', label: '6. Fireflies AI' },
    { id: 'tasks', label: '7. Tasks Automation' },
    { id: 'grammarly', label: '8. GrammarlyGO' },
    { id: 'tome', label: '9. Tome AI' },
    { id: 'synthesia', label: '10. Synthesia' },
    { id: 'conclusion', label: 'Conclusion' },
  ],
  learnings: [
    'The best AI tools for different use cases',
    'How these tools can save you time',
    'Practical tips to get the most out of AI',
    'Which tools are free (or offer free plans)',
  ],
  relatedPosts: [
    { title: 'How to Build a SaaS Product in 2024', readTime: '10 min read', color: 'bg-indigo-100', img: '33' },
    { title: '5 AI Tools for Content Creators', readTime: '5 min read', color: 'bg-yellow-100', img: '16' },
    { title: 'The Future of AI in Productivity', readTime: '7 min read', color: 'bg-pink-100', img: '22' },
    { title: 'AI Workflow Automation: A Complete Guide', readTime: '9 min read', color: 'bg-blue-100', img: '44' },
  ],
  tools: [
    {
      id: 'chatgpt', num: '1', name: 'ChatGPT',
      desc: 'ChatGPT by OpenAI is a powerful conversational AI that can help you write, brainstorm, solve problems, explain complex topics, and much more.',
      bestFor: 'Writing, brainstorming, coding help, learning',
      isFree: true,
    },
    {
      id: 'notion-ai', num: '2', name: 'Notion AI',
      desc: 'Notion AI transforms your workspace by generating summaries, writing drafts, translating content, and auto-filling databases right inside Notion.',
      bestFor: 'Note-taking, project management, documentation',
      isFree: false,
    },
    {
      id: 'jasper-ai', num: '3', name: 'Jasper AI',
      desc: 'Jasper is one of the most advanced AI writing assistants. It creates long-form blog posts, ad copy, product descriptions, and social media content in seconds.',
      bestFor: 'Marketing copy, blog writing, brand content',
      isFree: false,
    },
    {
      id: 'copy-ai', num: '4', name: 'Copy.ai',
      desc: "Copy.ai specializes in generating high-converting marketing content. It is incredibly fast and easy to use, even for non-writers.",
      bestFor: 'Email marketing, ads, social posts',
      isFree: true,
    },
    {
      id: 'pictory', num: '5', name: 'Pictory AI',
      desc: 'Pictory automatically converts long-form content like blog posts and scripts into short, engaging videos — no video editing skills required.',
      bestFor: 'Video content, social media, repurposing content',
      isFree: false,
    },
  ],
};

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${blogPost.title} | QuickTools.ai Blog`,
    description: blogPost.description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      type: 'article',
      publishedTime: blogPost.author.date,
      authors: [blogPost.author.name],
    },
  };
}

export default function BlogSlugPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex-grow bg-white font-sans selection:bg-[#6D5EF8] selection:text-white">

      {/* Breadcrumb */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link href="/blog" className="hover:text-[#111827] transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6B7280]">{blogPost.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#111827] font-medium truncate max-w-[200px] sm:max-w-xs">
            10 AI Tools That Will 10x Your Productivity in 2024
          </span>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-full lg:w-[220px] xl:w-[250px] shrink-0 lg:sticky lg:top-24 lg:self-start space-y-6">

            {/* Table of Contents */}
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-3">On This Page</h3>
              <nav className="space-y-0.5">
                {blogPost.toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm transition-colors ${
                      i === 0
                        ? 'text-[#6D5EF8] font-semibold bg-[#EEF2FF]'
                        : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[#6D5EF8] shrink-0"></span>}
                    {i !== 0 && <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0"></span>}
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Share */}
            <div>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-widest mb-3">Share this post</h3>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors font-bold text-xs">
                  𝕏
                </button>
                <button className="w-9 h-9 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors font-bold text-xs">
                  in
                </button>
                <button className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors font-bold text-xs">
                  f
                </button>
                <button className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-br from-[#6D5EF8] to-[#4F46E5] rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                <Crown className="w-4 h-4 text-white fill-white" />
              </div>
              <p className="text-xs text-white/70 mb-0.5 font-medium">Unlock More with</p>
              <h4 className="font-bold text-white text-sm mb-2">QuickTools.ai Pro</h4>
              <p className="text-xs text-white/70 mb-4 leading-relaxed">
                Get access to premium AI tools, faster generations & priority support.
              </p>
              <button className="w-full bg-white text-[#6D5EF8] font-bold text-xs py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1.5">
                Upgrade Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </aside>

          {/* ── MAIN ARTICLE ── */}
          <main className="flex-1 min-w-0 max-w-[720px]">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#6D5EF8] text-xs font-bold mb-4 border border-[#DDD6FE]">
              <Star className="w-3 h-3 fill-[#6D5EF8]" /> {blogPost.badge}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-black text-[#111827] leading-tight mb-4 tracking-tight">
              {blogPost.title}
            </h1>

            {/* Description */}
            <p className="text-[#6B7280] text-lg leading-relaxed mb-6">{blogPost.description}</p>

            {/* Author Row */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-[#E5E7EB]">
              <Image
                src={blogPost.author.avatar}
                width={40} height={40}
                alt={blogPost.author.name}
                className="rounded-full w-10 h-10 object-cover border-2 border-[#EEF2FF]"
              />
              <div>
                <div className="font-bold text-sm text-[#111827]">{blogPost.author.name}</div>
                <div className="text-xs text-[#9CA3AF] flex items-center gap-2">
                  <span>{blogPost.author.date}</span>
                  <span>·</span>
                  <Clock className="w-3 h-3" />
                  <span>{blogPost.author.readTime}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 bg-[#0F0A1E] flex items-center justify-center shadow-lg">
              <Image
                src={blogPost.heroImage}
                alt="10 AI Tools That Will 10x Your Productivity"
                fill
                className="object-contain p-6"
                priority
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">

              {/* Introduction */}
              <section id="introduction" className="mb-10">
                <h2 className="text-2xl font-bold text-[#111827] mb-4">Introduction</h2>
                <p className="text-[#4B5563] leading-relaxed mb-4">
                  Artificial Intelligence is no longer the future — it's here, and it's transforming the way we work.
                  Whether you're a developer, marketer, content creator, or entrepreneur, AI tools can help you automate
                  repetitive tasks, generate better content, and unlock new levels of productivity.
                </p>
                <p className="text-[#4B5563] leading-relaxed">
                  In this article, we've handpicked 10 AI tools that can 10x your productivity in 2024. Let's dive in! 👇
                </p>
              </section>

              {/* Tool Sections */}
              {blogPost.tools.map((tool) => (
                <section key={tool.id} id={tool.id} className="mb-10">
                  <h2 className="text-2xl font-bold text-[#111827] mb-3">
                    {tool.num}. {tool.name}
                  </h2>
                  <p className="text-[#4B5563] leading-relaxed mb-4">{tool.desc}</p>
                  <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-[#15803D]">
                      <span className="font-semibold">Best for:</span> {tool.bestFor}
                    </p>
                  </div>
                  {tool.isFree && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full">
                      ✅ Free plan available
                    </div>
                  )}
                </section>
              ))}

              {/* Conclusion */}
              <section id="conclusion" className="mb-10 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-[#111827] mb-3">Conclusion</h2>
                <p className="text-[#4B5563] leading-relaxed">
                  These 10 AI tools can dramatically increase your productivity when used correctly. Start with one or two
                  that match your workflow, and gradually integrate more. The future of work is AI-assisted — and the
                  sooner you adapt, the further ahead you'll be.
                </p>
                <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                  <Link href="/tools" className="inline-flex items-center gap-2 text-[#6D5EF8] font-semibold hover:underline text-sm">
                    Try AI Tools on QuickTools.ai <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </section>

            </div>
          </main>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0 lg:sticky lg:top-24 lg:self-start space-y-6">

            {/* What you'll learn */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-[#111827] mb-1">What you'll learn</h3>
              <div className="w-8 h-0.5 bg-[#6D5EF8] mb-4 rounded-full"></div>
              <ul className="space-y-3">
                {blogPost.learnings.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#6D5EF8]" />
                    </div>
                    <span className="text-sm text-[#4B5563] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Posts */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#111827]">Related Posts</h3>
                <Link href="/blog" className="text-xs text-[#6D5EF8] font-semibold hover:underline">View all</Link>
              </div>
              <div className="space-y-4">
                {blogPost.relatedPosts.map((post, i) => (
                  <Link key={i} href="/blog" className="flex items-center gap-3 group">
                    <div className={`w-16 h-16 rounded-xl shrink-0 ${post.color} flex items-center justify-center overflow-hidden`}>
                      <Image
                        src={`https://i.pravatar.cc/150?img=${post.img}`}
                        width={64} height={64}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#111827] group-hover:text-[#6D5EF8] transition-colors leading-snug line-clamp-2">{post.title}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Subscribe */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
              <div className="w-9 h-9 bg-[#EEF2FF] rounded-xl flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-[#6D5EF8]" />
              </div>
              <h3 className="font-bold text-[#111827] mb-1">Subscribe to our newsletter</h3>
              <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
                Get the latest AI tools, tutorials and productivity tips in your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-10 px-3 border border-[#E5E7EB] rounded-xl text-sm outline-none focus:border-[#6D5EF8] focus:ring-2 focus:ring-[#6D5EF8]/10 transition-all mb-3"
              />
              <button className="w-full h-10 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold text-sm rounded-xl transition-colors">
                Subscribe
              </button>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
