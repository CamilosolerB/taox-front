# 🔗 Guía: Relacionar Proveedores en Modal de Productos

## ¿Qué se ha añadido?

Se ha implementado la funcionalidad para **relacionar proveedores directamente en los modales de crear y editar productos**. Ahora puedes:

✅ **Crear Producto + Asignar Proveedores** en un único flujo
✅ **Editar Producto** y gestionar sus proveedores por separado
✅ **Establecer Proveedor Principal** para cada producto
✅ **Seleccionar múltiples proveedores** con búsqueda

---

## 📂 Archivos Modificados/Creados

### ✨ Nuevos Archivos
- **ProviderSelector.tsx** - Componente reutilizable para seleccionar proveedores

### ✏️ Archivos Actualizados
- **CreateProductModal.tsx** - Añadida sección de proveedores
- **EditProductModal.tsx** - Añadida gestión de proveedores existentes
- **modals/index.ts** - Exporta el nuevo componente

---

## 🎯 Flujo: Crear Producto con Proveedores

```
┌─────────────────────────┐
│  Abrir Modal Crear      │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  1. Llenar datos básicos│
│  - Nombre              │
│  - Precio              │
│  - Unidad              │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. Seleccionar         │
│     Proveedores         │
│  (Buscar, seleccionar)  │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. Marcar Principal    │
│  (Opcional)             │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. Guardar Producto    │
│  AND Crear Relaciones   │
└─────────────────────────┘
```

---

## 🎯 Flujo: Editar Proveedores de Producto

```
┌─────────────────────────┐
│  Abrir Modal Editar     │
│  (Producto Existente)   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  1. Ver proveedores     │
│     actuales            │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  2. Añadir nuevos       │
│     Remover existentes  │
│     (Cambios en tiempo) │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  3. Cambiar Principal   │
│  (Automático)           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│  4. Guardar Producto    │
│  (Proveedores SE        │
│   SINCRONIZAN         │
│   AUTOMÁTICAMENTE)      │
└─────────────────────────┘
```

---

## 📊 Componente ProviderSelector

### Props
```typescript
interface ProviderSelectorProps {
  providers: ProviderDTO[];              // Lista de proveedores disponibles
  selectedProviders: string[];           // IDs seleccionados
  onSelectionChange: (ids: string[]) => void;  // Callback cuando cambia selección
  mainProvider?: string | null;          // ID del proveedor principal
  onMainProviderChange?: (id: string) => void; // Callback para cambiar principal
  isLoading?: boolean;                   // Estado de carga
}
```

### Características
- 🔍 **Búsqueda en tiempo real** por nombre o código
- ☑️ **Checkboxes múltiples** para seleccionar proveedores
- ⭐ **Botón "Set Principal"** para marcar proveedor principal
- 👁️ **Vista previa** de proveedores seleccionados
- 📱 **Scroll** en lista si hay muchos proveedores
- 🎨 **Diseño responsivo** y tema oscuro

---

## 💻 Cómo Funciona

### En CreateProductModal

```typescript
// 1. Estado para proveedores
const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
const [mainProvider, setMainProvider] = useState<string | null>(null);

// 2. Obtener lista de proveedores
const { useGetProviders } = useProviders(companyId);
const { data: providersData } = useGetProviders();

// 3. Hook para crear relación
const { useCreateProductProvider } = useProviders(companyId);
const createProductProviderMutation = useCreateProductProvider();

// 4. En handleSubmit:
// Primero crea el producto
await createMutation.mutateAsync({...});

// Luego crea relaciones con cada proveedor
for (const providerId of selectedProviders) {
  await createProductProviderMutation.mutateAsync({
    codigo_producto: productId,
    cad_proveedor: providerId,
    es_principal: mainProvider === providerId,
  });
}
```

### En EditProductModal

```typescript
// 1. Obtener proveedores del producto
const { data: productProvidersData } = useGetProvidersByProduct(product?.id_product);

// 2. Cargar en vistazo al abrir
useEffect(() => {
  if (productProvidersData) {
    const providers = productProvidersData.map(pp => pp.cad_proveedor);
    const main = productProvidersData.find(pp => pp.es_principal)?.cad_proveedor;
    setSelectedProviders(providers);
    setMainProvider(main);
  }
}, [productProvidersData]);

// 3. Al cambiar proveedores
// Elimina los deseleccionados
// Añade los nuevos
// Automáticamente sincroniza
```

---

## 🎨 UI/UX

### CreateProductModal
```
┌─ Registrar Nuevo Producto────────┐
│                                  │
│ Información Básica               │
│ ├─ ID Producto                   │
│ ├─ Nombre del Producto           │
│ ├─ Nombre Genérico               │
│ └─ Unidad de Medida              │
│                                  │
│ Información de Precios           │
│ ├─ Precio                        │
│ ├─ Precio Unitario               │
│ └─ Precio Mínimo                 │
│                                  │
│ Especificaciones                 │
│ └─ Lead Time, Realmacenamiento   │
│                                  │
│ 🔗 Relacionar Proveedores        │ ← NUEVO
│ ├─ Buscar Proveedores            │
│ ├─ ☑ Seleccionar múltiples       │
│ ├─ ⭐ Marcar Principal           │
│ └─ Preview de seleccionados      │
│                                  │
│ [Cancelar] [Guardar Producto]    │
└──────────────────────────────────┘
```

