import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    obtenerTorneos
} from "../services/torneosService.js";

import TarjetaTorneo
    from "../components/TarjetaTorneo.jsx";

import "./torneos.css";


function Torneos() {

    const [
        torneos,
        setTorneos
    ] = useState([]);

    const [
        torneosFiltrados,
        setTorneosFiltrados
    ] = useState([]);

    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        nombre,
        setNombre
    ] = useState("");

    const [
        juego,
        setJuego
    ] = useState("");

    const [
        estado,
        setEstado
    ] = useState("");

    const [
        fechaInicio,
        setFechaInicio
    ] = useState("");

    const [
        fechaFin,
        setFechaFin
    ] = useState("");

    const [
        mensaje,
        setMensaje
    ] = useState("");


    useEffect(
        function () {

            obtenerTorneos()
                .then(
                    function (datos) {

                        setTorneos(
                            datos
                        );

                        setTorneosFiltrados(
                            datos
                        );

                    }
                )
                .finally(
                    function () {

                        setCargando(
                            false
                        );

                    }
                );

        },
        []
    );


    const cantidadAbiertos =
        useMemo(
            function () {

                return torneos.filter(
                    function (torneo) {

                        return String(
                            torneo.estado
                        )
                            .toLowerCase()
                            .includes(
                                "abierto"
                            );

                    }
                ).length;

            },
            [torneos]
        );


    const cantidadEnCurso =
        useMemo(
            function () {

                return torneos.filter(
                    function (torneo) {

                        return String(
                            torneo.estado
                        )
                            .toLowerCase()
                            .includes(
                                "curso"
                            );

                    }
                ).length;

            },
            [torneos]
        );


    const cantidadJuegos =
        useMemo(
            function () {

                return new Set(
                    torneos.map(
                        function (torneo) {

                            return torneo.juego;

                        }
                    )
                ).size;

            },
            [torneos]
        );


    function filtrarTorneos(
        event
    ) {

        event.preventDefault();

        setMensaje("");


        if (
            fechaInicio &&
            fechaFin &&
            fechaInicio >
            fechaFin
        ) {

            setMensaje(
                "La fecha inicial no puede ser posterior a la fecha final."
            );

            setTorneosFiltrados(
                []
            );

            return;
        }


        const resultado =
            torneos.filter(
                function (torneo) {

                    const coincideNombre =
                        torneo.nombre
                            .toLowerCase()
                            .includes(
                                nombre
                                    .toLowerCase()
                            );


                    const coincideJuego =
                        juego === "" ||
                        torneo.juego ===
                        juego;


                    const coincideEstado =
                        estado === "" ||
                        torneo.estado ===
                        estado;


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

                }
            );


        setTorneosFiltrados(
            resultado
        );
    }


    function limpiarFiltros() {

        setNombre("");
        setJuego("");
        setEstado("");
        setFechaInicio("");
        setFechaFin("");
        setMensaje("");

        setTorneosFiltrados(
            torneos
        );
    }


    return (

        <main className="container py-4">


            <section className="torneos-hero">

                <div className="torneos-hero-contenido">

                    <span className="seccion-etiqueta">
                        COMPETICIÓN
                    </span>


                    <h1>
                        Encuentra tu próximo
                        <span>
                            {" "}desafío
                        </span>
                    </h1>


                    <p>
                        Descubre torneos, forma tu equipo
                        y compite por llegar a lo más alto.
                    </p>

                </div>


                <div className="torneos-resumen">


                    <div>

                        <strong>
                            {torneos.length}
                        </strong>

                        <span>
                            Torneos
                        </span>

                    </div>


                    <div>

                        <strong>
                            {cantidadAbiertos}
                        </strong>

                        <span>
                            Abiertos
                        </span>

                    </div>


                    <div>

                        <strong>
                            {cantidadEnCurso}
                        </strong>

                        <span>
                            En curso
                        </span>

                    </div>


                    <div>

                        <strong>
                            {cantidadJuegos}
                        </strong>

                        <span>
                            Juegos
                        </span>

                    </div>

                </div>

            </section>


            <section className="torneos-contenido">


                <div className="seccion-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            EXPLORAR
                        </span>

                        <h2>
                            Todos los torneos
                        </h2>

                        <p>
                            Filtra y encuentra la competencia
                            perfecta para ti.
                        </p>

                    </div>

                </div>


                <form
                    onSubmit={
                        filtrarTorneos
                    }
                    className="filtros-torneos"
                >


                    <div className="filtro-busqueda">

                        <label
                            htmlFor="buscar"
                            className="form-label"
                        >
                            Buscar torneo
                        </label>

                        <input
                            id="buscar"
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={
                                function (event) {

                                    setNombre(
                                        event.target.value
                                    );

                                }
                            }
                            placeholder="Buscar por nombre..."
                            autoComplete="off"
                        />

                    </div>


                    <div>

                        <label
                            htmlFor="juego"
                            className="form-label"
                        >
                            Juego
                        </label>

                        <select
                            id="juego"
                            className="form-select"
                            value={juego}
                            onChange={
                                function (event) {

                                    setJuego(
                                        event.target.value
                                    );

                                }
                            }
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


                    <div>

                        <label
                            htmlFor="estado"
                            className="form-label"
                        >
                            Estado
                        </label>

                        <select
                            id="estado"
                            className="form-select"
                            value={estado}
                            onChange={
                                function (event) {

                                    setEstado(
                                        event.target.value
                                    );

                                }
                            }
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


                    <div>

                        <label
                            htmlFor="fecha-inicio"
                            className="form-label"
                        >
                            Desde
                        </label>

                        <input
                            id="fecha-inicio"
                            type="date"
                            className="form-control"
                            value={fechaInicio}
                            onChange={
                                function (event) {

                                    setFechaInicio(
                                        event.target.value
                                    );

                                }
                            }
                        />

                    </div>


                    <div>

                        <label
                            htmlFor="fecha-fin"
                            className="form-label"
                        >
                            Hasta
                        </label>

                        <input
                            id="fecha-fin"
                            type="date"
                            className="form-control"
                            value={fechaFin}
                            onChange={
                                function (event) {

                                    setFechaFin(
                                        event.target.value
                                    );

                                }
                            }
                        />

                    </div>


                    <div className="filtro-botones">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Filtrar
                        </button>


                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={
                                limpiarFiltros
                            }
                        >
                            Limpiar
                        </button>

                    </div>

                </form>


                {mensaje && (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {mensaje}
                    </div>

                )}


                <div className="resultado-torneos-cabecera">

                    <span>

                        {
                            torneosFiltrados.length
                        }

                        {" "}

                        {
                            torneosFiltrados.length ===
                            1
                                ? "torneo encontrado"
                                : "torneos encontrados"
                        }

                    </span>

                </div>


                {cargando ? (

                    <div className="cargando-torneos">

                        <div className="spinner-border" />

                        <p>
                            Cargando torneos...
                        </p>

                    </div>

                ) : torneosFiltrados.length ===
                    0 &&
                    !mensaje ? (

                    <div className="estado-vacio">

                        <div className="estado-vacio-icono">
                            ◇
                        </div>

                        <h3>
                            No encontramos torneos
                        </h3>

                        <p>
                            Prueba modificando los filtros
                            de búsqueda.
                        </p>

                    </div>

                ) : (

                    <div className="row g-4">

                        {
                            torneosFiltrados.map(
                                function (torneo) {

                                    return (

                                        <div
                                            className="
                                                col-12
                                                col-md-6
                                                col-xl-4
                                            "
                                            key={
                                                torneo.id
                                            }
                                        >

                                            <TarjetaTorneo
                                                torneo={
                                                    torneo
                                                }
                                            />

                                        </div>

                                    );

                                }
                            )
                        }

                    </div>

                )}

            </section>

        </main>

    );
}


export default Torneos;