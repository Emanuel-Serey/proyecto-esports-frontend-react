import {
    useState
} from "react";

import {
    crearJuego,
    actualizarJuego,
    desactivarJuego
} from "../services/adminService.js";


function GestionJuegosAdmin({
    juegos,
    onRecargar
}) {

    const [nombre, setNombre] =
        useState("");

    const [genero, setGenero] =
        useState("");

    const [modalidad, setModalidad] =
        useState("EQUIPO");

    const [jugadoresPorEquipo, setJugadoresPorEquipo] =
        useState(1);

    const [juegoEditando, setJuegoEditando] =
        useState(null);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);


    function limpiarFormulario() {

        setNombre("");
        setGenero("");
        setModalidad("EQUIPO");
        setJugadoresPorEquipo(1);
        setJuegoEditando(null);
    }


    function seleccionarParaEditar(
        juego
    ) {

        setJuegoEditando(
            juego
        );

        setNombre(
            juego.nombre
        );

        setGenero(
            juego.genero
        );

        setModalidad(
            juego.modalidad
        );

        setJugadoresPorEquipo(
            juego.jugadoresPorEquipo
        );

        setMensaje("");
        setError("");
    }


    async function guardarJuego(
        event
    ) {

        event.preventDefault();

        setMensaje("");
        setError("");


        const datosJuego = {

            nombre:
                nombre.trim(),

            genero:
                genero.trim(),

            modalidad,

            jugadoresPorEquipo:
                Number(jugadoresPorEquipo)

        };


        if (
            datosJuego.nombre === "" ||
            datosJuego.genero === ""
        ) {

            setError(
                "Debes completar todos los campos."
            );

            return;
        }


        if (
            datosJuego.jugadoresPorEquipo < 1
        ) {

            setError(
                "Debe existir al menos un jugador."
            );

            return;
        }


        setGuardando(true);


        try {

            if (juegoEditando) {

                await actualizarJuego(
                    juegoEditando.id,
                    datosJuego
                );

                setMensaje(
                    "Juego actualizado correctamente."
                );

            } else {

                await crearJuego(
                    datosJuego
                );

                setMensaje(
                    "Juego creado correctamente."
                );

            }


            limpiarFormulario();

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
        juego
    ) {

        const confirmar =
            window.confirm(
                `¿Deseas desactivar ${juego.nombre}?`
            );


        if (!confirmar) {
            return;
        }


        setMensaje("");
        setError("");


        try {

            await desactivarJuego(
                juego.id
            );

            setMensaje(
                "Juego desactivado correctamente."
            );

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
                    Gestión de juegos
                </h2>


                <form
                    onSubmit={guardarJuego}
                    className="mb-4"
                >

                    <div className="row g-3">


                        <div className="col-12 col-md-3">

                            <label
                                className="form-label"
                                htmlFor="juego-nombre"
                            >
                                Nombre
                            </label>

                            <input
                                id="juego-nombre"
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


                        <div className="col-12 col-md-3">

                            <label
                                className="form-label"
                                htmlFor="juego-genero"
                            >
                                Género
                            </label>

                            <input
                                id="juego-genero"
                                className="form-control"
                                value={genero}
                                placeholder="MOBA, FPS..."
                                onChange={
                                    function (event) {

                                        setGenero(
                                            event.target.value
                                        );

                                    }
                                }
                            />

                        </div>


                        <div className="col-12 col-md-3">

                            <label
                                className="form-label"
                                htmlFor="juego-modalidad"
                            >
                                Modalidad
                            </label>

                            <select
                                id="juego-modalidad"
                                className="form-select"
                                value={modalidad}
                                onChange={
                                    function (event) {

                                        setModalidad(
                                            event.target.value
                                        );

                                    }
                                }
                            >

                                <option value="EQUIPO">
                                    Equipo
                                </option>

                                <option value="JUGADOR">
                                    Individual
                                </option>

                            </select>

                        </div>


                        <div className="col-12 col-md-3">

                            <label
                                className="form-label"
                                htmlFor="juego-jugadores"
                            >
                                Jugadores por equipo
                            </label>

                            <input
                                id="juego-jugadores"
                                type="number"
                                min="1"
                                className="form-control"
                                value={jugadoresPorEquipo}
                                onChange={
                                    function (event) {

                                        setJugadoresPorEquipo(
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
                                juegoEditando
                                    ? "Guardar cambios"
                                    : "Crear juego"
                            }

                        </button>


                        {juegoEditando && (

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={
                                    limpiarFormulario
                                }
                            >
                                Cancelar edición
                            </button>

                        )}

                    </div>

                </form>


                {mensaje && (

                    <div className="alert alert-success">
                        {mensaje}
                    </div>

                )}


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                <div className="table-responsive">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Género</th>
                                <th>Modalidad</th>
                                <th>Jugadores</th>
                                <th>Estado</th>
                                <th>Acciones</th>

                            </tr>

                        </thead>


                        <tbody>

                            {juegos.map(
                                function (juego) {

                                    return (

                                        <tr key={juego.id}>

                                            <td>
                                                {juego.id}
                                            </td>

                                            <td>
                                                {juego.nombre}
                                            </td>

                                            <td>
                                                {juego.genero}
                                            </td>

                                            <td>
                                                {juego.modalidad}
                                            </td>

                                            <td>
                                                {
                                                    juego.jugadoresPorEquipo
                                                }
                                            </td>

                                            <td>
                                                {
                                                    juego.estado
                                                        ? "ACTIVO"
                                                        : "INACTIVO"
                                                }
                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <button
                                                        type="button"
                                                        className="
                                                            btn
                                                            btn-primary
                                                            btn-sm
                                                        "
                                                        onClick={
                                                            function () {

                                                                seleccionarParaEditar(
                                                                    juego
                                                                );

                                                            }
                                                        }
                                                    >
                                                        Editar
                                                    </button>


                                                    {juego.estado && (

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
                                                                        juego
                                                                    );

                                                                }
                                                            }
                                                        >
                                                            Desactivar
                                                        </button>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );
}


export default GestionJuegosAdmin;