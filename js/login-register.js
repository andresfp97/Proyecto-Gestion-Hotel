const tabLogin = document.getElementById('tab-login');
const tabRegistro = document.getElementById('tab-register');
const iniciarFormulario = document.getElementById('login-form');
const registroFormulario = document.getElementById('register-form');

tabLogin.addEventListener('click', () => {
    iniciarFormulario.classList.remove('hidden');
    registroFormulario.classList.add('hidden');
    tabLogin.classList.add('border-blue-600', 'font-bold');
    tabRegistro.classList.remove('border-blue-600', 'font-bold');
});

tabRegistro.addEventListener('click', () => {
    registroFormulario.classList.remove('hidden');
    iniciarFormulario.classList.add('hidden');
    tabRegistro.classList.add('border-blue-600', 'font-bold');
    tabLogin.classList.remove('border-blue-600', 'font-bold');
});

registroFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('registro-nombre').value;
    const correo = document.getElementById('registro-correo').value;
    const contrasena = document.getElementById('registro-contrasena').value;
    const telefono = document.getElementById('registro-telefono').value;
    const reserva = [];


    try {
        const respuesta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, contrasena, telefono, reserva })
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar usuario');
        }

        const data = await respuesta.json();
        alert('Usuario registrado correctamente');
        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
});
 iniciarFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('login-correo').value;
    const contrasena = document.getElementById('login-contrasena').value;

    try {
        const respuesta = await fetch('http://localhost:3000/usuarios');
        if (!respuesta.ok) {
            throw new Error('Error al obtener los usuarios');
        }

        const data = await respuesta.json();
        const usuario = data.find((usuario) => usuario.correo === correo && usuario.contrasena === contrasena);
        localStorage.setItem('usuario', JSON.stringify(usuario.nombre));

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        window.location.href = 'habitaciones.html';
    } catch (error) {
        console.log(error);
    } });