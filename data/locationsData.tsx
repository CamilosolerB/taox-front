import { PieChart, Layers, AlertTriangle } from 'lucide-react';
import type { LocationItem } from '@/components/adminInventory/locations';
import type { Tank } from '@/components/adminInventory/locations';

export const breadcrumbItems = [
  { label: 'Main Plant', href: '#' },
  { label: 'Almacén A', href: '#' },
  { label: 'Zona Química' },
];

export const locationPageData = {
  title: 'Distribución del Almacén Químico',
  description:
    'Niveles de stock detallados y colocación de inventario para <span className="font-bold text-primary">Almacén A</span>.',
};

export const capacityData = {
  usage: 78.4,
  available: 12,
  icon: <PieChart className="text-primary w-5 h-5" />,
};

export const skusData = {
  total: 42,
  subLocations: 8,
  icon: <Layers className="text-primary w-5 h-5" />,
};

export const alertsData = {
  count: 5,
  icon: <AlertTriangle className="text-red-500 w-5 h-5" />,
};

export const locationItems: LocationItem[] = [
  {
    id: '1',
    productName: 'Sodium Hypochlorite (15%)',
    sku: 'CHM-HYPO-001',
    location: 'Estante A1 - Ácidos',
    batchNumber: 'BT-2023-X99',
    quantity: '450 Liters',
    percentage: 80,
    status: 'Optimo',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: '2',
    productName: 'Aluminum Sulfate',
    sku: 'COA-ALUM-442',
    location: 'Estante A2 - Bases',
    batchNumber: 'BT-2024-A12',
    quantity: '12 bags',
    percentage: 15,
    status: 'Crítico',
    statusColor: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    rowClassName: 'bg-red-50/20 dark:bg-red-900/10',
  },
  {
    id: '3',
    productName: 'Polymer Flocculant',
    sku: 'FLOC-POLY-900',
    location: 'Estante B4 - Líquidos',
    batchNumber: 'BT-2023-Z01',
    quantity: '80 Liters',
    percentage: 55,
    status: 'Estable',
    statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    id: '4',
    productName: 'Carbon Activated Filter Media',
    sku: 'MED-CARB-01',
    location: 'Zona de Almacenamiento a Granel',
    batchNumber: 'BT-2024-C88',
    quantity: '1,200 kg',
    percentage: 95,
    status: 'Lleno',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
];

export const tanks: Tank[] = [
  {
    id: 'T-001',
    percentage: 65,
    name: 'Tanque T-001',
    description: 'Almacenamiento de Polímero',
  },
  {
    id: 'T-002',
    percentage: 12,
    name: 'Tanque T-002',
    description: 'Acido Sulfúrico',
  },
];

export const auditInfo = 'Auditoria: Oct 24, 2023 por Operador J. Doe';
