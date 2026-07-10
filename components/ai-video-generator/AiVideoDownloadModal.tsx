import React, { useState, useEffect } from 'react';
import { X, FileVideo, Film, Layers, Monitor, Maximize, Download, Crown } from 'lucide-react';

interface AiVideoDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AiVideoDownloadModal({ isOpen, onClose }: AiVideoDownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('mp4');

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const options = [
    { id: 'mp4', title: 'MP4', badge: 'Recommended', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'High quality video, best for social media and sharing', icon: FileVideo, iconBg: 'bg-[#6D5EF8]' },
    { id: 'gif', title: 'GIF', desc: 'Looping animation without sound, great for websites', icon: Film, iconBg: 'bg-emerald-500' },
    { id: 'hd', title: 'HD Quality (1080p)', badge: 'Pro', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'High resolution video (1920 x 1080)', icon: Monitor, iconBg: 'bg-[#6D5EF8]', isPro: true },
    { id: '4k', title: '4K Quality', badge: 'Pro', badgeColor: 'bg-purple-100 text-[#6D5EF8]', desc: 'Ultra HD resolution video (3840 x 2160)', icon: Maximize, iconBg: 'bg-blue-500', isPro: true },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-[460px] max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between mb-1 shrink-0">
          <h2 className="text-xl font-bold text-[#111827]">Download Video</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[#6B7280] mb-4 sm:mb-6 shrink-0">Choose your preferred format and quality</p>
        
        <div className="space-y-2.5 mb-4 sm:mb-6 overflow-y-auto flex-grow pr-1">
          {options.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => setSelectedFormat(opt.id)}
              className={`flex items-center p-3 sm:p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${selectedFormat === opt.id ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-10 h-10 ${opt.iconBg} rounded-xl flex items-center justify-center shrink-0 mr-4 text-white shadow-sm`}>
                <opt.icon className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-[#111827]">{opt.title}</span>
                  {opt.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${opt.badgeColor}`}>
                      {opt.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#6B7280] leading-snug pr-2">{opt.desc}</div>
              </div>
              
              {opt.isPro && (
                <div className="mr-4 shrink-0">
                  <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                </div>
              )}

              <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 ${selectedFormat === opt.id ? 'border-[#6D5EF8]' : 'border-gray-300'}`}>
                {selectedFormat === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#6D5EF8]"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 pt-2 border-t border-gray-50 mt-2">
          <button className="w-full bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download Video
          </button>
          <p className="text-center text-[11px] text-[#9CA3AF] mt-3 mb-1">
            Your download will start automatically
          </p>
        </div>

      </div>
    </div>
  );
}
