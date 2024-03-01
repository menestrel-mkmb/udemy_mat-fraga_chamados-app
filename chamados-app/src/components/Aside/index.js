import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import "./index.css";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";


export default function Aside(){
    const { user } = useContext(AuthContext);

    return(
    <aside
      className="aside menu__aside"
    >
          <div
            className="avatar__div"
          >
            <figure
              className="avatar__fig"
            >
              <img
                className="avatar__img"
                src={user.avatarUrl ??
                  "../../../assets/imgs/avatar.png"}
                alt="Avatar/Foto do usuário"
              />
              <figcaption
                className="avatar__caption"
              >
                {user.name}
              </figcaption>
            </figure>
          </div>
          <nav
            className="nav__aside"
          >
            <ul
              className="nav__ul"
            >
              <li
                className="nav__li"
              >
                <FiHome
                  className="li__icon dashboard__icon"
                  color="#FFF" size={24}
                />
                <Link
                  className="li__lnk dashboard__lnk"
                  to='/dashboard'
                >
                  Chamados
                </Link>
              </li>
              <li
                className="nav__li"
              >
                <FiUser
                    className="li__icon customers__icon"
                    color="#FFF" size={24}
                  />
                <Link
                  className="li__lnk customers__lnk"
                  to='/customers'
                >
                  Clientes
                </Link>
              </li>
              <li
                className="nav__li"
              >
                <FiSettings
                  className="li__icon profile__icon"
                  color="#FFF" size={24}
                />
                <Link
                  className="li__lnk profile__lnk"
                  to='/profile'
                >
                  Configurações
                </Link>
              </li>
            </ul>
          </nav>
      </aside>
    );
}