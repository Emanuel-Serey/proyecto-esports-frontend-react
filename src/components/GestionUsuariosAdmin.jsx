import {
    useState
} from "react";

import {
    obtenerEmail
} from "../services/authService.js";

import {
    actualizarDatosUsuario,
    actualizarRolCuenta,
    actualizarPasswordCuenta,
    desactivarUsuarioCompleto
} from "../services/adminService.js";


function GestionUsuariosAdmin({
    usuarios,
    cuentas,
    onRecargar
}) {

    const emailAdminActual =
        obtenerEmail();


    const [usuarioEditando, setUsuarioEditando] =
        useState(null);

    const [cuentaEditando, setCuentaEditando] =
        useState(null);

    const [nombre, setNombre] =
        useState("");

    const [nickname, setNickname] =
        useState("");

    const [rol, setRol] =
        useState("JUGADOR");

    const [nuevaPassword, setNuevaPassword] =
        useState("");

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    function buscarCuenta(
        usuario
    ) {

        return cuentas.find(
            function (cuenta) {

                return (
                    cuenta.email
                        .toLowerCase() ===
                    usuario.email
                        .toLowerCase()
                );

            }
        ) || null;
    }


    function seleccionarUsuario(
        usuario
    ) {

        const cuenta =
            buscarCuenta(
                usuario
            );


        setUsuarioEditando(
            usuario
        );

        setCuentaEditando(
            cuenta
        );

        setNombre(
            usuario.nombre
        );

        setNickname(
            usuario.nickname
        );

        setRol(
            usuario.rol
        );

        setNuevaPassword("");

        setMensaje("");
        setError("");
    }


    function cancelarEdicion() {

        setUsuarioEditando(null);
        setCuentaEditando(null);

        setNombre("");
        setNickname("");
        setRol("JUGADOR");
        setNuevaPassword("");

        setMensaje("");
        setError("");
    }


    async function guardarCambios(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        if (!usuarioEditando) {
            return;
        }


        if (
            nombre.trim() === "" ||
            nickname.trim() === ""
        ) {

            setError(
                "Nombre y nickname son obligatorios."
            );

            return;
        }


        if (
            nuevaPassword !== "" &&
            nuevaPassword.length < 6
        ) {

            setError(
                "La nueva contraseña debe tener al menos 6 caracteres."
            );

            return;
        }


        const esMiCuenta =
            usuarioEditando.email
                .toLowerCase() ===
            emailAdminActual
                ?.toLowerCase();


        setGuardando(true);


        try {

            /*
             * Actualizamos datos personales.
             *
             * El email NO se modifica para evitar
             * desincronizar auth-service.
             *
             * El rol se deja con el valor actual aquí,
             * porque el cambio real de rol lo hará
             * auth-service.
             */
            await actualizarDatosUsuario(
                usuarioEditando.id,
                {
                    nombre:
                        nombre.trim(),

                    nickname:
                        nickname.trim(),

                    email:
                        usuarioEditando.email,

                    rol:
                        usuarioEditando.rol
                }
            );


            /*
             * Cambio de rol.
             * auth-service sincroniza user-service.
             */
            if (
                rol !== usuarioEditando.rol
            ) {

                if (esMiCuenta) {

                    throw new Error(
                        "No puedes modificar el rol de tu propia cuenta mientras estás administrando el sistema."
                    );

                }


                if (!cuentaEditando) {

                    throw new Error(
                        "Este usuario no tiene una cuenta de acceso asociada."
                    );

                }


                await actualizarRolCuenta(
                    cuentaEditando.id,
                    rol
                );

            }


            /*
             * Cambio opcional de contraseña.
             */
            if (
                nuevaPassword !== ""
            ) {

                if (!cuentaEditando) {

                    throw new Error(
                        "Este usuario no tiene una cuenta de acceso asociada."
                    );

                }


                await actualizarPasswordCuenta(
                    cuentaEditando.id,
                    nuevaPassword
                );

            }


            setMensaje(
                "Usuario actualizado correctamente."
            );


            setUsuarioEditando(null);
            setCuentaEditando(null);

            setNombre("");
            setNickname("");
            setNuevaPassword("");


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );


        } finally {

            setGuardando(false);

        }
    }


    async function manejarDesactivar(
        usuario
    ) {

        const esMiCuenta =
            usuario.email
                .toLowerCase() ===
            emailAdminActual
                ?.toLowerCase();


        if (esMiCuenta) {

            setError(
                "No puedes desactivar tu propia cuenta."
            );

            return;
        }


        const confirmar =
            window.confirm(
                `¿Deseas desactivar al usuario "${usuario.nickname}"?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        const cuenta =
            buscarCuenta(
                usuario
            );


        try {

            await desactivarUsuarioCompleto(
                usuario.id,
                cuenta?.id ?? null
            );


            setMensaje(
                "Usuario y cuenta desactivados correctamente."
            );


            if (
                usuarioEditando?.id ===
                usuario.id
            ) {
                cancelarEdicion();
            }


            await onRecargar();


        } catch (error) {

            setError(
                error.message
            );

        }
    }


    return (

        <section className="card mb-4">

            <div className="card-body">

                <h2 className="h4 mb-3">
                    Gestión de usuarios
                </h2>


                {
                    usuarioEditando && (

                        <form
                            onSubmit={
                                guardarCambios
                            }
                            className="mb-4"
                        >

                            <h3 className="h5 mb-3">
                                Editar usuario
                            </h3>


                            <div className="row g-3">


                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="admin-usuario-nombre"
                                        className="form-label"
                                    >
                                        Nombre
                                    </label>


                                    <input
                                        id="admin-usuario-nombre"
                                        className="form-control"
                                        value={nombre}
                                        onChange={
                                            function (event) {

                                                setNombre(
                                                    event.target.value
                                                );

                                            }
                                        }
                                    />

                                </div>


                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="admin-usuario-nickname"
                                        className="form-label"
                                    >
                                        Nickname
                                    </label>


                                    <input
                                        id="admin-usuario-nickname"
                                        className="form-control"
                                        value={nickname}
                                        onChange={
                                            function (event) {

                                                setNickname(
                                                    event.target.value
                                                );

                                            }
                                        }
                                    />

                                </div>


                                <div className="col-12 col-md-6">

                                    <label
                                        className="form-label"
                                    >
                                        Email
                                    </label>


                                    <input
                                        className="form-control"
                                        value={
                                            usuarioEditando.email
                                        }
                                        disabled
                                    />

                                </div>


                                <div className="col-12 col-md-6">

                                    <label
                                        htmlFor="admin-usuario-rol"
                                        className="form-label"
                                    >
                                        Rol
                                    </label>


                                    <select
                                        id="admin-usuario-rol"
                                        className="form-select"
                                        value={rol}
                                        disabled={
                                            usuarioEditando.email
                                                .toLowerCase() ===
                                            emailAdminActual
                                                ?.toLowerCase() ||
                                            !cuentaEditando
                                        }
                                        onChange={
                                            function (event) {

                                                setRol(
                                                    event.target.value
                                                );

                                            }
                                        }
                                    >

                                        <option value="JUGADOR">
                                            Jugador
                                        </option>

                                        <option value="ORGANIZADOR">
                                            Organizador
                                        </option>

                                        <option value="ADMIN">
                                            Administrador
                                        </option>

                                    </select>

                                </div>


                                <div className="col-12">

                                    <label
                                        htmlFor="admin-password"
                                        className="form-label"
                                    >
                                        Nueva contraseña
                                    </label>


                                    <input
                                        id="admin-password"
                                        type="password"
                                        className="form-control"
                                        value={nuevaPassword}
                                        disabled={!cuentaEditando}
                                        placeholder={
                                            cuentaEditando
                                                ? "Déjalo vacío para mantener la actual"
                                                : "Usuario sin cuenta de acceso"
                                        }
                                        onChange={
                                            function (event) {

                                                setNuevaPassword(
                                                    event.target.value
                                                );

                                            }
                                        }
                                    />

                                </div>

                            </div>


                            <div className="d-flex gap-2 mt-3">

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={guardando}
                                >
                                    {
                                        guardando
                                            ? "Guardando..."
                                            : "Guardar cambios"
                                    }
                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={
                                        cancelarEdicion
                                    }
                                >
                                    Cancelar
                                </button>

                            </div>

                        </form>

                    )
                }


                {mensaje && (

                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        {mensaje}
                    </div>

                )}


                {error && (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                )}


                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Nickname</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Usuario</th>
                                <th>Cuenta</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                usuarios.map(
                                    function (usuario) {

                                        const cuenta =
                                            buscarCuenta(
                                                usuario
                                            );


                                        const esMiCuenta =
                                            usuario.email
                                                .toLowerCase() ===
                                            emailAdminActual
                                                ?.toLowerCase();


                                        return (

                                            <tr
                                                key={usuario.id}
                                            >

                                                <td>
                                                    {usuario.id}
                                                </td>

                                                <td>
                                                    {usuario.nombre}
                                                </td>

                                                <td>
                                                    {usuario.nickname}
                                                </td>

                                                <td>
                                                    {usuario.email}
                                                </td>

                                                <td>
                                                    {usuario.rol}
                                                </td>

                                                <td>
                                                    {usuario.estado}
                                                </td>

                                                <td>
                                                    {
                                                        cuenta
                                                            ? cuenta.estado
                                                            : "SIN CUENTA"
                                                    }
                                                </td>

                                                <td>

                                                    <div
                                                        className="
                                                            d-flex
                                                            gap-2
                                                            flex-wrap
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            className="
                                                                btn
                                                                btn-primary
                                                                btn-sm
                                                            "
                                                            onClick={
                                                                function () {

                                                                    seleccionarUsuario(
                                                                        usuario
                                                                    );

                                                                }
                                                            }
                                                        >
                                                            Editar
                                                        </button>


                                                        {
                                                            usuario.estado ===
                                                                "ACTIVO" &&
                                                            !esMiCuenta && (

                                                                <button
                                                                    type="button"
                                                                    className="
                                                                        btn
                                                                        btn-danger
                                                                        btn-sm
                                                                    "
                                                                    onClick={
                                                                        function () {

                                                                            manejarDesactivar(
                                                                                usuario
                                                                            );

                                                                        }
                                                                    }
                                                                >
                                                                    Desactivar
                                                                </button>

                                                            )
                                                        }

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    }
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );
}


export default GestionUsuariosAdmin;