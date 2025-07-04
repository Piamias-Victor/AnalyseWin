'use client';

import React, { useEffect, useState } from 'react';
import { 
  CurrencyEuroIcon, 
  ChartBarIcon, 
  CubeIcon,
  ShoppingBagIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

// Import des composants
import { Button, Card } from '@/components/atoms';
import { KpiCard, Chart } from '@/components/molecules';
import { Layout } from '@/components/organisms';
import { useDashboard } from '@/hooks';
import type { ChartDataPoint } from '@/types';

export default function DashboardPage() {
  const { 
    kpis, 
    loading, 
    error, 
    refreshData, 
    loadChartData
  } = useDashboard();

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [productData, setProductData] = useState<ChartDataPoint[]>([]);
  const [chartsLoading, setChartsLoading] = useState(true);

  useEffect(() => {
    // Charger les données des graphiques via Supabase/mock
    loadChartsData();
  }, []);

  const loadChartsData = async () => {
    try {
      setChartsLoading(true);
      
      const [monthlyData, productsData] = await Promise.all([
        loadChartData('monthly'),
        loadChartData('products')
      ]);
      
      setChartData(monthlyData);
      setProductData(productsData);
    } catch (error) {
      console.error('Erreur chargement charts:', error);
    } finally {
      setChartsLoading(false);
    }
  };

  const handleRefresh = () => {
    refreshData();
    loadChartsData();
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header avec actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Vue d'ensemble de votre pharmacie
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              loading={loading}
              icon={<ArrowPathIcon className="h-4 w-4" />}
            >
              Actualiser
            </Button>
          </div>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <Card variant="default" padding="md" className="border-red-200 bg-red-50">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <p className="text-red-700 text-sm font-medium">
                Erreur de chargement : {error}
              </p>
            </div>
          </Card>
        )}

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title="Chiffre d'Affaires TTC"
            value={kpis?.caTtc || 0}
            change={12.5}
            changeType="increase"
            icon={CurrencyEuroIcon}
            loading={loading}
          />
          <KpiCard
            title="Marge TTC"
            value={kpis?.margeTtc || 0}
            change={-2.3}
            changeType="decrease"
            icon={ChartBarIcon}
            loading={loading}
          />
          <KpiCard
            title="Valeur Stock HT"
            value={kpis?.stockHt || 0}
            change={5.1}
            changeType="increase"
            icon={CubeIcon}
            loading={loading}
          />
          <KpiCard
            title="Nombre de Produits"
            value={kpis?.nombreProduits || 0}
            icon={ShoppingBagIcon}
            loading={loading}
          />
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Chart
            type="bar"
            data={chartData}
            title="Évolution du CA (6 derniers mois)"
            height={300}
            variant="default"
            loading={chartsLoading}
          />
          <Chart
            type="line"
            data={chartData}
            title="Tendance des ventes"
            height={300}
            variant="elevated"
            loading={chartsLoading}
          />
        </div>

        {/* Analyse produits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Chart
              type="pie"
              data={productData}
              title="Répartition par produit"
              height={350}
              variant="default"
              loading={chartsLoading}
            />
          </div>
          
          <div className="space-y-4">
            <Card variant="elevated" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Résumé des ventes
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ventes aujourd'hui</span>
                  <span className="font-semibold text-gray-900">2 847 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Objectif mensuel</span>
                  <span className="font-semibold text-gray-900">75 000 €</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progression</span>
                  <span className="font-semibold text-green-600">68%</span>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Alertes
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">3 produits en rupture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">12 produits périmés</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Synchronisation OK</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer informations */}
        <Card variant="default" padding="md" className="mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Dernière synchronisation : {new Date().toLocaleString('fr-FR')}
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}