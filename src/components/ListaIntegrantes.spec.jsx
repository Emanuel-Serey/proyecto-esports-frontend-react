import { act } from "react";
import { createRoot } from "react-dom/client";
import ListaIntegrantes from "./ListaIntegrantes.jsx";

describe("ListaIntegrantes", function () {

    it("renderiza integrantes y permite quitar un jugador que no es capitan", function () {
        const integrantes = [
            {
                jugador: "Pepito123",
                rol: "Capitán"
            },
            {
                jugador: "NightFox",
                rol: "Titular"
            }
        ];

        const onQuitar =
            jasmine.createSpy("onQuitar");

        const contenedor =
            document.createElement("div");

        document.body.appendChild(contenedor);

        const raiz = createRoot(contenedor);

        act(function () {
            raiz.render(
                <ListaIntegrantes
                    integrantes={integrantes}
                    onQuitar={onQuitar}
                />
            );
        });

        expect(contenedor.textContent)
            .toContain("Pepito123");

        expect(contenedor.textContent)
            .toContain("Capitán");

        expect(contenedor.textContent)
            .toContain("NightFox");

        expect(contenedor.textContent)
            .toContain("Titular");

        const botonesQuitar = Array.from(
            contenedor.querySelectorAll("button")
        ).filter(function (boton) {
            return boton.textContent.trim() === "Quitar";
        });

        expect(botonesQuitar.length).toBe(1);

        act(function () {
            botonesQuitar[0].click();
        });

        expect(onQuitar)
            .toHaveBeenCalledWith(1);

        act(function () {
            raiz.unmount();
        });

        contenedor.remove();
    });

});