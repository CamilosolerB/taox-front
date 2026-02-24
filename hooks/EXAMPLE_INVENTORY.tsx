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
    useInventory();

  // Obtener lista de productos
  const { data: productsData, isLoading, error } = useGetProducts(1, 10);

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
        nombre: "Nuevo Producto",
        nombre_generico: "Genérico",
        total_inventario: 100,
        ubicacion: "Bodega A",
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
  const handleUpdate = (codigo: string) => {
    updateProduct(
      {
        codigo,
        product: {
          total_inventario: 150,
          ubicacion: "Bodega B",
        },
      },
      {
        onSuccess: () => {
          console.log("Producto actualizado");
        },
      }
    );
  };

  // Ejemplo: Eliminar un producto
  const handleDelete = (codigo: string) => {
    deleteProduct(codigo, {
      onSuccess: () => {
        console.log("Producto eliminado");
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
        {productsData?.data.map((product) => (
          <div key={product.codigo_producto} className="border p-4 rounded">
            <h3 className="font-bold">{product.nombre}</h3>
            <p>Stock: {product.total_inventario}</p>
            <p>Ubicación: {product.ubicacion}</p>

            <div className="mt-2 gap-2 flex">
              <button
                onClick={() => handleUpdate(product.codigo_producto)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                {isUpdating ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                onClick={() => handleDelete(product.codigo_producto)}
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
