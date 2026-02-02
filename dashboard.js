async function cargarPedidos() {
    const contenedor = document.getElementById('contenedor-pedidos');
    if (!contenedor) return;

    try {
        const resp = await fetch('http://localhost:3000/orders');
        const pedidos = await resp.json();
        
        contenedor.innerHTML = '';
        pedidos.forEach(pedido => {
            contenedor.innerHTML += `
                <div class="card-pedido">
                    <h4>Orden #${pedido.id} - ${pedido.cliente}</h4>
                    <p>Total: $${pedido.total} | Estado actual: <strong>${pedido.estado}</strong></p>
                    <select onchange="cambiarEstado(${pedido.id}, this.value)">
                        <option value="pendiente" ${pedido.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                        <option value="en preparacion" ${pedido.estado === 'en preparacion' ? 'selected' : ''}>En preparación</option>
                        <option value="saliendo" ${pedido.estado === 'saliendo' ? 'selected' : ''}>Saliendo</option>
                        <option value="entregado" ${pedido.estado === 'entregado' ? 'selected' : ''}>Entregado</option>
                        <option value="cancelado" ${pedido.estado === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                    </select>
                </div>
            `;
        });
    } catch (error) { console.error("Error cargando pedidos:", error); }
}

async function cambiarEstado(id, nuevoEstado) {
    try {
        await fetch(`http://localhost:3000/orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: nuevoEstado })
        });
        alert("Estado actualizado, ¡brevísimo!");
        cargarPedidos(); // Recargamos la lista
    } catch (error) { console.error("Error al actualizar estado:", error); }
}

// --- 5. EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    // Botón Ordenar
    const btnOrdenar = document.getElementById('btnOrdenar');
    if (btnOrdenar) btnOrdenar.addEventListener('click', crearPedido);

    // Botones de agregar productos
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-agregar')) {
            const b = e.target;
            agregarAlCarrito({
                id: b.dataset.id,
                nombre: b.dataset.nombre,
                precio: parseFloat(b.dataset.precio)
            });
        }
    });

    // Si estamos en el dashboard, cargamos los pedidos automáticamente
    if (window.location.pathname.includes('dashboard-admin.html')) {
        verificarYProteger('admin');
        cargarPedidos();
    }
});
