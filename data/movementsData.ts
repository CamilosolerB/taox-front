/** Tipo para una fila del historial de movimientos (UI). */
export interface MovementItem {
  id: string;
  date: string;
  time: string;
  productName: string;
  productSku: string;
  productIcon: 'beaker' | 'sliders' | 'zap';
  type: 'ENTRY' | 'EXIT';
  quantity: string;
  userInitials: string;
  userName: string;
  userColor?: string;
}

export const movementsList: MovementItem[] = [
  {
    id: '1',
    date: 'Oct 24, 2023',
    time: '09:14 AM',
    productName: 'Liquid Chlorine 12%',
    productSku: 'CHL-12-001',
    productIcon: 'beaker',
    type: 'ENTRY',
    quantity: '+500 L',
    userInitials: 'JD',
    userName: 'John Doe',
  },
  {
    id: '2',
    date: 'Oct 23, 2023',
    time: '02:45 PM',
    productName: 'Carbon Filter Cartridge',
    productSku: 'FIL-C-10',
    productIcon: 'sliders',
    type: 'EXIT',
    quantity: '-24 Units',
    userInitials: 'AS',
    userName: 'Alice Smith',
    userColor: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    id: '3',
    date: 'Oct 22, 2023',
    time: '11:20 AM',
    productName: 'Dosing Pump Motor',
    productSku: 'PMP-M-500',
    productIcon: 'zap',
    type: 'ENTRY',
    quantity: '+2 Units',
    userInitials: 'JD',
    userName: 'John Doe',
  },
  {
    id: '4',
    date: 'Oct 20, 2023',
    time: '04:05 PM',
    productName: 'Polyamide Membrane',
    productSku: 'MEM-RO-40',
    productIcon: 'beaker',
    type: 'EXIT',
    quantity: '-5 Units',
    userInitials: 'RM',
    userName: 'Robert Mike',
    userColor: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
];

export const dateRangeOptions = [
  { value: 'last30', label: 'Últimos 30 Días' },
  { value: 'thisMonth', label: 'Este Mes' },
  { value: 'lastQuarter', label: 'Último Trimestre' },
  { value: 'custom', label: 'Rango Personalizado' },
];

export const movementTypeOptions = [
  { value: 'all', label: 'Todos los Movimientos' },
  { value: 'entry', label: 'Entrada de Stock (Entrada)' },
  { value: 'exit', label: 'Salida de Stock (Salida)' },
];

export const categoryOptions = [
  { value: 'all', label: 'Todas las Categorías' },
  { value: 'chemicals', label: 'Químicos' },
  { value: 'filters', label: 'Filtros' },
  { value: 'pumps', label: 'Bombas' },
];
