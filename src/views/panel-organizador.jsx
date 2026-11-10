import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    obtenerDatosOrganizador
} from "../services/organizadorService.js";

import GestionInscripcionesOrganizador
    from "../components/GestionInscripcionesOrganizador.jsx";

import GestionPartidasOrganizador
    from "../components/GestionPartidasOrganizador.jsx";

import GestionResultadosOrganizador
    from "../components/GestionResultadosOrganizador.jsx";

import GestionSancionesOrganizador
    from "../components/GestionSancionesOrganizador.jsx";

import "./panel-organizador.css";


function PanelOrganizador() {

    const [
        torneos,
        setTorneos
    ] = useState([]);

    const [
        inscripciones,
        setInscripciones
    ] = useState([]);

    const [
        equipos,
        setEquipos
    ] = useState([]);

    const [
        jugadores,
        setJugadores
    ] = useState([]);

    const [
        partidas,
        setPartidas
    ] = useState([]);

    const [
        resultados,
        setResultados
    ] = useState([]);

    const [
        rankings,
        setRankings
    ] = useState([]);

    const [
        sanciones,
        setSanciones
    ] = useState([]);

    const [
        cargando,
        setCargando
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    async function cargarDatos() {

        try {

            const datos =
                await obtenerDatosOrganizador();


            setTorneos(
                datos.torneos
            );

            setInscripciones(
                datos.inscripciones
            );

            setEquipos(
                datos.equipos
            );

            setJugadores(
                datos.jugadores
            );

            setPartidas(
                datos.partidas
            );

            setResultados(
                datos.resultados
            );

            setRankings(
                datos.rankings
            );

            setSanciones(
                datos.sanciones
            );

            setError("");


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setCargando(
                false
            );

        }
    }


    useEffect(
        function () {

            cargarDatos();

        },
        []
    );


    const inscripcionesPendientes =
        useMemo(
            function () {

                return inscripciones.filter(
                    function (inscripcion) {

                        return (
                            inscripcion.estado ===
                            "PENDIENTE"
                        );

                    }
                ).length;

            },
            [inscripciones]
        );


    const partidasProgramadas =
        useMemo(
            function () {

                return partidas.filter(
                    function (partida) {

                        return (
                            partida.estado ===
                            "PROGRAMADA"
                        );

                    }
                ).length;

            },
            [partidas]
        );


    const resultadosPendientes =
        useMemo(
            function () {

                return resultados.filter(
                    function (resultado) {

                        return (
                            resultado.estadoValidacion ===
                            "PENDIENTE"
                        );

                    }
                ).length;

            },
            [resultados]
        );


    const sancionesActivas =
        useMemo(
            function () {

                return sanciones.filter(
                    function (sancion) {

                        return (
                            sancion.estado ===
                            "ACTIVA"
                        );

                    }
                ).length;

            },
            [sanciones]
        );


    if (cargando) {

        return (

            <main className="organizador-page">

                <div className="organizador-cargando">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p>
                        Cargando panel del organizador...
                    </p>

                </div>

            </main>

        );
    }


    return (

        <main className="organizador-page">


            <section className="organizador-hero">

                <div>

                    <span className="seccion-etiqueta">
                        ORGANIZACIÓN
                    </span>

                    <h1>
                        Centro competitivo
                    </h1>

                    <p>
                        Controla inscripciones,
                        partidas, resultados,
                        rankings y disciplina.
                    </p>

                </div>


                <div className="organizador-hero-estado">

                    <span
                        className="organizador-estado-punto"
                    />

                    <div>

                        <strong>
                            Operación activa
                        </strong>

                        <small>
                            Gestión de competencias
                        </small>

                    </div>

                </div>

            </section>


            {error && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {error}
                </div>

            )}


            <section className="organizador-kpis">


                <article>

                    <div className="organizador-kpi-icono">
                        I
                    </div>

                    <div>

                        <span>
                            INSCRIPCIONES
                        </span>

                        <strong>
                            {
                                inscripcionesPendientes
                            }
                        </strong>

                        <small>
                            pendientes
                        </small>

                    </div>

                </article>


                <article>

                    <div className="organizador-kpi-icono">
                        P
                    </div>

                    <div>

                        <span>
                            PARTIDAS
                        </span>

                        <strong>
                            {
                                partidas.length
                            }
                        </strong>

                        <small>
                            {
                                partidasProgramadas
                            } programadas
                        </small>

                    </div>

                </article>


                <article>

                    <div className="organizador-kpi-icono">
                        R
                    </div>

                    <div>

                        <span>
                            RESULTADOS
                        </span>

                        <strong>
                            {
                                resultados.length
                            }
                        </strong>

                        <small>
                            {
                                resultadosPendientes
                            } pendientes
                        </small>

                    </div>

                </article>


                <article>

                    <div className="organizador-kpi-icono">
                        !
                    </div>

                    <div>

                        <span>
                            SANCIONES
                        </span>

                        <strong>
                            {
                                sanciones.length
                            }
                        </strong>

                        <small>
                            {
                                sancionesActivas
                            } activas
                        </small>

                    </div>

                </article>

            </section>


            <section className="organizador-resumen">


                <div>

                    <span>
                        TORNEOS
                    </span>

                    <strong>
                        {
                            torneos.length
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        INSCRIPCIONES
                    </span>

                    <strong>
                        {
                            inscripciones.length
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        EQUIPOS
                    </span>

                    <strong>
                        {
                            equipos.length
                        }
                    </strong>

                </div>


                <div>

                    <span>
                        RANKINGS
                    </span>

                    <strong>
                        {
                            rankings.length
                        }
                    </strong>

                </div>

            </section>


            <nav className="organizador-nav">

                <a href="#organizador-inscripciones">

                    <span>
                        01
                    </span>

                    Inscripciones

                </a>


                <a href="#organizador-partidas">

                    <span>
                        02
                    </span>

                    Partidas

                </a>


                <a href="#organizador-resultados">

                    <span>
                        03
                    </span>

                    Resultados

                </a>

            </nav>


            <div
                id="organizador-inscripciones"
                className="organizador-modulo"
            >

                <div className="organizador-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            PARTICIPACIÓN
                        </span>

                        <h2>
                            Inscripciones pendientes
                        </h2>

                        <p>
                            Revisa y autoriza
                            participantes antes de
                            la competencia.
                        </p>

                    </div>


                    <span className="organizador-contador">

                        {
                            inscripcionesPendientes
                        }

                        {" pendientes"}

                    </span>

                </div>


                <GestionInscripcionesOrganizador
                    inscripciones={
                        inscripciones
                    }
                    torneos={
                        torneos
                    }
                    equipos={
                        equipos
                    }
                    jugadores={
                        jugadores
                    }
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="organizador-partidas"
                className="organizador-modulo"
            >

                <div className="organizador-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            CALENDARIO COMPETITIVO
                        </span>

                        <h2>
                            Gestión de partidas
                        </h2>

                        <p>
                            Programa y reprograma
                            enfrentamientos y controla
                            su estado.
                        </p>

                    </div>


                    <span className="organizador-contador">

                        {
                            partidas.length
                        }

                        {" partidas"}

                    </span>

                </div>


                <GestionPartidasOrganizador
                    torneos={
                        torneos
                    }
                    inscripciones={
                        inscripciones
                    }
                    equipos={
                        equipos
                    }
                    jugadores={
                        jugadores
                    }
                    partidas={
                        partidas
                    }
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="organizador-resultados"
                className="organizador-modulo"
            >

                <div className="organizador-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            COMPETICIÓN
                        </span>

                        <h2>
                            Resultados y ranking
                        </h2>

                        <p>
                            Registra resultados,
                            valida encuentros y
                            actualiza las posiciones.
                        </p>

                    </div>


                    <span className="organizador-contador">

                        {
                            resultados.length
                        }

                        {" resultados"}

                    </span>

                </div>


                <GestionResultadosOrganizador
                    partidas={
                        partidas
                    }
                    resultados={
                        resultados
                    }
                    torneos={
                        torneos
                    }
                    inscripciones={
                        inscripciones
                    }
                    equipos={
                        equipos
                    }
                    jugadores={
                        jugadores
                    }
                    rankings={
                        rankings
                    }
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="organizador-sanciones"
                className="organizador-modulo"
            >

                <div className="organizador-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            DISCIPLINA
                        </span>

                        <h2>
                            Gestión de sanciones
                        </h2>

                        <p>
                            Administra medidas
                            disciplinarias para
                            jugadores y equipos.
                        </p>

                    </div>


                    <span className="organizador-contador">

                        {
                            sanciones.length
                        }

                        {" sanciones"}

                    </span>

                </div>


                <GestionSancionesOrganizador
                    sanciones={
                        sanciones
                    }
                    jugadores={
                        jugadores
                    }
                    equipos={
                        equipos
                    }
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>

        </main>

    );
}


export default PanelOrganizador;