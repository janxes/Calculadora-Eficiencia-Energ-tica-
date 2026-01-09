
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
      icon: <Wind className="w-6 h-6" />,
      title: "Salud respiratoria",
      desc: "Aire filtrado libre de polen, polvo y partículas contaminantes 24/7."
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Silencio absoluto",
      desc: "Aislamiento acústico superior que elimina el ruido del tráfico y exterior."
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "Temperatura estable",
      desc: "Confort térmico constante en toda la casa, sin zonas frías ni corrientes."
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Aislamiento superior",
      desc: "Un 'abrigo' continuo de gran espesor que protege la vivienda del clima."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Hermeticidad al aire",
      desc: "Construcción estanca que evita fugas de energía e infiltraciones de aire."
    },
    {
      icon: <Square className="w-6 h-6" />,
      title: "Ventanas premium",
      desc: "Carpinterías de altas prestaciones con triple vidrio y máxima eficiencia."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Ventilación eficiente",
      desc: "Recuperador de calor que renueva el aire sin perder la temperatura interior."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Sin puentes térmicos",
      desc: "Diseño riguroso que elimina puntos débiles por donde se escapa el calor."
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Confort veraniego",
      desc: "Estrategias de protección solar para mantener la casa fresca en olas de calor."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Consumo garantizado",
      desc: "Bajo consumo energético certificado y predecible, sin sorpresas en facturas."
    }
  ];

  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">Los 10 Pilares de tu Bienestar</h2>
        <p className="text-slate-500">Por qué una casa Passivhaus es la mejor inversión para tu salud y tu bolsillo.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {features.map((f, i) => (
          <div key={i} className="group p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50 transition-all duration-300">
            <div className="mb-4 text-brand-600 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-brand-700">{f.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
