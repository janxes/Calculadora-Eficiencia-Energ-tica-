
import React from 'react';

interface SidebarInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const SidebarInput: React.FC<SidebarInputProps> = ({ label, value, min, max, step, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-sm font-medium text-slate-700">{label}</label>
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
