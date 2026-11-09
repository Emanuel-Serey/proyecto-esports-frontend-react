import {
    useMemo,
    useState
} from "react";

import {
    crearTorneo,
    actualizarTorneo,
    iniciarTorneo,
    cerrarTorneo,
    cancelarTorneo
} from "../services/adminService.js";


function GestionTorneosAdmin({
    torneos,
    juegos,
    onRecargar
}) {

    const [nombre, setNombre] =
        useState("");

    const [juegoId, setJuegoId] =
        useState("");

    const [modalidad, setModalidad] =
        useState("EQUIPO");

    const [fechaInicio, setFechaInicio] =
        useState("");

    const [
        cierreInscripcion,
        setCierreInscripcion
    ] = useState("");

    const [fechaFin, setFechaFin] =
        useState("");

    const [cupoMaximo, setCupoMaximo] =
        useState(16);

    const [estado, setEstado] =
        useState("ABIERTO");

    const [
        torneoEditando,
        setTorneoEditando
    ] = useState(null);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    const juegosActivos =
        useMemo(
            function () {

                return juegos.filter(
                    function (juego) {

                        return (
                            juego.estado === true
                        );

                    }
                );

            },
            [juegos]
        );


    function limpiarFormulario() {

        setNombre("");
        setJuegoId("");
        setModalidad("EQUIPO");

        setFechaInicio("");
        setCierreInscripcion("");
        setFechaFin("");

        setCupoMaximo(16);

        setEstado("ABIERTO");

        setTorneoEditando(null);
    }


    function seleccionarParaEditar(
        torneo
    ) {

        setTorneoEditando(
            torneo
        );

        setNombre(
            torneo.nombre
        );

        setJuegoId(
            String(
                torneo.juegoId
            )
        );

        setModalidad(
            torneo.modalidad
        );

        setFechaInicio(
            torneo.fechaInicio
        );

        setCierreInscripcion(
            torneo.cierreInscripcion
        );

        setFechaFin(
            torneo.fechaFin
        );

        setCupoMaximo(
            torneo.cupoMaximo
        );

        setEstado(
            torneo.estado
        );

        setMensaje("");
        setError("");
    }


    function validarFormulario() {

        if (nombre.trim() === "") {

            return "Debes ingresar el nombre del torneo.";

        }


        if (juegoId === "") {

            return "Debes seleccionar un juego.";

        }


        if (
            fechaInicio === "" ||
            cierreInscripcion === "" ||
            fechaFin === ""
        ) {

            return "Debes completar todas las fechas.";

        }


        if (
            cierreInscripcion >=
            fechaInicio
        ) {

            return (
                "El cierre de inscripción debe ser " +
                "anterior a la fecha de inicio."
            );

        }


        if (
            fechaFin <
            fechaInicio
        ) {

            return (
                "La fecha de fin no puede ser " +
                "anterior a la fecha de inicio."
            );

        }


        if (
            Number(cupoMaximo) < 1
        ) {

            return (
                "El cupo máximo debe ser mayor a cero."
            );

        }


        return null;
    }


    async function guardarTorneo(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        const errorFormulario =
            validarFormulario();


        if (errorFormulario) {

            setError(
                errorFormulario
            );

            return;
        }


        const datosTorneo = {

            nombre:
                nombre.trim(),

            juegoId:
                Number(juegoId),

            fechaInicio,

            cierreInscripcion,

            fechaFin,

            cupoMaximo:
                Number(cupoMaximo),

            modalidad,

            estado:
                torneoEditando
                    ? torneoEditando.estado
                    : estado

        };


        setGuardando(true);


        try {

            if (torneoEditando) {

                await actualizarTorneo(
                    torneoEditando.id,
                    datosTorneo
                );

                setMensaje(
                    "Torneo actualizado correctamente."
                );

            } else {

                await crearTorneo(
                    datosTorneo
                );

                setMensaje(
                    "Torneo creado correctamente."
                );

            }


            limpiarFormulario();

            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setGuardando(false);

        }
    }


    async function ejecutarAccion(
        torneo,
        accion
    ) {

        setMensaje("");
        setError("");


        let textoAccion;


        if (accion === "INICIAR") {

            textoAccion =
                `¿Deseas iniciar el torneo "${torneo.nombre}"?`;

        } else if (accion === "CERRAR") {

            textoAccion =
                `¿Deseas cerrar el torneo "${torneo.nombre}"?`;

        } else {

            textoAccion =
                `¿Deseas cancelar el torneo "${torneo.nombre}"?`;

        }


        const confirmar =
            window.confirm(
                textoAccion
            );


        if (!confirmar) {
            return;
        }


        try {

            if (accion === "INICIAR") {

                await iniciarTorneo(
                    torneo.id
                );

                setMensaje(
                    "Torneo iniciado correctamente."
                );

            }


            if (accion === "CERRAR") {

                await cerrarTorneo(
                    torneo.id
                );

                setMensaje(
                    "Torneo cerrado correctamente."
                );

            }


            if (accion === "CANCELAR") {

                await cancelarTorneo(
                    torneo.id
                );

                setMensaje(
                    "Torneo cancelado correctamente."
                );

            }


            if (
                torneoEditando &&
                torneoEditando.id ===
                torneo.id
            ) {

                limpiarFormulario();

            }


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

                    Gestión de torneos

                </h2>


                <form
                    onSubmit={
                        guardarTorneo
                    }
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-nombre"
                                className="form-label"
                            >
                                Nombre
                            </label>


                            <input
                                id="torneo-nombre"
                                className="form-control"
                                value={nombre}
                                onChange={
                                    function (event) {

                                        setNombre(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-juego"
                                className="form-label"
                            >
                                Juego
                            </label>


                            <select
                                id="torneo-juego"
                                className="form-select"
                                value={juegoId}
                                onChange={
                                    function (event) {

                                        setJuegoId(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona un juego
                                </option>


                                {
                                    juegosActivos.map(
                                        function (juego) {

                                            return (

                                                <option
                                                    key={juego.id}
                                                    value={juego.id}
                                                >
                                                    {juego.nombre}
                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-modalidad"
                                className="form-label"
                            >
                                Modalidad
                            </label>


                            <select
                                id="torneo-modalidad"
                                className="form-select"
                                value={modalidad}
                                onChange={
                                    function (event) {

                                        setModalidad(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="EQUIPO">
                                    Equipo
                                </option>

                                <option value="JUGADOR">
                                    Individual
                                </option>

                            </select>

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-cierre"
                                className="form-label"
                            >
                                Cierre de inscripción
                            </label>


                            <input
                                id="torneo-cierre"
                                type="date"
                                className="form-control"
                                value={cierreInscripcion}
                                onChange={
                                    function (event) {

                                        setCierreInscripcion(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-inicio"
                                className="form-label"
                            >
                                Fecha de inicio
                            </label>


                            <input
                                id="torneo-inicio"
                                type="date"
                                className="form-control"
                                value={fechaInicio}
                                onChange={
                                    function (event) {

                                        setFechaInicio(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                htmlFor="torneo-fin"
                                className="form-label"
                            >
                                Fecha de fin
                            </label>


                            <input
                                id="torneo-fin"
                                type="date"
                                className="form-control"
                                value={fechaFin}
                                onChange={
                                    function (event) {

                                        setFechaFin(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-6">

                            <label
                                htmlFor="torneo-cupo"
                                className="form-label"
                            >
                                Cupo máximo
                            </label>


                            <input
                                id="torneo-cupo"
                                type="number"
                                min="1"
                                className="form-control"
                                value={cupoMaximo}
                                onChange={
                                    function (event) {

                                        setCupoMaximo(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-6">

                            <label
                                htmlFor="torneo-estado"
                                className="form-label"
                            >
                                Estado inicial
                            </label>


                            {
                                torneoEditando ? (

                                    <input
                                        id="torneo-estado"
                                        className="form-control"
                                        value={estado}
                                        disabled
                                    />

                                ) : (

                                    <select
                                        id="torneo-estado"
                                        className="form-select"
                                        value={estado}
                                        onChange={
                                            function (event) {

                                                setEstado(
                                                    event.target.value
                                                );

                                            }
                                        }
                                    >

                                        <option value="BORRADOR">
                                            Borrador
                                        </option>

                                        <option value="ABIERTO">
                                            Abierto
                                        </option>

                                    </select>

                                )
                            }

                        </div>

                    </div>


                    <div className="d-flex gap-2 mt-3">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={guardando}
                        >

                            {
                                torneoEditando
                                    ? "Guardar cambios"
                                    : "Crear torneo"
                            }

                        </button>


                        {
                            torneoEditando && (

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={
                                        limpiarFormulario
                                    }
                                >
                                    Cancelar edición
                                </button>

                            )
                        }

                    </div>

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


                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Juego</th>
                                <th>Modalidad</th>
                                <th>Inicio</th>
                                <th>Cierre</th>
                                <th>Fin</th>
                                <th>Estado</th>
                                <th>Cupo</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                torneos.map(
                                    function (torneo) {

                                        const juego =
                                            juegos.find(
                                                function (item) {

                                                    return (
                                                        item.id ===
                                                        torneo.juegoId
                                                    );

                                                }
                                            );


                                        const editable =
                                            torneo.estado ===
                                                "BORRADOR" ||
                                            torneo.estado ===
                                                "ABIERTO";


                                        const puedeCancelar =
                                            torneo.estado !==
                                                "CERRADO" &&
                                            torneo.estado !==
                                                "CANCELADO";


                                        return (

                                            <tr
                                                key={torneo.id}
                                            >

                                                <td>
                                                    {torneo.id}
                                                </td>


                                                <td>
                                                    {torneo.nombre}
                                                </td>


                                                <td>

                                                    {
                                                        juego
                                                            ? juego.nombre
                                                            : torneo.juegoId
                                                    }

                                                </td>


                                                <td>
                                                    {
                                                        torneo.modalidad
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        torneo.fechaInicio
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        torneo.cierreInscripcion
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        torneo.fechaFin
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        torneo.estado
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        torneo.cupoMaximo
                                                    }
                                                </td>


                                                <td>

                                                    <div
                                                        className="
                                                            d-flex
                                                            gap-2
                                                            flex-wrap
                                                        "
                                                    >

                                                        {
                                                            editable && (

                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-primary
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            seleccionarParaEditar(
                                                                                torneo
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Editar
                                                                </button>

                                                            )
                                                        }


                                                        {
                                                            torneo.estado ===
                                                            "ABIERTO" && (

                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-success
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            ejecutarAccion(
                                                                                torneo,
                                                                                "INICIAR"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Iniciar
                                                                </button>

                                                            )
                                                        }


                                                        {
                                                            torneo.estado ===
                                                            "EN_CURSO" && (

                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-success
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            ejecutarAccion(
                                                                                torneo,
                                                                                "CERRAR"
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Cerrar
                                                                </button>

                                                            )
                                                        }


                                                        {
                                                            puedeCancelar && (

                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-danger
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            ejecutarAccion(
                                                                                torneo,
                                                                                "CANCELAR"
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


export default GestionTorneosAdmin;