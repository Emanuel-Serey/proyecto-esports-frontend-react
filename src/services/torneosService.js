import { API_URL } from "./authService.js";


function formatearEstado(estado) {
    const estados = {
        BORRADOR: "Borrador",
        ABIERTO: "Abierto",
        EN_CURSO: "En curso",
        CERRADO: "Cerrado",
        FINALIZADO: "Finalizado"
    };

    return estados[estado] || estado;
}


export async function obtenerTorneos() {

    const [respuestaTorneos, respuestaJuegos] =
        await Promise.all([
            fetch(`${API_URL}/api/torneos`),
            fetch(`${API_URL}/api/juegos`)
        ]);


    if (!respuestaTorneos.ok) {
        throw new Error(
            "No se pudieron cargar los torneos."
        );
    }


    if (!respuestaJuegos.ok) {
        throw new Error(
            "No se pudieron cargar los juegos."
        );
    }


    const torneosBackend =
        await respuestaTorneos.json();

    const juegosBackend =
        await respuestaJuegos.json();


    return torneosBackend
    .filter(function (torneo) {
        return torneo.estado !== "BORRADOR";
    })
    .map(function (torneo) {

        const juegoEncontrado =
            juegosBackend.find(function (juego) {
                return juego.id === torneo.juegoId;
            });


        return {
            id: torneo.id,
            nombre: torneo.nombre,

            juegoId: torneo.juegoId,

            juego: juegoEncontrado
                ? juegoEncontrado.nombre
                : "Juego no disponible",

            modalidad: torneo.modalidad,

            estado: formatearEstado(
                torneo.estado
            ),

            cupoMaximo: torneo.cupoMaximo,

            cierreInscripcion: torneo.cierreInscripcion,

            fechaInicio: torneo.fechaInicio,

            fechaFin: torneo.fechaFin
        };

    });

}


export async function obtenerDetalleTorneo(id) {

    const respuestaTorneo =
        await fetch(`${API_URL}/api/torneos/${id}`);

    if (!respuestaTorneo.ok) {

        if (respuestaTorneo.status === 404) {
            throw new Error(
                "El torneo solicitado no existe."
            );
        }

        throw new Error(
            "No se pudo cargar el detalle del torneo."
        );
    }

    const torneo =
        await respuestaTorneo.json();


    // Un BORRADOR no debe mostrarse públicamente
    if (torneo.estado === "BORRADOR") {
        throw new Error(
            "Este torneo todavía no está disponible públicamente."
        );
    }


    const respuestaJuego =
        await fetch(`${API_URL}/api/juegos/${torneo.juegoId}`);

    if (!respuestaJuego.ok) {
        throw new Error(
            "No se pudo cargar la información del juego."
        );
    }

    const juego =
        await respuestaJuego.json();

    const respuestaInscripciones =
    await fetch(
        `${API_URL}/api/inscripciones/torneo/${id}`
    );

    if (!respuestaInscripciones.ok) {
        throw new Error(
            "No se pudieron cargar los participantes del torneo."
        );
    }

    const inscripciones =
        await respuestaInscripciones.json();

    return {
        id: torneo.id,
        nombre: torneo.nombre,
        juegoId: torneo.juegoId,
        juego: juego.nombre,
        modalidad: torneo.modalidad,
        estado: formatearEstado(torneo.estado),
        cupoMaximo: torneo.cupoMaximo,
        cierreInscripcion: torneo.cierreInscripcion,
        fechaInicio: torneo.fechaInicio,
        fechaFin: torneo.fechaFin,
        inscripciones: inscripciones
    };
}