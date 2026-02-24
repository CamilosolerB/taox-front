# Integración de endpoints TAOX API

## Token de sesión (webhook / login)

El **token JWT** se obtiene al hacer **POST /auth/login** (no hay webhook aparte en el spec; el login actúa como “generador” de sesión). Al responder, el backend devuelve `TokenDTO` con `access_token`. El front:

- Guarda el token en **localStorage** con la clave `taox_access_token` (`lib/auth.ts`).
- En cada petición, **waterApi** añade el header `Authorization: Bearer <access_token>` (interceptor en `api/waterApi.ts`).
- Si la API responde **401**, se borra el token y se redirige a `/login`.

Configuración de la API: `NEXT_PUBLIC_API_URL` (por defecto `http://localhost:8000`).

---

## Endpoints integrados (llamadas + hooks)

| Recurso      | Endpoints usados                    | Hook / uso |
|-------------|-------------------------------------|------------|
| **Auth**    | POST /auth/login, GET /auth/me     | `useAuth`, `useAuthHook`, login form, AuthProvider |
| **Users**   | GET/POST /users/, GET/PUT/DELETE /users/{id} | `useUsers`; página usuarios usa lista + delete |
| **Roles**   | GET /roles/, GET/PUT/DELETE /roles/{id}      | `useRoles` (lista para mapear nombres en usuarios) |
| **Companies** | GET/POST /companies/, GET/PUT/DELETE /companies/{id} | API en `api/endpoints/companies.ts` (sin hook de UI aún) |
| **Products**  | GET /products/, GET by-id, by-company, POST, PUT, DELETE | `useInventory(companyId)` |
| **Providers** | GET/POST /providers, GET/PUT/DELETE /providers/{id} (query company_id) | `useProviders(companyId)` |
| **Locations** | GET/POST /locations, GET/PUT/DELETE /locations/{id} (query company_id) | `useLocations(companyId)` |
| **Stock**    | stock-locations, stock-warehouse, increment/decrement | `useStock(companyId)` |
| **Clients**  | GET/POST /clients, GET/PUT/DELETE /clients/{id}, GET by city | `useClients(companyId)` |
| **Product-Providers** | GET/POST, by-product, by-provider, main, PUT, DELETE, set-main | API en `api/endpoints/productProviders.ts` (sin hook de UI aún) |

Los hooks que reciben `companyId` deben usar `useAuth().companyId` (tras el login, se rellena con GET /auth/me).

---

## Endpoints NO integrados (o integración parcial) y por qué

### 1. **Movimientos (historial de movimientos)**

- **Estado:** No existe en la TAOX API actual.
- **Motivo:** En el OpenAPI no hay rutas tipo `/movements` o `/stock-movements`. El hook `useMovements` está preparado pero devuelve datos vacíos y las mutaciones lanzan “API no disponible”.
- **Qué falta:** Definir en el backend endpoints de movimientos (por ejemplo GET list, POST crear) y luego conectar el mismo hook a esas rutas.

### 2. **Auth: registro y validación de token**

- **POST /auth/register**  
  - **Estado:** Llamada implementada en `api/endpoints/auth.ts` (y tipos en `api/types.ts`).  
  - **No integrado en UI:** No hay pantalla de registro; no hay formulario que use este endpoint.
- **POST /auth/validate-token**  
  - **Estado:** Función en `api/endpoints/auth.ts`.  
  - **Uso posible:** Comprobar si el token sigue válido (por ejemplo al cargar la app). No está enlazado a ningún flujo todavía.

### 3. **Companies (empresas)**

- **Estado:** CRUD en `api/endpoints/companies.ts`. No hay hook de página ni formularios.
- **Motivo:** Falta una pantalla “Empresas” (lista, crear, editar) que use estos endpoints. El `company_id` del usuario viene de /auth/me, no de un selector de empresa en la UI.

### 4. **Product-Providers (relación producto–proveedor)**

- **Estado:** Todas las rutas en `api/endpoints/productProviders.ts`. No hay hook ni pantallas que las usen.
- **Motivo:** Falta flujo de UI: pantalla o modal para asignar proveedores a productos, marcar proveedor principal, etc.

### 5. **Formularios pendientes de conectar**

- **Crear/Editar usuario:** La página de usuarios ya usa `useUsers` (lista + delete). Faltan formularios (modal o página) para crear (CreateUserDTO) y editar (UpdateUserDTO) y enlazarlos a POST /users/ y PUT /users/{id}.
- **Crear/Editar proveedor:** Faltan formularios que usen `useProviders` (CreateProvider, UpdateProvider).
- **Crear/Editar cliente:** Faltan formularios que usen `useClients` (CreateClient, UpdateClient).
- **Crear/Editar ubicación:** Faltan formularios que usen `useLocations` (CreateLocation, UpdateLocation).
- **Crear/Editar producto:** Faltan formularios que usen `useInventory` (CreateProduct, UpdateProduct).
- **Roles:** GET/POST/PUT/DELETE en API y `useRoles`; no hay pantalla de administración de roles ni formularios.
- **Stock:** increment/decrement y crear/actualizar stock están en `useStock`; falta UI (botones o formularios) que los llamen.

### 6. **Páginas que siguen con datos mock**

- **Inventario:** Componentes listos; falta que la página use `useInventory(companyId).useGetProducts()` y mapee ProductDTO a la forma de la tabla, y formularios de alta/edición.
- **Proveedores:** Falta usar `useProviders(companyId).useGetProviders()` y formularios de alta/edición.
- **Ubicaciones:** Falta usar `useLocations(companyId).useGetLocations()` en la página y formularios.
- **Movimientos:** Sigue con datos mock porque no hay API de movimientos.

---

## Resumen: lista de lo que falta por integrar

| Qué falta | Motivo |
|-----------|--------|
| **Movimientos (API)** | No existen endpoints en el spec; el hook está preparado para cuando existan. |
| **Formulario registro** | POST /auth/register existe; no hay pantalla de registro. |
| **Uso de validate-token** | Llamada implementada; no hay flujo (ej. al iniciar app) que la use. |
| **Pantalla Companies** | CRUD en API; no hay página ni formularios. |
| **Pantalla Product-Providers** | API lista; no hay UI para relaciones producto–proveedor. |
| **Formularios Usuario** | Crear y editar usuario (POST/PUT users) no conectados a modales/páginas. |
| **Formularios Proveedor/Cliente/Location/Producto** | Hooks y API listos; faltan formularios y enlace en las páginas. |
| **Pantalla Roles** | API y useRoles listos; falta página de administración de roles. |
| **UI de stock** | useStock con increment/decrement y CRUD; falta botones/formularios que los llamen. |
| **Inventario/Proveedores/Locations con datos reales** | Sustituir mock por `useInventory`/`useProviders`/`useLocations` y paginación si aplica. |

---

## Cómo seguir

1. **Token:** Ya almacenado tras login; no hace falta webhook adicional si el backend solo entrega token vía POST /auth/login.
2. **Proteger rutas:** En layout o en cada página de `/company/*`, comprobar `useAuth().isAuthenticated` y redirigir a `/login` si no hay token.
3. **Formularios:** Crear modales o páginas para cada recurso (usuario, proveedor, cliente, ubicación, producto, rol) y usar los hooks existentes (mutations) para enviar a la API.
4. **Movimientos:** Cuando el backend exponga endpoints, actualizar `useMovements` para llamarlos y quitar el mock en la página de movimientos.
