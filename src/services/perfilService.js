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
                "Los datos ingresados no son válidos.";
        }

        throw new Error(mensaje);
    }

    return data;
}


export async function actualizarApodo(
    nickname
) {

    const response =
        await fetch(
            `${API_URL}/api/usuarios/me`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body: JSON.stringify({
                    nickname
                })
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el apodo."
    );
}


export async function obtenerPerfilJugador() {

    const headers =
        obtenerHeadersAutenticados();


    const [
        respuestaUsuario,
        respuestaEquipos,
        respuestaTorneos,
        respuestaJuegos,
        respuestaRankings,
        respuestaSanciones
    ] = await Promise.all([

        fetch(
            `${API_URL}/api/usuarios/me`,
            {
                headers
            }
        ),

        fetch(
            `${API_URL}/api/equipos`,
            {
                headers
            }
        ),

        fetch(
            `${API_URL}/api/torneos`
        ),

        fetch(
            `${API_URL}/api/juegos`
        ),

        fetch(
            `${API_URL}/api/rankings`
        ),

        fetch(
            `${API_URL}/api/sanciones/me`,
            {
                headers
            }
        )

    ]);


    const usuario =
        await procesarRespuesta(
            respuestaUsuario,
            "No se pudo cargar el usuario."
        );


    const equiposBackend =
        await procesarRespuesta(
            respuestaEquipos,
            "No se pudieron cargar los equipos."
        );


    const torneos =
        await procesarRespuesta(
            respuestaTorneos,
            "No se pudieron cargar los torneos."
        );


    const juegos =
        await procesarRespuesta(
            respuestaJuegos,
            "No se pudieron cargar los juegos."
        );


    const rankings =
        await procesarRespuesta(
            respuestaRankings,
            "No se pudieron cargar las estadísticas."
        );


    const sanciones =
        await procesarRespuesta(
            respuestaSanciones,
            "No se pudieron cargar las sanciones."
        );


    /*
     * Equipos donde el usuario aparece como miembro.
     */
    const equiposUsuario =
        equiposBackend.filter(
            function (equipo) {

                return (
                    equipo.miembros || []
                ).some(
                    function (miembro) {

                        return (
                            miembro.usuarioId ===
                            usuario.id
                        );

                    }
                );

            }
        );


    /*
     * Para construir historial completo consultamos
     * las inscripciones públicas de cada torneo.
     */
    const respuestasInscripciones =
        await Promise.all(

            torneos.map(
                function (torneo) {

                    return fetch(
                        `${API_URL}/api/inscripciones/torneo/${torneo.id}`
                    );

                }
            )

        );


    const inscripcionesPorTorneo =
        await Promise.all(

            respuestasInscripciones.map(
                async function (
                    respuesta,
                    indice
                ) {

                    const inscripciones =
                        await procesarRespuesta(
                            respuesta,
                            "No se pudieron cargar las inscripciones."
                        );


                    return {
                        torneo:
                            torneos[indice],

                        inscripciones
                    };

                }
            )

        );


    const idsEquiposUsuario =
        equiposUsuario.map(
            function (equipo) {
                return equipo.id;
            }
        );


    const inscripcionesUsuario = [];


    inscripcionesPorTorneo.forEach(
        function (grupo) {

            grupo.inscripciones.forEach(
                function (inscripcion) {

                    const esJugador =
                        inscripcion.jugadorId ===
                        usuario.id;


                    const esEquipo =
                        inscripcion.equipoId != null &&
                        idsEquiposUsuario.includes(
                            inscripcion.equipoId
                        );


                    if (
                        (esJugador || esEquipo) &&
                        inscripcion.estado !==
                        "CANCELADA"
                    ) {

                        inscripcionesUsuario.push({
                            ...inscripcion,

                            torneo:
                                grupo.torneo
                        });

                    }

                }
            );

        }
    );


    /*
     * Historial de torneos.
     */
    const historialTorneos =
        inscripcionesUsuario.map(
            function (inscripcion) {

                const torneo =
                    inscripcion.torneo;


                const juego =
                    juegos.find(
                        function (item) {

                            return (
                                item.id ===
                                torneo.juegoId
                            );

                        }
                    );


                const ranking =
                    rankings.find(
                        function (item) {

                            return (
                                item.torneoId ===
                                    torneo.id &&
                                item.participanteId ===
                                    inscripcion.id
                            );

                        }
                    );


                let resultado =
                    "Participación";


                if (
                    ranking &&
                    ranking.posicion != null
                ) {

                    resultado =
                        `Posición ${ranking.posicion}`;

                }


                return {

                    torneo:
                        torneo.nombre,

                    juego:
                        juego
                            ? juego.nombre
                            : "Juego no disponible",

                    resultado,

                    estadoInscripcion:
                        inscripcion.estado

                };

            }
        );


    /*
     * Estadísticas acumuladas.
     */
    const idsInscripciones =
        inscripcionesUsuario.map(
            function (inscripcion) {
                return inscripcion.id;
            }
        );


    const rankingsUsuario =
        rankings.filter(
            function (ranking) {

                return idsInscripciones.includes(
                    ranking.participanteId
                );

            }
        );


    const estadisticas =
        rankingsUsuario.reduce(

            function (
                acumulado,
                ranking
            ) {

                acumulado.victorias +=
                    ranking.victorias || 0;

                acumulado.derrotas +=
                    ranking.derrotas || 0;

                return acumulado;

            },

            {
                victorias: 0,
                derrotas: 0
            }

        );


    return {

        usuario: {

            id:
                usuario.id,

            nombre:
                usuario.nombre,

            apodo:
                usuario.nickname,

            correo:
                usuario.email

        },


        perfil: {

            equipos:
                equiposUsuario.map(
                    function (equipo) {

                        return {
                            id:
                                equipo.id,

                            nombre:
                                equipo.nombre,

                            estado:
                                equipo.estado,

                            esCapitan:
                                equipo.capitanId ===
                                usuario.id
                        };

                    }
                ),

            historialTorneos,

            estadisticas,

            sanciones

        }

    };
}