
    const slider = document.getElementById('slider');
    const diapositivas = slider.children;
    const totalDiapositivas = diapositivas.length;
    const botonAnterior = document.getElementById('anterior');
    const botonSiguiente = document.getElementById('siguiente');

    let indiceActual = 0;

    // Función para actualizar la posición del slider
    function actualizarSlider() {
        slider.style.transform = `translateX(-${indiceActual * 100}%)`;
    }

    // Siguiente diapositiva
    botonSiguiente.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % totalDiapositivas;
        actualizarSlider();
    });

    // Diapositiva anterior
    botonAnterior.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + totalDiapositivas) % totalDiapositivas;
        actualizarSlider();
    });

    // Cambio automático de diapositivas cada 3 segundos
    setInterval(() => {
        indiceActual = (indiceActual + 1) % totalDiapositivas;
        actualizarSlider();
    }, 3000);
