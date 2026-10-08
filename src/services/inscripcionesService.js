import {
    torneos,
    equiposUsuario,
    usuarioActual
} from "../data/datos.js";


export function obtenerDatosInscripcion() {

    return Promise.resolve({
        torneos: torneos,
        equipos: equiposUsuario,
        usuario: usuarioActual
    });

}