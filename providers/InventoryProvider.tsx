"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useInventory } from "@/hooks/useInventory";
import { useStock } from "@/hooks/useStock";
import { mergeProductsWithStock } from "@/lib/mapProductToStockItem";
import type { StockItem } from "@/data/inventoryData";
import type { CreateProductDTO, UpdateProductDTO } from "@/api/types";

interface InventoryState {
  /** Productos mapeados a StockItem (productos + stock almacén). */
  items: StockItem[];
  isLoading: boolean;
  isStockLoading: boolean;
  error: Error | null;
  refetch: () => void;
  createProduct: (body: CreateProductDTO) => Promise<unknown>;
  updateProduct: (productId: string, body: UpdateProductDTO) => Promise<unknown>;
  deleteProduct: (productId: string) => Promise<unknown>;
  companyId: string | null;
}

const InventoryContext = createContext<InventoryState | null>(null);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const { companyId } = useAuth();
  const inventory = useInventory(companyId);
  const stock = useStock(companyId);

  const getProducts = inventory.useGetProducts();
  const getStockWarehouse = stock.useGetStockWarehouse();
  const createProductMutation = inventory.useCreateProduct();
  const updateProductMutation = inventory.useUpdateProduct();
  const deleteProductMutation = inventory.useDeleteProduct();

  const items: StockItem[] = useMemo(() => {
    const products = getProducts.data ?? [];
    const warehouse = getStockWarehouse.data ?? [];
    return mergeProductsWithStock(products, warehouse);
  }, [getProducts.data, getStockWarehouse.data]);

  const isLoading = getProducts.isLoading;
  const isStockLoading = getStockWarehouse.isLoading;
  const error = (getProducts.error as Error) ?? (getStockWarehouse.error as Error) ?? null;

  const refetch = useCallback(() => {
    getProducts.refetch();
    getStockWarehouse.refetch();
  }, [getProducts, getStockWarehouse]);

  const createProduct = useCallback(
    (body: CreateProductDTO) => createProductMutation.mutateAsync(body),
    [createProductMutation]
  );

  const updateProduct = useCallback(
    (productId: string, body: UpdateProductDTO) =>
      updateProductMutation.mutateAsync({ productId, body }),
    [updateProductMutation]
  );

  const deleteProduct = useCallback(
    (productId: string) => deleteProductMutation.mutateAsync(productId),
    [deleteProductMutation]
  );

  const value: InventoryState = useMemo(
    () => ({
      items,
      isLoading,
      isStockLoading,
      error,
      refetch,
      createProduct,
      updateProduct,
      deleteProduct,
      companyId,
    }),
    [
      items,
      isLoading,
      isStockLoading,
      error,
      refetch,
      createProduct,
      updateProduct,
      deleteProduct,
      companyId,
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryStore(): InventoryState {
  const ctx = useContext(InventoryContext);
  if (!ctx) {
    throw new Error("useInventoryStore must be used within InventoryProvider");
  }
  return ctx;
}
