import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    login
} from "../services/authService.js";

import "./auth.css";


function Login() {

    const navigate =
        useNavigate();


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

            const respuesta =
                await login(
                    email,
                    password
                );


            if (
                respuesta.rol ===
                "JUGADOR"
            ) {

                navigate(
                    "/perfil"
                );


            } else if (
                respuesta.rol ===
                "ADMIN"
            ) {

                navigate(
                    "/admin"
                );


            } else if (
                respuesta.rol ===
                "ORGANIZADOR"
            ) {

                navigate(
                    "/organizador"
                );


            } else {

                navigate("/");

            }


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


            <section className="auth-layout">


                <div className="auth-imagen">

                    <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=85"
                        alt="Competencia eSports"
                    />


                    <div className="auth-imagen-overlay" />


                    <div className="auth-imagen-contenido">

                        <span className="seccion-etiqueta">
                            ESPORTS ARENA
                        </span>


                        <h1>
                            Vuelve a
                            <span>
                                {" "}la arena
                            </span>
                        </h1>


                        <p>
                            Accede a tu cuenta,
                            revisa tus torneos,
                            administra tu equipo
                            y continúa compitiendo.
                        </p>


                        <div className="auth-beneficios">

                            <span>
                                ◈ Torneos competitivos
                            </span>

                            <span>
                                ◈ Equipos y rankings
                            </span>

                            <span>
                                ◈ Historial de partidas
                            </span>

                        </div>

                    </div>

                </div>


                <div className="auth-formulario-contenedor">


                    <div className="auth-formulario-cabecera">

                        <span className="seccion-etiqueta">
                            BIENVENIDO
                        </span>


                        <h2>
                            Iniciar sesión
                        </h2>


                        <p>
                            Ingresa tus credenciales
                            para continuar.
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
                                placeholder="jugador@gmail.com"
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
                                placeholder="••••••••"
                                autoComplete="current-password"
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
                                        ? "Iniciando sesión..."
                                        : "Entrar a la arena"
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
                            ¿Nuevo jugador?
                        </small>

                        <span />

                    </div>


                    <p className="auth-enlace-final">

                        ¿No tienes una cuenta?

                        {" "}

                        <Link to="/registro">
                            Crear cuenta
                        </Link>

                    </p>

                </div>

            </section>

        </main>

    );
}


export default Login;