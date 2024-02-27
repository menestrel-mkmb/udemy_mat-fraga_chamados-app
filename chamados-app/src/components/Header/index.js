import { Link } from "react-router-dom";
import "./index.css";

export default function Header(){

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
  </header>
  );
}