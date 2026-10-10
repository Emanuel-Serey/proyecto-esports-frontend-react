import { act } from "react";
import { createRoot } from "react-dom/client";

import FormularioInscripcion from "./FormularioInscripcion.jsx";


describe("FormularioInscripcion", function () {

    it(
        "mantiene deshabilitado el envio cuando el equipo esta incompleto",
        async function () {

            const contenedor =
                document.createElement("div");

            document.body.appendChild(contenedor);

            const raiz =
                createRoot(contenedor);


            await act(async function () {

                raiz.render(
                    <FormularioInscripcion />
                );

                await Promise.resolve();

            });


            const formulario =
                contenedor.querySelector("form");

            const manejadorSubmit =
                jasmine.createSpy("manejadorSubmit");

            formulario.addEventListener(
                "submit",
                manejadorSubmit
            );


            const selectorTorneo =
                contenedor.querySelector("#torneo");


            act(function () {

                selectorTorneo.value =
                    "Arena Masters";

                selectorTorneo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const radioEquipo =
                contenedor.querySelector("#equipo");


            act(function () {

                radioEquipo.click();

            });


            const selectorEquipo =
                contenedor.querySelector(
                    "#equipo-seleccionado"
                );


            act(function () {

                selectorEquipo.value =
                    "Rookie Squad";

                selectorEquipo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const boton =
                contenedor.querySelector(
                    'button[type="submit"]'
                );


            expect(
                boton.disabled
            ).toBeTrue();


            act(function () {

                boton.click();

            });


            expect(
                manejadorSubmit
            ).not.toHaveBeenCalled();


            act(function () {

                raiz.unmount();

            });

            contenedor.remove();

        }
    );


    it(
        "realiza correctamente la inscripcion de un equipo completo",
        async function () {

            const contenedor =
                document.createElement("div");

            document.body.appendChild(contenedor);

            const raiz =
                createRoot(contenedor);


            await act(async function () {

                raiz.render(
                    <FormularioInscripcion />
                );

                await Promise.resolve();

            });


            const selectorTorneo =
                contenedor.querySelector("#torneo");


            act(function () {

                selectorTorneo.value =
                    "Arena Masters";

                selectorTorneo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const radioEquipo =
                contenedor.querySelector("#equipo");


            act(function () {

                radioEquipo.click();

            });


            const selectorEquipo =
                contenedor.querySelector(
                    "#equipo-seleccionado"
                );


            act(function () {

                selectorEquipo.value =
                    "Shadow Wolves";

                selectorEquipo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const boton =
                contenedor.querySelector(
                    'button[type="submit"]'
                );


            expect(
                boton.disabled
            ).toBeFalse();


            act(function () {

                boton.click();

            });


            expect(
                contenedor.textContent
            ).toContain(
                "Inscripción realizada correctamente"
            );

            expect(
                contenedor.textContent
            ).toContain(
                "Shadow Wolves"
            );


            act(function () {

                raiz.unmount();

            });

            contenedor.remove();

        }
    );


    it(
        "impide la inscripcion de un equipo inactivo",
        async function () {

            const contenedor =
                document.createElement("div");

            document.body.appendChild(contenedor);

            const raiz =
                createRoot(contenedor);


            await act(async function () {

                raiz.render(
                    <FormularioInscripcion />
                );

                await Promise.resolve();

            });


            const selectorTorneo =
                contenedor.querySelector("#torneo");


            act(function () {

                selectorTorneo.value =
                    "Arena Masters";

                selectorTorneo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const radioEquipo =
                contenedor.querySelector("#equipo");


            act(function () {

                radioEquipo.click();

            });


            const selectorEquipo =
                contenedor.querySelector(
                    "#equipo-seleccionado"
                );


            act(function () {

                selectorEquipo.value =
                    "Phoenix Squad";

                selectorEquipo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const boton =
                contenedor.querySelector(
                    'button[type="submit"]'
                );


            act(function () {

                boton.click();

            });


            expect(
                contenedor.textContent
            ).toContain(
                "El equipo no puede inscribirse porque se encuentra inactivo."
            );


            act(function () {

                raiz.unmount();

            });

            contenedor.remove();

        }
    );


    it(
        "impide la inscripcion cuando el torneo no tiene cupos",
        async function () {

            const contenedor =
                document.createElement("div");

            document.body.appendChild(contenedor);

            const raiz =
                createRoot(contenedor);


            await act(async function () {

                raiz.render(
                    <FormularioInscripcion />
                );

                await Promise.resolve();

            });


            const selectorTorneo =
                contenedor.querySelector("#torneo");


            act(function () {

                selectorTorneo.value =
                    "Legends Cup";

                selectorTorneo.dispatchEvent(
                    new Event(
                        "change",
                        {
                            bubbles: true
                        }
                    )
                );

            });


            const radioEquipo =
                contenedor.querySelector("#equipo");


            act(function () {

                radioEquipo.click();

            });


            const boton =
                contenedor.querySelector(
                    'button[type="submit"]'
                );


            act(function () {

                boton.click();

            });


            expect(
                contenedor.textContent
            ).toContain(
                "No es posible inscribirse: el torneo no tiene cupos disponibles."
            );


            act(function () {

                raiz.unmount();

            });

            contenedor.remove();

        }
    );

});