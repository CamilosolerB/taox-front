/** Entidad (proveedor o cliente) para la UI del directorio. */
export interface ProviderItem {
  id: string;
  initials: string;
  name: string;
  nit: string;
  status: 'ACTIVE' | 'INACTIVE';
  role: 'Supplier' | 'Client';
  city: string;
  phone: string;
  email: string;
  activeContracts: string;
  lastOrder: string;
  activeContractsMuted?: boolean;
  /** Clases para el avatar (ej. bg-primary/10 text-primary, bg-gray-100 text-gray-500) */
  avatarClass?: string;
}

export const providersList: ProviderItem[] = [
  {
    id: '1',
    initials: 'HS',
    name: 'HydroSolutions Inc.',
    avatarClass: 'bg-primary/10 text-primary',
    nit: '901.234.567-8',
    status: 'ACTIVE',
    role: 'Supplier',
    city: 'Austin, TX',
    phone: '+1 (512) 555-0123',
    email: 'sales@hydrosolutions.com',
    activeContracts: '5 Activo',
    lastOrder: 'Oct 12, 2023',
  },
  {
    id: '2',
    initials: 'AW',
    name: 'AquaWorks Equipment',
    avatarClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    nit: '800.112.990-1',
    status: 'ACTIVE',
    role: 'Supplier',
    city: 'Houston, TX',
    phone: '+1 (713) 444-2390',
    email: 'support@aquaworks.co',
    activeContracts: '2 Active',
    lastOrder: 'Sep 28, 2023',
  },
  {
    id: '3',
    initials: 'TC',
    name: 'Texas Chem Logistics',
    avatarClass: 'bg-gray-100 dark:bg-gray-800 text-gray-500',
    nit: '770.456.123-K',
    status: 'INACTIVE',
    role: 'Supplier',
    city: 'Dallas, TX',
    phone: '+1 (214) 777-8899',
    email: 'logistics@txchem.io',
    activeContracts: '0 Active',
    lastOrder: 'Aug 05, 2022',
    activeContractsMuted: true,
  },
  {
    id: '4',
    initials: 'PF',
    name: 'PureFlow Maintenance',
    avatarClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    nit: '900.555.332-1',
    status: 'ACTIVE',
    role: 'Client',
    city: 'San Antonio, TX',
    phone: '+1 (210) 333-2211',
    email: 'pureflow@maintenance.com',
    activeContracts: '8 Active',
    lastOrder: 'Oct 15, 2023',
  },
];

export const providerTabs = [
  { id: 'providers', label: 'Proveedores', count: 24, icon: 'truck' as const },
  { id: 'clients', label: 'Clientes', count: 156, icon: 'user' as const },
];

export const cityOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'austin', label: 'Austin, TX' },
  { value: 'houston', label: 'Houston, TX' },
  { value: 'dallas', label: 'Dallas, TX' },
  { value: 'san-antonio', label: 'San Antonio, TX' },
];

export const statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'all', label: 'Todos' },
];
