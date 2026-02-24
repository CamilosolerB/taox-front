export interface StockItem {
  id: string;
  code: string;
  name: string;
  category: string;
  categoryColor: string;
  currentStock: number;
  minStock: number;
  status: {
    label: string;
    backgroundColor: string;
    textColor: string;
    dotColor: string;
  };
}

export const inventoryItems: StockItem[] = [
  {
    id: '1',
    code: 'CHM-2041',
    name: 'Liquid Chlorine 12% (20L)',
    category: 'Chemical',
    categoryColor: 'bg-blue-100 text-blue-700',
    currentStock: 45,
    minStock: 100,
    status: {
      label: 'Critical',
      backgroundColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-700 dark:text-red-400',
      dotColor: 'bg-red-600',
    },
  },
  {
    id: '2',
    code: 'SPR-8821',
    name: 'Replacement O-Ring Kit (Type B)',
    category: 'Spare Part',
    categoryColor: 'bg-purple-100 text-purple-700',
    currentStock: 14,
    minStock: 12,
    status: {
      label: 'Warning',
      backgroundColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      textColor: 'text-yellow-700 dark:text-yellow-400',
      dotColor: 'bg-yellow-600',
    },
  },
  {
    id: '3',
    code: 'CHM-1022',
    name: 'Ferric Chloride Coagulant',
    category: 'Chemical',
    categoryColor: 'bg-blue-100 text-blue-700',
    currentStock: 450,
    minStock: 150,
    status: {
      label: 'Healthy',
      backgroundColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-400',
      dotColor: 'bg-green-600',
    },
  },
  {
    id: '4',
    code: 'SPR-5012',
    name: 'Mechanical Seal - Main Pump',
    category: 'Spare Part',
    categoryColor: 'bg-purple-100 text-purple-700',
    currentStock: 8,
    minStock: 3,
    status: {
      label: 'Healthy',
      backgroundColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-400',
      dotColor: 'bg-green-600',
    },
  },
];

export const categories = ['Químicos', 'Repuestos'];

export interface StockStatus {
  label: string;
  color: string;
}

export const stockStatuses: StockStatus[] = [
  { label: 'Crítico (< Mín)', color: 'red' },
  { label: 'Advertencia (Bajo)', color: 'yellow' },
  { label: 'En Stock', color: 'green' },
];

export const locations = [
  'Todos los Almacenes',
  'Almacenamiento Principal A',
  'Búnker Químico 1',
  'Depósito de Repuestos B',
];

export const inventoryTabs = [
  { id: 'all', label: 'Todos los Artículos' },
  { id: 'critical', label: 'Stock Crítico', badge: 12 },
  { id: 'recent', label: 'Pedidos Recientes' },
];
