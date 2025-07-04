export interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

export interface DashboardKpis {
  caTtc: number;
  margeTtc: number;
  stockHt: number;
  nombreProduits: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
}

export interface LabData {
  id: number;
  nom: string;
  caTtc: number;
  margeTtc: number;
  stockHt: number;
  pourcentageMarge: number;
}

export interface SearchResult {
  id: number;
  nom: string;
  code: string;
  statut: string;
}

export type TabType = 'marge' | 'stock' | 'comparaison' | 'analyse' | 'perimes' | 'compensation';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}