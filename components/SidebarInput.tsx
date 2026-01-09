
import React from 'react';
import { Info } from 'lucide-react';

interface SidebarInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  tooltip?: string;
}

const SidebarInput: React.FC<SidebarInputProps> = ({ label, value, min, max, step, onChange, tooltip }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5 group relative">
          <label className="text-sm font-medium text-slate-700">{label}</label>
          {tooltip && (
            <div className="relative cursor-help">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-brand-500 transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] leading-relaxed rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-xl pointer-events-none">
                {tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
              </div>
            </div>
          )}
        </div>
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-20 text-right text-sm font-semibold text-brand-600 bg-brand-50 border border-brand-100 rounded p-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-600"
      />
    </div>
  );
};

export default SidebarInput;
