import React, { useState } from 'react';
import { Copy, Download, Edit2, RefreshCw, Maximize2, Minimize2, Trash2, CheckCircle2, ChevronDown, Crown, Share2, X, FileText, File, Link as LinkIcon, MessageCircle, MessageSquare, Mail, Lock } from 'lucide-react';

export default function AiWriterResult() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  const socialLinks = [
    { id: 'copy', label: 'Copy...', color: 'text-blue-500', bg: 'bg-blue-50', active: true, icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'facebook', label: 'Facebook', color: 'text-[#1877F2]', bg: 'bg-[#1877F2]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
    { id: 'twitter', label: 'Twitter...', color: 'text-black', bg: 'bg-gray-100', active: false, icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
    { id: 'linkedin', label: 'LinkedIn', color: 'text-[#0A66C2]', bg: 'bg-[#0A66C2]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
    { id: 'whatsapp', label: 'WhatsApp', color: 'text-[#25D366]', bg: 'bg-[#25D366]/10', active: false, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.013 2.015c-5.467 0-9.911 4.444-9.911 9.911 0 1.75.458 3.447 1.323 4.954L2.01 21.99l5.244-1.375a9.866 9.866 0 004.759 1.218c5.464 0 9.908-4.444 9.908-9.911s-4.444-9.907-9.908-9.907zm0 16.657c-1.468 0-2.903-.393-4.15-1.134l-.297-.176-3.09.81 .824-3.012-.193-.307a8.218 8.218 0 01-1.258-4.382c0-4.553 3.705-8.258 8.258-8.258 4.55 0 8.253 3.705 8.253 8.258s-3.703 8.258-8.253 8.258z"/></svg> },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top section: Generated Content Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-sm font-bold text-[#111827]">Generated Content</h3>
        <div className="flex items-center gap-4">
          <div className="text-xs font-semibold text-[#6B7280]">
            Words: 248 <span className="mx-1 font-light text-gray-300">|</span> Characters: 1542
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] hover:bg-gray-50 transition-colors shadow-sm">
            <Copy className="w-3.5 h-3.5 text-[#6B7280]" /> Copy <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] ml-1" />
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 lg:p-8 shadow-sm mb-6 flex-grow">
        <div className="flex items-start justify-between mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-[#111827] leading-tight">
            The Future of Artificial Intelligence
          </h1>
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 bg-[#ECFDF5] border border-[#D1FAE5] text-[#10B981] text-[10px] font-bold rounded-md uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" /> Original
          </div>
        </div>

        <div className="prose prose-sm md:prose-base prose-gray max-w-none text-[#4B5563] space-y-5 leading-relaxed">
          <p>
            Artificial Intelligence (AI) is no longer a concept of the future—it's here, and it's transforming the way we live and work. From virtual assistants to self-driving cars, AI is becoming an integral part of our daily lives.
          </p>
          <p>
            One of the most exciting aspects of AI is its ability to analyze vast amounts of data and derive insights that humans might miss. This is revolutionizing industries such as healthcare, finance, education, and marketing. Businesses are using AI to automate tasks, improve customer experiences, and make smarter decisions.
          </p>
          <p>
            However, with great power comes great responsibility. As AI continues to evolve, it's important to address ethical concerns, data privacy, and the impact on jobs. The key is to use AI as a tool that enhances human potential, not replaces it.
          </p>
          <p>
            The future of AI is bright, and the possibilities are endless. Whether you're a developer, entrepreneur, or just curious about technology, now is the perfect time to embrace the AI revolution.
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm">
          <Copy className="w-4 h-4" /> Copy
        </button>
        <button 
          onClick={() => setShowDownloadModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm"
        >
          <Download className="w-4 h-4" /> Download
        </button>
        <button 
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm">
          <Edit2 className="w-4 h-4" /> Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm">
          <RefreshCw className="w-4 h-4" /> Regenerate
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm">
          <Maximize2 className="w-4 h-4" /> Make Longer
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-sm font-semibold text-[#4B5563] hover:bg-gray-50 hover:text-[#111827] transition-all shadow-sm">
          <Minimize2 className="w-4 h-4" /> Make Shorter
        </button>
        
        {/* Delete Button - pushed to right on desktop */}
        <button className="md:ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-100 bg-red-50 text-sm font-semibold text-red-600 hover:bg-red-100 transition-all shadow-sm">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Upgrade Banner */}
      <div className="mt-auto bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
            <Crown className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
          </div>
          <div>
            <h4 className="text-[#111827] font-bold text-base">Upgrade to Pro</h4>
            <p className="text-[#6B7280] text-xs sm:text-sm">Unlock unlimited words, advanced writing modes, and more premium features.</p>
          </div>
        </div>
        <button className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-white border border-[#EDE9FE] px-6 py-2.5 rounded-xl text-sm font-bold text-[#6D5EF8] hover:bg-[#EEF2FF] transition-colors shadow-sm">
          <Crown className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" /> Upgrade Now
        </button>
      </div>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Download Document</h3>
              <button onClick={() => setShowDownloadModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div 
                onClick={() => setDownloadFormat('pdf')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'pdf' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                  <File className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">PDF Document</h4>
                  <p className="text-xs text-gray-500">Best for sharing securely (.pdf)</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'pdf' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'pdf' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              
              <div 
                onClick={() => setDownloadFormat('docx')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'docx' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">Word Document</h4>
                  <p className="text-xs text-gray-500">Best for further editing (.docx)</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'docx' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'docx' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              
              <div 
                onClick={() => setDownloadFormat('txt')}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${downloadFormat === 'txt' ? 'border-[#6D5EF8] bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 text-sm">Text File</h4>
                  <p className="text-xs text-gray-500">Plain text format (.txt)</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${downloadFormat === 'txt' ? 'border-[#6D5EF8] bg-[#6D5EF8]' : 'border-gray-300'}`}>
                  {downloadFormat === 'txt' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="w-full py-3 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#6D5EF8]/20"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#111827]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-[500px] flex flex-col bg-white rounded-3xl shadow-2xl p-5 sm:p-8 animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-bold text-[#111827]">Share Your Content</h2>
              <button onClick={() => setShowShareModal(false)} className="p-2 -mr-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">Share this content with others</p>
            
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

            {/* Share Link */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-[#111827] mb-2">Share Link</h3>
              <div className="flex bg-white rounded-xl border border-[#E5E7EB] p-1.5 focus-within:ring-2 focus-within:ring-[#6D5EF8] transition-all">
                <input 
                  type="text" 
                  readOnly 
                  value="https://quicktools.ai/share/writer/a7b8..."
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
              <p className="text-xs sm:text-sm text-[#6D5EF8] font-medium">Anyone with the link can view this content.</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
