import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    obtenerDetalleTorneo
} from "../services/torneosService.js";

import "./detalle-torneo.css";


function obtenerImagenJuego(juego) {

    const nombre =
        String(juego || "")
            .toLowerCase();


    if (nombre.includes("valorant")) {

        return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85";

    }


    if (
        nombre.includes("league") ||
        nombre.includes("lol")
    ) {

        return "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=85";

    }


    if (nombre.includes("rocket")) {

        return "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1600&q=85";

    }


    return "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1600&q=85";
}


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


    return objetoFecha
        .toLocaleDateString(
            "es-CL",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );
}


function DetalleTorneo() {

    const { id } =
        useParams();


    const [
        torneo,
        setTorneo
    ] = useState(null);

    const [
        cargando,
        setCargando
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    useEffect(
        function () {

            obtenerDetalleTorneo(id)
                .then(
                    function (datos) {

                        setTorneo(
                            datos
                        );

                    }
                )
                .catch(
                    function (error) {

                        setError(
                            error.message
                        );

                    }
                )
                .finally(
                    function () {

                        setCargando(false);

                    }
                );

        },
        [id]
    );


    if (cargando) {

        return (

            <main className="detalle-torneo-page">

                <div className="detalle-cargando">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p>
                        Cargando torneo...
                    </p>

                </div>

            </main>

        );
    }


    if (error) {

        return (

            <main className="detalle-torneo-page">

                <div className="detalle-error">

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>


                    <Link
                        to="/torneos"
                        className="btn btn-primary"
                    >
                        Volver a torneos
                    </Link>

                </div>

            </main>

        );
    }


    const inscripciones =
        torneo.inscripciones || [];


    const porcentajeOcupado =
        torneo.cupoMaximo > 0
            ? Math.min(
                100,
                Math.round(
                    (
                        inscripciones.length /
                        torneo.cupoMaximo
                    ) * 100
                )
            )
            : 0;


    const abierto =
        torneo.estado === "Abierto";


    return (

        <main className="detalle-torneo-page">


            {/* HERO */}

            <section className="detalle-hero">

                <img
                    src={
                        obtenerImagenJuego(
                            torneo.juego
                        )
                    }
                    alt={`Competencia de ${torneo.juego}`}
                />


                <div className="detalle-hero-overlay" />


                <div className="detalle-hero-contenido">


                    <Link
                        to="/torneos"
                        className="detalle-volver"
                    >
                        ← Volver a torneos
                    </Link>


                    <div className="detalle-etiquetas">

                        <span className="detalle-juego">
                            {torneo.juego}
                        </span>


                        <span
                            className={
                                `detalle-estado ${
                                    abierto
                                        ? "activo"
                                        : ""
                                }`
                            }
                        >
                            {torneo.estado}
                        </span>

                    </div>


                    <h1>
                        {torneo.nombre}
                    </h1>


                    <p>
                        Entra a la arena, compite
                        y demuestra quién merece
                        llegar a lo más alto.
                    </p>


                    <div className="detalle-hero-datos">

                        <div>

                            <span>
                                MODALIDAD
                            </span>

                            <strong>
                                {torneo.modalidad}
                            </strong>

                        </div>


                        <div>

                            <span>
                                PARTICIPANTES
                            </span>

                            <strong>

                                {
                                    inscripciones.length
                                }

                                {" / "}

                                {
                                    torneo.cupoMaximo
                                }

                            </strong>

                        </div>


                        <div>

                            <span>
                                INICIO
                            </span>

                            <strong>
                                {
                                    formatearFecha(
                                        torneo.fechaInicio
                                    )
                                }
                            </strong>

                        </div>

                    </div>


                    {abierto && (

                        <Link
                            to="/inscripcion"
                            className="btn btn-primary btn-lg detalle-inscribirse"
                        >
                            Inscribirme
                            <span>
                                →
                            </span>
                        </Link>

                    )}

                </div>

            </section>


            {/* INFORMACIÓN */}

            <section className="detalle-contenido">


                <div className="detalle-principal">

                    <div className="detalle-seccion-titulo">

                        <span className="seccion-etiqueta">
                            INFORMACIÓN
                        </span>

                        <h2>
                            Sobre el torneo
                        </h2>

                    </div>


                    <div className="detalle-info-grid">


                        <article className="detalle-info-card">

                            <span>
                                ◈
                            </span>

                            <div>

                                <small>
                                    Juego
                                </small>

                                <strong>
                                    {torneo.juego}
                                </strong>

                            </div>

                        </article>


                        <article className="detalle-info-card">

                            <span>
                                ◆
                            </span>

                            <div>

                                <small>
                                    Modalidad
                                </small>

                                <strong>
                                    {torneo.modalidad}
                                </strong>

                            </div>

                        </article>


                        <article className="detalle-info-card">

                            <span>
                                ◷
                            </span>

                            <div>

                                <small>
                                    Inicio
                                </small>

                                <strong>
                                    {
                                        formatearFecha(
                                            torneo.fechaInicio
                                        )
                                    }
                                </strong>

                            </div>

                        </article>


                        <article className="detalle-info-card">

                            <span>
                                ◇
                            </span>

                            <div>

                                <small>
                                    Finalización
                                </small>

                                <strong>
                                    {
                                        formatearFecha(
                                            torneo.fechaFin
                                        )
                                    }
                                </strong>

                            </div>

                        </article>

                    </div>


                    {/* PARTICIPANTES */}

                    <div className="detalle-participantes">

                        <div className="detalle-seccion-titulo">

                            <span className="seccion-etiqueta">
                                COMPETIDORES
                            </span>

                            <h2>
                                Participantes inscritos
                            </h2>

                            <p>

                                {
                                    inscripciones.length
                                }

                                {" participantes registrados actualmente."}

                            </p>

                        </div>


                        {inscripciones.length === 0 ? (

                            <div className="detalle-vacio">

                                <div>
                                    ◇
                                </div>

                                <h3>
                                    Todavía no hay participantes
                                </h3>

                                <p>
                                    Sé uno de los primeros
                                    en entrar a la competencia.
                                </p>

                            </div>

                        ) : (

                            <div className="detalle-participantes-grid">

                                {
                                    inscripciones.map(
                                        function (
                                            inscripcion,
                                            indice
                                        ) {

                                            return (

                                                <article
                                                    className="participante-card"
                                                    key={
                                                        inscripcion.id
                                                    }
                                                >

                                                    <div className="participante-avatar">

                                                        {
                                                            inscripcion
                                                                .tipoParticipante ===
                                                            "EQUIPO"
                                                                ? "E"
                                                                : "J"
                                                        }

                                                    </div>


                                                    <div className="participante-info">

                                                        <span>
                                                            Participante
                                                            {" "}
                                                            #
                                                            {
                                                                indice + 1
                                                            }
                                                        </span>


                                                        <strong>
                                                            {
                                                                inscripcion
                                                                    .tipoParticipante
                                                            }
                                                        </strong>


                                                        <small>
                                                            Inscrito el{" "}
                                                            {
                                                                formatearFecha(
                                                                    inscripcion
                                                                        .fechaInscripcion
                                                                )
                                                            }
                                                        </small>

                                                    </div>


                                                    <span
                                                        className={
                                                            `participante-estado ${
                                                                inscripcion
                                                                    .estado ===
                                                                "APROBADA"
                                                                    ? "aprobado"
                                                                    : ""
                                                            }`
                                                        }
                                                    >

                                                        {
                                                            inscripcion
                                                                .estado
                                                        }

                                                    </span>

                                                </article>

                                            );

                                        }
                                    )
                                }

                            </div>

                        )}

                    </div>

                </div>


                {/* SIDEBAR */}

                <aside className="detalle-sidebar">


                    <div className="detalle-cupos">

                        <span className="seccion-etiqueta">
                            INSCRIPCIONES
                        </span>

                        <h3>
                            Cupos disponibles
                        </h3>


                        <div className="detalle-cupos-numero">

                            <strong>
                                {
                                    inscripciones.length
                                }
                            </strong>

                            <span>
                                / {torneo.cupoMaximo}
                            </span>

                        </div>


                        <div className="detalle-progreso">

                            <div
                                style={{
                                    width:
                                        `${porcentajeOcupado}%`
                                }}
                            />

                        </div>


                        <p>

                            {
                                porcentajeOcupado
                            }

                            % de los cupos ocupados

                        </p>


                        {abierto ? (

                            <Link
                                to="/inscripcion"
                                className="btn btn-primary w-100"
                            >
                                Participar ahora
                            </Link>

                        ) : (

                            <button
                                type="button"
                                className="btn btn-secondary w-100"
                                disabled
                            >
                                Inscripciones cerradas
                            </button>

                        )}

                    </div>


                    <div className="detalle-fechas">

                        <h3>
                            Fechas importantes
                        </h3>


                        <div>

                            <span>
                                Cierre de inscripción
                            </span>

                            <strong>
                                {
                                    formatearFecha(
                                        torneo
                                            .cierreInscripcion
                                    )
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Inicio del torneo
                            </span>

                            <strong>
                                {
                                    formatearFecha(
                                        torneo.fechaInicio
                                    )
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Final del torneo
                            </span>

                            <strong>
                                {
                                    formatearFecha(
                                        torneo.fechaFin
                                    )
                                }
                            </strong>

                        </div>

                    </div>

                </aside>

            </section>

        </main>

    );
}


export default DetalleTorneo;