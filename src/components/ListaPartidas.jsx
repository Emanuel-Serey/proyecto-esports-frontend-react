import { useState } from "react";

import LlaveTorneo from "./LlaveTorneo.jsx";


function ListaPartidas({ partidas, formato }) {

    const rondas = [
        ...new Set(
            partidas.map(function (partida) {
                return partida.ronda;
            })
        )
    ];


    const [rondaVisible, setRondaVisible] =
        useState(rondas[0] || "");


    const partidasRonda =
        partidas.filter(function (partida) {

            return partida.ronda === rondaVisible;

        });


    return (
        <div>

            <div className="d-flex flex-wrap gap-2 mb-3">

                {rondas.map(function (ronda) {

                    return (
                        <button
                            key={ronda}
                            type="button"
                            className={
                                rondaVisible === ronda
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                            }
                            onClick={function () {
                                setRondaVisible(ronda);
                            }}
                        >
                            {ronda}
                        </button>
                    );

                })}

            </div>


            <div className="row g-3">

                {partidasRonda.map(function (partida) {

                    return (
                        <div
                            className="col-12 col-md-6"
                            key={
                                partida.ronda +
                                partida.equipo1 +
                                partida.horario
                            }
                        >

                            <LlaveTorneo
                                partida={partida}
                                formato={formato}
                            />

                        </div>
                    );

                })}

            </div>

        </div>
    );
}


export default ListaPartidas;