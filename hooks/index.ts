"use client";

import { useInventory } from "./useInventory";
import { useLocations } from "./useLocations";
import { useMovements } from "./useMovements";
import { useProviders } from "./useProviders";
import { useClients } from "./useClients";
import { useStock } from "./useStock";

export { useAuthHook } from "./useAuth";
export { useInventory } from "./useInventory";
export { useLocations } from "./useLocations";
export { useMovements } from "./useMovements";
export { useUsers } from "./useUsers";
export { useProviders } from "./useProviders";
export { useRoles } from "./useRoles";
export { useClients } from "./useClients";
export { useStock } from "./useStock";

export { useAuth } from "@/providers/AuthProvider";
export { useInventoryStore } from "@/providers/InventoryProvider";

/** Hook combinado: pasar companyId (ej. useAuth().companyId). */
export function useCrud(companyId: string | null) {
  const inventory = useInventory(companyId);
  const locations = useLocations(companyId);
  const movements = useMovements(companyId);
  const providers = useProviders(companyId);
  const clients = useClients(companyId);
  const stock = useStock(companyId);
  return {
    inventory,
    locations,
    movements,
    providers,
    clients,
    stock,
  };
}
