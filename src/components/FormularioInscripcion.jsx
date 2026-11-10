import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    obtenerDatosInscripcion,
    crearInscripcion
} from "../services/inscripcionesService.js";


function formatearFecha(fecha) {

    if (!fecha) {
        return "Sin fecha";
    }


    const objetoFecha =
        new Date(
            `${fecha}T00:00:00`
        );


    if (
        Number.isNaN(
            objetoFecha.getTime()
        )
    ) {
        return fecha;
    }


    return objetoFecha.toLocaleDateString(
        "es-CL",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );
}


function FormularioInscripcion() {

    const [
        torneos,
        setTorneos
    ] = useState([]);

    const [
        equipos,
        setEquipos
    ] = useState([]);

    const [
        usuario,
        setUsuario
    ] = useState(null);

    const [
        torneoId,
        setTorneoId
    ] = useState("");

    const [
        equipoId,
        setEquipoId
    ] = useState("");

    const [
        cargando,
        setCargando
    ] = useState(true);

    const [
        enviando,
        setEnviando
    ] = useState(false);

    const [
        mensaje,
        setMensaje
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");

    const [
        resumen,
        setResumen
    ] = useState(null);


    useEffect(function () {

        obtenerDatosInscripcion()
            .then(function (datos) {

                setUsuario(
                    datos.usuario
                );

                setTorneos(
                    datos.torneos
                );

                setEquipos(
                    datos.equipos
                );

            })
            .catch(function (error) {

                setError(
                    error.message
                );

            })
            .finally(function () {

                setCargando(false);

            });

    }, []);


    const torneoSeleccionado =
        useMemo(
            function () {

                return torneos.find(
                    function (torneo) {

                        return (
                            torneo.id ===
                            Number(torneoId)
                        );

                    }
                );

            },
            [
                torneos,
                torneoId
            ]
        );


    const equiposDisponibles =
        useMemo(
            function () {

                if (!torneoSeleccionado) {
                    return [];
                }


                return equipos.filter(
                    function (equipo) {

                        return (
                            equipo.estado ===
                                "ACTIVO" &&
                            equipo.juegoPrincipalId ===
                                torneoSeleccionado.juegoId
                        );

                    }
                );

            },
            [
                equipos,
                torneoSeleccionado
            ]
        );


    function obtenerModalidadVisual(
        modalidad
    ) {

        if (modalidad === "EQUIPO") {
            return "Por equipos";
        }


        if (modalidad === "JUGADOR") {
            return "Individual";
        }


        return modalidad;
    }


    async function realizarInscripcion(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");
        setResumen(null);


        if (!torneoSeleccionado) {

            setError(
                "Debes seleccionar un torneo."
            );

            return;
        }


        if (!usuario) {

            setError(
                "No se pudo identificar al usuario autenticado."
            );

            return;
        }


        const tipoParticipante =
            torneoSeleccionado.modalidad;


        let payload;


        if (
            tipoParticipante ===
            "EQUIPO"
        ) {

            if (
                equipoId ===
                ""
            ) {

                setError(
                    "Debes seleccionar un equipo."
                );

                return;
            }


            payload = {

                torneoId:
                    torneoSeleccionado.id,

                equipoId:
                    Number(equipoId),

                jugadorId:
                    null,

                tipoParticipante:
                    "EQUIPO"

            };

        } else {

            payload = {

                torneoId:
                    torneoSeleccionado.id,

                equipoId:
                    null,

                jugadorId:
                    usuario.id,

                tipoParticipante:
                    "JUGADOR"

            };

        }


        setEnviando(true);


        try {

            const inscripcion =
                await crearInscripcion(
                    payload
                );


            const equipo =
                equipos.find(
                    function (item) {

                        return (
                            item.id ===
                            Number(equipoId)
                        );

                    }
                );


            setResumen({

                torneo:
                    torneoSeleccionado.nombre,

                participante:
                    tipoParticipante ===
                    "EQUIPO"
                        ? equipo?.nombre
                        : usuario.nickname,

                modalidad:
                    obtenerModalidadVisual(
                        tipoParticipante
                    ),

                estado:
                    inscripcion.estado

            });


            setMensaje(
                "Inscripción realizada correctamente."
            );


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setEnviando(false);

        }
    }


    if (cargando) {

        return (

            <div className="inscripcion-cargando">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p>
                    Cargando torneos disponibles...
                </p>

            </div>

        );
    }


    return (

        <>


            <section className="inscripcion-hero">

                <div>

                    <span className="seccion-etiqueta">
                        COMPITE
                    </span>


                    <h1>
                        Entra a la
                        <span>
                            {" "}competencia
                        </span>
                    </h1>


                    <p>
                        Selecciona un torneo,
                        confirma tu participación
                        y prepárate para entrar
                        a la arena.
                    </p>

                </div>


                <div className="inscripcion-hero-datos">

                    <article>

                        <strong>
                            {torneos.length}
                        </strong>

                        <span>
                            TORNEOS DISPONIBLES
                        </span>

                    </article>


                    <article>

                        <strong>
                            {
                                equipos.filter(
                                    function (equipo) {

                                        return (
                                            equipo.estado ===
                                            "ACTIVO"
                                        );

                                    }
                                ).length
                            }
                        </strong>

                        <span>
                            EQUIPOS ACTIVOS
                        </span>

                    </article>


                    <article>

                        <strong>
                            {
                                usuario
                                    ? usuario.nickname
                                        .charAt(0)
                                        .toUpperCase()
                                    : "J"
                            }
                        </strong>

                        <span>
                            JUGADOR
                        </span>

                    </article>

                </div>

            </section>


            <div className="inscripcion-layout">


                <section className="inscripcion-formulario">

                    <div className="inscripcion-titulo">

                        <span className="seccion-etiqueta">
                            INSCRIPCIÓN
                        </span>

                        <h2>
                            Selecciona tu torneo
                        </h2>

                        <p>
                            Solo se muestran torneos
                            actualmente abiertos y dentro
                            del plazo de inscripción.
                        </p>

                    </div>


                    <form
                        onSubmit={
                            realizarInscripcion
                        }
                    >

                        <div className="inscripcion-campo">

                            <label
                                htmlFor="torneo"
                                className="form-label"
                            >
                                Torneo
                            </label>


                            <select
                                id="torneo"
                                className="form-select"
                                value={torneoId}
                                onChange={
                                    function (event) {

                                        setTorneoId(
                                            event.target.value
                                        );

                                        setEquipoId("");
                                        setMensaje("");
                                        setError("");
                                        setResumen(null);

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona una competencia
                                </option>


                                {
                                    torneos.map(
                                        function (torneo) {

                                            return (

                                                <option
                                                    key={
                                                        torneo.id
                                                    }
                                                    value={
                                                        torneo.id
                                                    }
                                                >
                                                    {
                                                        torneo.nombre
                                                    }
                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        {torneos.length === 0 && (

                            <div className="inscripcion-sin-torneos">

                                <div>
                                    ◇
                                </div>

                                <div>

                                    <h3>
                                        No hay torneos disponibles
                                    </h3>

                                    <p>
                                        Actualmente no existen
                                        competencias abiertas
                                        dentro del plazo de inscripción.
                                    </p>

                                </div>

                            </div>

                        )}


                        {torneoSeleccionado && (

                            <article className="inscripcion-torneo-card">

                                <div className="inscripcion-torneo-cabecera">

                                    <div>

                                        <span>
                                            TORNEO SELECCIONADO
                                        </span>

                                        <h3>
                                            {
                                                torneoSeleccionado
                                                    .nombre
                                            }
                                        </h3>

                                    </div>


                                    <span className="inscripcion-estado">
                                        ABIERTO
                                    </span>

                                </div>


                                <div className="inscripcion-torneo-datos">

                                    <div>

                                        <small>
                                            MODALIDAD
                                        </small>

                                        <strong>
                                            {
                                                obtenerModalidadVisual(
                                                    torneoSeleccionado
                                                        .modalidad
                                                )
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            CUPOS
                                        </small>

                                        <strong>
                                            {
                                                torneoSeleccionado
                                                    .cupoMaximo
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            CIERRE
                                        </small>

                                        <strong>
                                            {
                                                formatearFecha(
                                                    torneoSeleccionado
                                                        .cierreInscripcion
                                                )
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <small>
                                            INICIO
                                        </small>

                                        <strong>
                                            {
                                                formatearFecha(
                                                    torneoSeleccionado
                                                        .fechaInicio
                                                )
                                            }
                                        </strong>

                                    </div>

                                </div>

                            </article>

                        )}


                        {
                            torneoSeleccionado
                                ?.modalidad ===
                            "EQUIPO" && (

                                <div className="inscripcion-participante">

                                    <span className="seccion-etiqueta">
                                        ESCUADRA
                                    </span>

                                    <h3>
                                        Selecciona tu equipo
                                    </h3>


                                    <label
                                        htmlFor="equipo-seleccionado"
                                        className="form-label"
                                    >
                                        Equipo compatible
                                    </label>


                                    <select
                                        id="equipo-seleccionado"
                                        className="form-select"
                                        value={
                                            equipoId
                                        }
                                        onChange={
                                            function (event) {

                                                setEquipoId(
                                                    event.target.value
                                                );

                                                setMensaje("");
                                                setError("");
                                                setResumen(null);

                                            }
                                        }
                                    >

                                        <option value="">
                                            Selecciona un equipo
                                        </option>


                                        {
                                            equiposDisponibles.map(
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


                                    {
                                        equiposDisponibles.length ===
                                        0 && (

                                            <div className="inscripcion-aviso">

                                                <div>
                                                    !
                                                </div>

                                                <div>

                                                    <strong>
                                                        No tienes un equipo compatible
                                                    </strong>

                                                    <p>
                                                        Necesitas un equipo activo
                                                        del mismo juego que el torneo.
                                                    </p>


                                                    <Link
                                                        to="/equipo"
                                                    >
                                                        Ir a mis equipos →
                                                    </Link>

                                                </div>

                                            </div>

                                        )
                                    }

                                </div>

                            )
                        }


                        {
                            torneoSeleccionado
                                ?.modalidad ===
                            "JUGADOR" &&
                            usuario && (

                                <div className="inscripcion-participante">

                                    <span className="seccion-etiqueta">
                                        PARTICIPANTE
                                    </span>

                                    <h3>
                                        Inscripción individual
                                    </h3>


                                    <div className="inscripcion-jugador">

                                        <div className="inscripcion-avatar">

                                            {
                                                usuario.nickname
                                                    .slice(
                                                        0,
                                                        2
                                                    )
                                                    .toUpperCase()
                                            }

                                        </div>


                                        <div>

                                            <span>
                                                JUGADOR
                                            </span>

                                            <strong>
                                                {
                                                    usuario.nickname
                                                }
                                            </strong>

                                        </div>

                                    </div>

                                </div>

                            )
                        }


                        {error && (

                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {error}
                            </div>

                        )}


                        {mensaje && (

                            <div
                                className="alert alert-success"
                                role="alert"
                            >
                                {mensaje}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="btn btn-primary inscripcion-boton"
                            disabled={
                                enviando ||
                                !torneoSeleccionado ||
                                (
                                    torneoSeleccionado
                                        ?.modalidad ===
                                        "EQUIPO" &&
                                    equipoId === ""
                                )
                            }
                        >

                            <span>

                                {
                                    enviando
                                        ? "Inscribiendo..."
                                        : "Confirmar inscripción"
                                }

                            </span>


                            {!enviando && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>

                </section>


                <aside className="inscripcion-sidebar">


                    <section className="inscripcion-validaciones">

                        <span className="seccion-etiqueta">
                            REQUISITOS
                        </span>

                        <h2>
                            Antes de competir
                        </h2>

                        <p>
                            El sistema comprobará
                            automáticamente estos requisitos.
                        </p>


                        <ul>

                            <li>
                                <span>
                                    ✓
                                </span>

                                Plazo de inscripción vigente
                            </li>


                            <li>
                                <span>
                                    ✓
                                </span>

                                Cupos disponibles
                            </li>


                            <li>
                                <span>
                                    ✓
                                </span>

                                Modalidad correcta
                            </li>


                            <li>
                                <span>
                                    ✓
                                </span>

                                Equipo completo y compatible
                            </li>


                            <li>
                                <span>
                                    ✓
                                </span>

                                Sin sanciones activas
                            </li>


                            <li>
                                <span>
                                    ✓
                                </span>

                                Sin inscripción duplicada
                            </li>

                        </ul>

                    </section>


                    <section
                        className={
                            `inscripcion-confirmacion ${
                                resumen
                                    ? "completada"
                                    : ""
                            }`
                        }
                    >

                        <span className="seccion-etiqueta">
                            ESTADO
                        </span>


                        {!resumen ? (

                            <>

                                <div className="inscripcion-confirmacion-icono">
                                    ◇
                                </div>

                                <h3>
                                    Sin inscripción
                                </h3>

                                <p>
                                    Selecciona un torneo
                                    y completa el proceso
                                    para ver aquí la confirmación.
                                </p>

                            </>

                        ) : (

                            <>

                                <div className="inscripcion-confirmacion-icono exito">
                                    ✓
                                </div>


                                <h3>
                                    Inscripción registrada
                                </h3>


                                <div className="inscripcion-resumen">

                                    <div>

                                        <span>
                                            Torneo
                                        </span>

                                        <strong>
                                            {
                                                resumen.torneo
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Participante
                                        </span>

                                        <strong>
                                            {
                                                resumen.participante
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Modalidad
                                        </span>

                                        <strong>
                                            {
                                                resumen.modalidad
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Estado
                                        </span>

                                        <strong className="inscripcion-resumen-estado">
                                            {
                                                resumen.estado
                                            }
                                        </strong>

                                    </div>

                                </div>

                            </>

                        )}

                    </section>

                </aside>

            </div>

        </>

    );
}


export default FormularioInscripcion;