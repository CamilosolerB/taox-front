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
  } = useLocations();

  // Obtener lista de ubicaciones
  const { data: locationsData, isLoading } = useGetLocations(1, 10);

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
        nombre: "Bodega Nueva",
        capacidad: 1000,
        capacidad_usada: 500,
        descripcion: "Nueva bodega para almacenamiento",
      },
      {
        onSuccess: () => {
          console.log("Ubicación creada exitosamente");
        },
      }
    );
  };

  // Ejemplo: Actualizar una ubicación
  const handleUpdateLocation = (id: string) => {
    updateLocation(
      {
        id,
        location: {
          capacidad_usada: 650,
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
  const handleDeleteLocation = (id: string) => {
    deleteLocation(id, {
      onSuccess: () => {
        console.log("Ubicación eliminada");
      },
    });
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
        {locationsData?.data.map((location) => (
          <div key={location.id} className="border p-4 rounded">
            <h3 className="font-bold">{location.nombre}</h3>
            <p>Capacidad: {location.capacidad_usada} / {location.capacidad}</p>
            <p className="text-sm text-gray-600">{location.descripcion}</p>

            <div className="mt-2 gap-2 flex">
              <button
                onClick={() => handleUpdateLocation(location.id)}
                disabled={isUpdating}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                {isUpdating ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                onClick={() => handleDeleteLocation(location.id)}
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
