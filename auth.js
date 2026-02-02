const loginForm = document.getElementById('loginForm');
const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
const users = await response.json();

if (users.length > 0) {
    alert("¡Bienvenido, mijo! Usted sí es quien dice ser.");

} else {
    alert("¡Ojo! Las credenciales no cuadran.");
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password,
        fechaIngreso: new Date().toLocaleString()
    };

    try {
 
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('¡Listo mijo! Datos guardados en el JSON.');
        } else {
            console.error('Hubo un visaje al guardar');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
});
