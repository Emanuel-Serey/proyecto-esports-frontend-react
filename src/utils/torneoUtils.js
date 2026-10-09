export function ordenarRanking(clasificacion) {

    return [...clasificacion].sort(function (a, b) {

        if (b.puntos !== a.puntos) {
            return b.puntos - a.puntos;
        }

        return b.diferenciaMapas - a.diferenciaMapas;

    });
}


export function calcularPuntos(
    resultados,
    puntosVictoria = 3,
    puntosDerrota = 0
) {

    const puntos = {};


    resultados.forEach(function (partida) {

        if (
            partida.estado !== "Finalizada" ||
            !partida.resultado ||
            partida.resultado === "-"
        ) {
            return;
        }


        const marcador = partida.resultado
            .split("-")
            .map(function (valor) {
                return Number(valor.trim());
            });


        const puntajeEquipo1 = marcador[0];
        const puntajeEquipo2 = marcador[1];


        if (
            Number.isNaN(puntajeEquipo1) ||
            Number.isNaN(puntajeEquipo2)
        ) {
            return;
        }


        if (puntos[partida.equipo1] === undefined) {
            puntos[partida.equipo1] = 0;
        }

        if (puntos[partida.equipo2] === undefined) {
            puntos[partida.equipo2] = 0;
        }


        if (puntajeEquipo1 > puntajeEquipo2) {

            puntos[partida.equipo1] += puntosVictoria;
            puntos[partida.equipo2] += puntosDerrota;

        } else if (puntajeEquipo2 > puntajeEquipo1) {

            puntos[partida.equipo2] += puntosVictoria;
            puntos[partida.equipo1] += puntosDerrota;

        }

    });


    return puntos;
}