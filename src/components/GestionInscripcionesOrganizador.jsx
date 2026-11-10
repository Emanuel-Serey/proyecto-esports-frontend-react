import {
    useMemo,
    useState
} from "react";

import {
    cambiarEstadoInscripcion
} from "../services/organizadorService.js";


function GestionInscripcionesOrganizador({
    inscripciones,
    torneos,
    equipos,
    jugadores,
    onRecargar
}) {

    const [
        mensaje,
        setMensaje
    ] = useState("");


    const [
        error,
        setError
    ] = useState("");


    const [
        procesandoId,
        setProcesandoId
    ] = useState(null);


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
                );

            },
            [inscripciones]
        );


    function obtenerNombreTorneo(
        torneoId
    ) {

        const torneo =
            torneos.find(
                function (item) {

                    return (
                        item.id ===
                        torneoId
                    );

                }
            );


        return torneo
            ? torneo.nombre
            : `Torneo #${torneoId}`;
    }


    function obtenerNombreParticipante(
        inscripcion
    ) {

        if (
            inscripcion.tipoParticipante ===
            "EQUIPO"
        ) {

            const equipo =
                equipos.find(
                    function (item) {

                        return (
                            item.id ===
                            inscripcion.equipoId
                        );

                    }
                );


            return equipo
                ? equipo.nombre
                : `Equipo #${inscripcion.equipoId}`;

        }


        const jugador =
            jugadores.find(
                function (item) {

                    return (
                        item.id ===
                        inscripcion.jugadorId
                    );

                }
            );


        return jugador
            ? jugador.nickname
            : `Jugador #${inscripcion.jugadorId}`;
    }


    async function cambiarEstado(
        inscripcion,
        estado
    ) {

        setMensaje("");
        setError("");
        setProcesandoId(
            inscripcion.id
        );


        try {

            await cambiarEstadoInscripcion(
                inscripcion.id,
                estado
            );


            setMensaje(
                estado === "APROBADA"
                    ? "Inscripción aprobada correctamente."
                    : "Inscripción rechazada correctamente."
            );


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setProcesandoId(
                null
            );

        }
    }


    return (

        <section className="card mb-4">

            <div className="card-body">

                <h2 className="h4 mb-3">
                    Gestión de inscripciones
                </h2>


                {mensaje && (

                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        {mensaje}
                    </div>

                )}


                {error && (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                )}


                {
                    inscripcionesPendientes.length ===
                    0 ? (

                        <div
                            className="alert alert-secondary mb-0"
                        >
                            No hay inscripciones pendientes
                            de revisión.
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Torneo
                                        </th>

                                        <th>
                                            Participante
                                        </th>

                                        <th>
                                            Tipo
                                        </th>

                                        <th>
                                            Fecha
                                        </th>

                                        <th>
                                            Estado
                                        </th>

                                        <th>
                                            Acciones
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        inscripcionesPendientes.map(
                                            function (
                                                inscripcion
                                            ) {

                                                const procesando =
                                                    procesandoId ===
                                                    inscripcion.id;


                                                return (

                                                    <tr
                                                        key={
                                                            inscripcion.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                inscripcion.id
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                obtenerNombreTorneo(
                                                                    inscripcion.torneoId
                                                                )
                                                            }
                                                        </td>


                                                        <td>

                                                            <strong>
                                                                {
                                                                    obtenerNombreParticipante(
                                                                        inscripcion
                                                                    )
                                                                }
                                                            </strong>

                                                        </td>


                                                        <td>
                                                            {
                                                                inscripcion
                                                                    .tipoParticipante
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                inscripcion
                                                                    .fechaInscripcion
                                                            }
                                                        </td>


                                                        <td>

                                                            <span
                                                                className="badge text-bg-warning"
                                                            >
                                                                PENDIENTE
                                                            </span>

                                                        </td>


                                                        <td>

                                                            <div
                                                                className="d-flex gap-2 flex-wrap"
                                                            >

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    disabled={
                                                                        procesando
                                                                    }
                                                                    onClick={
                                                                        function () {

                                                                            cambiarEstado(
                                                                                inscripcion,
                                                                                "APROBADA"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Aprobar
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    disabled={
                                                                        procesando
                                                                    }
                                                                    onClick={
                                                                        function () {

                                                                            cambiarEstado(
                                                                                inscripcion,
                                                                                "RECHAZADA"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Rechazar
                                                                </button>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                );

                                            }
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    )
                }

            </div>

        </section>

    );
}


export default GestionInscripcionesOrganizador;