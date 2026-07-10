import React from 'react';
import Image from 'next/image';
import { Search, Grid, List, Star, Filter, Trash2, Eye, Download, Heart, MoreVertical, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface HistoryViewProps {
  onClose: () => void;
}

export default function HistoryView({ onClose }: HistoryViewProps) {
  const images = [
    { id: 1, src: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80', filename: 'dog-image.jpg', date: 'Today, 2:30 PM', type: 'Transparent BG' },
    { id: 2, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80', filename: 'puppy-garden.png', date: 'Today, 1:45 PM', type: 'White BG' },
    { id: 3, src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80', filename: 'cabin-view.jpg', date: 'Today, 11:20 AM', type: 'Custom BG' },
    { id: 4, src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80', filename: 'robot-toy.webp', date: 'Today, 10:10 AM', type: 'Transparent BG' },
    { id: 5, src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80', filename: 'landscape.jpg', date: 'Yesterday, 6:30 PM', type: 'Transparent BG' },
    { id: 6, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', filename: 'interior-room.jpg', date: 'Yesterday, 4:15 PM', type: 'White BG' },
    { id: 7, src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80', filename: 'sports-car.png', date: 'Yesterday, 2:40 PM', type: 'Transparent BG' },
    { id: 8, src: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80', filename: 'astronaut.jpg', date: 'Yesterday, 12:05 PM', type: 'Custom BG' },
  ];

  return (
    <main className="flex-grow flex flex-col min-w-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onClose} className="text-sm font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors flex items-center gap-1">
              &larr; Back to Tool
            </button>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
            History <span className="text-xl">✨</span>
          </h1>
          <p className="text-[#6B7280] text-sm lg:text-base mt-2">
            View and manage all your background removed images.
          </p>
        </div>

        {/* Search and View Toggles */}
        <div className="flex items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search your images..." 
              className="pl-9 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] text-sm focus:ring-2 focus:ring-[#6D5EF8] outline-none transition-all w-full sm:w-64"
            />
          </div>
          <div className="flex bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm shrink-0">
            <button className="p-2.5 bg-[#F5F3FF] text-[#6D5EF8]"><Grid className="w-4 h-4" /></button>
            <button className="p-2.5 text-[#6B7280] hover:bg-gray-50"><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        {/* Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar gap-2 pb-2 xl:pb-0">
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold bg-[#6D5EF8] text-white shadow-sm transition-colors">All Images</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 flex items-center gap-1.5 transition-colors"><Star className="w-4 h-4" /> Favorites</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">Today</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">This Week</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">This Month</button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors shadow-sm">
            <Trash2 className="w-4 h-4" /> Delete Selected
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all group flex flex-col">
            {/* Image Box */}
            <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden shrink-0 bg-gray-100" style={img.type === 'Transparent BG' ? { backgroundImage: 'conic-gradient(#E5E7EB 90deg, #FFFFFF 90deg 180deg, #E5E7EB 180deg 270deg, #FFFFFF 270deg)', backgroundSize: '16px 16px' } : {}}>
              {/* Mock transparent image rendering using CSS mix-blend for demo if needed, but since it's just history, a regular image is fine */}
              <Image src={img.src} alt={img.filename} fill className="object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              
              {/* Checkbox Overlay */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 accent-[#6D5EF8] bg-white cursor-pointer shadow-sm" />
              </div>
            </div>
            
            {/* Content Box */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm font-bold text-[#111827] truncate mb-1">{img.filename}</p>
              <p className="text-[11px] font-medium text-[#6B7280] mb-4">{img.date} &bull; {img.type}</p>
              
              {/* Actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors shadow-sm"><Eye className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors shadow-sm"><Download className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shadow-sm"><Heart className="w-4 h-4" /></button>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-colors shadow-sm"><MoreVertical className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6D5EF8] bg-[#F5F3FF] hover:bg-[#EDE9FE] transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#6D5EF8] text-white font-semibold shadow-sm">1</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4B5563] hover:bg-gray-100 font-semibold transition-colors">2</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4B5563] hover:bg-gray-100 font-semibold transition-colors">3</button>
          <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl text-[#4B5563] hover:bg-gray-100 font-semibold transition-colors">4</button>
          <button className="hidden sm:flex w-9 h-9 items-center justify-center rounded-xl text-[#4B5563] hover:bg-gray-100 font-semibold transition-colors">5</button>
          <span className="w-9 h-9 flex items-center justify-center text-[#9CA3AF]">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4B5563] hover:bg-gray-100 font-semibold transition-colors">12</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#4B5563] border border-[#E5E7EB] hover:bg-gray-50 transition-colors bg-white shadow-sm"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <select className="w-full appearance-none bg-white border border-[#E5E7EB] text-sm font-semibold text-[#4B5563] rounded-xl pl-4 pr-10 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] focus:border-[#6D5EF8] transition-all cursor-pointer">
              <option>12 per page</option>
              <option>24 per page</option>
              <option>48 per page</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
