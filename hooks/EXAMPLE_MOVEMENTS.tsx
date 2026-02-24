'use client';

import { useMovements } from "@/hooks";

/**
 * EJEMPLO DE USO - useMovements
 * 
 * Este componente muestra cómo usar el hook useMovements para:
 * - Obtener lista de movimientos
 * - Obtener movimientos por producto
 * - Crear un movimiento
 * - Actualizar un movimiento
 * - Eliminar un movimiento
 */

export default function MovementsExample() {
  const {
    useGetMovements,
    useGetMovementsByProduct,
    useCreateMovement,
    useUpdateMovement,
    useDeleteMovement,
  } = useMovements();

  // Obtener lista de movimientos
  const { data: movementsData, isLoading } = useGetMovements(1, 10);

  // Mutation para crear
  const { mutate: createMovement, isPending: isCreating } = useCreateMovement();

  // Mutation para actualizar
  const { mutate: updateMovement, isPending: isUpdating } = useUpdateMovement();

  // Mutation para eliminar
  const { mutate: deleteMovement, isPending: isDeleting } = useDeleteMovement();

  // Ejemplo: Crear un movimiento
  const handleCreateMovement = () => {
    createMovement(
      {
        codigo_producto: "A00000001",
        tipo: "salida",
        cantidad: 10,
        ubicacion_origen: "Bodega A",
        ubicacion_destino: "Planta",
        fecha: new Date().toISOString(),
        descripcion: "Movimiento de prueba",
        usuario: "admin",
      },
      {
        onSuccess: () => {
          console.log("Movimiento creado exitosamente");
        },
      }
    );
  };

  if (isLoading) return <div>Cargando movimientos...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Control de Movimientos</h1>

      <button
        onClick={handleCreateMovement}
        disabled={isCreating}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isCreating ? "Creando..." : "Registrar Movimiento"}
      </button>

      <div className="space-y-4">
        {movementsData?.data.map((movement) => (
          <div key={movement.id} className="border p-4 rounded">
            <p>
              <strong>Producto:</strong> {movement.codigo_producto}
            </p>
            <p>
              <strong>Tipo:</strong> {movement.tipo}
            </p>
            <p>
              <strong>Cantidad:</strong> {movement.cantidad}
            </p>
            <p>
              <strong>De:</strong> {movement.ubicacion_origen} <strong>A:</strong>{" "}
              {movement.ubicacion_destino}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
