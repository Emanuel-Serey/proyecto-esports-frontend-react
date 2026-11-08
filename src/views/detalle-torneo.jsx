import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    obtenerDetalleTorneo
} from "../services/torneosService.js";


function DetalleTorneo() {

    const { id } = useParams();

    const [torneo, setTorneo] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(function () {

        obtenerDetalleTorneo(id)
            .then(function (datos) {

                setTorneo(datos);

            })
            .catch(function (error) {

                setError(error.message);

            })
            .finally(function () {

                setCargando(false);

            });

    }, [id]);


    // CARGANDO

    if (cargando) {

        return (

            <main className="container py-4">

                <section>

                    <p>
                        Cargando detalle del torneo...
                    </p>

                </section>

            </main>

        );
    }


    // ERROR

    if (error) {

        return (

            <main className="container py-4">

                <section>

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                    <Link
                        to="/torneos"
                        className="btn btn-primary"
                    >
                        Volver a torneos
                    </Link>

                </section>

            </main>

        );
    }


    return (

        <main className="container py-4">


            {/* INFORMACIÓN GENERAL */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Detalle de torneo
                </h2>

                <article className="card">

                    <div className="card-body">

                        <h3 className="card-title">
                            {torneo.nombre}
                        </h3>


                        <div className="row">

                            <div className="col-12 col-md-6">

                                <p>
                                    <strong>
                                        Juego:
                                    </strong>{" "}
                                    {torneo.juego}
                                </p>

                                <p>
                                    <strong>
                                        Modalidad:
                                    </strong>{" "}
                                    {torneo.modalidad}
                                </p>

                                <p>
                                    <strong>
                                        Estado:
                                    </strong>{" "}
                                    {torneo.estado}
                                </p>

                                <p>
                                    <strong>
                                        Cupo máximo:
                                    </strong>{" "}
                                    {torneo.cupoMaximo}
                                </p>

                            </div>


                            <div className="col-12 col-md-6">

                                <p>
                                    <strong>
                                        Cierre de inscripción:
                                    </strong>{" "}
                                    {torneo.cierreInscripcion}
                                </p>

                                <p>
                                    <strong>
                                        Fecha de inicio:
                                    </strong>{" "}
                                    {torneo.fechaInicio}
                                </p>

                                <p>
                                    <strong>
                                        Fecha de término:
                                    </strong>{" "}
                                    {torneo.fechaFin}
                                </p>

                            </div>

                        </div>


                        <Link
                            to="/torneos"
                            className="btn btn-outline-primary mt-3"
                        >
                            Volver a torneos
                        </Link>

                    </div>

                </article>

            </section>


            {/* PARTICIPANTES INSCRITOS */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Participantes inscritos
                </h2>


                {torneo.inscripciones.length === 0 ? (

                    <div
                        className="alert alert-secondary"
                        role="alert"
                    >
                        No hay participantes inscritos actualmente.
                    </div>

                ) : (

                    <div className="row g-3">

                        {torneo.inscripciones.map(
                            function (inscripcion) {

                                return (

                                    <div
                                        className="col-12 col-md-6 col-lg-4"
                                        key={inscripcion.id}
                                    >

                                        <article className="card h-100">

                                            <div className="card-body">

                                                <h3 className="h5 card-title">
                                                    Participante
                                                </h3>

                                                <p className="card-text">
                                                    Tipo:{" "}
                                                    {inscripcion.tipoParticipante}
                                                </p>

                                                <p className="card-text">
                                                    Estado:{" "}
                                                    {inscripcion.estado}
                                                </p>

                                                <p className="card-text mb-0">
                                                    Fecha de inscripción:{" "}
                                                    {inscripcion.fechaInscripcion}
                                                </p>

                                            </div>

                                        </article>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </section>


        </main>

    );
}


export default DetalleTorneo;