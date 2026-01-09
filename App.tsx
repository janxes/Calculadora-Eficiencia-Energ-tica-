
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Leaf, 
  Zap, 
  Thermometer, 
  Info,
  Settings,
  History,
  Wallet,
  PiggyBank,
  TrendingDown,
  Rocket,
  ArrowUpRight,
  Wind,
  Volume2,
  Heart
} from 'lucide-react';
import { ClimateZone, SimulationInputs, SimulationResults, YearData } from './types';

// Components
import SidebarInput from './components/SidebarInput';
import ResultsSummary from './components/ResultsSummary';
import InvisibleCosts from './components/InvisibleCosts';

const zoneDetails: Record<ClimateZone, { label: string, demand: number }> = {
  [ClimateZone.A]: { label: 'A: Cálidas (Huelva, Cádiz)', demand: 20 },
  [ClimateZone.B]: { label: 'B: Moderadas (Valencia costera)', demand: 30 },
  [ClimateZone.C]: { label: 'C: Suaves (Vigo)', demand: 40 },
  [ClimateZone.D]: { label: 'D: Frías (Madrid, Zaragoza)', demand: 55 },
  [ClimateZone.E]: { label: 'E: Muy frías (Burgos, Teruel)', demand: 75 },
};

const App: React.FC = () => {
  const [inputs, setInputs] = useState<SimulationInputs>({
    m2: 150,
    constructionCostM2: 1400,
    climateZone: ClimateZone.D,
    passivhausPremium: 10,
    kwhPrice: 0.24,
    energyInflation: 3.5,
    cteDemand: 55,
    phDemand: 15,
  });

  const results = useMemo((): SimulationResults => {
    const { 
      m2, constructionCostM2, passivhausPremium, kwhPrice, 
      energyInflation, cteDemand, phDemand 
    } = inputs;

    const initialInvestmentCTE = m2 * constructionCostM2;
    const premiumCost = initialInvestmentCTE * (passivhausPremium / 100);
    const initialInvestmentPH = initialInvestmentCTE + premiumCost;

    const data: YearData[] = [];
    let cumulativeSavings = 0;
    let cumulativeEnergyCTE = 0;
    let cumulativeEnergyPH = 0;
    let paybackYear: number | null = null;

    for (let year = 1; year <= 50; year++) {
      const inflationFactor = Math.pow(1 + energyInflation / 100, year - 1);
      const currentKwhPrice = kwhPrice * inflationFactor;

      const cteAnnualCost = cteDemand * m2 * currentKwhPrice;
      const phAnnualCost = phDemand * m2 * currentKwhPrice;
      const annualSavings = cteAnnualCost - phAnnualCost;
      
      cumulativeEnergyCTE += cteAnnualCost;
      cumulativeEnergyPH += phAnnualCost;
      
      cumulativeSavings += annualSavings;
      const netCashFlow = cumulativeSavings - premiumCost;

      if (paybackYear === null && netCashFlow >= 0) {
        paybackYear = year;
      }

      const propAppreciation = Math.pow(1.02, year);
      const baseResale = initialInvestmentCTE * propAppreciation;
      const resaleValueCTE = baseResale;
      const phResalePremium = year >= 30 ? 0.15 : (year / 30) * 0.15;
      const resaleValuePH = baseResale * (1 + phResalePremium);

      data.push({
        year,
        cteAnnualCost,
        phAnnualCost,
        annualSavings,
        cumulativeSavings,
        netCashFlow,
        resaleValueCTE,
        resaleValuePH,
        cumulativeTotalCostCTE: initialInvestmentCTE + cumulativeEnergyCTE,
        cumulativeTotalCostPH: initialInvestmentPH + cumulativeEnergyPH
      });
    }

    const roi30 = ((data[29].cumulativeSavings - premiumCost) / premiumCost) * 100;
    const totalSavings50 = data[49].cumulativeSavings;
    const totalAppreciation50 = data[49].resaleValuePH - data[49].resaleValueCTE;

    return {
      data,
      initialInvestmentCTE,
      initialInvestmentPH,
      premiumCost,
      paybackYear,
      roi30,
      totalSavings50,
      totalAppreciation50
    };
  }, [inputs]);

  const handleZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedZone = e.target.value as ClimateZone;
    setInputs({
      ...inputs, 
      climateZone: selectedZone,
      cteDemand: zoneDetails[selectedZone].demand
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <img 
              src="https://www.medgon.com/wp-content/uploads/2024/05/logotipo-medgon-passivhaus.png" 
              alt="Medgon Passivhaus" 
              className="h-16 md:h-20 w-auto object-contain"
            />
            <div className="flex flex-col items-center md:items-start md:border-l-2 md:border-slate-100 md:pl-8">
              <span className="text-slate-400 text-sm md:text-lg font-medium tracking-tight text-center md:text-left leading-tight">
                Expertos en Passivhaus desde 2012
              </span>
              {/* Simulador de Valor en Móvil (Reducido ~30%) */}
              <div className="md:hidden flex items-center gap-1.5 text-brand-600 font-bold text-xs tracking-[0.2em] uppercase mt-2 bg-brand-50 px-3 py-1.5 rounded-full border border-brand-100">
                <Leaf className="w-4 h-4" />
                <span>Simulador de Valor</span>
              </div>
            </div>
          </div>
          
          {/* Simulador de Valor en Escritorio (Reducido ~30%) */}
          <div className="hidden md:flex items-center gap-3 text-brand font-black text-lg tracking-widest uppercase bg-brand-50 px-7 py-3 rounded-full border-2 border-brand-100 shadow-md shadow-brand-500/5 hover:scale-105 transition-transform cursor-default">
            <Leaf className="w-7 h-7" />
            <span>Simulador de Valor</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Análisis del Ciclo de Vida de Vivienda</h1>
          <div className="mt-4 max-w-4xl text-slate-600 leading-relaxed space-y-2">
            <p>
              Compara el estándar de construcción <span className="font-bold text-slate-900">CTE</span> (vivienda legal mínima según el Código Técnico de la Edificación en España) frente a <span className="font-bold text-brand-600">Passivhaus</span>.
            </p>
            <p>
              Passivhaus es una metodología de gran rigor constructivo adoptada a nivel mundial que destaca por su <span className="italic">altísima eficiencia energética, un confort inigualable, predicción energética y la máxima garantía de salud</span> para sus habitantes mediante el filtrado constante de aire. Descubre la rentabilidad real de tu inversión a largo plazo.
            </p>
          </div>
        </header>

        {/* Configuration Section */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 mb-10">
          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-slate-100">
            <Settings className="w-5 h-5 text-brand" />
            <h2 className="text-xl font-bold text-slate-800">Parámetros de Configuración</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Dimensiones y Coste</h3>
              <SidebarInput 
                label="Superficie Útil (m²)" 
                value={inputs.m2} 
                min={50} max={500} step={10}
                onChange={(v) => setInputs({...inputs, m2: v})} 
                tooltip="Superficie interior habitable de la vivienda. Es la base para determinar los metros cuadrados de calefacción/refrigeración y el presupuesto total."
              />
              <SidebarInput 
                label="Coste Construcción (€/m²)" 
                value={inputs.constructionCostM2} 
                min={800} max={3000} step={50}
                onChange={(v) => setInputs({...inputs, constructionCostM2: v})} 
                tooltip="Inversión base por metro cuadrado para una vivienda convencional. Incluye materiales y mano de obra bajo normativa básica (CTE)."
              />
              <div className="mt-4">
                <div className="flex items-center gap-1.5 mb-2 group relative">
                  <label className="text-sm font-medium text-slate-700">Zona Climática</label>
                  <div className="relative cursor-help">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-brand-500 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] leading-relaxed rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-xl pointer-events-none">
                      Clasificación del Código Técnico (CTE) que define la severidad del clima. Afecta directamente a la demanda energética legal mínima de la vivienda.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </div>
                <select
                  value={inputs.climateZone}
                  onChange={handleZoneChange}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-brand focus:border-brand block p-3 transition-all outline-none"
                >
                  {Object.entries(zoneDetails).map(([key, detail]) => (
                    <option key={key} value={key}>
                      {detail.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Inversión y Demanda</h3>
              <SidebarInput 
                label="Sobre-inversión PH (%)" 
                value={inputs.passivhausPremium} 
                min={0} max={25} step={0.5}
                onChange={(v) => setInputs({...inputs, passivhausPremium: v})} 
                tooltip="Incremento del presupuesto necesario para subir el estándar de CTE a Passivhaus (aprox. 5-15%). Incluye mejor envolvente y sistema de ventilación."
              />
              <SidebarInput 
                label="Demanda CTE (kWh/m²a)" 
                value={inputs.cteDemand} 
                min={10} max={150} step={1}
                onChange={(v) => setInputs({...inputs, cteDemand: v})} 
                tooltip="Consumo estimado de una vivienda legal mínima según normativa. Varía según la zona climática y la calidad del diseño arquitectónico estándar."
              />
               <SidebarInput 
                label="Demanda PH (kWh/m²a)" 
                value={inputs.phDemand} 
                min={5} max={15} step={1}
                onChange={(v) => setInputs({...inputs, phDemand: v})} 
                tooltip="Consumo máximo permitido para el estándar Passivhaus (15 kWh/m²a). Es un valor predictivo real y garantizado por el protocolo de certificación."
              />
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Energía e Inflación</h3>
              <SidebarInput 
                label="Precio Energía (€/kWh)" 
                value={inputs.kwhPrice} 
                min={0.10} max={0.60} step={0.01}
                onChange={(v) => setInputs({...inputs, kwhPrice: v})} 
                tooltip="Coste medio del kWh en tu factura eléctrica actual (término variable + impuestos). Determina el impacto económico de cada kWh ahorrado."
              />
              <SidebarInput 
                label="Inflación Energía (%)" 
                value={inputs.energyInflation} 
                min={0} max={15} step={0.5}
                onChange={(v) => setInputs({...inputs, energyInflation: v})} 
                tooltip="La inflación media anual de la factura de luz en hogares (PVPC, tarifa regulada) en España entre 2015-2025 ha sido aproximadamente +4 % a +6 % compuesto (muy volátil por picos 2021-2022). En 2025 subió +15,5 %. Fuente fiable: Facua-Consumidores en Acción (estudio enero 2026 sobre 2025)"
              />
              <div className="mt-6 p-4 bg-brand-50 rounded-2xl border border-brand-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-700 uppercase">Inversión Extra</span>
                  <span className="text-xl font-black text-brand-700">{results.premiumCost.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Dashboard */}
        <div className="space-y-10">
          <ResultsSummary results={results} />

          {/* Charts Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Coste Total de Propiedad */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Carga Económica Total</h3>
                  <p className="text-xs text-slate-400">¿Cuánto habrás pagado en total sumando construcción y energía?</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <div className="h-80 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{fontSize: 11}} stroke="#cbd5e1" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`} tick={{fontSize: 11}} stroke="#cbd5e1" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      formatter={(val: number) => [`${val.toLocaleString('es-ES', {maximumFractionDigits: 0})} €`, 'Gasto Total']}
                    />
                    <Legend iconType="circle" verticalAlign="top" height={36}/>
                    <Line type="monotone" name="Passivhaus" dataKey="cumulativeTotalCostPH" stroke="#00bf00" strokeWidth={3} dot={false} />
                    <Line type="monotone" name="CTE Estándar" dataKey="cumulativeTotalCostCTE" stroke="#f43f5e" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  <strong>Explicación sencilla:</strong> Mira la línea roja (casa normal). Aunque al principio parece que gastas menos, las facturas de luz hacen que el precio real de tu casa suba muchísimo con los años. La línea verde sube muy poquito: tu casa te protege contra las subidas de precio de la electricidad.
                </p>
              </div>
            </div>

            {/* Chart 2: Rescate de Valor */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Rescate de Valor (Venta)</h3>
                  <p className="text-xs text-slate-400">¿Qué valor tendrá tu patrimonio en el mercado?</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Rocket className="w-5 h-5" />
                </div>
              </div>
              <div className="h-80 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{fontSize: 11}} stroke="#cbd5e1" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`} tick={{fontSize: 11}} stroke="#cbd5e1" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      formatter={(val: number) => [`${val.toLocaleString('es-ES', {maximumFractionDigits: 0})} €`, 'Valor Mercado']}
                    />
                    <Legend iconType="circle" verticalAlign="top" height={36}/>
                    <Line type="monotone" name="Passivhaus" dataKey="resaleValuePH" stroke="#00bf00" strokeWidth={3} dot={false} />
                    <Line type="monotone" name="CTE Estándar" dataKey="resaleValueCTE" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  <strong>Explicación sencilla:</strong> Compara un coche clásico bien mantenido con uno básico. Con el tiempo, el básico es solo chatarra que gasta mucha gasolina, pero el clásico es una joya que todos quieren comprar. Una casa Passivhaus es igual: siempre valdrá más porque es de muchísima más calidad y es barata de mantener.
                </p>
              </div>
            </div>
          </div>

          <InvisibleCosts />

          {/* Final Call to Action / Summary */}
          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-brand-400 mb-6 bg-brand-400/10 px-4 py-2 rounded-full border border-brand-400/20">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">Balance de Inversión a 50 años</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-[1.1]">Invertir en Passivhaus no es un gasto, es capitalizar tu vida.</h2>
                  
                  <div className="bg-slate-800/50 backdrop-blur border border-white/5 rounded-3xl p-8 mb-8">
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      Al cabo de 50 años, el retorno total de tu decisión hoy asciende a <span className="text-white font-bold">{( (results.totalSavings50 + results.totalAppreciation50) / 1000).toFixed(0)}k €</span>. Este valor se desglosa en:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400 mt-1">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-2xl font-bold text-white">{(results.totalSavings50 / 1000).toFixed(0)}k €</span>
                          <span className="text-slate-400 text-sm">Ahorro directo en facturas energéticas.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="block text-2xl font-bold text-white">{(results.totalAppreciation50 / 1000).toFixed(0)}k €</span>
                          <span className="text-slate-400 text-sm">Plusvalía por alta calidad constructiva.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm text-slate-300">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>Salud respiratoria (Aire filtrado)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm text-slate-300">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <span>Silencio absoluto (Confort acústico)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-sm text-slate-300">
                      <Thermometer className="w-4 h-4 text-amber-400" />
                      <span>Temperatura estable 24/7</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col gap-4 min-w-[300px]">
                  <div className="bg-brand-500 p-8 rounded-[2rem] shadow-xl shadow-brand-500/20 transform hover:-translate-y-1 transition-transform cursor-default">
                    <span className="block text-brand-900/60 text-xs mb-1 uppercase font-black tracking-widest">ROI Proyectado (30a)</span>
                    <span className="text-5xl font-black text-white">{results.roi30.toFixed(0)}%</span>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-brand-100 text-sm leading-snug font-medium italic">
                        "La inversión más segura para tu jubilación es una vivienda que no dependa de los precios de la energía."
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Recuperación</span>
                      <History className="w-4 h-4 text-slate-400" />
                    </div>
                    <span className="text-2xl font-bold text-white">{results.paybackYear || '>50'} años</span>
                    <p className="text-slate-500 text-xs mt-1">Tiempo para que el ahorro pague la inversión extra.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]"></div>
          </section>
        </div>
        
        <footer className="mt-16 text-center text-slate-400 text-xs py-8 border-t border-slate-100">
          <p>© {new Date().getFullYear()} Medgon Passivhaus - Expertos en Edificación de Alta Eficiencia</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
