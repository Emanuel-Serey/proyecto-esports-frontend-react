import {
    useState
} from "react";

import {
    actualizarApodo
} from "../services/perfilService.js";


function PerfilJugador({
    usuario,
    perfil
}) {

    const [apodoActual, setApodoActual] =
        useState(usuario.apodo);

    const [nuevoApodo, setNuevoApodo] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


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


        if (apodo.includes(" ")) {

            setMensaje(
                "El apodo no puede contener espacios."
            );

            return;
        }


        setGuardando(true);


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

            setGuardando(false);

        }
    }


    return (

        <>

            <section className="card mb-4">

                <div className="card-body">

                    <h2 className="card-title mb-3">
                        Perfil del jugador
                    </h2>


                    <div className="mb-4">

                        <p>
                            <strong>
                                Nombre:
                            </strong>{" "}
                            {usuario.nombre}
                        </p>


                        <p>
                            <strong>
                                Apodo:
                            </strong>{" "}
                            {apodoActual}
                        </p>


                        <p>
                            <strong>
                                Correo:
                            </strong>{" "}
                            {usuario.correo}
                        </p>

                    </div>


                    <form
                        onSubmit={
                            cambiarApodo
                        }
                    >

                        <div
                            className="
                                row
                                g-3
                                align-items-end
                            "
                        >

                            <div className="col-12 col-md-8">

                                <label
                                    htmlFor="nuevo-apodo"
                                    className="form-label"
                                >
                                    Cambiar apodo:
                                </label>


                                <input
                                    id="nuevo-apodo"
                                    type="text"
                                    className="form-control"
                                    value={nuevoApodo}
                                    placeholder={
                                        `Ej: ${apodoActual}`
                                    }
                                    autoComplete="off"
                                    disabled={
                                        guardando
                                    }
                                    onChange={
                                        function (event) {

                                            setNuevoApodo(
                                                event.target.value
                                            );

                                            setMensaje("");

                                        }
                                    }
                                />

                            </div>


                            <div className="col-12 col-md-4">

                                <button
                                    type="submit"
                                    className="
                                        btn
                                        btn-primary
                                        w-100
                                    "
                                    disabled={
                                        guardando
                                    }
                                >

                                    {
                                        guardando
                                            ? "Guardando..."
                                            : "Guardar"
                                    }

                                </button>

                            </div>

                        </div>

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

                </div>

            </section>


            <section className="mb-4">

                <h2 className="mb-3">
                    Mis equipos
                </h2>


                {
                    perfil.equipos.length === 0
                        ? (

                            <div
                                className="
                                    alert
                                    alert-secondary
                                "
                            >
                                No perteneces a ningún equipo.
                            </div>

                        )
                        : (

                            <div className="row g-3">

                                {
                                    perfil.equipos.map(
                                        function (equipo) {

                                            return (

                                                <div
                                                    className="
                                                        col-12
                                                        col-md-6
                                                        col-lg-4
                                                    "
                                                    key={equipo.id}
                                                >

                                                    <article
                                                        className="
                                                            card
                                                            h-100
                                                        "
                                                    >

                                                        <div className="card-body">

                                                            <h3
                                                                className="
                                                                    h5
                                                                    card-title
                                                                "
                                                            >
                                                                {
                                                                    equipo.nombre
                                                                }
                                                            </h3>


                                                            <p className="mb-1">

                                                                Estado:{" "}
                                                                {
                                                                    equipo.estado
                                                                }

                                                            </p>


                                                            {
                                                                equipo.esCapitan && (

                                                                    <p className="mb-0">

                                                                        <strong>
                                                                            Capitán
                                                                        </strong>

                                                                    </p>

                                                                )
                                                            }

                                                        </div>

                                                    </article>

                                                </div>

                                            );

                                        }
                                    )
                                }

                            </div>

                        )
                }

            </section>


            <section className="mb-4">

                <h2 className="mb-3">
                    Historial de torneos
                </h2>


                {
                    perfil.historialTorneos.length === 0
                        ? (

                            <div
                                className="
                                    alert
                                    alert-secondary
                                "
                            >
                                Aún no tienes participaciones
                                registradas.
                            </div>

                        )
                        : (

                            <div className="row g-3">

                                {
                                    perfil.historialTorneos.map(
                                        function (
                                            torneo,
                                            indice
                                        ) {

                                            return (

                                                <div
                                                    className="
                                                        col-12
                                                        col-md-6
                                                    "
                                                    key={
                                                        `${torneo.torneo}-${indice}`
                                                    }
                                                >

                                                    <article
                                                        className="
                                                            card
                                                            h-100
                                                        "
                                                    >

                                                        <div className="card-body">

                                                            <h3
                                                                className="
                                                                    card-title
                                                                    h5
                                                                "
                                                            >
                                                                {
                                                                    torneo.torneo
                                                                }
                                                            </h3>


                                                            <p className="card-text">
                                                                Juego:{" "}
                                                                {
                                                                    torneo.juego
                                                                }
                                                            </p>


                                                            <p className="card-text">
                                                                Resultado:{" "}
                                                                {
                                                                    torneo.resultado
                                                                }
                                                            </p>


                                                            <p className="card-text mb-0">
                                                                Inscripción:{" "}
                                                                {
                                                                    torneo.estadoInscripcion
                                                                }
                                                            </p>

                                                        </div>

                                                    </article>

                                                </div>

                                            );

                                        }
                                    )
                                }

                            </div>

                        )
                }

            </section>


            <section className="mb-4">

                <h2 className="mb-3">
                    Estadísticas
                </h2>


                <div className="row g-3">

                    <div className="col-12 col-md-6">

                        <article className="card h-100">

                            <div className="card-body">

                                <h3 className="h5">
                                    Victorias
                                </h3>

                                <p className="fs-4 mb-0">
                                    {
                                        perfil.estadisticas.victorias
                                    }
                                </p>

                            </div>

                        </article>

                    </div>


                    <div className="col-12 col-md-6">

                        <article className="card h-100">

                            <div className="card-body">

                                <h3 className="h5">
                                    Derrotas
                                </h3>

                                <p className="fs-4 mb-0">
                                    {
                                        perfil.estadisticas.derrotas
                                    }
                                </p>

                            </div>

                        </article>

                    </div>

                </div>

            </section>


            <section className="mb-4">

                <h2 className="mb-3">
                    Sanciones
                </h2>


                {
                    perfil.sanciones.length === 0
                        ? (

                            <div
                                className="
                                    alert
                                    alert-success
                                "
                            >
                                No tienes sanciones registradas.
                            </div>

                        )
                        : (

                            <div className="list-group">

                                {
                                    perfil.sanciones.map(
                                        function (sancion) {

                                            return (

                                                <div
                                                    className="
                                                        list-group-item
                                                    "
                                                    key={sancion.id}
                                                >

                                                    <p className="mb-1">

                                                        <strong>
                                                            Motivo:
                                                        </strong>{" "}
                                                        {
                                                            sancion.motivo
                                                        }

                                                    </p>


                                                    <p className="mb-1">

                                                        Estado:{" "}
                                                        {
                                                            sancion.estado
                                                        }

                                                    </p>


                                                    <p className="mb-1">

                                                        Severidad:{" "}
                                                        {
                                                            sancion.severidad
                                                        }

                                                    </p>


                                                    <p className="mb-0">

                                                        {
                                                            sancion.fechaInicio
                                                        }
                                                        {" → "}
                                                        {
                                                            sancion.fechaFin
                                                        }

                                                    </p>

                                                </div>

                                            );

                                        }
                                    )
                                }

                            </div>

                        )
                }

            </section>

        </>

    );
}


export default PerfilJugador;