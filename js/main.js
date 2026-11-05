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
/**
 * ===================================================================
 * KULT STUDIO - MÓDULO B: FILTRADO DINÁMICO POR MENÚ LATERAL
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Detectar cambios en cualquier checkbox del sistema de filtros lateral
    const filtrosSidebar = document.querySelectorAll('.sidebar-filters input[type="checkbox"], aside input[type="checkbox"], .filter-sidebar input[type="checkbox"]');
    
    // 2. Detectar clics en los botones de tallas dentro del panel lateral de filtros
    const botonesTallaFiltro = document.querySelectorAll('.sidebar-filters .size-btn, .sidebar-filters .filter-size');

    // Función principal que recopila todos los filtros activos y filtra la grilla
    function aplicarFiltrosAvanzados() {
        // Obtener todos los checkboxes marcados y extraer sus textos asociados o valores
        const checkboxesMarcados = document.querySelectorAll('.sidebar-filters input[type="checkbox"]:checked, aside input[type="checkbox"]:checked');
        const criteriosTexto = Array.from(checkboxesMarcados).map(chk => {
            // Intentamos obtener el texto de la etiqueta adyacente o el valor
            const label = chk.closest('label') || chk.nextElementSibling;
            return label ? label.textContent.trim().toLowerCase() : '';
        });

        // Obtener las tallas seleccionadas en los botones del filtro lateral
        const tallasSeleccionadas = Array.from(document.querySelectorAll('.sidebar-filters .size-btn.active, .sidebar-filters .active-size'))
            .map(btn => btn.textContent.trim().toUpperCase());

        // Si no hay ningún filtro seleccionado, mostramos todos los productos
        if (criteriosTexto.length === 0 && tallasSeleccionadas.length === 0) {
            renderizarGrillaProductos(productosKult);
            return;
        }

        // Filtrar la base de datos de productos según los criterios activos
        const productosFiltrados = productosKult.filter(producto => {
            // Evaluamos si el producto coincide con los textos de los filtros (por nombre, desc o SKU)
            let coincideTexto = criteriosTexto.length === 0 || criteriosTexto.some(criterio => 
                producto.nombre.toLowerCase().includes(criterio) || 
                producto.sku.toLowerCase().includes(criterio) ||
                (producto.corte && producto.corte.toLowerCase().includes(criterio)) ||
                (producto.gramaje && producto.gramaje.toLowerCase().includes(criterio))
            );

            // Evaluamos si coincide con las tallas (si el producto tiene array de tallas)
            let coincideTalla = tallasSeleccionadas.length === 0 || (
                producto.tallas && producto.tallas.some(t => tallasSeleccionadas.includes(t))
            );

            return coincideTexto && coincideTalla;
        });

        // Renderizamos los resultados filtrados en la pantalla
        renderizarGrillaProductos(productosFiltrados);
        console.log('■ Filtros avanzados aplicados. Coincidencias:', productosFiltrados.length);
    }

    // Escuchar eventos en checkboxes
    if (filtrosSidebar.length > 0) {
        filtrosSidebar.forEach(chk => {
            chk.addEventListener('change', aplicarFiltrosAvanzados);
        });
    }

    // Escuchar clics en los botones de tallas del filtro lateral (con toggle de clase active)
    if (botonesTallaFiltro.length > 0) {
        botonesTallaFiltro.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                btn.classList.toggle('active-size');
                btn.classList.toggle('active');
                aplicarFiltrosAvanzados();
            });
        });
    }
});
/**
 * ==============================================
 * KULT STUDIO - CORRECCIÓN ESPECÍFICA: [LIMPIAR] 
 * ==============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Quitar la selección por defecto de M y L al cargar la página si vienen marcadas desde el HTML
    const botonesTallaFiltro = document.querySelectorAll('.sidebar-filters button, .sidebar-filters .size-btn, aside button');
    
    botonesTallaFiltro.forEach(btn => {
        const textoTalla = btn.textContent.trim().toUpperCase();
        // Si el HTML trae M o L activas por defecto, se las retiramos para que inicie limpio
        if (textoTalla === 'M' || textoTalla === 'L') {
            btn.classList.remove('active', 'active-size', 'selected');
        }

        // Asegurar que al hacer clic en cualquier talla del filtro lateral se pueda alternar
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.classList.toggle('active');
            btn.classList.toggle('active-size');
        });
    });

    // 2. Hacer funcionar exclusivamente el botón [LIMPIAR]
    let btnLimpiarReal = null;
    document.querySelectorAll('a, button, span, div').forEach(el => {
        if (el.textContent.trim() === '[LIMPIAR]' || el.textContent.trim() === 'LIMPIAR') {
            btnLimpiarReal = el;
        }
    });

    if (btnLimpiarReal) {
        btnLimpiarReal.style.cursor = 'pointer';
        btnLimpiarReal.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Limpiar buscador si existe
            const inputBuscador = document.querySelector('input[type="text"], .search-input');
            if (inputBuscador) inputBuscador.value = '';

            // Desmarcar todos los checkboxes de los filtros
            document.querySelectorAll('input[type="checkbox"]').forEach(chk => chk.checked = false);

            // Quitar clases activas de todas las tallas
            botonesTallaFiltro.forEach(btn => btn.classList.remove('active', 'active-size', 'selected'));

            // Restaurar la grilla completa con todos los productos originales
            if (typeof renderizarGrillaProductos === 'function' && typeof productosKult !== 'undefined') {
                renderizarGrillaProductos(productosKult);
            }

            console.log('■ Botón [LIMPIAR] ejecutado correctamente.');
        });
    }
});
/**
 * ===================================================================
 * KULT STUDIO - INTERACTIVIDAD Y FILTRADO POR TALLAS (SZ-BOX)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const botonesTalla = document.querySelectorAll('.sidebar-filters .sz-box');

    botonesTalla.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Alterna el estado visual (activa o desactiva el color amarillo de la talla)
            btn.classList.toggle('active-sz');

            // 2. Ejecuta el motor de filtrado global para actualizar la grilla de productos
            aplicarFiltrosY1Tallas();
        });
    });
});

// Función centralizada para filtrar la grilla combinando checkboxes y tallas
function aplicarFiltrosY1Tallas() {
    // Obtener todas las tallas que el usuario tenga seleccionadas en ese momento
    const tallasSeleccionadas = Array.from(document.querySelectorAll('.sidebar-filters .sz-box.active-sz'))
        .map(btn => btn.textContent.trim().toUpperCase());

    // Obtener los checkboxes activos del menú lateral
    const checkboxesMarcados = document.querySelectorAll('.sidebar-filters input[type="checkbox"]:checked');
    const criteriosTexto = Array.from(checkboxesMarcados).map(chk => {
        const label = chk.closest('label');
        return label ? label.textContent.trim().toLowerCase() : '';
    });

    // Si no hay ningún filtro ni talla seleccionada, mostramos todos los productos originales
    if (tallasSeleccionadas.length === 0 && criteriosTexto.length === 0) {
        if (typeof renderizarGrillaProductos === 'function' && typeof productosKult !== 'undefined') {
            renderizarGrillaProductos(productosKult);
        }
        return;
    }

    // Filtrar la base de datos 'productosKult'
    const productosFiltrados = productosKult.filter(producto => {
        let coincideTexto = criteriosTexto.length === 0 || criteriosTexto.some(criterio => 
            producto.nombre.toLowerCase().includes(criterio) || 
            producto.sku.toLowerCase().includes(criterio)
        );

        // Si tu objeto producto tiene un array de tallas (ej: tallas: ['S', 'M', 'L']), las evalúa. 
        // Si no las tiene definidas aún, por defecto dejará pasar el filtro visualmente para evitar que la grilla quede en blanco.
        let coincideTalla = tallasSeleccionadas.length === 0 || (
            producto.tallas ? producto.tallas.some(t => tallasSeleccionadas.includes(t)) : true
        );

        return coincideTexto && coincideTalla;
    });

    // Redibujar la grilla con los resultados obtenidos
    if (typeof renderizarGrillaProductos === 'function') {
        renderizarGrillaProductos(productosFiltrados);
    }
}
/**
 * ===================================================================
 * KULT STUDIO - MÓDULO C: CARGAR MÁS INVENTARIO Y NEWSLETTER
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del botón "CARGAR MÁS CAMISETAS"
    const btnCargarMas = document.querySelector('.load-more-btn');
    const barraProgreso = document.querySelector('.lm-fill');
    const infoProgreso = document.querySelector('.lm-info-row span');

    if (btnCargarMas) {
        btnCargarMas.addEventListener('click', (e) => {
            e.preventDefault();

            // Simular la carga del 100% del inventario
            if (barraProgreso) {
                barraProgreso.style.width = '100%';
            }
            
            if (infoProgreso) {
                infoProgreso.textContent = 'MOSTRANDO 24 DE 24 PRODUCTOS DISPONIBLES • 100% COMPLETADO';
            }
            
            // Actualizar el estado visual del botón para indicar que ya se cargó todo
            btnCargarMas.textContent = '■ TODO EL INVENTARIO CARGADO';
            btnCargarMas.style.opacity = '0.5';
            btnCargarMas.style.pointerEvents = 'none';

            console.log('■ Inventario total de coleccion cargado exitosamente.');
        });
    }

    // 2. Lógica del formulario de suscripción (SUBSCRIBE TO DROP 05)
    const formNewsletter = document.querySelector('.news-banner-form');
    const inputNewsletter = document.querySelector('.news-input');

    if (formNewsletter && inputNewsletter) {
        formNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = inputNewsletter.value.trim();

            if (email !== '') {
                // Alerta de confirmación de registro al estilo KULT
                alert(`✔ ¡ACCESO CONCEDIDO!\n\nEl correo [ ${email} ] ha sido registrado exitosamente. Recibirás tus llaves criptográficas 15 minutos antes del lanzamiento global del DROP 05.`);
                inputNewsletter.value = ''; // Limpiar el campo
            } else {
                alert('[!] Por favor ingresa un identificador de correo válido.');
            }
        });
    }
});