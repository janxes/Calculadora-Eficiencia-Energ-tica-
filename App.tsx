
import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
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
  ArrowUpRight,
  Rocket,
  Calculator,
  Plus,
  Equal,
  Shield,
  HelpCircle
} from 'lucide-react';
import { ClimateZone, SimulationInputs, SimulationResults, YearData } from './types';

// Components
import SidebarInput from './components/SidebarInput';
import ResultsSummary from './components/ResultsSummary';
import InvisibleCosts from './components/InvisibleCosts';
import FeaturesGrid from './components/FeaturesGrid';

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
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <img 
              src="https://www.medgon.com/wp-content/uploads/2024/05/logotipo-medgon-passivhaus.png" 
              alt="Medgon Passivhaus" 
              className="h-20 md:h-24 w-auto object-contain"
            />
            <div className="flex flex-col items-center md:items-start md:border-l-2 md:border-slate-100 md:pl-10">
              <span className="text-slate-500 text-lg md:text-xl font-semibold tracking-tight text-center md:text-left leading-tight">
                Expertos en Passivhaus desde 2012
              </span>
              <div className="md:hidden flex items-center gap-2 text-brand-600 font-black text-sm tracking-widest uppercase mt-3 bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
                <Leaf className="w-5 h-5" />
                <span>Simulador de Valor</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-brand font-black text-xl tracking-widest uppercase bg-brand-50 px-8 py-4 rounded-full border-2 border-brand-100 shadow-md">
            <Leaf className="w-8 h-8" />
            <span>Simulador de Valor</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-14 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Análisis del Ciclo de Vida de tu Vivienda</h1>
          <div className="mt-6 max-w-5xl text-slate-600 text-xl leading-relaxed space-y-4">
            <p>
              Compare su futura casa construida con el <span className="font-bold text-slate-900">estándar legal mínimo (CTE)</span> frente a una <span className="font-bold text-brand-600 underline decoration-brand-200 underline-offset-4">Passivhaus certificada</span>.
            </p>
            <p className="font-medium">
              Passivhaus no es solo ahorro; es vivir con una <span className="italic">temperatura perfecta</span>, aire puro sin polvo ni polen y el silencio más absoluto.
            </p>
          </div>
        </header>

        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
            <Settings className="w-7 h-7 text-brand" />
            <h2 className="text-2xl font-black text-slate-800">Configure los datos de su proyecto</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12">
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Base del Proyecto</h3>
              <SidebarInput 
                label="Metros Cuadrados (m²)" 
                value={inputs.m2} 
                min={50} max={500} step={10}
                onChange={(v) => setInputs({...inputs, m2: v})} 
                tooltip="Superficie total útil habitable en el interior de su vivienda."
              />
              <SidebarInput 
                label="Coste de Obra (€/m²)" 
                value={inputs.constructionCostM2} 
                min={800} max={3000} step={50}
                onChange={(v) => setInputs({...inputs, constructionCostM2: v})} 
                tooltip="Precio por metro cuadrado de una construcción convencional básica."
              />
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3 group relative">
                  <label className="text-lg font-bold text-slate-700">Zona Climática</label>
                  <div className="relative cursor-help">
                    <Info className="w-5 h-5 text-slate-400 hover:text-brand-500 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 p-5 bg-slate-900 text-white text-sm leading-relaxed rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-2xl">
                      La zona climática define cuánto frío o calor hace en su localidad, lo que influye en el gasto de calefacción.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                </div>
                <select
                  value={inputs.climateZone}
                  onChange={handleZoneChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg font-semibold rounded-2xl focus:ring-brand focus:border-brand block p-4 transition-all outline-none cursor-pointer"
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
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Estándares de Calidad</h3>
              <SidebarInput 
                label="Inversión Passivhaus (%)" 
                value={inputs.passivhausPremium} 
                min={0} max={25} step={0.5}
                onChange={(v) => setInputs({...inputs, passivhausPremium: v})} 
                tooltip="El pequeño extra necesario para mejorar aislamientos, ventanas y ventilación."
              />
              <SidebarInput 
                label="Demanda Casa Normal" 
                value={inputs.cteDemand} 
                min={10} max={150} step={1}
                onChange={(v) => setInputs({...inputs, cteDemand: v})} 
                tooltip="Gasto de energía por metro cuadrado de una casa estándar."
              />
               <SidebarInput 
                label="Demanda Passivhaus" 
                value={inputs.phDemand} 
                min={5} max={15} step={1}
                onChange={(v) => setInputs({...inputs, phDemand: v})} 
                tooltip="Consumo garantizado: máximo 15 kWh/m²a para Passivhaus."
              />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Electricidad</h3>
              <SidebarInput 
                label="Precio Luz (€/kWh)" 
                value={inputs.kwhPrice} 
                min={0.10} max={0.60} step={0.01}
                onChange={(v) => setInputs({...inputs, kwhPrice: v})} 
                tooltip="Lo que paga actualmente por cada unidad de electricidad en su factura."
              />
              <SidebarInput 
                label="Subida Anual Luz (%)" 
                value={inputs.energyInflation} 
                min={0} max={15} step={0.5}
                onChange={(v) => setInputs({...inputs, energyInflation: v})} 
                tooltip="Estimación de cuánto subirá el precio de la luz cada año (IPC energético)."
              />
              <div className="mt-8 p-6 bg-brand-50 rounded-3xl border-2 border-brand-100 shadow-inner">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-black text-brand-800 uppercase tracking-widest">Inversión Adicional</span>
                  <span className="text-3xl font-black text-brand-700">{results.premiumCost.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0})}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-12">
          <ResultsSummary results={results} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Dinero Total Gastado</h3>
                  <p className="text-lg text-slate-500 font-medium">Suma de construcción + recibos de luz acumulados.</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                  <ArrowUpRight className="w-7 h-7" />
                </div>
              </div>
              <div className="h-96 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{fontSize: 14, fontWeight: 600}} stroke="#64748b" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`} tick={{fontSize: 14, fontWeight: 600}} stroke="#64748b" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '16px', fontWeight: 'bold'}}
                      formatter={(val: number) => [`${val.toLocaleString('es-ES', {maximumFractionDigits: 0})} €`, 'Total acumulado']}
                    />
                    <Legend iconType="circle" verticalAlign="top" height={48} wrapperStyle={{fontSize: '16px', fontWeight: 'bold'}}/>
                    <Line type="monotone" name="Casa Passivhaus (Ahorro)" dataKey="cumulativeTotalCostPH" stroke="#00bf00" strokeWidth={5} dot={false} />
                    <Line type="monotone" name="Casa Normal (Gasto)" dataKey="cumulativeTotalCostCTE" stroke="#f43f5e" strokeWidth={5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Valor de Venta Futuro</h3>
                  <p className="text-lg text-slate-500 font-medium">¿Cuánto valdría su propiedad si decide venderla?</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <Rocket className="w-7 h-7" />
                </div>
              </div>
              <div className="h-96 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data} margin={{ left: 0, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{fontSize: 14, fontWeight: 600}} stroke="#64748b" axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(val) => `${(val / 1000).toFixed(0)}k€`} tick={{fontSize: 14, fontWeight: 600}} stroke="#64748b" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '16px', fontWeight: 'bold'}}
                      formatter={(val: number) => [`${val.toLocaleString('es-ES', {maximumFractionDigits: 0})} €`, 'Valor mercado']}
                    />
                    <Legend iconType="circle" verticalAlign="top" height={48} wrapperStyle={{fontSize: '16px', fontWeight: 'bold'}}/>
                    <Line type="monotone" name="Valor Passivhaus" dataKey="resaleValuePH" stroke="#00bf00" strokeWidth={5} dot={false} />
                    <Line type="monotone" name="Valor Casa Normal" dataKey="resaleValueCTE" stroke="#94a3b8" strokeWidth={3} strokeDasharray="8 8" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <InvisibleCosts />

          <section className="bg-white rounded-[3rem] border-2 border-slate-100 p-10 md:p-14 shadow-xl">
            <div className="flex items-center gap-4 mb-12 pb-8 border-b-2 border-slate-50">
              <Calculator className="w-10 h-10 text-slate-800" />
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">Por qué las cuentas salen ganando</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-11 items-stretch gap-8 text-center lg:text-left">
              <div className="lg:col-span-3 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center lg:items-start shadow-sm">
                <div className="mb-6">
                  <div className="p-4 bg-brand-100 text-brand-600 rounded-2xl">
                    <Zap className="w-10 h-10" />
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">Ahorro en Facturas</h4>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  El dinero que deja de pagar a las eléctricas durante 50 años.
                </p>
                <div className="mt-auto pt-8 text-4xl font-black text-slate-900">{results.totalSavings50.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0})}</div>
              </div>

              <div className="lg:col-span-1 flex items-center justify-center text-slate-300">
                <Plus className="w-12 h-12" />
              </div>

              <div className="lg:col-span-3 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center lg:items-start shadow-sm">
                <div className="mb-6">
                  <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
                    <TrendingUp className="w-10 h-10" />
                  </div>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">Plusvalía de Venta</h4>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Su casa vale mucho más porque es de una calidad de construcción muy superior.
                </p>
                <div className="mt-auto pt-8 text-4xl font-black text-slate-900">{results.totalAppreciation50.toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0})}</div>
              </div>

              <div className="lg:col-span-1 flex items-center justify-center text-slate-300">
                <Equal className="w-12 h-12" />
              </div>

              <div className="lg:col-span-3 p-10 bg-brand-600 text-white rounded-[3rem] shadow-2xl shadow-brand-500/40 flex flex-col items-center lg:items-start">
                <div className="mb-6">
                  <div className="p-5 bg-white/20 text-white rounded-3xl">
                    <Coins className="w-12 h-12" />
                  </div>
                </div>
                <h4 className="text-3xl font-black text-white mb-5 tracking-tight">Beneficio Total</h4>
                <p className="text-xl text-brand-50 leading-relaxed font-semibold opacity-90">
                  Riqueza generada por elegir Passivhaus hoy.
                </p>
                <div className="mt-auto pt-10 text-5xl font-black text-white leading-none tracking-tighter">{(results.totalSavings50 + results.totalAppreciation50).toLocaleString('es-ES', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0})}</div>
              </div>
            </div>
          </section>

          {/* New Grid of Features */}
          <FeaturesGrid />

          <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-3 text-brand-400 mb-8 bg-brand-400/10 px-6 py-3 rounded-full border border-brand-400/20">
                    <ShieldCheck className="w-6 h-6" />
                    <span className="text-sm font-black uppercase tracking-[0.2em]">Seguridad Financiera a Largo Plazo</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tight">Elegir Passivhaus no es un gasto, es blindar su patrimonio.</h2>
                  
                  <div className="bg-slate-800/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-10 mb-10 shadow-inner">
                    <p className="text-slate-200 text-2xl leading-relaxed mb-8 font-medium">
                      En 50 años, su decisión de hoy le habrá devuelto <span className="text-white font-black underline decoration-brand-500 underline-offset-8">{( (results.totalSavings50 + results.totalAppreciation50) / 1000).toFixed(0)} mil euros</span>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div className="flex items-start gap-5">
                        <div className="p-3 bg-brand-500/20 rounded-2xl text-brand-400 mt-1">
                          <Zap className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="block text-3xl font-black text-white">{(results.totalSavings50 / 1000).toFixed(0)}k €</span>
                          <span className="text-slate-400 text-lg font-bold">Ahorro en electricidad.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-5">
                        <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 mt-1">
                          <TrendingUp className="w-8 h-8" />
                        </div>
                        <div>
                          <span className="block text-3xl font-black text-white">{(results.totalAppreciation50 / 1000).toFixed(0)}k €</span>
                          <span className="text-slate-400 text-lg font-bold">Plusvalía por calidad.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/5 px-8 py-6 rounded-3xl border border-white/10 max-w-fit shadow-lg">
                    <Shield className="w-8 h-8 text-brand-400" />
                    <p className="text-lg font-bold text-brand-50 italic leading-relaxed">
                      "La mayor tranquilidad para su jubilación es una casa que no dependa de las subidas de la luz."
                    </p>
                  </div>
                </div>
                
                <div className="w-full lg:w-auto flex flex-col gap-6 min-w-[320px]">
                  {/* ROI PROYECTADO SECTION EXPLAINED */}
                  <div className="bg-brand-500 p-10 rounded-[3rem] shadow-2xl shadow-brand-500/30 transform hover:scale-[1.03] transition-all cursor-default text-center lg:text-left relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                        <span className="block text-brand-900/70 text-sm uppercase font-black tracking-widest">ROI Proyectado</span>
                        <div className="relative group/roi">
                          <HelpCircle className="w-6 h-6 text-white/50 hover:text-white transition-colors cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 p-6 bg-slate-900 text-white text-base leading-relaxed rounded-[2rem] opacity-0 invisible group-hover/roi:opacity-100 group-hover/roi:visible transition-all z-50 shadow-2xl border border-white/10">
                            <p className="font-black mb-3 text-brand-400 text-lg">¿Qué es el ROI?</p>
                            <p className="font-medium">Es la rentabilidad de su inversión. Un ROI del {results.roi30.toFixed(0)}% significa que por cada euro "extra" invertido hoy, recuperará {(results.roi30 / 100).toFixed(1)} veces esa cantidad en ahorros y valor.</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      </div>
                      <span className="text-7xl font-black text-white tracking-tighter">{results.roi30.toFixed(0)}%</span>
                      <div className="mt-6 pt-6 border-t-2 border-white/20">
                        <p className="text-brand-900 text-sm font-black leading-relaxed opacity-80">
                          RENTABILIDAD NETA ASEGURADA POR AHORRO Y CALIDAD.
                        </p>
                      </div>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 text-white/10 group-hover:text-white/20 transition-all">
                      <TrendingUp className="w-48 h-48 rotate-12" />
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-8 rounded-[2.5rem] border-2 border-white/5 flex flex-col items-center lg:items-start shadow-xl">
                    <div className="flex items-center justify-between w-full mb-6">
                      <span className="text-slate-400 text-sm font-black uppercase tracking-[0.2em]">Amortización</span>
                      <History className="w-6 h-6 text-slate-400" />
                    </div>
                    <span className="text-4xl font-black text-white">{results.paybackYear || '>50'} años</span>
                    <p className="text-slate-500 text-lg mt-3 font-semibold text-center lg:text-left">Tiempo para recuperar la inversión extra.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <footer className="mt-20 text-center text-slate-500 text-base font-semibold py-10 border-t-2 border-slate-100">
          <p>© {new Date().getFullYear()} Medgon Passivhaus - Los más altos estándares de calidad constructiva.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
