
export enum ClimateZone {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export interface SimulationInputs {
  m2: number;
  constructionCostM2: number;
  climateZone: ClimateZone;
  passivhausPremium: number; // percentage, e.g., 10
  kwhPrice: number;
  energyInflation: number; // percentage
  cteDemand: number;
  phDemand: number;
}

export interface YearData {
  year: number;
  cteAnnualCost: number;
  phAnnualCost: number;
  annualSavings: number;
  cumulativeSavings: number;
  netCashFlow: number;
  resaleValueCTE: number;
  resaleValuePH: number;
  cumulativeTotalCostCTE: number;
  cumulativeTotalCostPH: number;
}

export interface SimulationResults {
  data: YearData[];
  initialInvestmentCTE: number;
  initialInvestmentPH: number;
  premiumCost: number;
  paybackYear: number | null;
  roi30: number;
  totalSavings50: number;
  totalAppreciation50: number;
}
