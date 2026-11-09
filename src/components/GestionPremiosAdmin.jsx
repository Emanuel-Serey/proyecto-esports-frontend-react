import {
    useMemo,
    useState
} from "react";

import {
    asignarPremio,
    entregarPremio,
    anularPremio
} from "../services/adminService.js";


function GestionPremiosAdmin({
    premios,
    torneos,
    rankings,
    inscripciones,
    usuarios,
    equipos,
    onRecargar
}) {

    const [torneoId, setTorneoId] =
        useState("");

    const [participanteId, setParticipanteId] =
        useState("");

    const [tipoPremio, setTipoPremio] =
        useState("MEDALLA");

    const [descripcion, setDescripcion] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    const rankingsTorneo =
        useMemo(
            function () {

                if (torneoId === "") {
                    return [];
                }


                return rankings.filter(
                    function (ranking) {

                        return (
                            ranking.torneoId ===
                                Number(torneoId) &&
                            ranking.posicion != null
                        );

                    }
                );

            },
            [
                rankings,
                torneoId
            ]
        );


    const rankingSeleccionado =
        useMemo(
            function () {

                if (participanteId === "") {
                    return null;
                }


                return rankingsTorneo.find(
                    function (ranking) {

                        return (
                            ranking.participanteId ===
                            Number(participanteId)
                        );

                    }
                ) || null;

            },
            [
                rankingsTorneo,
                participanteId
            ]
        );


    function obtenerNombreParticipante(
        participanteInscripcionId
    ) {

        const inscripcion =
            inscripciones.find(
                function (item) {

                    return (
                        item.id ===
                        participanteInscripcionId
                    );

                }
            );


        if (!inscripcion) {

            return (
                `Inscripción #${participanteInscripcionId}`
            );

        }


        if (
            inscripcion.tipoParticipante ===
            "JUGADOR"
        ) {

            const usuario =
                usuarios.find(
                    function (item) {

                        return (
                            item.id ===
                            inscripcion.jugadorId
                        );

                    }
                );


            if (usuario) {
                return usuario.nickname;
            }


            return (
                `Jugador #${inscripcion.jugadorId}`
            );

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


            if (equipo) {
                return equipo.nombre;
            }


            return (
                `Equipo #${inscripcion.equipoId}`
            );

        }


        return (
            `Inscripción #${participanteInscripcionId}`
        );
    }


    async function guardarPremio(
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


        if (!rankingSeleccionado) {

            setError(
                "Debes seleccionar un participante del ranking."
            );

            return;
        }


        if (
            tipoPremio.trim() === "" ||
            descripcion.trim() === ""
        ) {

            setError(
                "Debes ingresar el tipo y la descripción del premio."
            );

            return;
        }


        const datosPremio = {

            torneoId:
                Number(torneoId),

            participanteId:
                rankingSeleccionado.participanteId,

            posicion:
                rankingSeleccionado.posicion,

            tipoPremio:
                tipoPremio
                    .trim()
                    .toUpperCase(),

            descripcion:
                descripcion.trim()

        };


        setGuardando(true);


        try {

            await asignarPremio(
                datosPremio
            );


            setMensaje(
                "Premio asignado correctamente."
            );


            setParticipanteId("");
            setDescripcion("");
            setTipoPremio("MEDALLA");


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setGuardando(false);

        }
    }


    async function manejarEntregar(
        premio
    ) {

        const confirmar =
            window.confirm(
                `¿Deseas marcar como entregado el premio #${premio.id}?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await entregarPremio(
                premio.id
            );


            setMensaje(
                "Premio marcado como entregado correctamente."
            );


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );

        }
    }


    async function manejarAnular(
        premio
    ) {

        const confirmar =
            window.confirm(
                `¿Deseas anular el premio #${premio.id}?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await anularPremio(
                premio.id
            );


            setMensaje(
                "Premio anulado correctamente."
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
                    Gestión de premios
                </h2>


                <form
                    onSubmit={guardarPremio}
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12 col-md-6">

                            <label
                                htmlFor="premio-torneo"
                                className="form-label"
                            >
                                Torneo
                            </label>


                            <select
                                id="premio-torneo"
                                className="form-select"
                                value={torneoId}
                                onChange={
                                    function (event) {

                                        setTorneoId(
                                            event.target.value
                                        );

                                        setParticipanteId("");
                                        setMensaje("");
                                        setError("");

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona un torneo
                                </option>


                                {
                                    torneos
                                        .filter(
                                            function (torneo) {

                                                return (
                                                    torneo.estado !==
                                                    "CANCELADO"
                                                );

                                            }
                                        )
                                        .map(
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
                                htmlFor="premio-participante"
                                className="form-label"
                            >
                                Participante del ranking
                            </label>


                            <select
                                id="premio-participante"
                                className="form-select"
                                value={participanteId}
                                disabled={
                                    torneoId === ""
                                }
                                onChange={
                                    function (event) {

                                        setParticipanteId(
                                            event.target.value
                                        );

                                        setMensaje("");
                                        setError("");

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona un participante
                                </option>


                                {
                                    rankingsTorneo.map(
                                        function (ranking) {

                                            return (

                                                <option
                                                    key={ranking.id}
                                                    value={
                                                        ranking.participanteId
                                                    }
                                                >

                                                    {
                                                        obtenerNombreParticipante(
                                                            ranking.participanteId
                                                        )
                                                    }

                                                    {" — Posición "}

                                                    {
                                                        ranking.posicion
                                                    }

                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>


                            {
                                torneoId !== "" &&
                                rankingsTorneo.length === 0 && (

                                    <div
                                        className="
                                            alert
                                            alert-warning
                                            mt-2
                                            mb-0
                                        "
                                    >
                                        Este torneo aún no tiene
                                        participantes con posición
                                        en el ranking.
                                    </div>

                                )
                            }

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="premio-posicion"
                                className="form-label"
                            >
                                Posición
                            </label>


                            <input
                                id="premio-posicion"
                                className="form-control"
                                value={
                                    rankingSeleccionado
                                        ?.posicion ?? ""
                                }
                                disabled
                            />

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="premio-tipo"
                                className="form-label"
                            >
                                Tipo de premio
                            </label>


                            <select
                                id="premio-tipo"
                                className="form-select"
                                value={tipoPremio}
                                onChange={
                                    function (event) {

                                        setTipoPremio(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="MEDALLA">
                                    Medalla
                                </option>

                                <option value="TROFEO">
                                    Trofeo
                                </option>

                                <option value="DINERO">
                                    Dinero
                                </option>

                                <option value="OTRO">
                                    Otro
                                </option>

                            </select>

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="premio-descripcion"
                                className="form-label"
                            >
                                Descripción
                            </label>


                            <input
                                id="premio-descripcion"
                                className="form-control"
                                value={descripcion}
                                onChange={
                                    function (event) {

                                        setDescripcion(
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
                        disabled={
                            guardando ||
                            !rankingSeleccionado
                        }
                    >

                        {
                            guardando
                                ? "Asignando..."
                                : "Asignar premio"
                        }

                    </button>

                </form>


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
                    premios.length === 0 ? (

                        <div className="alert alert-secondary mb-0">

                            No existen premios registrados.

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Torneo</th>
                                        <th>Participante</th>
                                        <th>Posición</th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        premios.map(
                                            function (premio) {

                                                const torneo =
                                                    torneos.find(
                                                        function (item) {

                                                            return (
                                                                item.id ===
                                                                premio.torneoId
                                                            );

                                                        }
                                                    );


                                                return (

                                                    <tr
                                                        key={premio.id}
                                                    >

                                                        <td>
                                                            {premio.id}
                                                        </td>


                                                        <td>
                                                            {
                                                                torneo
                                                                    ? torneo.nombre
                                                                    : premio.torneoId
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                obtenerNombreParticipante(
                                                                    premio.participanteId
                                                                )
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                premio.posicion
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                premio.tipoPremio
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                premio.descripcion
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                premio.fechaAsignacion
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                premio.estadoEntrega
                                                            }
                                                        </td>


                                                        <td>

                                                            {
                                                                premio.estadoEntrega ===
                                                                "PENDIENTE" && (

                                                                    <div
                                                                        className="
                                                                            d-flex
                                                                            gap-2
                                                                            flex-wrap
                                                                        "
                                                                    >

                                                                        <button
                                                                            type="button"
                                                                            className="
                                                                                btn
                                                                                btn-success
                                                                                btn-sm
                                                                            "
                                                                            onClick={
                                                                                function () {

                                                                                    manejarEntregar(
                                                                                        premio
                                                                                    );

                                                                                }
                                                                            }
                                                                        >
                                                                            Entregar
                                                                        </button>


                                                                        <button
                                                                            type="button"
                                                                            className="
                                                                                btn
                                                                                btn-danger
                                                                                btn-sm
                                                                            "
                                                                            onClick={
                                                                                function () {

                                                                                    manejarAnular(
                                                                                        premio
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

                    )
                }

            </div>

        </section>

    );
}


export default GestionPremiosAdmin;