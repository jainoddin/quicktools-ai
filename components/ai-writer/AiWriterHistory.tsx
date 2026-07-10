import React, { useState } from 'react';
import { 
  Search, Grid, List, Filter, Trash2, Star, 
  FileText, Mail, MessageSquare, Tag, Eye, Copy, Download, MoreVertical,
  ChevronLeft, ChevronRight, Clock, Sparkles
} from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  isStarred: boolean;
  words: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence',
    preview: 'Artificial Intelligence (AI) is no longer a concept of the...',
    date: 'Today, 2:30 PM',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-purple-100',
    iconColor: 'text-[#6D5EF8]',
    isStarred: true,
    words: '248 Words'
  },
  {
    id: '2',
    title: 'Product Launch Email',
    preview: 'We are excited to announce the launch of our new product designed to make your life easier and more productive. Check out what\'s new and get 20% off...',
    date: 'Today, 1:15 PM',
    category: 'Email',
    icon: <Mail className="w-6 h-6" />,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    isStarred: false,
    words: '156 Words'
  },
  {
    id: '3',
    title: 'LinkedIn Post on Productivity',
    preview: 'Productivity isn\'t about doing more, it\'s about focusing on what truly matters. Here are 5 tips to help you stay productive every day...',
    date: 'Today, 11:05 AM',
    category: 'Social Post',
    icon: <MessageSquare className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-[#0A66C2]',
    isStarred: true,
    words: '98 Words'
  },
  {
    id: '4',
    title: '10 Tips to Improve Your Writing',
    preview: 'Writing is a skill that improves with practice. Here are 10 practical tips to help you write better content, engage your audience, and deliver value...',
    date: 'Yesterday, 8:45 PM',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-500',
    isStarred: false,
    words: '512 Words'
  },
  {
    id: '5',
    title: 'Meeting Follow-up Email',
    preview: 'Thank you for taking the time to meet with us today. As discussed, here\'s a summary of the key points and next steps...',
    date: 'Yesterday, 4:10 PM',
    category: 'Email',
    icon: <Mail className="w-6 h-6" />,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
    isStarred: false,
    words: '132 Words'
  },
  {
    id: '6',
    title: 'Benefits of Meditation',
    preview: 'Meditation is a powerful practice that can improve your mental clarity, reduce stress, and enhance overall well-being...',
    date: 'May 06, 2024',
    category: 'Blog Post',
    icon: <FileText className="w-6 h-6" />,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    isStarred: false,
    words: '302 Words'
  }
];

export default function AiWriterHistory({ onBack }: { onBack: () => void }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <button 
            onClick={onBack} 
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors mb-3"
          >
            &larr; Back to Tool
          </button>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#111827] flex items-center gap-2">
              History <Sparkles className="w-6 h-6 text-[#F59E0B] fill-[#F59E0B]" />
            </h1>
          </div>
          <p className="text-[#6B7280] text-sm md:text-base">View and manage all your previously generated content.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search your content..." 
              className="pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-xl text-sm w-full md:w-64 focus:outline-none focus:border-[#6D5EF8] focus:ring-1 focus:ring-[#6D5EF8]"
            />
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button className="p-1.5 bg-white shadow-sm rounded-lg text-[#6D5EF8]">
              <Grid className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-5 py-2 bg-[#6D5EF8] text-white text-sm font-semibold rounded-full flex items-center gap-2 shadow-sm">
            All <span className="text-xs">({mockHistory.length})</span>
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm">
            Favorites <span className="text-xs text-gray-400">(6)</span>
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm">
            Today <span className="text-xs text-gray-400">(5)</span>
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm">
            This Week <span className="text-xs text-gray-400">(9)</span>
          </button>
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors shadow-sm hidden md:flex">
            This Month <span className="text-xs text-gray-400">(24)</span>
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          {selectedIds.size > 0 && (
            <button className="px-4 py-2 bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm animate-in fade-in">
              <Trash2 className="w-4 h-4" /> Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* List View */}
      <div className="flex flex-col gap-4 mb-8">
        {mockHistory.slice(0, 4).map((item) => (
          <div key={item.id} className={`bg-white border rounded-2xl p-5 transition-all flex items-center gap-4 ${selectedIds.has(item.id) ? 'border-[#6D5EF8] ring-1 ring-[#6D5EF8]' : 'border-[#E5E7EB] hover:border-gray-300'}`}>
            
            {/* Checkbox */}
            <div 
              onClick={() => toggleSelect(item.id)}
              className={`w-5 h-5 rounded flex items-center justify-center border cursor-pointer transition-colors shrink-0 ${selectedIds.has(item.id) ? 'bg-[#6D5EF8] border-[#6D5EF8]' : 'border-gray-300 hover:border-gray-400'}`}
            >
              {selectedIds.has(item.id) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
            </div>

            {/* Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}>
              {item.icon}
            </div>
            
            {/* Main Content (Title & Preview) */}
            <div className="flex-grow min-w-0 pr-4 border-r border-gray-100">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-[#111827] text-base truncate">
                  {item.title}
                </h3>
                {item.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />}
              </div>
              <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">
                {item.preview}
              </p>
            </div>
            
            {/* Meta Data */}
            <div className="w-40 shrink-0 flex flex-col gap-1.5 pl-2">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  item.category === 'Blog Post' ? 'bg-purple-100 text-purple-600' :
                  item.category === 'Email' ? 'bg-green-100 text-green-600' :
                  item.category === 'Social Post' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-[#6B7280] mt-1">{item.date}</div>
              <div className="text-xs text-[#9CA3AF]">{item.words}</div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1.5 pl-2 shrink-0">
              <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-[#111827] border border-gray-200 hover:bg-gray-50 rounded-full transition-colors ml-1">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E5E7EB]">
        <div className="text-sm text-[#6B7280]">
          Showing 1 to 8 of 24 results
        </div>
        
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#6D5EF8] text-white font-semibold transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 font-semibold transition-colors">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 font-semibold transition-colors">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E5E7EB] text-gray-500 hover:bg-gray-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <select className="bg-white border border-[#E5E7EB] text-sm text-[#4B5563] rounded-lg px-3 py-1.5 focus:outline-none">
            <option>12 per page</option>
            <option>24 per page</option>
            <option>48 per page</option>
          </select>
        </div>
      </div>

    </div>
  );
}
