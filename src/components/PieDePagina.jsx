function PieDePagina() {

    const anio = new Date().getFullYear();

    return (
        <footer className="border-top py-3 mt-4">

            <div className="container text-center">

                <p className="mb-0">
                    © {anio} eSports Arena Manager.
                    Todos los derechos reservados.
                </p>

            </div>

        </footer>
    );
}

export default PieDePagina;