import React, { useEffect } from 'react';
import { X, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function ErrorModal({ isOpen, onClose, onRetry }: ErrorModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#111827]/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-[460px] max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 p-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-full transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
        
        <div className="overflow-y-auto custom-scrollbar flex flex-col items-center text-center mt-2">
          
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shrink-0 shadow-sm border border-red-100">
            <AlertTriangle className="w-10 h-10" strokeWidth={1.5} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-3">Oops! Something went wrong</h2>
          <p className="text-sm text-[#6B7280] mb-6 max-w-xs">
            We couldn't generate your image right now. Please try again in a moment.
          </p>

          {/* Error Details */}
          <div className="w-full text-left bg-[#FEF2F2] border border-[#FCA5A5]/50 rounded-xl p-5 mb-8">
            <h4 className="text-xs font-bold text-red-500 mb-2">Possible reasons:</h4>
            <ul className="text-xs text-[#4B5563] space-y-1.5 list-disc pl-4 marker:text-red-400">
              <li>The server is busy. Please try again.</li>
              <li>Your prompt may contain restricted content.</li>
              <li>Check your internet connection.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-3 mt-auto shrink-0">
            <button 
              onClick={onRetry}
              className="w-full sm:flex-1 bg-white hover:bg-gray-50 border-2 border-[#E5E7EB] hover:border-gray-300 text-[#111827] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-5 h-5 text-gray-500" /> Try Again
            </button>
            <button 
              onClick={onClose}
              className="w-full sm:flex-1 bg-[#6D5EF8] hover:bg-[#5B4DF5] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#6D5EF8]/20 hover:shadow-[#6D5EF8]/40 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" /> Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
