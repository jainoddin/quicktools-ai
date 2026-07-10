import React from 'react';
import { Loader2, Video, Sparkles, Wand2 } from 'lucide-react';

interface AiVideoProgressProps {
  progress: number;
  onCancel: () => void;
}

export default function AiVideoProgress({ progress, onCancel }: AiVideoProgressProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 lg:p-12 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[600px] animate-in fade-in duration-300">
      
      {/* Animated Graphic */}
      <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
        {/* Background glowing blob */}
        <div className="absolute inset-0 bg-[#F5F3FF] rounded-full blur-2xl opacity-80 animate-pulse"></div>
        
        {/* Central Icon */}
        <div className="relative z-10 w-24 h-24 bg-[#E0E7FF] rounded-2xl shadow-inner border border-[#B4C6FC] flex items-center justify-center animate-bounce">
          <Video className="w-10 h-10 text-[#6D5EF8]" />
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          </div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100">
            <Wand2 className="w-4 h-4 text-[#10B981]" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#111827] mb-3">
        Generating your video...
      </h2>
      <p className="text-[#6B7280] mb-10 max-w-sm">
        Our AI is writing the script, collecting assets, and rendering the final video. This might take a few moments.
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span className="text-[#6D5EF8]">Rendering</span>
          <span className="text-[#111827]">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#6D5EF8] rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <button 
        onClick={onCancel}
        className="text-[#6B7280] text-sm font-semibold hover:text-red-500 transition-colors"
      >
        Cancel Generation
      </button>

    </div>
  );
}
