import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { DashboardKpis } from '@/types';

interface UseSupabaseOptions {
  pharmacieId?: number;
}

export const useSupabase = (options: UseSupabaseOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { pharmacieId = 1 } = options; // Pharmacie par défaut

  // Fonction pour calculer les KPIs dashboard
  const getDashboardKpis = async (): Promise<DashboardKpis | null> => {
    try {
      setLoading(true);
      setError(null);

      console.log('📊 Chargement KPIs depuis Supabase...');

      // 1. Nombre de produits
      const { count: nombreProduits, error: countError } = await supabase
        .from('produits')
        .select('*', { count: 'exact', head: true })
        .eq('pharmacie_id', pharmacieId);

      if (countError) {
        console.error('Erreur count produits:', countError);
      }

      // 2. Ventes mensuelles simples (sans relations)
      const { data: ventesData, error: ventesError } = await supabase
        .from('ventes_mensuelles')
        .select('quantite_vendue')
        .eq('pharmacie_id', pharmacieId)
        .eq('annee', new Date().getFullYear());

      if (ventesError) {
        console.error('Erreur ventes:', ventesError);
      }

      // 3. Stocks simples
      const { data: stocksData, error: stocksError } = await supabase
        .from('stocks')
        .select('quantite_rayon, quantite_reserve')
        .eq('pharmacie_id', pharmacieId);

      if (stocksError) {
        console.error('Erreur stocks:', stocksError);
      }

      // Calculs simples
      const totalVentes = ventesData?.reduce((sum, v) => sum + v.quantite_vendue, 0) || 0;
      const totalStock = stocksData?.reduce((sum, s) => sum + s.quantite_rayon + s.quantite_reserve, 0) || 0;

      const kpis: DashboardKpis = {
        caTtc: totalVentes * 15, // Prix moyen estimé 15€
        margeTtc: totalVentes * 15 * 0.3, // Marge 30%
        stockHt: totalStock * 8, // Prix achat moyen 8€
        nombreProduits: nombreProduits || 0,
      };

      console.log('✅ KPIs calculés:', kpis);
      return kpis;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('❌ Erreur getDashboardKpis:', err);
      setError(errorMessage);
      
      // Fallback sur mock en cas d'erreur
      return {
        caTtc: 156789,
        margeTtc: 47037,
        stockHt: 89456,
        nombreProduits: 1247,
      };
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les données de graphiques
  const getChartData = async (type: 'monthly' | 'products') => {
    try {
      setLoading(true);
      setError(null);

      console.log(`📈 Chargement données chart ${type} depuis Supabase...`);

      if (type === 'monthly') {
        // Ventes par mois
        const { data, error } = await supabase
          .from('ventes_mensuelles')
          .select('mois, quantite_vendue')
          .eq('pharmacie_id', pharmacieId)
          .eq('annee', new Date().getFullYear())
          .order('mois', { ascending: true });

        if (error) {
          console.error('Erreur chart monthly:', error);
          return [];
        }

        // Grouper par mois UNIQUE
        const monthlyMap = new Map();
        
        data?.forEach(item => {
          const monthName = getMonthName(item.mois);
          const ca = item.quantite_vendue * 15; // Prix moyen
          
          if (monthlyMap.has(item.mois)) {
            monthlyMap.set(item.mois, monthlyMap.get(item.mois) + ca);
          } else {
            monthlyMap.set(item.mois, ca);
          }
        });

        // Convertir en tableau trié
        const monthlyData = Array.from(monthlyMap.entries())
          .sort((a, b) => a[0] - b[0]) // Trier par numéro de mois
          .map(([mois, value]) => ({
            name: getMonthName(mois),
            value: Math.round(value)
          }));

        console.log('✅ Chart monthly data (unique):', monthlyData);
        return monthlyData;
      }

      // Fallback sur données mock pour produits
      return [
        { name: 'Doliprane', value: 25000 },
        { name: 'Efferalgan', value: 18000 },
        { name: 'Spasfon', value: 15000 },
        { name: 'Autres', value: 42000 },
      ];

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      console.error('❌ Erreur getChartData:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getDashboardKpis,
    getChartData,
    loading,
    error,
  };
};

// Utilitaire pour les noms de mois
const getMonthName = (month: number): string => {
  const months = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun',
    'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'
  ];
  return months[month - 1] || `Mois ${month}`;
};