import { Link, useNavigate } from "react-router-dom";
import "./index.css";

import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../services/firebaseConfig";

export default function Header(){
  const navigate = useNavigate();

  const logout = async (e) => {
      e.preventDefault();
      signOut(firebaseAuth);
      navigate('/login');
  }

  return(
  <header
    className="header"
  >
    <nav
      className="menu menu__nav"
    >
      <Link
        className="menu__lnk dashboard__lnk"
        to="/dashboard"
      >
        Dashboard
      </Link>
      <Link
        className="menu__lnk login__lnk"
        to="/login"
      >
        Entrar
      </Link>
      <Link
        className="menu__lnk signup__link"
        to="/signup"
      >
        Cadastrar
      </Link>
    </nav>
    <button
      className="logout__btn"
      onClick={e => logout(e)}
    >
      Sair
    </button>
  </header>
  );
}