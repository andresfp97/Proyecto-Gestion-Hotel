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
    tarjetas += `<div class="flex flex-col md:flex-row items-start p-4 bg-white rounded shadow-lg border w-11/12 md:w-3/5 mx-auto my-4 overflow-hidden cursor-pointer"> 
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
            <p class="text-green-600 font-bold text-xl mt-2" id="precioHabitacion-${index}">${element.precio_por_noche} <span class="text-sm text-gray-600">por noche</span></p>
            <p class="text-xs text-gray-500">Incluye impuestos</p>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between mt-4">
            <div class="text-center mb-4 md:mb-0">
                <p class="text-blue-600 font-semibold" id="hDisponibles-${index}" >Habitaciones Disponibles: ${element.habitaciones_disponibles}</p>
            </div>
            <button class="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700" id="reserva">Reservar</button>
        </div>
    </div>
</div>
<div class="casillas-${index}"> </div>
`
  });
  tarjeta.innerHTML = tarjetas;
  pintarReserva();
}

function pintarReserva() {
  reservas = document.querySelectorAll("#reserva");
  reservas.forEach((reserva, index) => {
    reserva.addEventListener("click", () => {

      const sesion = localStorage.getItem('usuario');
      if (sesion) {
        if (index == 0) pintarDisponibles(0);
        if (index == 1) pintarDisponibles(1);
        if (index == 2) pintarDisponibles(2);
      } else {
        window.location.href = "login-registro.html";
      }


    });
  });
}


async function pintarDisponibles(index) {
  await getDatosHabitaciones();


  let disponibles = `<div class="container mx-auto py-8 w-[60%]">

    <!-- Área de Selección -->
    <div class="grid grid-cols-3 gap-4 mb-8">

      <!-- Habitaciones (Ejemplo dinámico) -->`

  let nHabitaciones = "";
  habitaciones[index].n_habitaciones.forEach((habitacion, index2) => {
    nHabitaciones += `
        <button  data-id="${habitaciones[index].n_habitaciones[index2]}" data-precio="${habitaciones[index].precio_por_noche}" onclick="toggleSeleccion(this)"
        class="habitacion bg-gray-300 text-gray-700 text-center py-4 rounded hover:bg-green-400">
            Hab. ${habitacion}
        </button>`

  });
  disponibles += nHabitaciones +
    `
    </div>

  </div>`

  casillas = document.querySelector(`.casillas-${index}`);
  casillas.innerHTML = disponibles;

}

const seleccionadas = new Set();
const precios = {};

function toggleSeleccion(elemento) {
  const id = elemento.dataset.id;
  const precio = parseFloat(elemento.dataset.precio);
  let fechaEntrada = document.getElementById(`fechaEntrada`).value;
  let fechaSalida = document.getElementById(`fechaSalida`).value;

  if (!fechaEntrada || !fechaSalida) {
    alert('Debes seleccionar las fechas de entrada y salida');
    return;
  }

  if (seleccionadas.has(id)) {
    // Quitar del set y eliminar su precio
    seleccionadas.delete(id);
    delete precios[id];
    elemento.classList.remove('bg-green-400');
    elemento.classList.add('bg-gray-300');
  } else {
    // Agregar al set y registrar su precio
    seleccionadas.add(id);
    precios[id] = precio;
    elemento.classList.remove('bg-gray-300');
    elemento.classList.add('bg-green-400');
  }

  actualizarResumen();
}


function eliminarCoincidencias(arregloPrimario, arregloSecundario) {
  return arregloPrimario.filter(item => !arregloSecundario.includes(item));
}

