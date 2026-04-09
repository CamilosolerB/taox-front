/** Usuario para la UI del directorio. */
export interface UserItem {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  roleBadgeClass: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export const usersList: UserItem[] = [
  {
    id: '1',
    initials: 'AM',
    name: 'Alejandro Morales',
    email: 'alejandro.m@taox.com',
    role: 'Company Admin',
    roleBadgeClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    status: 'Active',
    lastLogin: '2 hours ago',
  },
  {
    id: '2',
    initials: 'SR',
    name: 'Sofia Rodriguez',
    email: 's.rodriguez@plant-a.com',
    role: 'Operator',
    roleBadgeClass: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    status: 'Active',
    lastLogin: '12 mins ago',
  },
  {
    id: '3',
    initials: 'CL',
    name: 'Carlos Lopez',
    email: 'c.lopez@taox.com',
    role: 'Super Admin',
    roleBadgeClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    status: 'Inactive',
    lastLogin: '5 days ago',
  },
  {
    id: '4',
    initials: 'VG',
    name: 'Valeria Garcia',
    email: 'v.garcia@waterex.net',
    role: 'Operator',
    roleBadgeClass: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    status: 'Active',
    lastLogin: 'Yesterday',
  },
];
