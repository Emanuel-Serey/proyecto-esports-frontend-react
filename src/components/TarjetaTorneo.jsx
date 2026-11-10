import { Link } from "react-router-dom";


function obtenerImagenJuego(juego) {

    const nombre =
        String(juego || "").toLowerCase();


    if (nombre.includes("valorant")) {

        return "https://cdn.mos.cms.futurecdn.net/QotLyoh6LR4VT8KvE3tGze.jpg";

    }


    if (
        nombre.includes("league") ||
        nombre.includes("lol")
    ) {

        return "https://static1-es.millenium.gg/articles/1/49/86/1/@/273016-league-of-legends-event-pass-orig-1-full-1.jpg";

    }


    if (nombre.includes("rocket")) {

        return "https://www.rocketleague.com/rr7/rl_evergreen-BuFUX3Ml.jpg";

    }


    return "https://cdn.oneesports.gg/wp-content/uploads/2022/08/LeagueofLegends_Worlds2019_ParisFrance-1024x576.jpg";
}


function formatearFecha(fecha) {

    if (!fecha) {
        return "Sin fecha";
    }


    const fechaObjeto =
        new Date(`${fecha}T00:00:00`);


    if (
        Number.isNaN(
            fechaObjeto.getTime()
        )
    ) {
        return fecha;
    }


    return fechaObjeto.toLocaleDateString(
        "es-CL",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


function obtenerClaseEstado(estado) {

    const estadoNormalizado =
        String(estado || "")
            .toLowerCase();


    if (
        estadoNormalizado.includes(
            "abierto"
        )
    ) {
        return "estado-abierto";
    }


    if (
        estadoNormalizado.includes(
            "curso"
        )
    ) {
        return "estado-curso";
    }


    if (
        estadoNormalizado.includes(
            "cerrado"
        )
    ) {
        return "estado-cerrado";
    }


    if (
        estadoNormalizado.includes(
            "cancelado"
        )
    ) {
        return "estado-cancelado";
    }


    return "";
}


function TarjetaTorneo({
    torneo
}) {

    return (

        <article className="torneo-card">

            <div className="torneo-card-imagen">

                <img
                    src={
                        obtenerImagenJuego(
                            torneo.juego
                        )
                    }
                    alt={`Imagen de ${torneo.juego}`}
                />


                <div className="torneo-card-overlay">


                    <span className="torneo-juego">

                        {torneo.juego}

                    </span>


                    <span
                        className={
                            `torneo-estado ${obtenerClaseEstado(
                                torneo.estado
                            )}`
                        }
                    >

                        {torneo.estado}

                    </span>

                </div>

            </div>


            <div className="torneo-card-contenido">

                <h3>
                    {torneo.nombre}
                </h3>


                <p className="torneo-card-subtitulo">

                    Prepárate para competir y demostrar
                    tu nivel.

                </p>


                <div className="torneo-meta-grid">


                    <div className="torneo-meta">

                        <span className="torneo-meta-icono">
                            ◈
                        </span>

                        <div>

                            <span className="torneo-meta-label">
                                Modalidad
                            </span>

                            <strong>
                                {torneo.modalidad}
                            </strong>

                        </div>

                    </div>


                    <div className="torneo-meta">

                        <span className="torneo-meta-icono">
                            ♟
                        </span>

                        <div>

                            <span className="torneo-meta-label">
                                Cupos
                            </span>

                            <strong>
                                {torneo.cupoMaximo}
                            </strong>

                        </div>

                    </div>


                    <div className="torneo-meta">

                        <span className="torneo-meta-icono">
                            ◷
                        </span>

                        <div>

                            <span className="torneo-meta-label">
                                Cierre
                            </span>

                            <strong>
                                {
                                    formatearFecha(
                                        torneo.cierreInscripcion
                                    )
                                }
                            </strong>

                        </div>

                    </div>


                    <div className="torneo-meta">

                        <span className="torneo-meta-icono">
                            ◆
                        </span>

                        <div>

                            <span className="torneo-meta-label">
                                Inicio
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

                </div>


                <Link
                    to={`/detalle/${torneo.id}`}
                    className="btn btn-primary torneo-card-boton"
                >

                    Ver torneo

                    <span>
                        →
                    </span>

                </Link>

            </div>

        </article>

    );
}


export default TarjetaTorneo;