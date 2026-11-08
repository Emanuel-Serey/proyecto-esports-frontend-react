import { Navigate } from "react-router-dom";

import {
    estaAutenticado,
    obtenerRol
} from "../services/authService.js";


function RutaProtegida({
    children,
    rolesPermitidos = []
}) {

    const autenticado = estaAutenticado();
    const rol = obtenerRol();


    // No tiene sesión
    if (!autenticado) {
        return <Navigate to="/login" replace />;
    }


    // Tiene sesión, pero su rol no está autorizado
    if (
        rolesPermitidos.length > 0 &&
        !rolesPermitidos.includes(rol)
    ) {
        return <Navigate to="/" replace />;
    }


    // Todo correcto
    return children;
}


export default RutaProtegida;