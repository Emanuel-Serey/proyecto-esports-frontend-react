import {
    useMemo,
    useState
} from "react";

import {
    crearPartida,
    cambiarEstadoPartida,
    cancelarPartida
} from "../services/organizadorService.js";


function GestionPartidasOrganizador({
    torneos,
    inscripciones,
    equipos,
    jugadores,
    partidas,
    onRecargar
}) {

    const [torneoId, setTorneoId] =
        useState("");

    const [participanteAId, setParticipanteAId] =
        useState("");

    const [participanteBId, setParticipanteBId] =
        useState("");

    const [ronda, setRonda] =
        useState("");

    const [fechaHora, setFechaHora] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    const torneosDisponibles =
        useMemo(
            function () {

                return torneos.filter(
                    function (torneo) {

                        return (
                            torneo.estado === "ABIERTO" ||
                            torneo.estado === "EN_CURSO"
                        );

                    }
                );

            },
            [torneos]
        );


    const participantes =
        useMemo(
            function () {

                if (torneoId === "") {
                    return [];
                }


                return inscripciones.filter(
                    function (inscripcion) {

                        return (
                            inscripcion.torneoId ===
                                Number(torneoId) &&
                            inscripcion.estado !==
                                "CANCELADA"
                        );

                    }
                );

            },
            [
                inscripciones,
                torneoId
            ]
        );


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


    async function guardarPartida(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        if (torneoId === "") {

            setError(
                "Debes seleccionar un torneo."
            );

            return;
        }


        if (
            participanteAId === "" ||
            participanteBId === ""
        ) {

            setError(
                "Debes seleccionar ambos participantes."
            );

            return;
        }


        if (
            participanteAId ===
            participanteBId
        ) {

            setError(
                "Los participantes deben ser diferentes."
            );

            return;
        }


        if (ronda.trim() === "") {

            setError(
                "Debes indicar la ronda."
            );

            return;
        }


        if (fechaHora === "") {

            setError(
                "Debes indicar fecha y hora."
            );

            return;
        }


        const datosPartida = {

            torneoId:
                Number(torneoId),

            participanteAId:
                Number(participanteAId),

            participanteBId:
                Number(participanteBId),

            ronda:
                ronda.trim(),

            fechaHora

        };


        setGuardando(true);


        try {

            await crearPartida(
                datosPartida
            );


            setMensaje(
                "Partida creada correctamente."
            );


            setParticipanteAId("");
            setParticipanteBId("");
            setRonda("");
            setFechaHora("");


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setGuardando(false);

        }
    }


    async function cambiarEstado(
        partida,
        nuevoEstado
    ) {

        setMensaje("");
        setError("");


        try {

            await cambiarEstadoPartida(
                partida.id,
                nuevoEstado
            );


            setMensaje(
                nuevoEstado === "EN_CURSO"
                    ? "Partida iniciada correctamente."
                    : "Partida finalizada correctamente."
            );


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );

        }
    }


    async function manejarCancelar(
        partida
    ) {

        const confirmar =
            window.confirm(
                `¿Deseas cancelar la partida #${partida.id}?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await cancelarPartida(
                partida.id
            );


            setMensaje(
                "Partida cancelada correctamente."
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
                    Gestión de partidas
                </h2>


                <form
                    onSubmit={
                        guardarPartida
                    }
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12 col-md-6">

                            <label
                                className="form-label"
                                htmlFor="partida-torneo"
                            >
                                Torneo
                            </label>


                            <select
                                id="partida-torneo"
                                className="form-select"
                                value={torneoId}
                                onChange={
                                    function (event) {

                                        setTorneoId(
                                            event.target.value
                                        );

                                        setParticipanteAId("");
                                        setParticipanteBId("");

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona un torneo
                                </option>


                                {
                                    torneosDisponibles.map(
                                        function (torneo) {

                                            return (

                                                <option
                                                    key={torneo.id}
                                                    value={torneo.id}
                                                >
                                                    {torneo.nombre}
                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        <div className="col-12 col-md-6">

                            <label
                                className="form-label"
                                htmlFor="partida-ronda"
                            >
                                Ronda
                            </label>


                            <input
                                id="partida-ronda"
                                className="form-control"
                                value={ronda}
                                placeholder="Ej: SEMIFINAL"
                                onChange={
                                    function (event) {

                                        setRonda(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-6">

                            <label
                                className="form-label"
                                htmlFor="participante-a"
                            >
                                Participante A
                            </label>


                            <select
                                id="participante-a"
                                className="form-select"
                                value={participanteAId}
                                disabled={
                                    torneoId === ""
                                }
                                onChange={
                                    function (event) {

                                        setParticipanteAId(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona participante
                                </option>


                                {
                                    participantes.map(
                                        function (inscripcion) {

                                            return (

                                                <option
                                                    key={inscripcion.id}
                                                    value={inscripcion.id}
                                                >
                                                    {
                                                        obtenerNombreParticipante(
                                                            inscripcion.id
                                                        )
                                                    }
                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        <div className="col-12 col-md-6">

                            <label
                                className="form-label"
                                htmlFor="participante-b"
                            >
                                Participante B
                            </label>


                            <select
                                id="participante-b"
                                className="form-select"
                                value={participanteBId}
                                disabled={
                                    torneoId === ""
                                }
                                onChange={
                                    function (event) {

                                        setParticipanteBId(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona participante
                                </option>


                                {
                                    participantes
                                        .filter(
                                            function (inscripcion) {

                                                return (
                                                    String(
                                                        inscripcion.id
                                                    ) !==
                                                    participanteAId
                                                );

                                            }
                                        )
                                        .map(
                                            function (inscripcion) {

                                                return (

                                                    <option
                                                        key={inscripcion.id}
                                                        value={inscripcion.id}
                                                    >
                                                        {
                                                            obtenerNombreParticipante(
                                                                inscripcion.id
                                                            )
                                                        }
                                                    </option>

                                                );

                                            }
                                        )
                                }

                            </select>

                        </div>


                        <div className="col-12">

                            <label
                                className="form-label"
                                htmlFor="partida-fecha"
                            >
                                Fecha y hora
                            </label>


                            <input
                                id="partida-fecha"
                                type="datetime-local"
                                className="form-control"
                                value={fechaHora}
                                onChange={
                                    function (event) {

                                        setFechaHora(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={guardando}
                    >
                        {
                            guardando
                                ? "Creando..."
                                : "Crear partida"
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
                                <th>Torneo</th>
                                <th>Participante A</th>
                                <th>Participante B</th>
                                <th>Ronda</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                partidas.map(
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

                                            <tr key={partida.id}>

                                                <td>
                                                    {partida.id}
                                                </td>

                                                <td>
                                                    {
                                                        torneo
                                                            ? torneo.nombre
                                                            : partida.torneoId
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        obtenerNombreParticipante(
                                                            partida.participanteAId
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        obtenerNombreParticipante(
                                                            partida.participanteBId
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    {partida.ronda}
                                                </td>

                                                <td>
                                                    {
                                                        partida.fechaHora
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        partida.estado
                                                    }
                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2 flex-wrap">

                                                        {
                                                            partida.estado ===
                                                            "PROGRAMADA" && (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={
                                                                        function () {

                                                                            cambiarEstado(
                                                                                partida,
                                                                                "EN_CURSO"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Iniciar
                                                                </button>

                                                            )
                                                        }


                                                        {
                                                            partida.estado ===
                                                            "EN_CURSO" && (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success btn-sm"
                                                                    onClick={
                                                                        function () {

                                                                            cambiarEstado(
                                                                                partida,
                                                                                "FINALIZADA"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Finalizar
                                                                </button>

                                                            )
                                                        }


                                                        {
                                                            (
                                                                partida.estado ===
                                                                    "PROGRAMADA" ||
                                                                partida.estado ===
                                                                    "EN_CURSO"
                                                            ) && (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={
                                                                        function () {

                                                                            manejarCancelar(
                                                                                partida
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Cancelar
                                                                </button>

                                                            )
                                                        }

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

            </div>

        </section>

    );
}


export default GestionPartidasOrganizador;