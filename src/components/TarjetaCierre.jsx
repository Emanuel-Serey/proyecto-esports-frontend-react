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


function TarjetaCierre({
    torneo
}) {

    return (

        <article className="tarjeta-cierre">

            <h3>
                {torneo.nombre}
            </h3>

            <p>
                Juego: {torneo.juego}
            </p>

            <p>
                Cierre de inscripción:{" "}
                {
                    formatearFecha(
                        torneo.cierreInscripcion
                    )
                }
            </p>

        </article>

    );
}


export default TarjetaCierre;