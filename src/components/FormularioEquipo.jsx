import { useEffect, useState } from "react";

import {
    obtenerDatosEquipo
} from "../services/equiposService.js";

import ListaIntegrantes
    from "./ListaIntegrantes.jsx";


function FormularioEquipo() {

    const [jugadores, setJugadores] =
        useState([]);

    const [nombresEquipos, setNombresEquipos] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);


    const [nombreEquipo, setNombreEquipo] =
        useState("");

    const [juegoEquipo, setJuegoEquipo] =
        useState("");

    const [capitanEquipo, setCapitanEquipo] =
        useState("");

    const [equipoActual, setEquipoActual] =
        useState(null);

    const [integrantes, setIntegrantes] =
        useState([]);

    const [nuevoIntegrante, setNuevoIntegrante] =
        useState("");

    const [rolIntegrante, setRolIntegrante] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");


    useEffect(function () {

        obtenerDatosEquipo()
            .then(function (datos) {

                setJugadores(datos.jugadores);

                setNombresEquipos(
                    datos.equipos.map(
                        function (equipo) {
                            return equipo.nombre;
                        }
                    )
                );

                setCargando(false);

            });

    }, []);


    function crearEquipo(event) {

        event.preventDefault();

        setMensaje("");


        if (nombreEquipo.trim() === "") {

            setMensaje(
                "Debes ingresar un nombre para el equipo."
            );

            return;
        }


        if (juegoEquipo === "") {

            setMensaje(
                "Debes seleccionar un juego principal."
            );

            return;
        }


        if (capitanEquipo === "") {

            setMensaje(
                "Debes seleccionar un capitán."
            );

            return;
        }


        const nombreRepetido =
            nombresEquipos.some(function (nombre) {

                return (
                    nombre.toLowerCase() ===
                    nombreEquipo.trim().toLowerCase()
                );

            });


        if (nombreRepetido) {

            setMensaje(
                "Ya existe un equipo con este nombre."
            );

            return;
        }


        const nuevoEquipo = {

            nombre: nombreEquipo.trim(),

            juego: juegoEquipo,

            capitan: capitanEquipo,

            estado: "Activo"

        };


        setEquipoActual(nuevoEquipo);


        setNombresEquipos(
            function (anteriores) {

                return [
                    ...anteriores,
                    nuevoEquipo.nombre
                ];

            }
        );


        setIntegrantes([
            {
                jugador: capitanEquipo,
                rol: "Capitán"
            }
        ]);


        setMensaje(
            "Equipo creado correctamente."
        );
    }


    function agregarIntegrante() {

        setMensaje("");


        if (nuevoIntegrante === "") {

            setMensaje(
                "Debes seleccionar un jugador."
            );

            return;
        }


        if (rolIntegrante === "") {

            setMensaje(
                "Debes seleccionar un rol."
            );

            return;
        }


        const jugadorRepetido =
            integrantes.some(
                function (integrante) {

                    return (
                        integrante.jugador ===
                        nuevoIntegrante
                    );

                }
            );


        if (jugadorRepetido) {

            setMensaje(
                "Este jugador ya pertenece al equipo."
            );

            return;
        }


        setIntegrantes(
            function (anteriores) {

                return [
                    ...anteriores,
                    {
                        jugador: nuevoIntegrante,
                        rol: rolIntegrante
                    }
                ];

            }
        );


        setNuevoIntegrante("");
        setRolIntegrante("");


        setMensaje(
            "Integrante agregado correctamente."
        );
    }


    function quitarIntegrante(indiceQuitar) {

        setIntegrantes(
            function (anteriores) {

                return anteriores.filter(
                    function (integrante, indice) {

                        return indice !== indiceQuitar;

                    }
                );

            }
        );


        setMensaje("");
    }


    if (cargando) {

        return (

            <section className="card mb-4">

                <div className="card-body">

                    <p className="mb-0">
                        Cargando información de equipos...
                    </p>

                </div>

            </section>

        );

    }


    return (
        <>

            {/* Crear equipo */}

            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title">
                        Gestión de equipo
                    </h2>

                    <p className="card-text">
                        Crea tu equipo y administra sus integrantes.
                    </p>


                    <form onSubmit={crearEquipo}>

                        <div className="row g-3">

                            <div className="col-12 col-md-4">

                                <label
                                    htmlFor="nombre-equipo"
                                    className="form-label"
                                >
                                    Nombre del equipo:
                                </label>

                                <input
                                    id="nombre-equipo"
                                    type="text"
                                    className="form-control"
                                    value={nombreEquipo}
                                    disabled={
                                        equipoActual !== null
                                    }
                                    onChange={function (event) {

                                        setNombreEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }}
                                />

                            </div>


                            <div className="col-12 col-md-4">

                                <label
                                    htmlFor="juego-equipo"
                                    className="form-label"
                                >
                                    Juego principal:
                                </label>

                                <select
                                    id="juego-equipo"
                                    className="form-select"
                                    value={juegoEquipo}
                                    disabled={
                                        equipoActual !== null
                                    }
                                    onChange={function (event) {

                                        setJuegoEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }}
                                >

                                    <option value="">
                                        Selecciona un juego
                                    </option>

                                    <option value="Valorant">
                                        Valorant
                                    </option>

                                    <option value="League of Legends">
                                        League of Legends
                                    </option>

                                    <option value="Rocket League">
                                        Rocket League
                                    </option>

                                </select>

                            </div>


                            <div className="col-12 col-md-4">

                                <label
                                    htmlFor="capitan-equipo"
                                    className="form-label"
                                >
                                    Capitán:
                                </label>

                                <select
                                    id="capitan-equipo"
                                    className="form-select"
                                    value={capitanEquipo}
                                    disabled={
                                        equipoActual !== null
                                    }
                                    onChange={function (event) {

                                        setCapitanEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }}
                                >

                                    <option value="">
                                        Selecciona un capitán
                                    </option>


                                    {jugadores.map(
                                        function (jugador) {

                                            return (

                                                <option
                                                    key={jugador}
                                                    value={jugador}
                                                >
                                                    {jugador}
                                                </option>

                                            );

                                        }
                                    )}

                                </select>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={
                                equipoActual !== null
                            }
                        >

                            {equipoActual
                                ? "Equipo creado"
                                : "Crear equipo"}

                        </button>

                    </form>

                </div>

            </section>


            {/* Integrantes */}

            {equipoActual && (

                <section className="card mb-4">

                    <div className="card-body">

                        <h2 className="card-title mb-3">
                            Integrantes de {equipoActual.nombre}
                        </h2>


                        <div className="row g-3 align-items-end mb-4">

                            <div className="col-12 col-md-5">

                                <label
                                    htmlFor="nuevo-integrante"
                                    className="form-label"
                                >
                                    Agregar jugador:
                                </label>

                                <select
                                    id="nuevo-integrante"
                                    className="form-select"
                                    value={nuevoIntegrante}
                                    onChange={function (event) {

                                        setNuevoIntegrante(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }}
                                >

                                    <option value="">
                                        Selecciona un jugador
                                    </option>


                                    {jugadores.map(
                                        function (jugador) {

                                            return (

                                                <option
                                                    key={jugador}
                                                    value={jugador}
                                                >
                                                    {jugador}
                                                </option>

                                            );

                                        }
                                    )}

                                </select>

                            </div>


                            <div className="col-12 col-md-4">

                                <label
                                    htmlFor="rol-integrante"
                                    className="form-label"
                                >
                                    Rol:
                                </label>

                                <select
                                    id="rol-integrante"
                                    className="form-select"
                                    value={rolIntegrante}
                                    onChange={function (event) {

                                        setRolIntegrante(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }}
                                >

                                    <option value="">
                                        Selecciona un rol
                                    </option>

                                    <option value="Titular">
                                        Titular
                                    </option>

                                    <option value="Suplente">
                                        Suplente
                                    </option>

                                </select>

                            </div>


                            <div className="col-12 col-md-3">

                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={agregarIntegrante}
                                >
                                    Agregar
                                </button>

                            </div>

                        </div>


                        <ListaIntegrantes
                            integrantes={integrantes}
                            onQuitar={quitarIntegrante}
                        />

                    </div>

                </section>

            )}


            {/* Mensajes */}

            {mensaje && (

                <div
                    className={
                        mensaje.includes("correctamente")
                            ? "alert alert-success"
                            : "alert alert-danger"
                    }
                    role="alert"
                >
                    {mensaje}
                </div>

            )}

        </>
    );
}


export default FormularioEquipo;