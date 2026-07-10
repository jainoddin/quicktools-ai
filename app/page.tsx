import React from 'react';
import Image from 'next/image';
import { 
  Search, Moon, Zap, Image as ImageIcon, PenTool, Video, Code, 
  Briefcase, Palette, Mic, LayoutGrid, Star, Check, ArrowRight, 
  RefreshCcw, ChevronDown, Globe, Mail, MessageCircle, Share2
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex-grow bg-[#F8FAFC] text-[#111827] font-sans selection:bg-[#4F46E5] selection:text-white">
      


      {/* 2. Hero Section */}
      <header className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] bg-[#7C3AED]/20 rounded-full blur-3xl opacity-50 -translate-y-1/4"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-semibold mb-6">
              <Zap className="w-4 h-4" /> 100+ AI Tools in One Place
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-tight mb-6 tracking-tight">
              All AI Tools You Need,<br/>
              All in <span className="text-[#4F46E5]">One Place</span>
            </h1>
            <p className="text-base sm:text-lg text-[#6B7280] mb-8 leading-relaxed">
              QuickTools.ai offers the best collection of AI tools for content creation, image editing, code generation, voice, SEO, and more. Save time, work smarter, and boost productivity.
            </p>
            
            {/* Search Box */}
            <div className="relative flex items-center mb-6">
              <input 
                type="text" 
                placeholder="Search tools (e.g., image generator, background remover...)" 
                className="w-full pl-5 pr-14 py-4 rounded-xl border border-[#E5E7EB] shadow-sm focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5] outline-none text-sm sm:text-base transition-all bg-white"
              />
              <button className="absolute right-2 p-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 mb-12 text-xs sm:text-sm">
              <span className="text-[#6B7280] font-medium mr-1">Popular searches:</span>
              {['Image Generator', 'ChatGPT', 'AI Writer', 'Logo Maker', 'Video Generator'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-full cursor-pointer hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-8 border-t border-[#E5E7EB] pt-8">
              <div>
                <div className="flex items-center gap-2 font-bold text-lg sm:text-xl"><LayoutGrid className="w-5 h-5 text-[#4F46E5]"/> 100+</div>
                <div className="text-xs sm:text-sm text-[#6B7280]">AI Tools</div>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold text-lg sm:text-xl"><Star className="w-5 h-5 text-[#4F46E5]"/> 1M+</div>
                <div className="text-xs sm:text-sm text-[#6B7280]">Happy Users</div>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold text-lg sm:text-xl"><Check className="w-5 h-5 text-[#4F46E5]"/> 10M+</div>
                <div className="text-xs sm:text-sm text-[#6B7280]">Tasks Completed</div>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold text-lg sm:text-xl"><Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]"/> 4.9/5</div>
                <div className="text-xs sm:text-sm text-[#6B7280]">User Rating</div>
              </div>
            </div>
          </div>
          
          {/* Right Robot Image & Floating Cards */}
          <div className="relative h-[400px] lg:h-[600px] hidden md:block">
            {/* Perfect Gradient Circle Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] bg-gradient-to-tr from-indigo-100/70 via-purple-100/60 to-blue-50/50 rounded-full z-0 pointer-events-none blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-purple-200/50 to-indigo-200/50 rounded-full z-0 pointer-events-none blur-md"></div>
            
            {/* User's uploaded robot image from public folder */}
            <Image src="https://pub-68a98c57e70a4a1fa317739dd20098b9.r2.dev/1b9be0e4-c385-49a5-b0b5-ef158e8ef402.png" width={450} height={450} alt="AI Robot" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[450px] z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500" priority />
            
            {/* Floating Card 1 */}
            <div className="absolute top-[10%] lg:top-[15%] left-[0%] lg:left-[5%] z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><ImageIcon className="w-5 h-5"/></div>
              <div>
                <div className="text-sm font-bold text-gray-900">AI Image</div>
                <div className="text-xs text-gray-500">Generator</div>
              </div>
            </div>
            
            {/* Floating Card 2 */}
            <div className="absolute top-[15%] lg:top-[20%] right-[0%] lg:right-[5%] z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white flex items-center gap-3 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><PenTool className="w-5 h-5"/></div>
              <div>
                <div className="text-sm font-bold text-gray-900">AI Writer</div>
                <div className="text-xs text-gray-500">Generate Content</div>
              </div>
            </div>
            
            {/* Floating Card 3 */}
            <div className="absolute bottom-[35%] lg:bottom-[40%] right-[-5%] lg:right-[0%] z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white flex items-center gap-3 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>
              <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600"><LayoutGrid className="w-5 h-5"/></div>
              <div>
                <div className="text-sm font-bold text-gray-900">Background</div>
                <div className="text-xs text-gray-500">Remover</div>
              </div>
            </div>

            {/* Floating Card 4 */}
            <div className="absolute bottom-[15%] lg:bottom-[20%] left-[5%] lg:left-[10%] z-20 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white flex items-center gap-3 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '2s'}}>
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><Code className="w-5 h-5"/></div>
              <div>
                <div className="text-sm font-bold text-gray-900">AI Code</div>
                <div className="text-xs text-gray-500">Generator</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Secondary Nav / Category Icons */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-12">
          {[
            { icon: ImageIcon, label: 'Image Tools', color: 'text-blue-500' },
            { icon: PenTool, label: 'Writing Tools', color: 'text-green-500' },
            { icon: Video, label: 'Video Tools', color: 'text-pink-500' },
            { icon: Code, label: 'Code Tools', color: 'text-purple-500' },
            { icon: Search, label: 'SEO Tools', color: 'text-orange-500' },
            { icon: Briefcase, label: 'Business Tools', color: 'text-teal-500' },
            { icon: Palette, label: 'Design Tools', color: 'text-rose-500' },
            { icon: Mic, label: 'Audio Tools', color: 'text-emerald-500' },
            { icon: LayoutGrid, label: 'View All', color: 'text-gray-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-200">
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color}`} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-[#6B7280] group-hover:text-[#111827]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Popular AI Tools Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex justify-between items-end mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">Popular AI Tools</h2>
          <a href="#" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center gap-1">View All Tools <ArrowRight className="w-4 h-4"/></a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            { icon: ImageIcon, title: 'AI Image Generator', desc: 'Create stunning images from text with AI', color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: LayoutGrid, title: 'Background Remover', desc: 'Remove background from any image', color: 'text-pink-600', bg: 'bg-pink-100' },
            { icon: ImageIcon, title: 'AI Image Upscaler', desc: 'Enhance and upscale image quality', color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: PenTool, title: 'AI Writer', desc: 'Generate high-quality articles and content', color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { icon: Palette, title: 'AI Logo Generator', desc: 'Create unique logos for your brand', color: 'text-orange-600', bg: 'bg-orange-100' },
            { icon: Video, title: 'YouTube Title Generator', desc: 'Generate catchy titles for YouTube videos', color: 'text-red-600', bg: 'bg-red-100' },
          ].map((tool, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group cursor-pointer">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${tool.bg} flex items-center justify-center mb-4`}>
                <tool.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${tool.color}`} />
              </div>
              <h3 className="font-bold text-[#111827] text-sm sm:text-base mb-2">{tool.title}</h3>
              <p className="text-xs text-[#6B7280] mb-6 flex-grow">{tool.desc}</p>
              <button className="text-sm font-semibold text-[#4F46E5] border border-transparent group-hover:border-[#4F46E5] group-hover:bg-indigo-50 w-full py-2 rounded-lg transition-all flex justify-center items-center gap-1">
                Try Now <ArrowRight className="w-4 h-4"/>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose QuickTools.ai? */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 sm:mb-10">Why Choose QuickTools.ai?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {[
            { icon: LayoutGrid, title: '100+ AI Tools', desc: 'All the best AI tools in one platform', color: 'text-indigo-600', bg: 'bg-indigo-100' },
            { icon: Zap, title: 'Easy to Use', desc: 'Simple interface, powerful results', color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Check, title: 'Save Time', desc: 'Complete tasks in seconds, not hours', color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: Briefcase, title: 'Secure & Private', desc: 'Your data is safe and encrypted', color: 'text-orange-600', bg: 'bg-orange-100' },
            { icon: Star, title: 'Affordable Pricing', desc: 'Premium tools at the best prices', color: 'text-pink-600', bg: 'bg-pink-100' },
            { icon: RefreshCcw, title: 'Regular Updates', desc: 'New tools added every week', color: 'text-purple-600', bg: 'bg-purple-100' },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.color}`} />
              </div>
              <h3 className="font-bold text-sm text-[#111827] mb-2">{feature.title}</h3>
              <p className="text-xs text-[#6B7280]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. What Our Users Say */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 sm:mb-10">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {name: "Arun Kumar", role: "Digital Marketer", text: "QuickTools.ai has completely changed the way I work. The tools are powerful and super easy to use.", img: "11"},
            {name: "Priya Sharma", role: "Content Creator", text: "I love how everything is in one place. It saves me so much time and increases my productivity.", img: "16"},
            {name: "Rohit Verma", role: "Entrepreneur", text: "The best AI tools collection platform I've ever used. Highly recommended for startups!", img: "33"}
          ].map((user, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
              <Image src={`https://i.pravatar.cc/150?img=${user.img}`} width={48} height={48} alt={user.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-[#111827] mb-3 leading-relaxed">"{user.text}"</p>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
                  <div>
                    <div className="font-bold text-xs sm:text-sm">{user.name}</div>
                    <div className="text-[10px] sm:text-xs text-[#6B7280]">{user.role}</div>
                  </div>
                  <div className="flex gap-0.5 text-[#F59E0B]">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 fill-current"/>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-6 h-2 rounded-full bg-[#4F46E5] cursor-pointer"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200 cursor-pointer"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200 cursor-pointer"></div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden shadow-xl shadow-indigo-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 z-10 mb-8 md:mb-0">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
              <Zap className="w-8 h-8 text-white fill-white"/>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Ready to Supercharge Your Productivity?</h2>
              <p className="text-indigo-100 text-sm sm:text-base">Join millions of users who are already creating amazing results with QuickTools.ai</p>
            </div>
          </div>
          <button className="bg-white text-[#4F46E5] font-bold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors z-10 flex items-center justify-center gap-2 whitespace-nowrap shadow-md w-full md:w-auto">
            Get Started - It's Free <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-8 text-center sm:text-left">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            'What is QuickTools.ai?',
            'Are the tools really free to use?',
            'Do I need any credit card to start?',
            'Is my data safe with QuickTools.ai?'
          ].map((q, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-sm transition-all group">
              <span className="font-semibold text-sm sm:text-base text-[#111827]">{q}</span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#4F46E5] transition-colors"/>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] flex items-center justify-center gap-1 transition-colors">
            View all FAQs <ArrowRight className="w-4 h-4"/>
          </a>
        </div>
      </section>


    </div>
  );
}
