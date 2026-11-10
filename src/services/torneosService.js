import {
    API_URL
} from "./authService.js";


function obtenerFechaActual() {

    const fecha =
        new Date();


    const anio =
        fecha.getFullYear();


    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            fecha.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${anio}-${mes}-${dia}`;
}


function formatearEstado(
    estado,
    cierreInscripcion
) {

    /*
     * Si el backend todavía mantiene el torneo
     * como ABIERTO, pero su fecha de inscripción
     * ya venció, para el usuario se muestra
     * como Cerrado.
     */
    if (
        estado === "ABIERTO" &&
        cierreInscripcion &&
        cierreInscripcion <
            obtenerFechaActual()
    ) {

        return "Cerrado";

    }


    const estados = {

        BORRADOR:
            "Borrador",

        ABIERTO:
            "Abierto",

        EN_CURSO:
            "En curso",

        CERRADO:
            "Cerrado",

        FINALIZADO:
            "Finalizado",

        CANCELADO:
            "Cancelado"

    };


    return (
        estados[estado] ||
        estado
    );
}


async function leerLista(
    respuesta,
    mensajeError
) {

    if (!respuesta.ok) {

        throw new Error(
            mensajeError
        );

    }


    return respuesta.json();
}


async function obtenerCuposOcupados(
    torneoId
) {

    try {

        const respuesta =
            await fetch(
                `${API_URL}/api/inscripciones/torneo/${torneoId}`
            );


        if (!respuesta.ok) {

            return 0;

        }


        const inscripciones =
            await respuesta.json();


        return inscripciones.filter(
            function (
                inscripcion
            ) {

                return (
                    inscripcion.estado !==
                        "CANCELADA" &&
                    inscripcion.estado !==
                        "RECHAZADA"
                );

            }
        ).length;


    } catch {

        return 0;

    }
}


export async function obtenerTorneos() {

    const [
        respuestaTorneos,
        respuestaJuegos
    ] =
        await Promise.all([

            fetch(
                `${API_URL}/api/torneos`
            ),

            fetch(
                `${API_URL}/api/juegos`
            )

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


    const torneosVisibles =
        torneosBackend.filter(
            function (torneo) {

                return (
                    torneo.estado !==
                    "BORRADOR"
                );

            }
        );


    return Promise.all(

        torneosVisibles.map(
            async function (
                torneo
            ) {

                const juegoEncontrado =
                    juegosBackend.find(
                        function (
                            juego
                        ) {

                            return (
                                juego.id ===
                                torneo.juegoId
                            );

                        }
                    );


                const cuposOcupados =
                    await obtenerCuposOcupados(
                        torneo.id
                    );


                return {

                    id:
                        torneo.id,

                    nombre:
                        torneo.nombre,

                    juegoId:
                        torneo.juegoId,

                    juego:
                        juegoEncontrado
                            ? juegoEncontrado.nombre
                            : "Juego no disponible",

                    modalidad:
                        torneo.modalidad,

                    estado:
                        formatearEstado(
                            torneo.estado,
                            torneo.cierreInscripcion
                        ),

                    estadoBackend:
                        torneo.estado,

                    cupoMaximo:
                        torneo.cupoMaximo,

                    cuposOcupados,

                    cierreInscripcion:
                        torneo.cierreInscripcion,

                    fechaInicio:
                        torneo.fechaInicio,

                    fechaFin:
                        torneo.fechaFin

                };

            }
        )

    );
}


export async function obtenerDetalleTorneo(
    id
) {

    const respuestaTorneo =
        await fetch(
            `${API_URL}/api/torneos/${id}`
        );


    if (!respuestaTorneo.ok) {

        if (
            respuestaTorneo.status ===
            404
        ) {

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


    if (
        torneo.estado ===
        "BORRADOR"
    ) {

        throw new Error(
            "Este torneo todavía no está disponible públicamente."
        );

    }


    const [
        respuestaJuego,
        respuestaInscripciones,
        respuestaPartidas,
        respuestaRankings,
        respuestaPremios,
        respuestaResultados
    ] =
        await Promise.all([

            fetch(
                `${API_URL}/api/juegos/${torneo.juegoId}`
            ),

            fetch(
                `${API_URL}/api/inscripciones/torneo/${id}`
            ),

            fetch(
                `${API_URL}/api/partidas/torneo/${id}`
            ),

            fetch(
                `${API_URL}/api/rankings/torneo/${id}`
            ),

            fetch(
                `${API_URL}/api/premios/torneo/${id}`
            ),

            fetch(
                `${API_URL}/api/resultados`
            )

        ]);


    if (!respuestaJuego.ok) {

        throw new Error(
            "No se pudo cargar la información del juego."
        );

    }


    const juego =
        await respuestaJuego.json();


    const inscripciones =
        await leerLista(
            respuestaInscripciones,
            "No se pudieron cargar los participantes del torneo."
        );


    const partidas =
        await leerLista(
            respuestaPartidas,
            "No se pudieron cargar las partidas del torneo."
        );


    const rankings =
        await leerLista(
            respuestaRankings,
            "No se pudo cargar el ranking del torneo."
        );


    const premios =
        await leerLista(
            respuestaPremios,
            "No se pudieron cargar los premios del torneo."
        );


    const resultadosBackend =
        await leerLista(
            respuestaResultados,
            "No se pudieron cargar los resultados."
        );


    const idsPartidas =
        new Set(
            partidas.map(
                function (
                    partida
                ) {

                    return (
                        partida.id
                    );

                }
            )
        );


    const resultados =
        resultadosBackend.filter(
            function (
                resultado
            ) {

                return (
                    idsPartidas.has(
                        resultado.partidaId
                    ) &&
                    resultado.estadoValidacion ===
                        "VALIDADO"
                );

            }
        );


    return {

        id:
            torneo.id,

        nombre:
            torneo.nombre,

        juegoId:
            torneo.juegoId,

        juego:
            juego.nombre,

        modalidad:
            torneo.modalidad,

        estado:
            formatearEstado(
                torneo.estado,
                torneo.cierreInscripcion
            ),

        estadoBackend:
            torneo.estado,

        cupoMaximo:
            torneo.cupoMaximo,

        cierreInscripcion:
            torneo.cierreInscripcion,

        fechaInicio:
            torneo.fechaInicio,

        fechaFin:
            torneo.fechaFin,

        inscripciones,
        partidas,
        resultados,
        rankings,
        premios

    };
}