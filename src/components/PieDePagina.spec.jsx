import { act } from "react";
import { createRoot } from "react-dom/client";
import PieDePagina from "./PieDePagina.jsx";

describe("PieDePagina", function () {
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

    it("renderiza la informacion del pie de pagina", function () {
        act(function () {
            raiz.render(<PieDePagina />);
        });

        const texto = contenedor.textContent;
        expect(texto).toContain("eSports Arena Manager");
        expect(texto).toContain("Todos los derechos reservados");
    });
});