// Actualizar el resumen
function actualizarResumen() {

  sencillas = habitaciones[0].n_habitaciones;
  dobles = habitaciones[1].n_habitaciones;
  suit = habitaciones[2].n_habitaciones;


  const fechaEntrada = document.getElementById(`fechaEntrada`).value;
  const fechaSalida = document.getElementById(`fechaSalida`).value;
  const lista = document.getElementById('habitacionesSeleccionadas');
  const precioTotal = document.getElementById('precioTotal');

  let dias = calcularDiferenciaDias(fechaEntrada, fechaSalida)

  lista.innerHTML = '';
  let total = 0;
  let listaborrar = [];

  seleccionadas.forEach(id => {
    const li = document.createElement('li');
    li.textContent = `Habitación: ${id}`;
    lista.appendChild(li);
    listaborrar.push(parseInt(id))
    total += precios[id];
  });

  sencillas = eliminarCoincidencias(sencillas, listaborrar);
  dobles = eliminarCoincidencias(dobles, listaborrar);
  suit = eliminarCoincidencias(suit, listaborrar);

  if (!dias == 0) {
    total = total * dias;
  }
  // for (let i = 0; i < 3; i++) {

  //   const cantHabitaciones = document.getElementById(`hDisponibles-${i}`);
  //   if (i == 0) cantHabitaciones.textContent = `Habitaciones Disponibles: ${sencillas.length}`;
  //   if (i == 1) cantHabitaciones.textContent = `Habitaciones Disponibles: ${dobles.length}`;
  //   if (i == 2) cantHabitaciones.textContent = `Habitaciones Disponibles: ${suit.length}`;
  // }
  habiSencillas = sencillas.length;
  habiDobles = dobles.length;
  habiSuit = suit.length;



  precioTotal.textContent = total;
  precioGlobal = total;
}

let nuevas = [];
let precioGlobal;
let conGlobal;
let sencillas;
let dobles;
let suit;
let habiSencillas;
let habiDobles;
let habiSuit;
// calcular los dis que se reserva la habitacion

function calcularDiferenciaDias(fechaInicio, fechaFin) {
  // Convertir las fechas a objetos Date
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
    console.error("Las fechas proporcionadas no son válidas");
    return null;
  }

  const diferenciaTiempo = fin - inicio;
  const diasDiferencia = diferenciaTiempo / (1000 * 60 * 60 * 24);

  return diasDiferencia >= 0 ? Math.floor(diasDiferencia) : 0;
}

// Confirmar la reserva y enviarla al servidor
function confirmarReserva(precioHabitacion) {
  if (seleccionadas.size === 0) {
    alert('Por favor, selecciona al menos una habitación');
    return;
  }

  const fechaEntrada = document.getElementById(`fechaEntrada`).value;
  const fechaSalida = document.getElementById(`fechaSalida`).value;
  const politicasAceptadas = document.getElementById(`politicas`).checked;

  if (!fechaEntrada || !fechaSalida) {
    alert('Debes seleccionar las fechas de entrada y salida');
    return;
  }

  if (!politicasAceptadas) {
    alert('Debes aceptar las políticas para continuar');
    return;
  }

  const dias = calcularDiferenciaDias(fechaEntrada, fechaSalida);


  // Obtener id_usuario desde localStorage
  const idUsuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(idUsuario)
  const reserva = {

    id_usuario: idUsuario,
    id_habitacion: Array.from(seleccionadas).join(', '),
    fecha_entrada: fechaEntrada,
    fecha_salida: fechaSalida,
    precio_total: precioGlobal,
    n_dias: dias,
    estado: 'activa',
    politicas_aceptadas: politicasAceptadas
  };

  console.log('Reserva confirmada:', reserva);


  fetch('http://localhost:3000/reservas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reserva)
  })
    .then(response => response.json())
    .then(data => {
      alert('Reserva realizada con éxito');
    })
    .catch(error => {
      alert('Error al realizar la reserva');
      console.error('Error:', error);
    });

  // Actualizar habitaciones disponibles
  actualizarNHabitaciones(1, sencillas, habiSencillas);
  actualizarNHabitaciones(2, dobles, habiDobles);
  actualizarNHabitaciones(3, suit, habiSuit);

}


async function actualizarNHabitaciones(id, nuevasHabitaciones , cantHabitaciones) {
  try {
    const url = `http://localhost:3000/habitaciones/${id}`;
    const respuesta = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ n_habitaciones: nuevasHabitaciones, habitaciones_disponibles: cantHabitaciones }),
    });

    if (!respuesta.ok) {
      throw new Error("Error al actualizar la lista n_habitaciones");
    }

    const dataActualizada = await respuesta.json();
    console.log("Actualizado:", dataActualizada);
    return dataActualizada;
  } catch (error) {
    console.error(error);
  }
}


pintarHabitaciones();
