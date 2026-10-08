import { NavLink } from "react-router-dom";

function Cabecera() {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="container">

                    <NavLink className="navbar-brand" to="/">
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

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Inicio
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/torneos">
                                    Torneos
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/detalle">
                                    Detalle de torneo
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/inscripcion">
                                    Inscripción
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/equipo">
                                    Equipo
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/perfil">
                                    Perfil
                                </NavLink>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
        </header>
    );
}

export default Cabecera;