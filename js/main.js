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
 * KULT STUDIO - SE RENDERIZAN (PINTA) PRODUCTOS EN EL CATÁLOGO
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Buscamos el contenedor de la grilla de productos en el HTML (ej. coleccion.html o index.html)
    const gridProductos = document.querySelector('.products-grid-3col') || document.querySelector('.product-grid');

    // Si no estamos en una página con grilla de productos, el script se detiene aquí sin errores
    if (!gridProductos) return;

    console.log('■ Paso 2: Renderizando productos reales en la pantalla...');

    // Limpio el contenedor por seguridad
    gridProductos.innerHTML = '';

    // Recorre cada camisa de nuestra base de datos 
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
/**
 * ===================================================================
 * KULT STUDIO - FICHA DE PRODUCTO Y CARRITO
 * ===================================================================
 */

// Función auxiliar para actualizar el número de elementos en el header
function actualizarContadorCarritoGlobal() {
    const carrito = JSON.parse(localStorage.getItem('kult_cart')) || [];
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    // Buscamos el botón del carrito en el header 
    const btnCartHeader = document.querySelector('.btn-cart');
    if (btnCartHeader) {
        btnCartHeader.textContent = `CARRITO [${totalItems}]`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el contador apenas carga cualquier página
    actualizarContadorCarritoGlobal();

    const tituloProducto = document.querySelector('.prod-title-main');
    
    // Si no estamos en la página producto.html, este bloque se detiene aquí
    if (!tituloProducto) return;

    console.log('■ Paso 3: Inicializando ficha interactiva de producto...');

    // 1. Obtener el ID de la prenda desde la URL 
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get('id')) || 1; 

    // 2. Buscar la información real en nuestra base de datos
    const productoActual = productosKult.find(p => p.id === productoId) || productosKult[0];

    // 3. Pintar los datos reales del producto en el HTML
    tituloProducto.textContent = productoActual.nombre;
    
    const precioElem = document.querySelector('.big-price');
    if (precioElem) {
        precioElem.textContent = `$${productoActual.precio.toLocaleString('es-CO')} COP`;
    }

    const imgElem = document.querySelector('.prod-main-img-wrap img');
    if (imgElem) {
        imgElem.src = productoActual.imagen;
        imgElem.alt = productoActual.nombre;
    }

    // 4. Selección Interactiva de Tallas
    const botonesTalla = document.querySelectorAll('.size-btn');
    let tallaSeleccionada = 'L'; // Talla por defecto

    botonesTalla.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            botonesTalla.forEach(b => b.classList.remove('active-size'));
            btn.classList.add('active-size');
            tallaSeleccionada = btn.textContent.trim();
        });
    });

    // 5. Selección Interactiva de Colores
    const opcionesColor = document.querySelectorAll('.color-opt');
    let colorSeleccionado = productoActual.colores[0]; // Color por defecto

    opcionesColor.forEach(opt => {
        opt.addEventListener('click', () => {
            opcionesColor.forEach(o => o.classList.remove('active-color'));
            opt.classList.add('active-color');
            const textoColor = opt.querySelector('span:last-child');
            if (textoColor) {
                colorSeleccionado = textoColor.textContent.trim();
            }
        });
    });

    // 6. Programar el botón "Añadir al Carrito"
    const btnAnadir = document.querySelector('.btn-add-cart');
    if (btnAnadir) {
        btnAnadir.addEventListener('click', (e) => {
            e.preventDefault();

            // Guardar la elección exacta del usuario
            const itemComprado = {
                id: productoActual.id,
                nombre: productoActual.nombre,
                precio: productoActual.precio,
                talla: tallaSeleccionada,
                color: colorSeleccionado,
                imagen: productoActual.imagen,
                cantidad: 1
            };

            // Guardar en la memoria local (LocalStorage)
            let carrito = JSON.parse(localStorage.getItem('kult_cart')) || [];

            const indexExistente = carrito.findIndex(
                item => item.id === itemComprado.id && item.talla === itemComprado.talla && item.color === itemComprado.color
            );

            if (indexExistente >= 0) {
                carrito[indexExistente].cantidad += 1;
            } else {
                carrito.push(itemComprado);
            }

            localStorage.setItem('kult_cart', JSON.stringify(carrito));

            // Actualizar el número del carrito en el header de inmediato
            actualizarContadorCarritoGlobal();

            // Mensaje de confirmación visual
            alert(`✔ ¡Prenda añadida con éxito!\n\n• ${productoActual.nombre}\n• Talla: ${tallaSeleccionada}\n• Color: ${colorSeleccionado}\n• Precio: $${productoActual.precio.toLocaleString('es-CO')} COP`);
        });
    }
});
/**
 * ===================================================================
 * KULT STUDIO - MÓDULO A: BUSCADOR EN TIEMPO REAL Y LIMPIAR FILTROS
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Buscador en tiempo real (Header superior)
    // Buscamos el input de búsqueda por su clase o selector aproximado
    const inputBuscador = document.querySelector('input[type="text"]') || document.querySelector('.search-input');
    const gridProductos = document.querySelector('.products-grid-3col') || document.querySelector('.product-grid');

    if (inputBuscador && gridProductos) {
        inputBuscador.addEventListener('input', (e) => {
            const textoBusqueda = e.target.value.toLowerCase().trim();

            // Filtramos los productos que coincidan con el nombre o el SKU
            const productosFiltrados = productosKult.filter(producto => 
                producto.nombre.toLowerCase().includes(textoBusqueda) ||
                producto.sku.toLowerCase().includes(textoBusqueda)
            );

            // Volvemos a pintar la grilla con los resultados filtrados
            renderizarGrillaProductos(productosFiltrados);
        });
    }

    // 2. Lógica del Botón [LIMPIAR] en el menú lateral de filtros
    const btnLimpiar = document.querySelector('.btn-clear') || document.querySelector('.clear-filters-btn');
    
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Limpiar el input de búsqueda si existe
            if (inputBuscador) inputBuscador.value = '';

            // Desmarcar todos los checkboxes de la barra lateral
            document.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);

            // Quitar selecciones activas de tallas o colores
            document.querySelectorAll('.size-btn, .color-opt').forEach(el => el.classList.remove('active-size', 'active-color'));

            // Restaurar todos los productos originales en la pantalla
            renderizarGrillaProductos(productosKult);

            console.log('■ Filtros restablecidos. Mostrando catálogo completo.');
        });
    }
});

/**
 * Función auxiliar para reutilizar el pintado de la grilla
 */
function renderizarGrillaProductos(listaProductos) {
    const gridProductos = document.querySelector('.products-grid-3col') || document.querySelector('.product-grid');
    if (!gridProductos) return;

    gridProductos.innerHTML = '';

    if (listaProductos.length === 0) {
        gridProductos.innerHTML = `<p style="color: #fff; grid-column: 1 / -1; padding: 2rem; text-align: center;">[!] NO SE ENCONTRARON PRENDAS CON ESTOS CRITERIOS.</p>`;
        return;
    }

    listaProductos.forEach(producto => {
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
}