### EditProductModal
```
┌─ Editar Producto────────────────┐
│                                 │
│ ID del Producto: A00000001      │
│                                 │
│ (Información del producto)      │
│                                 │
│ 🔗 Gestionar Proveedores       │ ← NUEVO
│ ├─ Buscar Proveedores           │
│ ├─ Provider 1 ☑ [Principal]    │
│ ├─ Provider 2 ☑ [SetPrincipal] │
│ ├─ Provider 3 ✗                 │
│ └─ Preview: 2 proveedores      │
│                                 │
│ [Cancelar] [Actualizar]         │
└─────────────────────────────────┘
```

---

## 🔄 Sincronización Automática

### En Crear
1. Producto se crea
2. **Para cada proveedor seleccionado:**
   - Se crea una relación ProductProvider
   - Si es "principal", se marca como tal

### En Editar
1. **Cambios de proveedores se aplican en tiempo real:**
   - Deseleccionar → Elimina la relación
   - Seleccionar → Crea la relación
   - Cambiar principal → Actualiza la relación

2. **Guardar datos del producto:**
   - Los cambios de proveedores YA se han aplicado
   - Solo hace falta guardar el producto

---

## ✅ Validaciones

### CreateProductModal
```typescript
// Validación antes de crear
if (!formState.name || !formState.generic_name || !formState.unit_measure) {
  // Error: campos requeridos incompletos
}

// Los proveedores son opcionales
```

### EditProductModal
```typescript
// Validación igual
// Los cambios de proveedores se aplican conforme se hacen

// Si hay error en proveedores, se muestra en el modal
if (error) {
  // Mostrar mensaje de error
}
```

---

## 🚀 Ejemplo de Uso

### Usuario crea nuevo producto "SODA":

```javascript
1. Click en "Nuevo Producto"
2. Llena:
   - Nombre: "HIDROXIDO DE SODIO EN ESCAMAS"
   - Genérico: "SODA"
   - Unidad: "KG"
   - Precio: "100"
   
3. Busca proveedores: "Química"
4. Selecciona:
   - ☑ Química Pura S.A.
   - ☑ Productos Industriales Ltda.
   
5. Marca como Principal: "Química Pura S.A."

6. Click "Guardar Producto"
   ✅ SODA creado
   ✅ Relación con Química Pura (Principal)
   ✅ Relación con Productos Industriales
```

### Usuario edita proveedores de producto:

```javascript
1. Click en Editar "SODA"
2. Modal se abre con:
   - ☑ Química Pura (Principal)
   - ☑ Productos Industriales
   
3. Deselecciona: Productos Industriales
   ✅ Automáticamente elimina la relación
   
4. Busca y añade: "Proveedores ABC"
   ✅ Automáticamente crea la relación
   
5. Click "Actualizar"
   ✅ Datos del producto actualizados
   ✅ Proveedores ya sincronizados
```

---

## 🐛 Manejo de Errores

### Si falla crear relación en CreateProductModal
```typescript
try {
  // Crear producto
  // Crear relaciones
} catch (err) {
  // Mostrar error general
  setError("Error al crear producto");
  // Producto NO se crea
}
```

### Si falla cambiar proveedor en EditProductModal
```typescript
try {
  // Eliminar/agregar proveedor
} catch (err) {
  // Mostrar error
  setError("Error al actualizar proveedores");
  // El cambio NO se aplica
}
```

---

## 📱 Estados y Loading

### ProviderSelector Loading
```typescript
isLoading={loadingProviders || loadingProductProviders}
// Muestra "Cargando proveedores..."
// Desactiva búsqueda e interacción
```

### Botones Desactivados
```typescript
// En CreateProductModal
disabled={createMutation.isPending || createProductProviderMutation.isPending}

// En EditProductModal
disabled={updateMutation.isPending || 
  createProductProviderMutation.isPending ||
  deleteProductProviderMutation.isPending ||
  setMainProviderMutation.isPending}
```

---

## 📖 Interfaz ProductProviderDTO

```typescript
// En interfaces/types.ts

export interface ProductProviderDTO {
  codigo_producto: string;   // ID del producto
  cad_proveedor: string;     // ID del proveedor
  es_principal: boolean;     // ¿Es el proveedor principal?
}

export interface ProductProviderCreateDTO {
  codigo_producto: string;
  cad_proveedor: string;
  es_principal?: boolean;    // Default: false
}

export interface ProductProviderUpdateDTO {
  es_principal?: boolean;    // Solo actualizar si es principal
}
```

---

## 🔌 Hooks Utilizados

### useProviders(companyId)

```typescript
// Queries
useGetProviders()                    // Obtener lista
useGetProvidersByProduct(productId) // Relacionados con producto
useGetMainProvider(productId)       // Proveedor principal

// Mutations
useCreateProductProvider()    // Crear relación
useUpdateProductProvider()    // Actualizar relación
useSetMainProvider()          // Establecer como principal
useDeleteProductProvider()    // Eliminar relación
```

---

## 🎓 Tips y Buenas Prácticas

### ✅ Hacer
- Los cambios de proveedores se sincronizan automáticamente
- El proveedor principal solo puede ser uno de los seleccionados
- Si deseleccionas el proveedor principal, se elimina como principal
- Los proveedores son opcionales en nuevos productos

### ❌ No Hacer
- No esperar a guardar para sincronizar proveedores en Edit
- No permitir proveedor principal sin estar seleccionado
- No crear producto sin proveedores válidos (validacion en backend)

---

## 📞 Soporte

Si tienes problemas:

1. **No aparecen proveedores:**
   - Verifica que existan proveedores creados en la empresa
   - Mira la consola por errores de API

2. **No se guarda la relación:**
   - Revisa que el producto se haya creado exitosamente
   - Verifica permisos en el backend

3. **Error al cambiar principal:**
   - Asegúrate de que el proveedor esté seleccionado
   - Revisa la consola por errores de API

---

**¡La funcionalidad está lista para usar! 🎉**
