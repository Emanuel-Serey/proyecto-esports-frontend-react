function obtenerIniciales(
    nombre
) {

    const texto =
        String(
            nombre || "Jugador"
        )
            .trim();


    if (texto.length === 0) {
        return "J";
    }


    const partes =
        texto
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


function ListaIntegrantes({
    integrantes,
    onQuitar
}) {

    if (
        integrantes.length === 0
    ) {

        return (

            <div className="equipo-vacio">

                <div>
                    ◇
                </div>

                <h3>
                    Aún no hay integrantes
                </h3>

                <p>
                    Agrega jugadores para comenzar
                    a formar tu escuadra.
                </p>

            </div>

        );

    }


    return (

        <div className="equipo-integrantes-lista">

            {
                integrantes.map(
                    function (
                        integrante,
                        indice
                    ) {

                        const esCapitan =
                            integrante.rol ===
                            "Capitán";


                        return (

                            <article
                                className="equipo-integrante"
                                key={
                                    integrante.id ||
                                    integrante.jugador
                                }
                            >

                                <div className="equipo-integrante-avatar">

                                    {
                                        obtenerIniciales(
                                            integrante.jugador
                                        )
                                    }

                                </div>


                                <div className="equipo-integrante-info">

                                    <span>
                                        JUGADOR
                                    </span>


                                    <h3>
                                        {
                                            integrante.jugador
                                        }
                                    </h3>


                                    <small>
                                        Miembro de la escuadra
                                    </small>

                                </div>


                                <div className="equipo-integrante-rol">

                                    <span
                                        className={
                                            `equipo-badge ${
                                                esCapitan
                                                    ? "capitan"
                                                    : integrante.rol ===
                                                      "Titular"
                                                        ? "titular"
                                                        : "suplente"
                                            }`
                                        }
                                    >
                                        {
                                            integrante.rol
                                        }
                                    </span>

                                </div>


                                <div className="equipo-integrante-accion">

                                    {!esCapitan && (

                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={
                                                function () {

                                                    onQuitar(
                                                        indice
                                                    );

                                                }
                                            }
                                        >
                                            Quitar
                                        </button>

                                    )}

                                </div>

                            </article>

                        );

                    }
                )
            }

        </div>

    );
}


export default ListaIntegrantes;