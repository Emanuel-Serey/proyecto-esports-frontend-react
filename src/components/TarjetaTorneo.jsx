import { Link } from "react-router-dom";

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
                    Cupo máximo: {torneo.cupoMaximo}
                </p>

                <p className="card-text">
                    Cierre de inscripción: {torneo.cierreInscripcion}
                </p>

                <p className="card-text">
                    Inicio: {torneo.fechaInicio}
                </p>

                <p className="card-text">
                    Fin: {torneo.fechaFin}
                </p>

                <Link
                    to={`/detalle/${torneo.id}`}
                    className="btn btn-outline-primary"
                >
                    Ver detalle
                </Link>

            </div>

        </article>

    );
}


export default TarjetaTorneo;