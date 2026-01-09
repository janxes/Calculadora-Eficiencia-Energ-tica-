
import React from 'react';
import { 
  Wind, 
  Volume2, 
  Thermometer, 
  Layers, 
  ShieldCheck, 
  Square, 
  RefreshCw, 
  Zap, 
  Sun, 
  CheckCircle2 
} from 'lucide-react';

const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Wind className="w-12 h-12" />,
      title: "Salud",
      desc: "Aire filtrado libre de polen y contaminación."
    },
    {
      icon: <Volume2 className="w-12 h-12" />,
      title: "Silencio",
      desc: "Máximo aislamiento contra ruidos externos."
    },
    {
      icon: <Thermometer className="w-12 h-12" />,
      title: "Confort",
      desc: "Temperatura suave y constante 24/7."
    },
    {
      icon: <Layers className="w-12 h-12" />,
      title: "Aislamiento",
      desc: "Un 'abrigo' grueso que protege su hogar."
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Sin fugas",
      desc: "Casa hermética para no perder calor."
    },
    {
      icon: <Square className="w-12 h-12" />,
      title: "Ventanas",
      desc: "Máxima calidad con triple cristal."
    },
    {
      icon: <RefreshCw className="w-12 h-12" />,
      title: "Ventilación",
      desc: "Renovación de aire sin abrir ventanas."
    },
    {
      icon: <CheckCircle2 className="w-12 h-12" />,
      title: "Precisión",
      desc: "Diseño riguroso sin fallos técnicos."
    },
    {
      icon: <Sun className="w-12 h-12" />,
      title: "Verano",
      desc: "Casa fresca incluso en olas de calor."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Ahorro",
      desc: "Bajísimo consumo de luz garantizado."
    }
  ];

  return (
    <section className="bg-white rounded-[3rem] border border-slate-200 p-10 md:p-14 shadow-sm">
      <div className="mb-14 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">Los 10 Pilares del Passivhaus</h2>
        <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-4xl">La máxima excelencia constructiva aplicada a su bienestar diario.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {features.map((f, i) => (
          <div key={i} className="group p-10 bg-slate-50 rounded-[3rem] border-2 border-slate-50 hover:border-brand-200 hover:bg-brand-50 transition-all duration-300 flex flex-col items-center text-center shadow-sm">
            <div className="mb-8 text-brand-600 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h4 className="font-black text-slate-900 text-2xl mb-5 leading-tight group-hover:text-brand-700 tracking-tight">{f.title}</h4>
            <p className="text-lg text-slate-600 leading-relaxed font-bold opacity-80">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
