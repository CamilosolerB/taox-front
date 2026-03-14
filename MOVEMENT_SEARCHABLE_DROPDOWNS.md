# Searchable Dropdowns para Movimientos - Documentación

## 🎯 Cambios Realizados

Se han implementado dropdowns con búsqueda en el modal de registro de movimientos para mejorar la experiencia de usuario.

## 📁 Archivos Nuevos Creados

### 1. `SearchSelect.tsx` - Componente Reutilizable
**Ubicación:** `components/adminInventory/movements/modals/SearchSelect.tsx`

Componente de select con búsqueda que puede usarse en múltiples formularios.

**Características:**
- Búsqueda en tiempo real
- Filtrado por etiqueta e ID
- Manejo de estados de carga
- Soporte para modo oscuro
- Validación de campos requeridos
- Limpieza de selección (botón X)

**Props:**
```typescript
interface SearchSelectProps {
  label: string;                           // Etiqueta del campo
  placeholder?: string;                    // Placeholder del input
  options: SearchSelectOption[];           // Opciones disponibles
  value: string | number;                  // Valor seleccionado
  onChange: (value: string | number) => void; // Callback al cambiar
  isLoading?: boolean;                     // Estado de carga
  error?: string;                          // Mensaje de error
  required?: boolean;                      // Marcar como requerido
  disabled?: boolean;                      // Deshabilitar campo
}
```

**Tipo de Opción:**
```typescript
interface SearchSelectOption {
  id: string | number;                    // ID único
  label: string;                          // Texto mostrado
  description?: string;                   // Descripción opcional
}
```

## 📝 Archivos Modificados

### 2. `NewMovementModal.tsx`
**Cambios:**
- ✅ Reemplazó input de texto `productCode` con `SearchSelect` para productos
- ✅ Reemplazó inputs numéricos de procesos con `SearchSelect`
- ✅ Integró `useInventory` hook para obtener lista de productos
- ✅ Integró `useProcesses` hook para obtener lista de procesos
- ✅ Agregó validación mejorada antes de enviar el formulario
- ✅ Implementó conversión de datos a opciones de búsqueda

**Nuevas Dependencias de Hooks:**
```typescript
const { useGetProducts } = useInventory(companyId);
const { data: products = [], isLoading: isLoadingProducts } = useGetProducts();

const { useGetAllProcesses } = useProcesses(companyId);
const { data: processes = [], isLoading: isLoadingProcesses } = useGetAllProcesses();
```

**Gestión de Estados:**
- `productId`: ID del producto seleccionado (anterior: `productCode`)
- `originProcessId`: ID del proceso origen
- `destinationProcessId`: ID del proceso destino
- Se mantienen: `quantity` y `notes`

**Flujo de Búsqueda:**

```
Producto:        SearchSelect → muestra "nombre" (Ej: "Agua Destilada")
                 → almacena id_product (Ej: "PROD001")
                 → búsqueda por nombre e id_product

Procesos:        SearchSelect → muestra "nombre" (Ej: "Almacenamiento")
                 → almacena id_proceso (Ej: 1)
                 → búsqueda por nombre e id_proceso
```

### 3. `modals/index.ts`
**Cambios:**
- ✅ Agregó exportación de `SearchSelect`

## 🔄 Integración de Hooks

### useInventory
```typescript
const { useGetProducts } = useInventory(companyId);
const { data: products = [] } = useGetProducts();
// Retorna: ProductDTO[]
// Campos: id_product, name, generic_name, price, unit_measure, etc.
```

### useProcesses
```typescript
const { useGetAllProcesses } = useProcesses(companyId);
const { data: processes = [] } = useGetAllProcesses();
// Retorna: ProcessResponseDTO[]
// Campos: id_proceso, nombre, descripcion, tipo_proceso, etc.
```

## 📊 Mapeo de Datos

### Productos
```typescript
products: ProductDTO[] →
productOptions: [
  {
    id: "PROD001",
    label: "Agua Destilada",
    description: "PROD001"
  },
  ...
]
```

### Procesos
```typescript
processes: ProcessResponseDTO[] →
processOptions: [
  {
    id: 1,
    label: "Almacenamiento",
    description: "ID: 1"
  },
  ...
]
```

## ✅ Validación

Se agregó validación adicional antes de enviar:

1. **Campos requeridos**: Verifica que todos los campos obligatorios estén completados
2. **Producto válido**: Verifica que el producto seleccionado exista en la lista
3. **Manejo de errores**: Muestra alertas apropiadas al usuario

```typescript
if (!productId || !originProcessId || !destinationProcessId || !quantity) {
  alert('Por favor complete todos los campos requeridos');
  return;
}

const selectedProduct = products.find(p => p.id_product === productId);
if (!selectedProduct) {
  alert('Producto no válido');
  return;
}
```

## 🎨 Estilos y UX

- **Diseño**: Consistente con el resto de la aplicación
- **Modo oscuro**: Soportado completamente
- **Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Loading states**: Muestra indicador mientras carga datos
- **Búsqueda instantánea**: Filtra mientras escribes
- **Acceso a teclado**: Soporte completo para teclado

## 🚀 Usabilidad

### Flujo de Usuario Anterior (Problema)
```
1. Usuario abre modal
2. Escribe código de producto manualmente (sin validación)
3. Escribe IDs de procesos (sin saber cuáles existen)
4. Posibles errores: código incorrecto, IDs inválidos
```

### Flujo de Usuario Nuevo (Solución)
```
1. Usuario abre modal
2. Hace clic en "Selecciona un producto"
3. Busca por nombre o código: "agua", "destilada", "PROD", etc.
4. Selecciona del dropdown (garantizado válido)
5. Repite para proceso origen y destino
6. Todos los datos son válidos antes de enviar
```

## 📱 Estados de Carga

Cuando se está cargando la lista de productos o procesos:
- El dropdown muestra "Cargando..."
- El input está deshabilitado
- El usuario debe esperar

## 🔌 Requisitos Previos

- ✅ Hook `useInventory(companyId)` con método `useGetProducts()`
- ✅ Hook `useProcesses(companyId)` con método `useGetAllProcesses()`
- ✅ Hook `useMovements(companyId)` con método `useCreateMovement()`
- ✅ API endpoints configurados correctamente

## 🧪 Testing

Para probar la funcionalidad:

1. Ir a la sección de movimientos
2. Hacer clic en "Registrar Nuevo Movimiento"
3. Verificar que aparezcan productos en el dropdown
4. Buscar por nombre o ID
5. Verificar que aparezcan procesos en los dropdowns origen/destino
6. Seleccionar valores y completar el formulario
7. Enviar y verificar que se registre correctamente

## 🐛 Solución de Problemas

**Componente no aparece:**
- Verificar que SearchSelect.tsx esté en `components/adminInventory/movements/modals/`
- Verificar exportación en `index.ts`

**Dropdown vacío:**
- Verificar que los hooks retornan datos
- Revisar consola para errores de API
- Confirmar que `companyId` está siendo pasado correctamente

**Estado de carga permanente:**
- Verificar conexión con la API
- Revisar network tab en DevTools
- Confirmar que los endpoints `/products` y `/processes` funcionan

## 📚 Próximos Pasos Opcionales

1. **Agregar paginación** si hay muchos productos/procesos
2. **Agregar categorización** (productos por categoría, procesos por tipo)
3. **Cachear búsquedas** para mejor performance
4. **Validar en tiempo real** (color de borde en rojo si es inválido)
5. **Agregar atajos de teclado** (arrow keys para navegar opciones)
