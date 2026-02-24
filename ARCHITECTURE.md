# 🏗️ Arquitectura CRUD Hooks - Diagrama Visual

## Sistema Completo de Arquitectura

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         APLICACIÓN NEXT.JS                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                      app/layout.tsx (Root)                          │  │
│  │                    ┌──────────────────────┐                         │  │
│  │                    │   QueryProvider      │                         │  │
│  │                    │  (React Query)       │                         │  │
│  │                    └──────────────────────┘                         │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│           │                    │                    │                      │
│           ▼                    ▼                    ▼                      │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐          │
│  │ Inventory Page   │ │ Movements Page   │ │ Locations Page   │          │
│  │                  │ │                  │ │                  │          │
│  │ import           │ │ import           │ │ import           │          │
│  │{ useInventory }  │ │{ useMovements }  │ │{ useLocations }  │          │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘          │
│           │                    │                    │                      │
└───────────┼────────────────────┼────────────────────┼──────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
    ┌───────────────────────────────────────────────────────┐
    │         CUSTOM HOOKS LAYER (hooks/)                   │
    │                                                       │
    │  ┌──────────────────┬──────────────────┬───────────┐ │
    │  │                  │                  │           │ │
    │  │  useInventory    │  useMovements    │useLocations
    │  │  - useGetProducts│  - useGetMovs    │- useGetLocs
    │  │  - useCreateProd │  - useGetByProd  │- useCreateLoc
    │  │  - useUpdateProd │  - useGetByLoc   │- useUpdateLoc
    │  │  - useDeleteProd │  - useCreateMov  │- useDeleteLoc
    │  │                  │  - useUpdateMov  │           │
    │  │                  │  - useDeleteMov  │           │
    │  │                  │                  │           │
    │  └──────────────────┴──────────────────┴───────────┘
    │       │                    │                    │
    └───────┼────────────────────┼────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
    ┌──────────────────────────────────────────────────────┐
    │          REACT QUERY LAYER (Cache & Sync)           │
    │                                                      │
    │  ┌─────────────────────────────────────────────┐   │
    │  │  Query Cache Management                     │   │
    │  │  - Query Keys: ["inventory"], etc            │   │
    │  │  - Revalidation: 5 minutes                  │   │
    │  │  - Auto-invalidation on mutations           │   │
    │  └─────────────────────────────────────────────┘   │
    └──────────────────────────────────────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
    ┌──────────────────────────────────────────────────────┐
    │            AXIOS LAYER (HTTP Client)               │
    │                                                      │
    │  waterApi.create({                                 │
    │    baseURL: "http://localhost:3000",              │
    │    headers: { "Content-Type": "application/json" } │
    │  })                                                 │
    │                                                      │
    │  Interceptors:                                      │
    │  - Error handling (401, etc)                        │
    │  - Request/Response logging                        │
    └──────────────────────────────────────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
    ┌──────────────────────────────────────────────────────┐
    │         HTTP METHODS (GET, POST, PUT, DELETE)       │
    │                                                      │
    │  GET  /products?page=1&limit=10                    │
    │  GET  /products/:codigo                             │
    │  POST /products                                     │
    │  PUT  /products/:codigo                             │
    │  DELETE /products/:codigo                           │
    │                                                      │
    │  (Similar para /movements y /locations)            │
    └──────────────────────────────────────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
    ┌──────────────────────────────────────────────────────┐
    │          BACKEND API (Node.js/Express)              │
    │          http://localhost:3000                      │
    │                                                      │
    │  /products                                          │
    │  /movements                                         │
    │  /locations                                         │
    │                                                      │
    │  Database (PostgreSQL, MongoDB, etc)               │
    └──────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos: Crear Producto

```
1. Usuario hace clic en "Crear"
   │
   ▼
2. Component llama: createProduct(newData)
   │
   ▼
3. Hook ejecuta mutationFn
   │
   ▼
4. Axios envía: POST /products con newData
   │
   ▼
5. Backend crea el producto y retorna resp
   │
   ▼
6. onSuccess se ejecuta
   │
   ▼
7. queryClient invalida: ["inventory"]
   │
   ▼
8. React Query refetcha: useGetProducts
   │
   ▼
9. Axios envía: GET /products?page=1
   │
   ▼
10. Backend retorna lista actualizada
    │
    ▼
11. Cache se actualiza
    │
    ▼
12. Component re-renderiza con datos nuevos ✅
```

