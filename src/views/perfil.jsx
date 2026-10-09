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


    useEffect(function () {

        obtenerPerfilJugador()
            .then(function (datos) {

                setUsuario(datos.usuario);

                setPerfil(datos.perfil);

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