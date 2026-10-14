import { act } from "react";
import { createRoot } from "react-dom/client";
import ListaPartidas from "./ListaPartidas.jsx";

describe("ListaPartidas", function () {
    let contenedor, raiz;

    beforeEach(function () {
        contenedor = document.createElement("div");
        document.body.appendChild(contenedor);
        raiz = createRoot(contenedor);
    });

    afterEach(function () {
        act(function () { raiz.unmount(); });
        contenedor.remove();
    });

    it("renderiza los participantes de una partida", function () {
        const partidas = [{
            id: 1, ronda: "Semifinal",
            participanteA: "T1", participanteB: "Gen.G",
            participante1: "T1", participante2: "Gen.G",
            equipoA: "T1", equipoB: "Gen.G",
            equipo1: "T1", equipo2: "Gen.G",
            fecha: "2026-10-15", hora: "18:00",
            horario: "18:00", fechaHora: "2026-10-15 18:00",
            estado: "Programada"
        }];

        act(function () {
            raiz.render(<ListaPartidas partidas={partidas} ronda="Semifinal" />);
        });

        const texto = contenedor.textContent;
        expect(texto).toContain("T1");
        expect(texto).toContain("Gen.G");
    });
});