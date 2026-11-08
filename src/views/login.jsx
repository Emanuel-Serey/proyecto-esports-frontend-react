import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService.js";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function manejarSubmit(event) {
        event.preventDefault();

        setError("");
        setCargando(true);

        try {
            const respuesta = await login(email, password);

            if (respuesta.rol === "JUGADOR") {

                navigate("/perfil");

            } else if (respuesta.rol === "ADMIN") {

                navigate("/admin");

            } else if (respuesta.rol === "ORGANIZADOR") {

                navigate("/organizador");

            } else {

                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="container">
            <section>
                <h2>Iniciar sesión</h2>

                <p>
                    Ingresa con tu cuenta de eSports Arena Manager.
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={manejarSubmit}>
                    <div className="mb-3">
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
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                            disabled={cargando}
                        />
                    </div>

                    <div className="mb-3">
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
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                            disabled={cargando}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </button>
                </form>

                <hr />

                <p className="mb-0">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/registro">
                        Regístrate
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;