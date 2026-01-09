
import React from 'react';
import { Wind, Volume2, Thermometer, Shield } from 'lucide-react';

const InvisibleCosts: React.FC = () => {
  const metrics = [
    {
      icon: <Wind className="w-6 h-6" />,
      title: "Calidad del Aire (Salud)",
      cte: "CO₂: 1.000 - 1.500 ppm",
      ph: "CO₂: 600 - 800 ppm",
      desc: "Filtrado continuo de polen y partículas. Ideal para personas con alergias y asma.",
      color: "brand"
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Confort Acústico",
      cte: "Ruido Exterior 35-40dB",
      ph: "Ruido Exterior < 25dB",
      desc: "Silencio total gracias a la estanqueidad y el alto espesor del aislamiento envolvente.",
      color: "blue"
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Estabilidad Térmica",
      cte: "Variación ±5°C diaria",
      ph: "Variación ±0.5°C diaria",
      desc: "Ausencia de corrientes de aire frío y puntos calientes. Temperatura constante 24/7.",
      color: "rose"
    }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Costes Invisibles y Valor Añadido</h3>
          <p className="text-slate-400 text-sm">Beneficios intangibles que impactan directamente en tu bienestar diario.</p>
        </div>
        <div className="flex items-center gap-2 bg-brand-50 px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-brand" />
            <span className="text-brand text-xs font-bold uppercase">Garantía Passivhaus</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {metrics.map((m, i) => (
          <div key={i} className="p-8 hover:bg-slate-50 transition-colors group">
            <div className={`mb-6 inline-flex p-4 rounded-2xl bg-${m.color}-50 text-${m.color}-600 group-hover:scale-110 transition-transform`}>
              {m.icon}
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">{m.title}</h4>
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">CTE Estándar</span>
                <span className="text-sm font-medium text-slate-600 line-through decoration-slate-300 decoration-1">{m.cte}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-brand-500 mb-1">Passivhaus</span>
                <span className="text-base font-bold text-brand-600">{m.ph}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed pt-4 border-t border-slate-50">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvisibleCosts;
