import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import Cabecera from "./Cabecera.jsx";

describe("Cabecera", function () {
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

    it("renderiza el titulo y las opciones principales de navegacion", function () {
        act(function () {
            raiz.render(<MemoryRouter><Cabecera /></MemoryRouter>);
        });

        const texto = contenedor.textContent;
        expect(texto).toContain("eSports Arena Manager");
        expect(texto).toContain("Inicio");
        expect(texto).toContain("Torneos");
        expect(texto).toContain("Detalle de torneo");
        expect(texto).toContain("Inscripción");
        expect(texto).toContain("Equipo");
        expect(texto).toContain("Perfil");
    });
});