# Custom Hooks CRUD - Documentación

Este documento describe los custom hooks CRUD creados para manejar las operaciones de productos, movimientos y ubicaciones mediante axios y React Query.

## Estructura

```
hooks/
├── useInventory.ts        # Hook para gestionar inventario/productos
├── useMovements.ts        # Hook para gestionar movimientos de stock
├── useLocations.ts        # Hook para gestionar ubicaciones
├── index.ts              # Exportaciones y hook combinado
├── EXAMPLE_INVENTORY.tsx # Ejemplo de uso de useInventory
├── EXAMPLE_MOVEMENTS.tsx # Ejemplo de uso de useMovements
├── EXAMPLE_LOCATIONS.tsx # Ejemplo de uso de useLocations
└── HOOKS_README.md       # Esta documentación
```

## Instalación

Los hooks ya están configurados y listos para usar. Solo asegúrate de que sean Next.js está en modo cliente con `'use client'`.

## Requisitos

- React 19.2.3+
- Next.js 16.1.4+
- @tanstack/react-query 5.90.19+
- axios 1.13.5+
- TypeScript 5.9.3+

## Uso General

### 1. useInventory - Gestión de Productos

```typescript
import { useInventory } from "@/hooks";

export default function MyComponent() {
  const { useGetProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } =
    useInventory();

  // Obtener productos
  const { data, isLoading, error } = useGetProducts(page, limit);

  // Crear producto
  const { mutate: createProduct, isPending } = useCreateProduct();
  
  createProduct(
    {
      nombre: "Producto",
      nombre_generico: "Genérico",
      total_inventario: 100,
      ubicacion: "Bodega A",
    },
    {
      onSuccess: () => console.log("Creado"),
      onError: (error) => console.error(error),
    }
  );
}
```

### Métodos disponibles en useInventory:
- **useGetProducts(page, limit)** - Obtener lista paginada de productos
- **useGetProduct(codigo)** - Obtener un producto específico
- **useCreateProduct()** - Crear un nuevo producto
- **useUpdateProduct()** - Actualizar un producto existente
- **useDeleteProduct()** - Eliminar un producto

---

### 2. useMovements - Gestión de Movimientos

```typescript
import { useMovements } from "@/hooks";

export default function MyComponent() {
  const {
    useGetMovements,
    useGetMovementsByProduct,
    useGetMovementsByLocation,
    useCreateMovement,
    useUpdateMovement,
    useDeleteMovement,
  } = useMovements();

  // Obtener movimientos
  const { data } = useGetMovements(1, 10);

  // Obtener movimientos de un producto
  const { data: productMovements } = useGetMovementsByProduct("A00000001");

  // Crear movimiento
  const { mutate: createMovement } = useCreateMovement();
  
  createMovement({
    codigo_producto: "A00000001",
    tipo: "salida",
    cantidad: 10,
    ubicacion_origen: "Bodega A",
    ubicacion_destino: "Planta",
    fecha: new Date().toISOString(),
    descripcion: "Movimiento",
    usuario: "admin",
  });
}
```

### Métodos disponibles en useMovements:
- **useGetMovements(page, limit)** - Obtener lista paginada de movimientos
- **useGetMovementsByProduct(codigo)** - Obtener movimientos de un producto
- **useGetMovementsByLocation(ubicacion)** - Obtener movimientos de una ubicación
- **useCreateMovement()** - Crear un nuevo movimiento
- **useUpdateMovement()** - Actualizar un movimiento
- **useDeleteMovement()** - Eliminar un movimiento

---

### 3. useLocations - Gestión de Ubicaciones

```typescript
import { useLocations } from "@/hooks";

export default function MyComponent() {
  const {
    useGetLocations,
    useGetLocation,
    useCreateLocation,
    useUpdateLocation,
    useDeleteLocation,
  } = useLocations();

  // Obtener ubicaciones
  const { data } = useGetLocations(1, 10);

  // Obtener una ubicación específica
  const { data: location } = useGetLocation("location-id");

  // Crear ubicación
  const { mutate: createLocation } = useCreateLocation();
  
  createLocation({
    nombre: "Bodega Nueva",
    capacidad: 1000,
    capacidad_usada: 500,
    descripcion: "Descripción",
  });
}
```

### Métodos disponibles en useLocations:
- **useGetLocations(page, limit)** - Obtener lista paginada de ubicaciones
- **useGetLocation(id)** - Obtener una ubicación específica
- **useCreateLocation()** - Crear una nueva ubicación
- **useUpdateLocation()** - Actualizar una ubicación
- **useDeleteLocation()** - Eliminar una ubicación

---

## Hook Combinado - useCrud

Para acceder a todos los hooks desde un solo punto:

```typescript
import { useCrud } from "@/hooks";

export default function MyComponent() {
  const { inventory, movements, locations } = useCrud();

  // Ahora puedes usar:
  // inventory.useGetProducts(), inventory.useCreateProduct(), etc.
  // movements.useGetMovements(), movements.useCreateMovement(), etc.
  // locations.useGetLocations(), locations.useCreateLocation(), etc.
}
```

