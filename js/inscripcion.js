const formularioInscripcion = document.getElementById("form-inscripcion");

const mensajeInscripcion = document.getElementById("mensaje-inscripcion");

const resumenInscripcion = document.getElementById("resumen-inscripcion");

const campoEquipo = document.getElementById("campo-equipo");

const opcionJugador = document.getElementById("jugador");

const opcionEquipo = document.getElementById("equipo");

opcionJugador.addEventListener("change", function () {
    campoEquipo.style.display = "none";
});

opcionEquipo.addEventListener("change", function () {
    campoEquipo.style.display = "block";
});

formularioInscripcion.addEventListener("submit", function (event) {

    event.preventDefault();

    mensajeInscripcion.textContent = "";

    resumenInscripcion.innerHTML =
        "<p>Aún no se ha realizado una inscripción.</p>";

    const nombreTorneo =
        document.getElementById("torneo").value;

    const tipoParticipante =
        document.querySelector(
            'input[name="tipo-participante"]:checked'
        );

    const equipoSeleccionado =
        document.getElementById("equipo-seleccionado").value;


    if (nombreTorneo === "") {
        mensajeInscripcion.textContent =
            "Debes seleccionar un torneo.";
        return;
    }


    if (tipoParticipante === null) {
        mensajeInscripcion.textContent =
            "Debes seleccionar un tipo de participante.";
        return;
    }


    const torneoSeleccionado = torneos.find(function (torneo) {
        return torneo.nombre === nombreTorneo;
    });


    // Validar modalidad
    if (
        torneoSeleccionado.modalidad === "Por equipos" &&
        tipoParticipante.value !== "equipo"
    ) {
        mensajeInscripcion.textContent =
            "Este torneo solo permite inscripciones por equipo.";
        return;
    }

    if (
        torneoSeleccionado.modalidad === "Individual" &&
        tipoParticipante.value !== "jugador"
    ) {
        mensajeInscripcion.textContent =
            "Este torneo solo permite inscripciones individuales.";
        return;
    }


    // Validar cupos
    if (
        torneoSeleccionado.inscritos >=
        torneoSeleccionado.cupoMaximo
    ) {
        mensajeInscripcion.textContent =
            "No es posible inscribirse: el torneo no tiene cupos disponibles.";
        return;
    }


    // Validar fecha
    const fechaActual = new Date();
    const fechaCierre = new Date(torneoSeleccionado.cierreInscripcion);


    if (fechaActual > fechaCierre) {
        mensajeInscripcion.textContent =
            "No es posible inscribirse: el plazo de inscripción ya finalizó.";
        return;
    }

    if (
        tipoParticipante.value === "equipo" &&
        equipoSeleccionado === ""
    ) {
        mensajeInscripcion.textContent =
            "Debes seleccionar un equipo.";
        return;
    }

    let participante;

    if (tipoParticipante.value === "equipo") {

        const equipo = equiposUsuario.find(function (equipo) {
            return equipo.nombre === equipoSeleccionado;
        });

        if (equipo.estado === "Inactivo") {
            mensajeInscripcion.textContent =
                "El equipo no puede inscribirse porque se encuentra inactivo.";
            return;
        }

        if (
            equipo.integrantes <
            torneoSeleccionado.integrantesPorEquipo
        ) {
            mensajeInscripcion.textContent =
                "El equipo no tiene suficientes integrantes para este torneo.";
            return;
        }

        if (equipo.sancionVigente === true) {
            mensajeInscripcion.textContent =
                "El equipo no puede inscribirse porque tiene una sanción vigente.";
            return;
        }

        participante = equipo.nombre;

    } else {

        if (usuarioActual.sancionVigente === true) {
            mensajeInscripcion.textContent =
                "No puedes inscribirte porque tienes una sanción vigente.";
            return;
        }

        participante = usuarioActual.apodo;
    }

    const yaInscrito = inscripciones.some(function (inscripcion) {
        return (
            inscripcion.torneo === torneoSeleccionado.nombre &&
            inscripcion.participante === participante
        );
    });

    if (yaInscrito) {

        if (tipoParticipante.value === "equipo") {
            mensajeInscripcion.textContent =
                "Este equipo ya se encuentra inscrito en este torneo.";
        } else {
            mensajeInscripcion.textContent =
                "Este jugador ya se encuentra inscrito en este torneo.";
        }

        return;
    }

    inscripciones.push({
        torneo: torneoSeleccionado.nombre,
        participante: participante,
        tipo: tipoParticipante.value
    });

    mensajeInscripcion.textContent = "";

    resumenInscripcion.innerHTML = `
    <h3>Inscripción realizada correctamente</h3>
    <p>Torneo: ${torneoSeleccionado.nombre}</p>
    <p>Participante: ${participante}</p>
    <p>Modalidad: ${torneoSeleccionado.modalidad}</p>
    `;

});