---

## 📋 Estados en Queries (Lectura)

```
useGetProducts() ◄──────────────────────────┐
                                            │
┌─────────────────┬─────────────────┬──────┴──────────┐
│                 │                 │                 │
▼                 ▼                 ▼                 ▼
isLoading    isFetching        isSuccess          isError
   ↓            ↓                  ↓                ↓
 true         false              true             false
(primera)    (refetch)        (datos ok)      (error en API)
  carga


data        ─┐
             ├─► Los datos obtenidos del servidor
error       ─┘   El error si hubo problema
```

---

## 📋 Estados en Mutations (Escritura)

```
createProduct() / updateProduct() / deleteProduct()


┌────────────────┬──────────────┬──────────────┐
│                │              │              │
▼                ▼              ▼              ▼
isPending    isSuccess       isError        data
   ↓            ↓              ↓              ↓
 true         true           true         Datos
(esperando)  (éxito)        (error)      retornados


Ciclo:
  Esperando → Éxito/Error → Datos/Error
```

---

## 🗂️ Estructura de Datos

```
┌─────────────────────────────────────┐
│        Product (Inventario)         │
├─────────────────────────────────────┤
│ codigo_producto: string             │
│ nombre: string                      │
│ nombre_generico: string             │
│ total_inventario: number            │
│ ubicacion: string                   │
└─────────────────────────────────────┘


┌─────────────────────────────────────┐
│     Movement (Movimientos)          │
├─────────────────────────────────────┤
│ id: string                          │
│ codigo_producto: string             │
│ tipo: "entrada"|"salida"|"transfer" │
│ cantidad: number                    │
│ ubicacion_origen: string            │
│ ubicacion_destino: string           │
│ fecha: string (ISO)                 │
│ descripcion: string                 │
│ usuario: string                     │
└─────────────────────────────────────┘


┌─────────────────────────────────────┐
│   Location (Ubicaciones/Bodegas)    │
├─────────────────────────────────────┤
│ id: string                          │
│ nombre: string                      │
│ capacidad: number                   │
│ capacidad_usada: number             │
│ descripcion: string                 │
└─────────────────────────────────────┘
```

---

## 🎯 Query Keys Strategy

```
["inventory"]
  │
  ├── "products", page, limit
  │   └── Para GET /products?page=X&limit=Y
  │
  └── "product", codigo
      └── Para GET /products/:codigo


["movements"]
  │
  ├── "list", page, limit
  │   └── Para GET /movements?page=X&limit=Y
  │
  ├── "product", codigo
  │   └── Para GET /movements/product/:codigo
  │
  └── "location", ubicacion
      └── Para GET /movements/location/:ubicacion


["locations"]
  │
  ├── "list", page, limit
  │   └── Para GET /locations?page=X&limit=Y
  │
  └── "detail", id
      └── Para GET /locations/:id
```

---

## 🔄 Invalidación de Cache

```
Cuando se crea/actualiza/elimina:

1. Mutation finaliza
   │
   ▼
2. onSuccess se ejecuta
   │
   ▼
3. queryClient.invalidateQueries({ queryKey })
   │
   ▼
4. Cache se marca como "stale"
   │
   ▼
5. Siguiente acceso triggers refetch
   │
   ▼
6. Datos frescos del servidor
```

---

## 📊 Comparación: Sin Hooks vs Con Hooks

### ❌ SIN Custom Hooks

```
Component
  │
  ├─ fetch('http://...')
  ├─ .then(res => res.json())
  ├─ .then(data => setState(data))
  ├─ .catch(err => setState(err))
  │
  ├─ Manual refetching
  ├─ Manual error handling
  ├─ Manual loading states
  ├─ No caching
  └─ No deduplication
```

### ✅ CON Custom Hooks

```
Component
  │
  ├─ const { data, isLoading, error } = useGetProducts()
  │
  ├─ Automático: loading, error, retry
  ├─ Automático: caching
  ├─ Automático: deduplication
  ├─ Automático: refetching
  ├─ Automático: garbage collection
  └─ Automático: invalidation
```

