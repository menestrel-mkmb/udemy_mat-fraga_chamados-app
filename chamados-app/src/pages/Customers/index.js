import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { FiUser } from "react-icons/fi";

export default function Customers(){
    return(
        <Wrapper
        className="wrapper"
    >
        <main
            className="main"
        >
            <Title>
                <FiUser size={24} color="#FFF" />
                Customers
            </Title>
        </main>
    </Wrapper>);
}