import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    registrar
} from "../services/authService.js";

import "./auth.css";


function Registro() {

    const navigate =
        useNavigate();


    const [
        nombre,
        setNombre
    ] = useState("");


    const [
        nickname,
        setNickname
    ] = useState("");


    const [
        email,
        setEmail
    ] = useState("");


    const [
        password,
        setPassword
    ] = useState("");


    const [
        cargando,
        setCargando
    ] = useState(false);


    const [
        error,
        setError
    ] = useState("");


    async function manejarSubmit(
        event
    ) {

        event.preventDefault();

        setError("");
        setCargando(true);


        try {

            await registrar(
                nombre,
                nickname,
                email,
                password
            );


            navigate(
                "/perfil"
            );


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setCargando(false);

        }
    }


    return (

        <main className="auth-page">


            <section className="auth-layout auth-registro-layout">


                <div className="auth-imagen">

                    <img
                        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=85"
                        alt="Jugador eSports"
                    />


                    <div className="auth-imagen-overlay" />


                    <div className="auth-imagen-contenido">

                        <span className="seccion-etiqueta">
                            NUEVO COMPETIDOR
                        </span>


                        <h1>
                            Tu camino
                            <span>
                                {" "}empieza aquí
                            </span>
                        </h1>


                        <p>
                            Crea tu perfil,
                            forma tu equipo
                            y comienza a competir
                            en eSports Arena.
                        </p>


                        <div className="auth-beneficios">

                            <span>
                                ◈ Crea tu identidad competitiva
                            </span>

                            <span>
                                ◈ Participa en torneos
                            </span>

                            <span>
                                ◈ Sube en el ranking
                            </span>

                        </div>

                    </div>

                </div>


                <div className="auth-formulario-contenedor">


                    <div className="auth-formulario-cabecera">

                        <span className="seccion-etiqueta">
                            REGISTRO
                        </span>


                        <h2>
                            Crear cuenta
                        </h2>


                        <p>
                            Regístrate como jugador
                            y entra a la competencia.
                        </p>

                    </div>


                    {error && (

                        <div
                            className="alert alert-danger"
                            role="alert"
                        >
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={
                            manejarSubmit
                        }
                        className="auth-formulario"
                    >


                        <div>

                            <label
                                htmlFor="nombre"
                                className="form-label"
                            >
                                Nombre
                            </label>


                            <input
                                id="nombre"
                                type="text"
                                className="form-control"
                                value={nombre}
                                placeholder="Tu nombre"
                                autoComplete="name"
                                required
                                disabled={
                                    cargando
                                }
                                onChange={
                                    function (event) {

                                        setNombre(
                                            event.target.value
                                        );

                                        setError("");

                                    }
                                }
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="nickname"
                                className="form-label"
                            >
                                Nickname
                            </label>


                            <input
                                id="nickname"
                                type="text"
                                className="form-control"
                                value={nickname}
                                placeholder="Ej: ShadowPlayer"
                                autoComplete="off"
                                required
                                disabled={
                                    cargando
                                }
                                onChange={
                                    function (event) {

                                        setNickname(
                                            event.target.value
                                        );

                                        setError("");

                                    }
                                }
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Correo electrónico
                            </label>


                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                value={email}
                                placeholder="correo@ejemplo.com"
                                autoComplete="email"
                                required
                                disabled={
                                    cargando
                                }
                                onChange={
                                    function (event) {

                                        setEmail(
                                            event.target.value
                                        );

                                        setError("");

                                    }
                                }
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Contraseña
                            </label>


                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                value={password}
                                placeholder="Mínimo 6 caracteres"
                                minLength="6"
                                autoComplete="new-password"
                                required
                                disabled={
                                    cargando
                                }
                                onChange={
                                    function (event) {

                                        setPassword(
                                            event.target.value
                                        );

                                        setError("");

                                    }
                                }
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary auth-boton"
                            disabled={
                                cargando
                            }
                        >

                            <span>

                                {
                                    cargando
                                        ? "Creando cuenta..."
                                        : "Crear mi cuenta"
                                }

                            </span>


                            {!cargando && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </form>


                    <div className="auth-separador">

                        <span />

                        <small>
                            Ya soy jugador
                        </small>

                        <span />

                    </div>


                    <p className="auth-enlace-final">

                        ¿Ya tienes una cuenta?

                        {" "}

                        <Link to="/login">
                            Iniciar sesión
                        </Link>

                    </p>

                </div>

            </section>

        </main>

    );
}


export default Registro;