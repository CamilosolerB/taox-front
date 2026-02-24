# 🎯 Custom Hooks CRUD - Guía de Inicio Rápido

## ¿Qué se ha creado?

Se han implementado **3 custom hooks principales** para manejar todas las operaciones CRUD de tu aplicación:

### 📦 Hooks Principales

1. **`useInventory`** - Gestión de productos/inventario
   - Obtener lista de productos
   - Obtener producto individual
   - Crear, actualizar y eliminar productos

2. **`useMovements`** - Gestión de movimientos de stock
   - Obtener lista de movimientos
   - Filtrar por producto o ubicación
   - Crear, actualizar y eliminar movimientos

3. **`useLocations`** - Gestión de ubicaciones/bodegas
   - Obtener lista de ubicaciones
   - Obtener ubicación individual
   - Crear, actualizar y eliminar ubicaciones

## 🚀 Inicio Rápido

### 1. Estructura de Carpetas Creadas

```
proyecto/
├── api/
│   └── waterApi.ts                 ✅ Configurado con axios
├── hooks/                          ✨ NUEVO
│   ├── index.ts                    # Exportaciones
│   ├── useInventory.ts             # Hook de inventario
│   ├── useMovements.ts             # Hook de movimientos
│   ├── useLocations.ts             # Hook de ubicaciones
│   ├── HOOKS_README.md             # Documentación detallada
│   ├── EXAMPLE_INVENTORY.tsx       # Ejemplos de uso
│   ├── EXAMPLE_MOVEMENTS.tsx
│   └── EXAMPLE_LOCATIONS.tsx
├── providers/
│   └── QueryProvider.tsx           ✨ NUEVO - Proveedor de React Query
├── interfaces/
│   ├── product.ts
│   ├── types.ts                    ✨ NUEVO - Tipos para API
│   └── index.ts                    ✨ NUEVO - Exportaciones
└── app/
    └── layout.tsx                  ✅ Actualizado con QueryProvider
```

### 2. Instalación y Configuración

Todo está listo - solo necesitas asegurarte de que:

```bash
# ✅ Ya está instalado
npm install @tanstack/react-query axios typescript

# Verifica que el backend esté en http://localhost:3000
# Si está en otra URL, actualiza en api/waterApi.ts
```

### 3. Uso Básico En Un Componente

```typescript
'use client';

import { useInventory } from "@/hooks";

export default function ProductsPage() {
  // 1. Obtener datos
  const { useGetProducts, useCreateProduct } = useInventory();
  const { data: productsData, isLoading } = useGetProducts(1, 10);
  
  // 2. Mutation para crear
  const { mutate: createProduct, isPending } = useCreateProduct();

  // 3. Manejar creación
  const handleCreate = () => {
    createProduct(
      {
        nombre: "Nuevo Producto",
        nombre_generico: "Genérico",
        total_inventario: 100,
        ubicacion: "Bodega A",
      },
      {
        onSuccess: () => console.log("¡Creado!"),
        onError: (error) => console.error(error),
      }
    );
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Productos</h1>
      <button onClick={handleCreate} disabled={isPending}>
        {isPending ? "Guardando..." : "Crear"}
      </button>
      
      <div>
        {productsData?.data.map((product) => (
          <div key={product.codigo_producto}>
            <h3>{product.nombre}</h3>
            <p>Stock: {product.total_inventario}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📚 Métodos Disponibles

### useInventory
```typescript
const { 
  useGetProducts,        // Obtener lista paginada
  useGetProduct,         // Obtener uno específico
  useCreateProduct,      // Crear nuevo
  useUpdateProduct,      // Actualizar uno
  useDeleteProduct,      // Eliminar uno
} = useInventory();
```

### useMovements
```typescript
const { 
  useGetMovements,           // Obtener lista
  useGetMovementsByProduct,  // Filtrar por producto
  useGetMovementsByLocation, // Filtrar por ubicación
  useCreateMovement,         // Crear nuevo
  useUpdateMovement,         // Actualizar
  useDeleteMovement,         // Eliminar
} = useMovements();
```

### useLocations
```typescript
const { 
  useGetLocations,    // Obtener lista
  useGetLocation,     // Obtener una específica
  useCreateLocation,  // Crear nueva
  useUpdateLocation,  // Actualizar
  useDeleteLocation,  // Eliminar
} = useLocations();
```

## 🔄 Ciclo de Vida Typical

```
┌─────────────────────────────────────────────────────────┐
│                  Componente React                        │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │   Custom Hook        │
        │  (useInventory, etc) │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │   React Query        │
        │  (Cache & Sync)      │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │      Axios           │
        │  (HTTP Request)      │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │    Backend API       │
        │  http://localhost:3000
        └──────────────────────┘
