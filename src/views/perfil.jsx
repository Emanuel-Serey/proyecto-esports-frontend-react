import {
    useEffect,
    useState
} from "react";

import {
    obtenerPerfilJugador
} from "../services/perfilService.js";

import PerfilJugador
    from "../components/PerfilJugador.jsx";

import "./perfil.css";


function Perfil() {

    const [
        usuario,
        setUsuario
    ] = useState(null);


    const [
        perfil,
        setPerfil
    ] = useState(null);


    const [
        cargando,
        setCargando
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    useEffect(function () {

        obtenerPerfilJugador()
            .then(function (datos) {

                setUsuario(
                    datos.usuario
                );

                setPerfil(
                    datos.perfil
                );

            })
            .catch(function (error) {

                setError(
                    error.message
                );

            })
            .finally(function () {

                setCargando(
                    false
                );

            });

    }, []);


    if (cargando) {

        return (

            <main className="perfil-page">

                <div className="perfil-cargando">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p>
                        Cargando perfil...
                    </p>

                </div>

            </main>

        );

    }


    if (error) {

        return (

            <main className="perfil-page">

                <div className="perfil-error">

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                </div>

            </main>

        );

    }


    return (

        <main className="perfil-page">

            <PerfilJugador
                usuario={usuario}
                perfil={perfil}
            />

        </main>

    );
}


export default Perfil;