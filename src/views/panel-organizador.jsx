import {
    useEffect,
    useState
} from "react";

import {
    obtenerDatosOrganizador
} from "../services/organizadorService.js";

import GestionPartidasOrganizador
    from "../components/GestionPartidasOrganizador.jsx";

import GestionResultadosOrganizador
    from "../components/GestionResultadosOrganizador.jsx";

import GestionSancionesOrganizador
    from "../components/GestionSancionesOrganizador.jsx";


function PanelOrganizador() {

    const [torneos, setTorneos] =
        useState([]);

    const [inscripciones, setInscripciones] =
        useState([]);

    const [equipos, setEquipos] =
        useState([]);

    const [jugadores, setJugadores] =
        useState([]);

    const [partidas, setPartidas] =
        useState([]);

    const [resultados, setResultados] =
        useState([]);

    const [rankings, setRankings] =
        useState([]);

    const [sanciones, setSanciones] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


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

            setCargando(false);

        }
    }


    useEffect(function () {

        cargarDatos();

    }, []);


    if (cargando) {

        return (

            <main className="container py-4">

                <section className="card">

                    <div className="card-body">

                        <p className="mb-0">
                            Cargando panel del organizador...
                        </p>

                    </div>

                </section>

            </main>

        );
    }


    return (

        <main className="container py-4">


            {/* ENCABEZADO */}

            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title">
                        Panel del organizador
                    </h2>


                    <p className="card-text mb-0">
                        Gestiona partidas, resultados,
                        rankings y sanciones.
                    </p>

                </div>

            </section>


            {/* ERROR GENERAL */}

            {error && (

                <div
                    className="alert alert-danger"
                    role="alert"
                >
                    {error}
                </div>

            )}


            {/* RESUMEN */}

            <section className="row g-3 mb-4">


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Partidas
                            </h3>

                            <p className="fs-3 mb-0">
                                {partidas.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Resultados
                            </h3>

                            <p className="fs-3 mb-0">
                                {resultados.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Registros ranking
                            </h3>

                            <p className="fs-3 mb-0">
                                {rankings.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Sanciones
                            </h3>

                            <p className="fs-3 mb-0">
                                {sanciones.length}
                            </p>

                        </div>

                    </article>

                </div>

            </section>


            {/* PARTIDAS */}

            <GestionPartidasOrganizador
                torneos={torneos}
                inscripciones={inscripciones}
                equipos={equipos}
                jugadores={jugadores}
                partidas={partidas}
                onRecargar={cargarDatos}
            />


            {/* RESULTADOS Y RANKING */}

            <GestionResultadosOrganizador
                partidas={partidas}
                resultados={resultados}
                torneos={torneos}
                inscripciones={inscripciones}
                equipos={equipos}
                jugadores={jugadores}
                rankings={rankings}
                onRecargar={cargarDatos}
            />


            {/* SANCIONES */}

            <GestionSancionesOrganizador
                sanciones={sanciones}
                jugadores={jugadores}
                equipos={equipos}
                onRecargar={cargarDatos}
            />

        </main>

    );
}


export default PanelOrganizador;