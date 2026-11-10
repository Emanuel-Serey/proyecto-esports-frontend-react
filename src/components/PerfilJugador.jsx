import {
    useMemo,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    actualizarApodo
} from "../services/perfilService.js";


function obtenerIniciales(
    apodo,
    nombre
) {

    const texto =
        apodo ||
        nombre ||
        "Jugador";


    const partes =
        texto
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (partes.length === 1) {

        return partes[0]
            .slice(0, 2)
            .toUpperCase();

    }


    return (
        partes[0][0] +
        partes[1][0]
    ).toUpperCase();
}


function formatearEstado(
    estado
) {

    return String(
        estado || "SIN ESTADO"
    )
        .replaceAll(
            "_",
            " "
        );
}


function PerfilJugador({
    usuario,
    perfil
}) {

    const [
        apodoActual,
        setApodoActual
    ] = useState(
        usuario.apodo
    );


    const [
        nuevoApodo,
        setNuevoApodo
    ] = useState("");


    const [
        mensaje,
        setMensaje
    ] = useState("");


    const [
        guardando,
        setGuardando
    ] = useState(false);


    const victorias =
        perfil.estadisticas
            .victorias || 0;


    const derrotas =
        perfil.estadisticas
            .derrotas || 0;


    const partidasJugadas =
        victorias +
        derrotas;


    const porcentajeVictorias =
        partidasJugadas > 0
            ? Math.round(
                (
                    victorias /
                    partidasJugadas
                ) * 100
            )
            : 0;


    const iniciales =
        useMemo(
            function () {

                return obtenerIniciales(
                    apodoActual,
                    usuario.nombre
                );

            },
            [
                apodoActual,
                usuario.nombre
            ]
        );


    async function cambiarApodo(
        event
    ) {

        event.preventDefault();

        setMensaje("");


        const apodo =
            nuevoApodo.trim();


        if (apodo === "") {

            setMensaje(
                "El apodo es obligatorio."
            );

            return;
        }


        if (
            apodo.length < 3 ||
            apodo.length > 15
        ) {

            setMensaje(
                "El apodo debe tener entre 3 y 15 caracteres."
            );

            return;
        }


        if (
            apodo.includes(" ")
        ) {

            setMensaje(
                "El apodo no puede contener espacios."
            );

            return;
        }


        setGuardando(
            true
        );


        try {

            const usuarioActualizado =
                await actualizarApodo(
                    apodo
                );


            setApodoActual(
                usuarioActualizado.nickname
            );


            setNuevoApodo("");


            setMensaje(
                "Apodo actualizado correctamente."
            );


        } catch (error) {

            setMensaje(
                error.message
            );


        } finally {

            setGuardando(
                false
            );

        }
    }


    return (

        <>


            {/* =========================
                CABECERA PERFIL
            ========================= */}

            <section className="perfil-hero">

                <div className="perfil-hero-fondo" />


                <div className="perfil-identidad">


                    <div className="perfil-avatar">

                        <span>
                            {iniciales}
                        </span>

                        <div className="perfil-avatar-estado" />

                    </div>


                    <div className="perfil-identidad-texto">

                        <span className="perfil-etiqueta">
                            PERFIL DE JUGADOR
                        </span>


                        <h1>
                            {apodoActual}
                        </h1>


                        <p className="perfil-nombre">
                            {usuario.nombre}
                        </p>


                        <div className="perfil-datos-usuario">

                            <span>
                                JUGADOR
                            </span>

                            <span>
                                {usuario.correo}
                            </span>

                        </div>

                    </div>

                </div>


                <div className="perfil-hero-acciones">

                    <Link
                        to="/torneos"
                        className="btn btn-primary"
                    >
                        Buscar torneos
                    </Link>


                    <Link
                        to="/equipo"
                        className="btn btn-outline-primary"
                    >
                        Mis equipos
                    </Link>

                </div>

            </section>


            {/* =========================
                ESTADÍSTICAS
            ========================= */}

            <section className="perfil-estadisticas">


                <article>

                    <span className="perfil-stat-etiqueta">
                        VICTORIAS
                    </span>

                    <strong>
                        {victorias}
                    </strong>

                    <small>
                        Partidas ganadas
                    </small>

                </article>


                <article>

                    <span className="perfil-stat-etiqueta">
                        DERROTAS
                    </span>

                    <strong>
                        {derrotas}
                    </strong>

                    <small>
                        Partidas perdidas
                    </small>

                </article>


                <article>

                    <span className="perfil-stat-etiqueta">
                        WIN RATE
                    </span>

                    <strong>
                        {porcentajeVictorias}%
                    </strong>

                    <small>
                        Porcentaje de victorias
                    </small>

                </article>


                <article>

                    <span className="perfil-stat-etiqueta">
                        TORNEOS
                    </span>

                    <strong>
                        {
                            perfil
                                .historialTorneos
                                .length
                        }
                    </strong>

                    <small>
                        Participaciones
                    </small>

                </article>

            </section>


            <div className="perfil-layout">


                <div className="perfil-contenido">


                    {/* =========================
                        EQUIPOS
                    ========================= */}

                    <section className="perfil-seccion">

                        <div className="perfil-seccion-cabecera">

                            <div>

                                <span className="seccion-etiqueta">
                                    ESCUADRAS
                                </span>

                                <h2>
                                    Mis equipos
                                </h2>

                                <p>
                                    Equipos en los que
                                    participas actualmente.
                                </p>

                            </div>


                            <Link
                                to="/equipo"
                                className="perfil-enlace"
                            >
                                Gestionar equipos →
                            </Link>

                        </div>


                        {
                            perfil.equipos.length ===
                            0
                                ? (

                                    <div className="perfil-vacio">

                                        <div>
                                            ◈
                                        </div>

                                        <h3>
                                            Aún no tienes equipo
                                        </h3>

                                        <p>
                                            Crea una escuadra
                                            o únete a una para
                                            comenzar a competir.
                                        </p>


                                        <Link
                                            to="/equipo"
                                            className="btn btn-primary"
                                        >
                                            Crear equipo
                                        </Link>

                                    </div>

                                )
                                : (

                                    <div className="perfil-equipos-grid">

                                        {
                                            perfil.equipos.map(
                                                function (
                                                    equipo
                                                ) {

                                                    return (

                                                        <article
                                                            className="perfil-equipo-card"
                                                            key={
                                                                equipo.id
                                                            }
                                                        >

                                                            <div className="perfil-equipo-icono">
                                                                {
                                                                    equipo
                                                                        .nombre
                                                                        .charAt(0)
                                                                        .toUpperCase()
                                                                }
                                                            </div>


                                                            <div className="perfil-equipo-info">

                                                                <span>
                                                                    EQUIPO
                                                                </span>


                                                                <h3>
                                                                    {
                                                                        equipo.nombre
                                                                    }
                                                                </h3>


                                                                <div>

                                                                    <span
                                                                        className={
                                                                            `perfil-badge ${
                                                                                equipo.estado ===
                                                                                "ACTIVO"
                                                                                    ? "activo"
                                                                                    : ""
                                                                            }`
                                                                        }
                                                                    >
                                                                        {
                                                                            formatearEstado(
                                                                                equipo.estado
                                                                            )
                                                                        }
                                                                    </span>


                                                                    {
                                                                        equipo.esCapitan && (

                                                                            <span className="perfil-badge capitan">
                                                                                CAPITÁN
                                                                            </span>

                                                                        )
                                                                    }

                                                                </div>

                                                            </div>

                                                        </article>

                                                    );

                                                }
                                            )
                                        }

                                    </div>

                                )
                        }

                    </section>


                    {/* =========================
                        HISTORIAL
                    ========================= */}

                    <section className="perfil-seccion">

                        <div className="perfil-seccion-cabecera">

                            <div>

                                <span className="seccion-etiqueta">
                                    COMPETICIONES
                                </span>

                                <h2>
                                    Historial de torneos
                                </h2>

                                <p>
                                    Tus participaciones
                                    más recientes.
                                </p>

                            </div>

                        </div>


                        {
                            perfil
                                .historialTorneos
                                .length === 0
                                ? (

                                    <div className="perfil-vacio">

                                        <div>
                                            ◇
                                        </div>

                                        <h3>
                                            Sin participaciones todavía
                                        </h3>

                                        <p>
                                            Explora los torneos
                                            disponibles y entra
                                            a la competición.
                                        </p>


                                        <Link
                                            to="/torneos"
                                            className="btn btn-primary"
                                        >
                                            Explorar torneos
                                        </Link>

                                    </div>

                                )
                                : (

                                    <div className="perfil-historial">

                                        {
                                            perfil
                                                .historialTorneos
                                                .map(
                                                    function (
                                                        torneo,
                                                        indice
                                                    ) {

                                                        return (

                                                            <article
                                                                className="perfil-torneo-item"
                                                                key={
                                                                    `${torneo.torneo}-${indice}`
                                                                }
                                                            >

                                                                <div className="perfil-torneo-numero">

                                                                    {
                                                                        String(
                                                                            indice + 1
                                                                        )
                                                                            .padStart(
                                                                                2,
                                                                                "0"
                                                                            )
                                                                    }

                                                                </div>


                                                                <div className="perfil-torneo-info">

                                                                    <span>
                                                                        {
                                                                            torneo.juego
                                                                        }
                                                                    </span>


                                                                    <h3>
                                                                        {
                                                                            torneo.torneo
                                                                        }
                                                                    </h3>

                                                                </div>


                                                                <div className="perfil-torneo-resultado">

                                                                    <span>
                                                                        RESULTADO
                                                                    </span>

                                                                    <strong>
                                                                        {
                                                                            torneo.resultado
                                                                        }
                                                                    </strong>

                                                                </div>


                                                                <div>

                                                                    <span
                                                                        className="perfil-badge"
                                                                    >
                                                                        {
                                                                            formatearEstado(
                                                                                torneo.estadoInscripcion
                                                                            )
                                                                        }
                                                                    </span>

                                                                </div>

                                                            </article>

                                                        );

                                                    }
                                                )
                                        }

                                    </div>

                                )
                        }

                    </section>


                    {/* =========================
                        SANCIONES
                    ========================= */}

                    <section className="perfil-seccion">

                        <div className="perfil-seccion-cabecera">

                            <div>

                                <span className="seccion-etiqueta">
                                    DISCIPLINA
                                </span>

                                <h2>
                                    Sanciones
                                </h2>

                                <p>
                                    Historial disciplinario
                                    de tu cuenta.
                                </p>

                            </div>

                        </div>


                        {
                            perfil.sanciones.length ===
                            0
                                ? (

                                    <div className="perfil-sin-sanciones">

                                        <div>
                                            ✓
                                        </div>

                                        <div>

                                            <h3>
                                                Historial limpio
                                            </h3>

                                            <p>
                                                No tienes sanciones
                                                registradas.
                                            </p>

                                        </div>

                                    </div>

                                )
                                : (

                                    <div className="perfil-sanciones">

                                        {
                                            perfil.sanciones.map(
                                                function (
                                                    sancion
                                                ) {

                                                    return (

                                                        <article
                                                            className="perfil-sancion"
                                                            key={
                                                                sancion.id
                                                            }
                                                        >

                                                            <div className="perfil-sancion-icono">
                                                                !
                                                            </div>


                                                            <div className="perfil-sancion-info">

                                                                <span>
                                                                    MOTIVO
                                                                </span>

                                                                <h3>
                                                                    {
                                                                        sancion.motivo
                                                                    }
                                                                </h3>

                                                                <p>
                                                                    {
                                                                        sancion.fechaInicio
                                                                    }

                                                                    {" → "}

                                                                    {
                                                                        sancion.fechaFin
                                                                    }
                                                                </p>

                                                            </div>


                                                            <div className="perfil-sancion-badges">

                                                                <span className="perfil-badge sancion">
                                                                    {
                                                                        sancion.severidad
                                                                    }
                                                                </span>


                                                                <span
                                                                    className={
                                                                        `perfil-badge ${
                                                                            sancion.estado ===
                                                                            "ACTIVA"
                                                                                ? "advertencia"
                                                                                : ""
                                                                        }`
                                                                    }
                                                                >
                                                                    {
                                                                        sancion.estado
                                                                    }
                                                                </span>

                                                            </div>

                                                        </article>

                                                    );

                                                }
                                            )
                                        }

                                    </div>

                                )
                        }

                    </section>

                </div>


                {/* =========================
                    SIDEBAR CUENTA
                ========================= */}

                <aside className="perfil-sidebar">


                    <section className="perfil-configuracion">

                        <span className="seccion-etiqueta">
                            CUENTA
                        </span>

                        <h2>
                            Configuración
                        </h2>


                        <p>
                            Personaliza el nombre
                            con el que otros jugadores
                            te ven en la plataforma.
                        </p>


                        <form
                            onSubmit={
                                cambiarApodo
                            }
                        >

                            <label
                                htmlFor="nuevo-apodo"
                                className="form-label"
                            >
                                Apodo
                            </label>


                            <input
                                id="nuevo-apodo"
                                type="text"
                                className="form-control"
                                value={nuevoApodo}
                                placeholder={
                                    apodoActual
                                }
                                autoComplete="off"
                                disabled={
                                    guardando
                                }
                                onChange={
                                    function (
                                        event
                                    ) {

                                        setNuevoApodo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }
                                }
                            />


                            <small className="perfil-ayuda">
                                Entre 3 y 15 caracteres,
                                sin espacios.
                            </small>


                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={
                                    guardando
                                }
                            >

                                {
                                    guardando
                                        ? "Guardando..."
                                        : "Actualizar apodo"
                                }

                            </button>

                        </form>


                        {mensaje && (

                            <div
                                className={
                                    mensaje.includes(
                                        "correctamente"
                                    )
                                        ? "alert alert-success mt-3 mb-0"
                                        : "alert alert-danger mt-3 mb-0"
                                }
                                role="alert"
                            >
                                {mensaje}
                            </div>

                        )}

                    </section>


                    <section className="perfil-resumen">

                        <h3>
                            Resumen competitivo
                        </h3>


                        <div>

                            <span>
                                Partidas jugadas
                            </span>

                            <strong>
                                {partidasJugadas}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Equipos
                            </span>

                            <strong>
                                {
                                    perfil
                                        .equipos
                                        .length
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Torneos
                            </span>

                            <strong>
                                {
                                    perfil
                                        .historialTorneos
                                        .length
                                }
                            </strong>

                        </div>


                        <div>

                            <span>
                                Sanciones
                            </span>

                            <strong>
                                {
                                    perfil
                                        .sanciones
                                        .length
                                }
                            </strong>

                        </div>

                    </section>

                </aside>

            </div>

        </>

    );
}


export default PerfilJugador;