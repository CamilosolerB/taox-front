'use client';

import { useInventory } from "@/hooks";

/**
 * EJEMPLO DE USO - useInventory
 * 
 * Este componente muestra cómo usar el hook useInventory para:
 * - Obtener lista de productos
 * - Crear un producto
 * - Actualizar un producto
 * - Eliminar un producto
 */

export default function InventoryExample() {
  const { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } =
    useInventory("company-id-placeholder");

  // Obtener lista de productos
  const { data: productsData, isLoading, error } = useGetProducts();

  // Mutation para crear
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();

  // Mutation para actualizar
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  // Mutation para eliminar
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  // Ejemplo: Crear un producto
  const handleCreate = () => {
    createProduct(
      {
        id_product: "PROD-001",
        name: "Nuevo Producto",
        generic_name: "Genérico",
        price: 100,
        unit_measure: "L",
        unit_price: 10,
        min_unit_price: 5,
        lead_time_days: 3,
        restorage: "Standard",
        company_id: "company-id-placeholder",
      },
      {
        onSuccess: () => {
          console.log("Producto creado exitosamente");
        },
        onError: (error) => {
          console.error("Error al crear:", error);
        },
      }
    );
  };

  // Ejemplo: Actualizar un producto
  const handleUpdate = (productId: string) => {
    updateProduct(
      {
        productId,
        body: {
          name: "Producto Actualizado",
          generic_name: "Genérico Actualizado",
          price: 150,
          unit_measure: "L",
          unit_price: 15,
          min_unit_price: 7,
          lead_time_days: 5,
          restorage: "Standard",
        },
      },
      {
        onSuccess: () => {
          console.log("Producto actualizado exitosamente");
        },
        onError: (error) => {
          console.error("Error al actualizar:", error);
        },
      }
    );
  };

  // Ejemplo: Eliminar un producto
  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        console.log("Producto eliminado");
      },
      onError: (error) => {
        console.error("Error al eliminar:", error);
      },
    });
  };

  if (isLoading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Control de Inventario</h1>

      {/* Botón para crear */}
      <button
        onClick={handleCreate}
        disabled={isCreating}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isCreating ? "Creando..." : "Crear Producto"}
      </button>

      {/* Lista de productos */}
      <div className="grid gap-4">
        {productsData?.map((product) => (
          <div key={product.id_product} className="border p-4 rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>Precio: ${product.price}</p>
            <p>Unidad: {product.unit_measure}</p>

            <div className="mt-2 gap-2 flex">
              <button
                onClick={() => handleUpdate(product.id_product)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                {isUpdating ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                onClick={() => handleDelete(product.id_product)}
                disabled={isDeleting}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
