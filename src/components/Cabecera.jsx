import {
    NavLink,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    cerrarSesion,
    estaAutenticado,
    obtenerRol
} from "../services/authService.js";


function Cabecera() {

    const navigate = useNavigate();
    const location = useLocation();

    // location hace que la cabecera se actualice
    // cuando cambiamos de página.
    const autenticado = estaAutenticado();
    const rol = obtenerRol();

    function manejarCerrarSesion() {

    const confirmar = window.confirm(
        "¿Estás seguro de que deseas cerrar sesión?"
    );

    if (!confirmar) {
        return;
    }

    cerrarSesion();
    navigate("/login");
}


    return (
        <header>

            <nav className="navbar navbar-expand-md navbar-dark">

                <div className="container">

                    <NavLink
                        className="navbar-brand"
                        to="/"
                    >
                        eSports Arena Manager
                    </NavLink>


                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal"
                        aria-expanded="false"
                        aria-label="Abrir menú"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div
                        className="collapse navbar-collapse"
                        id="menuPrincipal"
                    >

                        <ul className="navbar-nav ms-auto">

                            {/* PUBLICO */}

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                >
                                    Inicio
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/torneos"
                                >
                                    Torneos
                                </NavLink>
                            </li>

                            {/* JUGADOR */}

                            {autenticado && rol === "JUGADOR" && (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/inscripcion"
                                        >
                                            Inscripción
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/equipo"
                                        >
                                            Equipo
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/perfil"
                                        >
                                            Perfil
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* ADMIN */}

                            {autenticado && rol === "ADMIN" && (
                                <li className="nav-item">

                                    <NavLink
                                        className="nav-link"
                                        to="/admin"
                                    >
                                        Administración
                                    </NavLink>

                                </li>
                            )}


                            {/* ORGANIZADOR */}

                            {autenticado && rol === "ORGANIZADOR" && (
                                <li className="nav-item">

                                    <NavLink
                                        className="nav-link"
                                        to="/organizador"
                                    >
                                        Organización
                                    </NavLink>

                                </li>
                            )}


                            {/* VISITANTE */}

                            {!autenticado && (
                                <>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/login"
                                        >
                                            Iniciar sesión
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link"
                                            to="/registro"
                                        >
                                            Registrarse
                                        </NavLink>
                                    </li>
                                </>
                            )}


                            {/* USUARIO AUTENTICADO */}

                            {autenticado && (
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="nav-link btn btn-link"
                                        onClick={manejarCerrarSesion}
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            )}

                        </ul>

                    </div>

                </div>

            </nav>

        </header>
    );
}


export default Cabecera;