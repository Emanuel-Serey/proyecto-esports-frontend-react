import { act } from "react";
import { createRoot } from "react-dom/client";
import FormularioEquipo from "./FormularioEquipo.jsx";
import { equiposService } from "../services/equiposService.js";

function datosBase() {
    return {
        equipos: [],
        jugadores: ["Pepito123", "NightFox", "ZeroX"]
    };
}

async function renderizarFormulario() {
    const contenedor = document.createElement("div");
    document.body.appendChild(contenedor);

    const raiz = createRoot(contenedor);

    await act(async function () {
        raiz.render(<FormularioEquipo />);
        await Promise.resolve();
    });

    return { contenedor, raiz };
}

function cambiarValor(elemento, valor) {
    const prototipo =
        elemento.tagName === "INPUT"
            ? HTMLInputElement.prototype
            : HTMLSelectElement.prototype;

    const setter = Object.getOwnPropertyDescriptor(
        prototipo,
        "value"
    ).set;

    act(function () {
        setter.call(elemento, valor);

        elemento.dispatchEvent(
            new Event(
                elemento.tagName === "INPUT" ? "input" : "change",
                { bubbles: true }
            )
        );
    });
}

async function crearEquipoDesdeFormulario(contenedor) {
    cambiarValor(
        contenedor.querySelector("#nombre-equipo"),
        "Equipo Prueba"
    );

    cambiarValor(
        contenedor.querySelector("#juego-equipo"),
        "Valorant"
    );

    cambiarValor(
        contenedor.querySelector("#capitan-equipo"),
        "Pepito123"
    );

    const botonCrear =
        contenedor.querySelector('button[type="submit"]');

    await act(async function () {
        botonCrear.click();
        await Promise.resolve();
    });
}

function limpiar(raiz, contenedor) {
    act(function () {
        raiz.unmount();
    });

    contenedor.remove();
}

describe("FormularioEquipo", function () {

    it("carga los jugadores utilizando un mock del servicio de equipos", async function () {
        const mockDatos = {
            equipos: [],
            jugadores: ["JugadorMock1", "JugadorMock2"]
        };

        const espiaServicio = spyOn(
            equiposService,
            "obtenerDatosEquipo"
        ).and.returnValue(Promise.resolve(mockDatos));

        const { contenedor, raiz } =
            await renderizarFormulario();

        expect(espiaServicio).toHaveBeenCalled();

        const selectorCapitan =
            contenedor.querySelector("#capitan-equipo");

        expect(selectorCapitan.textContent)
            .toContain("JugadorMock1");

        expect(selectorCapitan.textContent)
            .toContain("JugadorMock2");

        limpiar(raiz, contenedor);
    });


    it("crea correctamente un equipo", async function () {
        spyOn(
            equiposService,
            "obtenerDatosEquipo"
        ).and.returnValue(Promise.resolve(datosBase()));

        const espiaCrear = spyOn(
            equiposService,
            "crearEquipo"
        ).and.callFake(function (equipo) {
            return Promise.resolve({
                ...equipo,
                integrantes: 1,
                sancionVigente: false
            });
        });

        const { contenedor, raiz } =
            await renderizarFormulario();

        await crearEquipoDesdeFormulario(contenedor);

        expect(espiaCrear).toHaveBeenCalled();

        expect(contenedor.textContent)
            .toContain("Equipo creado correctamente.");

        expect(contenedor.textContent)
            .toContain("Integrantes de Equipo Prueba");

        expect(contenedor.textContent)
            .toContain("Pepito123");

        limpiar(raiz, contenedor);
    });


    it("agrega correctamente un integrante al equipo", async function () {
        spyOn(
            equiposService,
            "obtenerDatosEquipo"
        ).and.returnValue(Promise.resolve(datosBase()));

        spyOn(
            equiposService,
            "crearEquipo"
        ).and.callFake(function (equipo) {
            return Promise.resolve({
                ...equipo,
                integrantes: 1,
                sancionVigente: false
            });
        });

        const espiaActualizar = spyOn(
            equiposService,
            "actualizarEquipo"
        ).and.returnValue(
            Promise.resolve({
                nombre: "Equipo Prueba",
                juego: "Valorant",
                capitan: "Pepito123",
                estado: "Activo",
                integrantes: 2,
                miembros: [
                    { jugador: "Pepito123", rol: "Capitán" },
                    { jugador: "NightFox", rol: "Titular" }
                ]
            })
        );

        const { contenedor, raiz } =
            await renderizarFormulario();

        await crearEquipoDesdeFormulario(contenedor);

        cambiarValor(
            contenedor.querySelector("#nuevo-integrante"),
            "NightFox"
        );

        cambiarValor(
            contenedor.querySelector("#rol-integrante"),
            "Titular"
        );

        const botonAgregar = Array.from(
            contenedor.querySelectorAll("button")
        ).find(function (boton) {
            return boton.textContent.trim() === "Agregar";
        });

        await act(async function () {
            botonAgregar.click();
            await Promise.resolve();
        });

        expect(espiaActualizar).toHaveBeenCalled();

        expect(contenedor.textContent)
            .toContain("NightFox");

        expect(contenedor.textContent)
            .toContain("Integrante agregado correctamente.");

        limpiar(raiz, contenedor);
    });


    it("elimina correctamente un integrante del equipo", async function () {
        spyOn(
            equiposService,
            "obtenerDatosEquipo"
        ).and.returnValue(Promise.resolve(datosBase()));

        spyOn(
            equiposService,
            "crearEquipo"
        ).and.callFake(function (equipo) {
            return Promise.resolve({
                ...equipo,
                integrantes: 2,
                sancionVigente: false,
                miembros: [
                    { jugador: "Pepito123", rol: "Capitán" },
                    { jugador: "NightFox", rol: "Titular" }
                ]
            });
        });

        const espiaActualizar = spyOn(
            equiposService,
            "actualizarEquipo"
        ).and.returnValue(
            Promise.resolve({
                nombre: "Equipo Prueba",
                juego: "Valorant",
                capitan: "Pepito123",
                estado: "Activo",
                integrantes: 1,
                miembros: [
                    { jugador: "Pepito123", rol: "Capitán" }
                ]
            })
        );

        const { contenedor, raiz } =
            await renderizarFormulario();

        await crearEquipoDesdeFormulario(contenedor);

        const botonQuitar = Array.from(
            contenedor.querySelectorAll("button")
        ).find(function (boton) {
            return boton.textContent.trim() === "Quitar";
        });

        expect(botonQuitar).toBeDefined();

        await act(async function () {
            botonQuitar.click();
            await Promise.resolve();
        });

        expect(espiaActualizar).toHaveBeenCalled();

        const argumentos =
            espiaActualizar.calls.mostRecent().args;

        expect(argumentos[0])
            .toBe("Equipo Prueba");

        expect(argumentos[1].integrantes)
            .toBe(1);

        expect(argumentos[1].miembros.length)
            .toBe(1);

        expect(argumentos[1].miembros[0].jugador)
            .toBe("Pepito123");

        const botonesQuitarDespues = Array.from(
            contenedor.querySelectorAll("button")
        ).filter(function (boton) {
            return boton.textContent.trim() === "Quitar";
        });

        expect(botonesQuitarDespues.length)
            .toBe(0);

        expect(contenedor.textContent)
            .toContain("Integrante eliminado correctamente.");

        limpiar(raiz, contenedor);
    });
});