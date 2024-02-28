import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseConfig";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { useNavigate } from "react-router-dom";
import "./index.css";

import Wrapper from "../../components/Wrapper";

import Title from "../../components/Title";
import { FiHome } from "react-icons/fi";

export default function Dashboard(){
    const { deleteUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async (e) => {
        e.preventDefault();
        signOut(firebaseAuth);
        deleteUser();
        navigate('/login');
    }

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
            <button onClick={e => logout(e)}>Sair</button>
        </main>
    </Wrapper>
    );
}