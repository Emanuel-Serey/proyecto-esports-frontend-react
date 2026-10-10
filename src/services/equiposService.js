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


export function crearEquipo(nuevoEquipo) {

    const existeEquipo =
        equiposUsuario.some(function (equipo) {

            return (
                equipo.nombre.toLowerCase() ===
                nuevoEquipo.nombre.toLowerCase()
            );

        });


    if (existeEquipo) {

        return Promise.reject(
            new Error(
                "Ya existe un equipo con este nombre."
            )
        );

    }


    const equipoCreado = {
        nombre: nuevoEquipo.nombre,
        juego: nuevoEquipo.juego,
        capitan: nuevoEquipo.capitan,
        miembros: nuevoEquipo.miembros || [],
        integrantes:
            nuevoEquipo.miembros
                ? nuevoEquipo.miembros.length
                : 0,
        sancionVigente: false,
        estado: "Activo"
    };


    equiposUsuario.push(equipoCreado);


    return Promise.resolve(equipoCreado);

}


export function actualizarEquipo(
    nombreEquipo,
    cambios
) {

    const indice =
        equiposUsuario.findIndex(
            function (equipo) {

                return (
                    equipo.nombre === nombreEquipo
                );

            }
        );


    if (indice === -1) {

        return Promise.reject(
            new Error(
                "No se encontró el equipo."
            )
        );

    }


    equiposUsuario[indice] = {
        ...equiposUsuario[indice],
        ...cambios
    };


    return Promise.resolve(
        equiposUsuario[indice]
    );

}


export function eliminarEquipo(nombreEquipo) {

    const indice =
        equiposUsuario.findIndex(
            function (equipo) {

                return (
                    equipo.nombre === nombreEquipo
                );

            }
        );


    if (indice === -1) {

        return Promise.reject(
            new Error(
                "No se encontró el equipo."
            )
        );

    }


    const equipoEliminado =
        equiposUsuario.splice(
            indice,
            1
        )[0];


    return Promise.resolve(
        equipoEliminado
    );

}


/*
    Objeto utilizado por los componentes y también permite aplicar spyOn en las pruebas*/
export const equiposService = {

    obtenerDatosEquipo,
    crearEquipo,
    actualizarEquipo,
    eliminarEquipo

};