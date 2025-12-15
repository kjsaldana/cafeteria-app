# ☕ Sistema de Gestión para Cafetería (Full Stack)

Una solución integral diseñada para automatizar y sincronizar el flujo de trabajo en un restaurante. Desde la toma de pedidos por parte del cliente hasta la gestión en cocina y la administración de inventario, todo conectado en tiempo real.

## Arquitectura del Proyecto

El sistema se divide en cuatro interfaces interconectadas que comparten una misma base de datos:

1. **Kiosco de Pedidos (Cliente):** Interfaz pública donde los usuarios arman su pedido. Cuenta con un carrito de compras dinámico y validación de órdenes.
2. **Panel de Cocina (Personal):** Dashboard en tiempo real que recibe las comandas entrantes. Permite al personal cambiar el estado de las órdenes a "Listas".
3. **Monitor de Entregas (Cliente):** Pantalla informativa que se actualiza automáticamente para mostrar a los clientes cuándo recoger su pedido.
4. **Panel de Administración (Manager):** CRUD completo y seguro para gestionar el menú (productos, categorías, precios) y subir imágenes.

---

## Stack Tecnológico y Decisiones Técnicas

Este proyecto utiliza **Next.js** como núcleo, aprovechando sus capacidades full-stack para eliminar la necesidad de un backend separado.

| Tecnología | Implementación y Justificación en el Proyecto |
| :--- | :--- |
| **Next.js (App Router)** | Orquesta la aplicación completa. Utilizo **Server Components** para consultas seguras y rápidas a la DB en el admin, y **Client Components** para la interactividad del kiosco. |
| **Prisma ORM** | Elegido para asegurar **type-safety** (seguridad de tipos) desde la base de datos hasta el frontend. Simplifica las relaciones complejas (Categoría -> Producto -> Orden) y agiliza las migraciones en PostgreSQL. |
| **SWR** | Implementado para lograr una experiencia de **"Tiempo Real"** mediante *polling* inteligente y revalidación en segundo plano. Mantiene sincronizadas las pantallas de Cocina y Clientes sin la sobrecarga de infraestructura de WebSockets. |
| **Zustand** | Gestiona el estado global del **Carrito de Compras**. Se eligió por su ligereza frente a Redux/Context, facilitando la lógica de añadir/eliminar items y calcular totales dinámicamente en el cliente. |
| **Zod** | Capa de seguridad e integridad. Se utiliza para validar los esquemas de datos tanto en el frontend (formularios) como en el backend, evitando que datos corruptos lleguen a la base de datos. |
| **Next-Cloudinary** | Solución para la gestión de medios. Externaliza el almacenamiento y realiza **optimización automática** de las imágenes al subirlas, mejorando drásticamente el rendimiento y los tiempos de carga. |
| **React-Toastify** | Mejora la **Experiencia de Usuario (UX)** proporcionando feedback visual inmediato y no intrusivo ante acciones asíncronas (ej: confirmación de pedido o errores de validación). |
