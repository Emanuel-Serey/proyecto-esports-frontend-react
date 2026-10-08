function TarjetaTorneo({ torneo }) {
    return (
        <article className="card h-100">
            <div className="card-body">

                <h3 className="card-title">
                    {torneo.nombre}
                </h3>

                <p className="card-text">
                    Juego: {torneo.juego}
                </p>

                <p className="card-text">
                    Modalidad: {torneo.modalidad}
                </p>

                <p className="card-text">
                    Estado: {torneo.estado}
                </p>

                <p className="card-text">
                    Cupos: {torneo.inscritos} / {torneo.cupoMaximo}
                </p>

                <p className="card-text">
                    Cierre de inscripción: {torneo.cierreInscripcion}
                </p>

            </div>
        </article>
    );
}

export default TarjetaTorneo;