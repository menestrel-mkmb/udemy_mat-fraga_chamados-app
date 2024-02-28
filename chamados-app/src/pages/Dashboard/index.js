import "./index.css";

import Wrapper from "../../components/Wrapper";

import Title from "../../components/Title";
import { FiHome } from "react-icons/fi";

export default function Dashboard(){
    return(
    <Wrapper
        className="wrapper"
    >
        <main
            className="main"
        >
            <Title>
                <FiHome color="#FFF" size={24} />
                Dashboard
            </Title>
        </main>
    </Wrapper>
    );
}