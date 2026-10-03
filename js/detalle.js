const informacionTorneo = document.getElementById("informacion-torneo");
const listaParticipantes = document.getElementById("lista-participantes");
const listaPartidas = document.getElementById("lista-partidas");
const tablaClasificacion = document.getElementById("tabla-clasificacion");
const listaPremios = document.getElementById("lista-premios");

informacionTorneo.innerHTML = `
    <article class="tarjeta-torneo">
        <h3>${detalleTorneo.nombre}</h3>

        <p>Juego: ${detalleTorneo.juego}</p>
        <p>Modalidad: ${detalleTorneo.modalidad}</p>
        <p>Integrantes por equipo: ${detalleTorneo.integrantesPorEquipo}</p>
        <p>Estado: ${detalleTorneo.estado}</p>

        <p>
            Cupos ocupados:
            ${detalleTorneo.inscritos} / ${detalleTorneo.cupoMaximo}
        </p>

        <p>
            Cupos disponibles:
            ${detalleTorneo.cupoMaximo - detalleTorneo.inscritos}
        </p>

        <p>
            Cierre de inscripción:
            ${detalleTorneo.cierreInscripcion}
        </p>
    </article>
`;

detalleTorneo.participantes.forEach(function (participante) {

    listaParticipantes.innerHTML += `
        <p>${participante}</p>
    `;

});

detalleTorneo.partidas.forEach(function (partida) {

    let centroPartida;

    if (partida.estado === "Finalizada") {
        centroPartida = partida.resultado;
    } else {
        centroPartida = "VS";
    }

    listaPartidas.innerHTML += `
        <article class="tarjeta-partida">

            <div class="encabezado-partida">
            <h3>${partida.ronda}</h3>

            <div>
                <span>${detalleTorneo.formato}</span>
                <span> | ${partida.estado}</span>
            </div>
        </div>

            <div class="enfrentamiento">
                <strong>${partida.equipo1}</strong>

                <span class="resultado">
                    ${centroPartida}
                </span>

                <strong>${partida.equipo2}</strong>
            </div>

            <p>Horario: ${partida.horario}</p>

        </article>
    `;

});

tablaClasificacion.innerHTML = `
    <table>
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

        <tbody id="cuerpo-clasificacion">
        </tbody>
    </table>
`;

const cuerpoClasificacion =
    document.getElementById("cuerpo-clasificacion");

detalleTorneo.clasificacion.forEach(function (equipo) {

    cuerpoClasificacion.innerHTML += `
        <tr>
            <td>${equipo.posicion}</td>
            <td>${equipo.equipo}</td>
            <td>${equipo.jugados}</td>
            <td>${equipo.ganados}</td>
            <td>${equipo.perdidos}</td>
            <td>
                ${equipo.diferenciaMapas > 0 ? "+" + equipo.diferenciaMapas : equipo.diferenciaMapas}
            </td>
            <td>${equipo.puntos}</td>
        </tr>
    `;

});

detalleTorneo.premios.forEach(function (premio) {

    listaPremios.innerHTML += `
        <article class="tarjeta-premio">
            <h3>${premio.posicion}° lugar</h3>
            <p>Premio: ${premio.premio}</p>
        </article>
    `;

});