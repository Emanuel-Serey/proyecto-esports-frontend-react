import { useEffect, useState } from "react";

import {
    obtenerDatosInscripcion
} from "../services/inscripcionesService.js";

import {
    cuposDisponibles,
    inscripcionFueraDePlazo,
    tieneSancionActiva,
    equipoCompleto
} from "../utils/validaciones.js";


function FormularioInscripcion() {

    const [torneos, setTorneos] =
        useState([]);

    const [equipos, setEquipos] =
        useState([]);

    const [usuario, setUsuario] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);


    const [nombreTorneo, setNombreTorneo] =
        useState("");

    const [tipoParticipante, setTipoParticipante] =
        useState("");

    const [nombreEquipo, setNombreEquipo] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [resumen, setResumen] =
        useState(null);

    const [inscripciones, setInscripciones] =
        useState([]);


    useEffect(function () {

        obtenerDatosInscripcion()
            .then(function (datos) {

                setTorneos(datos.torneos);
                setEquipos(datos.equipos);
                setUsuario(datos.usuario);

                setCargando(false);

            });

    }, []);


    const torneoSeleccionado =
        torneos.find(function (torneo) {

            return torneo.nombre === nombreTorneo;

        });


    const equipoSeleccionado =
        equipos.find(function (equipo) {

            return equipo.nombre === nombreEquipo;

        });


    const equipoIncompleto =
        tipoParticipante === "equipo" &&
        torneoSeleccionado &&
        equipoSeleccionado &&
        !equipoCompleto(
            equipoSeleccionado,
            torneoSeleccionado.integrantesPorEquipo
        );


    function realizarInscripcion(event) {

        event.preventDefault();

        setMensaje("");
        setResumen(null);


        if (nombreTorneo === "") {

            setMensaje(
                "Debes seleccionar un torneo."
            );

            return;
        }


        if (tipoParticipante === "") {

            setMensaje(
                "Debes seleccionar un tipo de participante."
            );

            return;
        }


        if (
            torneoSeleccionado.modalidad === "Por equipos" &&
            tipoParticipante !== "equipo"
        ) {

            setMensaje(
                "Este torneo solo permite inscripciones por equipo."
            );

            return;
        }


        if (
            torneoSeleccionado.modalidad === "Individual" &&
            tipoParticipante !== "jugador"
        ) {

            setMensaje(
                "Este torneo solo permite inscripciones individuales."
            );

            return;
        }


        if (
            cuposDisponibles(
                torneoSeleccionado.cupoMaximo,
                torneoSeleccionado.inscritos
            ) === 0
        ) {

            setMensaje(
                "No es posible inscribirse: el torneo no tiene cupos disponibles."
            );

            return;
        }


        if (
            inscripcionFueraDePlazo(
                torneoSeleccionado.cierreInscripcion
            )
        ) {

            setMensaje(
                "No es posible inscribirse: el plazo de inscripción ya finalizó."
            );

            return;
        }


        let participante;


        if (tipoParticipante === "equipo") {

            if (nombreEquipo === "") {

                setMensaje(
                    "Debes seleccionar un equipo."
                );

                return;
            }


            if (equipoSeleccionado.estado === "Inactivo") {

                setMensaje(
                    "El equipo no puede inscribirse porque se encuentra inactivo."
                );

                return;
            }


            if (
                tieneSancionActiva(
                    equipoSeleccionado
                )
            ) {

                setMensaje(
                    "El equipo no puede inscribirse porque tiene una sanción vigente."
                );

                return;
            }


            if (
                !equipoCompleto(
                    equipoSeleccionado,
                    torneoSeleccionado.integrantesPorEquipo
                )
            ) {

                setMensaje(
                    "El equipo no tiene suficientes integrantes para este torneo."
                );

                return;
            }


            participante =
                equipoSeleccionado.nombre;

        } else {

            if (
                tieneSancionActiva(usuario)
            ) {

                setMensaje(
                    "No puedes inscribirte porque tienes una sanción vigente."
                );

                return;
            }


            participante =
                usuario.apodo;
        }


        const yaInscrito =
            inscripciones.some(
                function (inscripcion) {

                    return (
                        inscripcion.torneo ===
                            torneoSeleccionado.nombre &&
                        inscripcion.participante ===
                            participante
                    );

                }
            );


        if (yaInscrito) {

            if (tipoParticipante === "equipo") {

                setMensaje(
                    "Este equipo ya se encuentra inscrito en este torneo."
                );

            } else {

                setMensaje(
                    "Este jugador ya se encuentra inscrito en este torneo."
                );

            }

            return;
        }


        setInscripciones(
            function (anteriores) {

                return [
                    ...anteriores,
                    {
                        torneo:
                            torneoSeleccionado.nombre,

                        participante:
                            participante,

                        tipo:
                            tipoParticipante
                    }
                ];

            }
        );


        setResumen({
            torneo:
                torneoSeleccionado.nombre,

            participante:
                participante,

            modalidad:
                torneoSeleccionado.modalidad
        });


        setMensaje("");
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
                        Completa los datos para registrar
                        tu participación en un torneo.
                    </p>


                    <form onSubmit={realizarInscripcion}>


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
                                value={nombreTorneo}
                                onChange={function (event) {

                                    setNombreTorneo(
                                        event.target.value
                                    );

                                    setNombreEquipo("");

                                    setMensaje("");

                                    setResumen(null);

                                }}
                            >

                                <option value="">
                                    Selecciona un torneo
                                </option>


                                {torneos.map(
                                    function (torneo) {

                                        return (

                                            <option
                                                key={torneo.nombre}
                                                value={torneo.nombre}
                                            >
                                                {torneo.nombre}
                                            </option>

                                        );

                                    }
                                )}

                            </select>

                        </div>


                        <fieldset className="mb-3">

                            <legend className="fs-6">
                                Tipo de participante
                            </legend>


                            <div className="form-check form-check-inline">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="jugador"
                                    name="tipo-participante"
                                    value="jugador"
                                    checked={
                                        tipoParticipante ===
                                        "jugador"
                                    }
                                    onChange={function (event) {

                                        setTipoParticipante(
                                            event.target.value
                                        );

                                        setNombreEquipo("");

                                        setMensaje("");

                                        setResumen(null);

                                    }}
                                />


                                <label
                                    className="form-check-label"
                                    htmlFor="jugador"
                                >
                                    Jugador
                                </label>

                            </div>


                            <div className="form-check form-check-inline">

                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="equipo"
                                    name="tipo-participante"
                                    value="equipo"
                                    checked={
                                        tipoParticipante ===
                                        "equipo"
                                    }
                                    onChange={function (event) {

                                        setTipoParticipante(
                                            event.target.value
                                        );

                                        setMensaje("");

                                        setResumen(null);

                                    }}
                                />


                                <label
                                    className="form-check-label"
                                    htmlFor="equipo"
                                >
                                    Equipo
                                </label>

                            </div>

                        </fieldset>


                        {tipoParticipante === "equipo" && (

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
                                    value={nombreEquipo}
                                    onChange={function (event) {

                                        setNombreEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                        setResumen(null);

                                    }}
                                >

                                    <option value="">
                                        Selecciona un equipo
                                    </option>


                                    {equipos.map(
                                        function (equipo) {

                                            return (

                                                <option
                                                    key={equipo.nombre}
                                                    value={equipo.nombre}
                                                >
                                                    {equipo.nombre}
                                                </option>

                                            );

                                        }
                                    )}

                                </select>

                            </div>

                        )}


                        <div className="card bg-light mb-3">

                            <div className="card-body">

                                <h3 className="h5">
                                    Requisitos del torneo
                                </h3>

                                <ul className="mb-0">

                                    <li>
                                        Inscripción dentro del plazo.
                                    </li>

                                    <li>
                                        Cupos disponibles.
                                    </li>

                                    <li>
                                        Equipo con integrantes suficientes.
                                    </li>

                                    <li>
                                        Participante sin sanciones vigentes.
                                    </li>

                                    <li>
                                        No estar previamente inscrito.
                                    </li>

                                </ul>

                            </div>

                        </div>


                        {equipoIncompleto && (

                            <div
                                className="alert alert-warning"
                                role="alert"
                            >
                                El equipo seleccionado
                                no tiene suficientes integrantes.
                            </div>

                        )}


                        {mensaje && (

                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {mensaje}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={equipoIncompleto}
                        >
                            Inscribirse
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
                            className="alert alert-success mb-0"
                            role="alert"
                        >

                            <h3 className="h5">
                                Inscripción realizada correctamente
                            </h3>

                            <p>
                                Torneo: {resumen.torneo}
                            </p>

                            <p>
                                Participante: {resumen.participante}
                            </p>

                            <p className="mb-0">
                                Modalidad: {resumen.modalidad}
                            </p>

                        </div>

                    ) : (

                        <p className="mb-0">
                            Aún no se ha realizado una inscripción.
                        </p>

                    )}

                </div>

            </section>

        </>
    );
}


export default FormularioInscripcion;