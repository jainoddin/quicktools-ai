import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Home, ChevronRight, Zap, Users, LayoutGrid, Star,
  Globe, Shield, Check, ArrowRight, Mail,
  Sparkles, Lock, Lightbulb, Code2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | QuickTools.ai',
  description: 'Learn about QuickTools.ai — our mission to make AI simple, powerful and accessible for everyone.',
  alternates: { canonical: '/about' },
};

const stats = [
  { icon: Users, label: 'Happy Users', value: '1M+', color: 'text-[#6D5EF8]', bg: 'bg-[#EEF2FF]' },
  { icon: LayoutGrid, label: 'AI Tools', value: '100+', color: 'text-[#F43F5E]', bg: 'bg-pink-50' },
  { icon: Star, label: 'Tasks Completed', value: '50M+', color: 'text-[#F59E0B]', bg: 'bg-amber-50' },
  { icon: Globe, label: 'Countries', value: '150+', color: 'text-[#10B981]', bg: 'bg-emerald-50' },
  { icon: Shield, label: 'Uptime', value: '99.9%', color: 'text-[#0EA5E9]', bg: 'bg-sky-50' },
];

const values = [
  {
    icon: Sparkles,
    title: 'Simplicity First',
    desc: 'We design tools that are easy to use, even for beginners.',
    color: 'bg-[#EEF2FF]', iconColor: 'text-[#6D5EF8]',
  },
  {
    icon: Shield,
    title: 'Powerful & Reliable',
    desc: 'We ensure our tools deliver high-quality results you can rely on.',
    color: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    icon: Lock,
    title: 'Privacy & Security',
    desc: 'Your data and privacy are always safe with enterprise-grade security.',
    color: 'bg-sky-50', iconColor: 'text-sky-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Everyday',
    desc: 'We constantly innovate to bring you the latest in AI technology.',
    color: 'bg-amber-50', iconColor: 'text-amber-600',
  },
];

