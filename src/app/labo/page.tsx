'use client';

import React, { useEffect, useRef } from 'react';
import { 
  XMarkIcon,
  CurrencyEuroIcon,
  ChartBarIcon,
  CubeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Button, Card } from '@/components/atoms';
import { SearchBar, KpiCard } from '@/components/molecules';
import TabNavigation from '@/components/molecules/TabNavigation';
import { Layout } from '@/components/organisms';
import LabContent from '@/components/organisms/LabContent';
import { useLaboratoires } from '@/hooks/useLaboratoires';

export default function LaboPage() {
  const {
    selectedLab,
    labSearch,
    labResults,
    loading,
    error,
    activeTab,
    seuilBonneMarge,
    seuilMauvaiseMarge,
    setSeuilBonneMarge,
    setSeuilMauvaiseMarge,
    searchLaboratoires,
    selectLaboratoire,
    clearSearch,
    setActiveTab,
    getTabData,
    setLabSearch,
  } = useLaboratoires();

  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const handleSearch = (query: string) => {
    // Mettre à jour immédiatement l'input
    setLabSearch(query);
    
    // Débouncer la recherche API
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (query.trim().length >= 2) {
        console.log('🚀 Lancement recherche debounced:', query);
        searchLaboratoires(query);
      } else {
        // Vider les résultats si moins de 2 caractères
        clearSearch();
      }
    }, 500); // Attendre 500ms après la dernière frappe
  };

  const handleSearchSubmit = (query: string) => {
    // Recherche immédiate sur submit
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    console.log('🔍 Recherche immédiate:', query);
    searchLaboratoires(query);
  };

  const handleClear = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    clearSearch();
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Laboratoires
            </h1>
            <p className="text-gray-600 mt-2">
              Recherche et analyse par laboratoire
            </p>
          </div>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <Card variant="default" padding="md" className="border-red-200 bg-red-50">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <p className="text-red-700 text-sm font-medium">
                {error}
              </p>
            </div>
          </Card>
        )}

        {/* Recherche */}
        <Card variant="default" padding="lg">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Rechercher un laboratoire
            </h2>
            
            <div className="w-full">
              <SearchBar
                placeholder="Nom du laboratoire (ex: Sanofi, Pfizer...)"
                value={labSearch}
                onChange={handleSearch}
                onSearch={handleSearchSubmit}
                onClear={handleClear}
                loading={loading}
                variant="default"
              />
            </div>

            {/* Résultats de recherche */}
            {labResults.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Résultats ({labResults.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {labResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => selectLaboratoire(result)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{result.nom}</p>
                          <p className="text-sm text-gray-600">Code: {result.code}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          result.statut === 'ACTIF' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {result.statut}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message si pas de résultats */}
            {labSearch && labResults.length === 0 && !loading && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">
                  Aucun laboratoire trouvé pour "{labSearch}"
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Laboratoire sélectionné */}
        {selectedLab && (
          <div className="space-y-6">
            
            {/* Header du laboratoire sélectionné */}
            <Card variant="elevated" padding="md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedLab.nom}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Analyse des données sur 12 mois
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  icon={<XMarkIcon className="h-4 w-4" />}
                >
                  Fermer
                </Button>
              </div>
            </Card>

            {/* KPIs du laboratoire */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard
                title="Chiffre d'Affaires TTC"
                value={selectedLab.caTtc}
                change={12.5}
                changeType="increase"
                icon={CurrencyEuroIcon}
                loading={loading}
              />
              <KpiCard
                title="Marge TTC"
                value={selectedLab.margeTtc}
                change={-2.3}
                changeType="decrease"
                icon={ChartBarIcon}
                loading={loading}
              />
              <KpiCard
                title="Valeur Stock HT"
                value={selectedLab.stockHt}
                change={5.1}
                changeType="increase"
                icon={CubeIcon}
                loading={loading}
              />
              <KpiCard
                title="Nombre de Produits"
                value={10}
                icon={ShoppingBagIcon}
                loading={loading}
              />
            </div>

            {/* Navigation par onglets */}
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              disabled={loading}
            />

            {/* Contenu de l'onglet */}
            <LabContent
              lab={selectedLab}
              activeTab={activeTab}
              tabData={getTabData(activeTab)}
              loading={loading}
              seuilBonneMarge={seuilBonneMarge}
              seuilMauvaiseMarge={seuilMauvaiseMarge}
              onSeuilBonneMargeChange={setSeuilBonneMarge}
              onSeuilMauvaiseMargeChange={setSeuilMauvaiseMarge}
            />
          </div>
        )}

        {/* État vide */}
        {!selectedLab && !labSearch && (
          <Card variant="default" padding="lg">
            <div className="text-center py-12">
              <div className="h-12 w-12 mx-auto mb-4 text-gray-400">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recherchez un laboratoire
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Utilisez la barre de recherche ci-dessus pour trouver et analyser 
                les données d'un laboratoire spécifique.
              </p>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}