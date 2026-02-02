function verificarYProteger(rolRequerido) {
    const usuarioRaw = localStorage.getItem('user');
    
    // Si no hay nadie logueado
    if (!usuarioRaw) {
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = 'login.html';
        }
        return;
    }

    const usuario = JSON.parse(usuarioRaw);

    // Si intenta entrar a una página que no es de su rol
    if (rolRequerido && usuario.role !== rolRequerido) {
        alert(`¡Epa! Como ${usuario.role} no podés entrar aquí.`);
        window.location.href = usuario.role === 'admin' ? 'dashboard-admin.html' : 'landing-user.html';
    }
}

// --- 2. LÓGICA DEL LOGIN (Solo para login.html) ---
async function iniciarSesion(email, password) {
    try {
        const resp = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
        const users = await resp.json();

        if (users.length > 0) {
            const user = users[0];
            localStorage.setItem('user', JSON.stringify(user));
            
            // Redirección inmediata según rol
            window.location.href = user.role === 'admin' ? 'dashboard-admin.html' : 'landing-user.html';
        } else {
            alert("Credenciales chuecas, parcero. Intente de nuevo.");
        }
    } catch (error) {
        console.error("Error conectando con el JSON Server:", error);
    }
}

// --- 3. INICIALIZACIÓN DE EVENTOS (Cuando carga el DOM) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Capturar el formulario de Login si existe en la página
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            iniciarSesion(email, pass);
        });
    }

    // Capturar el botón de Logout si existe en la página
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.clear();
            alert("¡Se fue! Sesión cerrada.");
            window.location.href = 'login.html';
        });
    }
});
