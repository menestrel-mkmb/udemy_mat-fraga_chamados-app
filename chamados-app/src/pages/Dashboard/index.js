import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseConfig";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { useNavigate } from "react-router-dom";
import Aside from "../../components/Aside";

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
    <>
        <Aside />
        <main>
            <h2>Dashboard</h2>
            <button onClick={e => logout(e)}>Sair</button>
        </main>
    </>
    );
}