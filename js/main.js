/**
 * ===================================================================
 * KULT STUDIO - SE AGREGA LOGICA DE BASE DE DATOS DE LOS PRODUCTOS
 * ===================================================================
 */

const productosKult = [
    {
        id: 1,
        nombre: "NEO-TOKYO ACID WASH TEE",
        precio: 249000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Lavado Acid", "Blanco Puro", "Negro Gráfico"],
        imagen: "img/pay-thumb-1.jpg",
        sku: "KULT-04-A01"
    },
    {
        id: 2,
        nombre: "SYSTEM CRASH OVERSIZED TEE",
        precio: 239000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro Bridizana", "Grafito"],
        imagen: "img/pay-thumb-2.jpg",
        sku: "KULT-04-A03"
    },
    {
        id: 3,
        nombre: "SYSTEM OVERRIDE HEAVY TEE",
        precio: 229000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro Obsidiana"],
        imagen: "img/col-item-1.jpg",
        sku: "SKU-COL01"
    },
    {
        id: 4,
        nombre: "ACID LOGIC ARCHIVE TEE",
        precio: 219000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Blanco Tiza Natural"],
        imagen: "img/col-item-2.jpg",
        sku: "SKU-COL02"
    },
    {
        id: 5,
        nombre: "CYBER DISSOLUTION MINERAL TEE",
        precio: 249000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Gris Lavado Mineral"],
        imagen: "img/col-item-3.jpg",
        sku: "SKU-COL03"
    },
    {
        id: 6,
        nombre: "KULT MONOLITH CREST TEE",
        precio: 209000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro Obsidiana"],
        imagen: "img/col-item-4.jpg",
        sku: "SKU-COL04"
    },
    {
        id: 7,
        nombre: "MANIFESTO BACKPRINT 350G",
        precio: 269000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro Obsidiana", "Blanco Tiza"],
        imagen: "img/col-item-5.jpg",
        sku: "SKU-COL05"
    },
    {
        id: 8,
        nombre: "BINARY CODEX GRAVURE TEE",
        precio: 225000,
        tallas: ["S", "M", "L", "XL"],
        colores: ["Negro", "Grafito"],
        imagen: "img/col-item-6.jpg",
        sku: "SKU-COL06"
    }
];

console.log('■ Paso 1 completado: Base de datos oficial de KULT STUDIO cargada con', productosKult.length, 'productos.');

/**
 * ===================================================================
 * KULT STUDIO - SE RENDERIZAN PRODUCTOS EN EL CATÁLOGO
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el contenedor de la grilla de productos en tu HTML (ej. coleccion.html o index.html)
    const gridProductos = document.querySelector('.products-grid-3col') || document.querySelector('.product-grid');

    // Si no estamos en una página con grilla de productos, el script se detiene aquí sin errores
    if (!gridProductos) return;

    console.log('■ Paso 2: Renderizando productos reales en la pantalla...');

    // Limpiamos el contenedor por seguridad
    gridProductos.innerHTML = '';

    // Recorremos cada camisa de nuestra base de datos oficial
    productosKult.forEach(producto => {
        const article = document.createElement('article');
        article.classList.add('product-card');

        article.innerHTML = `
            <div class="card-img-wrap">
                <span class="card-badge highlight-badge">DROP 04 // 350 GSM</span>
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="card-overlay-bottom">
                    <span>${producto.sku}</span>
                    <span>STOCK: OK</span>
                </div>
            </div>
            <div class="card-info-box">
                <span class="prod-code">[${producto.sku}]</span>
                <h3 class="prod-title">${producto.nombre}</h3>
                <p class="prod-desc">Algodón orgánico peinado con serigrafía de alta densidad KULT.</p>
                <div class="prod-price-row">
                    <span class="price">$${producto.precio.toLocaleString('es-CO')} COP</span>
                    <a href="producto.html?id=${producto.id}" class="btn-primary">COMPRAR AHORA</a>
                </div>
            </div>
        `;

        gridProductos.appendChild(article);
    });

    console.log('■ Productos pintados exitosamente en el DOM.');
});