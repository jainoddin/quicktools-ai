import React from 'react';
import { 
  Search, Grid, List, Star, Filter, Trash2, Eye, Download, 
  Copy, MoreVertical, Code2, Clock, Crown, Bookmark, 
  ChevronLeft, ChevronRight, ChevronDown, CheckSquare, Calendar
} from 'lucide-react';

interface AiCodeHistoryProps {
  onClose: () => void;
}

export default function AiCodeHistory({ onClose }: AiCodeHistoryProps) {
  const historyItems = [
    {
      id: 1,
      title: 'E-commerce Shopping Cart',
      isFavorite: true,
      tags: 'JavaScript • React',
      desc: 'Add a shopping cart functionality with add, remove and update quantity.',
      type: 'Frontend (Web)',
      typeColor: 'text-[#6D5EF8]',
      date: 'Today, 2:30 PM',
      lines: '1,248 lines',
      iconText: 'JS',
      iconBg: 'bg-[#F7DF1E]',
      iconTextColor: 'text-black'
    },
    {
      id: 2,
      title: 'Todo App with React Hooks',
      isFavorite: false,
      tags: 'JavaScript • React',
      desc: 'Build a todo app with add, edit, delete and filter using React Hooks.',
      type: 'Frontend (Web)',
      typeColor: 'text-[#6D5EF8]',
      date: 'Today, 11:15 AM',
      lines: '856 lines',
      icon: 'react',
      iconBg: 'bg-[#E0F2FE]',
      iconTextColor: 'text-[#38BDF8]'
    },
    {
      id: 3,
      title: 'REST API with Node.js',
      isFavorite: false,
      tags: 'JavaScript • Node.js • Express',
      desc: 'Create a REST API with authentication and CRUD operations.',
      type: 'Backend (API)',
      typeColor: 'text-[#22C55E]',
      date: 'Yesterday, 6:45 PM',
      lines: '1,532 lines',
      iconText: 'JS',
      iconBg: 'bg-[#DCFCE7]',
      iconTextColor: 'text-[#22C55E]'
    },
    {
      id: 4,
      title: 'Data Analysis Script',
      isFavorite: false,
      tags: 'Python • Pandas',
      desc: 'Analyze CSV data and generate summary reports and charts.',
      type: 'Data Science',
      typeColor: 'text-[#8B5CF6]',
      date: 'May 15, 2024',
      lines: '420 lines',
      iconText: 'Py',
      iconBg: 'bg-[#FEF08A]',
      iconTextColor: 'text-[#1D4ED8]'
    },
    {
      id: 5,
      title: 'Responsive Landing Page',
      isFavorite: false,
      tags: 'HTML • CSS • JavaScript',
      desc: 'Create a responsive landing page using HTML, Tailwind CSS and JS.',
      type: 'Frontend (Web)',
      typeColor: 'text-[#6D5EF8]',
      date: 'May 14, 2024',
      lines: '678 lines',
      iconText: '5',
      iconBg: 'bg-[#FFEDD5]',
      iconTextColor: 'text-[#EA580C]'
    },
    {
      id: 6,
      title: 'User Authentication System',
      isFavorite: false,
      tags: 'TypeScript • Next.js • Prisma',
      desc: 'Authentication system with login, register and JWT.',
      type: 'Full Stack',
      typeColor: 'text-[#8B5CF6]',
      date: 'May 12, 2024',
      lines: '1,102 lines',
      iconText: 'TS',
      iconBg: 'bg-[#DBEAFE]',
      iconTextColor: 'text-[#1D4ED8]'
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Left Sidebar (Filters) */}
      <aside className="w-full lg:w-[340px] shrink-0 space-y-6">
        
        {/* Tool Info Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6D5EF8] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#111827]">AI Code Generator</h2>
              <p className="text-[11px] text-[#6B7280]">Generate clean, efficient code in seconds.</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-2">Search History</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search your code..." 
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-2">Language</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-xs text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
                <option>All Languages</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>TypeScript</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-2">Framework / Library</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-xs text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
                <option>All Frameworks</option>
                <option>React</option>
                <option>Next.js</option>
                <option>Node.js</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-2">Code Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-xs text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
                <option>All Types</option>
                <option>Frontend (Web)</option>
                <option>Backend (API)</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-2">Date Range</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <select className="w-full appearance-none bg-white border border-[#E5E7EB] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
                <option>All Time</option>
                <option>Today</option>
                <option>This Week</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Clear Filters
          </button>
        </div>

        {/* Upgrade Box */}
        <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-5 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-[#6D5EF8] fill-[#6D5EF8]" />
            <h3 className="font-bold text-[#111827] text-sm">Upgrade to Pro</h3>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
            Unlock more credits, priority generation and code export.
          </p>
          <button className="w-full py-2 bg-white border border-[#6D5EF8] rounded-xl text-xs font-bold text-[#6D5EF8] hover:bg-[#EEF2FF] transition-colors">
            Upgrade Now
          </button>
        </div>
      </aside>

      {/* Right Main Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Back Button */}
        <button onClick={onClose} className="text-sm font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors self-start flex items-center gap-1 mb-4">
          &larr; Back to Generator
        </button>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#EEF2FF] rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#6D5EF8]" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">History</h1>
              <p className="text-sm text-[#6B7280] mt-1">View and manage all your previously generated code.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search in results..." 
                className="pl-9 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm w-48 sm:w-64"
              />
            </div>
            <button className="p-2 bg-white border border-[#E5E7EB] rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 shadow-sm">
              <Bookmark className="w-5 h-5" />
            </button>
            <div className="flex bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-0.5">
              <button className="p-1.5 bg-[#EEF2FF] text-[#6D5EF8] rounded-lg">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg">
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs & Actions */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 border-b border-[#E5E7EB] pb-4">
          <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 xl:pb-0">
            <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold bg-[#6D5EF8] text-white shadow-sm">All (48)</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">Favorites (8)</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">Today (6)</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">This Week (12)</button>
            <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">This Month (20)</button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-sm font-semibold text-[#4B5563] hover:bg-gray-50 shadow-sm transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-100 shadow-sm transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Selected
            </button>
          </div>
        </div>

        {/* List View */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden flex flex-col mb-6">
          {historyItems.map((item, idx) => (
            <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${idx !== historyItems.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}>
              
              <div className="flex items-start gap-4 flex-grow min-w-0">
                <div className="pt-1">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#6D5EF8] focus:ring-[#6D5EF8] cursor-pointer" />
                </div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  {item.icon === 'react' ? (
                    <svg className={`w-7 h-7 ${item.iconTextColor}`} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
                      <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                      <g stroke="currentColor" strokeWidth="1" fill="none">
                        <ellipse rx="11" ry="4.2"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                      </g>
                    </svg>
                  ) : (
                    <span className={`text-[13px] font-bold ${item.iconTextColor}`}>{item.iconText}</span>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[#111827] truncate">{item.title}</h3>
                    {item.isFavorite && <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] shrink-0" />}
                  </div>
                  <div className="text-[11px] font-semibold text-[#6B7280] mb-1.5">{item.tags}</div>
                  <p className="text-[11px] text-[#4B5563] truncate">{item.desc}</p>
                </div>
              </div>

              {/* Meta and Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-64 shrink-0 mt-3 sm:mt-0 pl-12 sm:pl-0">
                <div className="flex flex-col items-start sm:items-end">
                  <span className={`text-[11px] font-bold mb-1 ${item.typeColor}`}>{item.type}</span>
                  <span className="text-[11px] font-medium text-[#6B7280] mb-0.5">{item.date}</span>
                  <span className="text-[10px] text-[#9CA3AF]">{item.lines}</span>
                </div>
                
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-1.5 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors" title="Copy">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
          <span className="text-xs text-[#6B7280]">Showing 1 to 10 of 48 results</span>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#6D5EF8] text-white font-semibold text-xs transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors">5</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <select className="appearance-none bg-white border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-1.5 text-xs text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6D5EF8] shadow-sm cursor-pointer">
              <option>10 per page</option>
              <option>20 per page</option>
              <option>50 per page</option>
            </select>
          </div>
        </div>

      </main>
    </div>
  );
}
