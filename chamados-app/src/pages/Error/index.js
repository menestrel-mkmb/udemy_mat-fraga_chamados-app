import { Link } from "react-router-dom";
import Main from "../../components/Main";

export default function Error(){
    return(
    <Main
        classes="main main__sect"
    >
        <h2>Error</h2>
        <p>Algo inesperado aconteceu, mais informações abaixo</p>
        {
            //TODO: getError
        }
        <Link to='/dashboard'>Clique aqui para voltar para a Dashboard</Link>
    </Main>
    );
}