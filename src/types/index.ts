// Export des types de base de données
export type { Database, Json } from './database';

// Export des types dashboard
export type {
  KpiCardProps,
  DashboardKpis,
  ChartDataPoint,
  LabData,
  SearchResult,
  TabType,
  TabConfig,
} from './dashboard';

// Types utilitaires génériques
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}