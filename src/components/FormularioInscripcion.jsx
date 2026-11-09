import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    obtenerDatosInscripcion,
    crearInscripcion
} from "../services/inscripcionesService.js";


function FormularioInscripcion() {

    const [torneos, setTorneos] =
        useState([]);

    const [equipos, setEquipos] =
        useState([]);

    const [usuario, setUsuario] =
        useState(null);

    const [torneoId, setTorneoId] =
        useState("");

    const [equipoId, setEquipoId] =
        useState("");

    const [cargando, setCargando] =
        useState(true);

    const [enviando, setEnviando] =
        useState(false);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [resumen, setResumen] =
        useState(null);


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
        useMemo(function () {

            return torneos.find(
                function (torneo) {

                    return (
                        torneo.id ===
                        Number(torneoId)
                    );

                }
            );

        }, [
            torneos,
            torneoId
        ]);


    const equiposDisponibles =
        useMemo(function () {

            if (!torneoSeleccionado) {
                return [];
            }


            return equipos.filter(
                function (equipo) {

                    return (
                        equipo.estado === "ACTIVO" &&
                        equipo.juegoPrincipalId ===
                        torneoSeleccionado.juegoId
                    );

                }
            );

        }, [
            equipos,
            torneoSeleccionado
        ]);


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


        if (tipoParticipante === "EQUIPO") {

            if (equipoId === "") {

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
                    tipoParticipante === "EQUIPO"
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

            <section className="card mb-4">

                <div className="card-body">

                    <p className="mb-0">
                        Cargando información de inscripción...
                    </p>

                </div>

            </section>

        );
    }


    return (

        <>

            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title mb-3">
                        Inscripción a torneo
                    </h2>


                    <p className="card-text">
                        Selecciona un torneo para registrar
                        tu participación.
                    </p>


                    <form
                        onSubmit={
                            realizarInscripcion
                        }
                    >

                        <div className="mb-3">

                            <label
                                htmlFor="torneo"
                                className="form-label"
                            >
                                Torneo:
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
                                    Selecciona un torneo
                                </option>


                                {torneos.map(
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
                                )}

                            </select>

                        </div>


                        {torneoSeleccionado && (

                            <div
                                className="
                                    alert
                                    alert-secondary
                                "
                            >

                                <strong>
                                    Modalidad:
                                </strong>{" "}
                                {
                                    obtenerModalidadVisual(
                                        torneoSeleccionado.modalidad
                                    )
                                }

                                <br />

                                <strong>
                                    Cierre de inscripción:
                                </strong>{" "}
                                {
                                    torneoSeleccionado.cierreInscripcion
                                }

                            </div>

                        )}


                        {
                            torneoSeleccionado?.modalidad ===
                            "EQUIPO" && (

                                <div className="mb-3">

                                    <label
                                        htmlFor="equipo-seleccionado"
                                        className="form-label"
                                    >
                                        Equipo:
                                    </label>


                                    <select
                                        id="equipo-seleccionado"
                                        className="form-select"
                                        value={equipoId}
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
                                                            key={equipo.id}
                                                            value={equipo.id}
                                                        >
                                                            {equipo.nombre}
                                                        </option>

                                                    );

                                                }
                                            )
                                        }

                                    </select>


                                    {
                                        equiposDisponibles.length === 0 && (

                                            <div
                                                className="
                                                    alert
                                                    alert-warning
                                                    mt-3
                                                    mb-0
                                                "
                                            >
                                                No tienes un equipo activo
                                                compatible con el juego
                                                de este torneo.
                                            </div>

                                        )
                                    }

                                </div>

                            )
                        }


                        {
                            torneoSeleccionado?.modalidad ===
                            "JUGADOR" && usuario && (

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Participante:
                                    </label>


                                    <input
                                        type="text"
                                        className="form-control"
                                        value={usuario.nickname}
                                        disabled
                                    />

                                </div>

                            )
                        }


                        <div className="card bg-light mb-3">

                            <div className="card-body">

                                <h3 className="h5">
                                    Validaciones realizadas
                                    por el sistema
                                </h3>


                                <ul className="mb-0">

                                    <li>
                                        Plazo de inscripción vigente.
                                    </li>

                                    <li>
                                        Cupos disponibles.
                                    </li>

                                    <li>
                                        Modalidad correcta.
                                    </li>

                                    <li>
                                        Equipo completo y del juego correcto.
                                    </li>

                                    <li>
                                        Participante sin sanciones activas.
                                    </li>

                                    <li>
                                        No estar previamente inscrito.
                                    </li>

                                </ul>

                            </div>

                        </div>


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
                            className="btn btn-primary"
                            disabled={
                                enviando ||
                                !torneoSeleccionado ||
                                (
                                    torneoSeleccionado?.modalidad ===
                                    "EQUIPO" &&
                                    equipoId === ""
                                )
                            }
                        >

                            {
                                enviando
                                    ? "Inscribiendo..."
                                    : "Inscribirse"
                            }

                        </button>

                    </form>

                </div>

            </section>


            <section className="card">

                <div className="card-body">

                    <h2 className="card-title">
                        Confirmación
                    </h2>


                    {resumen ? (

                        <div
                            className="
                                alert
                                alert-success
                                mb-0
                            "
                        >

                            <h3 className="h5">
                                Inscripción realizada
                                correctamente
                            </h3>


                            <p>
                                Torneo:{" "}
                                {resumen.torneo}
                            </p>


                            <p>
                                Participante:{" "}
                                {resumen.participante}
                            </p>


                            <p>
                                Modalidad:{" "}
                                {resumen.modalidad}
                            </p>


                            <p className="mb-0">
                                Estado:{" "}
                                {resumen.estado}
                            </p>

                        </div>

                    ) : (

                        <p className="mb-0">
                            Aún no se ha realizado
                            una inscripción.
                        </p>

                    )}

                </div>

            </section>

        </>

    );
}


export default FormularioInscripcion;