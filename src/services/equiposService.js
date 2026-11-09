import {
    API_URL,
    obtenerHeadersAutenticados
} from "./authService.js";


async function procesarRespuesta(response) {

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {

        let mensaje =
            data?.message ||
            data?.error ||
            "Ocurrió un error al comunicarse con el servidor.";

        if (response.status === 401) {
            mensaje =
                "Tu sesión ha expirado. Inicia sesión nuevamente.";
        }

        if (response.status === 403) {
            mensaje =
                "No tienes permisos para realizar esta acción.";
        }

        if (response.status === 404) {
            mensaje =
                data?.message ||
                data?.error ||
                "No se encontró el recurso solicitado.";
        }

        if (response.status === 409) {
            mensaje =
                data?.message ||
                data?.error ||
                "La operación genera un conflicto.";
        }

        if (response.status === 422) {
            mensaje =
                data?.message ||
                data?.error ||
                "No se cumple una regla de negocio.";
        }

        throw new Error(mensaje);
    }

    return data;
}


export async function obtenerDatosEquipo() {

    const headers =
        obtenerHeadersAutenticados();

    const [
        respuestaPerfil,
        respuestaJugadores,
        respuestaJuegos
    ] = await Promise.all([

        fetch(
            `${API_URL}/api/usuarios/me`,
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
            `${API_URL}/api/juegos/activos`
        )

    ]);


    const usuario =
        await procesarRespuesta(
            respuestaPerfil
        );

    const jugadores =
        await procesarRespuesta(
            respuestaJugadores
        );

    const juegos =
        await procesarRespuesta(
            respuestaJuegos
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


    return {
        usuario,
        jugadores,
        juegos,
        equipos
    };
}


export async function crearEquipo(
    nuevoEquipo
) {

    const response =
        await fetch(
            `${API_URL}/api/equipos`,
            {
                method: "POST",
                headers:
                    obtenerHeadersAutenticados(),

                body: JSON.stringify(
                    nuevoEquipo
                )
            }
        );


    return procesarRespuesta(response);
}


export async function agregarMiembro(
    equipoId,
    miembro
) {

    const response =
        await fetch(
            `${API_URL}/api/equipos/${equipoId}/miembros`,
            {
                method: "POST",
                headers:
                    obtenerHeadersAutenticados(),

                body: JSON.stringify(
                    miembro
                )
            }
        );


    return procesarRespuesta(response);
}


export async function eliminarMiembro(
    equipoId,
    miembroId
) {

    const response =
        await fetch(
            `${API_URL}/api/equipos/${equipoId}/miembros/${miembroId}`,
            {
                method: "DELETE",
                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {
        await procesarRespuesta(response);
    }


    return true;
}


export async function eliminarEquipo(
    equipoId
) {

    const response =
        await fetch(
            `${API_URL}/api/equipos/${equipoId}`,
            {
                method: "DELETE",
                headers:
                    obtenerHeadersAutenticados()
            }
        );


    if (!response.ok) {
        await procesarRespuesta(response);
    }


    return true;
}


export const equiposService = {

    obtenerDatosEquipo,
    crearEquipo,
    agregarMiembro,
    eliminarMiembro,
    eliminarEquipo

};