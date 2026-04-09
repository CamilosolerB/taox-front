'use client';

import { useLocations } from "@/hooks";

/**
 * EJEMPLO DE USO - useLocations
 * 
 * Este componente muestra cómo usar el hook useLocations para:
 * - Obtener lista de ubicaciones
 * - Obtener una ubicación específica
 * - Crear una ubicación
 * - Actualizar una ubicación
 * - Eliminar una ubicación
 */

export default function LocationsExample() {
  const {
    useGetLocations,
    useGetLocation,
    useCreateLocation,
    useUpdateLocation,
    useDeleteLocation,
  } = useLocations("company-id-placeholder");

  // Obtener lista de ubicaciones
  const { data: locationsData, isLoading } = useGetLocations();

  // Mutation para crear
  const { mutate: createLocation, isPending: isCreating } =
    useCreateLocation();

  // Mutation para actualizar
  const { mutate: updateLocation, isPending: isUpdating } =
    useUpdateLocation();

  // Mutation para eliminar
  const { mutate: deleteLocation, isPending: isDeleting } =
    useDeleteLocation();

  // Ejemplo: Crear una ubicación
  const handleCreateLocation = () => {
    createLocation(
      {
        ubicacion: "Bodega Nueva",
        posicion: "A1",
        nivel: "1",
        tipo_ubicacion: "almacen",
        localizador: "BDG-001",
        company_id: "company-id-placeholder",
      },
      {
        onSuccess: () => {
          console.log("Ubicación creada exitosamente");
        },
      }
    );
  };

  // Ejemplo: Actualizar una ubicación
  const handleUpdateLocation = (id: number) => {
    updateLocation(
      {
        locationId: id,
        body: {
          ubicacion: "Bodega Actualizada",
          posicion: "A2",
        },
      },
      {
        onSuccess: () => {
          console.log("Ubicación actualizada");
        },
      }
    );
  };

  // Ejemplo: Eliminar una ubicación
  const handleDeleteLocation = (id: number) => {
    deleteLocation(
      {
        locationId: id,
        companyId: "company-id-placeholder",
      },
      {
        onSuccess: () => {
          console.log("Ubicación eliminada");
        },
      }
    );
  };

  if (isLoading) return <div>Cargando ubicaciones...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Control de Ubicaciones</h1>

      <button
        onClick={handleCreateLocation}
        disabled={isCreating}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isCreating ? "Creando..." : "Crear Ubicación"}
      </button>

      <div className="grid gap-4">
        {locationsData?.map((location) => (
          <div key={location.id_ubicacion} className="border p-4 rounded">
            <h3 className="font-bold">{location.ubicacion}</h3>
            <p>Posición: {location.posicion} | Nivel: {location.nivel}</p>
            <p className="text-sm text-gray-600">Tipo: {location.tipo_ubicacion} | Localizador: {location.localizador}</p>

            <div className="mt-2 gap-2 flex">
              <button
                onClick={() => handleUpdateLocation(location.id_ubicacion)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                {isUpdating ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                onClick={() => handleDeleteLocation(location.id_ubicacion)}
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
