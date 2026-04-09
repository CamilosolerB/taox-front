import type { ProviderDTO } from "@/api/types";
import type { ProviderItem } from "@/data/providersData";

const AVATAR_CLASSES = [
  "bg-primary/10 text-primary",
  "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  "bg-gray-100 dark:bg-gray-800 text-gray-500",
  "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Convierte ProviderDTO a ProviderItem para la UI del directorio de proveedores.
 * Campos no presentes en la API (nit, activeContracts, lastOrder, city) se rellenan con placeholders.
 */
export function mapProviderToItem(dto: ProviderDTO, index: number): ProviderItem {
  const avatarClass = AVATAR_CLASSES[index % AVATAR_CLASSES.length];
  return {
    id: dto.cad_proveedor,
    initials: getInitials(dto.nombre),
    name: dto.nombre,
    nit: dto.cad_proveedor,
    status: dto.is_active ? "ACTIVE" : "INACTIVE",
    role: "Supplier",
    city: dto.direccion || "—",
    phone: dto.telefono,
    email: dto.correo,
    activeContracts: "—",
    lastOrder: "—",
    activeContractsMuted: !dto.is_active,
    avatarClass,
  };
}