```

## 💡 Patrones Útiles

### ✅ Crear con validación
```typescript
const { mutate: createProduct, isPending, error } = useCreateProduct();

createProduct(formData, {
  onSuccess: () => {
    toast.success("¡Creado exitosamente!");
    resetForm();
  },
  onError: (err) => {
    toast.error(`Error: ${err.message}`);
  },
});
```

### ✅ Confirmar antes de eliminar
```typescript
const handleDelete = (codigo: string) => {
  if (confirm("¿Eliminar este producto?")) {
    deleteProduct(codigo);
  }
};
```

### ✅ Paginación
```typescript
const { data, isLoading } = useGetProducts(currentPage, itemsPerPage);

return (
  <div>
    {/* Mostrar datos */}
    <button 
      onClick={() => setCurrentPage(page + 1)}
      disabled={!data || data.page >= Math.ceil(data.total / data.limit)}
    >
      Siguiente
    </button>
  </div>
);
```

## 🔧 Endpoints Esperados

Tu backend debe tener estos endpoints:

```
GET    /products?page=1&limit=10       # Obtener productos paginados
GET    /products/:codigo                # Obtener un producto
POST   /products                        # Crear producto
PUT    /products/:codigo                # Actualizar producto
DELETE /products/:codigo                # Eliminar producto

GET    /movements?page=1&limit=10      # Obtener movimientos
GET    /movements/product/:codigo      # Movimientos de un producto
GET    /movements/location/:ubicacion  # Movimientos de una ubicación
POST   /movements                      # Crear movimiento
PUT    /movements/:id                  # Actualizar movimiento
DELETE /movements/:id                  # Eliminar movimiento

GET    /locations?page=1&limit=10     # Obtener ubicaciones
GET    /locations/:id                 # Obtener una ubicación
POST   /locations                     # Crear ubicación
PUT    /locations/:id                 # Actualizar ubicación
DELETE /locations/:id                 # Eliminar ubicación
```

## 📋 Tipos de Datos

### Product
```typescript
{
  codigo_producto: string;
  nombre: string;
  nombre_generico: string;
  total_inventario: number;
  ubicacion: string;
}
```

### Movement
```typescript
{
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
```

### Location
```typescript
{
  id: string;
  nombre: string;
  capacidad: number;
  capacidad_usada: number;
  descripcion: string;
}
```

## 🐛 Debugging

### Ver qué se está enviando
```typescript
// En el componente
console.log("Datos siendo enviados:", formData);
```

### Ver la respuesta
```typescript
const { data } = useGetProducts();
console.log("Respuesta del servidor:", data);
```

### Ver errores
```typescript
const { error } = useGetProducts();
console.error("Error:", error?.message);
```

## 📖 Documentación Completa

Para documentación más detallada, consulta:
- [hooks/HOOKS_README.md](./hooks/HOOKS_README.md) - Documentación completa
- [hooks/EXAMPLE_INVENTORY.tsx](./hooks/EXAMPLE_INVENTORY.tsx) - Ejemplo de inventario
- [hooks/EXAMPLE_MOVEMENTS.tsx](./hooks/EXAMPLE_MOVEMENTS.tsx) - Ejemplo de movimientos
- [hooks/EXAMPLE_LOCATIONS.tsx](./hooks/EXAMPLE_LOCATIONS.tsx) - Ejemplo de ubicaciones

## ✅ Checklist de Implementación

- [x] Crear custom hooks basados en vistas
- [x] Integrar con axios (waterApi)
- [x] Usar React Query para caching
- [x] Tipado completo con TypeScript
- [x] Documentación detallada
- [x] Ejemplos de uso
- [x] Proveedor de React Query en layout

## 🎓 Próximos Pasos

1. **Integra los hooks en tus páginas:**
   - `app/company/inventory/page.tsx`
   - `app/company/movements/page.tsx`
   - `app/company/locations/page.tsx`

2. **Crea componentes reutilizables:**
   - `components/adminInventory/ProductForm.tsx`
   - `components/adminInventory/ProductsList.tsx`

3. **Añade validación en formularios:**
   - Valida datos antes de enviar
   - Muestra errores al usuario

4. **Implementa tabla con paginación:**
   - Usa los métodos de paginación de los hooks

## 🆘 Problemas Comunes

### "Cannot find module '@/hooks'"
- Asegúrate de que el alias `@` está configurado en `tsconfig.json`

### "waterApi is not defined" 
- Verifica que `api/waterApi.ts` existe y tiene las exportaciones correctas

### "No se actualiza después de crear"
Los hooks invalidan automáticamente el cache. Si no funciona:
```typescript
createProduct(data, {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["inventory"] });
  },
});
```

---

**¡Listo para empezar! 🚀** Comienza integrando los hooks en tus páginas.
