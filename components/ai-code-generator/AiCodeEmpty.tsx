import React from 'react';
import { Globe, FileTerminal, Database, ShoppingCart, Lightbulb, Code2 } from 'lucide-react';

interface AiCodeEmptyProps {
  onSelectPrompt: (prompt: string, language: string, framework: string) => void;
}

export default function AiCodeEmpty({ onSelectPrompt }: AiCodeEmptyProps) {
  const examplePrompts = [
    {
      icon: <Globe className="w-5 h-5 text-purple-600" />,
      iconBg: 'bg-purple-100',
      title: 'Responsive Landing Page',
      prompt: 'Create a responsive landing page using HTML, Tailwind CSS and JavaScript.',
      language: 'HTML',
      framework: 'Tailwind CSS'
    },
    {
      icon: <FileTerminal className="w-5 h-5 text-green-600" />,
      iconBg: 'bg-green-100',
      title: 'Todo App in React',
      prompt: 'Build a Todo App using React with add, edit, delete and filter.',
      language: 'React',
      framework: 'Tailwind CSS'
    },
    {
      icon: <Database className="w-5 h-5 text-blue-600" />,
      iconBg: 'bg-blue-100',
      title: 'REST API with Node.js',
      prompt: 'Create a simple REST API with Node.js, Express and MongoDB.',
      language: 'JavaScript',
      framework: 'None'
    },
    {
      icon: <ShoppingCart className="w-5 h-5 text-orange-600" />,
      iconBg: 'bg-orange-100',
      title: 'E-commerce Cart',
      prompt: 'Add a shopping cart functionality using JavaScript.',
      language: 'JavaScript',
      framework: 'None'
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center relative min-h-[650px] animate-in fade-in duration-500">
      
      {/* Decorative Graphic */}
      <div className="relative w-64 h-48 mb-8 flex items-center justify-center">
        {/* Background Blob */}
        <div className="absolute inset-0 bg-purple-50 rounded-full blur-3xl"></div>
        
        {/* Main Editor Window */}
        <div className="relative z-10 w-56 h-36 bg-white border border-[#E5E7EB] rounded-xl shadow-lg flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform">
          {/* Editor Header */}
          <div className="bg-[#6D5EF8] h-8 w-full flex items-center px-3 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
          </div>
          {/* Editor Body */}
          <div className="flex-1 p-4 flex flex-col gap-2 relative">
            <div className="w-3/4 h-2 bg-gray-100 rounded-full"></div>
            <div className="w-1/2 h-2 bg-gray-100 rounded-full"></div>
            <div className="w-5/6 h-2 bg-gray-100 rounded-full"></div>
            <div className="w-2/3 h-2 bg-gray-100 rounded-full"></div>
            <Code2 className="absolute right-4 bottom-4 w-10 h-10 text-[#6D5EF8]/20" />
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -left-4 bottom-8 w-12 h-12 bg-white rounded-xl shadow-md border border-[#E5E7EB] flex items-center justify-center z-20 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="w-8 h-8 bg-[#F7DF1E] rounded-md flex items-center justify-center text-xs font-bold text-black">JS</div>
        </div>
        
        <div className="absolute -right-2 top-12 w-10 h-10 bg-[#6D5EF8] rounded-xl shadow-md flex items-center justify-center z-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
          <span className="text-white font-mono text-sm font-bold">{'{ }'}</span>
        </div>
        
        <SparkleIcon className="absolute top-0 right-12 w-6 h-6 text-purple-300 animate-pulse" />
        <SparkleIcon className="absolute bottom-12 right-0 w-4 h-4 text-blue-300 animate-pulse" />
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-2 text-center">Ready to generate code? 🚀</h2>
      <p className="text-[#6B7280] text-center max-w-sm mb-10 text-sm">
        Describe what you want to build on the left and click <span className="font-semibold text-[#6D5EF8]">"Generate Code"</span> to get started.
      </p>

      {/* Example Prompts Divider */}
      <div className="w-full max-w-3xl flex items-center gap-4 mb-8">
        <div className="h-px bg-[#E5E7EB] flex-1"></div>
        <span className="text-sm font-bold text-[#4B5563]">Try these example prompts</span>
        <div className="h-px bg-[#E5E7EB] flex-1"></div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-10">
        {examplePrompts.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => onSelectPrompt(item.prompt, item.language, item.framework)}
            className="flex flex-col items-start p-4 bg-white border border-[#E5E7EB] rounded-2xl hover:border-[#6D5EF8] hover:shadow-md transition-all text-left group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.iconBg}`}>
              {item.icon}
            </div>
            <h3 className="text-sm font-bold text-[#111827] mb-1 group-hover:text-[#6D5EF8] transition-colors">{item.title}</h3>
            <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-3">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>

      {/* Bottom Tip */}
      <div className="w-full max-w-4xl bg-[#F5F3FF] rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-[#4B5563]">
        <Lightbulb className="w-4 h-4 text-[#6D5EF8]" />
        <span className="font-bold text-[#111827]">Tip:</span> Be more specific in your description to get better results.
      </div>

    </div>
  );
}

function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}
