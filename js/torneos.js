const formularioFiltros = document.getElementById("form-filtros");
const listaTorneosCompleta = document.getElementById("lista-torneos-completa");
const mensajeFiltro = document.getElementById("mensaje-filtro");


function mostrarTorneos(lista) {

    listaTorneosCompleta.innerHTML = "";

    if (lista.length === 0) {
        listaTorneosCompleta.innerHTML = "<p>No se encontraron torneos.</p>";
        return;
    }

    lista.forEach(function (torneo) {

        listaTorneosCompleta.innerHTML += `
            <article class="tarjeta-torneo">
                <h3>${torneo.nombre}</h3>
                <p>Juego: ${torneo.juego}</p>
                <p>Estado: ${torneo.estado}</p>
                <p>Cupos: ${torneo.inscritos} / ${torneo.cupoMaximo}</p>
                <p>Cierre de inscripción: ${torneo.cierreInscripcion}</p>
            </article>
        `;
    });
}


mostrarTorneos(torneos);

formularioFiltros.addEventListener("submit", function (event) {

    event.preventDefault();

    const nombre = document.getElementById("buscar").value.toLowerCase();
    const juego = document.getElementById("juego").value;
    const estado = document.getElementById("estado").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;

    mensajeFiltro.textContent = "";

    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
        mensajeFiltro.textContent =
            "La fecha inicial no puede ser posterior a la fecha final.";

        listaTorneosCompleta.innerHTML = "";

        return;
    }

    const torneosFiltrados = torneos.filter(function (torneo) {

        const coincideNombre =
            torneo.nombre.toLowerCase().includes(nombre);

        const coincideJuego =
            juego === "" || torneo.juego === juego;

        const coincideEstado =
            estado === "" || torneo.estado === estado;

        const coincideFechaInicio =
            fechaInicio === "" ||
            torneo.cierreInscripcion >= fechaInicio;

        const coincideFechaFin =
            fechaFin === "" ||
            torneo.cierreInscripcion <= fechaFin;

        return (
            coincideNombre &&
            coincideJuego &&
            coincideEstado &&
            coincideFechaInicio &&
            coincideFechaFin
        );
    });

    mostrarTorneos(torneosFiltrados);
});