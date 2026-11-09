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

export async function obtenerDatosAdmin() {

    const headers =
        obtenerHeadersAutenticados();


    const [
        respuestaUsuarios,
        respuestaCuentas,
        respuestaJuegos,
        respuestaTorneos,
        respuestaPremios,
        respuestaRankings,
        respuestaInscripciones,
        respuestaEquipos
    ] = await Promise.all([

        fetch(
            `${API_URL}/api/usuarios`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/auth/cuentas`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/juegos`
        ),

        fetch(
            `${API_URL}/api/torneos`
        ),

        fetch(
            `${API_URL}/api/premios`
        ),

        fetch(
            `${API_URL}/api/rankings`
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
        )

    ]);


    const usuarios =
        await procesarRespuesta(
            respuestaUsuarios,
            "No se pudieron cargar los usuarios."
        );


    const cuentas =
        await procesarRespuesta(
            respuestaCuentas,
            "No se pudieron cargar las cuentas."
        );


    const juegos =
        await procesarRespuesta(
            respuestaJuegos,
            "No se pudieron cargar los juegos."
        );


    const torneos =
        await procesarRespuesta(
            respuestaTorneos,
            "No se pudieron cargar los torneos."
        );


    const premios =
        await procesarRespuesta(
            respuestaPremios,
            "No se pudieron cargar los premios."
        );


    const rankings =
        await procesarRespuesta(
            respuestaRankings,
            "No se pudieron cargar los rankings."
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


    return {
        usuarios,
        cuentas,
        juegos,
        torneos,
        premios,
        rankings,
        inscripciones,
        equipos
    };
}


/*
 * =========================================
 * USUARIOS
 * =========================================
 */

export async function actualizarDatosUsuario(
    usuarioId,
    datosUsuario
) {

    const response =
        await fetch(
            `${API_URL}/api/usuarios/${usuarioId}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosUsuario
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el usuario."
    );
}


export async function actualizarRolCuenta(
    cuentaId,
    rol
) {

    const response =
        await fetch(
            `${API_URL}/api/auth/cuentas/${cuentaId}/rol`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify({
                        rol
                    })
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el rol."
    );
}


export async function actualizarPasswordCuenta(
    cuentaId,
    nuevaPassword
) {

    const response =
        await fetch(
            `${API_URL}/api/auth/cuentas/${cuentaId}/password`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify({
                        nuevaPassword
                    })
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar la contraseña."
    );
}


export async function desactivarUsuarioCompleto(
    usuarioId,
    cuentaId
) {

    const respuestaUsuario =
        await fetch(
            `${API_URL}/api/usuarios/${usuarioId}`,
            {
                method: "DELETE",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!respuestaUsuario.ok) {

        await procesarRespuesta(
            respuestaUsuario,
            "No se pudo desactivar el usuario."
        );

    }


    if (cuentaId != null) {

        const respuestaCuenta =
            await fetch(
                `${API_URL}/api/auth/cuentas/${cuentaId}`,
                {
                    method: "DELETE",

                    headers:
                        obtenerHeadersAutenticados()
                }
            );


        if (!respuestaCuenta.ok) {

            await procesarRespuesta(
                respuestaCuenta,
                "El usuario fue desactivado, pero no se pudo desactivar su cuenta."
            );

        }
    }


    return true;
}


/*
 * =========================================
 * JUEGOS
 * =========================================
 */

export async function crearJuego(
    datosJuego
) {

    const response =
        await fetch(
            `${API_URL}/api/juegos`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosJuego
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo crear el juego."
    );
}


export async function actualizarJuego(
    juegoId,
    datosJuego
) {

    const response =
        await fetch(
            `${API_URL}/api/juegos/${juegoId}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosJuego
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el juego."
    );
}


export async function desactivarJuego(
    juegoId
) {

    const response =
        await fetch(
            `${API_URL}/api/juegos/${juegoId}`,
            {
                method: "DELETE",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo desactivar el juego."
        );

    }


    return true;
}


/*
 * =========================================
 * TORNEOS
 * =========================================
 */

export async function crearTorneo(
    datosTorneo
) {

    const response =
        await fetch(
            `${API_URL}/api/torneos`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosTorneo
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo crear el torneo."
    );
}


export async function actualizarTorneo(
    torneoId,
    datosTorneo
) {

    const response =
        await fetch(
            `${API_URL}/api/torneos/${torneoId}`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosTorneo
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo actualizar el torneo."
    );
}


export async function iniciarTorneo(
    torneoId
) {

    const response =
        await fetch(
            `${API_URL}/api/torneos/${torneoId}/iniciar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo iniciar el torneo."
        );

    }


    return true;
}


export async function cerrarTorneo(
    torneoId
) {

    const response =
        await fetch(
            `${API_URL}/api/torneos/${torneoId}/cerrar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo cerrar el torneo."
        );

    }


    return true;
}


export async function cancelarTorneo(
    torneoId
) {

    const response =
        await fetch(
            `${API_URL}/api/torneos/${torneoId}/cancelar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo cancelar el torneo."
        );

    }


    return true;
}


/*
 * =========================================
 * PREMIOS
 * =========================================
 */

export async function asignarPremio(
    datosPremio
) {

    const response =
        await fetch(
            `${API_URL}/api/premios`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body:
                    JSON.stringify(
                        datosPremio
                    )
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo asignar el premio."
    );
}


export async function entregarPremio(
    premioId
) {

    const response =
        await fetch(
            `${API_URL}/api/premios/${premioId}/entregar`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    return procesarRespuesta(
        response,
        "No se pudo marcar el premio como entregado."
    );
}


export async function anularPremio(
    premioId
) {

    const response =
        await fetch(
            `${API_URL}/api/premios/${premioId}/anular`,
            {
                method: "PUT",

                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {

        await procesarRespuesta(
            response,
            "No se pudo anular el premio."
        );

    }


    return true;
}