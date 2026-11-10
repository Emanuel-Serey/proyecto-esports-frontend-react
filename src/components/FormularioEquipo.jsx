import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    equiposService
} from "../services/equiposService.js";

import ListaIntegrantes
    from "./ListaIntegrantes.jsx";


function obtenerInicial(
    nombre
) {

    return String(
        nombre || "E"
    )
        .trim()
        .charAt(0)
        .toUpperCase();
}


function FormularioEquipo() {

    const [
        usuario,
        setUsuario
    ] = useState(null);

    const [
        jugadores,
        setJugadores
    ] = useState([]);

    const [
        juegos,
        setJuegos
    ] = useState([]);

    const [
        equipoActual,
        setEquipoActual
    ] = useState(null);

    const [
        integrantes,
        setIntegrantes
    ] = useState([]);

    const [
        nombreEquipo,
        setNombreEquipo
    ] = useState("");

    const [
        juegoEquipo,
        setJuegoEquipo
    ] = useState("");

    const [
        nuevoIntegrante,
        setNuevoIntegrante
    ] = useState("");

    const [
        rolIntegrante,
        setRolIntegrante
    ] = useState("");

    const [
        mensaje,
        setMensaje
    ] = useState("");

    const [
        cargando,
        setCargando
    ] = useState(true);


    useEffect(function () {

        equiposService
            .obtenerDatosEquipo()
            .then(function (datos) {

                setUsuario(
                    datos.usuario
                );


                setJugadores(
                    datos.jugadores.filter(
                        function (jugador) {

                            return (
                                jugador.estado ===
                                "ACTIVO"
                            );

                        }
                    )
                );


                setJuegos(
                    datos.juegos.filter(
                        function (juego) {

                            return (
                                juego.estado ===
                                true
                            );

                        }
                    )
                );


                const equipoActivo =
                    datos.equipos.find(
                        function (equipo) {

                            return (
                                equipo.estado ===
                                "ACTIVO"
                            );

                        }
                    );


                if (equipoActivo) {

                    setEquipoActual(
                        equipoActivo
                    );


                    setNombreEquipo(
                        equipoActivo.nombre
                    );


                    setJuegoEquipo(
                        String(
                            equipoActivo
                                .juegoPrincipalId
                        )
                    );


                    setIntegrantes(
                        equipoActivo.miembros ||
                        []
                    );

                }

            })
            .catch(function (error) {

                setMensaje(
                    error.message
                );

            })
            .finally(function () {

                setCargando(
                    false
                );

            });

    }, []);


    const jugadoresDisponibles =
        useMemo(
            function () {

                return jugadores.filter(
                    function (jugador) {

                        if (
                            usuario &&
                            jugador.id ===
                            usuario.id
                        ) {

                            return false;

                        }


                        const yaPertenece =
                            integrantes.some(
                                function (
                                    miembro
                                ) {

                                    return (
                                        miembro.usuarioId ===
                                        jugador.id
                                    );

                                }
                            );


                        return !yaPertenece;

                    }
                );

            },
            [
                jugadores,
                integrantes,
                usuario
            ]
        );


    function formatearRol(
        rol
    ) {

        if (
            rol === "CAPITAN"
        ) {
            return "Capitán";
        }


        if (
            rol === "TITULAR"
        ) {
            return "Titular";
        }


        if (
            rol === "SUPLENTE"
        ) {
            return "Suplente";
        }


        return rol;
    }


    const integrantesVisuales =
        integrantes.map(
            function (miembro) {

                const jugador =
                    jugadores.find(
                        function (item) {

                            return (
                                item.id ===
                                miembro.usuarioId
                            );

                        }
                    );


                return {

                    ...miembro,

                    jugador:
                        jugador
                            ? jugador.nickname
                            : `Usuario ${miembro.usuarioId}`,

                    rol:
                        formatearRol(
                            miembro.rolDentroEquipo
                        )

                };

            }
        );


    const juegoActual =
        juegos.find(
            function (juego) {

                return (
                    String(
                        juego.id
                    ) ===
                    String(
                        juegoEquipo
                    )
                );

            }
        );


    async function crearEquipo(
        event
    ) {

        event.preventDefault();

        setMensaje("");


        if (!usuario) {

            setMensaje(
                "No se pudo identificar al usuario autenticado."
            );

            return;
        }


        if (
            nombreEquipo.trim() ===
            ""
        ) {

            setMensaje(
                "Debes ingresar un nombre para el equipo."
            );

            return;
        }


        if (
            juegoEquipo ===
            ""
        ) {

            setMensaje(
                "Debes seleccionar un juego principal."
            );

            return;
        }


        const nuevoEquipo = {

            nombre:
                nombreEquipo.trim(),

            capitanId:
                usuario.id,

            juegoPrincipalId:
                Number(
                    juegoEquipo
                ),

            miembros: [

                {

                    usuarioId:
                        usuario.id,

                    rolDentroEquipo:
                        "CAPITAN"

                }

            ]

        };


        try {

            const equipoCreado =
                await equiposService
                    .crearEquipo(
                        nuevoEquipo
                    );


            setEquipoActual(
                equipoCreado
            );


            setIntegrantes(
                equipoCreado.miembros ||
                []
            );


            setMensaje(
                "Equipo creado correctamente."
            );


        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function agregarIntegrante() {

        setMensaje("");


        if (!equipoActual) {

            setMensaje(
                "Primero debes crear un equipo."
            );

            return;
        }


        if (
            nuevoIntegrante ===
            ""
        ) {

            setMensaje(
                "Debes seleccionar un jugador."
            );

            return;
        }


        if (
            rolIntegrante ===
            ""
        ) {

            setMensaje(
                "Debes seleccionar un rol."
            );

            return;
        }


        const miembro = {

            usuarioId:
                Number(
                    nuevoIntegrante
                ),

            rolDentroEquipo:
                rolIntegrante

        };


        try {

            const miembroCreado =
                await equiposService
                    .agregarMiembro(
                        equipoActual.id,
                        miembro
                    );


            setIntegrantes(
                function (
                    anteriores
                ) {

                    return [

                        ...anteriores,
                        miembroCreado

                    ];

                }
            );


            setNuevoIntegrante("");
            setRolIntegrante("");


            setMensaje(
                "Integrante agregado correctamente."
            );


        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function quitarIntegrante(
        indiceQuitar
    ) {

        setMensaje("");


        const integrante =
            integrantesVisuales[
                indiceQuitar
            ];


        if (
            integrante
                .rolDentroEquipo ===
            "CAPITAN"
        ) {

            setMensaje(
                "El capitán no puede ser eliminado del equipo."
            );

            return;
        }


        try {

            await equiposService
                .eliminarMiembro(
                    equipoActual.id,
                    integrante.id
                );


            setIntegrantes(
                function (
                    anteriores
                ) {

                    return anteriores.filter(
                        function (
                            miembro
                        ) {

                            return (
                                miembro.id !==
                                integrante.id
                            );

                        }
                    );

                }
            );


            setMensaje(
                "Integrante eliminado correctamente."
            );


        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    async function borrarEquipo() {

        setMensaje("");


        if (!equipoActual) {
            return;
        }


        const confirmar =
            window.confirm(
                `¿Deseas eliminar el equipo "${equipoActual.nombre}"?`
            );


        if (!confirmar) {
            return;
        }


        try {

            await equiposService
                .eliminarEquipo(
                    equipoActual.id
                );


            setEquipoActual(
                null
            );


            setIntegrantes(
                []
            );


            setNombreEquipo("");
            setJuegoEquipo("");
            setNuevoIntegrante("");
            setRolIntegrante("");


            setMensaje(
                "Equipo eliminado correctamente."
            );


        } catch (error) {

            setMensaje(
                error.message
            );

        }
    }


    if (cargando) {

        return (

            <div className="equipo-cargando">

                <div
                    className="spinner-border"
                    role="status"
                />

                <p>
                    Cargando información del equipo...
                </p>

            </div>

        );
    }


    return (

        <>


            {!equipoActual && (

                <section className="equipo-crear">


                    <div className="equipo-crear-intro">

                        <span className="seccion-etiqueta">
                            NUEVA ESCUADRA
                        </span>


                        <h1>
                            Crea tu equipo
                        </h1>


                        <p>
                            Forma tu propia escuadra,
                            elige tu juego principal
                            y comienza a competir.
                        </p>

                    </div>


                    <form
                        onSubmit={
                            crearEquipo
                        }
                        className="equipo-crear-formulario"
                    >

                        <div>

                            <label
                                htmlFor="nombre-equipo"
                                className="form-label"
                            >
                                Nombre del equipo
                            </label>


                            <input
                                id="nombre-equipo"
                                type="text"
                                className="form-control"
                                value={nombreEquipo}
                                placeholder="Ej: Shadow Wolves"
                                onChange={
                                    function (
                                        event
                                    ) {

                                        setNombreEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }
                                }
                            />

                        </div>


                        <div>

                            <label
                                htmlFor="juego-equipo"
                                className="form-label"
                            >
                                Juego principal
                            </label>


                            <select
                                id="juego-equipo"
                                className="form-select"
                                value={juegoEquipo}
                                onChange={
                                    function (
                                        event
                                    ) {

                                        setJuegoEquipo(
                                            event.target.value
                                        );

                                        setMensaje("");

                                    }
                                }
                            >

                                <option value="">
                                    Selecciona un juego
                                </option>


                                {
                                    juegos.map(
                                        function (
                                            juego
                                        ) {

                                            return (

                                                <option
                                                    key={
                                                        juego.id
                                                    }
                                                    value={
                                                        juego.id
                                                    }
                                                >
                                                    {
                                                        juego.nombre
                                                    }
                                                </option>

                                            );

                                        }
                                    )
                                }

                            </select>

                        </div>


                        <div>

                            <label
                                className="form-label"
                            >
                                Capitán
                            </label>


                            <input
                                type="text"
                                className="form-control"
                                value={
                                    usuario
                                        ? usuario.nickname
                                        : ""
                                }
                                disabled
                            />

                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Crear equipo
                            <span>
                                →
                            </span>
                        </button>

                    </form>

                </section>

            )}


            {equipoActual && (

                <>


                    {/* HERO EQUIPO */}

                    <section className="equipo-hero">

                        <div className="equipo-hero-decoracion" />


                        <div className="equipo-identidad">

                            <div className="equipo-logo">

                                {
                                    obtenerInicial(
                                        equipoActual.nombre
                                    )
                                }

                            </div>


                            <div>

                                <span className="seccion-etiqueta">
                                    MI ESCUADRA
                                </span>


                                <h1>
                                    {
                                        equipoActual.nombre
                                    }
                                </h1>


                                <div className="equipo-etiquetas">

                                    <span className="equipo-badge activo">
                                        ACTIVO
                                    </span>


                                    <span className="equipo-badge capitan">
                                        CAPITÁN:{" "}
                                        {
                                            usuario
                                                ? usuario.nickname
                                                : ""
                                        }
                                    </span>

                                </div>

                            </div>

                        </div>


                        <div className="equipo-hero-resumen">


                            <div>

                                <span>
                                    JUEGO
                                </span>

                                <strong>
                                    {
                                        juegoActual
                                            ? juegoActual.nombre
                                            : "Sin juego"
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    INTEGRANTES
                                </span>

                                <strong>
                                    {
                                        integrantes.length
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    ESTADO
                                </span>

                                <strong>
                                    {
                                        equipoActual.estado
                                    }
                                </strong>

                            </div>

                        </div>

                    </section>


                    <div className="equipo-layout">


                        {/* CONTENIDO */}

                        <div className="equipo-contenido">


                            <section className="equipo-seccion">

                                <div className="equipo-seccion-cabecera">

                                    <div>

                                        <span className="seccion-etiqueta">
                                            ROSTER
                                        </span>


                                        <h2>
                                            Integrantes
                                        </h2>


                                        <p>
                                            Administra los jugadores
                                            y roles de tu escuadra.
                                        </p>

                                    </div>


                                    <span className="equipo-contador">

                                        {
                                            integrantes.length
                                        }

                                        {" miembros"}

                                    </span>

                                </div>


                                <ListaIntegrantes
                                    integrantes={
                                        integrantesVisuales
                                    }
                                    onQuitar={
                                        quitarIntegrante
                                    }
                                />

                            </section>

                        </div>


                        {/* SIDEBAR */}

                        <aside className="equipo-sidebar">


                            <section className="equipo-agregar">

                                <span className="seccion-etiqueta">
                                    NUEVO MIEMBRO
                                </span>


                                <h2>
                                    Agregar jugador
                                </h2>


                                <p>
                                    Incorpora un jugador
                                    disponible y asígnale
                                    un rol.
                                </p>


                                <div>

                                    <label
                                        htmlFor="nuevo-integrante"
                                        className="form-label"
                                    >
                                        Jugador
                                    </label>


                                    <select
                                        id="nuevo-integrante"
                                        className="form-select"
                                        value={
                                            nuevoIntegrante
                                        }
                                        onChange={
                                            function (
                                                event
                                            ) {

                                                setNuevoIntegrante(
                                                    event.target.value
                                                );

                                                setMensaje("");

                                            }
                                        }
                                    >

                                        <option value="">
                                            Selecciona un jugador
                                        </option>


                                        {
                                            jugadoresDisponibles.map(
                                                function (
                                                    jugador
                                                ) {

                                                    return (

                                                        <option
                                                            key={
                                                                jugador.id
                                                            }
                                                            value={
                                                                jugador.id
                                                            }
                                                        >
                                                            {
                                                                jugador.nickname
                                                            }
                                                        </option>

                                                    );

                                                }
                                            )
                                        }

                                    </select>

                                </div>


                                <div>

                                    <label
                                        htmlFor="rol-integrante"
                                        className="form-label"
                                    >
                                        Rol
                                    </label>


                                    <select
                                        id="rol-integrante"
                                        className="form-select"
                                        value={
                                            rolIntegrante
                                        }
                                        onChange={
                                            function (
                                                event
                                            ) {

                                                setRolIntegrante(
                                                    event.target.value
                                                );

                                                setMensaje("");

                                            }
                                        }
                                    >

                                        <option value="">
                                            Selecciona un rol
                                        </option>

                                        <option value="TITULAR">
                                            Titular
                                        </option>

                                        <option value="SUPLENTE">
                                            Suplente
                                        </option>

                                    </select>

                                </div>


                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={
                                        agregarIntegrante
                                    }
                                >
                                    Agregar integrante
                                </button>

                            </section>


                            <section className="equipo-zona-peligro">

                                <span className="seccion-etiqueta">
                                    ADMINISTRACIÓN
                                </span>


                                <h3>
                                    Eliminar equipo
                                </h3>


                                <p>
                                    Esta acción desactivará
                                    la escuadra actual.
                                </p>


                                <button
                                    type="button"
                                    className="btn btn-danger w-100"
                                    onClick={
                                        borrarEquipo
                                    }
                                >
                                    Eliminar equipo
                                </button>

                            </section>

                        </aside>

                    </div>

                </>

            )}


            {mensaje && (

                <div
                    className={
                        `equipo-mensaje ${
                            mensaje.includes(
                                "correctamente"
                            )
                                ? "exito"
                                : "error"
                        }`
                    }
                    role="alert"
                >
                    {mensaje}
                </div>

            )}

        </>

    );
}


export default FormularioEquipo;