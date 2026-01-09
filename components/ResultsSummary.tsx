
import React from 'react';
import { Coins, History, TrendingUp, Wallet } from 'lucide-react';
import { SimulationResults } from '../types';

interface ResultsSummaryProps {
  results: SimulationResults;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const cards = [
    {
      title: "Recuperación",
      value: results.paybackYear ? `${results.paybackYear} años` : "N/A",
      icon: <History className="w-7 h-7" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Amortización por ahorro"
    },
    {
      title: "Rentabilidad (ROI)",
      value: `${results.roi30.toFixed(0)}%`,
      icon: <TrendingUp className="w-7 h-7" />,
      color: "text-brand-600",
      bgColor: "bg-brand-50",
      description: "Retorno a 30 años"
    },
    {
      title: "Plusvalía",
      value: "+15%",
      icon: <Coins className="w-7 h-7" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      description: "Aumento de valor"
    },
    {
      title: "Ahorro Neto",
      value: results.totalSavings50.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}),
      icon: <Wallet className="w-7 h-7" />,
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      description: "A 50 años"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex items-center gap-5 mb-6">
            <div className={`p-4 rounded-2xl ${card.bgColor} ${card.color} transition-transform group-hover:scale-110 shadow-sm`}>
              {card.icon}
            </div>
            <div>
              <h4 className="text-slate-500 text-sm font-black uppercase tracking-[0.15em]">{card.title}</h4>
              <div className="text-3xl font-black text-slate-900 leading-tight mt-1 tracking-tight">{card.value}</div>
            </div>
          </div>
          <p className="text-slate-600 text-lg font-bold border-t border-slate-50 pt-4 leading-snug">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
