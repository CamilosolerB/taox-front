import type { ProductDTO } from "@/api/types";
import type { StockItem } from "@/data/inventoryData";

const CATEGORY_COLORS: Record<string, string> = {
  Chemical: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Químicos: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Repuestos: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  default: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
};

const STATUS_CONFIG = {
  critical: {
    label: "Crítico",
    backgroundColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-600",
  },
  warning: {
    label: "Bajo",
    backgroundColor: "bg-yellow-100 dark:bg-yellow-900/30",
    textColor: "text-yellow-700 dark:text-yellow-400",
    dotColor: "bg-yellow-600",
  },
  healthy: {
    label: "OK",
    backgroundColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-700 dark:text-green-400",
    dotColor: "bg-green-600",
  },
};

function getStatus(currentStock: number, minStock: number) {
  if (currentStock <= 0) return STATUS_CONFIG.critical;
  if (minStock > 0 && currentStock <= minStock) return STATUS_CONFIG.critical;
  if (minStock > 0 && currentStock < minStock * 2) return STATUS_CONFIG.warning;
  return STATUS_CONFIG.healthy;
}

/**
 * Convierte Product + stock info a StockItem para la tabla de inventario.
 */
export function mapProductToStockItem(
  product: {
    id: string;
    name: string;
    generic_name?: string;
    category?: string;
    limite_critico?: number;
    warehouse_id?: string;
    fds?: string;
    fds_url?: string;
  },
  currentStock: number,
  minStock: number = 0
): StockItem {
  const category = product.generic_name || product.category || "Producto";
  const categoryColor = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
  const criticalStock = product.limite_critico ?? minStock;
  const status = getStatus(currentStock, criticalStock);

  return {
    id: product.id,
    code: product.id,
    name: product.name,
    category,
    categoryColor,
    currentStock,
    minStock: criticalStock,
    status,
    warehouse_id: product.warehouse_id,
    fds: product.fds,
    fds_url: product.fds_url,
  };
}

/**
 * Merge lista de productos con stock de almacén.
 */
export function mergeProductsWithStock(
  products: {
    id_product: string;
    name: string;
    generic_name?: string;
    category?: string;
    limite_critico?: number;
    warehouse_id?: string;
    fds?: string;
    fds_url?: string;
  }[],
  stockWarehouse: { codigo_producto: string; cantidad: number }[]
): StockItem[] {
  const stockByCode = new Map(
    stockWarehouse.map((s) => [s.codigo_producto, s.cantidad])
  );
  return products.map((p) => {
    const qty = stockByCode.get(p.id_product) ?? 0;
    return mapProductToStockItem({ ...p, id: p.id_product }, qty, p.limite_critico);
  });
}

/**
 * Get stock status label for display.
 */
export function getStockStatusLabel(currentStock: number, minStock: number): string {
  if (currentStock <= 0) return "Agotado";
  if (minStock > 0 && currentStock <= minStock) return "Crítico";
  if (minStock > 0 && currentStock < minStock * 2) return "Bajo";
  return "OK";
}

/**
 * Check if stock is critical.
 */
export function isCriticalStock(currentStock: number, minStock: number): boolean {
  return currentStock <= (minStock || 0);
}