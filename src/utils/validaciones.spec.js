import {
    cuposDisponibles,
    inscripcionFueraDePlazo,
    tieneSancionActiva,
    equipoCompleto
} from "./validaciones.js";


describe("Validaciones de inscripción", function () {

    it("cuposDisponibles resta los inscritos y nunca devuelve un valor negativo", function () {

        expect(
            cuposDisponibles(10, 4)
        ).toBe(6);

        expect(
            cuposDisponibles(4, 6)
        ).toBe(0);

    });


    it("inscripcionFueraDePlazo retorna verdadero cuando se supera la fecha de cierre", function () {

        const fechaActual =
            new Date("2026-11-11T12:00:00");

        expect(
            inscripcionFueraDePlazo(
                "2026-11-10",
                fechaActual
            )
        ).toBeTrue();

    });


    it("tieneSancionActiva bloquea una sanción vigente y permite una cumplida", function () {

        const jugadorSancionado = {
            sancionVigente: true
        };

        const jugadorSinSancion = {
            sancionVigente: false
        };


        expect(
            tieneSancionActiva(jugadorSancionado)
        ).toBeTrue();

        expect(
            tieneSancionActiva(jugadorSinSancion)
        ).toBeFalse();

    });


    it("equipoCompleto valida la cantidad mínima de integrantes", function () {

        const equipoCompletoDatos = {
            integrantes: 5
        };

        const equipoIncompletoDatos = {
            integrantes: 4
        };


        expect(
            equipoCompleto(
                equipoCompletoDatos,
                5
            )
        ).toBeTrue();

        expect(
            equipoCompleto(
                equipoIncompletoDatos,
                5
            )
        ).toBeFalse();

    });

});