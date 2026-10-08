function TablaRanking({ clasificacion }) {

    return (
        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Equipo</th>
                        <th>PJ</th>
                        <th>PG</th>
                        <th>PP</th>
                        <th>DM</th>
                        <th>Puntos</th>
                    </tr>
                </thead>


                <tbody>

                    {clasificacion.map(function (equipo) {

                        return (
                            <tr key={equipo.equipo}>

                                <td>{equipo.posicion}</td>

                                <td>{equipo.equipo}</td>

                                <td>{equipo.jugados}</td>

                                <td>{equipo.ganados}</td>

                                <td>{equipo.perdidos}</td>

                                <td>
                                    {equipo.diferenciaMapas > 0
                                        ? "+" + equipo.diferenciaMapas
                                        : equipo.diferenciaMapas}
                                </td>

                                <td>{equipo.puntos}</td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}


export default TablaRanking;