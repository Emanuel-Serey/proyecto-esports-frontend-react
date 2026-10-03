const listaTorneos = document.getElementById("lista-torneos");

torneos.forEach(function(torneo) {

    listaTorneos.innerHTML += `
        <article class="tarjeta-torneo">
            <h3>${torneo.nombre}</h3>
            <p>Juego: ${torneo.juego}</p>
            <p>Estado: ${torneo.estado}</p>
            <p>Cupos: ${torneo.inscritos} / ${torneo.cupoMaximo}</p>
            <p>Cierre de inscripción: ${torneo.cierreInscripcion}</p>
        </article>
    `;

});

const listaCierres = document.getElementById("lista-cierres");

torneos.forEach(function(torneo) {

    if (torneo.estado === "Abierto") {

        listaCierres.innerHTML += `
            <article class="tarjeta-cierre">
                <h3>${torneo.nombre}</h3>
                <p>Juego: ${torneo.juego}</p>
                <p>Cierre de inscripción: ${torneo.cierreInscripcion}</p>
            </article>
        `;

    }

});