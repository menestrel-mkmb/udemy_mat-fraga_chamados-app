import Main from "../../components/Main";
import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { FiUser } from "react-icons/fi";

export default function Customers(){
    return(
        <Wrapper
        className="wrapper"
    >
        <Main
            classes="main main__sect"
        >
            <Title>
                <FiUser size={24} />
                Customers
            </Title>
        </Main>
    </Wrapper>);
}