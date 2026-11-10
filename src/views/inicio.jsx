import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    obtenerTorneos
} from "../services/torneosService.js";

import TarjetaTorneo
    from "../components/TarjetaTorneo.jsx";

import TarjetaCierre
    from "../components/TarjetaCierre.jsx";

import "./inicio.css";


function obtenerFechaActual() {

    const fecha =
        new Date();


    const anio =
        fecha.getFullYear();


    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            fecha.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${anio}-${mes}-${dia}`;
}


function Inicio() {

    const [
        torneos,
        setTorneos
    ] = useState([]);

    const [
        cargando,
        setCargando
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    useEffect(function () {

        obtenerTorneos()
            .then(function (datos) {

                setTorneos(
                    datos
                );

            })
            .catch(function (error) {

                setError(
                    error.message
                );

            })
            .finally(function () {

                setCargando(
                    false
                );

            });

    }, []);


    const torneosAbiertos =
        useMemo(
            function () {

                const hoy =
                    obtenerFechaActual();


                return torneos
                    .filter(
                        function (torneo) {

                            return (
                                torneo.estado ===
                                    "Abierto" &&
                                torneo.cierreInscripcion &&
                                torneo.cierreInscripcion >=
                                    hoy
                            );

                        }
                    )
                    .sort(
                        function (
                            torneoA,
                            torneoB
                        ) {

                            return torneoA
                                .cierreInscripcion
                                .localeCompare(
                                    torneoB
                                        .cierreInscripcion
                                );

                        }
                    );

            },
            [torneos]
        );


    const torneosDestacados =
        torneos.slice(
            0,
            3
        );


    return (

        <main className="inicio-page">


            <section className="inicio-hero">

                <div
                    id="carouselPrincipal"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="6000"
                >

                    <div className="carousel-indicators">

                        <button
                            type="button"
                            data-bs-target="#carouselPrincipal"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        />

                        <button
                            type="button"
                            data-bs-target="#carouselPrincipal"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        />

                        <button
                            type="button"
                            data-bs-target="#carouselPrincipal"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        />

                    </div>


                    <div className="carousel-inner">


                        <div className="carousel-item active">

                            <img
                                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=85"
                                className="inicio-hero-imagen"
                                alt="Competencia de eSports"
                            />


                            <div className="inicio-hero-overlay" />


                            <div className="inicio-hero-contenido">

                                <span className="inicio-hero-etiqueta">
                                    ESPORTS ARENA
                                </span>


                                <h1>
                                    Compite.
                                    <br />

                                    <span>
                                        Domina.
                                    </span>

                                    <br />

                                    Haz historia.
                                </h1>


                                <p>
                                    Participa en torneos,
                                    crea tu equipo y demuestra
                                    hasta dónde puedes llegar.
                                </p>


                                <div className="inicio-hero-botones">

                                    <Link
                                        to="/torneos"
                                        className="btn btn-primary btn-lg"
                                    >
                                        Explorar torneos

                                        <span>
                                            →
                                        </span>
                                    </Link>


                                    <Link
                                        to="/registro"
                                        className="btn btn-outline-light btn-lg"
                                    >
                                        Crear cuenta
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="carousel-item">

                            <img
                                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=85"
                                className="inicio-hero-imagen"
                                alt="Jugador durante una competencia"
                            />


                            <div className="inicio-hero-overlay" />


                            <div className="inicio-hero-contenido">

                                <span className="inicio-hero-etiqueta">
                                    COMPETENCIA
                                </span>


                                <h1>
                                    Tu equipo.
                                    <br />

                                    <span>
                                        Tu estrategia.
                                    </span>
                                </h1>


                                <p>
                                    Forma tu escuadra,
                                    inscríbete en competencias
                                    y avanza hasta lo más alto.
                                </p>


                                <div className="inicio-hero-botones">

                                    <Link
                                        to="/torneos"
                                        className="btn btn-primary btn-lg"
                                    >
                                        Ver competencias

                                        <span>
                                            →
                                        </span>
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="carousel-item">

                            <img
                                src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1600&q=85"
                                className="inicio-hero-imagen"
                                alt="Setup gamer competitivo"
                            />


                            <div className="inicio-hero-overlay" />


                            <div className="inicio-hero-contenido">

                                <span className="inicio-hero-etiqueta">
                                    RANKING
                                </span>


                                <h1>
                                    Cada partida
                                    <br />

                                    <span>
                                        cuenta.
                                    </span>
                                </h1>


                                <p>
                                    Gana encuentros,
                                    suma puntos y escala
                                    posiciones en el ranking.
                                </p>


                                <div className="inicio-hero-botones">

                                    <Link
                                        to="/torneos"
                                        className="btn btn-primary btn-lg"
                                    >
                                        Comenzar a competir

                                        <span>
                                            →
                                        </span>
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>


                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselPrincipal"
                        data-bs-slide="prev"
                    >

                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        />

                        <span className="visually-hidden">
                            Anterior
                        </span>

                    </button>


                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselPrincipal"
                        data-bs-slide="next"
                    >

                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        />

                        <span className="visually-hidden">
                            Siguiente
                        </span>

                    </button>

                </div>

            </section>


            <section className="inicio-caracteristicas">

                <article className="inicio-caracteristica">

                    <div className="inicio-caracteristica-icono">
                        ⚔
                    </div>

                    <div>

                        <span>
                            COMPITE
                        </span>

                        <h3>
                            Encuentra torneos
                        </h3>

                        <p>
                            Descubre competencias abiertas
                            y participa con tu equipo.
                        </p>

                    </div>

                </article>


                <article className="inicio-caracteristica">

                    <div className="inicio-caracteristica-icono">
                        ◈
                    </div>

                    <div>

                        <span>
                            EQUIPOS
                        </span>

                        <h3>
                            Forma tu escuadra
                        </h3>

                        <p>
                            Crea equipos, incorpora jugadores
                            y prepárate para competir.
                        </p>

                    </div>

                </article>


                <article className="inicio-caracteristica">

                    <div className="inicio-caracteristica-icono">
                        ▲
                    </div>

                    <div>

                        <span>
                            RANKING
                        </span>

                        <h3>
                            Llega a la cima
                        </h3>

                        <p>
                            Obtén victorias y demuestra
                            quién domina la arena.
                        </p>

                    </div>

                </article>

            </section>


            <section className="inicio-seccion">

                <div className="inicio-seccion-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            COMPETICIONES
                        </span>

                        <h2>
                            Torneos destacados
                        </h2>

                        <p>
                            Revisa algunas de las competencias
                            disponibles actualmente.
                        </p>

                    </div>


                    <Link
                        to="/torneos"
                        className="inicio-ver-todos"
                    >
                        Ver todos

                        <span>
                            →
                        </span>
                    </Link>

                </div>


                {cargando ? (

                    <div className="inicio-cargando">

                        <div
                            className="spinner-border"
                            role="status"
                        />

                        <span>
                            Cargando torneos...
                        </span>

                    </div>

                ) : error ? (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                ) : torneosDestacados.length === 0 ? (

                    <div className="inicio-sin-torneos">

                        <span className="inicio-sin-torneos-icono">
                            ◇
                        </span>

                        <h3>
                            Próximamente nuevos torneos
                        </h3>

                        <p>
                            Cuando existan competencias
                            disponibles aparecerán aquí.
                        </p>

                    </div>

                ) : (

                    <div className="row g-4">

                        {
                            torneosDestacados.map(
                                function (torneo) {

                                    return (

                                        <div
                                            className="
                                                col-12
                                                col-md-6
                                                col-xl-4
                                            "
                                            key={
                                                torneo.id
                                            }
                                        >

                                            <TarjetaTorneo
                                                torneo={
                                                    torneo
                                                }
                                            />

                                        </div>

                                    );

                                }
                            )
                        }

                    </div>

                )}

            </section>


            <section className="inicio-banner">

                <div className="inicio-banner-fondo">

                    <img
                        src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1600&q=85"
                        alt="Gaming competitivo"
                    />

                </div>


                <div className="inicio-banner-overlay" />


                <div className="inicio-banner-contenido">

                    <span className="seccion-etiqueta">
                        TU CAMINO COMIENZA AQUÍ
                    </span>

                    <h2>
                        ¿Estás listo para entrar
                        a la arena?
                    </h2>

                    <p>
                        Crea una cuenta, encuentra una
                        competencia y comienza tu camino
                        hacia la victoria.
                    </p>


                    <Link
                        to="/registro"
                        className="btn btn-primary"
                    >
                        Registrarme

                        <span>
                            →
                        </span>
                    </Link>

                </div>

            </section>


            <section className="inicio-seccion">

                <div className="inicio-seccion-cabecera">

                    <div>

                        <span className="seccion-etiqueta">
                            NO TE QUEDES FUERA
                        </span>

                        <h2>
                            Próximos cierres
                        </h2>

                        <p>
                            Competencias cuya inscripción
                            cerrará próximamente.
                        </p>

                    </div>

                </div>


                {torneosAbiertos.length === 0 ? (

                    <div className="inicio-sin-torneos compacto">

                        <span className="inicio-sin-torneos-icono">
                            ◷
                        </span>

                        <h3>
                            No hay cierres próximos
                        </h3>

                        <p>
                            Actualmente no hay torneos
                            abiertos disponibles.
                        </p>

                    </div>

                ) : (

                    <div id="lista-cierres">

                        {
                            torneosAbiertos
                                .slice(
                                    0,
                                    4
                                )
                                .map(
                                    function (torneo) {

                                        return (

                                            <TarjetaCierre
                                                key={
                                                    torneo.id
                                                }
                                                torneo={
                                                    torneo
                                                }
                                            />

                                        );

                                    }
                                )
                        }

                    </div>

                )}

            </section>


            <section className="inicio-video">

                <div className="inicio-video-texto">

                    <span className="seccion-etiqueta">
                        ESPORTS
                    </span>

                    <h2>
                        Vive la intensidad
                        de la competencia
                    </h2>

                    <p>
                        Los eSports reúnen estrategia,
                        precisión y trabajo en equipo.
                        Descubre la experiencia de competir
                        al máximo nivel.
                    </p>


                    <Link
                        to="/torneos"
                        className="btn btn-outline-primary"
                    >
                        Explorar torneos
                    </Link>

                </div>


                <div className="inicio-video-contenedor">

                    <iframe
                        src="https://www.youtube.com/embed/LR3AaGdesgA"
                        title="Competencia profesional de eSports"
                        allowFullScreen
                    />

                </div>

            </section>

        </main>

    );
}


export default Inicio;