import React, { useEffect } from 'react';
import { X, Link2, Copy, Lock } from 'lucide-react';

interface AiVideoShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
}

export default function AiVideoShareModal({ isOpen, onClose, videoUrl = "https://quicktools.ai/video/abc123" }: AiVideoShareModalProps) {
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

  const socialLinks = [
    { id: 'copy', label: 'Copy Link', color: 'text-blue-500', bg: 'bg-blue-50', active: true, icon: <Link2 className="w-5 h-5" /> },
    { id: 'facebook', label: 'Facebook', color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { id: 'twitter', label: 'Twitter / X', color: 'text-black', bg: 'bg-gray-100', active: false, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { id: 'linkedin', label: 'LinkedIn', color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { id: 'whatsapp', label: 'WhatsApp', color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.013 2.015c-5.467 0-9.911 4.444-9.911 9.911 0 1.75.458 3.447 1.323 4.954L2.01 21.99l5.244-1.375a9.866 9.866 0 004.759 1.218c5.464 0 9.908-4.444 9.908-9.911s-4.444-9.907-9.908-9.907zm0 16.657c-1.468 0-2.903-.393-4.15-1.134l-.297-.176-3.09.81 .824-3.012-.193-.307a8.218 8.218 0 01-1.258-4.382c0-4.553 3.705-8.258 8.258-8.258 4.55 0 8.253 3.705 8.253 8.258s-3.703 8.258-8.253 8.258z"/></svg> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-[500px] max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-1 shrink-0">
          <h2 className="text-xl font-bold text-[#111827]">Share Your Video</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[#6B7280] mb-4 sm:mb-6 shrink-0">Share this video with others</p>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow pr-1">
          
          {/* Social Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mb-6">
            {socialLinks.map((social) => (
              <div 
                key={social.id}
                className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border-2 cursor-pointer transition-all ${social.active ? 'border-[#6D5EF8] bg-[#EEF2FF]' : 'border-[#E5E7EB] hover:border-gray-300 hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 ${social.bg} rounded-full flex items-center justify-center ${social.color} mb-2 shadow-sm shrink-0`}>
                  {social.icon}
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-[#4B5563] text-center line-clamp-1">{social.label}</span>
              </div>
            ))}
          </div>

          {/* Embed Code */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-[#111827] mb-2">Embed Code</h3>
            <div className="flex bg-white rounded-xl border border-[#E5E7EB] p-1.5 focus-within:ring-2 focus-within:ring-[#6D5EF8] transition-all">
              <input 
                type="text" 
                readOnly 
                value={`<video controls src="${videoUrl}"></video>`}
                className="flex-grow bg-transparent text-sm text-[#6B7280] px-3 outline-none min-w-0"
              />
              <button className="bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm shrink-0">
                Copy
              </button>
            </div>
          </div>

          {/* Access Banner */}
          <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-xl p-3 flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#6D5EF8] shrink-0" />
            <p className="text-xs sm:text-sm text-[#6D5EF8] font-medium">Anyone with the link can view this video.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
