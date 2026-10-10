import { act } from "react";
import { createRoot } from "react-dom/client";

import LlaveTorneo from "./LlaveTorneo.jsx";


describe("LlaveTorneo", function () {

    it("muestra participante por definir cuando falta un rival", function () {

        const contenedor =
            document.createElement("div");

        document.body.appendChild(contenedor);

        const raiz =
            createRoot(contenedor);


        const partida = {
            ronda: "Semifinal",
            equipo1: "T1",
            equipo2: "",
            horario: "2026-10-20 18:00",
            estado: "Programada",
            resultado: "-"
        };


        act(function () {

            raiz.render(
                <LlaveTorneo
                    partida={partida}
                    formato="BO3"
                />
            );

        });


        expect(
            contenedor.textContent
        ).toContain("Participante por definir");


        act(function () {
            raiz.unmount();
        });

        contenedor.remove();

    });

});