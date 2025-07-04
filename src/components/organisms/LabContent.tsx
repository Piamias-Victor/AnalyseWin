import React from 'react';
import { Card, Input } from '@/components/atoms';
import { KpiCard, Chart } from '@/components/molecules';
import { 
  CurrencyEuroIcon,
  ChartBarIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import type { LabData, TabType } from '@/types';

interface LabContentProps {
  lab: LabData;
  activeTab: TabType;
  tabData: any[] | any; // Flexible pour object ou array
  loading?: boolean;
  // Props pour l'onglet marge
  seuilBonneMarge?: number;
  seuilMauvaiseMarge?: number;
  onSeuilBonneMargeChange?: (value: number) => void;
  onSeuilMauvaiseMargeChange?: (value: number) => void;
}

const LabContent: React.FC<LabContentProps> = ({
  lab,
  activeTab,
  tabData,
  loading = false,
  seuilBonneMarge = 30,
  seuilMauvaiseMarge = 20,
  onSeuilBonneMargeChange,
  onSeuilMauvaiseMargeChange,
}) => {
  const renderTabContent = () => {
    // DEBUG temporaire
    console.log('🔍 LabContent Debug:', {
      activeTab,
      tabData,
      seuilBonneMarge,
      seuilMauvaiseMarge,
      hasCallbacks: !!onSeuilBonneMargeChange
    });

    switch (activeTab) {
      case 'marge':
        const margeData = tabData as any;
        console.log('📊 Marge Data:', margeData);
        
        if (!margeData || !margeData.getProduitsParSeuil) {
          return (
            <Card variant="default" padding="md">
              <p className="text-red-600">❌ Erreur: données marge non disponibles</p>
              <pre className="text-xs mt-2 bg-gray-100 p-2 rounded">
                {JSON.stringify(margeData, null, 2)}
              </pre>
            </Card>
          );
        }
        
        const bonnesMarges = margeData.getProduitsParSeuil?.(seuilBonneMarge) || [];
        const mauvaisesMarges = margeData.getProduitsMargeInferieure?.(seuilMauvaiseMarge) || [];
        const margesMoyennes = margeData.getProduitsParSeuil?.(seuilMauvaiseMarge, seuilBonneMarge) || [];
        
        console.log('🎯 Produits filtrés:', { bonnesMarges, mauvaisesMarges, margesMoyennes });
        
        return (
          <div className="space-y-6">
            {/* KPIs de marge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Marge Globale du Laboratoire
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {margeData.pourcentageMargeGlobal?.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">
                    Marge / Chiffre d'affaires
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    Marge: {lab.margeTtc.toLocaleString('fr-FR')}€ | CA: {lab.caTtc.toLocaleString('fr-FR')}€
                  </div>
                </div>
              </Card>

              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Marge Moyenne des Produits
                </h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {margeData.margeMoyenneProduits?.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-600">
                    Moyenne arithmétique des marges
                  </p>
                  <div className="mt-3 text-xs text-gray-500">
                    Calculée sur tous les produits du laboratoire
                  </div>
                </div>
              </Card>
            </div>

            {/* Configuration des seuils */}
            <Card variant="elevated" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                ⚙️ Configuration des seuils de marge
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="number"
                    label="Seuil bonne marge (≥ %)"
                    value={seuilBonneMarge.toString()}
                    onChange={(e) => onSeuilBonneMargeChange?.(Number(e.target.value))}
                    placeholder="30"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Produits avec une marge supérieure ou égale à ce seuil
                  </p>
                </div>
                <div>
                  <Input
                    type="number"
                    label="Seuil mauvaise marge (< %)"
                    value={seuilMauvaiseMarge.toString()}
                    onChange={(e) => onSeuilMauvaiseMargeChange?.(Number(e.target.value))}
                    placeholder="20"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Produits avec une marge inférieure à ce seuil
                  </p>
                </div>
              </div>
            </Card>

            {/* Bonnes marges */}
            {bonnesMarges.length > 0 && (
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🏆 Produits avec bonnes marges (≥ {seuilBonneMarge}%)
                  <span className="text-sm text-gray-500">({bonnesMarges.length} produits)</span>
                </h3>
                <div className="space-y-3">
                  {bonnesMarges.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                          <span>CA: {item.ca}€</span>
                          <span>Achat: {item.prixAchat}€</span>
                          <span>Vente: {item.prixVente}€</span>
                          <span>Ventes/an: {item.ventesAnnuelles}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-green-600">
                          {item.marge.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">marge</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Marges moyennes */}
            {margesMoyennes.length > 0 && (
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  ⚖️ Produits avec marges moyennes ({seuilMauvaiseMarge}% - {seuilBonneMarge}%)
                  <span className="text-sm text-gray-500">({margesMoyennes.length} produits)</span>
                </h3>
                <div className="space-y-3">
                  {margesMoyennes.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                          <span>CA: {item.ca}€</span>
                          <span>Achat: {item.prixAchat}€</span>
                          <span>Vente: {item.prixVente}€</span>
                          <span>Ventes/an: {item.ventesAnnuelles}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-yellow-600">
                          {item.marge.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">marge</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Mauvaises marges */}
            {mauvaisesMarges.length > 0 && (
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  ⚠️ Produits avec mauvaises marges ({seuilMauvaiseMarge}%)
                  <span className="text-sm text-gray-500">({mauvaisesMarges.length} produits)</span>
                </h3>
                <div className="space-y-3">
                  {mauvaisesMarges.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm text-gray-600">
                          <span>CA: {item.ca}€</span>
                          <span>Achat: {item.prixAchat}€</span>
                          <span>Vente: {item.prixVente}€</span>
                          <span>Ventes/an: {item.ventesAnnuelles}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-red-600">
                          {item.marge.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">marge</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Résumé */}
            <Card variant="elevated" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📊 Résumé de la répartition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{bonnesMarges.length}</div>
                  <div className="text-sm text-gray-600">Bonnes marges</div>
                  <div className="text-xs text-gray-500">≥ {seuilBonneMarge}%</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{margesMoyennes.length}</div>
                  <div className="text-sm text-gray-600">Marges moyennes</div>
                  <div className="text-xs text-gray-500">{seuilMauvaiseMarge}% - {seuilBonneMarge}%</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{mauvaisesMarges.length}</div>
                  <div className="text-sm text-gray-600">Mauvaises marges</div>
                  <div className="text-xs text-gray-500">< {seuilMauvaiseMarge}%</div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'stock':
        const stockArray = Array.isArray(tabData) ? tabData : [];
        return (
          <div className="space-y-6">
            <KpiCard
              title="Valeur Stock HT"
              value={lab.stockHt}
              change={5.3}
              changeType="increase"
              icon={CubeIcon}
              loading={loading}
            />
            
            <Card variant="default" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                État des stocks par produit
              </h3>
              <div className="space-y-3">
                {stockArray.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{item.value} unités</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.stock === 'Normal' ? 'bg-green-100 text-green-800' :
                        item.stock === 'Faible' ? 'bg-yellow-100 text-yellow-800' :
                        item.stock === 'Élevé' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

      case 'comparaison':
        const compArray = Array.isArray(tabData) ? tabData : [];
        return (
          <div className="space-y-6">
            <Chart
              type="bar"
              data={compArray}
              title={`Comparaison ${lab.nom} vs Marché`}
              height={350}
              variant="default"
              loading={loading}
            />
          </div>
        );

      case 'analyse':
        const analyseArray = Array.isArray(tabData) ? tabData : [];
        return (
          <div className="space-y-6">
            <Chart
              type="pie"
              data={analyseArray}
              title="Analyse Pareto - Répartition des ventes"
              height={350}
              variant="elevated"
              loading={loading}
            />
          </div>
        );

      case 'perimes':
        const perimesArray = Array.isArray(tabData) ? tabData : [];
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Produits périmés
                </h3>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {perimesArray.find(item => item.name === 'Produits périmés')?.value || 0}
                </div>
                <p className="text-sm text-gray-600">produits à retirer</p>
              </Card>
              
              <Card variant="default" padding="md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Valorisation
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {perimesArray.find(item => item.name === 'Valorisation')?.value || 0}€
                </div>
                <p className="text-sm text-gray-600">perte estimée</p>
              </Card>
            </div>
          </div>
        );

      case 'compensation':
        const compensationArray = Array.isArray(tabData) ? tabData : [];
        return (
          <div className="space-y-6">
            <Card variant="default" padding="md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Détail des compensations
              </h3>
              <div className="space-y-4">
                {compensationArray.slice(0, -1).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-lg font-semibold text-green-600">
                      +{item.value.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-bold text-gray-900">
                      {compensationArray[compensationArray.length - 1]?.name}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      {compensationArray[compensationArray.length - 1]?.value.toLocaleString('fr-FR')}€
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default" padding="md">
                <h4 className="text-md font-semibold text-gray-900 mb-3">
                  Taux de compensation
                </h4>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {((compensationArray[compensationArray.length - 1]?.value || 0) / lab.caTtc * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">du chiffre d'affaires</p>
              </Card>
              
              <Card variant="default" padding="md">
                <h4 className="text-md font-semibold text-gray-900 mb-3">
                  Impact sur marge
                </h4>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  +{((compensationArray[compensationArray.length - 1]?.value || 0) / lab.margeTtc * 100).toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">d'amélioration</p>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <Card variant="default" padding="md">
            <p className="text-gray-500 text-center py-8">
              Contenu en cours de développement
            </p>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderTabContent()}
    </div>
  );
};

export default LabContent;