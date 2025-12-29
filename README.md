<table width="100%" align="center">
  <tr>
    <td align="center" valign="middle">
      <h1>☕️ Cafetería - Full Stack Real-Time</h1>
      <p><b>Sincronización total entre Cliente, Cocina y Administración</b></p>
      <hr width="50%" />
      <p>Next.js 14 | Prisma ORM | SWR | Zustand | Tailwind CSS</p>
    </td>
  </tr>
</table>

## Visión General

Este sistema es una solución integral para la automatización de pedidos en restaurantes. A diferencia de un sitio e-commerce tradicional, este proyecto resuelve el flujo operativo completo: desde la selección táctil por el cliente, hasta el despacho en cocina y la gestión de inventario por el administrador, todo operando bajo una única fuente de verdad.

## Arquitectura de Interfaces

La aplicación se segmenta en tres ecosistemas dinámicos que comparten la misma lógica de negocio:

1.  **Quiosco de Pedidos (Client-Side):** Interfaz optimizada para pantallas táctiles donde el usuario navega por categorías, personaliza su orden y confirma el pedido.
2.  **Panel de Cocina (Staff):** Un dashboard operativo que recibe comandas en tiempo real, permitiendo al personal marcar órdenes listas con un solo clic.
3.  **Administración (Management):** Panel protegido para la gestión CRUD de productos, edición de precios e imágenes, y visualización de ventas.

---

## Stack Tecnológico y Justificación Técnica

| Tecnología | Implementación y Justificación en el Proyecto |
| :--- | :--- |
| **Next.js 14 (App Router)** | Elegido para unificar el Frontend y el Backend. Utilizo **Server Components** para la carga inicial ultrarrápida de categorías y **Client Components** para la interactividad del carrito de compras. |
| **Prisma ORM** | Implementado para garantizar un tipado estricto (**Type-Safety**) entre la DB de PostgreSQL y el código. Facilita las consultas complejas de relaciones (Categoría ↔ Producto ↔ Orden) sin escribir SQL manual propenso a errores. |
| **SWR (Stale-While-Revalidate)** | Crucial para la experiencia de **"Tiempo Real"**. Lo utilicé en el Panel de Cocina para realizar un polling inteligente, manteniendo las comandas actualizadas sin necesidad de la complejidad de WebSockets. |
| **Zustand** | Seleccionado por encima de Redux o Context API por su ligereza. Gestiona el estado global del carrito, permitiendo cálculos de totales y validaciones de stock de forma instantánea en el navegador. |
| **Tailwind CSS** | Utilizado para un diseño **Mobile-First**. La justificación fue la velocidad de desarrollo y la capacidad de crear una interfaz limpia que no distraiga al cliente durante el proceso de compra. |
| **Cloudinary** | Integrado para la gestión de medios. Automatiza la optimización y el redimensionado de las imágenes del menú, mejorando drásticamente el rendimiento (Lighthouse score) de la plataforma. |

---

## Desafíos Técnicos Resueltos

### 1. Integración de API Routes y Validaciones
Implementé rutas de API en Next.js para procesar los pedidos. El desafío fue asegurar que cada orden enviada cumpliera con el esquema de datos correcto; para ello, utilicé **Zod** para validar la integridad de la información antes de que Prisma la inserte en la base de datos.

### 2. Gestión de Estado Persistente
Para evitar que el usuario pierda su pedido si recarga la página accidentalmente en el quiosco, optimicé el store de **Zustand** para mantener la persistencia necesaria durante la sesión de compra, garantizando una UX fluida.

### 3. Escalabilidad de Datos
La estructura de la base de datos fue diseñada para ser escalable. Mediante Prisma, se crearon relaciones que permiten al administrador cambiar una categoría de lugar o actualizar un precio, y que este cambio se refleje instantáneamente en todas las interfaces sin discrepancias.