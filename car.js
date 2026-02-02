// --- 4. LÓGICA DEL CARRITO DE COMPRAS ---

// 1. Obtener el carrito del storage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(producto) {
    // Revisar si el producto ya está en el carrito
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        existe.cantidad++; // Si ya está, sumamos uno
    } else {
        carrito.push({ ...producto, cantidad: 1 }); // Si es nuevo, lo agregamos con cantidad 1
    }

    // Guardamos los cambios en el LocalStorage
    guardarCarrito();
    alert(`¡Listo! ${producto.nombre} agregado al carrito.`);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log("Carrito actualizado:", carrito);
}

// --- Escuchar los clicks en los botones de agregar ---
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const boton = e.target;
        const nuevoProducto = {
            id: boton.getAttribute('data-id'),
            nombre: boton.getAttribute('data-nombre'),
            precio: parseFloat(boton.getAttribute('data-precio'))
        };
        
        agregarAlCarrito(nuevoProducto);
    }
});

function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito'); // Un <ul> o <div> en su HTML
    if (!listaCarrito) return;

    listaCarrito.innerHTML = ''; // Limpiamos antes de pintar
    
    carrito.forEach(item => {
        listaCarrito.innerHTML += `
            <li>
                ${item.nombre} - $${item.precio} x ${item.cantidad} 
                = $${item.precio * item.cantidad}
            </li>
        `;
    });
}
