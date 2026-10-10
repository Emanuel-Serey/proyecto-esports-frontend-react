import { act } from "react";
import { createRoot } from "react-dom/client";

import TablaRanking from "./TablaRanking.jsx";


describe("TablaRanking", function () {

    it("renderiza una fila por participante y respeta el orden recibido", function () {

        const contenedor =
            document.createElement("div");

        document.body.appendChild(contenedor);

        const raiz =
            createRoot(contenedor);


        const clasificacion = [
            {
                posicion: 1,
                equipo: "Gen.G",
                jugados: 2,
                ganados: 2,
                perdidos: 0,
                diferenciaMapas: 2,
                puntos: 6
            },
            {
                posicion: 2,
                equipo: "T1",
                jugados: 2,
                ganados: 1,
                perdidos: 1,
                diferenciaMapas: 1,
                puntos: 3
            },
            {
                posicion: 3,
                equipo: "Bilibili Gaming",
                jugados: 2,
                ganados: 1,
                perdidos: 1,
                diferenciaMapas: 1,
                puntos: 3
            }
        ];


        act(function () {

            raiz.render(
                <TablaRanking
                    clasificacion={clasificacion}
                />
            );

        });


        const filas =
            contenedor.querySelectorAll("tbody tr");


        expect(filas.length).toBe(3);

        expect(
            filas[0].textContent
        ).toContain("Gen.G");

        expect(
            filas[1].textContent
        ).toContain("T1");

        expect(
            filas[2].textContent
        ).toContain("Bilibili Gaming");


        act(function () {
            raiz.unmount();
        });

        contenedor.remove();

    });

});