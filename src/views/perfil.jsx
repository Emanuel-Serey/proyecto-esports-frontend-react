import { useEffect, useState } from "react";

import {
    obtenerPerfilJugador
} from "../services/perfilService.js";

import PerfilJugador
    from "../components/PerfilJugador.jsx";


function Perfil() {

    const [usuario, setUsuario] =
        useState(null);

    const [perfil, setPerfil] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(function () {

        obtenerPerfilJugador()
            .then(function (datos) {

                setUsuario(datos.usuario);

                setPerfil(datos.perfil);

            })
            .catch(function (error) {

                setError(error.message);

            })
            .finally(function () {

                setCargando(false);

            });

    }, []);


    if (cargando) {

        return (

            <main className="container py-4">

                <section>

                    <p>
                        Cargando perfil del jugador...
                    </p>

                </section>

            </main>

        );

    }


    if (error) {

        return (

            <main className="container py-4">

                <section>

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                </section>

            </main>

        );

    }


    return (

        <main className="container py-4">

            <PerfilJugador
                usuario={usuario}
                perfil={perfil}
            />

        </main>

    );
}


export default Perfil;