function ListaIntegrantes({ integrantes, onQuitar }) {

    if (integrantes.length === 0) {
        return (
            <div className="alert alert-secondary">
                Aún no hay integrantes en el equipo.
            </div>
        );
    }


    return (
        <div className="list-group">

            {integrantes.map(function (integrante, indice) {

                return (
                    <div
                        className="list-group-item"
                        key={integrante.jugador}
                    >

                        <div className="row align-items-center">

                            <div className="col-12 col-md-5">
                                <strong>
                                    {integrante.jugador}
                                </strong>
                            </div>


                            <div className="col-8 col-md-5">
                                {integrante.rol}
                            </div>


                            <div className="col-4 col-md-2 text-end">

                                {integrante.rol !== "Capitán" && (

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={function () {
                                            onQuitar(indice);
                                        }}
                                    >
                                        Quitar
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>
                );

            })}

        </div>
    );
}


export default ListaIntegrantes;