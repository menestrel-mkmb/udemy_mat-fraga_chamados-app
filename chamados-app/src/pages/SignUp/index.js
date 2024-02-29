import { Link } from "react-router-dom";
import "./index.css";

import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Main from "../../components/Main";

export default function SignUp(){
    const {
        name, setName,
        
        email, setEmail,
        password, setPassword,
        createAccount,

        loadingAuth,
        signed, deleteUser,
        loginAttempt
    } = useContext(AuthContext);

    useEffect(() => {
        if(signed && !loginAttempt) deleteUser();
    }, [deleteUser, loginAttempt, signed]);
    

    return(
        <Main
            classes="main main__sect signup"
        >
            <article
                className="signup__artc"
            >
                <img
                    className="signup__img"
                    src="../../../assets/imgs/logo.png"
                    alt=" "
                />
                <h2
                    className="signup__title"
                >
                    Faça seu cadastro na plataforma
                </h2>
                <form
                    className="signup__forms"
                    onSubmit={e => {createAccount(e)}}
                >
                    <section
                        className="name__sect"
                    >
                        <label
                            className="name__lbl"
                        >
                            nome
                        </label>
                        <input
                            className="name__inp"
                            type="text"
                            placeholder="Digite aqui seu nome"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                        />
                    </section>
                    <section
                        className="email__sect"
                    >
                        <label
                            className="email__lbl"
                        >
                            e-mail
                        </label>
                        <input
                            className="email__inp"
                            type="email"
                            placeholder="Digite aqui seu e-mail"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </section>
                    <section
                        className="password__sect"
                    >
                        <label
                            className="password__lbl"
                        >
                            password
                        </label>
                        <input
                            className="password__inp"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </section>
                    <button
                        className="signup__btn"
                        type="submit"
                    >
                        {loadingAuth ?
                        "Aguarde, carregando..." :
                        "Cadastrar"}
                    </button>
                    <Link
                        className="register__lnk"
                        to='/login'
                    >
                        Já possui uma conta? Faça login
                    </Link>
                </form>
            </article>
        </Main>
    )
}