const btnLogout = document.getElementById('btnLogout');
function verificarSesion() {
    const usuarioLogueado = localStorage.getItem('user');

    if (!usuarioLogueado) {
        // Si no hay nadie, ¡pa' fuera!
        alert("¡Epa! Usted no se ha identificado. Prohibido el paso.");
        window.location.href = 'login.html';
    }
}


btnLogout.addEventListener('click', () => {
    // 1. Borramos los datos del usuario que guardamos antes
    localStorage.removeItem('user'); 
    
    // Si guardaste un token o más cosas, podés usar:
    // localStorage.clear(); // Esto borra TODO lo que haya en el storage

    alert("¡Listo mijo! Sesión cerrada. ¡Vuelva pronto!");

    // 2. Lo mandamos soplado para el index o el login
    window.location.href = 'index.html'; 
});

// La ejecutamos apenas cargue la página
verificarSesion();
