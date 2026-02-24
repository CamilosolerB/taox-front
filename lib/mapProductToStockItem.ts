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
    label: "Critical",
    backgroundColor: "bg-red-100 dark:bg-red-900/30",
    textColor: "text-red-700 dark:text-red-400",
    dotColor: "bg-red-600",
  },
  warning: {
    label: "Warning",
    backgroundColor: "bg-yellow-100 dark:bg-yellow-900/30",
    textColor: "text-yellow-700 dark:text-yellow-400",
    dotColor: "bg-yellow-600",
  },
  healthy: {
    label: "Healthy",
    backgroundColor: "bg-green-100 dark:bg-green-900/30",
    textColor: "text-green-700 dark:text-green-400",
    dotColor: "bg-green-600",
  },
};

function getStatus(currentStock: number, minStock: number) {
  if (currentStock <= 0) return STATUS_CONFIG.critical;
  if (minStock > 0 && currentStock < minStock) return STATUS_CONFIG.warning;
  return STATUS_CONFIG.healthy;
}

/**
 * Convierte ProductDTO + cantidad de stock a StockItem para la tabla de inventario.
 * minStock: la API no expone "stock mínimo"; se usa 0 o un valor por defecto.
 */
export function mapProductToStockItem(
  product: ProductDTO,
  currentStock: number,
  minStock: number = 0
): StockItem {
  const category = product.generic_name || "Product";
  const categoryColor = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
  const status = getStatus(currentStock, minStock);

  return {
    id: product.id_product,
    code: product.id_product,
    name: product.name,
    category,
    categoryColor,
    currentStock,
    minStock,
    status,
  };
}

/**
 * Merge de lista de productos con stock de almacén (por codigo_producto).
 */
export function mergeProductsWithStock(
  products: ProductDTO[],
  stockWarehouse: { codigo_producto: string; cantidad: number }[]
): StockItem[] {
  const stockByCode = new Map(
    stockWarehouse.map((s) => [s.codigo_producto, s.cantidad])
  );
  return products.map((p) => {
    const qty = stockByCode.get(p.id_product) ?? 0;
    return mapProductToStockItem(p, qty, 0);
  });
}
