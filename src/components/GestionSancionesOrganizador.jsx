import {
    useMemo,
    useState
} from "react";

import {
    crearSancion,
    actualizarSancion,
    cerrarSancion
} from "../services/organizadorService.js";


function GestionSancionesOrganizador({
    sanciones,
    jugadores,
    equipos,
    onRecargar
}) {

    const [tipoObjetivo, setTipoObjetivo] =
        useState("USUARIO");

    const [objetivoId, setObjetivoId] =
        useState("");

    const [motivo, setMotivo] =
        useState("");

    const [fechaInicio, setFechaInicio] =
        useState("");

    const [fechaFin, setFechaFin] =
        useState("");

    const [severidad, setSeveridad] =
        useState("LEVE");

    const [
        sancionEditando,
        setSancionEditando
    ] = useState(null);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    const jugadoresActivos =
        useMemo(
            function () {

                return jugadores.filter(
                    function (jugador) {

                        return (
                            jugador.estado ===
                            "ACTIVO"
                        );

                    }
                );

            },
            [jugadores]
        );


    const equiposActivos =
        useMemo(
            function () {

                return equipos.filter(
                    function (equipo) {

                        return (
                            equipo.estado ===
                            "ACTIVO"
                        );

                    }
                );

            },
            [equipos]
        );


    function obtenerNombreUsuario(
        usuarioId
    ) {

        const usuario =
            jugadores.find(
                function (item) {

                    return (
                        item.id ===
                        usuarioId
                    );

                }
            );


        return usuario
            ? usuario.nickname
            : `Usuario #${usuarioId}`;
    }


    function obtenerNombreEquipo(
        equipoId
    ) {

        const equipo =
            equipos.find(
                function (item) {

                    return (
                        item.id ===
                        equipoId
                    );

                }
            );


        return equipo
            ? equipo.nombre
            : `Equipo #${equipoId}`;
    }


    function limpiarFormulario() {

        setTipoObjetivo("USUARIO");
        setObjetivoId("");

        setMotivo("");

        setFechaInicio("");
        setFechaFin("");

        setSeveridad("LEVE");

        setSancionEditando(null);
    }


    function seleccionarParaEditar(
        sancion
    ) {

        setSancionEditando(
            sancion
        );


        if (sancion.usuarioId != null) {

            setTipoObjetivo(
                "USUARIO"
            );

            setObjetivoId(
                String(
                    sancion.usuarioId
                )
            );

        } else {

            setTipoObjetivo(
                "EQUIPO"
            );

            setObjetivoId(
                String(
                    sancion.equipoId
                )
            );

        }


        setMotivo(
            sancion.motivo
        );

        setFechaInicio(
            sancion.fechaInicio
        );

        setFechaFin(
            sancion.fechaFin
        );

        setSeveridad(
            sancion.severidad
        );


        setMensaje("");
        setError("");
    }


    async function guardarSancion(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        if (objetivoId === "") {

            setError(
                "Debes seleccionar un usuario o equipo."
            );

            return;
        }


        if (motivo.trim() === "") {

            setError(
                "Debes indicar el motivo de la sanción."
            );

            return;
        }


        if (
            fechaInicio === "" ||
            fechaFin === ""
        ) {

            setError(
                "Debes completar las fechas."
            );

            return;
        }


        if (
            fechaFin <
            fechaInicio
        ) {

            setError(
                "La fecha de fin no puede ser anterior a la fecha de inicio."
            );

            return;
        }


        const datosSancion = {

            usuarioId:
                tipoObjetivo === "USUARIO"
                    ? Number(objetivoId)
                    : null,

            equipoId:
                tipoObjetivo === "EQUIPO"
                    ? Number(objetivoId)
                    : null,

            motivo:
                motivo.trim(),

            fechaInicio,

            fechaFin,

            severidad,

            estado:
                sancionEditando
                    ? sancionEditando.estado
                    : null

        };


        setGuardando(true);


        try {

            if (sancionEditando) {

                await actualizarSancion(
                    sancionEditando.id,
                    datosSancion
                );


                setMensaje(
                    "Sanción actualizada correctamente."
                );

            } else {

                await crearSancion(
                    datosSancion
                );


                setMensaje(
                    "Sanción creada correctamente."
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


    async function manejarCerrar(
        sancion
    ) {

        const confirmar =
            window.confirm(
                `¿Deseas cerrar la sanción #${sancion.id}?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await cerrarSancion(
                sancion.id
            );


            setMensaje(
                "Sanción cerrada correctamente."
            );


            if (
                sancionEditando?.id ===
                sancion.id
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
                    Gestión de sanciones
                </h2>


                <form
                    onSubmit={
                        guardarSancion
                    }
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12 col-md-4">

                            <label
                                className="form-label"
                                htmlFor="sancion-tipo"
                            >
                                Tipo
                            </label>


                            <select
                                id="sancion-tipo"
                                className="form-select"
                                value={tipoObjetivo}
                                disabled={
                                    sancionEditando != null
                                }
                                onChange={
                                    function (event) {

                                        setTipoObjetivo(
                                            event.target.value
                                        );

                                        setObjetivoId("");

                                    }
                                }
                            >

                                <option value="USUARIO">
                                    Jugador
                                </option>

                                <option value="EQUIPO">
                                    Equipo
                                </option>

                            </select>

                        </div>


                        <div className="col-12 col-md-8">

                            <label
                                className="form-label"
                                htmlFor="sancion-objetivo"
                            >

                                {
                                    tipoObjetivo === "USUARIO"
                                        ? "Jugador"
                                        : "Equipo"
                                }

                            </label>


                            <select
                                id="sancion-objetivo"
                                className="form-select"
                                value={objetivoId}
                                disabled={
                                    sancionEditando != null
                                }
                                onChange={
                                    function (event) {

                                        setObjetivoId(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="">

                                    {
                                        tipoObjetivo ===
                                        "USUARIO"
                                            ? "Selecciona un jugador"
                                            : "Selecciona un equipo"
                                    }

                                </option>


                                {
                                    tipoObjetivo ===
                                    "USUARIO"
                                        ? jugadoresActivos.map(
                                            function (jugador) {

                                                return (

                                                    <option
                                                        key={
                                                            jugador.id
                                                        }
                                                        value={
                                                            jugador.id
                                                        }
                                                    >
                                                        {
                                                            jugador.nickname
                                                        }

                                                        {" — "}

                                                        {
                                                            jugador.nombre
                                                        }
                                                    </option>

                                                );

                                            }
                                        )
                                        : equiposActivos.map(
                                            function (equipo) {

                                                return (

                                                    <option
                                                        key={
                                                            equipo.id
                                                        }
                                                        value={
                                                            equipo.id
                                                        }
                                                    >
                                                        {
                                                            equipo.nombre
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
                                htmlFor="sancion-motivo"
                            >
                                Motivo
                            </label>


                            <input
                                id="sancion-motivo"
                                className="form-control"
                                value={motivo}
                                placeholder="Ej: Conducta antideportiva"
                                onChange={
                                    function (event) {

                                        setMotivo(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                className="form-label"
                                htmlFor="sancion-severidad"
                            >
                                Severidad
                            </label>


                            <select
                                id="sancion-severidad"
                                className="form-select"
                                value={severidad}
                                onChange={
                                    function (event) {

                                        setSeveridad(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="LEVE">
                                    Leve
                                </option>

                                <option value="MEDIA">
                                    Media
                                </option>

                                <option value="GRAVE">
                                    Grave
                                </option>

                            </select>

                        </div>


                        <div className="col-12 col-md-4">

                            <label
                                className="form-label"
                                htmlFor="sancion-inicio"
                            >
                                Fecha de inicio
                            </label>


                            <input
                                id="sancion-inicio"
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
                                className="form-label"
                                htmlFor="sancion-fin"
                            >
                                Fecha de fin
                            </label>


                            <input
                                id="sancion-fin"
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

                    </div>


                    <div className="d-flex gap-2 mt-3">

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={guardando}
                        >

                            {
                                guardando
                                    ? "Guardando..."
                                    : sancionEditando
                                        ? "Guardar cambios"
                                        : "Crear sanción"
                            }

                        </button>


                        {
                            sancionEditando && (

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
                                <th>Tipo</th>
                                <th>Sancionado</th>
                                <th>Motivo</th>
                                <th>Severidad</th>
                                <th>Inicio</th>
                                <th>Fin</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                sanciones.map(
                                    function (sancion) {

                                        const esUsuario =
                                            sancion.usuarioId !=
                                            null;


                                        const nombreObjetivo =
                                            esUsuario
                                                ? obtenerNombreUsuario(
                                                    sancion.usuarioId
                                                )
                                                : obtenerNombreEquipo(
                                                    sancion.equipoId
                                                );


                                        return (

                                            <tr
                                                key={sancion.id}
                                            >

                                                <td>
                                                    {sancion.id}
                                                </td>


                                                <td>

                                                    {
                                                        esUsuario
                                                            ? "JUGADOR"
                                                            : "EQUIPO"
                                                    }

                                                </td>


                                                <td>
                                                    {
                                                        nombreObjetivo
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        sancion.motivo
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        sancion.severidad
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        sancion.fechaInicio
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        sancion.fechaFin
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        sancion.estado
                                                    }
                                                </td>


                                                <td>

                                                    {
                                                        sancion.estado ===
                                                        "ACTIVA" && (

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
                                                                        btn-primary
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            seleccionarParaEditar(
                                                                                sancion
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Editar
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-success
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            manejarCerrar(
                                                                                sancion
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Cerrar
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

            </div>

        </section>

    );
}


export default GestionSancionesOrganizador;