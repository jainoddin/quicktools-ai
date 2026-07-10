import React from 'react';
import { CheckCircle2, Loader2, Circle, Image as ImageIcon, Crosshair, Sparkles } from 'lucide-react';

interface BackgroundRemovalProgressProps {
  progress: number;
  onCancel: () => void;
}

export default function BackgroundRemovalProgress({ progress, onCancel }: BackgroundRemovalProgressProps) {
  let currentStep = 0;
  if (progress < 25) currentStep = 1;
  else if (progress < 50) currentStep = 2;
  else if (progress < 90) currentStep = 3;
  else currentStep = 4;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex-grow min-h-[500px] bg-white rounded-2xl border border-[#E5E7EB] flex flex-col items-center p-8 shadow-sm relative overflow-hidden">
      
      <div className="text-center mb-8 mt-4">
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Removing background...</h2>
        <p className="text-sm text-[#6B7280]">This may take a few seconds</p>
      </div>

      {/* Circular Progress */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-6">
        <svg className="transform -rotate-90 w-40 h-40">
          {/* Background circle gradient for glow effect */}
          <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="10" fill="transparent" className="text-[#EEF2FF]" />
          
          <defs>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          
          <circle cx="80" cy="80" r={radius} stroke="url(#purpleGradient)" strokeWidth="10" fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            className="transition-all duration-500 ease-out drop-shadow-md" 
          />
        </svg>
        <div className="absolute flex items-center justify-center inset-0">
          <span className="text-4xl font-bold text-[#6D5EF8]">{progress}%</span>
        </div>
      </div>

      <div className="bg-[#F8FAFC] text-[#6B7280] text-xs font-semibold px-4 py-2 rounded-lg border border-[#E5E7EB] mb-12">
        Estimated time: {Math.max(1, Math.ceil((100 - progress) / 10))} seconds
      </div>

      {/* Steps and Tips Layout */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-2xl mb-8 items-start">
        
        {/* Left: Timeline */}
        <div className="flex flex-col gap-6 relative">
          <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-100 -z-10"></div>
          
          <StepItem active={currentStep >= 1} completed={currentStep > 1} text="Analyzing image boundaries" />
          <StepItem active={currentStep >= 2} completed={currentStep > 2} text="Detecting foreground subject" />
          <StepItem active={currentStep >= 3} completed={currentStep > 3} text="Erasing background layer" />
          <StepItem active={currentStep >= 4} completed={currentStep > 4} text="Refining edges and details" />
        </div>

        {/* Right: Tips */}
        <div className="flex flex-col gap-4">
          <TipCard icon={ImageIcon} text="Images with solid backgrounds process significantly faster." />
          <TipCard icon={Crosshair} text="High contrast between subject and background yields better edge detection." />
          <TipCard icon={Sparkles} text="Hair and complex edges take a little more processing time." />
        </div>
      </div>

      <button onClick={onCancel} className="mt-auto px-6 py-2.5 border-2 border-[#E5E7EB] text-[#6D5EF8] font-semibold rounded-xl hover:bg-[#EEF2FF] hover:border-[#6D5EF8] transition-all text-sm">
        Cancel Processing
      </button>

    </div>
  );
}

function StepItem({ active, completed, text }: { active: boolean, completed: boolean, text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-white rounded-full">
        {completed ? (
          <CheckCircle2 className="w-6 h-6 text-white fill-[#6D5EF8]" />
        ) : active ? (
          <div className="relative flex items-center justify-center w-6 h-6">
            <Loader2 className="w-5 h-5 text-[#6D5EF8] animate-spin" />
          </div>
        ) : (
          <Circle className="w-6 h-6 text-[#D1D5DB]" />
        )}
      </div>
      <span className={`text-sm font-semibold ${active ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{text}</span>
    </div>
  );
}

function TipCard({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 flex gap-3 items-start shadow-sm">
      <div className="mt-0.5">
        <Icon className="w-4 h-4 text-[#6D5EF8]" />
      </div>
      <div>
        <div className="text-xs font-bold text-[#111827] mb-0.5">Tip</div>
        <div className="text-[10px] text-[#6B7280]">{text}</div>
      </div>
    </div>
  );
}
