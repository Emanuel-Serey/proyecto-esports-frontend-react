import { act } from "react";
import { createRoot } from "react-dom/client";

import TarjetaTorneo from "./TarjetaTorneo.jsx";


describe("TarjetaTorneo", function () {

    it("renderiza el nombre, juego y estado del torneo", function () {

        const contenedor =
            document.createElement("div");

        document.body.appendChild(contenedor);

        const raiz =
            createRoot(contenedor);


        const torneo = {
            nombre: "Arena Masters",
            juego: "Valorant",
            modalidad: "Por equipos",
            integrantesPorEquipo: 5,
            estado: "Abierto",
            cupoMaximo: 16,
            inscritos: 10,
            cierreInscripcion: "2026-11-10"
        };


        act(function () {

            raiz.render(
                <TarjetaTorneo
                    torneo={torneo}
                />
            );

        });


        expect(
            contenedor.textContent
        ).toContain("Arena Masters");

        expect(
            contenedor.textContent
        ).toContain("Valorant");

        expect(
            contenedor.textContent
        ).toContain("Abierto");


        act(function () {
            raiz.unmount();
        });

        contenedor.remove();

    });

});