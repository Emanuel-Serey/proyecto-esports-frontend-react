import {
    usuarioActual,
    perfilJugador
} from "../data/datos.js";


export function obtenerPerfilJugador() {

    return Promise.resolve({
        usuario: usuarioActual,
        perfil: perfilJugador
    });

}