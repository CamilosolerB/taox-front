'use client';

import { useMovements } from "@/hooks";

/**
 * EJEMPLO DE USO - useMovements
 * 
 * Este componente muestra cómo usar el hook useMovements para:
 * - Obtener movimientos por producto
 * - Crear un movimiento
 */

export default function MovementsExample() {
  const {
    useGetMovementsByProduct,
    useCreateMovement,
  } = useMovements("company-id-placeholder");

  // Obtener movimientos por producto (como ejemplo)
  const { data: movementsByProductData, isLoading } = useGetMovementsByProduct("PROD001");

  // Mutation para crear
  const { mutate: createMovement, isPending: isCreating } = useCreateMovement();

  // Ejemplo: Crear un movimiento con propiedades correctas
  const handleCreateMovement = () => {
    createMovement(
      {
        codigo_producto: "A00000001",
        id_proceso_origen: 1,
        id_proceso_destino: 2,
        cantidad: 10,
        notas: "Movimiento de prueba",
        id_empresa: "company-id-placeholder",
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
        {movementsByProductData?.map((movement: any) => (
          <div key={movement.id_movimiento} className="border p-4 rounded">
            <p>
              <strong>Producto:</strong> {movement.codigo_producto}
            </p>
            <p>
              <strong>Cantidad:</strong> {movement.cantidad}
            </p>
            {movement.notas && (
              <p>
                <strong>Notas:</strong> {movement.notas}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
