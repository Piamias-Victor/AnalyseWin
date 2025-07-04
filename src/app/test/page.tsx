'use client';

import React, { useState } from 'react';
import { 
  CurrencyEuroIcon, 
  ChartBarIcon, 
  CubeIcon,
  UserGroupIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

// Import des composants
import { Button, Input, Card, Badge } from '@/components/atoms';
import { SearchBar, KpiCard, Chart } from '@/components/molecules';
import { Layout } from '@/components/organisms';

export default function TestPage() {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Données de test pour les graphiques
  const chartData = [
    { name: 'Jan', value: 45000 },
    { name: 'Fév', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Avr', value: 61000 },
    { name: 'Mai', value: 58000 },
    { name: 'Jun', value: 67000 },
  ];

  const pieData = [
    { name: 'Doliprane', value: 25000 },
    { name: 'Efferalgan', value: 18000 },
    { name: 'Spasfon', value: 15000 },
    { name: 'Autres', value: 42000 },
  ];

  const handleSearch = (value: string) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Recherche:', value);
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Test des Composants
          </h1>
          <p className="text-gray-600 text-lg">
            Validation du design system glassmorphism
          </p>
        </div>

        {/* Section Atoms */}
        <Card variant="glass" padding="lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Atoms</h2>
          
          {/* Buttons */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="glass" icon={<MagnifyingGlassIcon className="h-4 w-4" />}>
                  With Icon
                </Button>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <Input 
                  placeholder="Input normal" 
                  label="Label normal"
                />
                <Input 
                  variant="glass"
                  placeholder="Input glass" 
                  label="Label glass"
                />
                <Input 
                  placeholder="Avec erreur" 
                  error="Ce champ est requis"
                />
                <Input 
                  placeholder="Avec icône"
                  leftIcon={<MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />}
                />
              </div>
            </div>

            {/* Badges */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="success" dot>Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error" dot>Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="glass">Glass</Badge>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default" padding="md" hover>
                  <p className="text-gray-900">Card Default</p>
                </Card>
                <Card variant="glass" padding="md" hover>
                  <p className="text-white">Card Glass</p>
                </Card>
                <Card variant="elevated" padding="md" hover>
                  <p className="text-gray-900">Card Elevated</p>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        {/* Section Molecules */}
        <Card variant="glass" padding="lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Molecules</h2>
          
          <div className="space-y-6">
            {/* SearchBar */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">SearchBar</h3>
              <div className="space-y-4 max-w-2xl">
                <SearchBar
                  placeholder="Rechercher un laboratoire..."
                  value={searchValue}
                  onChange={setSearchValue}
                  onSearch={handleSearch}
                  loading={loading}
                  variant="glass"
                />
              </div>
            </div>

            {/* KPI Cards */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">KPI Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                  title="Chiffre d'Affaires TTC"
                  value={456789}
                  change={12.5}
                  changeType="increase"
                  icon={CurrencyEuroIcon}
                />
                <KpiCard
                  title="Marge TTC"
                  value={123456}
                  change={-2.3}
                  changeType="decrease"
                  icon={ChartBarIcon}
                />
                <KpiCard
                  title="Stock HT"
                  value={98765}
                  change={0}
                  changeType="neutral"
                  icon={CubeIcon}
                />
                <KpiCard
                  title="Nombre de Produits"
                  value={1234}
                  icon={UserGroupIcon}
                  loading={false}
                />
              </div>
            </div>

            {/* Charts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Charts</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Chart
                  type="bar"
                  data={chartData}
                  title="Évolution du CA (6 derniers mois)"
                  height={250}
                />
                <Chart
                  type="line"
                  data={chartData}
                  title="Tendance des ventes"
                  height={250}
                />
                <Chart
                  type="pie"
                  data={pieData}
                  title="Top Produits"
                  height={250}
                />
                <Chart
                  data={[]}
                  title="Chart en loading"
                  height={250}
                  loading={true}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/50 text-sm">
            🎨 Design System Glassmorphism - Analytics Pharma
          </p>
        </div>
      </div>
    </Layout>
  );
}