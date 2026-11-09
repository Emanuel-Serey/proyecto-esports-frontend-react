import {
    useEffect,
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


function PanelAdmin() {

    const [usuarios, setUsuarios] =
        useState([]);

    const [cuentas, setCuentas] =
        useState([]);

    const [juegos, setJuegos] =
        useState([]);

    const [torneos, setTorneos] =
        useState([]);

    const [premios, setPremios] =
        useState([]);

    const [rankings, setRankings] =
        useState([]);

    const [inscripciones, setInscripciones] =
        useState([]);

    const [equipos, setEquipos] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


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


    useEffect(function () {

        cargarDatos();

    }, []);


    if (cargando) {

        return (

            <main className="container py-4">

                <section className="card">

                    <div className="card-body">

                        <p className="mb-0">
                            Cargando panel de administración...
                        </p>

                    </div>

                </section>

            </main>

        );
    }


    return (

        <main className="container py-4">


            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title">
                        Panel de administración
                    </h2>


                    <p className="card-text mb-0">
                        Gestiona usuarios, juegos,
                        torneos y premios.
                    </p>

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


            <section className="row g-3 mb-4">


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Usuarios
                            </h3>

                            <p className="fs-3 mb-0">
                                {usuarios.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Juegos
                            </h3>

                            <p className="fs-3 mb-0">
                                {juegos.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Torneos
                            </h3>

                            <p className="fs-3 mb-0">
                                {torneos.length}
                            </p>

                        </div>

                    </article>

                </div>


                <div className="col-12 col-md-6 col-lg-3">

                    <article className="card h-100">

                        <div className="card-body">

                            <h3 className="h5">
                                Premios
                            </h3>

                            <p className="fs-3 mb-0">
                                {premios.length}
                            </p>

                        </div>

                    </article>

                </div>

            </section>


            <GestionUsuariosAdmin
                usuarios={usuarios}
                cuentas={cuentas}
                onRecargar={cargarDatos}
            />


            <GestionJuegosAdmin
                juegos={juegos}
                onRecargar={cargarDatos}
            />


            <GestionTorneosAdmin
                torneos={torneos}
                juegos={juegos}
                onRecargar={cargarDatos}
            />


            <GestionPremiosAdmin
                premios={premios}
                torneos={torneos}
                rankings={rankings}
                inscripciones={inscripciones}
                usuarios={usuarios}
                equipos={equipos}
                onRecargar={cargarDatos}
            />

        </main>

    );
}


export default PanelAdmin;