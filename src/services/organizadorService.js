import {
    API_URL,
    obtenerHeadersAutenticados
} from "./authService.js";


async function procesarRespuesta(
    response,
    mensajeDefault
) {

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }


    if (!response.ok) {

        let mensaje =
            data?.error ||
            data?.message ||
            mensajeDefault;


        if (
            response.status === 400 &&
            data &&
            typeof data === "object"
        ) {

            const valores =
                Object.values(data);

            if (
                valores.length > 0 &&
                typeof valores[0] === "string"
            ) {
                mensaje = valores[0];
            }
        }


        if (response.status === 401) {

            mensaje =
                "Tu sesión ha expirado. Inicia sesión nuevamente.";

        }


        if (response.status === 403) {

            mensaje =
                data?.error ||
                data?.message ||
                "No tienes permisos para realizar esta acción.";

        }


        if (response.status === 404) {

            mensaje =
                data?.error ||
                data?.message ||
                "No se encontró el recurso solicitado.";

        }


        if (response.status === 409) {

            mensaje =
                data?.error ||
                data?.message ||
                "La operación genera un conflicto.";

        }


        if (response.status === 422) {

            mensaje =
                data?.error ||
                data?.message ||
                "No se cumplen las reglas necesarias.";

        }


        if (response.status >= 500) {

            mensaje =
                data?.error ||
                data?.message ||
                "Ocurrió un error interno en el servidor.";

        }


        throw new Error(mensaje);
    }


    return data;
}


/*
 * =========================================
 * DATOS GENERALES
 * =========================================
 */

export async function obtenerDatosOrganizador() {

    const headers =
        obtenerHeadersAutenticados();


    const [
        respuestaTorneos,
        respuestaInscripciones,
        respuestaEquipos,
        respuestaJugadores,
        respuestaPartidas,
        respuestaResultados,
        respuestaRankings,
        respuestaSanciones
    ] = await Promise.all([

        fetch(
            `${API_URL}/api/torneos`
        ),

        fetch(
            `${API_URL}/api/inscripciones`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/equipos`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/usuarios/rol/JUGADOR`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/partidas`
        ),

        fetch(
            `${API_URL}/api/resultados`
        ),

        fetch(
            `${API_URL}/api/rankings`
        ),

        fetch(
            `${API_URL}/api/sanciones`,
            {
                method: "GET",
                headers
            }
        )

    ]);


    const torneos =
        await procesarRespuesta(
            respuestaTorneos,
            "No se pudieron cargar los torneos."
        );


    const inscripciones =
        await procesarRespuesta(
            respuestaInscripciones,
            "No se pudieron cargar las inscripciones."
        );


    const equipos =
        await procesarRespuesta(
            respuestaEquipos,
            "No se pudieron cargar los equipos."
        );


    const jugadores =
        await procesarRespuesta(
            respuestaJugadores,
            "No se pudieron cargar los jugadores."
        );


    const partidas =
        await procesarRespuesta(
            respuestaPartidas,
            "No se pudieron cargar las partidas."
        );


    const resultados =
        await procesarRespuesta(
            respuestaResultados,
            "No se pudieron cargar los resultados."
        );


    const rankings =
        await procesarRespuesta(
            respuestaRankings,
            "No se pudieron cargar los rankings."
        );


    const sanciones =
        await procesarRespuesta(
            respuestaSanciones,
            "No se pudieron cargar las sanciones."
        );


    return {

        torneos,
        inscripciones,
        equipos,
        jugadores,
        partidas,
        resultados,
        rankings,
        sanciones

    };
}


/*
 * =========================================
 * PARTIDAS
 * =========================================
 */

export async function crearPartida(
    datosPartida
) {

    const response =
        await fetch(
            `${API_URL}/api/partidas`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosPartida
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo crear la partida."
    );
}


export async function cambiarEstadoPartida(
    partidaId,
    estado
) {

    const response =
        await fetch(
            `${API_URL}/api/partidas/${partidaId}/estado/${estado}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el estado de la partida."
    );
}


export async function cancelarPartida(
    partidaId
) {

    const response =
        await fetch(
            `${API_URL}/api/partidas/${partidaId}/cancelar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo cancelar la partida."
        );

    }


    return true;
}


/*
 * =========================================
 * RESULTADOS
 * =========================================
 */

export async function crearResultado(
    datosResultado
) {

    const response =
        await fetch(
            `${API_URL}/api/resultados`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosResultado
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo registrar el resultado."
    );
}


export async function validarResultado(
    resultadoId
) {

    const response =
        await fetch(
            `${API_URL}/api/resultados/${resultadoId}/validar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo validar el resultado."
    );
}


export async function anularResultado(
    resultadoId,
    justificacion
) {

    const response =
        await fetch(
            `${API_URL}/api/resultados/${resultadoId}/anular?justificacion=${encodeURIComponent(
                justificacion
            )}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo anular el resultado."
        );

    }


    return true;
}


/*
 * =========================================
 * RANKING
 * =========================================
 */

export async function actualizarRankingPorResultado(
    resultadoId,
    torneoId,
    participanteAId,
    participanteBId
) {

    const parametros =
        new URLSearchParams({

            torneoId:
                String(torneoId),

            participanteAId:
                String(participanteAId),

            participanteBId:
                String(participanteBId)

        });


    const response =
        await fetch(
            `${API_URL}/api/rankings/resultado/${resultadoId}?${parametros}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el ranking."
    );
}


/*
 * =========================================
 * SANCIONES
 * =========================================
 */

export async function crearSancion(
    datosSancion
) {

    const response =
        await fetch(
            `${API_URL}/api/sanciones`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosSancion
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo crear la sanción."
    );
}


export async function actualizarSancion(
    sancionId,
    datosSancion
) {

    const response =
        await fetch(
            `${API_URL}/api/sanciones/${sancionId}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosSancion
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar la sanción."
    );
}


export async function cerrarSancion(
    sancionId
) {

    const response =
        await fetch(
            `${API_URL}/api/sanciones/${sancionId}/cerrar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo cerrar la sanción."
        );

    }


    return true;
}