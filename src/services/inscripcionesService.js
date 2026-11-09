import {
    API_URL,
    obtenerHeadersAutenticados
} from "./authService.js";


function obtenerMensajeError(data, mensajeDefault) {

    if (!data) {
        return mensajeDefault;
    }

    if (data.error) {
        return data.error;
    }

    if (data.message) {
        return data.message;
    }

    // Para errores de validación tipo:
    // { torneoId: "...", tipoParticipante: "..." }
    const valores = Object.values(data);

    if (valores.length > 0 &&
        typeof valores[0] === "string") {

        return valores[0];
    }

    return mensajeDefault;
}


async function procesarRespuesta(response) {

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }


    if (!response.ok) {

        let mensaje =
            obtenerMensajeError(
                data,
                "Ocurrió un error al comunicarse con el servidor."
            );


        if (response.status === 401) {
            mensaje =
                "Tu sesión ha expirado. Inicia sesión nuevamente.";
        }

        if (response.status === 403) {
            mensaje =
                obtenerMensajeError(
                    data,
                    "No tienes permisos para realizar esta inscripción."
                );
        }

        if (response.status === 404) {
            mensaje =
                obtenerMensajeError(
                    data,
                    "No se encontró el recurso solicitado."
                );
        }

        if (response.status === 409) {
            mensaje =
                obtenerMensajeError(
                    data,
                    "No es posible realizar la inscripción."
                );
        }

        if (response.status === 422) {
            mensaje =
                obtenerMensajeError(
                    data,
                    "No se cumplen los requisitos para inscribirse."
                );
        }

        if (response.status >= 500) {
            mensaje =
                obtenerMensajeError(
                    data,
                    "Ocurrió un problema interno en el servidor."
                );
        }


        throw new Error(mensaje);
    }


    return data;
}


export async function obtenerDatosInscripcion() {

    const headers =
        obtenerHeadersAutenticados();


    const [
        respuestaUsuario,
        respuestaTorneos
    ] = await Promise.all([

        fetch(
            `${API_URL}/api/usuarios/me`,
            {
                method: "GET",
                headers
            }
        ),

        fetch(
            `${API_URL}/api/torneos`
        )

    ]);


    const usuario =
        await procesarRespuesta(
            respuestaUsuario
        );


    const torneosBackend =
        await procesarRespuesta(
            respuestaTorneos
        );


    const respuestaEquipos =
        await fetch(
            `${API_URL}/api/equipos/capitan/${usuario.id}`,
            {
                method: "GET",
                headers
            }
        );


    const equipos =
        await procesarRespuesta(
            respuestaEquipos
        );


    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const torneos =
        torneosBackend.filter(function (torneo) {

            if (torneo.estado !== "ABIERTO") {
                return false;
            }

            if (!torneo.cierreInscripcion) {
                return true;
            }

            const cierre =
                new Date(
                    `${torneo.cierreInscripcion}T00:00:00`
                );

            return cierre >= hoy;

        });


    return {
        usuario,
        torneos,
        equipos
    };
}


export async function crearInscripcion(
    datosInscripcion
) {

    const response =
        await fetch(
            `${API_URL}/api/inscripciones`,
            {
                method: "POST",

                headers:
                    obtenerHeadersAutenticados(),

                body: JSON.stringify(
                    datosInscripcion
                )
            }
        );


    return procesarRespuesta(response);
}