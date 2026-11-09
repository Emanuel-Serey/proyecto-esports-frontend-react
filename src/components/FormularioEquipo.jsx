import { useEffect, useMemo, useState } from "react";

import {
    equiposService
} from "../services/equiposService.js";

import ListaIntegrantes
    from "./ListaIntegrantes.jsx";


function FormularioEquipo() {

    const [usuario, setUsuario] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [juegos, setJuegos] = useState([]);

    const [equipoActual, setEquipoActual] = useState(null);
    const [integrantes, setIntegrantes] = useState([]);

    const [nombreEquipo, setNombreEquipo] = useState("");
    const [juegoEquipo, setJuegoEquipo] = useState("");

    const [nuevoIntegrante, setNuevoIntegrante] = useState("");
    const [rolIntegrante, setRolIntegrante] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(true);


    useEffect(function () {

        equiposService.obtenerDatosEquipo()
            .then(function (datos) {

                setUsuario(datos.usuario);

                setJugadores(
                    datos.jugadores.filter(function (jugador) {
                        return jugador.estado === "ACTIVO";
                    })
                );

                setJuegos(
                    datos.juegos.filter(function (juego) {
                        return juego.estado === true;
                    })
                );


                const equipoActivo =
                    datos.equipos.find(function (equipo) {
                        return equipo.estado === "ACTIVO";
                    });


                if (equipoActivo) {

                    setEquipoActual(equipoActivo);

                    setNombreEquipo(
                        equipoActivo.nombre
                    );

                    setJuegoEquipo(
                        String(
                            equipoActivo.juegoPrincipalId
                        )
                    );

                    setIntegrantes(
                        equipoActivo.miembros || []
                    );
                }

            })
            .catch(function (error) {

                setMensaje(error.message);

            })
            .finally(function () {

                setCargando(false);

            });

    }, []);


    const jugadoresDisponibles =
        useMemo(function () {

            return jugadores.filter(function (jugador) {

                if (
                    usuario &&
                    jugador.id === usuario.id
                ) {
                    return false;
                }


                const yaPertenece =
                    integrantes.some(function (miembro) {
                        return (
                            miembro.usuarioId ===
                            jugador.id
                        );
                    });


                return !yaPertenece;

            });

        }, [
            jugadores,
            integrantes,
            usuario
        ]);


    const integrantesVisuales =
        integrantes.map(function (miembro) {

            const jugador =
                jugadores.find(function (item) {
                    return (
                        item.id ===
                        miembro.usuarioId
                    );
                });


            return {
                ...miembro,

                jugador:
                    jugador
                        ? jugador.nickname
                        : `Usuario ${miembro.usuarioId}`,

                rol:
                    formatearRol(
                        miembro.rolDentroEquipo
                    )
            };

        });


    function formatearRol(rol) {

        if (rol === "CAPITAN") {
            return "Capitán";
        }

        if (rol === "TITULAR") {
            return "Titular";
        }

        if (rol === "SUPLENTE") {
            return "Suplente";
        }

        return rol;
    }


    async function crearEquipo(event) {

        event.preventDefault();

        setMensaje("");


        if (!usuario) {

            setMensaje(
                "No se pudo identificar al usuario autenticado."
            );

            return;
        }


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


        const nuevoEquipo = {

            nombre:
                nombreEquipo.trim(),

            capitanId:
                usuario.id,

            juegoPrincipalId:
                Number(juegoEquipo),

            miembros: [
                {
                    usuarioId:
                        usuario.id,

                    rolDentroEquipo:
                        "CAPITAN"
                }
            ]

        };


        try {

            const equipoCreado =
                await equiposService.crearEquipo(
                    nuevoEquipo
                );


            setEquipoActual(
                equipoCreado
            );

            setIntegrantes(
                equipoCreado.miembros || []
            );

            setMensaje(
                "Equipo creado correctamente."
            );

        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function agregarIntegrante() {

        setMensaje("");


        if (!equipoActual) {

            setMensaje(
                "Primero debes crear un equipo."
            );

            return;
        }


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


        const miembro = {

            usuarioId:
                Number(nuevoIntegrante),

            rolDentroEquipo:
                rolIntegrante

        };


        try {

            const miembroCreado =
                await equiposService.agregarMiembro(
                    equipoActual.id,
                    miembro
                );


            setIntegrantes(function (anteriores) {

                return [
                    ...anteriores,
                    miembroCreado
                ];

            });


            setNuevoIntegrante("");
            setRolIntegrante("");

            setMensaje(
                "Integrante agregado correctamente."
            );

        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function quitarIntegrante(
        indiceQuitar
    ) {

        setMensaje("");


        const integrante =
            integrantesVisuales[
                indiceQuitar
            ];


        if (
            integrante.rolDentroEquipo ===
            "CAPITAN"
        ) {

            setMensaje(
                "El capitán no puede ser eliminado del equipo."
            );

            return;
        }


        try {

            await equiposService.eliminarMiembro(
                equipoActual.id,
                integrante.id
            );


            setIntegrantes(function (anteriores) {

                return anteriores.filter(
                    function (miembro) {

                        return (
                            miembro.id !==
                            integrante.id
                        );

                    }
                );

            });


            setMensaje(
                "Integrante eliminado correctamente."
            );

        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function borrarEquipo() {

        setMensaje("");


        if (!equipoActual) {
            return;
        }


        try {

            await equiposService.eliminarEquipo(
                equipoActual.id
            );


            setEquipoActual(null);
            setIntegrantes([]);

            setNombreEquipo("");
            setJuegoEquipo("");
            setNuevoIntegrante("");
            setRolIntegrante("");

            setMensaje(
                "Equipo eliminado correctamente."
            );

        } catch (error) {

            setMensaje(
                error.message
            );

        }
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

            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title">
                        Gestión de equipo
                    </h2>


                    <p className="card-text">

                        Crea tu equipo y administra
                        sus integrantes.

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
                                    onChange={
                                        function (event) {

                                            setNombreEquipo(
                                                event.target.value
                                            );

                                            setMensaje("");

                                        }
                                    }
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
                                    onChange={
                                        function (event) {

                                            setJuegoEquipo(
                                                event.target.value
                                            );

                                            setMensaje("");

                                        }
                                    }
                                >

                                    <option value="">
                                        Selecciona un juego
                                    </option>


                                    {juegos.map(
                                        function (juego) {

                                            return (

                                                <option
                                                    key={juego.id}
                                                    value={juego.id}
                                                >
                                                    {juego.nombre}
                                                </option>

                                            );

                                        }
                                    )}

                                </select>

                            </div>


                            <div className="col-12 col-md-4">

                                <label
                                    className="form-label"
                                >
                                    Capitán:
                                </label>


                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        usuario
                                            ? usuario.nickname
                                            : ""
                                    }
                                    disabled
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={
                                equipoActual !== null
                            }
                        >

                            {
                                equipoActual
                                    ? "Equipo creado"
                                    : "Crear equipo"
                            }

                        </button>

                    </form>

                </div>

            </section>


            {equipoActual && (

                <section className="card mb-4">

                    <div className="card-body">


                        <div
                            className="
                                d-flex
                                justify-content-between
                                align-items-center
                                flex-wrap
                                gap-2
                                mb-3
                            "
                        >

                            <h2 className="card-title mb-0">

                                Integrantes de{" "}
                                {equipoActual.nombre}

                            </h2>


                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={borrarEquipo}
                            >
                                Eliminar equipo
                            </button>

                        </div>


                        <div
                            className="
                                row
                                g-3
                                align-items-end
                                mb-4
                            "
                        >


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
                                    onChange={
                                        function (event) {

                                            setNuevoIntegrante(
                                                event.target.value
                                            );

                                            setMensaje("");

                                        }
                                    }
                                >

                                    <option value="">
                                        Selecciona un jugador
                                    </option>


                                    {jugadoresDisponibles.map(
                                        function (jugador) {

                                            return (

                                                <option
                                                    key={jugador.id}
                                                    value={jugador.id}
                                                >
                                                    {jugador.nickname}
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
                                    onChange={
                                        function (event) {

                                            setRolIntegrante(
                                                event.target.value
                                            );

                                            setMensaje("");

                                        }
                                    }
                                >

                                    <option value="">
                                        Selecciona un rol
                                    </option>

                                    <option value="TITULAR">
                                        Titular
                                    </option>

                                    <option value="SUPLENTE">
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
                            integrantes={
                                integrantesVisuales
                            }
                            onQuitar={
                                quitarIntegrante
                            }
                        />

                    </div>

                </section>

            )}


            {mensaje && (

                <div
                    className={
                        mensaje.includes(
                            "correctamente"
                        )
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