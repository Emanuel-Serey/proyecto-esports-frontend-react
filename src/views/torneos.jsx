import { useEffect, useState } from "react";

import {
    obtenerTorneos
} from "../services/torneosService.js";

import TarjetaTorneo
    from "../components/TarjetaTorneo.jsx";


function Torneos() {

    const [torneos, setTorneos] =
        useState([]);

    const [torneosFiltrados, setTorneosFiltrados] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);


    const [nombre, setNombre] =
        useState("");

    const [juego, setJuego] =
        useState("");

    const [estado, setEstado] =
        useState("");

    const [fechaInicio, setFechaInicio] =
        useState("");

    const [fechaFin, setFechaFin] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");


    // Cargar los torneos al entrar a la vista

    useEffect(function () {

        obtenerTorneos()
            .then(function (datos) {

                setTorneos(datos);

                setTorneosFiltrados(datos);

                setCargando(false);

            });

    }, []);


    function filtrarTorneos(event) {

        event.preventDefault();

        setMensaje("");


        // Validación de fechas

        if (
            fechaInicio &&
            fechaFin &&
            fechaInicio > fechaFin
        ) {

            setMensaje(
                "La fecha inicial no puede ser posterior a la fecha final."
            );

            setTorneosFiltrados([]);

            return;
        }


        const resultado =
            torneos.filter(function (torneo) {

                const coincideNombre =
                    torneo.nombre
                        .toLowerCase()
                        .includes(
                            nombre.toLowerCase()
                        );


                const coincideJuego =
                    juego === "" ||
                    torneo.juego === juego;


                const coincideEstado =
                    estado === "" ||
                    torneo.estado === estado;


                const coincideFechaInicio =
                    fechaInicio === "" ||
                    torneo.cierreInscripcion >=
                        fechaInicio;


                const coincideFechaFin =
                    fechaFin === "" ||
                    torneo.cierreInscripcion <=
                        fechaFin;


                return (
                    coincideNombre &&
                    coincideJuego &&
                    coincideEstado &&
                    coincideFechaInicio &&
                    coincideFechaFin
                );

            });


        setTorneosFiltrados(resultado);
    }


    return (

        <main className="container py-4">

            <section>

                <h2>
                    Listado de torneos
                </h2>

                <p>
                    Busca y filtra los torneos disponibles.
                </p>


                <form
                    onSubmit={filtrarTorneos}
                    className="row g-3 align-items-end mb-4"
                >

                    {/* Buscar por nombre */}

                    <div className="col-12 col-md-6 col-lg-3">

                        <label
                            htmlFor="buscar"
                            className="form-label"
                        >
                            Buscar por nombre:
                        </label>

                        <input
                            id="buscar"
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={function (event) {
                                setNombre(
                                    event.target.value
                                );
                            }}
                            placeholder="Ej: Arena Masters"
                            autoComplete="off"
                        />

                    </div>


                    {/* Juego */}

                    <div className="col-12 col-md-6 col-lg-2">

                        <label
                            htmlFor="juego"
                            className="form-label"
                        >
                            Juego:
                        </label>

                        <select
                            id="juego"
                            className="form-select"
                            value={juego}
                            onChange={function (event) {
                                setJuego(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="">
                                Todos
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


                    {/* Estado */}

                    <div className="col-12 col-md-6 col-lg-2">

                        <label
                            htmlFor="estado"
                            className="form-label"
                        >
                            Estado:
                        </label>

                        <select
                            id="estado"
                            className="form-select"
                            value={estado}
                            onChange={function (event) {
                                setEstado(
                                    event.target.value
                                );
                            }}
                        >

                            <option value="">
                                Todos
                            </option>

                            <option value="Abierto">
                                Abierto
                            </option>

                            <option value="En curso">
                                En curso
                            </option>

                        </select>

                    </div>


                    {/* Desde */}

                    <div className="col-12 col-md-6 col-lg-2">

                        <label
                            htmlFor="fecha-inicio"
                            className="form-label"
                        >
                            Desde:
                        </label>

                        <input
                            id="fecha-inicio"
                            type="date"
                            className="form-control"
                            value={fechaInicio}
                            onChange={function (event) {
                                setFechaInicio(
                                    event.target.value
                                );
                            }}
                        />

                    </div>


                    {/* Hasta */}

                    <div className="col-12 col-md-6 col-lg-2">

                        <label
                            htmlFor="fecha-fin"
                            className="form-label"
                        >
                            Hasta:
                        </label>

                        <input
                            id="fecha-fin"
                            type="date"
                            className="form-control"
                            value={fechaFin}
                            onChange={function (event) {
                                setFechaFin(
                                    event.target.value
                                );
                            }}
                        />

                    </div>


                    {/* Botón */}

                    <div className="col-12 col-md-6 col-lg-1">

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Filtrar
                        </button>

                    </div>

                </form>


                {/* Error */}

                {mensaje && (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {mensaje}
                    </div>

                )}


                {/* Cargando */}

                {cargando ? (

                    <p>
                        Cargando torneos...
                    </p>

                ) : (

                    <div className="row g-3">

                        {torneosFiltrados.length === 0 &&
                        !mensaje ? (

                            <div className="col-12">

                                <div
                                    className="alert alert-secondary"
                                    role="alert"
                                >
                                    No se encontraron torneos.
                                </div>

                            </div>

                        ) : (

                            torneosFiltrados.map(
                                function (torneo) {

                                    return (

                                        <div
                                            className="col-12 col-md-6 col-lg-4"
                                            key={torneo.nombre}
                                        >

                                            <TarjetaTorneo
                                                torneo={torneo}
                                            />

                                        </div>

                                    );

                                }
                            )

                        )}

                    </div>

                )}

            </section>

        </main>

    );
}


export default Torneos;