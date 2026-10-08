import { Route, Routes } from "react-router-dom";

import Cabecera from "./components/Cabecera.jsx";
import PieDePagina from "./components/PieDePagina.jsx";

import Inicio from "./views/inicio.jsx";
import Torneos from "./views/torneos.jsx";
import DetalleTorneo from "./views/detalle-torneo.jsx";
import Inscripcion from "./views/inscripcion.jsx";
import Equipo from "./views/equipo.jsx";
import Perfil from "./views/perfil.jsx";


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
                        path="/detalle"
                        element={<DetalleTorneo />}
                    />

                    <Route
                        path="/inscripcion"
                        element={<Inscripcion />}
                    />

                    <Route
                        path="/equipo"
                        element={<Equipo />}
                    />

                    <Route
                        path="/perfil"
                        element={<Perfil />}
                    />

                </Routes>

            </div>

            <PieDePagina />

        </div>

    );
}


export default App;