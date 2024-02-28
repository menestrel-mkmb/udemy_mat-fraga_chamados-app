import Title from "../../components/Title";
import Wrapper from "../../components/Wrapper";
import { FiSettings } from "react-icons/fi";

import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

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
                <FiSettings size={24} color="#FFF" />
                Profile
            </Title>
            <form
                onSubmit={e=>saveProfile(e)}
            >
                <section
                    className="inp__sect change-avatar__sect"
                    onClick={e=>changeAvatar(e)}
                >
                    <img
                        className="change-avatar__img"
                        alt='Sua foto de perfil'
                        src={avatarUrl}
                    />
                </section>
                <section
                    className="inp__sect name__sect"
                >
                    <label
                        className="name__lbl"
                    >
                        Name
                    </label>
                    <input
                        className="name__inp"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                    />
                </section>
                <section
                    className="inp__sect email__sect"
                >
                    <label
                        className="email__lbl"
                    >
                        Email
                    </label>
                    <input
                        className="email__inp"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </section>
                <button
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