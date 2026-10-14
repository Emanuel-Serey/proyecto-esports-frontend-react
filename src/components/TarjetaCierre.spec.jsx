import { act } from "react";
import { createRoot } from "react-dom/client";
import TarjetaCierre from "./TarjetaCierre.jsx";

describe("TarjetaCierre", function () {
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

    it("renderiza el torneo y su fecha de cierre", function () {
        const torneo = {
            nombre: "Arena Masters",
            cierreInscripcion: "2026-11-10",
            fechaCierre: "2026-11-10"
        };

        act(function () {
            raiz.render(<TarjetaCierre torneo={torneo} {...torneo} />);
        });

        const texto = contenedor.textContent;
        expect(texto).toContain("Arena Masters");
        expect(texto).toContain("2026-11-10");
    });
});