# taox-front

## Descripción General

`taox-front` es el componente frontend de la aplicación `taox`, desarrollado con Next.js y TypeScript. Este proyecto se enfoca en proporcionar una interfaz de usuario moderna y reactiva, consumiendo datos de la API de `taox_back`.

## Características Principales

*   **Interfaz de Usuario Reactiva:** Construida con React para una experiencia de usuario dinámica.
*   **Desarrollo con TypeScript:** Mejora la calidad del código y la detección temprana de errores.
*   **Next.js:** Framework de React para renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG), optimizando el rendimiento y SEO.
*   **Estilización con Tailwind CSS:** Facilita el desarrollo rápido de interfaces de usuario personalizadas y responsivas.
*   **Gestión de Estado:** (Si aplica, mencionar si se usa Redux, Context API, Zustand, etc.)

## Tecnologías Utilizadas

*   **Next.js**
*   **React**
*   **TypeScript**
*   **Tailwind CSS**
*   **@tanstack/react-query:** Para la gestión de datos asíncronos y caché.
*   **lucide-react:** Biblioteca de iconos.

## Instalación y Configuración

Para configurar y ejecutar el proyecto localmente, sigue los siguientes pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/CamilosolerB/taox-front.git
    cd taox-front
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o yarn install si usas yarn
    ```

3.  **Configurar variables de entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables (ejemplo):

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    # o yarn dev
    ```

    La aplicación estará disponible en `http://localhost:3000`.

## Uso

(Aquí se pueden añadir capturas de pantalla o descripciones de las principales funcionalidades de la interfaz de usuario.)

## Aprende Más

Para aprender más sobre Next.js, consulta los siguientes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - aprende sobre las características y la API de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.

También puedes consultar [el repositorio de Next.js en GitHub](https://github.com/vercel/next.js) - ¡tus comentarios y contribuciones son bienvenidos!

## Despliegue en Vercel

La forma más sencilla de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta nuestra [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