export default function AboutPage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] font-sans selection:bg-[#6D5EF8] selection:text-white overflow-x-hidden">

      {/* Breadcrumb */}
      <div className="bg-transparent pt-[15px] pb-[25px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-[#6B7280]">
          <Link href="/" className="hover:text-[#111827] flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-[#6D5EF8] font-semibold">About Us</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">

        {/* ── HERO SECTION ── */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EEF2FF] border border-[#DDD6FE] text-[#6D5EF8] text-xs font-bold mb-6">
              <Zap className="w-3.5 h-3.5 fill-[#6D5EF8]" /> About QuickTools.ai
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[#111827] leading-tight mb-6 tracking-tight">
              Making AI Simple, Powerful<br className="hidden sm:block" />
              <span className="text-[#6D5EF8]"> and Accessible</span> for Everyone
            </h1>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
              At QuickTools.ai, we believe AI should be simple, accessible, and affordable for everyone.
              Our mission is to bring the power of artificial intelligence to your fingertips with 100+
              easy-to-use tools that help you work smarter and achieve more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-semibold rounded-xl transition-colors shadow-md shadow-[#6D5EF8]/20">
                <Zap className="w-4 h-4 fill-white" /> Explore All Tools
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5E7EB] bg-white text-[#374151] font-semibold rounded-xl hover:bg-[#F9FAFB] transition-colors">
                <div className="w-5 h-5 rounded-full bg-[#6D5EF8] flex items-center justify-center">
                  <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-white ml-0.5"></div>
                </div>
                Watch Video
              </button>
            </div>
          </div>

          {/* Right — Product Screenshot Mockup */}
          <div className="relative w-full flex items-center lg:justify-end justify-center pt-8 sm:pt-0">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes float-icon {
                0%, 100% { transform: translateY(0px) rotate(-12deg); }
                50% { transform: translateY(-20px) rotate(-8deg); }
              }
              .animate-float-icon {
                animation: float-icon 4s ease-in-out infinite;
              }
            `}} />
            
            {/* Main Mockup Image */}
            <div className="relative w-[95%] lg:w-[95%] xl:w-[100%] z-10 flex items-center justify-end ml-auto">
              <Image 
                src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/9ece2905-2609-40cc-be51-4621b64fc3d7.png" 
                alt="Product Mockup" 
                width={800}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl"
              />
            </div>
            
            {/* Robot Image */}
            <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] z-20 hidden md:block pointer-events-none">
              <Image 
                src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/e3f4b268-d502-44fc-a58d-6af941e6639b.png" 
                alt="AI Assistant Robot" 
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>

            {/* Floating Lightning Icon */}
            <div className="absolute top-[50%] lg:-left-6 left-0 w-16 h-16 bg-[#6D5EF8] rounded-2xl flex items-center justify-center shadow-xl z-20 hidden md:flex animate-float-icon">
              <Zap className="w-8 h-8 text-white fill-white" />
            </div>
            
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#F3F4F6]">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center pt-4 sm:pt-0">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-black text-[#111827] mb-0.5">{stat.value}</div>
                  <div className="text-xs text-[#6B7280] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TEAM + VALUES + CTA ── */}
        <section className="grid lg:grid-cols-3 gap-8 mb-16">

          {/* Team (left — spans 1 col) */}
          <div className="lg:col-span-1">
            <p className="text-xs font-bold text-[#6D5EF8] uppercase tracking-widest mb-2">Our Team</p>
            <h2 className="text-2xl font-black text-[#111827] mb-3">The Person Behind QuickTools.ai</h2>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-8">
              A passionate builder, designer, and AI enthusiast working to make AI tools better for everyone.
            </p>

            {/* Single Founder Card */}
            <div className="flex flex-col items-center bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm max-w-[280px]">
              <div className="relative mb-5">
                {/* ⬇️ Replace src with your own image URL */}
                <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#EEF2FF] shadow-md bg-[#EEF2FF] flex items-center justify-center">
                  <Image
                    src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/24a81c85-d06e-436a-bb43-0c91ba47032a.png"
                    width={160} 
                    height={160}
                    alt="Founder"
                    className="w-full h-full object-cover scale-[1.35] translate-y-3"
                  />
                </div>
                <div className="absolute bottom-1 right-1 w-10 h-10 bg-[#6D5EF8] rounded-full flex items-center justify-center shadow-sm border-4 border-white">
                  <Zap className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <h3 className="font-bold text-[#111827] text-base mb-0.5">Shaik Jainoddin</h3>
              <p className="text-xs text-[#6D5EF8] font-semibold mb-3">Founder & CEO</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors text-xs font-bold">in</button>
                <button className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors text-xs font-bold">𝕏</button>
                <button className="w-8 h-8 rounded-full bg-[#EEF2FF] text-[#6D5EF8] flex items-center justify-center hover:bg-[#6D5EF8] hover:text-white transition-colors">
                  <Code2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] bg-white text-[#374151] text-sm font-semibold rounded-xl hover:bg-[#F9FAFB] transition-colors">
              <Users className="w-4 h-4 text-[#6D5EF8]" /> Meet the Full Team
            </button>
          </div>

          {/* Values (middle) */}
          <div className="lg:col-span-1">
            <p className="text-xs font-bold text-[#6D5EF8] uppercase tracking-widest mb-2">Our Values</p>
            <div className="space-y-4 mt-8">
              {values.map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.title} className="flex gap-4 bg-white border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${val.color} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${val.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#111827] mb-0.5">{val.title}</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Card (right) */}
          <div className="lg:col-span-1">
            <div className="bg-[#6D5EF8] rounded-2xl p-6 text-white h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <h2 className="text-2xl font-black mb-2 relative z-10">Join Millions of Happy Users</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 relative z-10">
                Start using our AI tools today and experience the future of productivity.
              </p>
              <button className="w-full bg-white text-[#6D5EF8] font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2 mb-6 relative z-10">
                <Zap className="w-4 h-4 fill-[#6D5EF8]" /> Sign Up for Free
              </button>
              <ul className="space-y-2 mb-6 relative z-10">
                {['Free to get started', 'No credit card required', 'Access to 100+ AI tools'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                    <Check className="w-4 h-4 text-white shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              {/* Avatars */}
              <div className="flex items-center gap-2 relative z-10 mt-auto">
                <div className="flex -space-x-2">
                  {['11', '16', '22', '33'].map((img) => (
                    <Image key={img} src={`https://i.pravatar.cc/150?img=${img}`} width={28} height={28}
                      alt="User" className="w-7 h-7 rounded-full border-2 border-[#6D5EF8] object-cover" />
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-[#6D5EF8] bg-white/20 flex items-center justify-center text-[9px] font-bold text-white">+1M</div>
                </div>
                <p className="text-xs text-white/80 ml-1">Trusted by 1M+ users worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT BAR ── */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-[#6D5EF8]" />
            </div>
            <div>
              <p className="font-bold text-[#111827] text-sm">Have questions or want to work with us?</p>
              <p className="text-xs text-[#6B7280]">We'd love to hear from you.</p>
            </div>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#374151] font-semibold text-sm rounded-xl hover:bg-[#F9FAFB] transition-colors whitespace-nowrap">
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
