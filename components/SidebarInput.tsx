
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
    <div className="mb-8">
      <div className="flex justify-between items-end mb-3">
        <div className="flex items-center gap-2 group relative">
          <label className="text-lg font-bold text-slate-700 leading-none">{label}</label>
          {tooltip && (
            <div className="relative cursor-help">
              <Info className="w-5 h-5 text-slate-400 hover:text-brand-500 transition-colors" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-5 bg-slate-900 text-white text-sm font-medium leading-relaxed rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-2xl pointer-events-none">
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
          className="w-24 text-right text-lg font-black text-brand-700 bg-brand-50 border-2 border-brand-100 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
        />
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-xl appearance-none cursor-pointer accent-brand-500 hover:accent-brand-600 transition-all"
      />
    </div>
  );
};

export default SidebarInput;
