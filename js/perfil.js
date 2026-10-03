const datosJugador =
    document.getElementById("datos-jugador");

const listaEquiposJugador =
    document.getElementById("lista-equipos-jugador");

const listaHistorial =
    document.getElementById("lista-historial");

const datosEstadisticas =
    document.getElementById("datos-estadisticas");

const listaSanciones =
    document.getElementById("lista-sanciones");

const formularioApodo =
    document.getElementById("form-apodo");

const nuevoApodo =
    document.getElementById("nuevo-apodo");

const mensajeApodo =
    document.getElementById("mensaje-apodo");


// DATOS DEL JUGADOR

datosJugador.innerHTML = `
    <p>Nombre: ${usuarioActual.nombre}</p>
    <p>Apodo: ${usuarioActual.apodo}</p>
    <p>Correo: ${usuarioActual.correo}</p>
`;


// EQUIPOS

perfilJugador.equipos.forEach(function (equipo) {

    listaEquiposJugador.innerHTML += `
        <p>${equipo}</p>
    `;

});

// HISTORIAL DE TORNEOS

perfilJugador.historialTorneos.forEach(function (torneo) {

    listaHistorial.innerHTML += `
        <article class="tarjeta-torneo">
            <h3>${torneo.torneo}</h3>
            <p>Juego: ${torneo.juego}</p>
            <p>Resultado: ${torneo.resultado}</p>
        </article>
    `;

});


// ESTADÍSTICAS

datosEstadisticas.innerHTML = `
    <p>Victorias: ${perfilJugador.estadisticas.victorias}</p>
    <p>Derrotas: ${perfilJugador.estadisticas.derrotas}</p>
`;


// SANCIONES

if (perfilJugador.sanciones.length === 0) {

    listaSanciones.innerHTML =
        "<p>Sin sanciones vigentes.</p>";

} else {

    perfilJugador.sanciones.forEach(function (sancion) {

        listaSanciones.innerHTML += `
            <p>${sancion}</p>
        `;

    });

}

// CAMBIAR APODO

formularioApodo.addEventListener("submit", function (event) {

    event.preventDefault();

    const apodo = nuevoApodo.value.trim();

    mensajeApodo.textContent = "";


    if (apodo === "") {

        mensajeApodo.textContent =
            "El apodo es obligatorio.";

        return;
    }

    if (apodo.length < 3 || apodo.length > 15) {

        mensajeApodo.textContent =
            "El apodo debe tener entre 3 y 15 caracteres.";

        return;
    }

    if (apodo.includes(" ")) {

        mensajeApodo.textContent =
            "El apodo no puede contener espacios.";

        return;
    }


    usuarioActual.apodo = apodo;


    datosJugador.innerHTML = `
        <p>Nombre: ${usuarioActual.nombre}</p>
        <p>Apodo: ${usuarioActual.apodo}</p>
        <p>Correo: ${usuarioActual.correo}</p>
    `;


    mensajeApodo.textContent =
        "Apodo actualizado correctamente.";

});
