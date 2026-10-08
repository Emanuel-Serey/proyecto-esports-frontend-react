function TarjetaCierre({ torneo }) {
    return (
        <article className="tarjeta-cierre">
            <h3>{torneo.nombre}</h3>
            <p>Juego: {torneo.juego}</p>
            <p>
                Cierre de inscripción: {torneo.cierreInscripcion}
            </p>
        </article>
    );
}

export default TarjetaCierre;