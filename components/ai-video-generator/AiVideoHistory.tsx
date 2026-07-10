import React from 'react';
import { Search, Grid, List, Star, Filter, Trash2, Eye, Download, Heart, MoreVertical, Play } from 'lucide-react';

interface AiVideoHistoryProps {
  onClose: () => void;
}

export default function AiVideoHistory({ onClose }: AiVideoHistoryProps) {
  const videos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop', prompt: 'Artificial Intelligence explainer...', date: 'Today, 2:30 PM', type: 'Explainer', duration: '30s' },
    { id: 2, src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop', prompt: 'Colorful abstract liquid flowing...', date: 'Today, 1:45 PM', type: 'Abstract', duration: '15s' },
    { id: 3, src: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=600&auto=format&fit=crop', prompt: 'Cinematic mars rover exploration...', date: 'Today, 11:20 AM', type: 'Cinematic', duration: '60s' },
    { id: 4, src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600&auto=format&fit=crop', prompt: 'Cute puppy playing in the garden...', date: 'Today, 10:10 AM', type: 'Realistic', duration: '30s' },
    { id: 5, src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop', prompt: 'Fantasy landscape with floating islands...', date: 'Yesterday, 6:30 PM', type: '3D Animation', duration: '15s' },
    { id: 6, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop', prompt: 'Modern living room interior tour...', date: 'Yesterday, 4:15 PM', type: 'Real Estate', duration: '45s' },
    { id: 7, src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=600&auto=format&fit=crop', prompt: 'Sports car racing in rainy night...', date: 'Yesterday, 2:40 PM', type: 'Action', duration: '30s' },
    { id: 8, src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop', prompt: 'Cute robot watering a small plant...', date: 'Yesterday, 12:05 PM', type: 'Animation', duration: '15s' },
  ];

  return (
    <main className="flex-grow flex flex-col min-w-0 space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={onClose} className="text-sm font-bold text-[#6D5EF8] hover:text-[#5B4DF5] transition-colors flex items-center gap-1">
              &larr; Back to Generator
            </button>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
            Video History <span className="text-xl">🎬</span>
          </h1>
          <p className="text-[#6B7280] text-sm lg:text-base mt-2">
            View and manage all your previously generated videos.
          </p>
        </div>

        {/* Search and View Toggles */}
        <div className="flex items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Search your videos..." 
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
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold bg-[#6D5EF8] text-white shadow-sm transition-colors">All Videos</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 flex items-center gap-1.5 transition-colors"><Star className="w-4 h-4" /> Favorites</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">Drafts</button>
          <button className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-[#E5E7EB] text-[#4B5563] hover:bg-gray-50 transition-colors">Downloaded</button>
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

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 pb-12">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all group flex flex-col">
            {/* Video Box */}
            <div className="relative aspect-video w-full overflow-hidden shrink-0 bg-gray-100">
              <img src={vid.src} alt={vid.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* Overlay elements */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                  <Play className="w-5 h-5 text-[#6D5EF8] fill-[#6D5EF8] ml-1" />
                </div>
              </div>

              {/* Checkbox Overlay */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 accent-[#6D5EF8] bg-white cursor-pointer shadow-sm" />
              </div>

              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                {vid.duration}
              </div>
            </div>
            
            {/* Content Box */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm font-bold text-[#111827] truncate mb-1">{vid.prompt}</p>
              <p className="text-[11px] font-medium text-[#6B7280] mb-4">{vid.date} &bull; {vid.type}</p>
              
              {/* Actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors" title="View Details">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-[#6D5EF8] hover:bg-[#EEF2FF] rounded-lg transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors" title="Favorite">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
