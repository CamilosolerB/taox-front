# 🎨 Guía de Instalación: Frontend (Interfaz Web)

¡Hola! Esta guía es exclusiva para poner a funcionar el **Frontend** (la parte visual que ves en el navegador). Para que se muestren datos, también necesitarás instalar y ejecutar el repositorio de Backend.

---

## 🛠️ Herramientas Necesarias

Antes de empezar, asegúrate de tener instalado:

### Node.js
*   **Descarga**: [Haz clic aquí para descargar Node.js](https://nodejs.org/en/download/prebuilt-installer) (Elige la versión **LTS**, que es la más estable).
*   **Instalación**: Sigue los pasos del instalador dándole a "Siguiente" en todo.

---

## 🚀 Pasos para la Instalación

1.  **Entra a la carpeta del proyecto**:
    Abre una terminal (CMD o PowerShell) en esta carpeta.
    
2.  **Instalar los paquetes de Node**:
    ```bash
    npm install
    ```
    *(Esto puede tardar unos minutos mientras se descargan las herramientas de diseño y React)*.

3.  **Configurar la conexión al Backend**:
    - Busca el archivo `.env.local.example` (o si ya hay un `.env`, úsalo).
    - Asegúrate de que la línea `NEXT_PUBLIC_API_URL` apunte a la dirección del backend.
    - Por defecto debería ser:
      `NEXT_PUBLIC_API_URL=http://localhost:8000`

---

## 🏃 Cómo Iniciar la Página Web

Para ver la aplicación en tu navegador, ejecuta:
```bash
npm run dev
```
Verás un mensaje que dice `Ready in...`. 

Ahora, abre tu navegador y entra a:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 Conexión con el Backend
**¡Importante!** Si entras a la página y no ves información o te da errores:
1. Asegúrate de haber instalado el repositorio de **Backend**.
2. Verifica que el servidor del Backend esté **encendido** (corriendo en el puerto 8000).
3. Sin el Backend, la interfaz web estará "vacía".
