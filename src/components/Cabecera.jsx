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

    // Se utiliza para forzar la actualización de la
    // cabecera cuando cambia la ruta.
    useLocation();

    const autenticado =
        estaAutenticado();

    const rol =
        obtenerRol();


    function manejarCerrarSesion() {

        const confirmar =
            window.confirm(
                "¿Estás seguro de que deseas cerrar sesión?"
            );


        if (!confirmar) {
            return;
        }


        cerrarSesion();

        navigate(
            "/login"
        );
    }


    function claseLink({
        isActive
    }) {

        return (
            isActive
                ? "nav-link active"
                : "nav-link"
        );
    }


    return (

        <header className="encabezado-principal">

            <nav className="navbar navbar-expand-lg navbar-dark">

                <div className="container">


                    <NavLink
                        className="navbar-brand"
                        to="/"
                    >

                        <span className="marca-icono">
                            EA
                        </span>

                        <span className="marca-texto">

                            <strong>
                                eSports Arena
                            </strong>

                            <small>
                                Manager
                            </small>

                        </span>

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

                        <span className="navbar-toggler-icon" />

                    </button>


                    <div
                        className="collapse navbar-collapse"
                        id="menuPrincipal"
                    >

                        <ul className="navbar-nav ms-auto align-items-lg-center">


                            <li className="nav-item">

                                <NavLink
                                    className={claseLink}
                                    to="/"
                                    end
                                >
                                    Inicio
                                </NavLink>

                            </li>


                            <li className="nav-item">

                                <NavLink
                                    className={claseLink}
                                    to="/torneos"
                                >
                                    Torneos
                                </NavLink>

                            </li>


                            {autenticado &&
                                rol === "JUGADOR" && (

                                <>

                                    <li className="nav-item">

                                        <NavLink
                                            className={claseLink}
                                            to="/inscripcion"
                                        >
                                            Inscripción
                                        </NavLink>

                                    </li>


                                    <li className="nav-item">

                                        <NavLink
                                            className={claseLink}
                                            to="/equipo"
                                        >
                                            Equipo
                                        </NavLink>

                                    </li>


                                    <li className="nav-item">

                                        <NavLink
                                            className={claseLink}
                                            to="/perfil"
                                        >
                                            Perfil
                                        </NavLink>

                                    </li>

                                </>

                            )}


                            {autenticado &&
                                rol === "ADMIN" && (

                                <li className="nav-item">

                                    <NavLink
                                        className={claseLink}
                                        to="/admin"
                                    >
                                        Administración
                                    </NavLink>

                                </li>

                            )}


                            {autenticado &&
                                rol === "ORGANIZADOR" && (

                                <li className="nav-item">

                                    <NavLink
                                        className={claseLink}
                                        to="/organizador"
                                    >
                                        Organización
                                    </NavLink>

                                </li>

                            )}


                            {!autenticado && (

                                <>

                                    <li className="nav-item">

                                        <NavLink
                                            className={claseLink}
                                            to="/login"
                                        >
                                            Iniciar sesión
                                        </NavLink>

                                    </li>


                                    <li className="nav-item ms-lg-2">

                                        <NavLink
                                            className="btn btn-primary navbar-registro"
                                            to="/registro"
                                        >
                                            Registrarse
                                        </NavLink>

                                    </li>

                                </>

                            )}


                            {autenticado && (

                                <li className="nav-item ms-lg-2">

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary navbar-salir"
                                        onClick={
                                            manejarCerrarSesion
                                        }
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