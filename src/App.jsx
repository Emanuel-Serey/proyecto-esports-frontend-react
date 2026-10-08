import { Route, Routes } from "react-router-dom";

import Cabecera from "./components/Cabecera.jsx";
import PieDePagina from "./components/PieDePagina.jsx";

import Inicio from "./views/inicio.jsx";


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

                </Routes>

            </div>

            <PieDePagina />

        </div>

    );
}


export default App;