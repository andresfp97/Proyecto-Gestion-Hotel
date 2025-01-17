
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const mobileLoginBtn = document.getElementById('mobile-login-btn');
const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

export let sesionActiva = localStorage.getItem('usuario') !== null;

export function actualizarEstado(valor) {
    sesionActiva = valor;
}

 export function actualizarSesion() {
    
    if (sesionActiva) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        mobileLoginBtn.classList.add('hidden');
        mobileLogoutBtn.classList.remove('hidden');
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        mobileLoginBtn.classList.remove('hidden');
        mobileLogoutBtn.classList.add('hidden');
    }
}

logoutBtn.addEventListener('click', () => {
    sesionActiva = false;
    localStorage.removeItem('usuario');
    actualizarSesion();
    alert('Sesión cerrada correctamente');
});

actualizarSesion();