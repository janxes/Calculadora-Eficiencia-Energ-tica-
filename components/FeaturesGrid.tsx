
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
      icon: <Wind className="w-10 h-10" />,
      title: "Salud respiratoria",
      desc: "Aire filtrado libre de polen, polvo y partículas contaminantes 24/7."
    },
    {
      icon: <Volume2 className="w-10 h-10" />,
      title: "Silencio absoluto",
      desc: "Aislamiento acústico superior que elimina el ruido del tráfico y exterior."
    },
    {
      icon: <Thermometer className="w-10 h-10" />,
      title: "Temperatura estable",
      desc: "Confort térmico constante en toda la casa, sin zonas frías ni corrientes."
    },
    {
      icon: <Layers className="w-10 h-10" />,
      title: "Aislamiento superior",
      desc: "Un 'abrigo' continuo de gran espesor que protege la vivienda del clima."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Hermeticidad al aire",
      desc: "Construcción estanca que evita fugas de energía e infiltraciones de aire."
    },
    {
      icon: <Square className="w-10 h-10" />,
      title: "Ventanas premium",
      desc: "Carpinterías de altas prestaciones con triple vidrio y máxima eficiencia."
    },
    {
      icon: <RefreshCw className="w-10 h-10" />,
      title: "Ventilación eficiente",
      desc: "Recuperador de calor que renueva el aire sin perder la temperatura interior."
    },
    {
      icon: <CheckCircle2 className="w-10 h-10" />,
      title: "Sin puentes térmicos",
      desc: "Diseño riguroso que elimina puntos débiles por donde se escapa el calor."
    },
    {
      icon: <Sun className="w-10 h-10" />,
      title: "Confort veraniego",
      desc: "Estrategias de protección solar para mantener la casa fresca en olas de calor."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Consumo garantizado",
      desc: "Bajo consumo energético certificado y predecible, sin sorpresas en facturas."
    }
  ];

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3 tracking-tight">Los 10 Pilares de tu Bienestar</h2>
        <p className="text-lg text-slate-500 max-w-3xl">La excelencia constructiva que convierte una casa en un refugio de salud y eficiencia absoluta.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {features.map((f, i) => (
          <div key={i} className="group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all duration-300 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 text-brand-600 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h4 className="font-black text-slate-900 text-xl mb-4 leading-tight group-hover:text-brand-700 tracking-tight">{f.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
