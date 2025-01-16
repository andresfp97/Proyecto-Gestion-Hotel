let habitaciones = []
const tarjeta = document.querySelector(".hTarjeta")
async function getDatosHabitaciones() {
    const url = "http://localhost:3000/habitaciones"

    try {
        let respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("No trajo Daticos");
        }
        let data = await respuesta.json();
        habitaciones = data;
    } catch (error) {
        console.log(error)
    }
}

async function pintarHabitaciones() {
    await getDatosHabitaciones();
    let tarjetas = "";
 
        habitaciones.forEach((element, index) => {
            tarjetas += `<div class="flex flex-col md:flex-row items-start p-4 bg-white rounded shadow-lg border w-11/12 md:w-3/5 mx-auto my-4 overflow-hidden"> 
    <div class="relative w-full md:w-1/3 mb-4 md:mb-0 overflow-hidden h-64" onmouseover="startSlide(${index})" onmouseout="stopSlide()">`;
let strimgs = "";
for (imagen in element.imgs) {
    strimgs += `<img class="rounded w-full h-full object-cover slide-${index}" src="${element.imgs[imagen]}" alt="Habitación Sencilla">`;
}
tarjetas += strimgs + `
    </div>
    <div class="w-full md:w-2/3 md:pl-4 flex flex-col justify-between">
        <div>
            <h2 class="font-bold text-2xl text-gray-800">${element.nombre}</h2>
            <br>
            <p class="text-sm text-gray-600 mt-1">${element.descripcion}</p>
            <ul class="mt-2 text-sm text-gray-600 space-y-1">
                <li><span class="font-semibold">Máximo huéspedes:</span> ${element.maximo_huespedes}</li>
            </ul>
            <br>
            <p class="text-green-600 font-bold text-xl mt-2">${element.precio_por_noche} <span class="text-sm text-gray-600">por noche</span></p>
            <p class="text-xs text-gray-500">Incluye impuestos</p>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between mt-4">
            <div class="text-center mb-4 md:mb-0">
                <p class="text-blue-600 font-semibold">Habitaciones Disponibles: ${element.habitaciones_disponibles}</p>
            </div>
            <button class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Reservar</button>
        </div>
    </div>
</div>`

        });
tarjeta.innerHTML = tarjetas;
}

pintarHabitaciones();