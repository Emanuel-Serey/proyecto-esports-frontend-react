import { Route, Routes } from "react-router-dom";
import PanelAdmin from "./views/panel-admin.jsx";
import PanelOrganizador from "./views/panel-organizador.jsx";
import Cabecera from "./components/Cabecera.jsx";
import PieDePagina from "./components/PieDePagina.jsx";

import Inicio from "./views/inicio.jsx";
import Torneos from "./views/torneos.jsx";
import DetalleTorneo from "./views/detalle-torneo.jsx";
import Inscripcion from "./views/inscripcion.jsx";
import Equipo from "./views/equipo.jsx";
import Perfil from "./views/perfil.jsx";
import Login from "./views/login.jsx";
import Registro from "./views/registro.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";

function App() {

    return (

        <div className="d-flex flex-column min-vh-100">

            <Cabecera />

            <div className="flex-grow-1">

                <Routes>

                    <Route
                        path="/"
                        element={<Inicio />}
                    />

                    <Route
                        path="/torneos"
                        element={<Torneos />}
                    />

                    <Route
                        path="/detalle/:id"
                        element={<DetalleTorneo />}
                    />

                    <Route
                        path="/inscripcion"
                        element={
                            <RutaProtegida rolesPermitidos={["JUGADOR"]}>
                                <Inscripcion />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/equipo"
                        element={
                            <RutaProtegida rolesPermitidos={["JUGADOR"]}>
                                <Equipo />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/perfil"
                        element={
                            <RutaProtegida rolesPermitidos={["JUGADOR"]}>
                                <Perfil />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <RutaProtegida rolesPermitidos={["ADMIN"]}>
                                <PanelAdmin />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/organizador"
                        element={
                            <RutaProtegida rolesPermitidos={["ORGANIZADOR"]}>
                                <PanelOrganizador />
                            </RutaProtegida>
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/registro"
                        element={<Registro />}
                    />

                </Routes>

            </div>

            <PieDePagina />

        </div>

    );
}


export default App;