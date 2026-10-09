import {
    ordenarRanking,
    calcularPuntos
} from "./torneoUtils.js";


describe("Utilidades de torneo", function () {

    it("ordenarRanking ordena por puntos y desempata por diferencia de mapas", function () {

        const clasificacion = [
            {
                equipo: "Equipo A",
                puntos: 3,
                diferenciaMapas: 1
            },
            {
                equipo: "Equipo B",
                puntos: 6,
                diferenciaMapas: 2
            },
            {
                equipo: "Equipo C",
                puntos: 3,
                diferenciaMapas: 4
            }
        ];


        const resultado =
            ordenarRanking(clasificacion);


        expect(resultado[0].equipo)
            .toBe("Equipo B");

        expect(resultado[1].equipo)
            .toBe("Equipo C");

        expect(resultado[2].equipo)
            .toBe("Equipo A");

    });


    it("calcularPuntos asigna puntos por victoria y derrota", function () {

        const partidas = [
            {
                equipo1: "T1",
                equipo2: "G2",
                estado: "Finalizada",
                resultado: "2 - 0"
            },
            {
                equipo1: "Gen.G",
                equipo2: "T1",
                estado: "Finalizada",
                resultado: "2 - 1"
            }
        ];


        const resultado =
            calcularPuntos(partidas);


        expect(resultado["T1"]).toBe(3);
        expect(resultado["G2"]).toBe(0);
        expect(resultado["Gen.G"]).toBe(3);

    });

});