import { useEffect, useState } from "react";

import {
    obtenerDetalleTorneo
} from "../services/torneosService.js";

import ListaPartidas from "../components/ListaPartidas.jsx";
import TablaRanking from "../components/TablaRanking.jsx";


function DetalleTorneo() {

    const [torneo, setTorneo] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);


    useEffect(function () {

        obtenerDetalleTorneo()
            .then(function (datos) {

                setTorneo(datos);
                setCargando(false);

            });

    }, []);


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


    const cuposDisponibles =
        torneo.cupoMaximo -
        torneo.inscritos;


    return (
        <main className="container py-4">


            {/* Información general */}

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
                                    Juego: {torneo.juego}
                                </p>

                                <p>
                                    Modalidad: {torneo.modalidad}
                                </p>

                                <p>
                                    Integrantes por equipo:{" "}
                                    {torneo.integrantesPorEquipo}
                                </p>

                                <p>
                                    Estado: {torneo.estado}
                                </p>

                            </div>


                            <div className="col-12 col-md-6">

                                <p>
                                    Cupos ocupados:{" "}
                                    {torneo.inscritos} /{" "}
                                    {torneo.cupoMaximo}
                                </p>

                                <p>
                                    Cupos disponibles:{" "}
                                    {cuposDisponibles}
                                </p>

                                <p>
                                    Cierre de inscripción:{" "}
                                    {torneo.cierreInscripcion}
                                </p>

                                <p>
                                    Formato: {torneo.formato}
                                </p>

                            </div>

                        </div>

                    </div>

                </article>

            </section>


            {/* Participantes */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Participantes inscritos
                </h2>


                <div className="d-flex flex-wrap gap-2">

                    {torneo.participantes.map(
                        function (participante) {

                            return (
                                <span
                                    className="badge text-bg-secondary fs-6"
                                    key={participante}
                                >
                                    {participante}
                                </span>
                            );

                        }
                    )}

                </div>

            </section>


            {/* Partidas */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Partidas programadas
                </h2>

                <ListaPartidas
                    partidas={torneo.partidas}
                    formato={torneo.formato}
                />

            </section>


            {/* Ranking */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Tabla de posiciones
                </h2>

                <TablaRanking
                    clasificacion={torneo.clasificacion}
                />

            </section>


            {/* Premios */}

            <section className="mb-4">

                <h2 className="mb-3">
                    Premios
                </h2>


                <div className="row g-3">

                    {torneo.premios.map(
                        function (premio) {

                            return (
                                <div
                                    className="col-12 col-md-4"
                                    key={premio.posicion}
                                >

                                    <article className="card h-100">

                                        <div className="card-body">

                                            <h3 className="h5 card-title">
                                                {premio.posicion}° lugar
                                            </h3>

                                            <p className="card-text">
                                                Premio: {premio.premio}
                                            </p>

                                        </div>

                                    </article>

                                </div>
                            );

                        }
                    )}

                </div>

            </section>

        </main>
    );
}


export default DetalleTorneo;