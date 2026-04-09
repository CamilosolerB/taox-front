"use client";

import { useState } from "react";
import { Product } from "@/interfaces/product";
import { ActionMenu } from "./ActionMenu";
import { DeleteConfirmationAlert } from "./DeleteConfirmationAlert";
import { EditProductModal } from "../../modals/EditProductModal";
import { useInventory } from "@/hooks";

interface ProductsTableProps {
  products: Product[];
  companyId?: string;
}

export const ProductsTable = ({
  products,
  companyId = "b27ce798-2a16-47fa-89c4-0b7f8e46cda0",
}: ProductsTableProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { useDeleteProduct } = useInventory(companyId);
  const deleteMutation = useDeleteProduct();

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;

    try {
      await deleteMutation.mutateAsync(selectedProduct.id_product);
      setIsDeleteAlertOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <th className="px-6 py-4">ID Producto</th>
            <th className="px-6 py-4">Nombre</th>
            <th className="px-6 py-4">Nombre genérico</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4">Unidad de Medida</th>
            <th className="px-6 py-4">Precio Unitario</th>
            <th className="px-6 py-4">Lead Time (días)</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                No hay productos disponibles
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                key={product.id_product}
              >
                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400 uppercase">
                  {product.id_product}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500">
                    {product.generic_name}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {product.unit_measure}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  ${product.unit_price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {product.lead_time_days} días
                </td>
                <td className="px-6 py-4 text-right">
                  <ActionMenu
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDeleteClick(product)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Modal de edición */}
    <EditProductModal
      isOpen={isEditModalOpen}
      onClose={() => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
      }}
      product={selectedProduct}
      companyId={companyId}
    />

    {/* Alerta de confirmación de eliminación */}
    <DeleteConfirmationAlert
      isOpen={isDeleteAlertOpen}
      productName={selectedProduct?.name || ""}
      onConfirm={handleDeleteConfirm}
      onCancel={() => {
        setIsDeleteAlertOpen(false);
        setSelectedProduct(null);
      }}
      isLoading={deleteMutation.isPending}
    />
  </>
  );
};
