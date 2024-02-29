import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { FiUpload, FiSettings } from "react-icons/fi";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./index.css";

export default function Profile(){
    const { avatarUrl, setAvatarUrl,
            name, setName,
            email, setEmail,
        } = useContext(AuthContext);
    
    const changeAvatar = (e) => {
        e.preventDefault();
        setAvatarUrl(null);
        alert('Change Avatar');
    }

    const saveProfile = (e) => {
        e.preventDefault();
        alert('Save Profile');
    }

    const logout = (e) => {
        e.preventDefault();
        alert('Logout');
    }

    return(
    <Wrapper
        className="wrapper"
    >
        <main
            className="main"
        >
            <Title>
                <FiSettings size={24} />
                Perfil do Usuário
            </Title>
            <form
                className="form"
                onSubmit={e=>saveProfile(e)}
            >
                <section
                    className="inp__sect profile-avatar__sect"
                    onClick={e=>changeAvatar(e)}
                >
                    <span
                        className="profile-avatar__txt"
                    >
                        Clique para alterar sua foto
                    </span>
                    <FiUpload
                        className="profile-avatar__icon"
                        color="#fefefe"
                        size={24}
                    />
                    <img
                        className="profile-avatar__img"
                        alt='Sua foto de perfil'
                        src={avatarUrl ?? "./assets/imgs/avatar.png"}
                    />
                </section>
                <section
                    className="inp__sect name__sect"
                >
                    <label
                        className="inp__lbl name__lbl"
                    >
                        Nome
                    </label>
                    <input
                        className="inp name__inp"
                        type="text"
                        placeholder="Digite aqui seu nome"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                </section>
                <section
                    className="inp__sect email__sect"
                >
                    <label
                        className="inp__lbl email__lbl"
                    >
                        E-mail
                    </label>
                    <input
                        className="inp email__inp"
                        type="email"
                        placeholder="Digite aqui seu e-mail"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </section>
                <button
                    className="form__btn feature-btn submit__btn"
                    type="submit"
                >
                    Salvar
                </button>
            </form>
            <section
                className="profile-logout__sect"
            >
                <h3
                    className="profile-logout__title"
                >
                    Não é você?
                </h3>
                <button
                    className="profile-logout__btn"
                    onClick={e=>logout(e)}
                >
                    Sair da sua conta
                </button>
            </section>
        </main>
    </Wrapper>);
}