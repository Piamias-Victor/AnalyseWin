import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { DashboardKpis, LabData, SearchResult } from '@/types';

interface AppState {
  // Dashboard State
  dashboardKpis: DashboardKpis | null;
  dashboardLoading: boolean;
  dashboardError: string | null;
  
  // Lab State  
  selectedLab: LabData | null;
  labSearch: string;
  labResults: SearchResult[];
  labLoading: boolean;
  labError: string | null;
  
  // UI State
  sidebarCollapsed: boolean;
  currentPage: string;
}

interface AppActions {
  // Dashboard Actions
  setDashboardKpis: (kpis: DashboardKpis) => void;
  setDashboardLoading: (loading: boolean) => void;
  setDashboardError: (error: string | null) => void;
  
  // Lab Actions
  setSelectedLab: (lab: LabData | null) => void;
  setLabSearch: (search: string) => void;
  setLabResults: (results: SearchResult[]) => void;
  setLabLoading: (loading: boolean) => void;
  setLabError: (error: string | null) => void;
  
  // UI Actions
  toggleSidebar: () => void;
  setCurrentPage: (page: string) => void;
  
  // Reset Actions
  resetDashboard: () => void;
  resetLab: () => void;
}

type Store = AppState & AppActions;

const initialState: AppState = {
  dashboardKpis: null,
  dashboardLoading: false,
  dashboardError: null,
  
  selectedLab: null,
  labSearch: '',
  labResults: [],
  labLoading: false,
  labError: null,
  
  sidebarCollapsed: false,
  currentPage: 'dashboard',
};

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      ...initialState,
      
      // Dashboard Actions
      setDashboardKpis: (kpis) => set({ dashboardKpis: kpis }),
      setDashboardLoading: (loading) => set({ dashboardLoading: loading }),
      setDashboardError: (error) => set({ dashboardError: error }),
      
      // Lab Actions
      setSelectedLab: (lab) => set({ selectedLab: lab }),
      setLabSearch: (search) => set({ labSearch: search }),
      setLabResults: (results) => set({ labResults: results }),
      setLabLoading: (loading) => set({ labLoading: loading }),
      setLabError: (error) => set({ labError: error }),
      
      // UI Actions
      toggleSidebar: () => 
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // Reset Actions
      resetDashboard: () => 
        set({
          dashboardKpis: null,
          dashboardLoading: false,
          dashboardError: null,
        }),
      resetLab: () => 
        set({
          selectedLab: null,
          labSearch: '',
          labResults: [],
          labLoading: false,
          labError: null,
        }),
    }),
    { name: 'pharma-analytics-store' }
  )
);