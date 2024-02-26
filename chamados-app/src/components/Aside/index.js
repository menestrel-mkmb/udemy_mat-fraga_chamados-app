import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

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
                <Link>Chamados</Link>
              </li>
              <li>
                <Link>Chamados</Link>
              </li>
              <li>
                <Link>Chamados</Link>
              </li>
            </ul>
          </nav>
        </section>
      </aside>
    );
}