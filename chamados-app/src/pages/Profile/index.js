import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiUpload, FiSettings } from "react-icons/fi";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import "./index.css";

export default function Profile(){
    const [infoDropped, setInfoDropped] = useState(false);

    const { avatarUrl,
            // setAvatarUrl,
            name, setName,
            email, setEmail,

            user,
            loadUser
    } = useContext(AuthContext);
    
    useEffect( () => {
        const load = async () => {
            await loadUser();
        }
        
        if(!infoDropped && user) load();
        setInfoDropped(true);
    }, [user, loadUser, infoDropped, setInfoDropped]);

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
        <Main
            classes="main main__sect"
        >
            <Title>
                <FiSettings size={24} />
                Perfil do Usuário
            </Title>
            <form
                className="form"
                onSubmit={e=>saveProfile(e)}
            >
                <label
                    className="inp__sect profile-avatar__img--lbl"
                    for="file--avatar__inp"
                >
                    <img
                        className="profile-avatar__img"
                        alt='Sua foto de perfil'
                        src={avatarUrl ?? "./assets/imgs/avatar.png"}
                    />
                    <section
                        className="profile-avatar__sect"
                    >
                        <span
                            className="profile-avatar__txt"
                        >
                            Clique aqui para mudar seu avatar
                        </span>
                        <FiUpload
                            className="profile-avatar__icon"
                            size={24}
                            color="#eaeaec"
                        />
                        <input
                            className="profile-avatar__inp"
                            id="file--avatar__inp"
                            name="file--avatar__inp"
                            style={{
                                display: "none"
                            }}
                            type="file"
                            accept="image/*"
                        />
                    </section>
                </label>
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
                        id="file--avatar__inp"
                        name="file--avatar__inp"
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
                <span>
                    Entrou em um computador público/compartilhado e essa pessoa não é você? 
                    Você pode sair dessa conta e entra na sua.
                </span>
                <button
                    className="profile-logout__btn"
                    onClick={e=>logout(e)}
                >
                    Entrar com outra conta
                </button>
            </section>
        </Main>
    </Wrapper>
    );
}