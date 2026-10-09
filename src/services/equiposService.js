import {
    equiposUsuario,
    jugadoresDisponibles
} from "../data/datos.js";


export function obtenerDatosEquipo() {

    return Promise.resolve({
        equipos: equiposUsuario,
        jugadores: jugadoresDisponibles
    });

}