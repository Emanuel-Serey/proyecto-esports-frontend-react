const formularioEquipo =
    document.getElementById("form-equipo");

const mensajeEquipo =
    document.getElementById("mensaje-equipo");

const nuevoIntegrante =
    document.getElementById("nuevo-integrante");

const rolIntegrante =
    document.getElementById("rol-integrante");

const botonAgregar =
    document.getElementById("btn-agregar-integrante");

const listaIntegrantes =
    document.getElementById("lista-integrantes");

const tituloIntegrantes =
    document.getElementById("titulo-integrantes");

const botonCrearEquipo =
    document.getElementById("btn-crear-equipo");

const seccionIntegrantes =
    document.getElementById("integrantes-equipo");


const integrantes = [];

let equipoActual = null;


// MOSTRAR INTEGRANTES

function mostrarIntegrantes() {

    listaIntegrantes.innerHTML = "";

    if (integrantes.length === 0) {
        listaIntegrantes.innerHTML =
            "<p>Aún no hay integrantes en el equipo.</p>";
        return;
    }

    integrantes.forEach(function (integrante, indice) {

        const botonQuitar =
            integrante.rol === "Capitán"
                ? ""
                : `
                <button
                    type="button"
                    class="boton-quitar"
                    data-indice="${indice}"
                >
                    Quitar
                </button>
            `;

        listaIntegrantes.innerHTML += `
        <div class="integrante">
            <span>${integrante.jugador}</span>
            <span>${integrante.rol}</span>
            ${botonQuitar}
        </div>
    `;
    });


    const botonesQuitar =
        document.querySelectorAll(".boton-quitar");


    botonesQuitar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const indice =
                boton.getAttribute("data-indice");

            integrantes.splice(indice, 1);

            mostrarIntegrantes();

        });

    });

}
// AGREGAR INTEGRANTE

botonAgregar.addEventListener("click", function () {

    const jugador = nuevoIntegrante.value;
    const rol = rolIntegrante.value;


    if (jugador === "") {
        mensajeEquipo.textContent =
            "Debes seleccionar un jugador.";
        return;
    }


    if (rol === "") {
        mensajeEquipo.textContent =
            "Debes seleccionar un rol.";
        return;
    }


    const jugadorRepetido = integrantes.some(function (integrante) {
        return integrante.jugador === jugador;
    });


    if (jugadorRepetido) {
        mensajeEquipo.textContent =
            "Este jugador ya pertenece al equipo.";
        return;
    }


    integrantes.push({
        jugador: jugador,
        rol: rol
    });


    mensajeEquipo.textContent = "";

    mostrarIntegrantes();

});
// CREAR EQUIPO

formularioEquipo.addEventListener("submit", function (event) {

    event.preventDefault();

    mensajeEquipo.textContent = "";


    const nombreEquipo =
        document.getElementById("nombre-equipo").value.trim();

    const juegoEquipo =
        document.getElementById("juego-equipo").value;

    const capitanEquipo =
        document.getElementById("capitan-equipo").value;


    // Validar nombre

    if (nombreEquipo === "") {
        mensajeEquipo.textContent =
            "Debes ingresar un nombre para el equipo.";
        return;
    }


    // Validar juego

    if (juegoEquipo === "") {
        mensajeEquipo.textContent =
            "Debes seleccionar un juego principal.";
        return;
    }


    // Validar capitán

    if (capitanEquipo === "") {
        mensajeEquipo.textContent =
            "Debes seleccionar un capitán.";
        return;
    }


    // Validar nombre repetido

    const nombreRepetido = equiposExistentes.some(function (nombre) {

        return nombre.toLowerCase() ===
            nombreEquipo.toLowerCase();

    });


    if (nombreRepetido) {
        mensajeEquipo.textContent =
            "Ya existe un equipo con este nombre.";
        return;
    }


    // Si pasa todas las validaciones

    equipoActual = {
        nombre: nombreEquipo,
        juego: juegoEquipo,
        capitan: capitanEquipo
    };

    equiposExistentes.push(nombreEquipo);


    // El capitán se agrega automáticamente al equipo

    integrantes.push({
        jugador: capitanEquipo,
        rol: "Capitán"
    });


    tituloIntegrantes.textContent =
        "Integrantes de " + equipoActual.nombre;


    // Mostrar la sección de integrantes

    seccionIntegrantes.hidden = false;


    // Mostrar al capitán en la lista

    mostrarIntegrantes();


    mensajeEquipo.textContent =
        "Equipo creado correctamente.";


    // Bloquear creación del equipo

    botonCrearEquipo.disabled = true;
    botonCrearEquipo.textContent = "Equipo creado";

    document.getElementById("nombre-equipo").disabled = true;
    document.getElementById("juego-equipo").disabled = true;
    document.getElementById("capitan-equipo").disabled = true;

});