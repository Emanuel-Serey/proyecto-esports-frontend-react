import Cabecera from "./components/Cabecera.jsx";
import PieDePagina from "./components/PieDePagina.jsx";


function App() {

    return (

        <div className="d-flex flex-column min-vh-100">

            <Cabecera />

            <main className="container py-4 flex-grow-1">

                <h1>
                    eSports Arena Manager
                </h1>

                <p>
                    Migración del proyecto a React.
                </p>

            </main>

            <PieDePagina />

        </div>

    );
}


export default App;