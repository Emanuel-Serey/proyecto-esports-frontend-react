import {
    torneos,
    detalleTorneo
} from "../data/datos.js";


export function obtenerTorneos() {
    return Promise.resolve(torneos);
}


export function obtenerDetalleTorneo() {
    return Promise.resolve(detalleTorneo);
}