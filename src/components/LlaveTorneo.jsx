function LlaveTorneo({ partida, formato }) {

    const equipo1 =
        partida.equipo1 || "Participante por definir";

    const equipo2 =
        partida.equipo2 || "Participante por definir";

    const centroPartida =
        partida.estado === "Finalizada"
            ? partida.resultado
            : "VS";


    return (
        <article className="card h-100">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3 className="h5 mb-0">
                        {partida.ronda}
                    </h3>

                    <span className="badge text-bg-secondary">
                        {formato} | {partida.estado}
                    </span>

                </div>


                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">

                    <strong>
                        {equipo1}
                    </strong>

                    <span className="fw-bold fs-5">
                        {centroPartida}
                    </span>

                    <strong>
                        {equipo2}
                    </strong>

                </div>


                <p className="card-text mb-0">
                    Horario: {partida.horario}
                </p>

            </div>

        </article>
    );
}


export default LlaveTorneo;