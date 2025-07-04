import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { useSupabase } from './useSupabase';
import type { ChartDataPoint } from '@/types';

export const useDashboard = () => {
  const {
    dashboardKpis,
    dashboardLoading,
    dashboardError,
    setDashboardKpis,
    setDashboardLoading,
    setDashboardError,
  } = useStore();

  const { getDashboardKpis, getChartData, loading: supabaseLoading, error: supabaseError } = useSupabase();

  // Charger les KPIs au montage
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Synchroniser les états
  useEffect(() => {
    setDashboardLoading(supabaseLoading);
  }, [supabaseLoading, setDashboardLoading]);

  useEffect(() => {
    setDashboardError(supabaseError);
  }, [supabaseError, setDashboardError]);

  const loadDashboardData = async () => {
    try {
      const kpis = await getDashboardKpis();
      if (kpis) {
        setDashboardKpis(kpis);
      }
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    }
  };

  const loadChartData = async (type: 'monthly' | 'products'): Promise<ChartDataPoint[]> => {
    try {
      const data = await getChartData(type);
      return data;
    } catch (error) {
      console.error('Erreur chargement graphiques:', error);
      return [];
    }
  };

  const refreshData = () => {
    loadDashboardData();
  };

  // Données factices pour développement
  const getMockChartData = (): ChartDataPoint[] => [
    { name: 'Jan', value: 45000 },
    { name: 'Fév', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Avr', value: 61000 },
    { name: 'Mai', value: 58000 },
    { name: 'Jun', value: 67000 },
  ];

  const getMockProductData = (): ChartDataPoint[] => [
    { name: 'Doliprane', value: 25000 },
    { name: 'Efferalgan', value: 18000 },
    { name: 'Spasfon', value: 15000 },
    { name: 'Autres', value: 42000 },
  ];

  return {
    // État
    kpis: dashboardKpis,
    loading: dashboardLoading,
    error: dashboardError,

    // Actions
    refreshData,
    loadChartData,

    // Données mock pour développement
    getMockChartData,
    getMockProductData,
  };
};