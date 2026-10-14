import { act } from "react";
import { createRoot } from "react-dom/client";
import PerfilJugador from "./PerfilJugador.jsx";

describe("PerfilJugador", function () {
    let contenedor, raiz;

    const usuario = {
        nombre: "Juan Pérez",
        apodo: "Pepito123",
        correo: "juan@correo.cl"
    };

    const perfil = {
        equipos: ["Nova Titans"],
        historialTorneos: [
            { torneo: "Arena Masters", juego: "Valorant", resultado: "3er lugar" }
        ],
        estadisticas: { victorias: 12, derrotas: 5 },
        sanciones: []
    };

    beforeEach(function () {
        contenedor = document.createElement("div");
        document.body.appendChild(contenedor);
        raiz = createRoot(contenedor);
    });

    afterEach(function () {
        act(function () { raiz.unmount(); });
        contenedor.remove();
    });

    function renderizar() {
        act(function () {
            raiz.render(<PerfilJugador usuario={usuario} perfil={perfil} />);
        });
    }

    function escribirApodo(valor) {
        const input = contenedor.querySelector("#nuevo-apodo");
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;

        act(function () {
            setter.call(input, valor);
            input.dispatchEvent(new Event("input", { bubbles: true }));
        });
    }

    function enviarFormulario() {
        const formulario = contenedor.querySelector("form");
        act(function () {
            formulario.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        });
    }

    it("renderiza los datos principales del jugador", function () {
        renderizar();

        const texto = contenedor.textContent;
        expect(texto).toContain("Pepito123");
        expect(texto).toContain("Nova Titans");
        expect(texto).toContain("12");
        expect(texto).toContain("Sin sanciones vigentes");
    });

    it("rechaza un apodo demasiado corto", function () {
        renderizar();
        escribirApodo("ab");
        enviarFormulario();

        expect(contenedor.textContent).toContain("El apodo debe tener entre 3 y 15 caracteres.");
    });

    it("rechaza un apodo con espacios", function () {
        renderizar();
        escribirApodo("Nuevo Apodo");
        enviarFormulario();

        expect(contenedor.textContent).toContain("El apodo no puede contener espacios.");
    });

    it("actualiza correctamente un apodo valido", function () {
        renderizar();
        escribirApodo("NuevoNick");
        enviarFormulario();

        const texto = contenedor.textContent;
        expect(texto).toContain("NuevoNick");
        expect(texto).toContain("Apodo actualizado correctamente.");
    });
});