import { useEffect, useState } from "react";

import { obtenerTorneos} from "../services/torneosService.js";

import TarjetaTorneo from "../components/TarjetaTorneo.jsx";

import TarjetaCierre from "../components/TarjetaCierre.jsx";


function Inicio() {

    const [torneos, setTorneos] = useState([]);

    const [cargando, setCargando] = useState(true);


    useEffect(function () {

        obtenerTorneos().then(function (datos) { setTorneos(datos); setCargando(false);});

    }, []);


    const torneosAbiertos =
        torneos.filter(function (torneo) {

            return torneo.estado === "Abierto";

        });


    return (

        <main className="container py-4">


            <section>

                <h2>
                    Bienvenido a eSports Arena Manager
                </h2>

                <p>
                    Organiza, participa y sigue torneos
                    competitivos de tus videojuegos favoritos.
                </p>

            </section>


            <section id="imagen-destacada">

                <h2>
                    Vive la experiencia eSports
                </h2>

                <img
                    src="https://cdn.oneesports.gg/wp-content/uploads/2022/08/LeagueofLegends_Worlds2019_ParisFrance-1024x576.jpg"
                    alt="Arena llena de público durante una competencia profesional de eSports"
                />

            </section>


            <section>

                <h2>
                    Torneos destacados
                </h2>


                {cargando ? (

                    <p>
                        Cargando torneos...
                    </p>

                ) : (

                    <div
                        id="lista-torneos"
                        className="row g-3"
                    >

                        {torneos.map(function (torneo) {

                            return (

                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={torneo.nombre}
                                >

                                    <TarjetaTorneo
                                        torneo={torneo}
                                    />

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            <section>

                <h2>
                    Próximos cierres de inscripción
                </h2>


                <div id="lista-cierres">

                    {torneosAbiertos.map(function (torneo) {

                        return (

                            <TarjetaCierre
                                key={torneo.nombre}
                                torneo={torneo}
                            />

                        );

                    })}

                </div>

            </section>


            <section id="video">

                <h2>
                    Competencia destacada
                </h2>

                <p>
                    Revive una competencia profesional de eSports.
                </p>

                <iframe
                    src="https://www.youtube.com/embed/LR3AaGdesgA"
                    title="Competencia profesional de eSports"
                    allowFullScreen
                ></iframe>

            </section>


        </main>

    );
}


export default Inicio;