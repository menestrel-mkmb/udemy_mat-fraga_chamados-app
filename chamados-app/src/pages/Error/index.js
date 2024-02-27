import { Link } from "react-router-dom";

export default function Error(){
    return(
    <main>
        <h2>Error</h2>
        <p>Algo inesperado aconteceu, mais informações abaixo</p>
        {
            //TODO: getError
        }
        <Link to='/dashboard'>Clique aqui para voltar para a Dashboard</Link>
    </main>
    );
}