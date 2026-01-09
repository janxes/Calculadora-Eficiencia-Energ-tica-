
import React from 'react';
import { Wind, Volume2, Thermometer, Shield } from 'lucide-react';

const InvisibleCosts: React.FC = () => {
  const metrics = [
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Salud del Aire",
      cte: "Aire viciado y polvo",
      ph: "Aire puro filtrado",
      desc: "Ideal para alergias y asma: elimina polen y partículas nocivas.",
      color: "brand"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Confort Acústico",
      cte: "Ruidos de la calle",
      ph: "Silencio absoluto",
      desc: "Duerma mejor gracias al aislamiento masivo que detiene el ruido exterior.",
      color: "blue"
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Bienestar Térmico",
      cte: "Zonas frías y corrientes",
      ph: "Temperatura perfecta",
      desc: "Sin corrientes de aire. Temperatura estable 24h en toda la casa.",
      color: "rose"
    }
  ];

  return (
    <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
      <div className="p-10 md:p-12 border-b-2 border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-slate-900">Beneficios para su Salud y Bienestar</h3>
          <p className="text-slate-500 text-xl font-medium mt-2">Valor añadido que no se ve, pero se siente cada día.</p>
        </div>
        <div className="flex items-center gap-3 bg-brand-50 px-6 py-3 rounded-full border-2 border-brand-100 shadow-sm">
            <Shield className="w-7 h-7 text-brand" />
            <span className="text-brand-700 text-sm font-black uppercase tracking-widest">Garantía Total</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-slate-50">
        {metrics.map((m, i) => (
          <div key={i} className="p-10 md:p-12 hover:bg-slate-50 transition-colors group">
            <div className={`mb-8 inline-flex p-5 rounded-3xl bg-${m.color}-50 text-${m.color}-600 group-hover:scale-110 transition-transform shadow-sm`}>
              {m.icon}
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">{m.title}</h4>
            <div className="space-y-8">
              <div className="flex flex-col">
                <span className="text-xs uppercase font-black text-slate-400 mb-2 tracking-widest">Casa Convencional</span>
                <span className="text-lg font-bold text-slate-500 line-through decoration-slate-300 decoration-2">{m.cte}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-black text-brand-500 mb-2 tracking-widest">Passivhaus Certificada</span>
                <span className="text-2xl font-black text-brand-600 leading-tight">{m.ph}</span>
              </div>
              <p className="text-lg text-slate-600 font-semibold leading-relaxed pt-8 border-t-2 border-slate-50 italic">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvisibleCosts;
