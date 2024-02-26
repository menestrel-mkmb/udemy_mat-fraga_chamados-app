import { Link } from "react-router-dom";

export default function Header(){

  return(
  <header>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/login">Entrar</Link>
    <Link to="/signup">Cadastrar</Link>
  </header>
  );
}