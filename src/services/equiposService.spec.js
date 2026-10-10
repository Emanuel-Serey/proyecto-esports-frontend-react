import { equiposService } from "./equiposService.js";

describe("equiposService - CRUD", function () {

    it("READ: obtiene los equipos y jugadores disponibles", async function () {
        const datos = await equiposService.obtenerDatosEquipo();

        expect(datos.equipos).toBeDefined();
        expect(datos.jugadores).toBeDefined();
        expect(Array.isArray(datos.equipos)).toBeTrue();
        expect(Array.isArray(datos.jugadores)).toBeTrue();
    });


    it("CREATE: crea un nuevo equipo", async function () {
        const nuevoEquipo = {
            nombre: "Equipo Test Create",
            juego: "Valorant",
            capitan: "Pepito123",
            miembros: [
                {
                    jugador: "Pepito123",
                    rol: "Capitán"
                }
            ],
            estado: "Activo"
        };

        const equipoCreado =
            await equiposService.crearEquipo(nuevoEquipo);

        expect(equipoCreado.nombre)
            .toBe("Equipo Test Create");

        expect(equipoCreado.juego)
            .toBe("Valorant");

        expect(equipoCreado.integrantes)
            .toBe(1);

        await equiposService.eliminarEquipo(
            "Equipo Test Create"
        );
    });


    it("UPDATE: actualiza los datos de un equipo", async function () {
        const nuevoEquipo = {
            nombre: "Equipo Test Update",
            juego: "Valorant",
            capitan: "Pepito123",
            miembros: [
                {
                    jugador: "Pepito123",
                    rol: "Capitán"
                }
            ],
            estado: "Activo"
        };

        await equiposService.crearEquipo(nuevoEquipo);

        const miembrosActualizados = [
            {
                jugador: "Pepito123",
                rol: "Capitán"
            },
            {
                jugador: "NightFox",
                rol: "Titular"
            }
        ];

        const equipoActualizado =
            await equiposService.actualizarEquipo(
                "Equipo Test Update",
                {
                    miembros: miembrosActualizados,
                    integrantes: 2
                }
            );

        expect(equipoActualizado.integrantes)
            .toBe(2);

        expect(equipoActualizado.miembros.length)
            .toBe(2);

        expect(equipoActualizado.miembros[1].jugador)
            .toBe("NightFox");

        await equiposService.eliminarEquipo(
            "Equipo Test Update"
        );
    });


    it("DELETE: elimina un equipo existente", async function () {
        const nuevoEquipo = {
            nombre: "Equipo Test Delete",
            juego: "League of Legends",
            capitan: "ZeroX",
            miembros: [
                {
                    jugador: "ZeroX",
                    rol: "Capitán"
                }
            ],
            estado: "Activo"
        };

        await equiposService.crearEquipo(nuevoEquipo);

        const equipoEliminado =
            await equiposService.eliminarEquipo(
                "Equipo Test Delete"
            );

        expect(equipoEliminado.nombre)
            .toBe("Equipo Test Delete");

        const datos =
            await equiposService.obtenerDatosEquipo();

        const existe =
            datos.equipos.some(function (equipo) {
                return (
                    equipo.nombre ===
                    "Equipo Test Delete"
                );
            });

        expect(existe).toBeFalse();
    });

});