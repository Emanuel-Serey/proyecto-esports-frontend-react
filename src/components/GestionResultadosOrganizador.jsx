import {
    useMemo,
    useState
} from "react";

import {
    crearResultado,
    validarResultado,
    anularResultado,
    actualizarRankingPorResultado
} from "../services/organizadorService.js";


function GestionResultadosOrganizador({
    partidas,
    resultados,
    torneos,
    inscripciones,
    equipos,
    jugadores,
    rankings,
    onRecargar
}) {

    const [partidaId, setPartidaId] =
        useState("");

    const [ganadorId, setGanadorId] =
        useState("");

    const [puntajeA, setPuntajeA] =
        useState(0);

    const [puntajeB, setPuntajeB] =
        useState(0);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    function obtenerNombreParticipante(
        inscripcionId
    ) {

        const inscripcion =
            inscripciones.find(
                function (item) {

                    return (
                        item.id ===
                        inscripcionId
                    );

                }
            );


        if (!inscripcion) {
            return `Inscripción #${inscripcionId}`;
        }


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


    const partidasDisponibles =
        useMemo(
            function () {

                return partidas.filter(
                    function (partida) {

                        const tieneResultado =
                            resultados.some(
                                function (resultado) {

                                    return (
                                        resultado.partidaId ===
                                        partida.id
                                    );

                                }
                            );


                        return (
                            partida.estado ===
                                "FINALIZADA" &&
                            !tieneResultado
                        );

                    }
                );

            },
            [
                partidas,
                resultados
            ]
        );


    const partidaSeleccionada =
        useMemo(
            function () {

                return partidas.find(
                    function (partida) {

                        return (
                            partida.id ===
                            Number(partidaId)
                        );

                    }
                ) || null;

            },
            [
                partidas,
                partidaId
            ]
        );


    async function guardarResultado(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        if (!partidaSeleccionada) {

            setError(
                "Debes seleccionar una partida."
            );

            return;
        }


        if (ganadorId === "") {

            setError(
                "Debes seleccionar el ganador."
            );

            return;
        }


        const datosResultado = {

            partidaId:
                partidaSeleccionada.id,

            ganadorId:
                Number(ganadorId),

            puntajeA:
                Number(puntajeA),

            puntajeB:
                Number(puntajeB)

        };


        setGuardando(true);


        try {

            await crearResultado(
                datosResultado
            );


            setMensaje(
                "Resultado registrado correctamente."
            );


            setPartidaId("");
            setGanadorId("");
            setPuntajeA(0);
            setPuntajeB(0);


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setGuardando(false);

        }
    }


    async function manejarValidar(
        resultado
    ) {

        setMensaje("");
        setError("");


        const partida =
            partidas.find(
                function (item) {

                    return (
                        item.id ===
                        resultado.partidaId
                    );

                }
            );


        if (!partida) {

            setError(
                "No se encontró la partida asociada."
            );

            return;
        }


        try {

            await validarResultado(
                resultado.id
            );


            /*
             * Después de validar el resultado,
             * actualizamos automáticamente
             * el ranking.
             */
            await actualizarRankingPorResultado(
                resultado.id,
                partida.torneoId,
                partida.participanteAId,
                partida.participanteBId
            );


            setMensaje(
                "Resultado validado y ranking actualizado correctamente."
            );


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );

            await onRecargar();

        }
    }


    async function manejarAnular(
        resultado
    ) {

        const justificacion =
            window.prompt(
                "Indica la justificación de la anulación:"
            );


        if (
            justificacion == null ||
            justificacion.trim() === ""
        ) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await anularResultado(
                resultado.id,
                justificacion.trim()
            );


            setMensaje(
                "Resultado anulado correctamente."
            );


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );

        }
    }


    return (

        <section className="card mb-4">

            <div className="card-body">

                <h2 className="h4 mb-3">
                    Gestión de resultados
                </h2>


                <form
                    onSubmit={
                        guardarResultado
                    }
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12">

                            <label
                                className="form-label"
                                htmlFor="resultado-partida"
                            >
                                Partida finalizada
                            </label>


                            <select
                                id="resultado-partida"
                                className="form-select"
                                value={partidaId}
                                onChange={
                                    function (event) {

                                        setPartidaId(
                                            event.target.value
                                        );

                                        setGanadorId("");

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona una partida
                                </option>


                                {
                                    partidasDisponibles.map(
                                        function (partida) {

                                            const torneo =
                                                torneos.find(
                                                    function (item) {

                                                        return (
                                                            item.id ===
                                                            partida.torneoId
                                                        );

                                                    }
                                                );


                                            return (

                                                <option
                                                    key={partida.id}
                                                    value={partida.id}
                                                >

                                                    {
                                                        torneo
                                                            ? torneo.nombre
                                                            : `Torneo ${partida.torneoId}`
                                                    }

                                                    {" — "}

                                                    {
                                                        obtenerNombreParticipante(
                                                            partida.participanteAId
                                                        )
                                                    }

                                                    {" vs "}

                                                    {
                                                        obtenerNombreParticipante(
                                                            partida.participanteBId
                                                        )
                                                    }

                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        {
                            partidaSeleccionada && (

                                <>

                                    <div className="col-12 col-md-4">

                                        <label
                                            className="form-label"
                                            htmlFor="resultado-ganador"
                                        >
                                            Ganador
                                        </label>


                                        <select
                                            id="resultado-ganador"
                                            className="form-select"
                                            value={ganadorId}
                                            onChange={
                                                function (event) {

                                                    setGanadorId(
                                                        event.target.value
                                                    );

                                                }
                                            }
                                        >

                                            <option value="">
                                                Selecciona ganador
                                            </option>


                                            <option
                                                value={
                                                    partidaSeleccionada
                                                        .participanteAId
                                                }
                                            >
                                                {
                                                    obtenerNombreParticipante(
                                                        partidaSeleccionada
                                                            .participanteAId
                                                    )
                                                }
                                            </option>


                                            <option
                                                value={
                                                    partidaSeleccionada
                                                        .participanteBId
                                                }
                                            >
                                                {
                                                    obtenerNombreParticipante(
                                                        partidaSeleccionada
                                                            .participanteBId
                                                    )
                                                }
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-12 col-md-4">

                                        <label
                                            className="form-label"
                                            htmlFor="resultado-a"
                                        >
                                            Puntaje A
                                        </label>


                                        <input
                                            id="resultado-a"
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={puntajeA}
                                            onChange={
                                                function (event) {

                                                    setPuntajeA(
                                                        event.target.value
                                                    );

                                                }
                                            }
                                        />

                                    </div>


                                    <div className="col-12 col-md-4">

                                        <label
                                            className="form-label"
                                            htmlFor="resultado-b"
                                        >
                                            Puntaje B
                                        </label>


                                        <input
                                            id="resultado-b"
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={puntajeB}
                                            onChange={
                                                function (event) {

                                                    setPuntajeB(
                                                        event.target.value
                                                    );

                                                }
                                            }
                                        />

                                    </div>

                                </>

                            )
                        }

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={
                            guardando ||
                            !partidaSeleccionada
                        }
                    >
                        {
                            guardando
                                ? "Registrando..."
                                : "Registrar resultado"
                        }
                    </button>

                </form>


                {mensaje && (

                    <div className="alert alert-success">
                        {mensaje}
                    </div>

                )}


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Partida</th>
                                <th>Ganador</th>
                                <th>Marcador</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                resultados.map(
                                    function (resultado) {

                                        const partida =
                                            partidas.find(
                                                function (item) {

                                                    return (
                                                        item.id ===
                                                        resultado.partidaId
                                                    );

                                                }
                                            );


                                        return (

                                            <tr key={resultado.id}>

                                                <td>
                                                    {resultado.id}
                                                </td>

                                                <td>
                                                    #{resultado.partidaId}
                                                </td>

                                                <td>
                                                    {
                                                        obtenerNombreParticipante(
                                                            resultado.ganadorId
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        `${resultado.puntajeA} - ${resultado.puntajeB}`
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        resultado.estadoValidacion
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        resultado.fechaRegistro
                                                    }
                                                </td>

                                                <td>

                                                    {
                                                        resultado.estadoValidacion ===
                                                        "PENDIENTE" && (

                                                            <div className="d-flex gap-2 flex-wrap">

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={
                                                                        function () {

                                                                            manejarValidar(
                                                                                resultado
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Validar
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={
                                                                        function () {

                                                                            manejarAnular(
                                                                                resultado
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Anular
                                                                </button>

                                                            </div>

                                                        )
                                                    }

                                                </td>

                                            </tr>

                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>


                <hr className="my-4" />


                <h3 className="h5 mb-3">
                    Ranking actual
                </h3>


                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Torneo</th>
                                <th>Participante</th>
                                <th>Posición</th>
                                <th>Puntos</th>
                                <th>Victorias</th>
                                <th>Derrotas</th>
                                <th>Diferencia</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                rankings.map(
                                    function (ranking) {

                                        const torneo =
                                            torneos.find(
                                                function (item) {

                                                    return (
                                                        item.id ===
                                                        ranking.torneoId
                                                    );

                                                }
                                            );


                                        return (

                                            <tr key={ranking.id}>

                                                <td>
                                                    {
                                                        torneo
                                                            ? torneo.nombre
                                                            : ranking.torneoId
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        obtenerNombreParticipante(
                                                            ranking.participanteId
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        ranking.posicion
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        ranking.puntos
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        ranking.victorias
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        ranking.derrotas
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        ranking.diferencia
                                                    }
                                                </td>

                                            </tr>

                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );
}


export default GestionResultadosOrganizador;