'use client';

import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/adminInventory/utils';
import {
  UsersNavHeader,
  UsersTableHeader,
  UsersStatsGrid,
  UsersTable,
  UsersPagination,
} from '@/components/adminInventory/users';
import type { UserItem } from '@/data/usersData';
import { useAuth } from '@/hooks';
import { useUsers, useRoles } from '@/hooks';
import { Users, TrendingUp, Lock, Wrench, Layers } from 'lucide-react';

const PAGE_SIZE = 4;
const ROLE_BADGE_CLASS: Record<string, string> = {
  default: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

function mapApiUserToItem(
  u: { id_user: string; username: string; email: string; is_active: boolean; role_id: string },
  roleName?: string
): UserItem {
  const initials = u.username.slice(0, 2).toUpperCase();
  return {
    id: u.id_user,
    initials,
    name: u.username,
    email: u.email,
    role: roleName ?? u.role_id,
    roleBadgeClass: ROLE_BADGE_CLASS.cyan,
    status: u.is_active ? 'Active' : 'Inactive',
    lastLogin: '—',
  };
}

const CompanyUsersPage = () => {
  const { user: authUser } = useAuth();
  const { useGetUsers, useDeleteUser } = useUsers();
  const { useGetRoles } = useRoles();
  const getUsers = useGetUsers();
  const getRoles = useGetRoles();
  const deleteUser = useDeleteUser();

  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const roleMap = useMemo(() => {
    const map: Record<string, string> = {};
    (getRoles.data ?? []).forEach((r) => {
      map[r.id_role] = r.name;
    });
    return map;
  }, [getRoles.data]);

  const usersList: UserItem[] = useMemo(() => {
    if (!getUsers.data) return [];
    return getUsers.data.map((u) => mapApiUserToItem(u, roleMap[u.role_id]));
  }, [getUsers.data, roleMap]);

  const totalItems = usersList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const showingCount = usersList.length;

  const handleCreateUser = () => {
    // TODO: abrir modal/form de crear usuario (CreateUserDTO)
  };

  const handleEditUser = (id: string) => {
    // TODO: abrir modal/form de editar usuario (UpdateUserDTO)
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    try {
      await deleteUser.mutateAsync(id);
    } catch (e) {
      console.error(e);
    }
  };

  const stats = [
    {
      label: 'Total de Usuarios',
      value: '124',
      description: (
        <span className="text-green-500 flex items-center">
          <TrendingUp className="text-xs mr-1 w-4 h-4" />
          +5 nuevos este mes
        </span>
      ),
      icon: <Users className="text-primary w-5 h-5" />,
    },
    {
      label: 'Administradores Activos',
      value: '12',
      description: 'Acceso limitado',
      icon: <Lock className="text-amber-500 w-5 h-5" />,
    },
    {
      label: 'Operadores',
      value: '102',
      description: 'Personal de campo',
      icon: <Wrench className="text-cyan-500 w-5 h-5" />,
    },
    {
      label: 'Roles del Sistema',
      value: '3',
      description: 'Jerárquico',
      icon: <Layers className="text-purple-500 w-5 h-5" />,
    },
  ];

  return (
    <Sidebar>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <UsersNavHeader
          title="Gestión de Usuarios y Roles"
          searchPlaceholder="Buscar usuarios..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          userInitials="JD"
        />
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <UsersStatsGrid stats={stats} />

          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <UsersTableHeader
              title="Directorio de Usuarios"
              description="Administra los miembros del equipo de tratamiento de agua y permisos."
              onCreateUser={handleCreateUser}
            />
            <UsersTable
              users={usersList}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
            <UsersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              showingCount={showingCount}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default CompanyUsersPage;
