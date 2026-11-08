import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registrar } from "../services/authService.js";

function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    async function manejarSubmit(event) {
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

            navigate("/perfil");
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="container">
            <section>
                <h2>Crear cuenta</h2>

                <p>
                    Regístrate como jugador en eSports Arena Manager.
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                <form onSubmit={manejarSubmit}>

                    <div className="mb-3">
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
                            onChange={(event) =>
                                setNombre(event.target.value)
                            }
                            required
                            disabled={cargando}
                        />
                    </div>

                    <div className="mb-3">
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
                            onChange={(event) =>
                                setNickname(event.target.value)
                            }
                            required
                            disabled={cargando}
                        />
                    </div>

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
                            minLength="6"
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
                            ? "Creando cuenta..."
                            : "Registrarse"}
                    </button>

                </form>

                <hr />

                <p className="mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login">
                        Inicia sesión
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Registro;