---

## 🎨 Patrón de Composición

```
┌─────────────────────────────────────────┐
│   1. UI Layer (Components)              │
│   - ProductsPage.tsx                    │
│   - LocationsForm.tsx                   │
│   - MovementsTable.tsx                  │
└────────────┬────────────────────────────┘
             │ usa
             ▼
┌─────────────────────────────────────────┐
│   2. Hooks Layer (Custom Hooks)         │
│   - useInventory()                      │
│   - useMovements()                      │
│   - useLocations()                      │
└────────────┬────────────────────────────┘
             │ usa
             ▼
┌─────────────────────────────────────────┐
│   3. Query Layer (React Query)          │
│   - useQuery()                          │
│   - useMutation()                       │
│   - useQueryClient()                    │
└────────────┬────────────────────────────┘
             │ usa
             ▼
┌─────────────────────────────────────────┐
│   4. API Layer (Axios)                  │
│   - waterApi instance                   │
│   - Interceptors                        │
│   - Error handling                      │
└────────────┬────────────────────────────┘
             │ hace
             ▼
┌─────────────────────────────────────────┐
│   5. Backend (Tu API)                   │
│   - Endpoints                           │
│   - Database                            │
│   - Business Logic                      │
└─────────────────────────────────────────┘
```

---

## ✨ Características Destacadas

```
╔═════════════════════════════════════════╗
║   CUSTOM HOOKS - FEATURES COMPLETAS     ║
╠═════════════════════════════════════════╣
║                                         ║
║  🎯 Tipado TypeScript                  ║
║     - Autocompletado en IDE            ║
║     - Errores en tiempo de compilación ║
║                                         ║
║  📍 Paginación Integrada               ║
║     - params: page, limit              ║
║     - response: { data[], total }      ║
║                                         ║
║  🔍 Filtrado                            ║
║     - Por producto                     ║
║     - Por ubicación                    ║
║                                         ║
║  ⚡ Caching Automático                 ║
║     - 5 minutos por defecto            ║
║     - Configurable                     ║
║                                         ║
║  🔄 Sync Automático                    ║
║     - Invalidation on mutation         ║
║     - Deduplication                    ║
║                                         ║
║  🚨 Error Handling                     ║
║     - Global interceptors              ║
║     - Per-operation callbacks          ║
║                                         ║
║  ⏳ Loading States                     ║
║     - isLoading, isPending             ║
║     - isFetching, isSuccess            ║
║                                         ║
║  📚 Documentación Completa             ║
║     - 5 archivos de docs               ║
║     - 3 ejemplos funcionales           ║
║                                         ║
╚═════════════════════════════════════════╝
```

---

## 🚀 Performance Optimizations

```
1. Query Deduplication
   ─────────────────────────
   Si dos componentes hacen la misma query,
   solo se hace una request HTTP


2. Automatic Refetch on Mount
   ────────────────────────────
   Componentes nuevos refetcharán automáticamente
   si el dato está stale


3. Garbage Collection
   ───────────────────
   Cache viejo se elimina automáticamente
   después de que expira


4. Request Coalescing
   ──────────────────
   Múltiples requests iguales se dedupen
   en la misma request


5. Background Refetching
   ─────────────────────
   Refetch hace que el UI no se bloquee
```

---

## 📞 Referencia Rápida

```
✅ IMPORTS
import { useInventory, useMovements, useLocations } from "@/hooks"
import { useCrud } from "@/hooks"

✅ QUERIES (GET)
const { data, isLoading, error } = useGetProducts()

✅ MUTATIONS (POST, PUT, DELETE)
const { mutate, isPending, error } = useCreateProduct()
mutate(data, { onSuccess, onError })

✅ PAGINATION
useGetProducts(page, limit)

✅ FILTERING
useGetMovementsByProduct(codigo)
useGetMovementsByLocation(ubicacion)

✅ INVALIDATION
queryClient.invalidateQueries({ queryKey: ["inventory"] })
```

---

**Diagrama actualizado:** Febrero 2026
**Versión:** 1.0 - Completa
