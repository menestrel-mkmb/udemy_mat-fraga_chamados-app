import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { FiSettings } from "react-icons/fi";

export default function Profile(){
    return(
    <Wrapper
        className="wrapper"
    >
        <main
            className="main"
        >
            <Title>
                <FiSettings size={24} color="#FFF" />
                Profile
            </Title>
        </main>
    </Wrapper>);
}