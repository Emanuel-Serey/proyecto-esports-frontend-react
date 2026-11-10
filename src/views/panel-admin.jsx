import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    obtenerDatosAdmin
} from "../services/adminService.js";

import GestionUsuariosAdmin
    from "../components/GestionUsuariosAdmin.jsx";

import GestionJuegosAdmin
    from "../components/GestionJuegosAdmin.jsx";

import GestionTorneosAdmin
    from "../components/GestionTorneosAdmin.jsx";

import GestionPremiosAdmin
    from "../components/GestionPremiosAdmin.jsx";

import "./panel-admin.css";


function PanelAdmin() {

    const [
        usuarios,
        setUsuarios
    ] = useState([]);

    const [
        cuentas,
        setCuentas
    ] = useState([]);

    const [
        juegos,
        setJuegos
    ] = useState([]);

    const [
        torneos,
        setTorneos
    ] = useState([]);

    const [
        premios,
        setPremios
    ] = useState([]);

    const [
        rankings,
        setRankings
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
                await obtenerDatosAdmin();


            setUsuarios(
                datos.usuarios
            );


            setCuentas(
                datos.cuentas
            );


            setJuegos(
                datos.juegos
            );


            setTorneos(
                datos.torneos
            );


            setPremios(
                datos.premios
            );


            setRankings(
                datos.rankings
            );


            setInscripciones(
                datos.inscripciones
            );


            setEquipos(
                datos.equipos
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


    useEffect(
        function () {

            cargarDatos();

        },
        []
    );


    const usuariosActivos =
        useMemo(
            function () {

                return usuarios.filter(
                    function (usuario) {

                        return (
                            usuario.estado ===
                            "ACTIVO"
                        );

                    }
                ).length;

            },
            [usuarios]
        );


    const juegosActivos =
        useMemo(
            function () {

                return juegos.filter(
                    function (juego) {

                        return (
                            juego.estado ===
                            true
                        );

                    }
                ).length;

            },
            [juegos]
        );


    const torneosActivos =
        useMemo(
            function () {

                return torneos.filter(
                    function (torneo) {

                        return (
                            torneo.estado ===
                                "ABIERTO" ||
                            torneo.estado ===
                                "EN_CURSO"
                        );

                    }
                ).length;

            },
            [torneos]
        );


    const premiosPendientes =
        useMemo(
            function () {

                return premios.filter(
                    function (premio) {

                        return (
                            premio.estadoEntrega ===
                            "PENDIENTE"
                        );

                    }
                ).length;

            },
            [premios]
        );


    if (cargando) {

        return (

            <main className="admin-page">

                <div className="admin-cargando">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p>
                        Cargando panel de administración...
                    </p>

                </div>

            </main>

        );
    }


    return (

        <main className="admin-page">


            {/* =========================
                CABECERA
            ========================= */}

            <section className="admin-hero">

                <div>

                    <span className="seccion-etiqueta">
                        ADMINISTRACIÓN
                    </span>


                    <h1>
                        Centro de control
                    </h1>


                    <p>
                        Gestiona usuarios, juegos,
                        torneos y premios desde
                        un único lugar.
                    </p>

                </div>


                <div className="admin-hero-estado">

                    <span className="admin-estado-punto" />

                    <div>

                        <strong>
                            Sistema operativo
                        </strong>

                        <small>
                            Panel administrativo
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


            {/* =========================
                KPIs
            ========================= */}

            <section className="admin-kpis">


                <article>

                    <div className="admin-kpi-icono">
                        U
                    </div>


                    <div>

                        <span>
                            USUARIOS
                        </span>

                        <strong>
                            {
                                usuarios.length
                            }
                        </strong>

                        <small>
                            {
                                usuariosActivos
                            } activos
                        </small>

                    </div>

                </article>


                <article>

                    <div className="admin-kpi-icono">
                        G
                    </div>


                    <div>

                        <span>
                            JUEGOS
                        </span>

                        <strong>
                            {
                                juegos.length
                            }
                        </strong>

                        <small>
                            {
                                juegosActivos
                            } activos
                        </small>

                    </div>

                </article>


                <article>

                    <div className="admin-kpi-icono">
                        T
                    </div>


                    <div>

                        <span>
                            TORNEOS
                        </span>

                        <strong>
                            {
                                torneos.length
                            }
                        </strong>

                        <small>
                            {
                                torneosActivos
                            } activos
                        </small>

                    </div>

                </article>


                <article>

                    <div className="admin-kpi-icono">
                        P
                    </div>


                    <div>

                        <span>
                            PREMIOS
                        </span>

                        <strong>
                            {
                                premios.length
                            }
                        </strong>

                        <small>
                            {
                                premiosPendientes
                            } pendientes
                        </small>

                    </div>

                </article>

            </section>


            {/* =========================
                NAVEGACIÓN RÁPIDA
            ========================= */}

            <nav className="admin-nav">

                <a
                    href="#admin-usuarios"
                >
                    <span>
                        01
                    </span>

                    Usuarios
                </a>


                <a
                    href="#admin-juegos"
                >
                    <span>
                        02
                    </span>

                    Juegos
                </a>


                <a
                    href="#admin-torneos"
                >
                    <span>
                        03
                    </span>

                    Torneos
                </a>


                <a
                    href="#admin-premios"
                >
                    <span>
                        04
                    </span>

                    Premios
                </a>

            </nav>


            {/* =========================
                MÓDULOS
            ========================= */}

            <div
                id="admin-usuarios"
                className="admin-modulo"
            >

                <div className="admin-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            USUARIOS
                        </span>

                        <h2>
                            Gestión de usuarios
                        </h2>

                    </div>


                    <span className="admin-modulo-contador">

                        {
                            usuarios.length
                        }

                        {" registros"}

                    </span>

                </div>


                <GestionUsuariosAdmin
                    usuarios={usuarios}
                    cuentas={cuentas}
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="admin-juegos"
                className="admin-modulo"
            >

                <div className="admin-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            CATÁLOGO
                        </span>

                        <h2>
                            Gestión de juegos
                        </h2>

                    </div>


                    <span className="admin-modulo-contador">

                        {
                            juegos.length
                        }

                        {" juegos"}

                    </span>

                </div>


                <GestionJuegosAdmin
                    juegos={juegos}
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="admin-torneos"
                className="admin-modulo"
            >

                <div className="admin-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            COMPETICIONES
                        </span>

                        <h2>
                            Gestión de torneos
                        </h2>

                    </div>


                    <span className="admin-modulo-contador">

                        {
                            torneos.length
                        }

                        {" torneos"}

                    </span>

                </div>


                <GestionTorneosAdmin
                    torneos={torneos}
                    juegos={juegos}
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>


            <div
                id="admin-premios"
                className="admin-modulo"
            >

                <div className="admin-modulo-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            RECOMPENSAS
                        </span>

                        <h2>
                            Gestión de premios
                        </h2>

                    </div>


                    <span className="admin-modulo-contador">

                        {
                            premios.length
                        }

                        {" premios"}

                    </span>

                </div>


                <GestionPremiosAdmin
                    premios={premios}
                    torneos={torneos}
                    rankings={rankings}
                    inscripciones={inscripciones}
                    usuarios={usuarios}
                    equipos={equipos}
                    onRecargar={
                        cargarDatos
                    }
                />

            </div>

        </main>

    );
}


export default PanelAdmin;