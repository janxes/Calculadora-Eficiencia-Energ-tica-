
import React from 'react';
import { Coins, History, TrendingUp, Wallet } from 'lucide-react';
import { SimulationResults } from '../types';

interface ResultsSummaryProps {
  results: SimulationResults;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const cards = [
    {
      title: "Payback Energético",
      value: results.paybackYear ? `${results.paybackYear} años` : "N/A",
      icon: <History className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Amortización por ahorro"
    },
    {
      title: "Rentabilidad (ROI)",
      value: `${results.roi30.toFixed(1)}%`,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-brand-600",
      bgColor: "bg-brand-50",
      description: "Retorno a 30 años"
    },
    {
      title: "Prima de Reventa",
      value: "+15%",
      icon: <Coins className="w-5 h-5" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Plusvalía patrimonial"
    },
    {
      title: "Ahorro Acumulado",
      value: results.totalSavings50.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}),
      icon: <Wallet className="w-5 h-5" />,
      color: "text-slate-600",
      bgColor: "bg-slate-100",
      description: "Dinero salvado (50 años)"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-2xl ${card.bgColor} ${card.color} transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
            <div>
              <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{card.title}</h4>
              <div className="text-2xl font-black text-slate-900 leading-none mt-1">{card.value}</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs border-t border-slate-50 pt-3">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