---

## Patrones de Uso Comunes

### Patrón 1: Obtener datos y mostrar en tabla

```typescript
const { useGetProducts } = useInventory();
const { data: productsData, isLoading, error } = useGetProducts(1, 10);

if (isLoading) return <div>Cargando...</div>;
if (error) return <div>Error: {error.message}</div>;

return (
  <table>
    <tbody>
      {productsData?.data.map((product) => (
        <tr key={product.codigo_producto}>
          <td>{product.nombre}</td>
          <td>{product.total_inventario}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
```

### Patrón 2: Crear con validación y feedback

```typescript
const { mutate: createProduct, isPending, error } = useCreateProduct();

const handleSubmit = (formData) => {
  createProduct(formData, {
    onSuccess: (data) => {
      toast.success("Producto creado exitosamente");
      setFormData({}); // Limpiar formulario
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
};

return (
  <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit(formData);
  }}>
    {/* Campos del formulario */}
    <button disabled={isPending}>
      {isPending ? "Guardando..." : "Guardar"}
    </button>
  </form>
);
```

### Patrón 3: Actualizar con confirmación

```typescript
const { mutate: updateProduct } = useUpdateProduct();

const handleUpdate = (codigo, newData) => {
  if (window.confirm("¿Estás seguro de actualizar?")) {
    updateProduct(
      { codigo, product: newData },
      {
        onSuccess: () => {
          toast.success("Actualizado exitosamente");
        },
      }
    );
  }
};
```

### Patrón 4: Eliminar con confirmación

```typescript
const { mutate: deleteProduct } = useDeleteProduct();

const handleDelete = (codigo) => {
  if (window.confirm("¿Deseas eliminar este producto?")) {
    deleteProduct(codigo, {
      onSuccess: () => {
        toast.success("Eliminado exitosamente");
      },
      onError: () => {
        toast.error("Error al eliminar");
      },
    });
  }
};
```

---

## Estados de Carga

Cada mutation y query devuelve estados útiles:

```typescript
// Estados de Query
const { data, isLoading, isError, error, isFetching } = useGetProducts();

// Estados de Mutation
const { mutate, isPending, isError, error, isSuccess } = useCreateProduct();
```

---

## Invalidación de Cache

Los hooks automáticamente invalidan el cache cuando se crea, actualiza o elimina un elemento. Esto asegura que los datos siempre estén sincronizados.

Si necesitas invalidar manualmente:

```typescript
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// Invalidar todos los productos
queryClient.invalidateQueries({ queryKey: ["inventory"] });

// Invalidar una página específica
queryClient.invalidateQueries({ queryKey: ["inventory", "products", 1, 10] });
```

---

## Configuración de API Base

La URL base está configurada en [api/waterApi.ts](../api/waterApi.ts):

```typescript
baseURL: "http://localhost:3000"
```

Modifica esto si tu backend está en otra URL.

---

## Tipos TypeScript

Todos los hooks están completamente tipados. Los tipos disponibles son:

```typescript
// Desde interfaces/types.ts
interface Product {
  codigo_producto: string;
  nombre: string;
  nombre_generico: string;
  total_inventario: number;
  ubicacion: string;
}

interface Movement {
  id: string;
  codigo_producto: string;
  tipo: "entrada" | "salida" | "transferencia";
  cantidad: number;
  ubicacion_origen: string;
  ubicacion_destino: string;
  fecha: string;
  descripcion: string;
  usuario: string;
}

interface Location {
  id: string;
  nombre: string;
  capacidad: number;
  capacidad_usada: number;
  descripcion: string;
}
```

---

## Ejemplos Completos

Ver ejemplos completos funcionando en:
- [EXAMPLE_INVENTORY.tsx](./EXAMPLE_INVENTORY.tsx)
- [EXAMPLE_MOVEMENTS.tsx](./EXAMPLE_MOVEMENTS.tsx)
- [EXAMPLE_LOCATIONS.tsx](./EXAMPLE_LOCATIONS.tsx)

---

## Troubleshooting

### El hook no devuelve datos

1. Asegúrate de que tu backend esté corriendo en `http://localhost:3000`
2. Verifica que los endpoints coincidan con tu API
3. Revisa la consola del navegador para errores

### Error "Cannot read properties of undefined"

Asegúrate de acceder a los datos correctamente:
```typescript
// ✅ Correcto
const products = productsData?.data || [];

// ❌ Incorrecto
const products = productsData.data; // Puede ser undefined
```

### La página no se actualiza después de crear/actualizar

Los hooks automáticamente invalidan el cache. Si no funciona:

```typescript
// Invalida manualmente
createProduct(data, {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["inventory"] });
  },
});
```

---

## Para Más Información

- [React Query Documentation](https://tanstack.com/query/v5)
- [Axios Documentation](https://axios-http.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
