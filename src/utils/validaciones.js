export function cuposDisponibles(cupoMaximo, inscritos) {
    return Math.max(cupoMaximo - inscritos, 0);
}


export function inscripcionFueraDePlazo(
    fechaCierre,
    fechaActual = new Date()
) {
    const hoy = fechaActual
        .toISOString()
        .split("T")[0];

    return hoy > fechaCierre;
}


export function tieneSancionActiva(participante) {
    return participante.sancionVigente === true;
}


export function equipoCompleto(
    equipo,
    integrantesRequeridos
) {
    return equipo.integrantes >= integrantesRequeridos;
}