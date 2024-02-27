import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { FiHome, FiUser, FiSettings } from 'react-icons/fi';

export default function Aside(){
    const { user } = useContext(AuthContext);

    return(
    <aside>
        <section>
          <figure>
            <img
              src={user.avatarUrl === null ?
                "../../../assets/imgs/avatar.png" :
                user.avatarUrl}
              alt="Avatar/Foto do usuário"
            />
            <figcaption>{user.name}</figcaption>
          </figure>
          <nav>
            <ul>
              <li>
                <Link to='/dashboard'>
                  <FiHome color="#FFF" size={24} />
                  Chamados
                </Link>
              </li>
              <li>
                <Link to='/customers'>
                  <FiUser color="#FFF" size={24} />
                  Clientes
                </Link>
              </li>
              <li>
                <Link to='/profile'>
                  <FiSettings color="#FFF" size={24} />
                  Configurações
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </aside>
    );
}